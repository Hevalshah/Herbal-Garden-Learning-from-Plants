
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-5xl herbal-title mb-6">404</h1>
        <h2 className="text-2xl text-herbal-gold mb-4">Page Not Found</h2>
        <p className="text-herbal-cream/80 mb-8 max-w-md">
          The plant you're looking for might be in another garden. Let's get you back on the path.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/")} variant="default">
            Return Home
          </Button>
          <Button onClick={() => navigate("/garden")} variant="outline">
            Visit Garden
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
