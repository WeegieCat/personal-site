"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Group, Vector3 } from "three";

interface NodeData {
    position: Vector3;
    radius: number;
    color: string;
}

interface EdgeData {
    start: Vector3;
    end: Vector3;
}

const NODE_COLORS = ["#8bd17c", "#a3e08f", "#6fc766", "#c7e69a"];
const ROOT_COLOR = "#d9e35c";
const EDGE_COLOR = "#8b6f47";

/**
 * Trie Bonsai（github.com/WeegieCat/trie-bonsai, https://2939976d.trie-bonsai.pages.dev/）
 * のホーム画面で使われている、発光するノードを線で結んだグラフ表現を汲んだモックアップ。
 * 実プロダクトの厳密な再現ではなく、トライ木の分岐をノード・エッジで
 * 可視化するというコンセプトを表現したもの。
 */
function generateGraph(depth: number) {
    const nodes: NodeData[] = [];
    const edges: EdgeData[] = [];

    function recurse(
        origin: Vector3,
        direction: Vector3,
        length: number,
        remaining: number
    ) {
        const end = origin
            .clone()
            .add(direction.clone().multiplyScalar(length));
        edges.push({ start: origin.clone(), end });
        nodes.push({
            position: end,
            radius: 0.05 + Math.random() * 0.03,
            color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        });

        if (remaining === 0) return;

        const childCount = remaining > 2 ? 2 : 1 + Math.round(Math.random() * 2);
        for (let i = 0; i < childCount; i++) {
            const spread = 0.9;
            const newDirection = direction
                .clone()
                .applyAxisAngle(new Vector3(1, 0, 0), (Math.random() - 0.5) * spread)
                .applyAxisAngle(new Vector3(0, 1, 0), (Math.random() - 0.5) * spread)
                .applyAxisAngle(new Vector3(0, 0, 1), (Math.random() - 0.3) * spread)
                .normalize();
            recurse(end, newDirection, length * 0.8, remaining - 1);
        }
    }

    const root = new Vector3(0, -1, 0);
    nodes.push({ position: root, radius: 0.16, color: ROOT_COLOR });
    recurse(root, new Vector3(0, 1, 0), 0.55, depth);

    return { nodes, edges };
}

function GlowNode({ position, radius, color }: NodeData) {
    return (
        <group position={position}>
            {/* 発光の芯 */}
            <mesh>
                <sphereGeometry args={[radius, 12, 12]} />
                <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
            {/* postprocessing無しでの簡易ブルーム表現。加算合成の半透明な大きい球を重ねる */}
            <mesh scale={2.4}>
                <sphereGeometry args={[radius, 12, 12]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.25}
                    blending={AdditiveBlending}
                    depthWrite={false}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
}

function Graph() {
    const groupRef = useRef<Group>(null);
    const { nodes, edges } = useMemo(() => generateGraph(4), []);

    useFrame((_, delta) => {
        if (groupRef.current) groupRef.current.rotation.y += delta * 0.2;
    });

    return (
        <group ref={groupRef}>
            {edges.map((edge, i) => (
                <Line
                    key={i}
                    points={[edge.start, edge.end]}
                    color={EDGE_COLOR}
                    lineWidth={1.4}
                    transparent
                    opacity={0.55}
                />
            ))}
            {nodes.map((node, i) => (
                <GlowNode key={i} {...node} />
            ))}
        </group>
    );
}

export default function BonsaiScene() {
    return (
        <Canvas camera={{ position: [0, 0.1, 3], fov: 42 }} dpr={[1, 2]}>
            {/* 参考にしたホーム画面のように暗い背景で発光を映えさせる。
                サイトのテーマ配色に関わらず固定（スクリーンショット的な位置づけのため） */}
            <color attach='background' args={["#05070a"]} />
            <Graph />
        </Canvas>
    );
}
