'use client'
// @ts-nocheck
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

// Ensure R3F intrinsic elements are recognized by TS during Next build
import type { ThreeElements } from '@react-three/fiber'
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

interface BossCharacterProps {
  position?: [number, number, number]
  scale?: number
  isPresent?: boolean
  onArrival?: () => void
}

export function BossCharacter({ position = [0, 0, 0], scale = 1, isPresent = false, onArrival }: BossCharacterProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const leftArmRef = useRef<THREE.Mesh>(null!)
  const rightArmRef = useRef<THREE.Mesh>(null!)
  const leftLegRef = useRef<THREE.Mesh>(null!)
  const rightLegRef = useRef<THREE.Mesh>(null!)
  const headRef = useRef<THREE.Mesh>(null!)

  // Animation states
  const [currentAnimation, setCurrentAnimation] = useState<'entering' | 'idle' | 'walking' | 'gesturing' | 'pointing' | 'crossedArms' | 'talking'>('entering')
  const [animationTime, setAnimationTime] = useState(0)
  const [hasArrived, setHasArrived] = useState(false)
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(...position))

  // Boss entry animation
  useEffect(() => {
    if (isPresent && !hasArrived) {
      // Boss enters from the side
      if (groupRef.current) {
        groupRef.current.position.set(-10, position[1], position[2])
        setCurrentAnimation('entering')

        // Move to center
        let progress = 0
        const enterOffice = () => {
          progress += 0.02
          if (progress <= 1 && groupRef.current) {
            const startX = -10
            const endX = position[0]
            const currentX = startX + (endX - startX) * progress
            groupRef.current.position.x = currentX

            if (progress >= 1) {
              setHasArrived(true)
              setCurrentAnimation('pointing')
              onArrival?.()
            } else {
              requestAnimationFrame(enterOffice)
            }
          }
        }
        enterOffice()
      }
    }
  }, [isPresent, hasArrived, position, onArrival])

  // Animation cycling after arrival
  useEffect(() => {
    if (!hasArrived) return

    const interval = setInterval(() => {
      const animations = ['idle', 'walking', 'gesturing', 'pointing', 'crossedArms', 'talking'] as const
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)]
      setCurrentAnimation(randomAnimation)
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [hasArrived])

  useFrame((state, delta) => {
    if (!groupRef.current || !isPresent) return

    setAnimationTime(prev => prev + delta)

    const group = groupRef.current
    const leftArm = leftArmRef.current
    const rightArm = rightArmRef.current
    const leftLeg = leftLegRef.current
    const rightLeg = rightLegRef.current
    const head = headRef.current

    // Reset rotations to default
    if (leftArm) {
      leftArm.rotation.z = 0
      leftArm.rotation.x = 0
    }
    if (rightArm) {
      rightArm.rotation.z = 0
      rightArm.rotation.x = 0
    }
    if (leftLeg) leftLeg.rotation.x = 0
    if (rightLeg) rightLeg.rotation.x = 0
    if (head) {
      head.rotation.y = 0
      head.rotation.x = 0
    }

    switch (currentAnimation) {
      case 'entering':
        // Walking animation while entering
        if (leftLeg) leftLeg.rotation.x = Math.sin(animationTime * 8) * 0.5
        if (rightLeg) rightLeg.rotation.x = Math.sin(animationTime * 8 + Math.PI) * 0.5
        if (leftArm) leftArm.rotation.x = Math.sin(animationTime * 8 + Math.PI) * 0.3
        if (rightArm) rightArm.rotation.x = Math.sin(animationTime * 8) * 0.3
        break

      case 'walking':
        // Walking animation
        const walkSpeed = 2
        const currentPos = group.position
        const direction = targetPosition.clone().sub(currentPos).normalize()

        if (currentPos.distanceTo(targetPosition) > 0.1) {
          group.position.add(direction.multiplyScalar(walkSpeed * delta))

          // Look in walking direction
          group.lookAt(targetPosition.x, group.position.y, targetPosition.z)

          // Leg animation for walking
          if (leftLeg) leftLeg.rotation.x = Math.sin(animationTime * 8) * 0.5
          if (rightLeg) rightLeg.rotation.x = Math.sin(animationTime * 8 + Math.PI) * 0.5

          // Arm swing while walking
          if (leftArm) leftArm.rotation.x = Math.sin(animationTime * 8 + Math.PI) * 0.3
          if (rightArm) rightArm.rotation.x = Math.sin(animationTime * 8) * 0.3
        }
        break

      case 'gesturing':
        // Gesturing while talking
        if (leftArm) {
          leftArm.rotation.z = Math.sin(animationTime * 3) * 0.8 + 0.5
          leftArm.rotation.x = Math.cos(animationTime * 2.5) * 0.3
        }
        if (rightArm) {
          rightArm.rotation.z = -Math.sin(animationTime * 2.8) * 0.7 - 0.4
          rightArm.rotation.x = Math.cos(animationTime * 3.2) * 0.2
        }
        break

      case 'pointing':
        // Pointing gesture (authoritative)
        if (rightArm) {
          rightArm.rotation.z = -Math.PI / 2 // Point forward
          rightArm.rotation.x = -0.2
        }
        if (leftArm) {
          leftArm.rotation.x = -0.5 // Left hand on hip
        }
        break

      case 'crossedArms':
        // Crossed arms (authority pose)
        if (leftArm) {
          leftArm.rotation.z = Math.PI / 3
          leftArm.rotation.x = -Math.PI / 6
        }
        if (rightArm) {
          rightArm.rotation.z = -Math.PI / 3
          rightArm.rotation.x = -Math.PI / 6
        }
        break

      case 'talking':
        // Talking animation (slight head movement)
        if (head) {
          head.rotation.y = Math.sin(animationTime * 8) * 0.1
          head.rotation.x = Math.sin(animationTime * 6) * 0.05
        }
        // Slight hand gestures while talking
        if (leftArm) leftArm.rotation.z = Math.sin(animationTime * 4) * 0.2
        if (rightArm) rightArm.rotation.z = -Math.sin(animationTime * 3.5) * 0.2
        break

      case 'idle':
      default:
        // Idle breathing animation
        group.position.y = position[1] + Math.sin(animationTime * 2) * 0.02
        break
    }
  })

  if (!isPresent) return null

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Boss name label */}
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.4}
        color="#ff0000"
        anchorX="center"
        anchorY="middle"
      >
        EL ESTIMADO
      </Text>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.7, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#fdbcb4" /> {/* Skin color */}
      </mesh>

      {/* Glasses */}
      <mesh position={[0, 1.75, 0.2]}>
        <ringGeometry args={[0.08, 0.12, 16]} />
        <meshStandardMaterial color="#333" transparent opacity={0.3} />
      </mesh>
      <mesh position={[-0.15, 1.75, 0.2]}>
        <ringGeometry args={[0.08, 0.12, 16]} />
        <meshStandardMaterial color="#333" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0.15, 1.75, 0.2]}>
        <ringGeometry args={[0.08, 0.12, 16]} />
        <meshStandardMaterial color="#333" transparent opacity={0.3} />
      </mesh>

      {/* Body/Torso (Suit) */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.35, 0.8, 8]} />
        <meshStandardMaterial color="#2c3e50" /> {/* Dark suit */}
      </mesh>

      {/* Shirt */}
      <mesh position={[0, 1.2, 0.25]} castShadow>
        <boxGeometry args={[0.4, 0.6, 0.1]} />
        <meshStandardMaterial color="#ffffff" /> {/* White shirt */}
      </mesh>

      {/* Tie */}
      <mesh position={[0, 1.1, 0.3]} castShadow>
        <boxGeometry args={[0.08, 0.4, 0.02]} />
        <meshStandardMaterial color="#e74c3c" /> {/* Red tie */}
      </mesh>

      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.45, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="#2c3e50" /> {/* Suit sleeve */}
      </mesh>

      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.45, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="#2c3e50" /> {/* Suit sleeve */}
      </mesh>

      {/* Left Hand */}
      <mesh position={[-0.45, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#fdbcb4" /> {/* Skin color */}
      </mesh>

      {/* Right Hand */}
      <mesh position={[0.45, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#fdbcb4" /> {/* Skin color */}
      </mesh>

      {/* Left Leg */}
      <mesh ref={leftLegRef} position={[-0.15, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
        <meshStandardMaterial color="#2c3e50" /> {/* Suit pants */}
      </mesh>

      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.15, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
        <meshStandardMaterial color="#2c3e50" /> {/* Suit pants */}
      </mesh>

      {/* Left Shoe */}
      <mesh position={[-0.15, -0.05, 0.05]} castShadow>
        <boxGeometry args={[0.15, 0.1, 0.25]} />
        <meshStandardMaterial color="#000000" /> {/* Black shoes */}
      </mesh>

      {/* Right Shoe */}
      <mesh position={[0.15, -0.05, 0.05]} castShadow>
        <boxGeometry args={[0.15, 0.1, 0.25]} />
        <meshStandardMaterial color="#000000" /> {/* Black shoes */}
      </mesh>
    </group>
  )
}
