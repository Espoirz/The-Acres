import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import { BreedingCalculator } from "@/components/breeding-calculator";
import { useToast } from "@/hooks/use-toast";
import { Dna, Calendar, Star, Heart, Clock } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function Breeding() {
  const [selectedMother, setSelectedMother] = useState<string>("");
  const [selectedFather, setSelectedFather] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: animals = [], isLoading: animalsLoading } = useQuery({
    queryKey: ['/api/animals'],
  });

  const { data: breedings = [], isLoading: breedingsLoading } = useQuery({
    queryKey: ['/api/breeding'],
  });

  const breedingMutation = useMutation({
    mutationFn: async (breedingData: any) => {
      const response = await apiRequest('POST', '/api/breeding', breedingData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/breeding'] });
      queryClient.invalidateQueries({ queryKey: ['/api/animals'] });
      toast({
        title: "Breeding Started",
        description: "Your animals have been successfully bred",
      });
      setSelectedMother("");
      setSelectedFather("");
    },
    onError: (error) => {
      toast({
        title: "Breeding Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const eligibleFemales = animals.filter((animal: any) => 
    animal.gender === 'female' && 
    animal.isBreedingEligible && 
    !animal.pregnancyDue
  );

  const eligibleMales = animals.filter((animal: any) => 
    animal.gender === 'male' && 
    animal.isBreedingEligible
  );

  const calculateCompatibility = (mother: any, father: any) => {
    if (!mother || !father) return 0;
    if (mother.type !== father.type) return 0;
    
    // Simple compatibility calculation based on stats
    const statDiff = Math.abs(
      (mother.speed + mother.endurance + mother.agility) - 
      (father.speed + father.endurance + father.agility)
    ) / 3;
    
    return Math.max(0, 100 - statDiff);
  };

  const selectedMotherAnimal = animals.find((a: any) => a.id.toString() === selectedMother);
  const selectedFatherAnimal = animals.find((a: any) => a.id.toString() === selectedFather);
  const compatibility = calculateCompatibility(selectedMotherAnimal, selectedFatherAnimal);

  const handleBreeding = () => {
    if (!selectedMother || !selectedFather) {
      toast({
        title: "Selection Required",
        description: "Please select both mother and father for breeding",
        variant: "destructive",
      });
      return;
    }

    const expectedDueDate = new Date();
    expectedDueDate.setDate(expectedDueDate.getDate() + 7); // 7 days pregnancy

    breedingMutation.mutate({
      motherId: parseInt(selectedMother),
      fatherId: parseInt(selectedFather),
      breedingDate: new Date().toISOString(),
      expectedDueDate: expectedDueDate.toISOString(),
      geneticPredictions: {
        compatibility: compatibility,
        expectedStats: {
          speed: Math.round((selectedMotherAnimal.speed + selectedFatherAnimal.speed) / 2),
          endurance: Math.round((selectedMotherAnimal.endurance + selectedFatherAnimal.endurance) / 2),
          agility: Math.round((selectedMotherAnimal.agility + selectedFatherAnimal.agility) / 2),
        }
      }
    });
  };

  if (animalsLoading || breedingsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(45,50%,96%)] to-[hsl(25,30%,85%)]">
        <Navigation />
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-[hsl(25,30%,80%)] rounded"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-[hsl(25,30%,80%)] rounded-xl"></div>
              <div className="h-96 bg-[hsl(25,30%,80%)] rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(45,50%,96%)] to-[hsl(25,30%,85%)]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[hsl(25,60%,20%)] mb-2">Breeding Center</h1>
          <p className="text-[hsl(25,45%,35%)]">
            Plan breeding combinations and track genetic heritage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Breeding Planner */}
          <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[hsl(25,60%,20%)] flex items-center">
                <Dna className="w-5 h-5 mr-2" />
                Breeding Planner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[hsl(25,60%,35%)] mb-2">
                  Select Mother
                </label>
                <Select value={selectedMother} onValueChange={setSelectedMother}>
                  <SelectTrigger className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]">
                    <SelectValue placeholder="Choose female animal" />
                  </SelectTrigger>
                  <SelectContent>
                    {eligibleFemales.map((animal: any) => (
                      <SelectItem key={animal.id} value={animal.id.toString()}>
                        {animal.name} ({animal.breed})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(25,60%,35%)] mb-2">
                  Select Father
                </label>
                <Select value={selectedFather} onValueChange={setSelectedFather}>
                  <SelectTrigger className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]">
                    <SelectValue placeholder="Choose male animal" />
                  </SelectTrigger>
                  <SelectContent>
                    {eligibleMales.map((animal: any) => (
                      <SelectItem key={animal.id} value={animal.id.toString()}>
                        {animal.name} ({animal.breed})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedMother && selectedFather && (
                <div className="space-y-4 p-4 bg-[hsl(25,30%,85%)] rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(25,60%,35%)]">Compatibility</span>
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
                      <span className="text-[hsl(25,50%,40%)] font-semibold">
                        {compatibility.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(25,60%,35%)]">Pregnancy Duration</span>
                    <span className="text-[hsl(25,50%,40%)] font-semibold">7 days</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(25,60%,35%)]">Breeding Cost</span>
                    <span className="text-[hsl(25,50%,40%)] font-semibold">$500</span>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleBreeding}
                disabled={!selectedMother || !selectedFather || breedingMutation.isPending}
                className="w-full bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)] hover:from-[hsl(25,50%,40%)] hover:to-[hsl(25,60%,35%)]"
              >
                {breedingMutation.isPending ? "Starting Breeding..." : "Start Breeding"}
              </Button>
            </CardContent>
          </Card>

          {/* Genetic Calculator */}
          <BreedingCalculator 
            mother={selectedMotherAnimal}
            father={selectedFatherAnimal}
            compatibility={compatibility}
          />
        </div>

        {/* Active Breedings */}
        <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[hsl(25,60%,20%)] flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Active Breedings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {breedings.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="w-16 h-16 text-[hsl(25,40%,60%)] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[hsl(25,60%,20%)] mb-2">No active breedings</h3>
                <p className="text-[hsl(25,45%,35%)]">Start your first breeding to see the progress here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {breedings.map((breeding: any) => {
                  const dueDate = new Date(breeding.expectedDueDate);
                  const isOverdue = dueDate < new Date();
                  const daysRemaining = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={breeding.id} className="p-4 border-2 border-[hsl(25,30%,70%)] rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-[hsl(25,60%,20%)]">
                            {breeding.mother?.name} × {breeding.father?.name}
                          </h4>
                          <p className="text-sm text-[hsl(25,45%,35%)]">
                            {breeding.mother?.breed} breeding
                          </p>
                        </div>
                        <Badge 
                          variant={isOverdue ? "destructive" : "secondary"}
                          className={isOverdue ? "bg-[hsl(0,70%,50%)] text-white" : ""}
                        >
                          {isOverdue ? "Due Now!" : `${daysRemaining} days left`}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-[hsl(25,45%,35%)]">
                          <Clock className="w-4 h-4" />
                          <span>Due: {dueDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-[hsl(40,80%,50%)]" />
                          <span className="text-sm text-[hsl(25,50%,40%)]">
                            {breeding.geneticPredictions?.compatibility || 0}% compatibility
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
