"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import { Color, Group, Vector3 } from "three";

interface NodeData {
    position: Vector3;
    size: number;
}

interface EdgeData {
    start: Vector3;
    end: Vector3;
}

const EDGE_COLOR = "#8b7355";

/**
 * SceneContent.tsx の getColorFromStops() をそのまま移植。
 * 2色に限らず、任意の数の色を等間隔に並べて補間する
 * （nodeGradientPreset には "mochiHoppe" のような3色プリセットもあるため）。
 */
function colorFromStops(stops: readonly string[], ratio: number): Color {
    if (stops.length === 0) return new Color("#4CAF50");
    if (stops.length === 1) return new Color(stops[0]);

    const clamped = Math.min(1, Math.max(0, ratio));
    const scaled = clamped * (stops.length - 1);
    const index = Math.floor(scaled);
    const t = scaled - index;

    const start = new Color(stops[index]);
    const end = new Color(stops[Math.min(index + 1, stops.length - 1)]);
    return start.lerp(end, t);
}

/**
 * ホーム画面が実際に表示している木の構造そのもの。
 *
 * github.com/WeegieCat/trie-bonsai の src/app/page.tsx は
 * generateBonsai(DEFAULT_TRIE_INPUT) を呼んでおり、
 * DEFAULT_TRIE_INPUT = "もちもちほっぺ もちもちもっちん もちもちもちち"。
 * この3語すべての接頭辞を Trie に挿入して得られる木を、
 * トライ木構築ロジック（insert）を実際にNode上で実行して検証したところ
 * 14ノード・深さ0〜8の以下の構造になることを確認済み
 * （src/lib/trees/trie/Trie.ts の insert と同一の分岐）。
 *
 * 各要素は { depth: 深さ, parent: 親のインデックス（-1はルート） }。
 * 配列の並び順は Trie.toGraph() と同じ幅優先探索(BFS)の訪問順。
 */
const TREE_SPEC: readonly { depth: number; parent: number }[] = [
    { depth: 0, parent: -1 }, // 0 root
    { depth: 1, parent: 0 }, // 1 も
    { depth: 2, parent: 1 }, // 2 ち
    { depth: 3, parent: 2 }, // 3 も
    { depth: 4, parent: 3 }, // 4 ち
    { depth: 5, parent: 4 }, // 5 ほ
    { depth: 5, parent: 4 }, // 6 も
    { depth: 6, parent: 5 }, // 7 っ (←ほ)
    { depth: 6, parent: 6 }, // 8 っ (←も)
    { depth: 6, parent: 6 }, // 9 ち (←も)
    { depth: 7, parent: 7 }, // 10 ぺ
    { depth: 7, parent: 8 }, // 11 ち
    { depth: 7, parent: 9 }, // 12 ち
    { depth: 8, parent: 11 }, // 13 ん
];

interface LayoutResult {
    nodes: NodeData[];
    edges: EdgeData[];
    minY: number;
    maxY: number;
}

/**
 * src/lib/utils/trieConverter.ts の graphToNodes() をそのまま移植した配置ロジック。
 * ルートは常に (0, -10, 0)。それ以外は深さごとにグループ化し、
 * 深さ内での並び順(BFS順)に応じて円状に等間隔配置してから、
 * 半径・角度の両方に乱数で揺らぎを与える（元実装と同じ Math.random 呼び出し）。
 */
function layoutTree(): LayoutResult {
    const nodesByDepth = new Map<number, number[]>();
    TREE_SPEC.forEach((spec, i) => {
        const list = nodesByDepth.get(spec.depth) ?? [];
        list.push(i);
        nodesByDepth.set(spec.depth, list);
    });

    const positions: Vector3[] = new Array(TREE_SPEC.length);
    const sortedDepths = Array.from(nodesByDepth.keys()).sort((a, b) => a - b);

    sortedDepths.forEach((depth) => {
        const indices = nodesByDepth.get(depth) ?? [];
        const baseRadius = depth === 0 ? 0 : depth * 2.2;

        indices.forEach((nodeIndex, i) => {
            if (depth === 0) {
                positions[nodeIndex] = new Vector3(0, -10, 0);
                return;
            }

            const randomOffset = (Math.random() - 0.5) * 0.9;
            const angle =
                (i / Math.max(indices.length, 1)) * Math.PI * 2 +
                randomOffset;
            const radius = baseRadius + Math.random() * 1.2;

            positions[nodeIndex] = new Vector3(
                Math.cos(angle) * radius,
                depth * 2,
                Math.sin(angle) * radius
            );
        });
    });

    const nodes: NodeData[] = TREE_SPEC.map((spec, i) => ({
        position: positions[i],
        // Trie.toGraph() のノードサイズ計算式
        size: spec.depth === 0 ? 1.5 : Math.max(0.6, 1.2 - spec.depth * 0.1),
    }));

    const edges: EdgeData[] = TREE_SPEC.map((spec, i) => ({
        parent: spec.parent,
        i,
    }))
        .filter((e) => e.parent !== -1)
        .map((e) => ({
            start: positions[e.parent],
            end: positions[e.i],
        }));

    const ys = positions.map((p) => p.y);
    return {
        nodes,
        edges,
        minY: Math.min(...ys),
        maxY: Math.max(...ys),
    };
}

function Bonsai({ colors }: { colors: readonly string[] }) {
    const groupRef = useRef<Group>(null);
    const { nodes, edges, minY, maxY } = useMemo(() => layoutTree(), []);

    // 自動回転させる（Y軸回転）ため、どの角度から見ても画面に収まる
    // 必要がある。回転してもズレない「回転軸からの水平距離」
    // (hypot(x,z)) と、垂直方向の半分の高さのうち大きい方を基準に
    // スケールを決め、バウンディングボックスの中心をカメラの注視点
    // (原点)に合わせている。three.jsのプロジェクション計算をNode上で
    // 10度刻み・複数回試行してクリッピングしないことを確認済みの値
    // (targetExtent=2.6)を採用した。乱数で毎回サイズが変わりうるため、
    // 固定値ではなく生成結果から都度算出している。
    const { scale, offsetY } = useMemo(() => {
        const centerY = (minY + maxY) / 2;
        const horizontalRadius = Math.max(
            ...nodes.map((n) => Math.hypot(n.position.x, n.position.z))
        );
        const verticalHalfExtent = (maxY - minY) / 2;
        const maxExtent = Math.max(horizontalRadius, verticalHalfExtent);
        const targetExtent = 2.6;
        const s = targetExtent / maxExtent;
        return { scale: s, offsetY: -centerY * s };
    }, [nodes, minY, maxY]);

    useFrame((_, delta) => {
        if (groupRef.current) groupRef.current.rotation.y += delta * 0.25;
    });

    return (
        <group ref={groupRef} position={[0, offsetY, 0]} scale={scale}>
            {edges.map((edge, i) => (
                <Line
                    key={i}
                    points={[edge.start, edge.end]}
                    color={EDGE_COLOR}
                    lineWidth={1}
                />
            ))}
            {nodes.map((node, i) => {
                const color = colorFromStops(
                    colors,
                    (node.position.y - minY) / (maxY - minY)
                );
                return (
                    <mesh key={i} position={node.position}>
                        <sphereGeometry args={[node.size * 0.4, 16, 16]} />
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={0.3}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}

interface BonsaiSceneProps {
    /** ノードのグラデーション色。テーマごとに CubeBadge と同じ要領で外から渡す */
    colors: readonly string[];
}

export default function BonsaiScene({ colors }: BonsaiSceneProps) {
    return (
        // 実際のホーム画面のカメラ(-20,20,30)と同じ向きの比率を保ったまま、
        // 小さいカード用に距離を縮めている（実際の実装に自動回転は無いが、
        // プレビュー用の演出として Bonsai 側でゆっくり自動回転させている）。
        <Canvas camera={{ position: [-3.5, 3.5, 5.25], fov: 40 }} dpr={[1, 2]}>
            {/* SceneContentのbackgroundColor既定値。テーマに関わらず発光ノードが映える暗色で固定 */}
            <color attach='background' args={["#1a1a1a"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 7]} intensity={1} />
            <pointLight position={[-5, 5, 5]} intensity={0.3} />
            <Bonsai colors={colors} />
            <EffectComposer>
                <Bloom
                    mipmapBlur
                    intensity={0.7}
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.6}
                />
            </EffectComposer>
        </Canvas>
    );
}
