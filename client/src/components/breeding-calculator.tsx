import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calculator, Star, TrendingUp } from "lucide-react";

interface BreedingCalculatorProps {
  mother?: any;
  father?: any;
  compatibility: number;
}

export function BreedingCalculator({ mother, father, compatibility }: BreedingCalculatorProps) {
  const calculateExpectedStats = () => {
    if (!mother || !father) return null;

    return {
      speed: Math.round((mother.speed + father.speed) / 2),
      endurance: Math.round((mother.endurance + father.endurance) / 2),
      agility: Math.round((mother.agility + father.agility) / 2),
      ...(mother.type === "dog" && {
        intelligence: Math.round(((mother.intelligence || 0) + (father.intelligence || 0)) / 2),
        loyalty: Math.round(((mother.loyalty || 0) + (father.loyalty || 0)) / 2),
      }),
    };
  };

  const predictCoatColors = () => {
    if (!mother || !father) return [];

    const motherColor = mother.coatColor;
    const fatherColor = father.coatColor;

    // Simplified coat color genetics
    const possibleColors = [motherColor, fatherColor];
    
    // Add some mixed possibilities
    if (motherColor !== fatherColor) {
      if (mother.type === "horse") {
        possibleColors.push("Mixed Bay", "Mixed Chestnut");
      } else {
        possibleColors.push("Mixed Color", "Tri-color");
      }
    }

    return possibleColors.map((color, index) => ({
      color,
      probability: index < 2 ? 40 : 10,
    }));
  };

  const expectedStats = calculateExpectedStats();
  const coatPredictions = predictCoatColors();

  return (
    <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
      <CardHeader>
        <CardTitle className="text-[hsl(25,60%,20%)] flex items-center">
          <Calculator className="w-5 h-5 mr-2" />
          Genetic Predictions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!mother || !father ? (
          <div className="text-center py-8">
            <Calculator className="w-16 h-16 text-[hsl(25,40%,60%)] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[hsl(25,60%,20%)] mb-2">Select Both Parents</h3>
            <p className="text-[hsl(25,45%,35%)]">
              Choose mother and father to see genetic predictions for their offspring
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Compatibility */}
            <div className="p-4 bg-[hsl(25,30%,85%)] rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[hsl(25,60%,35%)] font-medium">Genetic Compatibility</span>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(compatibility / 20) 
                            ? 'text-[hsl(40,80%,50%)] fill-current' 
                            : 'text-[hsl(25,40%,60%)]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[hsl(25,50%,40%)] font-bold">
                    {compatibility.toFixed(0)}%
                  </span>
                </div>
              </div>
              <Progress value={compatibility} className="h-2" />
            </div>

            {/* Expected Stats */}
            <div>
              <h4 className="font-semibold text-[hsl(25,60%,20%)] mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Expected Offspring Stats
              </h4>
              <div className="space-y-3">
                {expectedStats && Object.entries(expectedStats).map(([stat, value]) => (
                  <div key={stat} className="flex justify-between items-center">
                    <span className="text-[hsl(25,60%,35%)] capitalize">{stat}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={value as number} className="w-20 h-2" />
                      <span className="text-[hsl(25,50%,40%)] font-semibold w-8">
                        {value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coat Color Predictions */}
            <div>
              <h4 className="font-semibold text-[hsl(25,60%,20%)] mb-3">
                Coat Color Probabilities
              </h4>
              <div className="space-y-2">
                {coatPredictions.map((prediction, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-[hsl(25,60%,35%)]">{prediction.color}</span>
                    <Badge variant="secondary" className="bg-[hsl(25,30%,85%)]">
                      {prediction.probability}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Genetic Diversity */}
            <div className="p-4 bg-[hsl(25,30%,85%)] rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-[hsl(25,60%,35%)] font-medium">Genetic Diversity</span>
                <Badge 
                  variant={compatibility > 70 ? "default" : compatibility > 40 ? "secondary" : "destructive"}
                  className={
                    compatibility > 70 ? "bg-green-600 text-white" :
                    compatibility > 40 ? "bg-yellow-600 text-white" : 
                    "bg-red-600 text-white"
                  }
                >
                  {compatibility > 70 ? "Excellent" : compatibility > 40 ? "Good" : "Fair"}
                </Badge>
              </div>
            </div>

            {/* Breeding Notes */}
            <div className="text-xs text-[hsl(25,45%,35%)] space-y-1">
              <p>• Higher compatibility increases chances of superior offspring</p>
              <p>• Stats shown are averages; actual offspring may vary</p>
              <p>• Coat colors follow simplified genetic inheritance patterns</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
