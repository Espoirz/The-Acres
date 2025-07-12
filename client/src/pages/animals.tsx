import { useState } from "react";
import {
  Heart,
  Droplets,
  Sparkles,
  User,
  Brush,
  Play,
  Eye,
  MapPin,
  Clock,
  MessageCircle,
  Star,
  Trophy,
  Zap,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

// Extended mock data with simulation stats
const horses = [
  {
    id: 1,
    name: "Moonlight Dancer",
    age: "3 years",
    gender: "Mare",
    breed: "Arabian",
    height: "15.2 hands",
    color: "Palomino",
    markings: "White star, sock on left front",
    image:
      "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=400&fit=crop",
    stats: {
      health: 95,
      energy: 82,
      mood: 88,
      cleanliness: 76,
      level: 15,
    },
    capacity: 4,
    isPregnant: false,
    lastFed: "2 hours ago",
    location: "Pasture A",
    genetics: "ee/Aa/CrCr/LP/n",
    build: "refined",
  },
  {
    id: 2,
    name: "Thunder Storm",
    age: "5 years",
    gender: "Stallion",
    breed: "Thoroughbred",
    height: "16.3 hands",
    color: "Bay",
    markings: "Blaze, stockings on hind legs",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop",
    stats: {
      health: 100,
      energy: 95,
      mood: 92,
      cleanliness: 85,
      level: 22,
    },
    capacity: 5,
    isPregnant: false,
    lastFed: "1 hour ago",
    location: "Training Arena",
    genetics: "Ee/AA/nn/lp/lp",
    build: "athletic",
  },
  {
    id: 3,
    name: "Whisper Wind",
    age: "8 months",
    gender: "Filly",
    breed: "Paint Horse",
    height: "12.1 hands",
    color: "Chestnut Tobiano",
    markings: "Large white patches, bald face",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    stats: {
      health: 92,
      energy: 78,
      mood: 85,
      cleanliness: 68,
      level: 3,
    },
    capacity: 2,
    isPregnant: false,
    lastFed: "3 hours ago",
    location: "Foal Paddock",
    genetics: "ee/Aa/nn/TO/n",
    build: "foal",
  },
  {
    id: 4,
    name: "Silver Belle",
    age: "12 years",
    gender: "Mare",
    breed: "Friesian",
    height: "15.8 hands",
    color: "Black",
    markings: "No white markings",
    image:
      "https://images.unsplash.com/photo-1553284965-d1c0a5eed0ca?w=400&h=400&fit=crop",
    stats: {
      health: 88,
      energy: 65,
      mood: 90,
      cleanliness: 94,
      level: 28,
    },
    capacity: 5,
    isPregnant: true,
    lastFed: "30 minutes ago",
    location: "Maternity Stall",
    genetics: "Ee/aa/nn/nn",
    build: "heavy",
  },
];

// Daily log activities
const dailyLog = [
  {
    time: "11:45 AM",
    action: "Voted by",
    user: "Luna550",
    icon: Star,
    color: "text-amber-600",
  },
  {
    time: "11:30 AM",
    action: "Whispered to by",
    user: "william123m",
    icon: MessageCircle,
    color: "text-blue-600",
  },
  {
    time: "11:15 AM",
    action: "Groomed",
    user: "You",
    icon: Brush,
    color: "text-green-600",
  },
  {
    time: "10:50 AM",
    action: "Fed by",
    user: "stable_helper",
    icon: Heart,
    color: "text-red-600",
  },
  {
    time: "10:30 AM",
    action: "Training completed",
    user: "You",
    icon: Trophy,
    color: "text-purple-600",
  },
  {
    time: "10:00 AM",
    action: "Moved to",
    user: "Pasture B",
    icon: MapPin,
    color: "text-green-700",
  },
];

const StatBar = ({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: any;
}) => {
  const getBarColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-yellow-500";
    if (value >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="flex items-center gap-3">
      <Icon className={`w-4 h-4 ${color}`} />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-amber-900">{label}</span>
          <span className="text-xs font-bold text-amber-800">{value}%</span>
        </div>
        <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${getBarColor(value)} transition-all duration-500`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const HorseCard = ({ horse }: { horse: (typeof horses)[0] }) => {
  const getAgeSize = (age: string, build: string) => {
    if (build === "foal" || age.includes("months")) return "w-32 h-24";
    if (build === "heavy") return "w-40 h-32";
    return "w-36 h-28";
  };

  const getBreedCharacteristics = (breed: string) => {
    const characteristics: Record<string, string> = {
      Arabian: "Refined head, arched neck, high tail carriage",
      Thoroughbred: "Athletic build, long legs, lean frame",
      "Paint Horse": "Stock horse build, colorful markings",
      Friesian: "Powerful build, feathered legs, flowing mane",
    };
    return characteristics[breed] || "";
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 shadow-lg overflow-hidden mb-6">
      {/* Horse Image and Basic Info Section */}
      <div className="relative">
        {/* Stable background */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/50 to-amber-200/50" />
        <div
          className="h-40 bg-cover bg-center relative"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 116, 85, 0.1), rgba(160, 137, 95, 0.2)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23d4b996"/><rect x="0" y="0" width="20" height="100" fill="%23c4a986"/><rect x="40" y="0" width="20" height="100" fill="%23c4a986"/><rect x="80" y="0" width="20" height="100" fill="%23c4a986"/></svg>')`,
          }}
        >
          {/* Horse illustration */}
          <div className="absolute bottom-2 left-4">
            <div className={`${getAgeSize(horse.age, horse.build)} relative`}>
              <img
                src={horse.image}
                alt={horse.name}
                className="w-full h-full object-cover rounded-lg border-2 border-amber-300 shadow-md"
                style={{
                  filter: "sepia(10%) saturate(110%) brightness(105%)",
                }}
              />
              {/* Breed-specific visual cues */}
              {horse.breed === "Arabian" && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full shadow-sm" />
              )}
            </div>
          </div>

          {/* Horse name and basic info */}
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-amber-200">
              <h3 className="font-bold text-lg text-amber-900 mb-1">
                {horse.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-amber-700">
                <span>
                  {horse.age} • {horse.gender}
                </span>
                <span className="font-medium">{horse.breed}</span>
                <span>{horse.height}</span>
              </div>
              <div className="mt-1 text-xs text-amber-600">
                {horse.color} • {horse.markings}
              </div>
            </div>
          </div>

          {/* Status badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-1">
            {horse.isPregnant && (
              <Badge className="bg-pink-100 text-pink-700 border-pink-200">
                <Heart className="w-3 h-3 mr-1" />
                Pregnant
              </Badge>
            )}
            <Badge className="bg-amber-100 text-amber-700 border-amber-200">
              Level {horse.stats.level}
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <StatBar
            label="Health"
            value={horse.stats.health}
            color="text-red-600"
            icon={Heart}
          />
          <StatBar
            label="Energy"
            value={horse.stats.energy}
            color="text-blue-600"
            icon={Zap}
          />
          <StatBar
            label="Mood"
            value={horse.stats.mood}
            color="text-green-600"
            icon={Sparkles}
          />
          <StatBar
            label="Cleanliness"
            value={horse.stats.cleanliness}
            color="text-purple-600"
            icon={Droplets}
          />
        </div>

        {/* Capacity/Level display */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-amber-900">
              Capacity:
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < horse.capacity
                      ? "text-amber-500 fill-amber-500"
                      : "text-amber-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-xs text-amber-600">
            <MapPin className="w-3 h-3 inline mr-1" />
            {horse.location}
          </div>
        </div>

        {/* Interactive buttons */}
        <div className="grid grid-cols-5 gap-2">
          <Button
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs py-1 px-2 h-8"
          >
            <Eye className="w-3 h-3 mr-1" />
            See
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-100 text-xs py-1 px-2 h-8"
          >
            <Play className="w-3 h-3 mr-1" />
            Activities
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-100 text-xs py-1 px-2 h-8"
          >
            <MapPin className="w-3 h-3 mr-1" />
            Center
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-100 text-xs py-1 px-2 h-8"
          >
            <Brush className="w-3 h-3 mr-1" />
            Groom
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-100 text-xs py-1 px-2 h-8"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Exclusive
          </Button>
        </div>

        {/* Additional info */}
        <div className="mt-3 pt-3 border-t border-amber-200">
          <div className="flex items-center justify-between text-xs text-amber-600">
            <span>Last fed: {horse.lastFed}</span>
            <span className="font-mono bg-amber-100 px-2 py-1 rounded">
              {horse.genetics}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Animals() {
  const [sortBy, setSortBy] = useState("name");
  const [filterBreed, setFilterBreed] = useState("all");

  const sortedHorses = [...horses].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "age":
        return parseInt(a.age) - parseInt(b.age);
      case "level":
        return b.stats.level - a.stats.level;
      default:
        return 0;
    }
  });

  const filteredHorses = sortedHorses.filter(
    (horse) => filterBreed === "all" || horse.breed === filterBreed,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-25 to-orange-25">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23d4b996"/><path d="M0 0h20v100H0zM40 0h20v100H40zM80 0h20v100H80z" fill="%23c4a986"/></svg>')`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-amber-200 shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-bold text-3xl text-amber-900 mb-2">
                  My Horses
                </h1>
                <p className="text-amber-700">
                  You currently have{" "}
                  <span className="font-bold">{horses.length} horses</span> of{" "}
                  <span className="font-bold">
                    {new Set(horses.map((h) => h.breed)).size} different breeds
                  </span>
                  .
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-amber-900">
                    Sort by:
                  </span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32 h-8 border-amber-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="age">Age</SelectItem>
                      <SelectItem value="level">Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main horses section */}
          <div className="lg:col-span-3">
            <div className="space-y-0">
              {filteredHorses.map((horse) => (
                <HorseCard key={horse.id} horse={horse} />
              ))}
            </div>
          </div>

          {/* Daily log sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 shadow-lg sticky top-6">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-amber-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Daily Log
                </h3>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {dailyLog.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-2 rounded-lg bg-amber-50 border border-amber-100"
                    >
                      <entry.icon className={`w-4 h-4 mt-0.5 ${entry.color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-amber-600 font-medium mb-1">
                          {entry.time}
                        </div>
                        <div className="text-sm text-amber-800">
                          <span className="font-medium">{entry.action}</span>{" "}
                          <span className="text-amber-600">{entry.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick stats */}
                <div className="mt-6 pt-4 border-t border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-3">
                    Quick Stats
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-amber-700">Total Horses:</span>
                      <span className="font-bold text-amber-900">
                        {horses.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Pregnant:</span>
                      <span className="font-bold text-amber-900">
                        {horses.filter((h) => h.isPregnant).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Avg Level:</span>
                      <span className="font-bold text-amber-900">
                        {Math.round(
                          horses.reduce((sum, h) => sum + h.stats.level, 0) /
                            horses.length,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Needs Care:</span>
                      <span className="font-bold text-red-600">
                        {
                          horses.filter(
                            (h) =>
                              h.stats.cleanliness < 80 || h.stats.energy < 60,
                          ).length
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
