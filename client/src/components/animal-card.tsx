import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Rabbit, Dog, Heart, Zap, Award, Star, Edit, Trash2 } from "lucide-react";
import type { Animal } from "@shared/schema";

interface AnimalCardProps {
  animal: Animal;
  onDelete?: () => void;
}

export function AnimalCard({ animal, onDelete }: AnimalCardProps) {
  const getAnimalIcon = () => {
    return animal.type === "horse" ? Rabbit : Dog;
  };

  const calculateOverallRating = (animal: Animal) => {
    const stats = [animal.speed, animal.endurance, animal.agility];
    if (animal.type === "dog") {
      stats.push(animal.intelligence || 50, animal.loyalty || 50);
    }
    return Math.round(stats.reduce((a, b) => a + b, 0) / stats.length);
  };

  const getLifecycleStageColor = (stage: string) => {
    switch (stage) {
      case "foal": return "bg-blue-500";
      case "yearling": return "bg-green-500";
      case "adult": return "bg-yellow-500";
      case "senior": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getCoatColorStyle = (color: string) => {
    const colorMap: Record<string, string> = {
      "Bay": "bg-gradient-to-br from-amber-700 to-amber-900",
      "Chestnut": "bg-gradient-to-br from-orange-600 to-red-700",
      "Black": "bg-gradient-to-br from-gray-800 to-black",
      "Gray": "bg-gradient-to-br from-gray-400 to-gray-600",
      "Palomino": "bg-gradient-to-br from-yellow-300 to-yellow-600",
      "Pinto": "bg-gradient-to-br from-white via-amber-600 to-amber-800",
      "Brown": "bg-gradient-to-br from-amber-800 to-yellow-900",
      "White": "bg-gradient-to-br from-gray-100 to-white border border-gray-300",
      "Golden": "bg-gradient-to-br from-yellow-400 to-yellow-600",
      "Tri-color": "bg-gradient-to-br from-black via-white to-amber-700",
      "Merle": "bg-gradient-to-br from-gray-400 via-blue-300 to-gray-600",
      "Brindle": "bg-gradient-to-br from-amber-700 via-black to-amber-800",
      "Spotted": "bg-gradient-to-br from-white via-black to-white",
      "Cream": "bg-gradient-to-br from-yellow-100 to-yellow-200",
      "Silver": "bg-gradient-to-br from-gray-300 to-gray-500"
    };
    return colorMap[color] || "bg-gradient-to-br from-gray-400 to-gray-600";
  };

  const AnimalIcon = getAnimalIcon();

  return (
    <Card className="overflow-hidden bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full ${getCoatColorStyle(animal.coatColor)} flex items-center justify-center shadow-md`}>
              <AnimalIcon className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
            <div>
              <CardTitle className="text-lg text-[hsl(25,60%,20%)]">{animal.name}</CardTitle>
              <div className="text-sm text-[hsl(25,45%,35%)]">
                {animal.breed} • {animal.coatColor}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge className={`${getLifecycleStageColor(animal.lifecycleStage)} text-white text-xs`}>
              {animal.lifecycleStage}
            </Badge>
            <span className="text-xs text-[hsl(25,45%,35%)]">
              {Math.floor(animal.age / 12)}y {animal.age % 12}m • {animal.gender}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Health & Energy Status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center text-[hsl(25,60%,35%)]">
                <Heart className="w-3 h-3 mr-1" />
                Health
              </span>
              <span className="font-medium">{animal.health}%</span>
            </div>
            <Progress value={animal.health} className="h-2" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center text-[hsl(25,60%,35%)]">
                <Zap className="w-3 h-3 mr-1" />
                Energy
              </span>
              <span className="font-medium">{animal.energy}%</span>
            </div>
            <Progress value={animal.energy} className="h-2" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="bg-[hsl(45,40%,92%)] rounded-lg p-3">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold text-[hsl(25,60%,20%)]">{animal.speed}</div>
              <div className="text-[hsl(25,45%,35%)]">Speed</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-[hsl(25,60%,20%)]">{animal.endurance}</div>
              <div className="text-[hsl(25,45%,35%)]">Endurance</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-[hsl(25,60%,20%)]">{animal.agility}</div>
              <div className="text-[hsl(25,45%,35%)]">Agility</div>
            </div>
            {animal.type === "dog" && (
              <>
                <div className="text-center">
                  <div className="font-semibold text-[hsl(25,60%,20%)]">{animal.intelligence || 50}</div>
                  <div className="text-[hsl(25,45%,35%)]">Intelligence</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-[hsl(25,60%,20%)]">{animal.loyalty || 50}</div>
                  <div className="text-[hsl(25,45%,35%)]">Loyalty</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Overall Rating */}
        <div className="flex items-center justify-between pt-2 border-t border-[hsl(25,30%,80%)]">
          <span className="flex items-center text-sm text-[hsl(25,60%,35%)]">
            <Award className="w-4 h-4 mr-1" />
            Rating
          </span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(calculateOverallRating(animal) / 20) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
              />
            ))}
            <span className="ml-1 text-sm font-medium">{calculateOverallRating(animal)}</span>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex justify-between text-xs">
          <Badge variant={animal.isBreedingEligible ? "default" : "secondary"} className="text-xs">
            {animal.isBreedingEligible ? "Breeding Ready" : "Too Young"}
          </Badge>
          <Badge variant={animal.isForSale ? "destructive" : "outline"} className="text-xs">
            {animal.isForSale ? `For Sale $${animal.price?.toLocaleString()}` : "Not For Sale"}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button 
            size="sm" 
            variant="outline"
            className="border-[hsl(25,40%,60%)] text-[hsl(25,60%,35%)] hover:bg-[hsl(45,50%,96%)]"
          >
            Train
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            disabled={!animal.isBreedingEligible}
            className="border-[hsl(25,40%,60%)] text-[hsl(25,60%,35%)] hover:bg-[hsl(45,50%,96%)] disabled:opacity-50"
          >
            Breed
          </Button>
          {onDelete && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={onDelete}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}