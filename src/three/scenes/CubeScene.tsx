"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

interface CubeSceneProps {
    /** 立方体の6面に使う3色。対面が同じ色になるよう内部で複製する */
    colors: readonly [string, string, string];
}

function Cube({ colors }: CubeSceneProps) {
    const ref = useRef<Mesh>(null);
    const faceColors = [...colors, ...colors];

    useFrame((_, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x += delta * 0.4;
        ref.current.rotation.y += delta * 0.6;
    });

    return (
        <mesh ref={ref}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            {faceColors.map((color, i) => (
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

export default function CubeScene({ colors }: CubeSceneProps) {
    return (
        <Canvas camera={{ position: [2.4, 2, 2.4], fov: 40 }} dpr={[1, 2]}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 4, 2]} intensity={2.5} />
            <Cube colors={colors} />
        </Canvas>
    );
}
