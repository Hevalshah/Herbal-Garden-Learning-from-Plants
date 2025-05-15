
import { useRef, useState } from "react";
import { Plant as PlantType } from "@/data/plants";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

interface Plant3DProps {
  plant: PlantType;
  onClick: () => void;
  isRaining: boolean;
}

const Plant3D = ({ plant, onClick, isRaining }: Plant3DProps) => {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  
  // Simple state for color instead of animations
  const foliageColor = hovered ? "#F0E6D2" : plant.color || "#4CAF50";
  
  // Gentle sway animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Different sway for each plant based on its position
      const offset = plant.position ? plant.position[0] * 100 + plant.position[2] : 0;
      const swayFactor = isRaining ? 0.015 : 0.007; // More movement in rain
      
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5 + offset) * 0.05;
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.7 + offset) * swayFactor;
    }
  });
  
  const height = plant.height || 1;
  const plantScale = plant.scale || 1;
  
  // Calculate final scale based on hover state
  const finalScale = plantScale * (hovered ? 1.1 : 1);
  
  return (
    <group
      position={plant.position || [0, 0, 0]}
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => {
        setHovered(true);
        setShowLabel(true);
      }}
      onPointerOut={() => {
        setHovered(false);
        setTimeout(() => setShowLabel(false), 500);
      }}
    >
      {/* Plant stem */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <cylinderGeometry args={[0.05 * plantScale, 0.08 * plantScale, height, 8]} />
        <meshStandardMaterial color="#2D4F2D" roughness={0.8} />
      </mesh>
      
      {/* Plant foliage */}
      <mesh
        position={[0, height, 0]}
        scale={finalScale}
        castShadow
      >
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial 
          color={foliageColor} 
          roughness={0.7} 
        />
      </mesh>
      
      {/* Plant label */}
      {showLabel && (
        <Html position={[0, height + 1, 0]} center>
          <div className="bg-black/60 text-white px-3 py-1.5 rounded-lg backdrop-blur-sm whitespace-nowrap">
            {plant.name}
          </div>
        </Html>
      )}
    </group>
  );
};

export default Plant3D;
