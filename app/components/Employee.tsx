// @ts-nocheck
'use client'
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface EmployeeProps {
  position?: [number, number, number]
  name: string
  isDancing: boolean
  workStation?: [number, number, number]
}

export function Employee({ position = [0, 0, 0], name, isDancing, workStation }: EmployeeProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const leftArmRef = useRef<THREE.Mesh>(null!)
  const rightArmRef = useRef<THREE.Mesh>(null!)
  const leftLegRef = useRef<THREE.Mesh>(null!)
  const rightLegRef = useRef<THREE.Mesh>(null!)
  const headRef = useRef<THREE.Mesh>(null!)
  const bodyRef = useRef<THREE.Mesh>(null!)

  const [animationTime, setAnimationTime] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    console.log(`${name}: isDancing changed to ${isDancing}`)
  }, [isDancing, name])

  const getEmployeeColors = (name: string) => {
    switch (name) {
      case 'Mondaca':
        return { shirt: '#ff6b6b', pants: '#4ecdc4' }
      case 'Jorge':
        return { shirt: '#45b7d1', pants: '#96ceb4' }
      case 'Leo':
        return { shirt: '#feca57', pants: '#ff9ff3' }
      default:
        return { shirt: '#74b9ff', pants: '#636e72' }
    }
  }

  const colors = getEmployeeColors(name)

  useEffect(() => {
    if (!isDancing && workStation && !isTransitioning) {
      console.log(`${name}: Starting transition to work station`)
      setIsTransitioning(true)
      setTimeout(() => {
        if (!groupRef.current) return
        const startPos = groupRef.current.position.clone()
        const endPos = new THREE.Vector3(...workStation)

        let progress = 0
        const moveToWork = () => {
          progress += 0.05
          if (progress <= 1 && groupRef.current) {
            const currentPos = startPos.lerp(endPos, progress)
            groupRef.current.position.copy(currentPos)
            groupRef.current.lookAt(endPos.x, groupRef.current.position.y, endPos.z - 1)
            requestAnimationFrame(moveToWork)
          } else {
            console.log(`${name}: Finished moving to work station`)
            setIsTransitioning(false)
          }
        }
        moveToWork()
      }, 200 + Math.random() * 300)
    }
  }, [isDancing, workStation, isTransitioning, name])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    setAnimationTime(prev => prev + delta)

    const group = groupRef.current
    const leftArm = leftArmRef.current
    const rightArm = rightArmRef.current
    const leftLeg = leftLegRef.current
    const rightLeg = rightLegRef.current
    const head = headRef.current
    const body = bodyRef.current

    if (leftArm) {
      leftArm.rotation.z = 0
      leftArm.rotation.x = 0
      leftArm.rotation.y = 0
    }
    if (rightArm) {
      rightArm.rotation.z = 0
      rightArm.rotation.x = 0
      rightArm.rotation.y = 0
    }
    if (leftLeg) leftLeg.rotation.x = 0
    if (rightLeg) rightLeg.rotation.x = 0
    if (head) {
      head.rotation.y = 0
      head.rotation.x = 0
      head.rotation.z = 0
    }
    if (body) {
      body.rotation.z = 0
      body.rotation.y = 0
    }

    if (isDancing && !isTransitioning) {
      const danceSpeed = 4
      const intensity = 0.8

      if (body) {
        body.rotation.z = Math.sin(animationTime * danceSpeed) * 0.2
        body.rotation.y = Math.sin(animationTime * danceSpeed * 0.7) * 0.3
      }

      if (head) {
        head.rotation.z = Math.sin(animationTime * danceSpeed) * 0.3
        head.rotation.y = Math.sin(animationTime * danceSpeed * 1.2) * 0.4
      }

      if (leftArm) {
        leftArm.rotation.z = Math.sin(animationTime * danceSpeed) * intensity + 0.5
        leftArm.rotation.x = Math.cos(animationTime * danceSpeed * 1.1) * 0.5
        leftArm.rotation.y = Math.sin(animationTime * danceSpeed * 0.8) * 0.3
      }
      if (rightArm) {
        rightArm.rotation.z = -Math.sin(animationTime * danceSpeed + Math.PI) * intensity - 0.5
        rightArm.rotation.x = Math.cos(animationTime * danceSpeed * 1.3) * 0.5
        rightArm.rotation.y = Math.sin(animationTime * danceSpeed * 0.9) * 0.3
      }

      if (leftLeg) leftLeg.rotation.x = Math.sin(animationTime * danceSpeed * 2) * 0.4
      if (rightLeg) rightLeg.rotation.x = Math.sin(animationTime * danceSpeed * 2 + Math.PI) * 0.4

      group.position.y = position[1] + Math.abs(Math.sin(animationTime * danceSpeed)) * 0.3

    } else if (!isDancing && !isTransitioning) {
      const workSpeed = 6

      if (leftArm) {
        leftArm.rotation.x = -1.2 + Math.sin(animationTime * workSpeed) * 0.1
        leftArm.rotation.z = 0.3
      }
      if (rightArm) {
        rightArm.rotation.x = -1.2 + Math.sin(animationTime * workSpeed + 1) * 0.1
        rightArm.rotation.z = -0.3
      }

      if (head) {
        head.rotation.x = -0.2 + Math.sin(animationTime * 2) * 0.05
      }

      group.position.y = position[1] + Math.sin(animationTime * 3) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Name label with text */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>

      {/* Color indicator cube (backup visual) */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <boxGeometry args={[0.5, 0.1, 0.1]} />
        <meshStandardMaterial color={colors.shirt} />
      </mesh>

      <mesh ref={headRef} position={[0, 1.7, 0]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      <mesh position={[-0.08, 1.75, 0.15]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.08, 1.75, 0.15]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      <mesh position={[0, 1.65, 0.15]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.05, 0.01, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      <mesh ref={bodyRef} position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.7, 8]} />
        <meshStandardMaterial color={colors.shirt} />
      </mesh>

      <mesh ref={leftArmRef} position={[-0.35, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
        <meshStandardMaterial color={colors.shirt} />
      </mesh>

      <mesh ref={rightArmRef} position={[0.35, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
        <meshStandardMaterial color={colors.shirt} />
      </mesh>

      <mesh position={[-0.35, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      <mesh position={[0.35, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      <mesh ref={leftLegRef} position={[-0.12, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
        <meshStandardMaterial color={colors.pants} />
      </mesh>

      <mesh ref={rightLegRef} position={[0.12, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
        <meshStandardMaterial color={colors.pants} />
      </mesh>

      <mesh position={[-0.12, 0.05, 0.05]} castShadow>
        <boxGeometry args={[0.12, 0.08, 0.2]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      <mesh position={[0.12, 0.05, 0.05]} castShadow>
        <boxGeometry args={[0.12, 0.08, 0.2]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  )
}
