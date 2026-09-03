"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
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

/**
 * マウント直後の1〜2フレームはmeshStandardMaterialのシェーダーコンパイルが
 * 終わっておらず、キューブが歪んだ単色の塊に見えることがある。
 * シーンが揃った状態で明示的にコンパイルしてから onReady で表示許可を出す。
 */
function ShaderWarmup({ onReady }: { onReady: () => void }) {
    const { gl, scene, camera } = useThree();
    const warmed = useRef(false);

    useFrame(() => {
        if (warmed.current) return;
        warmed.current = true;
        gl.compile(scene, camera);
        onReady();
    });

    return null;
}

export default function CubeScene({ colors }: CubeSceneProps) {
    const [ready, setReady] = useState(false);

    return (
        <Canvas
            camera={{ position: [2.4, 2, 2.4], fov: 40 }}
            dpr={[1, 2]}
            style={{
                opacity: ready ? 1 : 0,
                transition: "opacity 200ms ease-out",
            }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 4, 2]} intensity={2.5} />
            <Cube colors={colors} />
            <ShaderWarmup onReady={() => setReady(true)} />
        </Canvas>
    );
}
