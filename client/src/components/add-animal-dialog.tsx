import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface AddAnimalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const horseBreeds = [
  "Arabian", "Friesian", "Thoroughbred", "Quarter Horse", "Mustang",
  "Andalusian", "Hanoverian", "Appaloosa", "Akhal-Teke", "Shire",
  "Gypsy Vanner", "Dutch Warmblood", "Marwari", "Oldenburg", "Standardbred"
];

const ponyBreeds = [
  "Shetland", "Welsh Pony", "Connemara", "Dartmoor", "Exmoor",
  "Hackney Pony", "Icelandic Horse", "Highland Pony", "Fell Pony",
  "New Forest Pony", "German Riding Pony", "Dales Pony", "Eriskay",
  "Chincoteague", "Hokkaido Pony"
];

const dogBreeds = [
  "Border Collie", "German Shepherd", "Belgian Malinois", "Labrador Retriever",
  "Australian Cattle Dog", "Siberian Husky", "Saluki", "Jack Russell Terrier",
  "Doberman Pinscher", "Czechoslovakian Wolfdog"
];

const coatColors = {
  horse: ["Bay", "Chestnut", "Black", "Gray", "Palomino", "Pinto", "Appaloosa", "Buckskin", "Dun", "Roan"],
  dog: ["Black", "Brown", "White", "Golden", "Tri-color", "Merle", "Brindle", "Spotted", "Cream", "Silver"]
};

export function AddAnimalDialog({ open, onOpenChange }: AddAnimalDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    gender: "",
    age: "",
    coatColor: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addAnimalMutation = useMutation({
    mutationFn: async (animalData: any) => {
      const response = await apiRequest('POST', '/api/animals', animalData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/animals'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      toast({
        title: "Animal Added",
        description: `${formData.name} has been added to your ranch`,
      });
      setFormData({
        name: "",
        type: "",
        breed: "",
        gender: "",
        age: "",
        coatColor: "",
      });
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to Add Animal",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.breed || !formData.gender || !formData.age || !formData.coatColor) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Generate random but reasonable stats
    const baseStats = {
      speed: Math.floor(Math.random() * 30) + 40, // 40-70
      endurance: Math.floor(Math.random() * 30) + 40,
      agility: Math.floor(Math.random() * 30) + 40,
    };

    const animalData = {
      ...formData,
      age: parseInt(formData.age),
      ...baseStats,
      ...(formData.type === "dog" && {
        intelligence: Math.floor(Math.random() * 30) + 40,
        loyalty: Math.floor(Math.random() * 30) + 40,
      }),
      health: 100,
      happiness: 100,
      energy: 100,
      isBreedingEligible: parseInt(formData.age) >= 24, // 2 years old
      genetics: {
        coatColor: formData.coatColor,
        generation: 1,
      },
    };

    addAnimalMutation.mutate(animalData);
  };

  const getAvailableBreeds = () => {
    if (formData.type === "horse") return horseBreeds;
    if (formData.type === "dog") return dogBreeds;
    return [];
  };

  const getAvailableColors = () => {
    return coatColors[formData.type as keyof typeof coatColors] || [];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[hsl(25,60%,20%)]">Add New Animal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-[hsl(25,60%,35%)]">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter animal name"
              className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]"
            />
          </div>

          <div>
            <Label htmlFor="type" className="text-[hsl(25,60%,35%)]">Animal Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value, breed: "", coatColor: "" }))}>
              <SelectTrigger className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]">
                <SelectValue placeholder="Select animal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horse">Horse</SelectItem>
                <SelectItem value="dog">Dog</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type && (
            <div>
              <Label htmlFor="breed" className="text-[hsl(25,60%,35%)]">Breed</Label>
              <Select value={formData.breed} onValueChange={(value) => setFormData(prev => ({ ...prev, breed: value }))}>
                <SelectTrigger className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]">
                  <SelectValue placeholder="Select breed" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableBreeds().map((breed) => (
                    <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="gender" className="text-[hsl(25,60%,35%)]">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
              <SelectTrigger className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="age" className="text-[hsl(25,60%,35%)]">Age (months)</Label>
            <Input
              id="age"
              type="number"
              min="1"
              max="240"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              placeholder="Enter age in months"
              className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]"
            />
          </div>

          {formData.type && (
            <div>
              <Label htmlFor="coatColor" className="text-[hsl(25,60%,35%)]">Coat Color</Label>
              <Select value={formData.coatColor} onValueChange={(value) => setFormData(prev => ({ ...prev, coatColor: value }))}>
                <SelectTrigger className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]">
                  <SelectValue placeholder="Select coat color" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableColors().map((color) => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addAnimalMutation.isPending}
              className="flex-1 bg-[hsl(25,60%,35%)] text-[hsl(45,50%,96%)] hover:bg-[hsl(25,50%,40%)]"
            >
              {addAnimalMutation.isPending ? "Adding..." : "Add Animal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
