
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrollY * 0.5}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-cover bg-center py-12 overflow-hidden"
        style={{
          backgroundImage: "url('/lovable-uploads/14fef06e-c15f-47c3-90b1-9e9db4f5c7c0.png')",
        }}
      >
        <div className="absolute inset-0 bg-herbal-forest-dark/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl herbal-title mb-4">
              THE HERBAL CODEX
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-herbal-cream mb-6">
              Explore, Learn, and Grow!
            </h2>
            <p className="text-lg sm:text-xl text-herbal-cream/90 mb-8">
              Embark on a journey through an interactive 3D herbal garden filled
              with medicinal plants. Discover their properties, uses, and
              cultivation methods in an immersive experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/garden")}
                className="bg-herbal-gold hover:bg-herbal-gold/80 text-herbal-forest-dark"
              >
                Enter the Garden
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/plants")}
                className="border-herbal-gold text-herbal-cream hover:bg-herbal-gold/20"
              >
                Browse Plants
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-herbal-forest-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl herbal-title mb-12 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎮"
              title="3D Herbal Garden"
              description="Walk around and interact with realistic herbal plants in an immersive 3D environment."
            />
            <FeatureCard
              icon="🌱"
              title="Interactive Plants"
              description="Plants sway, bloom, and react when clicked, creating a dynamic learning experience."
            />
            <FeatureCard
              icon="🎙️"
              title="Voice Narration"
              description="Auto-reads plant information for an immersive, accessible experience."
            />
            <FeatureCard
              icon="🔍"
              title="Search & Filter"
              description="Find plants by medicinal benefits, region, or health conditions."
            />
            <FeatureCard
              icon="🌦️"
              title="Weather Effects"
              description="Toggle between sunny and rainy garden views to see plants in different environments."
            />
            <FeatureCard
              icon="📚"
              title="Learning Gamification"
              description="Quizzes and challenges to test your herbal knowledge coming soon!"
              isUpcoming={true}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-herbal-forest relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.4\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"3\"/%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"3\"/%3E%3C/g%3E%3C/svg%3E')",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl herbal-title mb-6">
              Ready to Explore?
            </h2>
            <p className="text-lg text-herbal-cream/90 mb-8">
              Dive into the world of medicinal herbs in our interactive 3D
              garden. Learn about their properties, uses, and growing conditions
              in an engaging way.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/garden")}
              className="bg-herbal-gold hover:bg-herbal-gold/80 text-herbal-forest-dark"
            >
              Enter the Herbal Codex
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  isUpcoming?: boolean;
}

const FeatureCard = ({
  icon,
  title,
  description,
  isUpcoming = false,
}: FeatureCardProps) => {
  return (
    <div className="herbal-card p-6 flex flex-col h-full">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-herbal-gold mb-2 flex items-center gap-2">
        {title}
        {isUpcoming && (
          <span className="text-xs bg-herbal-gold/20 text-herbal-gold px-2 py-0.5 rounded-full">
            Upcoming
          </span>
        )}
      </h3>
      <p className="text-herbal-cream/80 mt-auto">{description}</p>
    </div>
  );
};

export default Index;
