// @ts-nocheck
'use client'

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
  const [sceneStartTime, setSceneStartTime] = useState(Date.now())

  // Boss arrives after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setBossIsPresent(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [sceneStartTime]) // Reset when scene restarts

  // When boss arrives, employees stop dancing and go to work
  const handleBossArrival = () => {
    console.log('🚨 Boss has arrived! Switching employees to work mode...')
    setBossHasArrived(true)
    // Immediately stop dancing - no delay
    console.log('⏰ Setting employeesAreDancing to false immediately')
    setEmployeesAreDancing(false)
  }

  // Function to restart the entire scene
  const restartScene = () => {
    console.log('🔄 Restarting scene...')
    setBossIsPresent(false)
    setEmployeesAreDancing(true)
    setBossHasArrived(false)
    setSceneStartTime(Date.now()) // This will trigger useEffect to restart timer
  }

  return (
    <main style={{ height: '100vh', width: '100vw' }}>
      {/* Restart Button */}
      <button
        onClick={restartScene}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 100,
          padding: '12px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#c0392b'
          e.target.style.transform = 'scale(1.05)'
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#e74c3c'
          e.target.style.transform = 'scale(1)'
        }}
      >
        🔄 Reiniciar Escena
      </button>

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
              ) : '⏰ El jefe llegará en 5 segundos...'}
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
          Usa el mouse para navegar. Haz clic en "Reiniciar" para ver de nuevo.
        </p>
      </div>

      <Canvas
        style={{ background: 'linear-gradient(to bottom, #87CEEB, #E0F6FF)' }}
        shadows
        camera={{ position: [10, 8, 10], fov: 60 }}
      >
        <Lights />

        {/* The three dancing employees - dancing in center area, then running to their chairs */}
        <Employee
          name="Mondaca"
          position={[-1.5, 0, -2]}
          isDancing={employeesAreDancing}
          workStation={[-3, 0, 3.5]}
        />
        <Employee
          name="Jorge"
          position={[0, 0, -2]}
          isDancing={employeesAreDancing}
          workStation={[0, 0, 3.5]}
        />
        <Employee
          name="Leo"
          position={[1.5, 0, -2]}
          isDancing={employeesAreDancing}
          workStation={[3, 0, 3.5]}
        />

        {/* The Boss Character */}
        <BossCharacter
          key={sceneStartTime} // Force restart when scene resets
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
