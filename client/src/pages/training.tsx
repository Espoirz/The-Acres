import { useState, useEffect } from "react";
import {
  Play,
  Trophy,
  Zap,
  Clock,
  Star,
  Target,
  Activity,
  Heart,
  Brain,
  Gauge,
  Dumbbell,
  Shield,
  Users,
  ArrowRight,
  RefreshCw,
  Award,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

// Mock data for animals
const mockAnimals = [
  {
    id: 1,
    name: "Thunder Storm",
    type: "Horse",
    breed: "Thoroughbred",
    level: 12,
    energy: 85,
    mood: 90,
    bond: 75,
    stats: {
      speed: 78,
      agility: 65,
      stamina: 82,
      intelligence: 70,
      strength: 75,
      discipline: 60,
    },
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Golden Max",
    type: "Dog",
    breed: "Golden Retriever",
    level: 8,
    energy: 92,
    mood: 95,
    bond: 88,
    stats: {
      speed: 60,
      agility: 85,
      stamina: 70,
      intelligence: 90,
      strength: 55,
      discipline: 78,
    },
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop",
  },
];

const trainingTypes = [
  {
    id: "speed",
    name: "Speed Training",
    icon: Zap,
    color: "text-blue-600",
    description: "Barrel Dash mini-game",
  },
  {
    id: "agility",
    name: "Agility Training",
    icon: Target,
    color: "text-green-600",
    description: "Jump Grid Challenge",
  },
  {
    id: "stamina",
    name: "Stamina Training",
    icon: Activity,
    color: "text-orange-600",
    description: "Trail Trek endurance",
  },
  {
    id: "intelligence",
    name: "Intelligence Training",
    icon: Brain,
    color: "text-purple-600",
    description: "Puzzle solving",
  },
  {
    id: "strength",
    name: "Strength Training",
    icon: Muscle,
    color: "text-red-600",
    description: "Resistance training",
  },
  {
    id: "discipline",
    name: "Discipline Training",
    icon: Shield,
    color: "text-amber-600",
    description: "Obedience commands",
  },
];

// Barrel Dash Mini-Game Component
function BarrelDashGame({
  onComplete,
}: {
  onComplete: (score: number) => void;
}) {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">(
    "ready",
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [position, setPosition] = useState(50);
  const [obstacles, setObstacles] = useState<number[]>([]);

  useEffect(() => {
    if (gameState === "playing") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState("finished");
            onComplete(score);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const obstacleTimer = setInterval(() => {
        setObstacles((prev) => [...prev, Math.random() * 80 + 10]);
      }, 2000);

      return () => {
        clearInterval(timer);
        clearInterval(obstacleTimer);
      };
    }
  }, [gameState, score, onComplete]);

  const moveLeft = () => position > 10 && setPosition((prev) => prev - 10);
  const moveRight = () => position < 90 && setPosition((prev) => prev + 10);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") moveLeft();
    if (e.key === "ArrowRight") moveRight();
  };

  useEffect(() => {
    const checkCollisions = () => {
      obstacles.forEach((obstaclePos, index) => {
        if (Math.abs(obstaclePos - position) < 8) {
          setScore((prev) => prev + 10);
          setObstacles((prev) => prev.filter((_, i) => i !== index));
        }
      });
    };
    checkCollisions();
  }, [position, obstacles]);

  if (gameState === "ready") {
    return (
      <div className="text-center p-8 bg-amber-50/80 rounded-lg border-2 border-amber-200">
        <Target className="w-16 h-16 text-amber-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-amber-900 mb-2">Barrel Dash</h3>
        <p className="text-amber-700 mb-6">
          Navigate around barrels to improve speed! Use arrow keys to move.
        </p>
        <Button
          onClick={() => setGameState("playing")}
          className="bg-amber-600 hover:bg-amber-700"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Training
        </Button>
      </div>
    );
  }

  if (gameState === "finished") {
    const stars = score > 100 ? 3 : score > 50 ? 2 : 1;
    return (
      <div className="text-center p-8 bg-green-50/80 rounded-lg border-2 border-green-200">
        <Trophy className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-900 mb-2">
          Training Complete!
        </h3>
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(3)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${i < stars ? "text-amber-400 fill-current" : "text-gray-300"}`}
            />
          ))}
        </div>
        <p className="text-green-700 mb-4">Score: {score} points</p>
        <div className="text-sm text-green-600">
          +{Math.floor(score / 10)} Speed XP • +{stars} Training Points
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-green-100/80 rounded-lg border-2 border-green-200 p-6"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-green-600" />
          <span className="font-medium text-green-800">Time: {timeLeft}s</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span className="font-medium text-amber-800">Score: {score}</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative h-64 bg-green-200/50 rounded-lg border-2 border-green-300 overflow-hidden">
        {/* Track */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-amber-200/50 border-t-2 border-amber-300" />

        {/* Horse/Dog */}
        <div
          className="absolute bottom-4 w-8 h-8 bg-amber-600 rounded-full transition-all duration-200 flex items-center justify-center"
          style={{ left: `${position}%` }}
        >
          🐎
        </div>

        {/* Obstacles */}
        {obstacles.map((obstaclePos, index) => (
          <div
            key={index}
            className="absolute bottom-20 w-6 h-12 bg-amber-800 rounded transition-all duration-1000"
            style={{ left: `${obstaclePos}%` }}
          >
            🛢️
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <Button
          onClick={moveLeft}
          variant="outline"
          className="border-green-300"
        >
          ← Move Left
        </Button>
        <Button
          onClick={moveRight}
          variant="outline"
          className="border-green-300"
        >
          Move Right →
        </Button>
      </div>
    </div>
  );
}

// Stat Bar Component
function StatBar({
  label,
  value,
  maxValue = 100,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  maxValue?: number;
  icon: any;
  color: string;
}) {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-sm font-medium text-amber-900">{label}</span>
        </div>
        <span className="text-sm font-bold text-amber-800">
          {value}/{maxValue}
        </span>
      </div>
      <Progress value={percentage} className="h-2 bg-amber-100" />
    </div>
  );
}

export function Training() {
  const [selectedAnimal, setSelectedAnimal] = useState(mockAnimals[0]);
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [trainingCooldown, setTrainingCooldown] = useState(0);

  const handleTrainingComplete = (score: number) => {
    setShowGame(false);
    setSelectedTraining(null);
    setTrainingCooldown(120); // 2 minutes cooldown

    // Start cooldown timer
    const timer = setInterval(() => {
      setTrainingCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startTraining = (trainingType: string) => {
    setSelectedTraining(trainingType);
    setShowGame(true);
  };

  const canTrain = selectedAnimal.energy > 30 && trainingCooldown === 0;

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: `linear-gradient(rgba(139, 69, 19, 0.1), rgba(160, 82, 45, 0.1)), url('https://cdn.builder.io/api/v1/image/assets%2F587d1a381dc140a2b97537bd0994633f%2Fb964361c6e914269bf8363694e1fe4ca?format=webp&width=800')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-amber-900/90 backdrop-blur-sm rounded-2xl border-2 border-amber-700/50 p-6 shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-amber-100">
                  Training Center
                </h1>
                <p className="text-amber-200/80">
                  Where champions are built through dedication and skill
                </p>
              </div>
            </div>

            {/* Trainer Level Progress */}
            <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-200 font-medium">
                  Trainer Level 8
                </span>
                <span className="text-amber-300 text-sm">2,340 / 3,000 XP</span>
              </div>
              <Progress value={78} className="h-2 bg-amber-700" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Animal Selection */}
          <div className="lg:col-span-1">
            <Card className="bg-amber-900/90 backdrop-blur-sm border-2 border-amber-700/50 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-amber-100 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Select Animal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={selectedAnimal.id.toString()}
                  onValueChange={(value) => {
                    const animal = mockAnimals.find(
                      (a) => a.id === parseInt(value),
                    );
                    if (animal) setSelectedAnimal(animal);
                  }}
                >
                  <SelectTrigger className="bg-amber-50/90 border-amber-600/50 text-amber-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAnimals.map((animal) => (
                      <SelectItem key={animal.id} value={animal.id.toString()}>
                        {animal.name} - {animal.breed}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Animal Display */}
                <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                  <img
                    src={selectedAnimal.image}
                    alt={selectedAnimal.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-amber-100 mb-2">
                    {selectedAnimal.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span className="text-amber-200">
                        Level {selectedAnimal.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-green-400" />
                      <span className="text-amber-200">
                        Energy {selectedAnimal.energy}%
                      </span>
                    </div>
                  </div>

                  {/* Status Bars */}
                  <div className="mt-4 space-y-2">
                    <StatBar
                      label="Energy"
                      value={selectedAnimal.energy}
                      icon={Activity}
                      color="text-green-500"
                    />
                    <StatBar
                      label="Mood"
                      value={selectedAnimal.mood}
                      icon={Heart}
                      color="text-pink-500"
                    />
                    <StatBar
                      label="Bond"
                      value={selectedAnimal.bond}
                      icon={Users}
                      color="text-blue-500"
                    />
                  </div>

                  {/* Training Cooldown */}
                  {trainingCooldown > 0 && (
                    <div className="mt-4 p-3 bg-orange-900/50 rounded-lg border border-orange-600/30">
                      <div className="flex items-center gap-2 text-orange-200">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          Cooldown: {Math.floor(trainingCooldown / 60)}:
                          {(trainingCooldown % 60).toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Current Stats */}
                <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                  <h4 className="font-medium text-amber-200 mb-3">
                    Current Stats
                  </h4>
                  <div className="space-y-2">
                    <StatBar
                      label="Speed"
                      value={selectedAnimal.stats.speed}
                      icon={Zap}
                      color="text-blue-500"
                    />
                    <StatBar
                      label="Agility"
                      value={selectedAnimal.stats.agility}
                      icon={Target}
                      color="text-green-500"
                    />
                    <StatBar
                      label="Stamina"
                      value={selectedAnimal.stats.stamina}
                      icon={Activity}
                      color="text-orange-500"
                    />
                    <StatBar
                      label="Intelligence"
                      value={selectedAnimal.stats.intelligence}
                      icon={Brain}
                      color="text-purple-500"
                    />
                    <StatBar
                      label="Strength"
                      value={selectedAnimal.stats.strength}
                      icon={Muscle}
                      color="text-red-500"
                    />
                    <StatBar
                      label="Discipline"
                      value={selectedAnimal.stats.discipline}
                      icon={Shield}
                      color="text-amber-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Training Modules */}
          <div className="lg:col-span-2">
            <Card className="bg-amber-900/90 backdrop-blur-sm border-2 border-amber-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-amber-100 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Training Modules
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showGame && selectedTraining ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-amber-200">
                        {
                          trainingTypes.find((t) => t.id === selectedTraining)
                            ?.name
                        }
                      </h3>
                      <Button
                        variant="outline"
                        onClick={() => setShowGame(false)}
                        className="border-amber-600/50 text-amber-200"
                      >
                        Exit Training
                      </Button>
                    </div>

                    {selectedTraining === "speed" && (
                      <BarrelDashGame onComplete={handleTrainingComplete} />
                    )}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {trainingTypes.map((training) => (
                      <Card
                        key={training.id}
                        className="bg-amber-800/50 border-amber-600/30 hover:bg-amber-700/50 transition-colors"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-amber-700/50 flex items-center justify-center`}
                            >
                              <training.icon
                                className={`w-5 h-5 ${training.color}`}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-amber-100">
                                {training.name}
                              </h3>
                              <p className="text-xs text-amber-200/70">
                                {training.description}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="text-sm text-amber-200/80 mb-1">
                              Current:{" "}
                              {
                                selectedAnimal.stats[
                                  training.id as keyof typeof selectedAnimal.stats
                                ]
                              }
                              /100
                            </div>
                            <Progress
                              value={
                                selectedAnimal.stats[
                                  training.id as keyof typeof selectedAnimal.stats
                                ]
                              }
                              className="h-2 bg-amber-700"
                            />
                          </div>

                          <Button
                            onClick={() => startTraining(training.id)}
                            disabled={!canTrain}
                            className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50"
                          >
                            {!canTrain ? (
                              <>
                                <Clock className="w-4 h-4 mr-2" />
                                {selectedAnimal.energy <= 30
                                  ? "Low Energy"
                                  : "Cooldown"}
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Start Training
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Training History & Achievements */}
            <Card className="mt-6 bg-amber-900/90 backdrop-blur-sm border-2 border-amber-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-amber-100 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Recent Training Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      training: "Speed Training",
                      score: 95,
                      stars: 3,
                      time: "2 hours ago",
                    },
                    {
                      training: "Agility Training",
                      score: 78,
                      stars: 2,
                      time: "1 day ago",
                    },
                    {
                      training: "Discipline Training",
                      score: 82,
                      stars: 2,
                      time: "2 days ago",
                    },
                  ].map((session, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-amber-800/30 rounded-lg border border-amber-600/30"
                    >
                      <div>
                        <div className="font-medium text-amber-200">
                          {session.training}
                        </div>
                        <div className="text-sm text-amber-300/70">
                          {session.time}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(3)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < session.stars ? "text-amber-400 fill-current" : "text-amber-600"}`}
                            />
                          ))}
                        </div>
                        <span className="text-amber-200 font-medium">
                          {session.score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
