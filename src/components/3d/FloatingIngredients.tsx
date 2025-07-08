import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FloatingFood: React.FC<{ 
  position: [number, number, number], 
  color: string, 
  size: number,
  type: 'berry' | 'leaf' | 'nut' | 'seed' | 'fruit'
}> = ({ position, color, size, type }) => {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.8
      ref.current.rotation.x += 0.02
      ref.current.rotation.y += 0.03
      ref.current.rotation.z += 0.01
    }
  })

  const renderFood = () => {
    switch (type) {
      case 'berry':
        return (
          <group>
            <mesh>
              <sphereGeometry args={[size, 12, 12]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {/* Small bumps for berry texture */}
            {Array.from({ length: 8 }).map((_, i) => (
              <mesh key={i} position={[
                Math.cos(i * Math.PI / 4) * size * 0.8,
                Math.sin(i * Math.PI / 4) * size * 0.8,
                0
              ]}>
                <sphereGeometry args={[size * 0.1, 4, 4]} />
                <meshStandardMaterial color={color} />
              </mesh>
            ))}
          </group>
        )
      case 'leaf':
        return (
          <mesh>
            <planeGeometry args={[size * 2, size * 3]} />
            <meshStandardMaterial color={color} side={THREE.DoubleSide} />
          </mesh>
        )
      case 'nut':
        return (
          <mesh>
            <sphereGeometry args={[size, 8, 6]} />
            <meshStandardMaterial color={color} roughness={0.8} />
          </mesh>
        )
      case 'seed':
        return (
          <mesh>
            <sphereGeometry args={[size * 0.5, 6, 6]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
      case 'fruit':
        return (
          <group>
            <mesh>
              <sphereGeometry args={[size, 12, 12]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {/* Fruit highlight */}
            <mesh position={[size * 0.3, size * 0.3, size * 0.3]}>
              <sphereGeometry args={[size * 0.2, 8, 8]} />
              <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} />
            </mesh>
          </group>
        )
      default:
        return (
          <mesh>
            <sphereGeometry args={[size, 8, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
    }
  }

  return (
    <mesh ref={ref} position={position}>
      {renderFood()}
    </mesh>
  )
}

export const FloatingIngredientsCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Berries */}
        <FloatingFood position={[-4, 2, 0]} color="#FF6B6B" size={0.15} type="berry" />
        <FloatingFood position={[4, -1, 0]} color="#8A2BE2" size={0.12} type="berry" />
        <FloatingFood position={[-2, -3, 0]} color="#DC143C" size={0.18} type="berry" />
        
        {/* Leaves */}
        <FloatingFood position={[3, 3, 0]} color="#32CD32" size={0.1} type="leaf" />
        <FloatingFood position={[-3, -1, 0]} color="#228B22" size={0.12} type="leaf" />
        <FloatingFood position={[1, -2, 0]} color="#90EE90" size={0.08} type="leaf" />
        
        {/* Nuts */}
        <FloatingFood position={[2, 1, 0]} color="#D2691E" size={0.1} type="nut" />
        <FloatingFood position={[-1, 2, 0]} color="#8B4513" size={0.12} type="nut" />
        
        {/* Seeds */}
        <FloatingFood position={[0, -1, 0]} color="#2F4F4F" size={0.08} type="seed" />
        <FloatingFood position={[-4, 0, 0]} color="#696969" size={0.06} type="seed" />
        <FloatingFood position={[4, 2, 0]} color="#A0522D" size={0.07} type="seed" />
        
        {/* Fruits */}
        <FloatingFood position={[1, 3, 0]} color="#FFA500" size={0.2} type="fruit" />
        <FloatingFood position={[-2, 1, 0]} color="#FFD700" size={0.16} type="fruit" />
        <FloatingFood position={[0, 2, 0]} color="#FF69B4" size={0.14} type="fruit" />
        
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.4} color="#FFE4B5" />
      </Canvas>
    </div>
  )
}