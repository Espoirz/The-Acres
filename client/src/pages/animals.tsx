import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/navigation";
import { AnimalCard } from "@/components/animal-card";
import { AddAnimalDialog } from "@/components/add-animal-dialog";
import { useToast } from "@/hooks/use-toast";
import { Rabbit, Dog, Search, Filter } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function Animals() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [breedFilter, setBreedFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: animals = [], isLoading } = useQuery({
    queryKey: ['/api/animals'],
  });

  const deleteAnimalMutation = useMutation({
    mutationFn: async (animalId: number) => {
      await apiRequest('DELETE', `/api/animals/${animalId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/animals'] });
      toast({
        title: "Success",
        description: "Animal removed from your ranch",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredAnimals = animals.filter((animal: any) => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeTab === "all" || animal.type === activeTab;
    const matchesBreed = breedFilter === "all" || animal.breed === breedFilter;
    
    return matchesSearch && matchesType && matchesBreed;
  });

  const horses = filteredAnimals.filter((animal: any) => animal.type === 'horse');
  const dogs = filteredAnimals.filter((animal: any) => animal.type === 'dog');

  const uniqueBreeds = [...new Set(animals.map((animal: any) => animal.breed))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(45,50%,96%)] to-[hsl(25,30%,85%)]">
        <Navigation />
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-[hsl(25,30%,80%)] rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-[hsl(25,30%,80%)] rounded-xl"></div>
              ))}
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[hsl(25,60%,20%)]">Animal Management</h1>
              <p className="text-[hsl(25,45%,35%)]">
                Manage your horses and dogs, track their progress, and plan breeding
              </p>
            </div>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)] hover:from-[hsl(25,50%,40%)] hover:to-[hsl(25,60%,35%)]"
            >
              Add Animal
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6 bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(25,45%,35%)] w-4 h-4" />
                  <Input
                    placeholder="Search animals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]"
                  />
                </div>
                
                <Select value={breedFilter} onValueChange={setBreedFilter}>
                  <SelectTrigger className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]">
                    <SelectValue placeholder="Filter by breed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Breeds</SelectItem>
                    {uniqueBreeds.map((breed) => (
                      <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2 text-sm text-[hsl(25,45%,35%)]">
                  <Filter className="w-4 h-4" />
                  <span>{filteredAnimals.length} animals found</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
            <TabsTrigger value="all" className="data-[state=active]:bg-[hsl(25,60%,35%)] data-[state=active]:text-[hsl(45,50%,96%)]">
              All Animals ({animals.length})
            </TabsTrigger>
            <TabsTrigger value="horse" className="data-[state=active]:bg-[hsl(25,60%,35%)] data-[state=active]:text-[hsl(45,50%,96%)]">
              <Rabbit className="w-4 h-4 mr-2" />
              Horses ({horses.length})
            </TabsTrigger>
            <TabsTrigger value="dog" className="data-[state=active]:bg-[hsl(25,60%,35%)] data-[state=active]:text-[hsl(45,50%,96%)]">
              <Dog className="w-4 h-4 mr-2" />
              Dogs ({dogs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {filteredAnimals.length === 0 ? (
              <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[hsl(25,40%,60%)] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Search className="w-8 h-8 text-[hsl(45,50%,96%)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[hsl(25,60%,20%)] mb-2">No animals found</h3>
                  <p className="text-[hsl(25,45%,35%)] mb-4">
                    {searchTerm || breedFilter !== "all" 
                      ? "Try adjusting your search filters" 
                      : "Start building your ranch by adding your first animal"
                    }
                  </p>
                  <Button 
                    onClick={() => setIsAddDialogOpen(true)}
                    className="bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)]"
                  >
                    Add Animal
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnimals.map((animal: any) => (
                  <AnimalCard 
                    key={animal.id} 
                    animal={animal} 
                    onDelete={() => deleteAnimalMutation.mutate(animal.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="horse" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {horses.map((horse: any) => (
                <AnimalCard 
                  key={horse.id} 
                  animal={horse} 
                  onDelete={() => deleteAnimalMutation.mutate(horse.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dog" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dogs.map((dog: any) => (
                <AnimalCard 
                  key={dog.id} 
                  animal={dog} 
                  onDelete={() => deleteAnimalMutation.mutate(dog.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AddAnimalDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
      />
    </div>
  );
}
