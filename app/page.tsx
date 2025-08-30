'use client'
// @ts-nocheck

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, StatsGl, Box as DreiBox, Plane as DreiPlane } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function SpinningBox() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.6
      ref.current.rotation.y += delta * 0.8
    }
  })
  return <DreiBox ref={ref} args={[1, 1, 1]} castShadow position={[0, 0, 0]} />
}

function Lights() {
  const { scene } = useThree()
  useEffect(() => {
    const amb = new THREE.AmbientLight(0xffffff, 0.6)
    const dir = new THREE.DirectionalLight(0xffffff, 1)
    dir.position.set(5, 5, 5)
    dir.castShadow = true
    scene.add(amb, dir)
    return () => {
      scene.remove(amb, dir)
      amb.dispose?.()
      dir.dispose?.()
    }
  }, [scene])
  return null
}

export default function HomePage() {
  return (
    <main style={{ height: '100vh', width: '100vw' }}>
      <Canvas style={{ background: '#0f172a' }} shadows camera={{ position: [3, 3, 3], fov: 60 }}>
        <Lights />
        <SpinningBox />
        <DreiPlane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow />
        <OrbitControls makeDefault />
        <StatsGl />
      </Canvas>
    </main>
  )
}
