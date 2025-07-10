import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/navigation";
import { AnimalCard } from "@/components/animal-card";
import { Link } from "wouter";
import { Rabbit, Dog, Trophy, Dna } from "lucide-react";

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/stats'],
  });

  const { data: animals, isLoading: animalsLoading } = useQuery({
    queryKey: ['/api/animals'],
  });

  const { data: activeTraining, isLoading: trainingLoading } = useQuery({
    queryKey: ['/api/training/active'],
  });

  const horses = animals?.filter((animal: any) => animal.type === 'horse') || [];
  const dogs = animals?.filter((animal: any) => animal.type === 'dog') || [];

  if (statsLoading || animalsLoading || trainingLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(45,50%,96%)] to-[hsl(25,30%,85%)]">
        <Navigation />
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-[hsl(25,30%,80%)] rounded mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-[hsl(25,30%,80%)] rounded"></div>
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
          <h1 className="text-3xl font-bold text-[hsl(25,60%,20%)] mb-2">
            Welcome to Victory Acres
          </h1>
          <p className="text-[hsl(25,45%,35%)]">
            Manage your ranch, breed champions, and build your legacy
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
            <CardContent className="p-4 text-center">
              <Rabbit className="w-8 h-8 text-[hsl(25,60%,35%)] mb-2 mx-auto" />
              <h3 className="text-2xl font-bold text-[hsl(25,50%,40%)]">
                {stats?.totalHorses || 0}
              </h3>
              <p className="text-sm text-[hsl(25,60%,35%)]">Horses</p>
            </CardContent>
          </Card>

          <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
            <CardContent className="p-4 text-center">
              <Dog className="w-8 h-8 text-[hsl(25,60%,35%)] mb-2 mx-auto" />
              <h3 className="text-2xl font-bold text-[hsl(25,50%,40%)]">
                {stats?.totalDogs || 0}
              </h3>
              <p className="text-sm text-[hsl(25,60%,35%)]">Dogs</p>
            </CardContent>
          </Card>

          <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-[hsl(40,80%,50%)] mb-2 mx-auto" />
              <h3 className="text-2xl font-bold text-[hsl(25,50%,40%)]">
                {stats?.competitionsWon || 0}
              </h3>
              <p className="text-sm text-[hsl(25,60%,35%)]">Competitions Won</p>
            </CardContent>
          </Card>

          <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
            <CardContent className="p-4 text-center">
              <Dna className="w-8 h-8 text-[hsl(25,60%,35%)] mb-2 mx-auto" />
              <h3 className="text-2xl font-bold text-[hsl(25,50%,40%)]">
                {stats?.offspringBred || 0}
              </h3>
              <p className="text-sm text-[hsl(25,60%,35%)]">Offspring Bred</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="horses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
            <TabsTrigger value="horses" className="data-[state=active]:bg-[hsl(25,60%,35%)] data-[state=active]:text-[hsl(45,50%,96%)]">
              <Rabbit className="w-4 h-4 mr-2" />
              Horses
            </TabsTrigger>
            <TabsTrigger value="dogs" className="data-[state=active]:bg-[hsl(25,60%,35%)] data-[state=active]:text-[hsl(45,50%,96%)]">
              <Dog className="w-4 h-4 mr-2" />
              Dogs
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-[hsl(25,60%,35%)] data-[state=active]:text-[hsl(45,50%,96%)]">
              Training
            </TabsTrigger>
            <TabsTrigger value="breeding" className="data-[state=active]:bg-[hsl(25,60%,35%)] data-[state=active]:text-[hsl(45,50%,96%)]">
              Breeding
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-[hsl(25,60%,35%)] data-[state=active]:text-[hsl(45,50%,96%)]">
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="facilities" className="data-[state=active]:bg-[hsl(25,60%,35%)] data-[state=active]:text-[hsl(45,50%,96%)]">
              Facilities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="horses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[hsl(25,60%,20%)]">Your Horses</h2>
              <Link href="/animals">
                <Button className="bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)] hover:from-[hsl(25,50%,40%)] hover:to-[hsl(25,60%,35%)]">
                  Manage Horses
                </Button>
              </Link>
            </div>
            
            {horses.length === 0 ? (
              <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
                <CardContent className="p-8 text-center">
                  <Rabbit className="w-16 h-16 text-[hsl(25,40%,60%)] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[hsl(25,60%,20%)] mb-2">No horses yet</h3>
                  <p className="text-[hsl(25,45%,35%)] mb-4">Start your breeding program by adding your first horse</p>
                  <Link href="/animals">
                    <Button className="bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)]">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {horses.map((horse: any) => (
                  <AnimalCard key={horse.id} animal={horse} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="dogs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[hsl(25,60%,20%)]">Your Dogs</h2>
              <Link href="/animals">
                <Button className="bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)] hover:from-[hsl(25,50%,40%)] hover:to-[hsl(25,60%,35%)]">
                  Manage Dogs
                </Button>
              </Link>
            </div>
            
            {dogs.length === 0 ? (
              <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
                <CardContent className="p-8 text-center">
                  <Dog className="w-16 h-16 text-[hsl(25,40%,60%)] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[hsl(25,60%,20%)] mb-2">No dogs yet</h3>
                  <p className="text-[hsl(25,45%,35%)] mb-4">Expand your kennel by adding your first dog</p>
                  <Link href="/animals">
                    <Button className="bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)]">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dogs.map((dog: any) => (
                  <AnimalCard key={dog.id} animal={dog} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[hsl(25,60%,20%)]">Active Training</h2>
              <Button className="bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)] hover:from-[hsl(25,50%,40%)] hover:to-[hsl(25,60%,35%)]">
                Schedule Training
              </Button>
            </div>
            
            {activeTraining?.length === 0 ? (
              <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[hsl(25,40%,60%)] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-[hsl(45,50%,96%)] font-bold">T</span>
                  </div>
                  <h3 className="text-xl font-bold text-[hsl(25,60%,20%)] mb-2">No active training</h3>
                  <p className="text-[hsl(25,45%,35%)] mb-4">Start training your animals to improve their stats</p>
                  <Button className="bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)]">
                    Start Training
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {activeTraining.map((session: any) => (
                  <Card key={session.id} className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-[hsl(25,60%,20%)]">{session.animal?.name}</h3>
                          <p className="text-[hsl(25,45%,35%)]">{session.trainingType} Training</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-[hsl(25,60%,35%)]">
                            {Math.ceil((new Date(session.endTime).getTime() - new Date().getTime()) / (1000 * 60))}m remaining
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="breeding">
            <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
              <CardHeader>
                <CardTitle className="text-[hsl(25,60%,20%)]">Breeding Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[hsl(25,45%,35%)]">Breeding features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace">
            <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
              <CardHeader>
                <CardTitle className="text-[hsl(25,60%,20%)]">Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[hsl(25,45%,35%)]">Marketplace features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facilities">
            <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)]">
              <CardHeader>
                <CardTitle className="text-[hsl(25,60%,20%)]">Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[hsl(25,45%,35%)]">Facility management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
