
import { useState } from "react";
import Layout from "@/components/Layout";
import Garden3D from "@/components/Garden3D";
import { plants } from "@/data/plants";
import { toast } from "sonner";

const Garden = () => {
  const [isRaining, setIsRaining] = useState(false);
  
  const toggleWeather = () => {
    const newState = !isRaining;
    setIsRaining(newState);
    
    toast(newState ? "Weather changed to rainy" : "Weather changed to sunny", {
      description: newState 
        ? "Enjoy the peaceful sound of rainfall in the garden." 
        : "Enjoy the warm sunshine on the plants.",
    });
  };
  
  return (
    <Layout>
      <Garden3D plants={plants} isRaining={isRaining} toggleWeather={toggleWeather} />
    </Layout>
  );
};

export default Garden;
