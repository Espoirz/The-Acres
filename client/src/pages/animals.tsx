import { useState } from "react";
import {
  Heart,
  Plus,
  Filter,
  Search,
  Star,
  Crown,
  Zap,
  Award,
  Calendar,
  Activity,
  TrendingUp,
  Eye,
  MoreVertical,
  Trophy,
  Palette,
  Camera,
  Sparkles,
  Dna,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { HorseGenerator } from "../components/horse-generator";
import { generateCompleteHorse, HorseGenetics } from "../lib/horse-genetics";

// Mock data for animals
const animals = [
  {
    id: 1,
    name: "Moonlight Dancer",
    type: "Horse",
    breed: "Arabian",
    age: "3 years",
    gender: "Mare",
    rarity: "Mythical",
    genetics: "ee/Aa/CrCr/LP/n",
    stats: {
      speed: 95,
      stamina: 88,
      agility: 92,
      intelligence: 90,
      health: 100,
    },
    traits: ["Spirited", "Graceful", "Magical"],
    lastActivity: "2 hours ago",
    image:
      "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop",
    level: 15,
    experience: 2340,
    nextLevelXp: 2500,
    isPregnant: false,
    competitions: 12,
    wins: 8,
  },
  {
    id: 2,
    name: "Thunder Storm",
    type: "Horse",
    breed: "Thoroughbred",
    age: "5 years",
    gender: "Stallion",
    rarity: "Legendary",
    genetics: "Ee/AA/CrCr/lp/lp",
    stats: {
      speed: 98,
      stamina: 95,
      agility: 85,
      intelligence: 87,
      health: 96,
    },
    traits: ["Powerful", "Competitive", "Noble"],
    lastActivity: "1 day ago",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    level: 22,
    experience: 4890,
    nextLevelXp: 5000,
    isPregnant: false,
    competitions: 25,
    wins: 19,
  },
  {
    id: 3,
    name: "Golden Retriever Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    rarity: "Rare",
    genetics: "ee/Aa/BB/dd",
    stats: {
      speed: 75,
      stamina: 82,
      agility: 90,
      intelligence: 95,
      health: 98,
    },
    traits: ["Loyal", "Intelligent", "Friendly"],
    lastActivity: "30 minutes ago",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
    level: 8,
    experience: 890,
    nextLevelXp: 1000,
    isPregnant: false,
    competitions: 5,
    wins: 3,
  },
  {
    id: 4,
    name: "Starlight Unicorn",
    type: "Horse",
    breed: "Unicorn",
    age: "7 years",
    gender: "Mare",
    rarity: "Mythical",
    genetics: "EE/AA/CrCr/LP/LP",
    stats: {
      speed: 85,
      stamina: 90,
      agility: 88,
      intelligence: 99,
      health: 100,
    },
    traits: ["Magical", "Wise", "Ethereal", "Healing"],
    lastActivity: "3 hours ago",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    level: 30,
    experience: 7500,
    nextLevelXp: 8000,
    isPregnant: true,
    competitions: 15,
    wins: 15,
  },
];

const rarityColors = {
  Common: "bg-gray-100 text-gray-700",
  Rare: "bg-blue-100 text-blue-700",
  Epic: "bg-purple-100 text-purple-700",
  Legendary: "bg-amber-100 text-amber-700",
  Mythical: "bg-gradient-to-r from-violet-100 to-pink-100 text-violet-700",
};

const StatBar = ({
  label,
  value,
  max = 100,
}: {
  label: string;
  value: number;
  max?: number;
}) => {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
          {value}/{max}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-emerald rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const AnimalCard = ({ animal }: { animal: (typeof animals)[0] }) => {
  const rarityColorClass =
    rarityColors[animal.rarity as keyof typeof rarityColors];
  const experiencePercentage = (animal.experience / animal.nextLevelXp) * 100;

  return (
    <Card className="animal-card group relative overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Animal Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge className={rarityColorClass}>
            {animal.rarity === "Mythical" && <Crown className="w-3 h-3 mr-1" />}
            {animal.rarity}
          </Badge>
          {animal.isPregnant && (
            <Badge className="bg-pink-100 text-pink-700">
              <Heart className="w-3 h-3 mr-1" />
              Pregnant
            </Badge>
          )}
        </div>

        {/* Level badge */}
        <div className="absolute bottom-2 left-2">
          <Badge
            variant="secondary"
            className="bg-black/50 text-white border-0"
          >
            Level {animal.level}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Name and basic info */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-1">
            {animal.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {animal.age} • {animal.gender} • {animal.breed}
          </p>
        </div>

        {/* Experience bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Experience</span>
            <span className="font-medium">
              {animal.experience}/{animal.nextLevelXp} XP
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber to-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${experiencePercentage}%` }}
            />
          </div>
        </div>

        {/* Genetics */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">Genetics: </span>
            <span className="genetics-display">{animal.genetics}</span>
          </div>
          {animal.type === "Horse" && (
            <Button variant="ghost" size="sm" className="h-6 px-2">
              <Dna className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Stats preview */}
        <div className="space-y-2">
          <StatBar label="Speed" value={animal.stats.speed} />
          <StatBar label="Health" value={animal.stats.health} />
        </div>

        {/* Traits */}
        <div className="flex flex-wrap gap-1">
          {animal.traits.slice(0, 3).map((trait, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {trait}
            </Badge>
          ))}
          {animal.traits.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{animal.traits.length - 3}
            </Badge>
          )}
        </div>

        {/* Competition stats */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            {animal.competitions} races
          </span>
          <span className="flex items-center gap-1">
            <Award className="w-3 h-3" />
            {animal.wins} wins
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Activity className="w-4 h-4 mr-1" />
            Train
          </Button>
          {animal.type === "Horse" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>
                    Generate New Images for {animal.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    AI image generation for existing animals coming soon!
                  </p>
                  <Badge variant="secondary">Genetics: {animal.genetics}</Badge>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export function Animals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRarity, setFilterRarity] = useState("all");

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch = animal.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" || animal.type.toLowerCase() === filterType;
    const matchesRarity =
      filterRarity === "all" || animal.rarity.toLowerCase() === filterRarity;

    return matchesSearch && matchesType && matchesRarity;
  });

  const totalAnimals = animals.length;
  const averageLevel = Math.round(
    animals.reduce((sum, animal) => sum + animal.level, 0) / animals.length,
  );
  const totalWins = animals.reduce((sum, animal) => sum + animal.wins, 0);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-4xl font-bold mb-2">
                My Animals
              </h1>
              <p className="text-muted-foreground">
                Manage your stable of champions and rising stars
              </p>
            </div>

            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="btn-primary">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Horse
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>AI Horse Generator</DialogTitle>
                  </DialogHeader>
                  <HorseGenerator
                    onHorseGenerated={(horse, images) => {
                      console.log("Generated horse:", horse);
                      console.log("Generated images:", images);
                      // Here you would typically save the horse to your animals collection
                    }}
                  />
                </DialogContent>
              </Dialog>

              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Manual
              </Button>
            </div>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {totalAnimals}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Animals
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-emerald">
                  {averageLevel}
                </div>
                <div className="text-sm text-muted-foreground">Avg Level</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber">{totalWins}</div>
                <div className="text-sm text-muted-foreground">Total Wins</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-violet">2</div>
                <div className="text-sm text-muted-foreground">Mythical</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search animals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="horse">Horses</SelectItem>
              <SelectItem value="dog">Dogs</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterRarity} onValueChange={setFilterRarity}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Rarity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rarities</SelectItem>
              <SelectItem value="common">Common</SelectItem>
              <SelectItem value="rare">Rare</SelectItem>
              <SelectItem value="epic">Epic</SelectItem>
              <SelectItem value="legendary">Legendary</SelectItem>
              <SelectItem value="mythical">Mythical</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Animals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>

        {/* Empty state */}
        {filteredAnimals.length === 0 && (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">
              No animals found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters, or add your first animal to
              get started.
            </p>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Animal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
