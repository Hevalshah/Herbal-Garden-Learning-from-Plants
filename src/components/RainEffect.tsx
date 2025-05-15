import { useEffect, useState } from "react";

const RainEffect = () => {
  const [raindrops, setRaindrops] = useState<Array<{id: number, style: React.CSSProperties}>>([]);
  
  useEffect(() => {
    const generateRaindrop = () => {
      return {
        id: Math.random(),
        style: {
          left: `${Math.random() * 100}%`,
          top: '-5%',
          height: `${Math.random() * 20 + 10}px`,
          animationDuration: `${Math.random() * 0.5 + 0.5}s`,
          opacity: Math.random() * 0.4 + 0.1
        }
      };
    };
    
    // Initial raindrops
    const initialRaindrops = Array(100).fill(null).map(() => generateRaindrop());
    setRaindrops(initialRaindrops);
    
    // Add new raindrops continuously
    const interval = setInterval(() => {
      setRaindrops(prev => {
        // Remove some old raindrops and add new ones to keep the count manageable
        const newDrops = [...prev.slice(-90), ...Array(10).fill(null).map(() => generateRaindrop())];
        return newDrops;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {raindrops.map((drop) => (
        <div key={drop.id} className="raindrop" style={drop.style} />
      ))}
      <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
    </div>
  );
};

export default RainEffect;
