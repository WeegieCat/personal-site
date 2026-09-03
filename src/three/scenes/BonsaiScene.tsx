"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import { Color, Group, Vector3 } from "three";

interface NodeData {
    position: Vector3;
    size: number;
    y: number;
}

interface EdgeData {
    start: Vector3;
    end: Vector3;
}

// 配色・マテリアル・Bloom設定は github.com/WeegieCat/trie-bonsai の
// SceneContent.tsx の既定値を踏襲している（ここは変更しない）。
// ノード配置は元実装（AnimatedBonsai.tsx）の円状5分岐だと、固定カメラの
// プレビューでは枝が交差して絡まって見えるため、正面から見て交差しない
// 扇状の樹形に独自に組み替えている。
const EDGE_COLOR = "#8b7355";
// nodeGradientPreset: "dustyGrass"（既定値）
const GRADIENT_STOPS = ["#d4fc79", "#96e6a1"];

function colorFromGradient(ratio: number): Color {
    const clamped = Math.min(1, Math.max(0, ratio));
    return new Color(GRADIENT_STOPS[0]).lerp(
        new Color(GRADIENT_STOPS[1]),
        clamped
    );
}

function generateBonsaiLayout() {
    const nodes: NodeData[] = [];
    const edges: EdgeData[] = [];

    // 根本。ここだけ大きく明るく光らせる
    const root = new Vector3(0, 0, 0);
    nodes.push({ position: root, size: 1.5, y: 0 });

    // 幹。根本からまっすぐ立ち上がり、ここから枝が扇状に分かれる
    const crown = new Vector3(0, 1.4, 0);
    nodes.push({ position: crown, size: 1, y: crown.y });
    edges.push({ start: root, end: crown });

    // 扇の開き角。左右対称の範囲に均等配置してから微小に揺らし、
    // 枝同士が交差しない程度のばらつきに留める
    const branchCount = 7;
    const fanSpread = (100 * Math.PI) / 180;

    for (let i = 0; i < branchCount; i++) {
        const t = i / (branchCount - 1) - 0.5;
        const angle = t * fanSpread + (Math.random() - 0.5) * 0.1;
        const length = 1.1 + Math.random() * 0.45;

        const direction = new Vector3(
            Math.sin(angle),
            Math.cos(angle) * 0.85 + 0.35,
            (Math.random() - 0.5) * 0.15
        ).normalize();
        const tip = crown.clone().add(direction.clone().multiplyScalar(length));
        edges.push({ start: crown, end: tip });

        // 半数程度はもう一段伸ばし、枝の長さに変化をつける
        if (Math.random() > 0.45) {
            nodes.push({ position: tip, size: 0.5, y: tip.y });

            const subDirection = direction
                .clone()
                .applyAxisAngle(new Vector3(0, 0, 1), (Math.random() - 0.5) * 0.35)
                .normalize();
            const subLength = 0.5 + Math.random() * 0.35;
            const subTip = tip
                .clone()
                .add(subDirection.multiplyScalar(subLength));

            edges.push({ start: tip, end: subTip });
            nodes.push({
                position: subTip,
                size: 0.65 + Math.random() * 0.25,
                y: subTip.y,
            });
        } else {
            nodes.push({
                position: tip,
                size: 0.7 + Math.random() * 0.3,
                y: tip.y,
            });
        }
    }

    return { nodes, edges };
}

function Bonsai() {
    const groupRef = useRef<Group>(null);
    const { nodes, edges } = useMemo(() => generateBonsaiLayout(), []);
    const { minY, maxY } = useMemo(() => {
        const ys = nodes.map((n) => n.y);
        return { minY: Math.min(...ys), maxY: Math.max(...ys) };
    }, [nodes]);

    // 枝が5本、円周上に72度間隔で並んでいるため、連続で1回転させると
    // 枝どうしが正面から重なって見える角度を必ず通過し、絡まって見える瞬間が出る。
    // 見栄えの良い正面付近の角度だけを小さく往復させ、その瞬間を避ける。
    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y =
                Math.sin(clock.elapsedTime * 0.3) * 0.25;
        }
    });

    return (
        <group ref={groupRef} position={[0, -1.6, 0]} scale={0.42}>
            {edges.map((edge, i) => (
                <Line
                    key={i}
                    points={[edge.start, edge.end]}
                    color={EDGE_COLOR}
                    lineWidth={1}
                />
            ))}
            {nodes.map((node, i) => {
                const color = colorFromGradient(
                    (node.y - minY) / (maxY - minY)
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

export default function BonsaiScene() {
    return (
        <Canvas camera={{ position: [0.6, 1.8, 5], fov: 38 }} dpr={[1, 2]}>
            {/* SceneContentのbackgroundColor既定値 */}
            <color attach='background' args={["#1a1a1a"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 7]} intensity={1} />
            <pointLight position={[-5, 5, 5]} intensity={0.3} />
            <Bonsai />
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
