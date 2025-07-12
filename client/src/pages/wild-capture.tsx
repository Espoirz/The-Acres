import { useState } from "react";
import {
  MapPin,
  Clock,
  Star,
  Zap,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const wildAreas = [
  {
    id: 1,
    name: "Sunset Meadows",
    difficulty: "Easy",
    energy: 20,
    timeLeft: "2h 15m",
    animals: ["Wild Mustang", "Border Collie", "Welsh Pony"],
    rarity: "Common",
    description: "Rolling hills perfect for finding hardy breeds",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F587d1a381dc140a2b97537bd0994633f%2F44f7e125d7b34150bb010ba014dcc42b?format=webp&width=800",
  },
  {
    id: 2,
    name: "Ancient Forest",
    difficulty: "Medium",
    energy: 35,
    timeLeft: "4h 32m",
    animals: ["Highland Pony", "German Shepherd", "Friesian Horse"],
    rarity: "Uncommon",
    description: "Dense woodlands hiding rare bloodlines",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F587d1a381dc140a2b97537bd0994633f%2F44f7e125d7b34150bb010ba014dcc42b?format=webp&width=800",
  },
  {
    id: 3,
    name: "Mountain Valley",
    difficulty: "Hard",
    energy: 50,
    timeLeft: "1h 45m",
    animals: ["Icelandic Horse", "Siberian Husky", "Norwegian Fjord"],
    rarity: "Rare",
    description: "Challenging terrain with legendary breeds",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F587d1a381dc140a2b97537bd0994633f%2F44f7e125d7b34150bb010ba014dcc42b?format=webp&width=800",
  },
];

const captureHistory = [
  {
    animal: "Wild Mustang",
    location: "Sunset Meadows",
    time: "2 hours ago",
    success: true,
  },
  {
    animal: "Border Collie",
    location: "Ancient Forest",
    time: "5 hours ago",
    success: true,
  },
  {
    animal: "Highland Pony",
    location: "Mountain Valley",
    time: "1 day ago",
    success: false,
  },
];

export function WildCapture() {
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [currentEnergy] = useState(75);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-600";
      case "Uncommon":
        return "text-blue-600";
      case "Rare":
        return "text-purple-600";
      case "Epic":
        return "text-orange-600";
      case "Legendary":
        return "text-amber-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://cdn.builder.io/api/v1/image/assets%2F587d1a381dc140a2b97537bd0994633f%2F44f7e125d7b34150bb010ba014dcc42b?format=webp&width=800')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
              Wild <span className="text-amber-300">Capture</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-6 drop-shadow-lg">
              Discover and capture rare breeds in their natural habitats
            </p>
            <div className="flex items-center justify-center gap-4 text-lg">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span>Energy: {currentEnergy}/100</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <MapPin className="w-5 h-5 text-blue-300" />
                <span>3 Areas Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search areas..."
                className="bg-background border border-border rounded-lg px-4 py-2 w-64"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter by Difficulty
              </Button>
              <Button variant="outline" size="sm">
                <Star className="w-4 h-4 mr-2" />
                Filter by Rarity
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Wild Areas */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {wildAreas.map((area) => (
              <div
                key={area.id}
                className={`group relative bg-card rounded-2xl border border-border overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedArea === area.id
                    ? "ring-2 ring-primary shadow-lg"
                    : ""
                }`}
                onClick={() =>
                  setSelectedArea(selectedArea === area.id ? null : area.id)
                }
              >
                {/* Area Image */}
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${area.image}')` }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge
                      className={`${getDifficultyColor(area.difficulty)} text-xs font-medium`}
                    >
                      {area.difficulty}
                    </Badge>
                    <Badge className="bg-black/50 text-white text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {area.timeLeft}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/50 text-white text-xs">
                      <Zap className="w-3 h-3 mr-1" />
                      {area.energy} Energy
                    </Badge>
                  </div>
                </div>

                {/* Area Info */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {area.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {area.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Available Animals
                      </span>
                      <span
                        className={`text-sm font-medium ${getRarityColor(area.rarity)}`}
                      >
                        {area.rarity}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {area.animals.map((animal, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {animal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full group"
                    disabled={currentEnergy < area.energy}
                  >
                    {currentEnergy < area.energy
                      ? "Not Enough Energy"
                      : "Start Expedition"}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Captures */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold mb-8">
            Recent Capture History
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {captureHistory.map((capture, index) => (
                <div
                  key={index}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-3 rounded-full ${capture.success ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <div>
                      <div className="font-medium">{capture.animal}</div>
                      <div className="text-sm text-muted-foreground">
                        {capture.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {capture.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
