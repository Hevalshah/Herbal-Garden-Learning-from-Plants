
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Environment } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import { Plant as PlantType } from "@/data/plants";
import Plant3D from "./Plant3D";
import RainEffect from "./RainEffect";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface Garden3DProps {
  plants: PlantType[];
  isRaining: boolean;
  toggleWeather: () => void;
}

const Garden3D = ({ plants, isRaining, toggleWeather }: Garden3DProps) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-4">
        <Button 
          onClick={toggleWeather} 
          className="bg-herbal-forest/80 hover:bg-herbal-forest border-herbal-gold"
        >
          {isRaining ? "☀️ Sunny" : "🌧️ Rainy"}
        </Button>
        
        <Button
          onClick={() => navigate('/plants')}
          className="bg-herbal-forest/80 hover:bg-herbal-forest border-herbal-gold"
        >
          📚 Plant Directory
        </Button>
      </div>
      
      {isRaining && <RainEffect />}
      
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={isRaining ? 0.3 : 0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={isRaining ? 0.5 : 1}
            castShadow 
          />
          <Environment preset={isRaining ? "night" : "sunset"} />
          
          {/* Ground */}
          <mesh 
            position={[0, -0.1, 0]} 
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial 
              color={isRaining ? "#1a2e1a" : "#2D4F2D"}
              roughness={1}
            />
          </mesh>
          
          {/* Plants */}
          {plants.map((plant) => (
            <Plant3D 
              key={plant.id} 
              plant={plant} 
              onClick={() => navigate(`/plant/${plant.id}`)}
              isRaining={isRaining}
            />
          ))}
          
          <Sky 
            distance={450000} 
            sunPosition={isRaining ? [0, 0, -1] : [0, 1, 0]} 
            inclination={0.5}
            turbidity={isRaining ? 10 : 7}
            rayleigh={isRaining ? 3 : 1}
            mieCoefficient={isRaining ? 0.1 : 0.005}
            mieDirectionalG={0.7}
          />
          
          <fog 
            attach="fog" 
            color={isRaining ? "#0a1c0a" : "#1a2e1a"} 
            near={8} 
            far={30} 
          />
          
          <OrbitControls 
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={15}
          />
        </Suspense>
      </Canvas>
      
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-herbal-gold border-r-herbal-gold border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-herbal-gold text-lg">Loading Herbal Garden...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Garden3D;
