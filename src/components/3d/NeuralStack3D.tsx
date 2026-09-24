import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PORTFOLIO_DATA } from '../../data/portfolio';

interface NeuralStackProps {
  activeCategory?: string;
  onSelectSkill?: (skill: { name: string; level: string; category: string; description: string }) => void;
}

export const NeuralStack3D: React.FC<NeuralStackProps> = ({ activeCategory = 'All', onSelectSkill }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Flatten all skills with positions
  const allSkills = useMemo(() => {
    const list: Array<{
      name: string;
      level: string;
      category: string;
      description: string;
      coords: [number, number, number];
      color: string;
    }> = [];

    const categoryColors: Record<string, string> = {
      'Programming Languages': '#00f0ff',
      'Data & Machine Learning': '#10b981',
      'Web & Full-Stack': '#8b5cf6',
      'Databases & Tools': '#f59e0b',
    };

    PORTFOLIO_DATA.skills.forEach((cat) => {
      cat.skills.forEach((s) => {
        list.push({
          ...s,
          color: categoryColors[cat.category] || '#00f0ff',
        });
      });
    });

    return list;
  }, []);

  // Filter skills based on category if selected
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return allSkills;
    return allSkills.filter((s) => s.category.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes(s.category.toLowerCase()));
  }, [activeCategory, allSkills]);

  // Construct lines connecting each node to center [0,0,0] and nearby nodes
  const linesGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    filteredSkills.forEach((skill) => {
      const p = new THREE.Vector3(...skill.coords);
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(p);
    });
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [filteredSkills]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Center Neural Core Hub */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#030712"
          emissive="#00f0ff"
          emissiveIntensity={1.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Central Hub Wireframe Ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.9, 0.015, 16, 64]} />
        <meshBasicMaterial color="#00f0ff" wireframe opacity={0.6} transparent />
      </mesh>

      {/* Central Label */}
      <Html position={[0, -0.9, 0]} center distanceFactor={10}>
        <div className="bg-dark-900/90 text-cyan-400 font-mono text-[10px] tracking-wider px-2 py-0.5 rounded border border-cyan-500/40 whitespace-nowrap pointer-events-none shadow-[0_0_10px_rgba(0,240,255,0.3)]">
          NEURAL STACK CORE
        </div>
      </Html>

      {/* Connection Lines */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Skill Nodes in 3D Space */}
      {filteredSkills.map((skill) => {
        const isHovered = hoveredNode === skill.name;
        return (
          <group key={skill.name} position={skill.coords}>
            {/* Interactive Node Mesh */}
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredNode(skill.name);
                onSelectSkill?.(skill);
              }}
              onPointerOut={() => setHoveredNode(null)}
              onClick={(e) => {
                e.stopPropagation();
                onSelectSkill?.(skill);
              }}
            >
              <sphereGeometry args={[isHovered ? 0.22 : 0.14, 16, 16]} />
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={isHovered ? 2.5 : 1.0}
                roughness={0.1}
                metalness={0.5}
              />
            </mesh>

            {/* Pulsing outer halo on hover */}
            {isHovered && (
              <mesh>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial
                  color={skill.color}
                  transparent
                  opacity={0.3}
                  wireframe
                />
              </mesh>
            )}

            {/* 3D Floating Node Name Tag */}
            <Html position={[0, 0.3, 0]} center distanceFactor={12}>
              <div
                className={`font-mono text-xs px-2 py-1 rounded transition-all duration-200 whitespace-nowrap cursor-pointer select-none backdrop-blur-md border ${
                  isHovered
                    ? 'bg-cyan-950/95 text-cyan-300 border-cyan-400 scale-110 shadow-[0_0_15px_rgba(0,240,255,0.6)] z-30'
                    : 'bg-dark-900/80 text-slate-300 border-slate-700/60 hover:border-cyan-500/50 text-[11px]'
                }`}
                onClick={() => onSelectSkill?.(skill)}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                  <span>{skill.name}</span>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
