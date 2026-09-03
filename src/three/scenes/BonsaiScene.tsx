"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group, Quaternion, Vector3 } from "three";

interface BranchData {
    start: Vector3;
    end: Vector3;
    radius: number;
}

interface LeafData {
    position: Vector3;
    scale: number;
    color: string;
}

const LEAF_COLORS = ["#7c9473", "#93a97e", "#5f7a52", "#a3b88c"];
const UP = new Vector3(0, 1, 0);
const TILT_X = new Vector3(1, 0, 0);
const TILT_Z = new Vector3(0, 0, 1);

/**
 * Trie Bonsai（github.com/WeegieCat/trie-bonsai）はトライ木の分岐を
 * 3Dの盆栽として描画するプロダクト。その雰囲気を汲んだ簡易モックアップとして、
 * 再帰的に枝分かれする木を生成する（実プロダクトのレイアウトそのものではない）。
 */
function generateTree(depth: number) {
    const branches: BranchData[] = [];
    const leaves: LeafData[] = [];

    function recurse(
        origin: Vector3,
        direction: Vector3,
        length: number,
        radius: number,
        remaining: number
    ) {
        const end = origin
            .clone()
            .add(direction.clone().multiplyScalar(length));
        branches.push({ start: origin.clone(), end, radius });

        if (remaining === 0) {
            leaves.push({
                position: end,
                scale: 0.3 + Math.random() * 0.2,
                color: LEAF_COLORS[
                    Math.floor(Math.random() * LEAF_COLORS.length)
                ],
            });
            return;
        }

        const childCount = remaining > 2 ? 2 : 2 + Math.round(Math.random());
        for (let i = 0; i < childCount; i++) {
            const spread = 0.55;
            const newDirection = direction
                .clone()
                .applyAxisAngle(TILT_X, (Math.random() - 0.5) * spread)
                .applyAxisAngle(TILT_Z, (Math.random() - 0.5) * spread)
                .normalize();
            recurse(
                end,
                newDirection,
                length * 0.72,
                radius * 0.68,
                remaining - 1
            );
        }
    }

    recurse(new Vector3(0, -1, 0), UP, 0.9, 0.09, depth);
    return { branches, leaves };
}

function Branch({ start, end, radius }: BranchData) {
    const direction = useMemo(() => end.clone().sub(start), [start, end]);
    const length = direction.length();
    const midpoint = useMemo(
        () => start.clone().add(end).multiplyScalar(0.5),
        [start, end]
    );
    const quaternion = useMemo(() => {
        const q = new Quaternion();
        q.setFromUnitVectors(UP, direction.clone().normalize());
        return q;
    }, [direction]);

    return (
        <mesh position={midpoint} quaternion={quaternion}>
            <cylinderGeometry args={[radius * 0.6, radius, length, 6]} />
            <meshStandardMaterial color='#6b4a34' roughness={0.9} />
        </mesh>
    );
}

function LeafCluster({ position, scale, color }: LeafData) {
    return (
        <mesh position={position} scale={scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={color} roughness={0.8} flatShading />
        </mesh>
    );
}

function Tree() {
    const groupRef = useRef<Group>(null);
    const { branches, leaves } = useMemo(() => generateTree(4), []);

    useFrame((_, delta) => {
        if (groupRef.current) groupRef.current.rotation.y += delta * 0.25;
    });

    return (
        <group ref={groupRef}>
            {branches.map((branch, i) => (
                <Branch key={i} {...branch} />
            ))}
            {leaves.map((leaf, i) => (
                <LeafCluster key={i} {...leaf} />
            ))}
        </group>
    );
}

export default function BonsaiScene() {
    return (
        <Canvas camera={{ position: [2.2, 1.4, 2.6], fov: 40 }} dpr={[1, 2]}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[3, 4, 2]} intensity={1.6} />
            <Tree />
        </Canvas>
    );
}
