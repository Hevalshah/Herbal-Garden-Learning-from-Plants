
import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import { Plant as PlantType } from "@/data/plants";
import { Sphere, Cylinder, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";

interface Plant3DProps {
  plant: PlantType;
  onClick: () => void;
  isRaining: boolean;
}

const Plant3D = ({ plant, onClick, isRaining }: Plant3DProps) => {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  
  // Animation for hover effect
  const { scale, color } = useSpring({
    scale: hovered ? [1.1, 1.1, 1.1] : [1, 1, 1],
    color: hovered ? "#F0E6D2" : plant.color,
    config: { mass: 1, tension: 300, friction: 30 }
  });
  
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
      <Cylinder
        args={[0.05 * plantScale, 0.08 * plantScale, height, 8]}
        position={[0, height / 2, 0]}
        castShadow
      >
        <meshStandardMaterial color="#2D4F2D" roughness={0.8} />
      </Cylinder>
      
      {/* Plant foliage - using animated for hover effect */}
      <animated.mesh
        scale={scale as any}
        position={[0, height, 0]}
        castShadow
      >
        <sphereGeometry args={[0.5 * plantScale, 8, 8]} />
        <animated.meshStandardMaterial 
          color={color as any} 
          roughness={0.7} 
        />
      </animated.mesh>
      
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
