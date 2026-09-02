"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Knot() {
    const ref = useRef<Mesh>(null);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <mesh ref={ref}>
            <torusKnotGeometry args={[1, 0.32, 160, 32]} />
            <meshStandardMaterial
                color='#3b82f6'
                roughness={0.25}
                metalness={0.6}
            />
        </mesh>
    );
}

export default function HeroScene() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
                <Knot />
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
    );
}
