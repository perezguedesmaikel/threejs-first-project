'use client'
import { useRef } from 'react'
import * as THREE from 'three'

export function OfficeEnvironment() {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#e8e8e8" />
      </mesh>

      {/* Work Station 1 - Mondaca */}
      <group position={[-3, 0, 2]}>
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[1.5, 0.05, 0.8]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        <mesh position={[-0.6, 0.4, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.6, 0.4, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-0.6, 0.4, 0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.6, 0.4, 0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* Computer */}
        <mesh position={[0, 1.05, -0.2]} castShadow>
          <boxGeometry args={[0.5, 0.3, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 1.05, -0.22]} castShadow>
          <boxGeometry args={[0.45, 0.25, 0.01]} />
          <meshStandardMaterial color="#0066cc" emissive="#0033aa" emissiveIntensity={0.3} />
        </mesh>
        {/* Keyboard */}
        <mesh position={[0, 0.78, 0.1]} castShadow>
          <boxGeometry args={[0.3, 0.02, 0.12]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {/* Work Station 2 - Jorge */}
      <group position={[0, 0, 2]}>
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[1.5, 0.05, 0.8]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        <mesh position={[-0.6, 0.4, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.6, 0.4, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-0.6, 0.4, 0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.6, 0.4, 0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* Computer */}
        <mesh position={[0, 1.05, -0.2]} castShadow>
          <boxGeometry args={[0.5, 0.3, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 1.05, -0.22]} castShadow>
          <boxGeometry args={[0.45, 0.25, 0.01]} />
          <meshStandardMaterial color="#0066cc" emissive="#0033aa" emissiveIntensity={0.3} />
        </mesh>
        {/* Keyboard */}
        <mesh position={[0, 0.78, 0.1]} castShadow>
          <boxGeometry args={[0.3, 0.02, 0.12]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {/* Work Station 3 - Leo */}
      <group position={[3, 0, 2]}>
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[1.5, 0.05, 0.8]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        <mesh position={[-0.6, 0.4, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.6, 0.4, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-0.6, 0.4, 0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.6, 0.4, 0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* Computer */}
        <mesh position={[0, 1.05, -0.2]} castShadow>
          <boxGeometry args={[0.5, 0.3, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 1.05, -0.22]} castShadow>
          <boxGeometry args={[0.45, 0.25, 0.01]} />
          <meshStandardMaterial color="#0066cc" emissive="#0033aa" emissiveIntensity={0.3} />
        </mesh>
        {/* Keyboard */}
        <mesh position={[0, 0.78, 0.1]} castShadow>
          <boxGeometry args={[0.3, 0.02, 0.12]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {/* Office chairs for each workstation */}
      <group position={[-3, 0, 3]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.08]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[0, 0.8, -0.25]} castShadow>
          <boxGeometry args={[0.5, 0.6, 0.08]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </group>

      <group position={[0, 0, 3]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.08]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[0, 0.8, -0.25]} castShadow>
          <boxGeometry args={[0.5, 0.6, 0.08]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </group>

      <group position={[3, 0, 3]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.08]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[0, 0.8, -0.25]} castShadow>
          <boxGeometry args={[0.5, 0.6, 0.08]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </group>

      {/* Office Plant */}
      <group position={[-5, 0, -3]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.25, 0.4]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.4]} />
          <meshStandardMaterial color="#228b22" />
        </mesh>
        <mesh position={[-0.1, 0.9, 0]} castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#32cd32" />
        </mesh>
        <mesh position={[0.1, 0.85, 0.1]} castShadow>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#32cd32" />
        </mesh>
        <mesh position={[0, 0.95, -0.1]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#32cd32" />
        </mesh>
      </group>

      {/* File Cabinet */}
      <mesh position={[6, 0.5, -2]} castShadow>
        <boxGeometry args={[0.5, 1, 0.6]} />
        <meshStandardMaterial color="#708090" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2, -8]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      <mesh position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[16, 4]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      <mesh position={[10, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[16, 4]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
    </group>
  )
}
