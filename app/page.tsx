'use client'
// @ts-nocheck

import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, StatsGl } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'
import { BossCharacter } from './components/BossCharacter'
import { OfficeEnvironment } from './components/OfficeEnvironment'

function Lights() {
  const { scene } = useThree()
  useEffect(() => {
    // Ambient light for general illumination
    const amb = new THREE.AmbientLight(0xffffff, 0.4)

    // Main directional light (sunlight through window)
    const dir = new THREE.DirectionalLight(0xffffff, 1)
    dir.position.set(5, 8, 5)
    dir.castShadow = true
    dir.shadow.mapSize.width = 2048
    dir.shadow.mapSize.height = 2048
    dir.shadow.camera.near = 0.5
    dir.shadow.camera.far = 50
    dir.shadow.camera.left = -10
    dir.shadow.camera.right = 10
    dir.shadow.camera.top = 10
    dir.shadow.camera.bottom = -10

    // Additional office lighting
    const officeLight = new THREE.PointLight(0xffffff, 0.5, 10)
    officeLight.position.set(0, 4, 0)
    officeLight.castShadow = true

    scene.add(amb, dir, officeLight)
    return () => {
      scene.remove(amb, dir, officeLight)
      amb.dispose?.()
      dir.dispose?.()
      officeLight.dispose?.()
    }
  }, [scene])
  return null
}

export default function HomePage() {
  return (
    <main style={{ height: '100vh', width: '100vw' }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontSize: '16px',
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '10px',
        borderRadius: '5px'
      }}>
        <h3>3D Boss Character Demo</h3>
        <p>Animations: Walking, Gesturing, Pointing, Crossed Arms, Talking</p>
        <p>Use mouse to orbit around the scene</p>
      </div>
      <Canvas
        style={{ background: 'linear-gradient(to bottom, #87CEEB, #E0F6FF)' }}
        shadows
        camera={{ position: [8, 6, 8], fov: 60 }}
      >
        <Lights />

        {/* The Boss Character with random animations */}
        <BossCharacter position={[0, 0, 0]} scale={1} />

        {/* Office Environment */}
        <OfficeEnvironment />

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>

        <OrbitControls
          makeDefault
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={20}
        />
        <StatsGl />
      </Canvas>
    </main>
  )
}
