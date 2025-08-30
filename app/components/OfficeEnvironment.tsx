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

      {/* Desk */}
      <group position={[3, 0, 2]}>
        {/* Desktop */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[2, 0.05, 1]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        {/* Desk legs */}
        <mesh position={[-0.8, 0.4, -0.4]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.8, 0.4, -0.4]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-0.8, 0.4, 0.4]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.8, 0.4, 0.4]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>

      {/* Office Chair */}
      <group position={[3, 0, 3]}>
        {/* Seat */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.1]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.9, -0.3]} castShadow>
          <boxGeometry args={[0.6, 0.8, 0.1]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        {/* Chair base */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.1, 0.05]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {/* Computer Monitor */}
      <mesh position={[3, 1.1, 1.8]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Monitor Screen */}
      <mesh position={[3, 1.1, 1.77]} castShadow>
        <boxGeometry args={[0.55, 0.35, 0.01]} />
        <meshStandardMaterial color="#0066cc" emissive="#0033aa" emissiveIntensity={0.3} />
      </mesh>

      {/* Keyboard */}
      <mesh position={[3, 0.78, 2.3]} castShadow>
        <boxGeometry args={[0.4, 0.02, 0.15]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Mouse */}
      <mesh position={[3.4, 0.78, 2.2]} castShadow>
        <boxGeometry args={[0.06, 0.02, 0.1]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      {/* Office Plant */}
      <group position={[-2, 0, -3]}>
        {/* Pot */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.25, 0.4]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        {/* Plant stems */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.4]} />
          <meshStandardMaterial color="#228b22" />
        </mesh>
        {/* Leaves */}
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
      <mesh position={[4, 0.5, -2]} castShadow>
        <boxGeometry args={[0.5, 1, 0.6]} />
        <meshStandardMaterial color="#708090" />
      </mesh>

      {/* Cabinet Drawers */}
      <mesh position={[4.2, 0.7, -2]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.4]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[4.2, 0.3, -2]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.4]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* Bookshelf */}
      <group position={[-4, 0, 0]}>
        {/* Shelf frame */}
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[0.1, 2, 1]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        {/* Shelves */}
        <mesh position={[0.4, 0.5, 0]} castShadow>
          <boxGeometry args={[0.8, 0.05, 1]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        <mesh position={[0.4, 1, 0]} castShadow>
          <boxGeometry args={[0.8, 0.05, 1]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        <mesh position={[0.4, 1.5, 0]} castShadow>
          <boxGeometry args={[0.8, 0.05, 1]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>

        {/* Books */}
        <mesh position={[0.3, 0.6, 0.2]} castShadow>
          <boxGeometry args={[0.15, 0.2, 0.03]} />
          <meshStandardMaterial color="#cc0000" />
        </mesh>
        <mesh position={[0.5, 0.6, 0.2]} castShadow>
          <boxGeometry args={[0.15, 0.2, 0.03]} />
          <meshStandardMaterial color="#0066cc" />
        </mesh>
        <mesh position={[0.7, 0.6, 0.2]} castShadow>
          <boxGeometry args={[0.15, 0.2, 0.03]} />
          <meshStandardMaterial color="#009900" />
        </mesh>
      </group>

      {/* Walls */}
      <mesh position={[0, 2, -5]} receiveShadow>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      <mesh position={[-10, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      <mesh position={[10, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
    </group>
  )
}
