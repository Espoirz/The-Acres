import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/navigation";
import { TrainingSchedule } from "@/components/training-schedule";
import { useToast } from "@/hooks/use-toast";
import { Dumbbell, Clock, TrendingUp, Zap, Heart, Brain } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const trainingPrograms = [
  {
    type: "speed",
    name: "Speed Training",
    description: "Improve acceleration and top speed",
    duration: 4,
    cost: 150,
    icon: Zap,
    statImprovement: 5,
  },
  {
    type: "endurance",
    name: "Endurance Training", 
    description: "Build stamina and longevity",
    duration: 6,
    cost: 200,
    icon: Heart,
    statImprovement: 5,
  },
  {
    type: "agility",
    name: "Agility Training",
    description: "Enhance maneuverability and reflexes", 
    duration: 3,
    cost: 120,
    icon: TrendingUp,
    statImprovement: 5,
  },
  {
    type: "intelligence",
    name: "Intelligence Training",
    description: "Improve learning and problem-solving",
    duration: 5,
    cost: 180,
    icon: Brain,
    statImprovement: 5,
  },
];

export default function Training() {
  const [selectedAnimal, setSelectedAnimal] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: animals = [], isLoading: animalsLoading } = useQuery({
    queryKey: ['/api/animals'],
  });

  const { data: activeSessions = [], isLoading: sessionsLoading } = useQuery({
    queryKey: ['/api/training/active'],
  });

  const trainingMutation = useMutation({
    mutationFn: async (trainingData: any) => {
      const response = await apiRequest('POST', '/api/training', trainingData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/training/active'] });
      queryClient.invalidateQueries({ queryKey: ['/api/animals'] });
      toast({
        title: "Training Started",
        description: "Your animal has begun training",
      });
      setSelectedAnimal("");
      setSelectedProgram("");
    },
    onError: (error) => {
      toast({
        title: "Training Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const availableAnimals = animals.filter((animal: any) => {
    // Check if animal is not currently in training
    const isInTraining = activeSessions.some((session: any) => session.animalId === animal.id);
    return !isInTraining && animal.health >= 50; // Only healthy animals can train
  });

  const selectedAnimalData = animals.find((a: any) => a.id.toString() === selectedAnimal);
  const selectedProgramData = trainingPrograms.find(p => p.type === selectedProgram);

  const handleStartTraining = () => {
    if (!selectedAnimal || !selectedProgram) {
      toast({
        title: "Selection Required",
        description: "Please select both an animal and training program",
        variant: "destructive",
      });
      return;
    }

    if (!selectedAnimalData || !selectedProgramData) return;

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + selectedProgramData.duration * 60 * 60 * 1000);

    trainingMutation.mutate({
      animalId: parseInt(selectedAnimal),
      trainingType: selectedProgram,
      duration: selectedProgramData.duration * 60, // Convert to minutes
      cost: selectedProgramData.cost,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      statImprovement: selectedProgramData.statImprovement,
    });
  };

  if (animalsLoading || sessionsLoading) {
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
          <h1 className="text-3xl font-bold text-[hsl(25,60%,20%)] mb-2">Training Center</h1>
          <p className="text-[hsl(25,45%,35%)]">
            Improve your animals' abilities through specialized training programs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Training Scheduler */}
          <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[hsl(25,60%,20%)] flex items-center">
                <Dumbbell className="w-5 h-5 mr-2" />
                Schedule Training
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[hsl(25,60%,35%)] mb-2">
                  Select Animal
                </label>
                <Select value={selectedAnimal} onValueChange={setSelectedAnimal}>
                  <SelectTrigger className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]">
                    <SelectValue placeholder="Choose animal to train" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAnimals.map((animal: any) => (
                      <SelectItem key={animal.id} value={animal.id.toString()}>
                        {animal.name} ({animal.breed}) - Health: {animal.health}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {availableAnimals.length === 0 && (
                  <p className="text-sm text-[hsl(0,70%,50%)] mt-1">
                    No animals available for training. Animals in training or with low health cannot train.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(25,60%,35%)] mb-2">
                  Training Program
                </label>
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger className="border-[hsl(25,40%,60%)] focus:border-[hsl(25,60%,35%)]">
                    <SelectValue placeholder="Choose training type" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainingPrograms.map((program) => (
                      <SelectItem key={program.type} value={program.type}>
                        {program.name} - {program.duration}h (${program.cost})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedAnimalData && selectedProgramData && (
                <div className="space-y-4 p-4 bg-[hsl(25,30%,85%)] rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(25,60%,35%)]">Current {selectedProgram}</span>
                    <span className="text-[hsl(25,50%,40%)] font-semibold">
                      {selectedAnimalData[selectedProgram as keyof typeof selectedAnimalData] || 0}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(25,60%,35%)]">Expected Improvement</span>
                    <span className="text-green-600 font-semibold">
                      +{selectedProgramData.statImprovement}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(25,60%,35%)]">Duration</span>
                    <span className="text-[hsl(25,50%,40%)] font-semibold">
                      {selectedProgramData.duration} hours
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(25,60%,35%)]">Cost</span>
                    <span className="text-[hsl(25,50%,40%)] font-semibold">
                      ${selectedProgramData.cost}
                    </span>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleStartTraining}
                disabled={!selectedAnimal || !selectedProgram || trainingMutation.isPending}
                className="w-full bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)] hover:from-[hsl(25,50%,40%)] hover:to-[hsl(25,60%,35%)]"
              >
                {trainingMutation.isPending ? "Starting Training..." : "Start Training"}
              </Button>
            </CardContent>
          </Card>

          {/* Training Programs */}
          <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[hsl(25,60%,20%)] flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Training Programs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trainingPrograms.map((program) => {
                const Icon = program.icon;
                return (
                  <div 
                    key={program.type}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedProgram === program.type 
                        ? 'border-[hsl(25,60%,35%)] bg-[hsl(25,30%,85%)]' 
                        : 'border-[hsl(25,40%,60%)] hover:border-[hsl(25,50%,50%)]'
                    }`}
                    onClick={() => setSelectedProgram(program.type)}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className="w-6 h-6 text-[hsl(25,60%,35%)] mt-1" />
                      <div className="flex-1">
                        <h4 className="font-bold text-[hsl(25,60%,20%)]">{program.name}</h4>
                        <p className="text-sm text-[hsl(25,45%,35%)] mb-2">{program.description}</p>
                        <div className="flex justify-between text-xs text-[hsl(25,60%,35%)]">
                          <span>Duration: {program.duration} hours</span>
                          <span>Cost: ${program.cost}</span>
                          <span>Improvement: +{program.statImprovement}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Active Training Sessions */}
        <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[hsl(25,60%,20%)] flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Active Training Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeSessions.length === 0 ? (
              <div className="text-center py-8">
                <Dumbbell className="w-16 h-16 text-[hsl(25,40%,60%)] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[hsl(25,60%,20%)] mb-2">No active training</h3>
                <p className="text-[hsl(25,45%,35%)]">Schedule training sessions to improve your animals' abilities</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeSessions.map((session: any) => {
                  const endTime = new Date(session.endTime);
                  const now = new Date();
                  const totalDuration = session.duration * 60 * 1000; // Convert to milliseconds
                  const elapsed = now.getTime() - new Date(session.startTime).getTime();
                  const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
                  const timeRemaining = Math.max(0, Math.ceil((endTime.getTime() - now.getTime()) / (1000 * 60)));
                  
                  return (
                    <div key={session.id} className="p-4 border-2 border-[hsl(25,30%,70%)] rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-[hsl(25,60%,20%)]">
                            {session.animal?.name}
                          </h4>
                          <p className="text-sm text-[hsl(25,45%,35%)] capitalize">
                            {session.trainingType} Training
                          </p>
                        </div>
                        <Badge variant="secondary">
                          {timeRemaining > 0 ? `${timeRemaining}m remaining` : "Complete!"}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-[hsl(25,60%,35%)]">Progress</span>
                          <span className="text-[hsl(25,50%,40%)] font-semibold">
                            {progress.toFixed(0)}%
                          </span>
                        </div>
                        <Progress 
                          value={progress} 
                          className="h-2"
                        />
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
