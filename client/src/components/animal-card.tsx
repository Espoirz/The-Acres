import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/stat-bar";
import { Star, Heart, Dumbbell, Info } from "lucide-react";
import type { Animal } from "@shared/schema";

interface AnimalCardProps {
  animal: Animal;
}

export function AnimalCard({ animal }: AnimalCardProps) {
  const getAnimalImage = (type: string, breed: string) => {
    if (type === "horse") {
      // Return different horse images based on breed
      switch (breed.toLowerCase()) {
        case "arabian":
          return "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
        case "friesian":
          return "https://images.unsplash.com/photo-1567201080580-bfcc97dae346?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
        case "thoroughbred":
          return "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
        default:
          return "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
      }
    } else {
      // Return different dog images based on breed
      switch (breed.toLowerCase()) {
        case "border collie":
          return "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
        case "german shepherd":
          return "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
        default:
          return "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
      }
    }
  };

  const calculateOverallRating = (animal: Animal) => {
    const statSum = animal.speed + animal.endurance + animal.agility + (animal.intelligence || 0) + (animal.loyalty || 0);
    const statCount = animal.type === "horse" ? 3 : 5;
    return (statSum / (statCount * 100) * 5).toFixed(1);
  };

  return (
    <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <img 
          src={animal.imageUrl || getAnimalImage(animal.type, animal.breed)}
          alt={`${animal.breed} ${animal.name}`}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-[hsl(25,60%,20%)]">{animal.name}</h3>
              <p className="text-[hsl(25,50%,40%)]">{animal.breed}</p>
              <p className="text-sm text-[hsl(25,60%,35%)]">
                {Math.floor(animal.age / 12)} years old
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-[hsl(40,80%,50%)]" />
                <span className="text-[hsl(25,50%,40%)] font-bold">
                  {calculateOverallRating(animal)}
                </span>
              </div>
              <p className="text-sm text-[hsl(25,60%,35%)] capitalize">{animal.gender}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[hsl(25,60%,35%)]">Speed</span>
              <span className="text-[hsl(25,50%,40%)] font-semibold">{animal.speed}%</span>
            </div>
            <StatBar value={animal.speed} />
            
            <div className="flex justify-between text-sm">
              <span className="text-[hsl(25,60%,35%)]">Endurance</span>
              <span className="text-[hsl(25,50%,40%)] font-semibold">{animal.endurance}%</span>
            </div>
            <StatBar value={animal.endurance} />
            
            <div className="flex justify-between text-sm">
              <span className="text-[hsl(25,60%,35%)]">Agility</span>
              <span className="text-[hsl(25,50%,40%)] font-semibold">{animal.agility}%</span>
            </div>
            <StatBar value={animal.agility} />

            {animal.type === "dog" && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-[hsl(25,60%,35%)]">Intelligence</span>
                  <span className="text-[hsl(25,50%,40%)] font-semibold">{animal.intelligence}%</span>
                </div>
                <StatBar value={animal.intelligence || 0} />
                
                <div className="flex justify-between text-sm">
                  <span className="text-[hsl(25,60%,35%)]">Loyalty</span>
                  <span className="text-[hsl(25,50%,40%)] font-semibold">{animal.loyalty}%</span>
                </div>
                <StatBar value={animal.loyalty || 0} />
              </>
            )}
          </div>

          {/* Health Status */}
          <div className="flex justify-between text-sm">
            <span className="text-[hsl(25,60%,35%)]">Health</span>
            <span className="text-[hsl(25,50%,40%)] font-semibold">{animal.health}%</span>
          </div>
          <StatBar value={animal.health} className="bg-green-200" />

          {/* Actions */}
          <div className="flex space-x-2 pt-4">
            <Button 
              size="sm" 
              className="flex-1 bg-[hsl(40,70%,55%)] text-[hsl(25,80%,15%)] hover:bg-[hsl(40,80%,50%)]"
            >
              <Dumbbell className="w-3 h-3 mr-1" />
              Train
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 border-[hsl(25,40%,60%)] text-[hsl(25,80%,15%)] hover:bg-[hsl(40,70%,55%)]"
            >
              <Heart className="w-3 h-3 mr-1" />
              Care
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-[hsl(25,60%,35%)] text-[hsl(45,50%,96%)] hover:bg-[hsl(25,50%,40%)]"
            >
              <Info className="w-3 h-3 mr-1" />
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
