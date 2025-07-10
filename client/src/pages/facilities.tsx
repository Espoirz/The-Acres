import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/navigation";
import { useToast } from "@/hooks/use-toast";
import { Building, Home, Wrench, Plus, Star, AlertTriangle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const facilityTypes = [
  {
    type: "stable",
    name: "Horse Stable",
    description: "Housing for horses with feeding and grooming areas",
    baseCapacity: 10,
    baseCost: 5000,
    icon: Home,
  },
  {
    type: "kennel",
    name: "Dog Kennel",
    description: "Secure housing for dogs with exercise yards",
    baseCapacity: 15,
    baseCost: 3000,
    icon: Home,
  },
  {
    type: "arena",
    name: "Training Arena",
    description: "Professional training facility for competitions",
    baseCapacity: 0,
    baseCost: 8000,
    icon: Building,
  },
  {
    type: "vet_clinic",
    name: "Veterinary Clinic",
    description: "Medical facility for animal health and breeding",
    baseCapacity: 0,
    baseCost: 12000,
    icon: Plus,
  },
];

export default function Facilities() {
  const [selectedFacilityType, setSelectedFacilityType] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: facilities = [], isLoading } = useQuery({
    queryKey: ['/api/facilities'],
  });

  const { data: animals = [] } = useQuery({
    queryKey: ['/api/animals'],
  });

  const buildFacilityMutation = useMutation({
    mutationFn: async (facilityData: any) => {
      const response = await apiRequest('POST', '/api/facilities', facilityData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/facilities'] });
      toast({
        title: "Facility Built",
        description: "Your new facility has been constructed",
      });
      setSelectedFacilityType("");
    },
    onError: (error) => {
      toast({
        title: "Construction Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "excellent":
        return "text-green-600";
      case "good":
        return "text-blue-600";
      case "fair":
        return "text-yellow-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-[hsl(25,50%,40%)]";
    }
  };

  const getConditionProgress = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "excellent":
        return 100;
      case "good":
        return 75;
      case "fair":
        return 50;
      case "poor":
        return 25;
      default:
        return 0;
    }
  };

  const calculateUtilization = (facility: any) => {
    if (facility.capacity === 0) return 0;
    
    const animalsInFacility = animals.filter((animal: any) => {
      if (facility.type === "stable") return animal.type === "horse";
      if (facility.type === "kennel") return animal.type === "dog";
      return false;
    }).length;
    
    return Math.min(100, (animalsInFacility / facility.capacity) * 100);
  };

  const handleBuildFacility = (facilityType: any) => {
    buildFacilityMutation.mutate({
      name: `${facilityType.name} #${facilities.length + 1}`,
      type: facilityType.type,
      capacity: facilityType.baseCapacity,
      condition: "excellent",
      amenities: [],
      maintenanceCost: Math.floor(facilityType.baseCost * 0.05), // 5% of build cost per month
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(45,50%,96%)] to-[hsl(25,30%,85%)]">
        <Navigation />
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-[hsl(25,30%,80%)] rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-[hsl(25,30%,80%)] rounded-xl"></div>
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
          <h1 className="text-3xl font-bold text-[hsl(25,60%,20%)] mb-2">Facilities Management</h1>
          <p className="text-[hsl(25,45%,35%)]">
            Build and manage your ranch facilities to house and train your animals
          </p>
        </div>

        {/* Build New Facility */}
        <Card className="mb-8 bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[hsl(25,60%,20%)] flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Build New Facility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {facilityTypes.map((facilityType) => {
                const Icon = facilityType.icon;
                return (
                  <div
                    key={facilityType.type}
                    className="p-4 border-2 border-[hsl(25,40%,60%)] rounded-lg hover:border-[hsl(25,60%,35%)] cursor-pointer transition-colors"
                  >
                    <div className="text-center space-y-3">
                      <Icon className="w-12 h-12 text-[hsl(25,60%,35%)] mx-auto" />
                      <h3 className="font-bold text-[hsl(25,60%,20%)]">{facilityType.name}</h3>
                      <p className="text-sm text-[hsl(25,45%,35%)]">{facilityType.description}</p>
                      
                      <div className="space-y-1 text-xs text-[hsl(25,60%,35%)]">
                        {facilityType.baseCapacity > 0 && (
                          <div>Capacity: {facilityType.baseCapacity} animals</div>
                        )}
                        <div>Build Cost: ${facilityType.baseCost.toLocaleString()}</div>
                        <div>Monthly Maintenance: ${Math.floor(facilityType.baseCost * 0.05).toLocaleString()}</div>
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={() => handleBuildFacility(facilityType)}
                        disabled={buildFacilityMutation.isPending}
                        className="w-full bg-[hsl(25,60%,35%)] text-[hsl(45,50%,96%)] hover:bg-[hsl(25,50%,40%)]"
                      >
                        Build ${facilityType.baseCost.toLocaleString()}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Existing Facilities */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[hsl(25,60%,20%)] mb-4">Your Facilities</h2>
          
          {facilities.length === 0 ? (
            <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
              <CardContent className="p-8 text-center">
                <Building className="w-16 h-16 text-[hsl(25,40%,60%)] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[hsl(25,60%,20%)] mb-2">No facilities built</h3>
                <p className="text-[hsl(25,45%,35%)] mb-4">
                  Build your first facility to start housing and training your animals
                </p>
                <Button className="bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)]">
                  Build First Facility
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility: any) => {
                const utilization = calculateUtilization(facility);
                const needsMaintenance = facility.condition === "fair" || facility.condition === "poor";
                
                return (
                  <Card key={facility.id} className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-[hsl(25,60%,20%)]">{facility.name}</h3>
                            <p className="text-[hsl(25,50%,40%)] capitalize">{facility.type.replace('_', ' ')}</p>
                          </div>
                          {needsMaintenance && (
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-[hsl(25,60%,35%)]">Condition</span>
                            <span className={`font-semibold capitalize ${getConditionColor(facility.condition)}`}>
                              {facility.condition}
                            </span>
                          </div>
                          <Progress 
                            value={getConditionProgress(facility.condition)} 
                            className="h-2"
                          />

                          {facility.capacity > 0 && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-[hsl(25,60%,35%)]">Utilization</span>
                                <span className="text-[hsl(25,50%,40%)] font-semibold">
                                  {Math.floor(utilization)}%
                                </span>
                              </div>
                              <Progress 
                                value={utilization} 
                                className="h-2"
                              />
                              
                              <div className="flex justify-between text-sm">
                                <span className="text-[hsl(25,60%,35%)]">Capacity</span>
                                <span className="text-[hsl(25,50%,40%)] font-semibold">
                                  {Math.floor(utilization * facility.capacity / 100)}/{facility.capacity}
                                </span>
                              </div>
                            </>
                          )}

                          <div className="flex justify-between">
                            <span className="text-[hsl(25,60%,35%)]">Monthly Cost</span>
                            <span className="text-[hsl(25,50%,40%)] font-semibold">
                              ${facility.maintenanceCost?.toLocaleString() || 0}
                            </span>
                          </div>

                          {facility.amenities && facility.amenities.length > 0 && (
                            <div>
                              <span className="text-[hsl(25,60%,35%)] text-sm">Amenities:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {facility.amenities.map((amenity: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-2 pt-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-1 border-[hsl(25,40%,60%)] text-[hsl(25,80%,15%)] hover:bg-[hsl(40,70%,55%)]"
                          >
                            <Wrench className="w-3 h-3 mr-1" />
                            Maintain
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 bg-[hsl(25,60%,35%)] text-[hsl(45,50%,96%)] hover:bg-[hsl(25,50%,40%)]"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Upgrade
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
