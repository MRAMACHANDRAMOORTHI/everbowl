import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const FoodItem: React.FC<{ position: [number, number, number], color: string, type: 'smoothie' | 'fruit' | 'salad' | 'juice' }> = ({ position, color, type }) => {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
    }
  })

  const renderFoodItem = () => {
    switch (type) {
      case 'smoothie':
        return (
          <group>
            {/* Bowl */}
            <mesh position={[0, -0.3, 0]}>
              <cylinderGeometry args={[0.8, 0.6, 0.4, 16]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Smoothie */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.7, 16, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {/* Toppings */}
            <mesh position={[0.3, 0.3, 0.2]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color="#FF6B6B" />
            </mesh>
            <mesh position={[-0.2, 0.3, 0.3]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color="#4ECDC4" />
            </mesh>
          </group>
        )
      case 'fruit':
        return (
          <group>
            {/* Apple */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.4, 16, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {/* Stem */}
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
          </group>
        )
      case 'salad':
        return (
          <group>
            {/* Bowl */}
            <mesh position={[0, -0.2, 0]}>
              <sphereGeometry args={[0.6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Lettuce */}
            <mesh position={[0, 0.1, 0]}>
              <sphereGeometry args={[0.5, 12, 12]} />
              <meshStandardMaterial color="#90EE90" />
            </mesh>
            {/* Tomatoes */}
            <mesh position={[0.2, 0.2, 0.1]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color="#FF6347" />
            </mesh>
            <mesh position={[-0.1, 0.2, 0.2]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color="#FF6347" />
            </mesh>
          </group>
        )
      case 'juice':
        return (
          <group>
            {/* Glass */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.25, 1, 16]} />
              <meshStandardMaterial color="#E6F3FF" transparent opacity={0.3} />
            </mesh>
            {/* Juice */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.28, 0.23, 0.8, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {/* Straw */}
            <mesh position={[0.2, 0.3, 0]} rotation={[0, 0, 0.3]}>
              <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
              <meshStandardMaterial color="#FF69B4" />
            </mesh>
          </group>
        )
      default:
        return null
    }
  }

  return (
    <group ref={ref} position={position}>
      {renderFoodItem()}
    </group>
  )
}

const FoodScene: React.FC = () => {
  return (
    <group>
      {/* Smoothie Bowls */}
      <FoodItem position={[-2, 0, 1]} color="#FF69B4" type="smoothie" />
      <FoodItem position={[2, 0.5, -1]} color="#9370DB" type="smoothie" />
      
      {/* Fresh Fruits */}
      <FoodItem position={[-1, 1, -2]} color="#FF6B6B" type="fruit" />
      <FoodItem position={[1, -0.5, 2]} color="#32CD32" type="fruit" />
      <FoodItem position={[0, 1.5, 0]} color="#FFA500" type="fruit" />
      
      {/* Salads */}
      <FoodItem position={[-3, -0.5, -1]} color="#90EE90" type="salad" />
      <FoodItem position={[3, 1, 1]} color="#98FB98" type="salad" />
      
      {/* Juices */}
      <FoodItem position={[0, -1, -1]} color="#FF8C00" type="juice" />
      <FoodItem position={[-1.5, 0.8, 1.5]} color="#32CD32" type="juice" />
      <FoodItem position={[1.5, -0.8, -1.5]} color="#FF1493" type="juice" />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#FFE4B5" />
      <pointLight position={[5, -5, -5]} intensity={0.3} color="#E0FFFF" />
    </group>
  )
}

export const FruitBowlCanvas: React.FC = () => {
  return (
    <div className="w-full h-96 md:h-[500px]">
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        <FoodScene />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}