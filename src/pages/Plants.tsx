
import Layout from "@/components/Layout";
import PlantSearch from "@/components/PlantSearch";
import { plants } from "@/data/plants";

const Plants = () => {
  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl sm:text-4xl herbal-title mb-2 text-center">
            Plant Directory
          </h1>
          <p className="text-herbal-cream/80 text-lg mb-8 text-center">
            Explore our collection of medicinal herbs and their properties
          </p>
        </div>
      </div>
      <PlantSearch plants={plants} />
    </Layout>
  );
};

export default Plants;
