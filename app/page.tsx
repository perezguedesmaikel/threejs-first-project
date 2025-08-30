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
  const [bossHasArrived, setBossHasArrived] = useState(false)

  // Boss arrives after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setBossIsPresent(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // When boss arrives, employees stop dancing and go to work
  const handleBossArrival = () => {
    console.log('🚨 Boss has arrived! Switching employees to work mode...')
    setBossHasArrived(true)
    // Immediately stop dancing - no delay
    console.log('⏰ Setting employeesAreDancing to false immediately')
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
        maxWidth: '320px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🎉 Escena de Oficina</h3>
        {employeesAreDancing ? (
          <div>
            <p style={{ margin: '5px 0' }}>🕺 Los empleados están bailando...</p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              {bossIsPresent ? (
                bossHasArrived ? '😱 ¡OH NO! ¡El jefe los vio!' : '👔 ¡El jefe está llegando!'
              ) : '⏰ El jefe llegará pronto...'}
            </p>
          </div>
        ) : (
          <div>
            <p style={{ margin: '5px 0' }}>💻 ¡Todos trabajando duro!</p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>👔 El Estimado supervisa la oficina</p>
            <p style={{ margin: '5px 0', fontSize: '12px', color: '#ffff99' }}>
              {bossHasArrived && '(Corrieron a sus escritorios en pánico 😅)'}
            </p>
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

        <OrbitControls
          makeDefault
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={3}
          maxDistance={20}
          target={[0, 1, 0]}
        />
        <StatsGl />
      </Canvas>
    </main>
  )
}
