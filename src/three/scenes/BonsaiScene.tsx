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

// github.com/WeegieCat/trie-bonsai の AnimatedBonsai.tsx に実装されている
// ノード配置のロジック（ルート1 + 円状に5本の枝 + 各枝から2つの子）をそのまま移植し、
// SceneContent.tsx の配色・マテリアル・Bloom設定を踏襲している。
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
    const nodes: NodeData[] = [{ position: new Vector3(0, 0, 0), size: 1.5, y: 0 }];
    const edges: EdgeData[] = [];
    const root = nodes[0].position;

    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 3;
        const z = Math.sin(angle) * 3;
        const branch = new Vector3(x, 2, z);

        nodes.push({ position: branch, size: 1, y: 2 });
        edges.push({ start: root, end: branch });

        for (let j = 0; j < 2; j++) {
            const subAngle = angle + (j - 0.5) * 0.8;
            const subX = Math.cos(subAngle) * 2 + x;
            const subZ = Math.sin(subAngle) * 2 + z;
            const leaf = new Vector3(subX, 4, subZ);

            nodes.push({ position: leaf, size: 0.7, y: 4 });
            edges.push({ start: branch, end: leaf });
        }
    }

    return { nodes, edges };
}

function Bonsai() {
    const groupRef = useRef<Group>(null);
    const { nodes, edges } = useMemo(() => generateBonsaiLayout(), []);
    const minY = 0;
    const maxY = 4;

    useFrame((_, delta) => {
        if (groupRef.current) groupRef.current.rotation.y += delta * 0.2;
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
        <Canvas camera={{ position: [-3.5, 3, 5], fov: 40 }} dpr={[1, 2]}>
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
