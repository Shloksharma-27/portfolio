import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AICoreProps {
  scrollProgress?: number;
  mousePos?: { x: number; y: number };
  hovered?: boolean;
}

export const AICore3D: React.FC<AICoreProps> = ({ scrollProgress = 0, mousePos = { x: 0, y: 0 }, hovered = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);
  const energySphereRef = useRef<THREE.Mesh>(null);

  // Pre-calculate satellite node positions
  const satelliteCount = 18;
  const satellites = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < satelliteCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / satelliteCount);
      const theta = Math.sqrt(satelliteCount * Math.PI) * phi;
      const radius = 2.4 + (i % 3) * 0.4;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      list.push({ pos: new THREE.Vector3(x, y, z), speed: 0.5 + (i % 4) * 0.3, size: 0.04 + (i % 3) * 0.025 });
    }
    return list;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Mouse Parallax lerp
      const targetRotX = (mousePos.y * 0.3) + scrollProgress * Math.PI * 0.5;
      const targetRotY = (mousePos.x * 0.4) + time * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);

      // Scroll position morph
      const targetScale = hovered ? 1.15 : (1 - Math.min(scrollProgress * 0.25, 0.4));
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08));
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x = time * 0.3;
      innerCoreRef.current.rotation.y = time * 0.4;
      const pulse = 1 + Math.sin(time * 3) * 0.06;
      innerCoreRef.current.scale.setScalar(pulse);
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * 0.2;
      wireframeRef.current.rotation.z = time * 0.25;
    }

    if (energySphereRef.current) {
      const glowScale = 0.85 + Math.sin(time * 4) * 0.08;
      energySphereRef.current.scale.setScalar(glowScale);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.5;
      ring1Ref.current.rotation.y = time * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.4;
      ring2Ref.current.rotation.z = time * 0.35;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.45;
      ring3Ref.current.rotation.x = -time * 0.25;
    }

    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y = -time * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Pulsing Plasma Energy Sphere */}
      <mesh ref={energySphereRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner Geodesic Core */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#0a192f"
          emissive="#00b4d8"
          emissiveIntensity={hovered ? 1.2 : 0.7}
          roughness={0.2}
          metalness={0.9}
          flatShading
        />
      </mesh>

      {/* Outer Wireframe Lattice */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Outer Gyroscopic Quantum Ring 1 */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[1.9, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </mesh>
        {/* Ring Orbiting Data Marker */}
        <mesh position={[1.9, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Outer Gyroscopic Quantum Ring 2 */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[2.3, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={1.0}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[-2.3, 0, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* Outer Gyroscopic Quantum Ring 3 */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[2.7, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Orbiting Satellite Neural Nodes */}
      <group ref={nodesGroupRef}>
        {satellites.map((sat, idx) => (
          <mesh key={idx} position={sat.pos}>
            <octahedronGeometry args={[sat.size, 0]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? "#00f0ff" : "#a855f7"}
              emissive={idx % 2 === 0 ? "#00f0ff" : "#a855f7"}
              emissiveIntensity={0.9}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>

      {/* Ambient Core Glow Light */}
      <pointLight color="#00f0ff" intensity={hovered ? 3.5 : 2.2} distance={8} decay={2} />
      <pointLight color="#8b5cf6" intensity={1.5} distance={6} decay={2} position={[0, -1, 0]} />
    </group>
  );
};
