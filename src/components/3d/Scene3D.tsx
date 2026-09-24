import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { AICore3D } from './AICore3D';
import { StarField3D } from './StarField3D';

interface Scene3DProps {
  currentSection: number;
  scrollProgress: number;
  mousePos: { x: number; y: number };
  isCoreHovered?: boolean;
}

// Camera controller that smoothly animates camera position & lookAt based on scroll section
const CameraController: React.FC<{
  currentSection: number;
  scrollProgress: number;
  mousePos: { x: number; y: number };
}> = ({ currentSection, scrollProgress, mousePos }) => {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 5.5));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  // Keyframe targets for camera trajectory through the 3D digital world
  const cameraPositions: [number, number, number][] = [
    [0, 0, 5.5],        // 0: Hero - Direct frontal view of AI Core
    [-1.8, 0.4, 4.8],   // 1: About - Shift to side, looking at core data nodes
    [0, 0.2, 6.2],      // 2: Neural Stack - Wide view of neural constellation
    [1.6, -0.2, 5.0],   // 3: Projects - Dynamic angle on holographic projects
    [0, 0.5, 5.8],      // 4: Architecture - Aligned on 3D data pipeline
    [0, -0.4, 5.2],     // 5: Ask AI & Terminal - Elevated view above terminal
    [0, 1.4, 5.6],      // 6: Contact Transmission - Looking up into the digital cosmos
  ];

  const lookAtTargets: [number, number, number][] = [
    [0, 0, 0],
    [0.5, 0, 0],
    [0, 0, 0],
    [-0.5, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0.5, -2],
  ];

  useFrame(() => {
    const sec = Math.min(Math.max(currentSection, 0), cameraPositions.length - 1);
    const targetP = cameraPositions[sec];
    const targetL = lookAtTargets[sec];

    // Subtle mouse parallax
    const px = mousePos.x * 0.4;
    const py = -mousePos.y * 0.3;

    const desiredX = targetP[0] + px;
    const desiredY = targetP[1] + py;
    const desiredZ = targetP[2];

    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, desiredX, 0.04);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, desiredY, 0.04);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, desiredZ, 0.04);

    currentTarget.current.x = THREE.MathUtils.lerp(currentTarget.current.x, targetL[0], 0.04);
    currentTarget.current.y = THREE.MathUtils.lerp(currentTarget.current.y, targetL[1], 0.04);
    currentTarget.current.z = THREE.MathUtils.lerp(currentTarget.current.z, targetL[2], 0.04);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
};

export const Scene3D: React.FC<Scene3DProps> = ({
  currentSection,
  scrollProgress,
  mousePos,
  isCoreHovered = false,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#070b14']} />
        <fog attach="fog" args={['#070b14', 4, 25]} />

        {/* Dynamic Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-5, -5, -2]} intensity={0.5} color="#00f0ff" />
        <pointLight position={[0, 0, 3]} intensity={1.5} color="#00f0ff" distance={8} />

        {/* Continuous 3D World Elements */}
        <StarField3D count={700} />
        
        {/* Central Intelligent AI Core */}
        <AICore3D
          scrollProgress={scrollProgress}
          mousePos={mousePos}
          hovered={isCoreHovered}
        />

        {/* Scroll-driven Camera Trajectory */}
        <CameraController
          currentSection={currentSection}
          scrollProgress={scrollProgress}
          mousePos={mousePos}
        />
      </Canvas>
    </div>
  );
};
