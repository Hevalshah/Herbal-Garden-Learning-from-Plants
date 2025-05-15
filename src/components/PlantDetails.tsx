
import { useState, useEffect } from "react";
import { Plant } from "@/data/plants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import VoiceService from "@/services/voiceService";
import { useNavigate } from "react-router-dom";

interface PlantDetailsProps {
  plant: Plant;
}

const PlantDetails = ({ plant }: PlantDetailsProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const voiceService = VoiceService.getInstance();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Clean up voice service when component unmounts
    return () => {
      voiceService.stop();
    };
  }, []);
  
  const handleSpeak = () => {
    if (isSpeaking) {
      voiceService.stop();
      setIsSpeaking(false);
      return;
    }
    
    const textToSpeak = `${plant.name}, scientifically known as ${plant.scientificName}. ${plant.description} This plant is commonly used for: ${plant.medicinalUses.join(', ')}. It grows best in ${plant.growingConditions}.`;
    
    setIsSpeaking(true);
    voiceService.speak(textToSpeak, () => {
      setIsSpeaking(false);
    });
    
    toast("Voice narration started", {
      description: "Listening to information about " + plant.name
    });
  };
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        ← Back
      </Button>
      
      <Card className="herbal-card">
        <CardHeader>
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <CardTitle className="text-3xl sm:text-4xl herbal-title mb-2">{plant.name}</CardTitle>
              <CardDescription className="text-herbal-gold/80 italic text-lg">
                {plant.scientificName}
              </CardDescription>
            </div>
            <Button 
              variant={isSpeaking ? "destructive" : "outline"}
              onClick={handleSpeak}
              className="flex items-center gap-2"
            >
              {isSpeaking ? (
                <>
                  <span className="h-4 w-4 rounded-full bg-current animate-pulse" />
                  Stop Narration
                </>
              ) : (
                <>🎙️ Listen</>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl text-herbal-gold mb-2">Description</h3>
            <p className="text-lg text-herbal-cream/90 leading-relaxed">{plant.description}</p>
          </div>
          
          <div>
            <h3 className="text-xl text-herbal-gold mb-2">Medicinal Uses</h3>
            <ul className="list-disc pl-5 space-y-1">
              {plant.medicinalUses.map((use, index) => (
                <li key={index} className="text-herbal-cream/90">{use}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl text-herbal-gold mb-2">Growing Conditions</h3>
            <p className="text-herbal-cream/90">{plant.growingConditions}</p>
          </div>
          
          <div>
            <h3 className="text-xl text-herbal-gold mb-2">Native Regions</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {plant.regions.map((region, index) => (
                <Badge key={index} variant="outline" className="bg-herbal-forest border-herbal-gold/50">
                  {region}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-herbal-forest pt-4">
          <p className="text-sm text-muted-foreground">
            The Herbal Codex • Educational resource only
          </p>
          {/* Placeholder for future social sharing */}
          <Button variant="ghost" size="sm" disabled>
            Bookmark (Coming Soon)
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlantDetails;
