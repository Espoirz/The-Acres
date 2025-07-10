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
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 relative">
        {/* Wooden panel background for loading */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 bg-gradient-to-b from-amber-800/40 via-amber-700/20 to-amber-900/40"
              style={{
                left: `${i * 8.33}%`,
                width: '6%',
              }}
            />
          ))}
        </div>
        <Navigation />
        <div className="max-w-7xl mx-auto p-6 relative z-10">
          <div className="animate-pulse">
            <div className="h-8 bg-orange-200/50 rounded mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-orange-200/50 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 relative">
      {/* Sophisticated wooden panel background */}
      <div className="absolute inset-0">
        {/* Vertical wooden slats */}
        <div className="absolute inset-0 opacity-25">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 bg-gradient-to-b from-amber-800/50 via-amber-700/30 to-amber-900/50 border-r border-amber-600/20"
              style={{
                left: `${i * 6.25}%`,
                width: '4%',
              }}
            />
          ))}
        </div>
        
        {/* Subtle horizontal wooden beams */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800"></div>
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900"></div>
        </div>
        
        {/* Metallic accent elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-8 w-px h-full bg-gradient-to-b from-zinc-400/50 to-zinc-600/50"></div>
          <div className="absolute top-0 right-8 w-px h-full bg-gradient-to-b from-zinc-400/50 to-zinc-600/50"></div>
        </div>
      </div>
      
      {/* Sophisticated lighting overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
      
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange-50 mb-2 font-serif tracking-tight">
            Welcome to Victory Acres
          </h1>
          <div className="w-48 h-px bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 mb-3"></div>
          <p className="text-orange-100/90 text-lg">
            Manage your ranch, breed champions, and build your legacy
          </p>
        </div>

        {/* Sophisticated Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Rabbit, value: stats?.totalHorses || 0, label: "Horses", color: "from-amber-600 to-orange-700" },
            { icon: Dog, value: stats?.totalDogs || 0, label: "Dogs", color: "from-orange-600 to-red-700" },
            { icon: Trophy, value: stats?.competitionsWon || 0, label: "Competitions Won", color: "from-yellow-500 to-amber-600" },
            { icon: Dna, value: stats?.offspringBred || 0, label: "Offspring Bred", color: "from-orange-500 to-amber-600" }
          ].map((stat, i) => (
            <Card key={i} className="bg-gradient-to-br from-amber-50/95 to-orange-50/90 backdrop-blur-sm border border-orange-200/50 shadow-xl relative overflow-hidden group hover:scale-105 transition-transform duration-300">
              {/* Wooden panel texture */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-800/30 via-transparent to-amber-800/30"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-amber-600/40"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-600/40"></div>
              </div>
              
              {/* Metallic accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-400/50 via-zinc-300/70 to-zinc-400/50"></div>
              
              <CardContent className="p-4 text-center relative z-10">
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mb-3 mx-auto shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-orange-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-orange-800 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sophisticated Tabs */}
        <Tabs defaultValue="horses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-gradient-to-r from-amber-50/95 to-orange-50/90 backdrop-blur-sm border border-orange-200/50 rounded-lg p-1 shadow-lg relative overflow-hidden">
            {/* Wooden panel background for tabs */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-800/20 via-transparent to-amber-800/20"></div>
            </div>
            
            {[
              { value: "horses", icon: Rabbit, label: "Horses" },
              { value: "dogs", icon: Dog, label: "Dogs" },
              { value: "training", label: "Training" },
              { value: "breeding", label: "Breeding" },
              { value: "marketplace", label: "Marketplace" },
              { value: "facilities", label: "Facilities" }
            ].map((tab, i) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value} 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-700 data-[state=active]:to-red-800 data-[state=active]:text-orange-50 data-[state=active]:shadow-lg text-orange-800 hover:text-orange-700 transition-all duration-300 relative z-10 rounded"
              >
                {tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="horses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-orange-50">Your Horses</h2>
              <Link href="/animals">
                <Button className="bg-gradient-to-r from-orange-700 to-red-800 text-orange-50 hover:from-orange-600 hover:to-red-700 shadow-lg border border-orange-600/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative z-10">Manage Horses</span>
                </Button>
              </Link>
            </div>
            
            {horses.length === 0 ? (
              <Card className="bg-gradient-to-br from-amber-50/95 to-orange-50/90 backdrop-blur-sm border border-orange-200/50 shadow-xl relative overflow-hidden">
                {/* Wooden panel texture */}
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-800/20 via-transparent to-amber-800/20"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-amber-600/30"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-600/30"></div>
                </div>
                
                <CardContent className="p-8 text-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Rabbit className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">No horses yet</h3>
                  <p className="text-orange-800 mb-4">Start your breeding program by adding your first horse</p>
                  <Link href="/animals">
                    <Button className="bg-gradient-to-r from-orange-700 to-red-800 text-orange-50 hover:from-orange-600 hover:to-red-700">
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
              <h2 className="text-2xl font-bold text-orange-50">Your Dogs</h2>
              <Link href="/animals">
                <Button className="bg-gradient-to-r from-orange-700 to-red-800 text-orange-50 hover:from-orange-600 hover:to-red-700 shadow-lg border border-orange-600/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative z-10">Manage Dogs</span>
                </Button>
              </Link>
            </div>
            
            {dogs.length === 0 ? (
              <Card className="bg-gradient-to-br from-amber-50/95 to-orange-50/90 backdrop-blur-sm border border-orange-200/50 shadow-xl relative overflow-hidden">
                {/* Wooden panel texture */}
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-800/20 via-transparent to-amber-800/20"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-amber-600/30"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-600/30"></div>
                </div>
                
                <CardContent className="p-8 text-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Dog className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">No dogs yet</h3>
                  <p className="text-orange-800 mb-4">Expand your kennel by adding your first dog</p>
                  <Link href="/animals">
                    <Button className="bg-gradient-to-r from-orange-700 to-red-800 text-orange-50 hover:from-orange-600 hover:to-red-700">
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
              <h2 className="text-2xl font-bold text-orange-50">Active Training</h2>
              <Button className="bg-gradient-to-r from-orange-700 to-red-800 text-orange-50 hover:from-orange-600 hover:to-red-700 shadow-lg border border-orange-600/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10">Schedule Training</span>
              </Button>
            </div>
            
            {activeTraining?.length === 0 ? (
              <Card className="bg-gradient-to-br from-amber-50/95 to-orange-50/90 backdrop-blur-sm border border-orange-200/50 shadow-xl relative overflow-hidden">
                {/* Wooden panel texture */}
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-800/20 via-transparent to-amber-800/20"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-amber-600/30"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-600/30"></div>
                </div>
                
                <CardContent className="p-8 text-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-orange-50 font-bold text-xl">T</span>
                  </div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">No active training</h3>
                  <p className="text-orange-800 mb-4">Start training your animals to improve their stats</p>
                  <Button className="bg-gradient-to-r from-orange-700 to-red-800 text-orange-50 hover:from-orange-600 hover:to-red-700">
                    Start Training
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {activeTraining.map((session: any) => (
                  <Card key={session.id} className="bg-gradient-to-br from-amber-50/95 to-orange-50/90 backdrop-blur-sm border border-orange-200/50 shadow-lg relative overflow-hidden">
                    {/* Wooden panel texture */}
                    <div className="absolute inset-0 opacity-15">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-800/20 via-transparent to-amber-800/20"></div>
                    </div>
                    
                    <CardContent className="p-4 relative z-10">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-orange-900">{session.animal?.name}</h3>
                          <p className="text-orange-800">{session.trainingType} Training</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-orange-700">
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

          {["breeding", "marketplace", "facilities"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue}>
              <Card className="bg-gradient-to-br from-amber-50/95 to-orange-50/90 backdrop-blur-sm border border-orange-200/50 shadow-xl relative overflow-hidden">
                {/* Wooden panel texture */}
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-800/20 via-transparent to-amber-800/20"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-amber-600/30"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-600/30"></div>
                </div>
                
                <CardHeader className="relative z-10">
                  <CardTitle className="text-orange-900 capitalize">{tabValue} Center</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-orange-800">{tabValue} features coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
