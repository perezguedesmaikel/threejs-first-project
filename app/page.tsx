'use client'
// @ts-nocheck

import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, StatsGl } from '@react-three/drei'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { BossCharacter } from './components/BossCharacter'
import { OfficeEnvironment } from './components/OfficeEnvironment'
import { Employee } from './components/Employee'

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
  const [bossIsPresent, setBossIsPresent] = useState(false)
  const [employeesAreDancing, setEmployeesAreDancing] = useState(true)

  // Boss arrives after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setBossIsPresent(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // When boss arrives, employees stop dancing and go to work
  const handleBossArrival = () => {
    setEmployeesAreDancing(false)
  }

  return (
    <main style={{ height: '100vh', width: '100vw' }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontSize: '16px',
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: '15px',
        borderRadius: '8px',
        maxWidth: '300px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🎉 Escena de Oficina</h3>
        {employeesAreDancing ? (
          <div>
            <p style={{ margin: '5px 0' }}>🕺 Los empleados están bailando...</p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              {bossIsPresent ? '👔 ¡El jefe está llegando!' : '⏰ El jefe llegará pronto...'}
            </p>
          </div>
        ) : (
          <div>
            <p style={{ margin: '5px 0' }}>💻 ¡Todos trabajando!</p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>👔 El Estimado está supervisando</p>
          </div>
        )}
        <p style={{ margin: '10px 0 0 0', fontSize: '12px', opacity: 0.8 }}>
          Usa el mouse para navegar por la escena
        </p>
      </div>

      <Canvas
        style={{ background: 'linear-gradient(to bottom, #87CEEB, #E0F6FF)' }}
        shadows
        camera={{ position: [10, 8, 10], fov: 60 }}
      >
        <Lights />

        {/* The three dancing employees */}
        <Employee
          name="Mondaca"
          position={[-2, 0, -1]}
          isDancing={employeesAreDancing}
          workStation={[-3, 0, 2]}
        />
        <Employee
          name="Jorge"
          position={[0, 0, -1]}
          isDancing={employeesAreDancing}
          workStation={[0, 0, 2]}
        />
        <Employee
          name="Leo"
          position={[2, 0, -1]}
          isDancing={employeesAreDancing}
          workStation={[3, 0, 2]}
        />

        {/* The Boss Character */}
        <BossCharacter
          position={[0, 0, -4]}
          scale={1.2}
          isPresent={bossIsPresent}
          onArrival={handleBossArrival}
        />

        {/* Office Environment with workstations */}
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
          minDistance={5}
          maxDistance={25}
          target={[0, 0, 0]}
        />
        <StatsGl />
      </Canvas>
    </main>
  )
}
