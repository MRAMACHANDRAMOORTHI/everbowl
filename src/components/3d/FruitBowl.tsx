import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Realistic Apple Component
const Apple = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const meshRef = useRef<THREE.Group | null>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Apple body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial 
            color="#ff4444" 
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        
        {/* Apple stem */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        
        {/* Apple leaf */}
        <mesh position={[0.1, 0.8, 0]} rotation={[0, 0, Math.PI / 6]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      </group>
    </Float>
  )
}

// Realistic Orange Component
const Orange = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const meshRef = useRef<THREE.Group | null>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.8) * 0.12
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.6}>
      <group ref={meshRef} position={position} scale={scale}>
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <MeshDistortMaterial 
            color="#ff8c00" 
            distort={0.1}
            speed={2}
            roughness={0.4}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Realistic Banana Component
const Banana = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const meshRef = useRef<THREE.Group | null>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.005
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.08
    }
  })

  const bananaShape = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.3, 0.2, 0),
      new THREE.Vector3(0.6, 0.1, 0),
      new THREE.Vector3(0.9, -0.1, 0),
      new THREE.Vector3(1.2, -0.3, 0)
    ])
    
    const geometry = new THREE.TubeGeometry(curve, 20, 0.15, 8, false)
    return geometry
  }, [])

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={0.4}>
      <group ref={meshRef} position={position} scale={scale}>
        <mesh geometry={bananaShape}>
          <meshStandardMaterial 
            color="#ffff00" 
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Honey Jar Component
const HoneyJar = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const meshRef = useRef<THREE.Group | null>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7) * 0.06
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.5} floatIntensity={0.3}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Jar body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.3, 0.8, 12]} />
          <meshStandardMaterial 
            color="#FFA500" 
            transparent
            opacity={0.7}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
        
        {/* Jar lid */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.1, 12]} />
          <meshStandardMaterial 
            color="#DAA520" 
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        
        {/* Honey inside */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.35, 0.25, 0.6, 12]} />
          <meshStandardMaterial 
            color="#FFBF00" 
            transparent
            opacity={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Nuts Component
const Nuts = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const meshRef = useRef<THREE.Group | null>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.006
      meshRef.current.rotation.z += 0.004
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 1.1) * 0.09
    }
  })

  return (
    <Float speed={1.3} rotationIntensity={1.5} floatIntensity={0.4}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Walnut */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.25, 12, 12]} />
          <meshStandardMaterial 
            color="#8B4513" 
            roughness={0.8}
          />
        </mesh>
        
        {/* Almond */}
        <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <sphereGeometry args={[0.15, 8, 12]} />
          <meshStandardMaterial 
            color="#D2B48C" 
            roughness={0.6}
          />
        </mesh>
        
        {/* Cashew */}
        <mesh position={[-0.5, 0.1, 0.2]} rotation={[Math.PI / 6, 0, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial 
            color="#F5DEB3" 
            roughness={0.5}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Juice Glass Component
const JuiceGlass = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const meshRef = useRef<THREE.Group | null>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.05
    }
  })

  return (
    <Float speed={0.9} rotationIntensity={0.3} floatIntensity={0.2}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Glass body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.25, 1, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
        
        {/* Orange juice inside */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.28, 0.23, 0.7, 16]} />
          <meshStandardMaterial 
            color="#ff8c00" 
            transparent
            opacity={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Foam on top */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.28, 8, 8]} />
          <meshStandardMaterial 
            color="#fffacd" 
            transparent
            opacity={0.6}
            roughness={0.4}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Wicker Basket Component
const WickerBasket = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const meshRef = useRef<THREE.Group | null>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.03
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.1}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Basket body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 0.8, 0.6, 16]} />
          <meshStandardMaterial 
            color="#DEB887" 
            roughness={0.8}
          />
        </mesh>
        
        {/* Basket handle */}
        <mesh position={[0, 0.5, 0]}>
          <torusGeometry args={[0.8, 0.05, 8, 16]} />
          <meshStandardMaterial 
            color="#D2B48C" 
            roughness={0.7}
          />
        </mesh>
        
        {/* Fruits in basket */}
        <Apple position={[0.3, 0.4, 0.2]} scale={0.6} />
        <Orange position={[-0.2, 0.3, -0.1]} scale={0.5} />
        <Banana position={[0.1, 0.2, 0.3]} scale={0.4} />
      </group>
    </Float>
  )
}

// Main Floating Elements Canvas
export const FloatingIngredientsCanvas = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Floating elements positioned around the screen */}
        <Apple position={[-4, 3, 0]} scale={0.8} />
        <Orange position={[4, 2, -1]} scale={0.7} />
        <Banana position={[-3, -2, 1]} scale={0.6} />
        <HoneyJar position={[3, -3, 0]} scale={0.5} />
        <Nuts position={[-2, 1, 2]} scale={0.9} />
        <JuiceGlass position={[2, 1, -2]} scale={0.8} />
        <Nuts position={[4, -1, 1]} scale={0.7} />
        <Orange position={[-4, -1, -1]} scale={0.6} />
        <Apple position={[1, 4, 1]} scale={0.5} />
        <HoneyJar position={[-1, -4, 0]} scale={0.6} />
      </Canvas>
    </div>
  )
}

// Main Fruit Bowl Canvas
export const FruitBowlCanvas = () => {
  return (
    <div className="w-full h-96 md:h-[500px]">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, 5, -5]} intensity={0.8} />
        <spotLight position={[0, 10, 0]} intensity={0.5} />
        
        {/* Main basket with fruits */}
        <WickerBasket position={[0, -1, 0]} scale={1.2} />
        
        {/* Additional floating elements around the basket */}
        <Apple position={[-2, 1, 1]} scale={0.9} />
        <Orange position={[2, 0.5, -0.5]} scale={0.8} />
        <Banana position={[0, 2, 2]} scale={0.7} />
        <HoneyJar position={[-1.5, 0, 2]} scale={0.8} />
        <JuiceGlass position={[2.5, -0.5, 1]} scale={0.9} />
        <Nuts position={[1, 1.5, -1]} scale={0.8} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}