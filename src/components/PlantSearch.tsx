
import { useState, useMemo } from "react";
import { Plant } from "@/data/plants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PlantSearchProps {
  plants: Plant[];
}

const PlantSearch = ({ plants }: PlantSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedUses, setSelectedUses] = useState<string[]>([]);
  const navigate = useNavigate();
  
  // Extract unique regions and medicinal uses for filter options
  const allRegions = useMemo(() => {
    const regions = new Set<string>();
    plants.forEach(plant => {
      plant.regions.forEach(region => regions.add(region));
    });
    return Array.from(regions);
  }, [plants]);
  
  const allUses = useMemo(() => {
    const uses = new Set<string>();
    plants.forEach(plant => {
      plant.medicinalUses.forEach(use => uses.add(use));
    });
    return Array.from(uses);
  }, [plants]);
  
  // Filter plants based on search and filters
  const filteredPlants = useMemo(() => {
    return plants.filter(plant => {
      // Search term filter
      const matchesSearch = 
        searchTerm === "" || 
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Region filter
      const matchesRegion = 
        selectedRegions.length === 0 || 
        plant.regions.some(region => selectedRegions.includes(region));
      
      // Uses filter
      const matchesUses = 
        selectedUses.length === 0 || 
        plant.medicinalUses.some(use => selectedUses.includes(use));
      
      return matchesSearch && matchesRegion && matchesUses;
    });
  }, [plants, searchTerm, selectedRegions, selectedUses]);
  
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search plants by name, scientific name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-herbal-forest/50 border-herbal-gold/40 placeholder:text-herbal-cream/50"
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-herbal-gold/40">
                Regions ({selectedRegions.length})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-herbal-forest border-herbal-gold/40">
              {allRegions.map(region => (
                <DropdownMenuCheckboxItem
                  key={region}
                  checked={selectedRegions.includes(region)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedRegions([...selectedRegions, region]);
                    } else {
                      setSelectedRegions(selectedRegions.filter(r => r !== region));
                    }
                  }}
                >
                  {region}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-herbal-gold/40">
                Uses ({selectedUses.length})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-herbal-forest border-herbal-gold/40">
              {allUses.map(use => (
                <DropdownMenuCheckboxItem
                  key={use}
                  checked={selectedUses.includes(use)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedUses([...selectedUses, use]);
                    } else {
                      setSelectedUses(selectedUses.filter(u => u !== use));
                    }
                  }}
                >
                  {use}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {(selectedRegions.length > 0 || selectedUses.length > 0 || searchTerm) && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm("");
                setSelectedRegions([]);
                setSelectedUses([]);
              }}
            >
              Clear All
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlants.length > 0 ? (
          filteredPlants.map(plant => (
            <Card 
              key={plant.id} 
              className="herbal-card hover:border-herbal-gold/70 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/plant/${plant.id}`)}
            >
              <CardHeader>
                <CardTitle className="text-xl herbal-title">{plant.name}</CardTitle>
                <p className="italic text-herbal-gold/80 text-sm">{plant.scientificName}</p>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-herbal-cream/90 mb-4">{plant.description}</p>
                <div className="flex flex-wrap gap-1">
                  {plant.regions.map((region, i) => (
                    <Badge key={i} variant="outline" className="bg-herbal-forest/50 text-xs">
                      {region}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full border-herbal-gold/50">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-herbal-gold">No plants found matching your criteria.</p>
            <p className="text-herbal-cream/80 mt-2">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantSearch;
