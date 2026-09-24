import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { ProjectArchitectureNode } from '../../data/portfolio';

interface ArchitecturePipelineProps {
  nodes: ProjectArchitectureNode[];
  activeNodeId?: string;
  onSelectNode?: (node: ProjectArchitectureNode) => void;
  accentColor?: string;
}

export const ArchitecturePipeline3D: React.FC<ArchitecturePipelineProps> = ({
  nodes,
  activeNodeId,
  onSelectNode,
  accentColor = '#00f0ff',
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const packetsRef = useRef<THREE.Group>(null);

  // Create continuous spline curve through the nodes
  const curve = useMemo(() => {
    if (nodes.length < 2) return null;
    const points = nodes.map((n) => new THREE.Vector3(...n.position));
    return new THREE.CatmullRomCurve3(points);
  }, [nodes]);

  // Generate tube geometry for the visual bus pipeline
  const tubeGeometry = useMemo(() => {
    if (!curve) return null;
    return new THREE.TubeGeometry(curve, 64, 0.03, 8, false);
  }, [curve]);

  // Data packets traveling on curve
  const packetCount = 4;
  const packets = useMemo(() => {
    return Array.from({ length: packetCount }, (_, i) => ({
      offset: i / packetCount,
      speed: 0.15,
      size: 0.09,
    }));
  }, []);

  const packetMeshes = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (!curve) return;
    const time = state.clock.getElapsedTime();

    packets.forEach((p, idx) => {
      const mesh = packetMeshes.current[idx];
      if (mesh) {
        const t = (time * p.speed + p.offset) % 1;
        const pt = curve.getPointAt(t);
        mesh.position.copy(pt);
      }
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Pipeline Data Bus Conduit */}
      {tubeGeometry && (
        <mesh geometry={tubeGeometry}>
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.8}
            transparent
            opacity={0.5}
            roughness={0.2}
          />
        </mesh>
      )}

      {/* Traveling Glowing Data Packets */}
      <group ref={packetsRef}>
        {packets.map((_, idx) => (
          <mesh
            key={idx}
            ref={(el) => {
              packetMeshes.current[idx] = el;
            }}
          >
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>

      {/* Architecture System Nodes */}
      {nodes.map((node, index) => {
        const isSelected = activeNodeId === node.id;
        const isHovered = hoveredNodeId === node.id;
        const isHighlight = isSelected || isHovered;

        return (
          <group key={node.id} position={node.position}>
            {/* Outer Hex Ring / Wireframe on active */}
            {isHighlight && (
              <mesh>
                <ringGeometry args={[0.45, 0.49, 6]} />
                <meshBasicMaterial
                  color={accentColor}
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            )}

            {/* Main Node Mesh */}
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredNodeId(node.id);
              }}
              onPointerOut={() => setHoveredNodeId(null)}
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode?.(node);
              }}
            >
              <octahedronGeometry args={[isHighlight ? 0.32 : 0.25, 0]} />
              <meshStandardMaterial
                color={isHighlight ? '#ffffff' : accentColor}
                emissive={accentColor}
                emissiveIntensity={isHighlight ? 2.5 : 1.2}
                roughness={0.1}
                metalness={0.8}
              />
            </mesh>

            {/* Sequence number badge in 3D */}
            <mesh position={[0, 0.42, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>

            {/* Interactive 3D Label Card */}
            <Html position={[0, -0.5, 0]} center distanceFactor={11}>
              <div
                className={`p-2.5 rounded-lg border transition-all duration-300 text-left min-w-[150px] max-w-[200px] cursor-pointer backdrop-blur-md select-none ${
                  isHighlight
                    ? 'bg-dark-900/95 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                    : 'bg-dark-950/80 border-slate-800 hover:border-cyan-500/40'
                }`}
                onClick={() => onSelectNode?.(node)}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-0.5">
                  <span>STEP 0{index + 1}</span>
                  <span className="uppercase text-[9px] px-1 py-0.2 bg-cyan-950/60 border border-cyan-500/30 rounded">
                    {node.type}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-100 font-display leading-snug">
                  {node.label}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                  {node.subLabel}
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
