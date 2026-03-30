"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Stars } from "@react-three/drei"
import * as THREE from "three"

function Shield({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        meshRef.current.rotation.x = t * 0.2
        meshRef.current.rotation.y = t * 0.3
        // Subtle float effect
        meshRef.current.position.y = Math.sin(t * 0.5) * 0.1
    })

    return (
        <Sphere
            ref={meshRef}
            args={[1, 64, 64]}
            position={position}
            scale={hovered ? 1.2 : 1}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <MeshDistortMaterial
                color={hovered ? "#7aa2f7" : "#565f89"}
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.4}
                metalness={0.8}
                emissive={hovered ? "#7aa2f7" : "#1a1b26"}
                emissiveIntensity={hovered ? 0.8 : 0.2}
                wireframe={true}
            />
        </Sphere>
    )
}

function Core() {
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        meshRef.current.rotation.z = t * 0.5
        // Pulsing core
        const scale = 1 + Math.sin(t * 2) * 0.1
        meshRef.current.scale.set(scale, scale, scale)
    })

    return (
        <Sphere ref={meshRef} args={[0.5, 32, 32]}>
            <meshStandardMaterial
                color="#bb9af7"
                emissive="#bb9af7"
                emissiveIntensity={2}
                wireframe={false}
                transparent
                opacity={0.8}
            />
        </Sphere>
    )
}

export function ShieldScene() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full opacity-60">
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#7aa2f7" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#bb9af7" />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <Shield position={[0, 0, 0]} />
                <Core />
            </Canvas>
        </div>
    )
}
