import { useState } from "react";
import {
  Users,
  Dna,
  Heart,
  AlertTriangle,
  Info,
  Star,
  Crown,
  Target,
  Brain,
  Activity,
  Zap,
  Shield,
  Eye,
  Calculator,
  BookOpen,
  FlaskConical,
  Palette,
  TrendingUp,
  Award,
  Sparkles,
  Baby,
  Calendar,
  Coins,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

// Mock breeding animals data
const breedingAnimals = [
  {
    id: 1,
    name: "Moonlight Dancer",
    type: "Horse",
    breed: "Arabian",
    gender: "Mare",
    age: 4,
    level: 15,
    image:
      "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=300&h=200&fit=crop",
    genetics: {
      base: { E: "ee", A: "Aa", D: "DD" },
      color: { Cr: "CrCr", G: "gg", R: "rr" },
      pattern: { LP: "LP/n", PATN1: "PATN1/n", W: "ww" },
      health: { HERDA: "H/h", SCID: "S/S", PSSM: "P/P" },
      stats: {
        speed: "A/a",
        stamina: "A/A",
        agility: "a/a",
        intelligence: "A/a",
      },
    },
    phenotype: {
      baseColor: "Chestnut",
      modifiers: ["Cream", "Appaloosa"],
      finalColor: "Palomino Appaloosa",
    },
    stats: {
      speed: 85,
      stamina: 90,
      agility: 78,
      intelligence: 88,
      health: 95,
    },
    coi: 2.5,
    fertility: 92,
    pregnancies: 3,
    offspring: 8,
    isPregnant: false,
    canBreed: true,
  },
  {
    id: 2,
    name: "Thunder Storm",
    type: "Horse",
    breed: "Thoroughbred",
    gender: "Stallion",
    age: 6,
    level: 18,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
    genetics: {
      base: { E: "EE", A: "AA", D: "DD" },
      color: { Cr: "nn", G: "Gg", R: "rr" },
      pattern: { LP: "lp/lp", PATN1: "n/n", W: "ww" },
      health: { HERDA: "H/H", SCID: "S/S", PSSM: "P/p" },
      stats: {
        speed: "A/A",
        stamina: "A/a",
        agility: "A/a",
        intelligence: "a/a",
      },
    },
    phenotype: {
      baseColor: "Bay",
      modifiers: ["Greying"],
      finalColor: "Bay (Greying)",
    },
    stats: {
      speed: 95,
      stamina: 88,
      agility: 82,
      intelligence: 75,
      health: 90,
    },
    coi: 8.2,
    fertility: 88,
    pregnancies: 0,
    offspring: 12,
    isPregnant: false,
    canBreed: true,
  },
  {
    id: 3,
    name: "Stardust Mystique",
    type: "Horse",
    breed: "Unicorn",
    gender: "Mare",
    age: 8,
    level: 25,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    genetics: {
      base: { E: "Ee", A: "AA", D: "DD" },
      color: { Cr: "CrCr", G: "gg", R: "rr" },
      pattern: { LP: "LP/LP", PATN1: "PATN1/PATN1", W: "Ww" },
      health: { HERDA: "H/H", SCID: "S/S", PSSM: "P/P" },
      stats: {
        speed: "A/a",
        stamina: "A/A",
        agility: "A/A",
        intelligence: "A/A",
      },
      mythical: { horn: "Hr/Hr", magic: "Mg/Mg", heal: "Hl/Hl" },
    },
    phenotype: {
      baseColor: "Cremello",
      modifiers: ["Appaloosa", "White Markings", "Mythical"],
      finalColor: "Cremello Blanket Appaloosa (Mythical)",
    },
    stats: {
      speed: 90,
      stamina: 95,
      agility: 93,
      intelligence: 98,
      health: 100,
    },
    coi: 0.8,
    fertility: 85,
    pregnancies: 2,
    offspring: 4,
    isPregnant: true,
    canBreed: false,
    rarity: "Mythical",
  },
];

// Genetic calculation functions
function calculateOffspringProbabilities(mare: any, stallion: any) {
  const colorOutcomes = [
    { color: "Bay", probability: 35 },
    { color: "Chestnut", probability: 25 },
    { color: "Palomino", probability: 20 },
    { color: "Cremello", probability: 15 },
    { color: "Appaloosa", probability: 5 },
  ];

  const statRanges = {
    speed: {
      min: Math.min(mare.stats.speed, stallion.stats.speed) - 10,
      max: Math.max(mare.stats.speed, stallion.stats.speed) + 5,
    },
    stamina: {
      min: Math.min(mare.stats.stamina, stallion.stats.stamina) - 10,
      max: Math.max(mare.stats.stamina, stallion.stats.stamina) + 5,
    },
    agility: {
      min: Math.min(mare.stats.agility, stallion.stats.agility) - 10,
      max: Math.max(mare.stats.agility, stallion.stats.agility) + 5,
    },
    intelligence: {
      min: Math.min(mare.stats.intelligence, stallion.stats.intelligence) - 10,
      max: Math.max(mare.stats.intelligence, stallion.stats.intelligence) + 5,
    },
  };

  const compatibility = calculateCompatibility(mare, stallion);
  const inbreedingRisk = calculateInbreedingRisk(mare, stallion);

  return {
    colorOutcomes,
    statRanges,
    compatibility,
    inbreedingRisk,
    successRate: Math.max(60, Math.min(95, compatibility - inbreedingRisk * 2)),
    mythicalChance:
      mare.rarity === "Mythical" || stallion.rarity === "Mythical" ? 15 : 0.1,
  };
}

function calculateCompatibility(mare: any, stallion: any) {
  const statCompatibility =
    Object.keys(mare.stats).reduce((sum, stat) => {
      const diff = Math.abs(mare.stats[stat] - stallion.stats[stat]);
      return sum + (100 - diff) / 100;
    }, 0) / Object.keys(mare.stats).length;

  const healthCompatibility =
    mare.genetics.health.HERDA === "H/H" &&
    stallion.genetics.health.HERDA === "H/H"
      ? 1
      : 0.8;
  const fertilityFactor = (mare.fertility + stallion.fertility) / 200;

  return Math.round(
    (statCompatibility * 40 + healthCompatibility * 30 + fertilityFactor * 30) *
      100,
  );
}

function calculateInbreedingRisk(mare: any, stallion: any) {
  // Simplified COI calculation - in reality this would check pedigree
  const combinedCOI = (mare.coi + stallion.coi) / 2;
  if (combinedCOI < 6) return 0;
  if (combinedCOI < 12) return 5;
  return 15;
}

function GeneticDisplay({ genetics, title }: { genetics: any; title: string }) {
  return (
    <div className="bg-amber-100/50 rounded-lg p-3 border border-amber-200">
      <h4 className="font-medium text-amber-900 mb-2">{title}</h4>
      <div className="space-y-1 text-xs font-mono">
        {Object.entries(genetics).map(([category, genes]: [string, any]) => (
          <div key={category}>
            <span className="text-amber-700 font-semibold">{category}:</span>
            <div className="ml-2">
              {Object.entries(genes).map(([gene, value]: [string, any]) => (
                <div key={gene} className="flex justify-between">
                  <span className="text-amber-800">{gene}:</span>
                  <span className="text-amber-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PedigreeViewer({ animal }: { animal: any }) {
  // Mock pedigree data
  const pedigree = {
    sire: { name: "Desert Wind", genetics: "EE/AA/nCr" },
    dam: { name: "Moonbeam", genetics: "ee/Aa/CrCr" },
    paternalGrandSire: { name: "Lightning Bolt", genetics: "EE/AA/nn" },
    paternalGrandDam: { name: "Sandy Shores", genetics: "Ee/AA/nCr" },
    maternalGrandSire: { name: "Golden Dream", genetics: "ee/Aa/CrCr" },
    maternalGrandDam: { name: "Silver Bell", genetics: "ee/aa/CrCr" },
  };

  return (
    <div className="bg-amber-100/50 rounded-lg p-4 border border-amber-200">
      <h4 className="font-semibold text-amber-900 mb-4">
        3-Generation Pedigree
      </h4>
      <div className="grid grid-cols-4 gap-2 text-xs">
        {/* Generation 1 (Animal) */}
        <div className="col-span-1 bg-amber-200 rounded p-2 border border-amber-300">
          <div className="font-bold text-amber-900">{animal.name}</div>
          <div className="text-amber-700">{animal.phenotype.finalColor}</div>
        </div>

        {/* Generation 2 (Parents) */}
        <div className="col-span-1 space-y-2">
          <div className="bg-blue-100 rounded p-2 border border-blue-200">
            <div className="font-semibold text-blue-900">Sire</div>
            <div className="text-blue-700">{pedigree.sire.name}</div>
            <div className="text-blue-600 font-mono text-xs">
              {pedigree.sire.genetics}
            </div>
          </div>
          <div className="bg-pink-100 rounded p-2 border border-pink-200">
            <div className="font-semibold text-pink-900">Dam</div>
            <div className="text-pink-700">{pedigree.dam.name}</div>
            <div className="text-pink-600 font-mono text-xs">
              {pedigree.dam.genetics}
            </div>
          </div>
        </div>

        {/* Generation 3 (Grandparents) */}
        <div className="col-span-2 grid grid-cols-2 gap-1">
          <div className="bg-blue-50 rounded p-1 border border-blue-100">
            <div className="font-semibold text-blue-800 text-xs">
              Paternal Grandsire
            </div>
            <div className="text-blue-600 text-xs">
              {pedigree.paternalGrandSire.name}
            </div>
          </div>
          <div className="bg-blue-50 rounded p-1 border border-blue-100">
            <div className="font-semibold text-blue-800 text-xs">
              Paternal Granddam
            </div>
            <div className="text-blue-600 text-xs">
              {pedigree.paternalGrandDam.name}
            </div>
          </div>
          <div className="bg-pink-50 rounded p-1 border border-pink-100">
            <div className="font-semibold text-pink-800 text-xs">
              Maternal Grandsire
            </div>
            <div className="text-pink-600 text-xs">
              {pedigree.maternalGrandSire.name}
            </div>
          </div>
          <div className="bg-pink-50 rounded p-1 border border-pink-100">
            <div className="font-semibold text-pink-800 text-xs">
              Maternal Granddam
            </div>
            <div className="text-pink-600 text-xs">
              {pedigree.maternalGrandDam.name}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 p-2 bg-amber-50 rounded border border-amber-200">
        <div className="text-xs text-amber-700">
          <strong>COI (Coefficient of Inbreeding):</strong> {animal.coi}%
          <span
            className={`ml-2 px-2 py-1 rounded text-xs ${
              animal.coi < 6
                ? "bg-green-100 text-green-700"
                : animal.coi < 12
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {animal.coi < 6 ? "Safe" : animal.coi < 12 ? "Warning" : "Risk"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Breeding() {
  const [selectedMare, setSelectedMare] = useState<any>(
    breedingAnimals.find((a) => a.gender === "Mare"),
  );
  const [selectedStallion, setSelectedStallion] = useState<any>(
    breedingAnimals.find((a) => a.gender === "Stallion"),
  );
  const [activeTab, setActiveTab] = useState("planner");
  const [showPrediction, setShowPrediction] = useState(false);

  const mares = breedingAnimals.filter((a) => a.gender === "Mare");
  const stallions = breedingAnimals.filter((a) => a.gender === "Stallion");

  const predictions =
    selectedMare && selectedStallion
      ? calculateOffspringProbabilities(selectedMare, selectedStallion)
      : null;

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
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Dna className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-amber-100">
                  Advanced Breeding Center
                </h1>
                <p className="text-amber-200/80">
                  Master genetics and create legendary bloodlines
                </p>
              </div>
            </div>

            {/* Breeder Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-amber-200 font-medium">
                    Breeder Level
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">8</div>
                <div className="text-sm text-amber-300/70">
                  Master Geneticist
                </div>
              </div>

              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Baby className="w-4 h-4 text-green-400" />
                  <span className="text-amber-200 font-medium">
                    Offspring Bred
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">47</div>
                <div className="text-sm text-amber-300/70">lifetime</div>
              </div>

              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-200 font-medium">Champions</span>
                </div>
                <div className="text-2xl font-bold text-amber-100">12</div>
                <div className="text-sm text-amber-300/70">show winners</div>
              </div>

              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-amber-200 font-medium">
                    Mythical Rate
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">8.5%</div>
                <div className="text-sm text-amber-300/70">above average</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <Card className="bg-amber-900/90 backdrop-blur-sm border-2 border-amber-700/50 shadow-xl">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-amber-800/50">
                <TabsTrigger
                  value="planner"
                  className="data-[state=active]:bg-amber-600"
                >
                  Breeding Planner
                </TabsTrigger>
                <TabsTrigger
                  value="genetics"
                  className="data-[state=active]:bg-amber-600"
                >
                  Genetic Testing
                </TabsTrigger>
                <TabsTrigger
                  value="pedigree"
                  className="data-[state=active]:bg-amber-600"
                >
                  Pedigree Viewer
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-amber-600"
                >
                  Breeding History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="planner" className="mt-6">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Parent Selection */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Mare Selection */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-amber-200 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-pink-400" />
                        Select Mare
                      </h3>

                      <Select
                        value={selectedMare?.id.toString()}
                        onValueChange={(value) => {
                          const mare = mares.find(
                            (m) => m.id === parseInt(value),
                          );
                          if (mare) setSelectedMare(mare);
                        }}
                      >
                        <SelectTrigger className="bg-amber-50/90 border-amber-600/50 text-amber-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {mares.map((mare) => (
                            <SelectItem
                              key={mare.id}
                              value={mare.id.toString()}
                            >
                              {mare.name} - {mare.breed} (Level {mare.level})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedMare && (
                        <Card className="bg-amber-100/80 border-2 border-pink-200">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={selectedMare.image}
                                alt={selectedMare.name}
                                className="w-24 h-24 object-cover rounded-lg border-2 border-pink-300"
                              />
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-amber-900">
                                    {selectedMare.name}
                                  </h4>
                                  {selectedMare.rarity && (
                                    <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                                      <Crown className="w-3 h-3 mr-1" />
                                      {selectedMare.rarity}
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-amber-700">
                                  {selectedMare.phenotype.finalColor} •{" "}
                                  {selectedMare.age} years • Fertility:{" "}
                                  {selectedMare.fertility}%
                                </div>
                                <div className="grid grid-cols-4 gap-2 text-xs">
                                  <div>Speed: {selectedMare.stats.speed}</div>
                                  <div>
                                    Stamina: {selectedMare.stats.stamina}
                                  </div>
                                  <div>
                                    Agility: {selectedMare.stats.agility}
                                  </div>
                                  <div>
                                    Intelligence:{" "}
                                    {selectedMare.stats.intelligence}
                                  </div>
                                </div>
                                {selectedMare.isPregnant && (
                                  <Badge className="bg-green-100 text-green-700 border-green-300">
                                    <Baby className="w-3 h-3 mr-1" />
                                    Pregnant
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <GeneticDisplay
                              genetics={selectedMare.genetics}
                              title="Mare Genetics"
                            />
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Stallion Selection */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-amber-200 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-blue-400" />
                        Select Stallion
                      </h3>

                      <Select
                        value={selectedStallion?.id.toString()}
                        onValueChange={(value) => {
                          const stallion = stallions.find(
                            (s) => s.id === parseInt(value),
                          );
                          if (stallion) setSelectedStallion(stallion);
                        }}
                      >
                        <SelectTrigger className="bg-amber-50/90 border-amber-600/50 text-amber-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {stallions.map((stallion) => (
                            <SelectItem
                              key={stallion.id}
                              value={stallion.id.toString()}
                            >
                              {stallion.name} - {stallion.breed} (Level{" "}
                              {stallion.level})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedStallion && (
                        <Card className="bg-amber-100/80 border-2 border-blue-200">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={selectedStallion.image}
                                alt={selectedStallion.name}
                                className="w-24 h-24 object-cover rounded-lg border-2 border-blue-300"
                              />
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-amber-900">
                                    {selectedStallion.name}
                                  </h4>
                                  {selectedStallion.rarity && (
                                    <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                                      <Crown className="w-3 h-3 mr-1" />
                                      {selectedStallion.rarity}
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-amber-700">
                                  {selectedStallion.phenotype.finalColor} •{" "}
                                  {selectedStallion.age} years • Fertility:{" "}
                                  {selectedStallion.fertility}%
                                </div>
                                <div className="grid grid-cols-4 gap-2 text-xs">
                                  <div>
                                    Speed: {selectedStallion.stats.speed}
                                  </div>
                                  <div>
                                    Stamina: {selectedStallion.stats.stamina}
                                  </div>
                                  <div>
                                    Agility: {selectedStallion.stats.agility}
                                  </div>
                                  <div>
                                    Intelligence:{" "}
                                    {selectedStallion.stats.intelligence}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <GeneticDisplay
                              genetics={selectedStallion.genetics}
                              title="Stallion Genetics"
                            />
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Breeding Action */}
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setShowPrediction(true)}
                        disabled={
                          !selectedMare ||
                          !selectedStallion ||
                          selectedMare.isPregnant
                        }
                        className="bg-purple-600 hover:bg-purple-700 flex-1"
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        Calculate Offspring Probabilities
                      </Button>

                      <Button
                        disabled={
                          !selectedMare ||
                          !selectedStallion ||
                          !showPrediction ||
                          selectedMare.isPregnant
                        }
                        className="bg-green-600 hover:bg-green-700 flex-1"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Begin Breeding (2,500 coins)
                      </Button>
                    </div>
                  </div>

                  {/* Prediction Results */}
                  <div className="lg:col-span-1">
                    {showPrediction &&
                      predictions &&
                      selectedMare &&
                      selectedStallion && (
                        <Card className="bg-green-50/80 border-2 border-green-200">
                          <CardHeader>
                            <CardTitle className="text-green-800 flex items-center gap-2">
                              <FlaskConical className="w-5 h-5" />
                              Offspring Predictions
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Compatibility */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-green-700">
                                  Compatibility:
                                </span>
                                <span className="font-medium text-green-800">
                                  {predictions.compatibility}%
                                </span>
                              </div>
                              <Progress
                                value={predictions.compatibility}
                                className="h-2"
                              />
                            </div>

                            {/* Success Rate */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-green-700">
                                  Success Rate:
                                </span>
                                <span className="font-medium text-green-800">
                                  {predictions.successRate}%
                                </span>
                              </div>
                              <Progress
                                value={predictions.successRate}
                                className="h-2"
                              />
                            </div>

                            {/* Inbreeding Warning */}
                            {predictions.inbreedingRisk > 0 && (
                              <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
                                <div className="flex items-center gap-2 text-orange-800">
                                  <AlertTriangle className="w-4 h-4" />
                                  <span className="font-medium">
                                    Inbreeding Risk:{" "}
                                    {predictions.inbreedingRisk}%
                                  </span>
                                </div>
                                <p className="text-xs text-orange-700 mt-1">
                                  May result in reduced stats or health issues
                                </p>
                              </div>
                            )}

                            {/* Color Probabilities */}
                            <div>
                              <h4 className="font-medium text-green-800 mb-2">
                                Expected Colors:
                              </h4>
                              <div className="space-y-1">
                                {predictions.colorOutcomes.map(
                                  (outcome, index) => (
                                    <div
                                      key={index}
                                      className="flex justify-between text-sm"
                                    >
                                      <span className="text-green-700">
                                        {outcome.color}:
                                      </span>
                                      <span className="text-green-800">
                                        {outcome.probability}%
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>

                            {/* Stat Ranges */}
                            <div>
                              <h4 className="font-medium text-green-800 mb-2">
                                Stat Ranges:
                              </h4>
                              <div className="space-y-1 text-xs">
                                {Object.entries(predictions.statRanges).map(
                                  ([stat, range]: [string, any]) => (
                                    <div
                                      key={stat}
                                      className="flex justify-between"
                                    >
                                      <span className="text-green-700 capitalize">
                                        {stat}:
                                      </span>
                                      <span className="text-green-800">
                                        {Math.max(0, range.min)}-
                                        {Math.min(100, range.max)}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>

                            {/* Mythical Chance */}
                            {predictions.mythicalChance > 0 && (
                              <div className="bg-purple-100 border border-purple-300 rounded-lg p-3">
                                <div className="flex items-center gap-2 text-purple-800">
                                  <Sparkles className="w-4 h-4" />
                                  <span className="font-medium">
                                    Mythical Chance:{" "}
                                    {predictions.mythicalChance}%
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Cost Breakdown */}
                            <div className="bg-amber-100 border border-amber-300 rounded-lg p-3">
                              <h4 className="font-medium text-amber-800 mb-2">
                                Breeding Costs:
                              </h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-amber-700">
                                    Base Fee:
                                  </span>
                                  <span className="text-amber-800">
                                    2,000 coins
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-amber-700">
                                    Stud Fee:
                                  </span>
                                  <span className="text-amber-800">
                                    500 coins
                                  </span>
                                </div>
                                <div className="flex justify-between border-t border-amber-300 pt-1 font-medium">
                                  <span className="text-amber-800">Total:</span>
                                  <span className="text-amber-900">
                                    2,500 coins
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                    {!showPrediction && (
                      <Card className="bg-amber-100/80 border-2 border-amber-300">
                        <CardContent className="p-6 text-center">
                          <Dna className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                          <h3 className="font-semibold text-amber-900 mb-2">
                            Genetic Analysis
                          </h3>
                          <p className="text-amber-700 text-sm">
                            Select both parents and click "Calculate" to see
                            detailed offspring predictions
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="genetics" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-amber-200">
                      Genetic Testing Laboratory
                    </h3>

                    {/* Available Tests */}
                    <div className="grid gap-4">
                      {[
                        {
                          name: "DNA Analysis",
                          cost: 150,
                          description:
                            "Full genetic profile including hidden traits",
                          icon: Dna,
                        },
                        {
                          name: "Health Screen",
                          cost: 200,
                          description:
                            "Test for genetic diseases and disorders",
                          icon: Shield,
                        },
                        {
                          name: "Parentage Test",
                          cost: 100,
                          description: "Verify bloodline and lineage",
                          icon: Users,
                        },
                        {
                          name: "Trait Analysis",
                          cost: 300,
                          description: "Predict offspring characteristics",
                          icon: Target,
                        },
                      ].map((test, index) => (
                        <Card
                          key={index}
                          className="bg-amber-100/80 border-2 border-amber-200"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center">
                                  <test.icon className="w-5 h-5 text-amber-700" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-amber-900">
                                    {test.name}
                                  </h4>
                                  <p className="text-sm text-amber-700">
                                    {test.description}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-amber-900">
                                  {test.cost} coins
                                </div>
                                <Button
                                  size="sm"
                                  className="mt-1 bg-amber-600 hover:bg-amber-700"
                                >
                                  Order Test
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-amber-200">
                      Recent Test Results
                    </h3>

                    <Card className="bg-green-50/80 border-2 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-green-900">
                            Moonlight Dancer - DNA Analysis
                          </h4>
                          <Badge className="bg-green-600 text-white">
                            Complete
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-green-700">Base Color:</span>
                            <span className="text-green-800">
                              ee (Chestnut)
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">Cream Gene:</span>
                            <span className="text-green-800">
                              CrCr (Double Cream)
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">Pattern:</span>
                            <span className="text-green-800">
                              LP/n (Appaloosa Carrier)
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">Health:</span>
                            <span className="text-green-800">All Clear</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50/80 border-2 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-blue-900">
                            Thunder Storm - Health Screen
                          </h4>
                          <Badge className="bg-blue-600 text-white">
                            Complete
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-blue-700">HERDA:</span>
                            <span className="text-green-800">Clear (H/H)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">SCID:</span>
                            <span className="text-green-800">Clear (S/S)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">PSSM:</span>
                            <span className="text-orange-800">
                              Carrier (P/p)
                            </span>
                          </div>
                          <div className="text-xs text-blue-600 mt-2">
                            Note: PSSM carrier - safe to breed but offspring may
                            inherit condition
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pedigree" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-amber-200">
                    Pedigree Analysis
                  </h3>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium text-amber-300 mb-4">
                        Select Animal for Pedigree View
                      </h4>
                      <Select>
                        <SelectTrigger className="bg-amber-50/90 border-amber-600/50 text-amber-900">
                          <SelectValue placeholder="Choose animal..." />
                        </SelectTrigger>
                        <SelectContent>
                          {breedingAnimals.map((animal) => (
                            <SelectItem
                              key={animal.id}
                              value={animal.id.toString()}
                            >
                              {animal.name} - {animal.breed}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedMare && (
                        <div className="mt-6">
                          <PedigreeViewer animal={selectedMare} />
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-amber-300 mb-4">
                        Lineage Insights
                      </h4>
                      <div className="space-y-4">
                        <Card className="bg-amber-100/80 border-2 border-amber-200">
                          <CardContent className="p-4">
                            <h5 className="font-semibold text-amber-900 mb-2">
                              Genetic Diversity
                            </h5>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-amber-700">
                                  Diversity Index:
                                </span>
                                <span className="text-green-700 font-medium">
                                  High (0.85)
                                </span>
                              </div>
                              <Progress value={85} className="h-2" />
                              <p className="text-xs text-amber-700">
                                Excellent genetic diversity reduces inbreeding
                                risks
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-amber-100/80 border-2 border-amber-200">
                          <CardContent className="p-4">
                            <h5 className="font-semibold text-amber-900 mb-2">
                              Notable Ancestors
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-amber-500" />
                                <span className="text-amber-800">
                                  Champion Desert Wind (Great-Grandsire)
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Crown className="w-4 h-4 text-purple-500" />
                                <span className="text-amber-800">
                                  Legendary Silver Bell (Great-Granddam)
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-blue-500" />
                                <span className="text-amber-800">
                                  Racing Star Lightning Bolt (Grandsire)
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-amber-100/80 border-2 border-amber-200">
                          <CardContent className="p-4">
                            <h5 className="font-semibold text-amber-900 mb-2">
                              Breeding Recommendations
                            </h5>
                            <div className="space-y-2 text-sm text-amber-800">
                              <div className="flex items-center gap-2">
                                <Info className="w-4 h-4 text-blue-500" />
                                <span>Pair with high-stamina bloodlines</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Info className="w-4 h-4 text-green-500" />
                                <span>Avoid PSSM carrier matches</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Info className="w-4 h-4 text-purple-500" />
                                <span>Excellent for appaloosa breeding</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-amber-200">
                      Breeding History
                    </h3>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Full Records
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {[
                      {
                        date: "2024-01-15",
                        mare: "Moonlight Dancer",
                        stallion: "Thunder Storm",
                        offspring: "Storm Dancer",
                        success: true,
                        stats: {
                          speed: 88,
                          stamina: 92,
                          agility: 85,
                          intelligence: 90,
                        },
                        color: "Bay Appaloosa",
                        rarity: "Epic",
                      },
                      {
                        date: "2024-01-08",
                        mare: "Silver Belle",
                        stallion: "Golden Dream",
                        offspring: "Dream Catcher",
                        success: true,
                        stats: {
                          speed: 82,
                          stamina: 85,
                          agility: 88,
                          intelligence: 85,
                        },
                        color: "Palomino",
                        rarity: "Rare",
                      },
                      {
                        date: "2024-01-01",
                        mare: "Stardust Mystique",
                        stallion: "Thunder Storm",
                        offspring: "Mystic Thunder",
                        success: true,
                        stats: {
                          speed: 95,
                          stamina: 98,
                          agility: 96,
                          intelligence: 99,
                        },
                        color: "Silver Dapple",
                        rarity: "Mythical",
                      },
                    ].map((record, index) => (
                      <Card
                        key={index}
                        className="bg-amber-100/80 border-2 border-amber-200"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-amber-600" />
                              <span className="font-medium text-amber-900">
                                {record.date}
                              </span>
                              <Badge
                                className={`${
                                  record.rarity === "Mythical"
                                    ? "bg-purple-100 text-purple-700"
                                    : record.rarity === "Epic"
                                      ? "bg-orange-100 text-orange-700"
                                      : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {record.rarity}
                              </Badge>
                            </div>
                            <Badge className="bg-green-100 text-green-700">
                              <Baby className="w-3 h-3 mr-1" />
                              Success
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <h5 className="font-medium text-amber-900 mb-2">
                                Parents
                              </h5>
                              <div className="text-sm space-y-1">
                                <div className="text-pink-700">
                                  ♀ {record.mare}
                                </div>
                                <div className="text-blue-700">
                                  ♂ {record.stallion}
                                </div>
                              </div>
                            </div>

                            <div>
                              <h5 className="font-medium text-amber-900 mb-2">
                                Offspring
                              </h5>
                              <div className="text-sm space-y-1">
                                <div className="font-medium text-amber-800">
                                  {record.offspring}
                                </div>
                                <div className="text-amber-700">
                                  {record.color}
                                </div>
                              </div>
                            </div>

                            <div>
                              <h5 className="font-medium text-amber-900 mb-2">
                                Stats
                              </h5>
                              <div className="grid grid-cols-2 gap-1 text-xs">
                                <div>Speed: {record.stats.speed}</div>
                                <div>Stamina: {record.stats.stamina}</div>
                                <div>Agility: {record.stats.agility}</div>
                                <div>
                                  Intelligence: {record.stats.intelligence}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Premium Features */}
        <Card className="mt-8 bg-gradient-to-r from-purple-900/90 via-pink-900/90 to-purple-900/90 backdrop-blur-sm border-2 border-purple-600/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-100">
                    Premium Breeding Features
                  </h3>
                  <p className="text-purple-200/80">
                    Unlock advanced genetic tools and breeding capabilities
                  </p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                <h4 className="font-semibold text-purple-200 mb-2">
                  Genetic Mutation Designer
                </h4>
                <p className="text-purple-300/80 text-sm">
                  Create and register custom mutations in the Global Gene
                  Archive
                </p>
              </div>
              <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                <h4 className="font-semibold text-purple-200 mb-2">
                  Cryobank Access
                </h4>
                <p className="text-purple-300/80 text-sm">
                  Store and trade frozen semen/embryos worldwide
                </p>
              </div>
              <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                <h4 className="font-semibold text-purple-200 mb-2">
                  AI DNA Analyzer
                </h4>
                <p className="text-purple-300/80 text-sm">
                  Get expert AI analysis of your breeding program effectiveness
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
