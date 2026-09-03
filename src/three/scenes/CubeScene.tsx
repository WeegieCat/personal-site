"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

// three.js からは CSS 変数を読めないため、globals.css の primary / accent と
// 対応する値をここに持つ。テーマ色を変えたときはこちらも合わせること。
const FACE_COLORS = [
    "#2563eb",
    "#7c3aed",
    "#60a5fa",
    "#2563eb",
    "#7c3aed",
    "#60a5fa",
];

function Cube() {
    const ref = useRef<Mesh>(null);

    useFrame((_, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x += delta * 0.4;
        ref.current.rotation.y += delta * 0.6;
    });

    return (
        <mesh ref={ref}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            {FACE_COLORS.map((color, i) => (
                <meshStandardMaterial
                    key={i}
                    attach={`material-${i}`}
                    color={color}
                    roughness={0.35}
                    metalness={0.2}
                />
            ))}
        </mesh>
    );
}

export default function CubeScene() {
    return (
        <Canvas camera={{ position: [2.4, 2, 2.4], fov: 40 }} dpr={[1, 2]}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 4, 2]} intensity={2.5} />
            <Cube />
        </Canvas>
    );
}
