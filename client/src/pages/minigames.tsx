import { useState } from "react";
import {
  Gamepad2,
  Target,
  Zap,
  Heart,
  Stethoscope,
  Map,
  Trophy,
  Palette,
  Music,
  Brain,
  Clock,
  Star,
  Award,
  Play,
  Coins,
  Timer,
  Activity,
  Eye,
  Sparkles,
  Crown,
  Gift,
  Users,
  TrendingUp,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const miniGames = [
  // Training Arena Games
  {
    id: "barrel-dash",
    name: "Barrel Dash",
    category: "Training",
    description:
      "Navigate your horse around barrels in this speed training challenge",
    difficulty: "Easy",
    duration: "2-3 min",
    rewards: "+5-15 Speed XP",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=200&fit=crop",
    bestScore: 285,
    timesPlayed: 23,
    unlocked: true,
  },
  {
    id: "jump-grid",
    name: "Jump Grid Challenge",
    category: "Training",
    description: "Perfect your timing in this agility-focused jumping sequence",
    difficulty: "Medium",
    duration: "3-4 min",
    rewards: "+8-20 Agility XP",
    icon: Target,
    color: "text-green-500",
    bgColor: "bg-green-100",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop",
    bestScore: 420,
    timesPlayed: 18,
    unlocked: true,
  },
  {
    id: "obedience-call",
    name: "Obedience Call",
    category: "Training",
    description: "Simon-says style game to improve your animal's discipline",
    difficulty: "Easy",
    duration: "2-3 min",
    rewards: "+3-12 Discipline XP",
    icon: Heart,
    color: "text-pink-500",
    bgColor: "bg-pink-100",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=200&fit=crop",
    bestScore: 340,
    timesPlayed: 31,
    unlocked: true,
  },

  // Taming & Wild Games
  {
    id: "patience-meter",
    name: "Patience Meter",
    category: "Taming",
    description: "Build trust with wild animals through careful timing",
    difficulty: "Medium",
    duration: "4-6 min",
    rewards: "+10-25 Trust XP",
    icon: Clock,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
    bestScore: 890,
    timesPlayed: 12,
    unlocked: true,
  },
  {
    id: "feed-toss",
    name: "Feed Toss",
    category: "Taming",
    description: "Aim and throw feed to earn bonding XP with wild animals",
    difficulty: "Easy",
    duration: "2-3 min",
    rewards: "+5-15 Bonding XP",
    icon: Gift,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=200&fit=crop",
    bestScore: 156,
    timesPlayed: 8,
    unlocked: true,
  },
  {
    id: "tracker-trail",
    name: "Tracker's Trail",
    category: "Exploration",
    description: "Follow animal tracks through mysterious terrain",
    difficulty: "Hard",
    duration: "5-8 min",
    rewards: "Rare finds + XP",
    icon: Map,
    color: "text-green-600",
    bgColor: "bg-green-100",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
    bestScore: 0,
    timesPlayed: 0,
    unlocked: false,
    unlockRequirement: "Explorer Level 3",
  },

  // Medical Games
  {
    id: "suture-simulator",
    name: "Suture Simulator",
    category: "Veterinary",
    description: "Stitch wounds with precision in this medical mini-game",
    difficulty: "Hard",
    duration: "3-5 min",
    rewards: "+15-30 Vet XP",
    icon: Stethoscope,
    color: "text-red-500",
    bgColor: "bg-red-100",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    bestScore: 0,
    timesPlayed: 0,
    unlocked: false,
    unlockRequirement: "Veterinarian Level 2",
  },
  {
    id: "diagnostic-lab",
    name: "Diagnostic Lab",
    category: "Veterinary",
    description: "Match symptoms and identify diseases in this memory game",
    difficulty: "Medium",
    duration: "3-4 min",
    rewards: "+10-20 Vet XP",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=200&fit=crop",
    bestScore: 0,
    timesPlayed: 0,
    unlocked: false,
    unlockRequirement: "Veterinarian Level 1",
  },

  // Competition Games
  {
    id: "dressage-rhythm",
    name: "Dressage Rhythm",
    category: "Competition",
    description: "Hit the beats perfectly in this musical rhythm challenge",
    difficulty: "Medium",
    duration: "3-4 min",
    rewards: "Show Score Bonus",
    icon: Music,
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop",
    bestScore: 750,
    timesPlayed: 15,
    unlocked: true,
  },
  {
    id: "obstacle-agility",
    name: "Obstacle Agility Run",
    category: "Competition",
    description: "Navigate through timed obstacles in competitive events",
    difficulty: "Hard",
    duration: "2-4 min",
    rewards: "Competition Bonus",
    icon: Trophy,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
    image:
      "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=200&fit=crop",
    bestScore: 480,
    timesPlayed: 9,
    unlocked: true,
  },

  // Creative Games
  {
    id: "ranch-designer",
    name: "Ranch Designer",
    category: "Creative",
    description: "Design and layout your perfect ranch in this puzzle game",
    difficulty: "Easy",
    duration: "5-10 min",
    rewards: "Design Tokens",
    icon: Palette,
    color: "text-teal-500",
    bgColor: "bg-teal-100",
    image:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=200&fit=crop",
    bestScore: 0,
    timesPlayed: 0,
    unlocked: false,
    unlockRequirement: "Ranch Level 5",
  },
  {
    id: "tack-designer",
    name: "Tack Designer",
    category: "Creative",
    description: "Mix colors and create beautiful tack combinations",
    difficulty: "Easy",
    duration: "3-6 min",
    rewards: "Style Points",
    icon: Sparkles,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=200&fit=crop",
    bestScore: 92,
    timesPlayed: 7,
    unlocked: true,
  },
];

const dailyQuests = [
  {
    id: "path-foal",
    name: "Path of the Foal",
    description: "Navigate through 5 tiles to find hidden treasure",
    reward: "150 XP + Rare Item",
    timeLeft: "4h 23m",
    completed: false,
    difficulty: "Easy",
  },
  {
    id: "token-flip",
    name: "Token Flip Challenge",
    description: "Match animal breeds in this memory card game",
    reward: "200 Tokens",
    timeLeft: "8h 15m",
    completed: true,
    difficulty: "Medium",
  },
  {
    id: "lore-riddle",
    name: "Ancient Lore Riddle",
    description: "Solve story-based riddles for XP and decorations",
    reward: "300 XP + Decoration",
    timeLeft: "12h 45m",
    completed: false,
    difficulty: "Hard",
  },
];

const achievements = [
  {
    name: "Speed Demon",
    description: "Score 250+ in Barrel Dash",
    progress: 100,
    unlocked: true,
  },
  {
    name: "Perfect Rhythm",
    description: "Complete Dressage without missing a beat",
    progress: 0,
    unlocked: false,
  },
  {
    name: "Master Healer",
    description: "Perfect score in Suture Simulator",
    progress: 0,
    unlocked: false,
  },
  {
    name: "Wild Whisperer",
    description: "Tame 10 animals using Patience Meter",
    progress: 60,
    unlocked: false,
  },
  {
    name: "Design Champion",
    description: "Win 5 design contests",
    progress: 20,
    unlocked: false,
  },
];

function GameCard({
  game,
  onPlay,
}: {
  game: any;
  onPlay: (game: any) => void;
}) {
  const difficultyColor = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  return (
    <Card
      className={`${game.unlocked ? "hover:shadow-lg hover:-translate-y-1" : "opacity-60"} transition-all duration-200 bg-amber-100/80 border-2 border-amber-200`}
    >
      <CardContent className="p-4">
        <div className="relative mb-4">
          <img
            src={game.image}
            alt={game.name}
            className="w-full h-32 object-cover rounded-lg"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge
              className={
                difficultyColor[game.difficulty as keyof typeof difficultyColor]
              }
            >
              {game.difficulty}
            </Badge>
            {!game.unlocked && (
              <Badge className="bg-gray-100 text-gray-700">
                <Crown className="w-3 h-3 mr-1" />
                Locked
              </Badge>
            )}
          </div>
          <div className="absolute top-2 right-2">
            <div
              className={`w-8 h-8 ${game.bgColor} rounded-lg flex items-center justify-center`}
            >
              <game.icon className={`w-4 h-4 ${game.color}`} />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">{game.name}</h3>
            <p className="text-sm text-amber-700">{game.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Timer className="w-3 h-3 text-amber-600" />
              <span className="text-amber-800">{game.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Coins className="w-3 h-3 text-amber-600" />
              <span className="text-amber-800">{game.rewards}</span>
            </div>
          </div>

          {game.unlocked && (
            <div className="grid grid-cols-2 gap-2 text-xs bg-amber-50 rounded p-2">
              <div>
                <div className="text-amber-600">Best Score</div>
                <div className="font-medium text-amber-800">
                  {game.bestScore.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-amber-600">Times Played</div>
                <div className="font-medium text-amber-800">
                  {game.timesPlayed}
                </div>
              </div>
            </div>
          )}

          {!game.unlocked && (
            <div className="bg-orange-100 border border-orange-300 rounded p-2">
              <div className="text-xs text-orange-700">
                <strong>Unlock:</strong> {game.unlockRequirement}
              </div>
            </div>
          )}

          <Button
            onClick={() => onPlay(game)}
            disabled={!game.unlocked}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50"
          >
            {game.unlocked ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play Game
              </>
            ) : (
              <>
                <Crown className="w-4 h-4 mr-2" />
                Locked
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Minigames() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("games");

  const categories = [
    "all",
    "Training",
    "Taming",
    "Veterinary",
    "Competition",
    "Creative",
    "Exploration",
  ];

  const filteredGames =
    selectedCategory === "all"
      ? miniGames
      : miniGames.filter((game) => game.category === selectedCategory);

  const handlePlayGame = (game: any) => {
    if (game.unlocked) {
      alert(`Starting ${game.name}! This would launch the mini-game.`);
    }
  };

  const unlockedGames = miniGames.filter((g) => g.unlocked).length;
  const totalGames = miniGames.length;

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
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-amber-100">
                  Mini-Games Arena
                </h1>
                <p className="text-amber-200/80">
                  Master skills through fun and engaging challenges
                </p>
              </div>
            </div>

            {/* Player Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-amber-200 font-medium">
                    Games Unlocked
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">
                  {unlockedGames}/{totalGames}
                </div>
                <div className="text-sm text-amber-300/70">
                  {Math.round((unlockedGames / totalGames) * 100)}% complete
                </div>
              </div>

              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="text-amber-200 font-medium">
                    High Scores
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">12</div>
                <div className="text-sm text-amber-300/70">personal bests</div>
              </div>

              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-purple-400" />
                  <span className="text-amber-200 font-medium">
                    Total XP Earned
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">8,450</div>
                <div className="text-sm text-amber-300/70">from mini-games</div>
              </div>

              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-green-400" />
                  <span className="text-amber-200 font-medium">
                    Achievements
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">3/15</div>
                <div className="text-sm text-amber-300/70">unlocked</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-amber-900/90 backdrop-blur-sm border-2 border-amber-700/50 shadow-xl">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 bg-amber-800/50">
                <TabsTrigger
                  value="games"
                  className="data-[state=active]:bg-amber-600"
                >
                  Mini-Games
                </TabsTrigger>
                <TabsTrigger
                  value="daily"
                  className="data-[state=active]:bg-amber-600"
                >
                  Daily Quests
                </TabsTrigger>
                <TabsTrigger
                  value="achievements"
                  className="data-[state=active]:bg-amber-600"
                >
                  Achievements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="games" className="mt-6">
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-amber-200 mb-3">
                    Filter by Category
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={
                          selectedCategory === category
                            ? "bg-amber-600 hover:bg-amber-700"
                            : "border-amber-600/50 text-amber-200 hover:bg-amber-800/30"
                        }
                      >
                        {category === "all" ? "All Games" : category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Games Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onPlay={handlePlayGame}
                    />
                  ))}
                </div>

                {filteredGames.length === 0 && (
                  <div className="text-center py-12">
                    <Gamepad2 className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-amber-200 mb-2">
                      No Games Found
                    </h3>
                    <p className="text-amber-300/70">
                      Try selecting a different category
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="daily" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-amber-200">
                      Daily Adventure Quests
                    </h3>
                    <div className="text-sm text-amber-300/70">
                      Resets in: 14h 32m
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {dailyQuests.map((quest) => (
                      <Card
                        key={quest.id}
                        className={`border-2 ${
                          quest.completed
                            ? "bg-green-900/20 border-green-600/50"
                            : "bg-amber-100/80 border-amber-200"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4
                                  className={`font-semibold ${
                                    quest.completed
                                      ? "text-green-200"
                                      : "text-amber-900"
                                  }`}
                                >
                                  {quest.name}
                                </h4>
                                <Badge
                                  className={
                                    quest.difficulty === "Easy"
                                      ? "bg-green-100 text-green-700"
                                      : quest.difficulty === "Medium"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                  }
                                >
                                  {quest.difficulty}
                                </Badge>
                                {quest.completed && (
                                  <Badge className="bg-green-600 text-white">
                                    <Star className="w-3 h-3 mr-1" />
                                    Complete
                                  </Badge>
                                )}
                              </div>
                              <p
                                className={`text-sm mb-2 ${
                                  quest.completed
                                    ? "text-green-300"
                                    : "text-amber-700"
                                }`}
                              >
                                {quest.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs">
                                <span
                                  className={
                                    quest.completed
                                      ? "text-green-400"
                                      : "text-amber-600"
                                  }
                                >
                                  <Gift className="w-3 h-3 inline mr-1" />
                                  {quest.reward}
                                </span>
                                <span
                                  className={
                                    quest.completed
                                      ? "text-green-400"
                                      : "text-amber-600"
                                  }
                                >
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  {quest.timeLeft}
                                </span>
                              </div>
                            </div>

                            {!quest.completed && (
                              <Button className="bg-amber-600 hover:bg-amber-700">
                                <Play className="w-4 h-4 mr-2" />
                                Start Quest
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-amber-200">
                    Mini-Game Achievements
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <Card
                        key={index}
                        className={`border-2 ${
                          achievement.unlocked
                            ? "bg-green-50/80 border-green-200"
                            : "bg-amber-100/80 border-amber-200"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                achievement.unlocked
                                  ? "bg-green-600 text-white"
                                  : "bg-amber-200 text-amber-700"
                              }`}
                            >
                              {achievement.unlocked ? (
                                <Star className="w-6 h-6" />
                              ) : (
                                <Trophy className="w-6 h-6" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4
                                className={`font-semibold ${
                                  achievement.unlocked
                                    ? "text-green-800"
                                    : "text-amber-900"
                                }`}
                              >
                                {achievement.name}
                              </h4>
                              <p
                                className={`text-sm ${
                                  achievement.unlocked
                                    ? "text-green-700"
                                    : "text-amber-700"
                                }`}
                              >
                                {achievement.description}
                              </p>
                            </div>
                          </div>

                          {!achievement.unlocked && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs text-amber-600">
                                <span>Progress</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <Progress
                                value={achievement.progress}
                                className="h-2"
                              />
                            </div>
                          )}

                          {achievement.unlocked && (
                            <Badge className="bg-green-600 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Unlocked
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Leaderboard Preview */}
        <Card className="mt-8 bg-amber-900/90 backdrop-blur-sm border-2 border-amber-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Weekly Leaderboards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  game: "Barrel Dash",
                  leader: "SpeedDemon",
                  score: "1,250",
                  change: "+50",
                },
                {
                  game: "Dressage Rhythm",
                  leader: "MusicMaster",
                  score: "980",
                  change: "+20",
                },
                {
                  game: "Jump Grid",
                  leader: "AgilityAce",
                  score: "850",
                  change: "-10",
                },
              ].map((board, index) => (
                <div
                  key={index}
                  className="bg-amber-800/30 rounded-lg p-4 border border-amber-600/30"
                >
                  <h4 className="font-semibold text-amber-200 mb-3">
                    {board.game}
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-amber-100">
                        {board.leader}
                      </div>
                      <div className="text-sm text-amber-300/70">
                        Current Leader
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-amber-100">
                        {board.score}
                      </div>
                      <div
                        className={`text-sm ${
                          board.change.startsWith("+")
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {board.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
