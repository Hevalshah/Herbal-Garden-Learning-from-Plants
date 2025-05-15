
import { useParams, Navigate } from "react-router-dom";
import { plants } from "@/data/plants";
import Layout from "@/components/Layout";
import PlantDetails from "@/components/PlantDetails";

const PlantDetail = () => {
  const { plantId } = useParams<{ plantId: string }>();
  
  const plant = plants.find(p => p.id === plantId);
  
  if (!plant) {
    return <Navigate to="/plants" replace />;
  }
  
  return (
    <Layout>
      <PlantDetails plant={plant} />
    </Layout>
  );
};

export default PlantDetail;
