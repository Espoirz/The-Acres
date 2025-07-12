import { useState } from "react";
import {
  Heart,
  Shield,
  Clock,
  Coins,
  Star,
  Award,
  Trophy,
  Stethoscope,
  Bandage,
  Activity,
  AlertTriangle,
  Users,
  Calendar,
  TrendingUp,
  Gift,
  ShoppingCart,
  Eye,
  Lock,
  Unlock,
  Home,
  Droplets,
  Zap,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

// Mock rescue animals data
const rescueAnimals = [
  {
    id: 1,
    name: "Luna",
    type: "Horse",
    breed: "Arabian Mix",
    age: "4 years",
    gender: "Mare",
    rescueType: "Abandoned",
    condition: "Mildly Injured",
    health: 65,
    trust: 25,
    mood: 40,
    cost: 2800,
    daysInShelter: 12,
    lockDays: 5,
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=300&h=200&fit=crop",
    issues: ["Minor wound on leg", "Underweight", "Nervous temperament"],
    story:
      "Found wandering alone near the forest edge. Shows signs of neglect but has a gentle spirit.",
    traits: ["Gentle", "Nervous", "Intelligent"],
    genetics: "Ee/Aa/nCr",
    estimatedRecovery: 14,
  },
  {
    id: 2,
    name: "Max",
    type: "Dog",
    breed: "Border Collie",
    age: "2 years",
    gender: "Male",
    rescueType: "Wild Injured",
    condition: "Critically Sick",
    health: 25,
    trust: 15,
    mood: 30,
    cost: 800,
    daysInShelter: 3,
    lockDays: 7,
    image:
      "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=300&h=200&fit=crop",
    issues: ["Severe infection", "Malnourished", "Fear trauma"],
    story:
      "Rescued from a failed wild capture attempt. Requires immediate medical attention.",
    traits: ["Intelligent", "Fearful", "Loyal"],
    genetics: "bb/DD/Ee",
    estimatedRecovery: 21,
  },
  {
    id: 3,
    name: "Storm",
    type: "Horse",
    breed: "Mustang",
    age: "6 years",
    gender: "Stallion",
    rescueType: "Event Disaster",
    condition: "Healthy",
    health: 90,
    trust: 80,
    mood: 85,
    cost: 6500,
    daysInShelter: 8,
    lockDays: 0,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
    issues: ["None - ready for adoption"],
    story:
      "Evacuated from recent wildfire. Well-trained and looking for a new home.",
    traits: ["Strong", "Independent", "Brave"],
    genetics: "EE/AA/nG",
    estimatedRecovery: 0,
  },
  {
    id: 4,
    name: "Bella",
    type: "Dog",
    breed: "Golden Retriever",
    age: "5 years",
    gender: "Female",
    rescueType: "Neglected",
    condition: "Mildly Injured",
    health: 55,
    trust: 35,
    mood: 50,
    cost: 3200,
    daysInShelter: 18,
    lockDays: 2,
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop",
    issues: ["Hip dysplasia", "Anxiety", "Trust issues"],
    story:
      "Seized from neglectful owner. Sweet nature but needs patient rehabilitation.",
    traits: ["Sweet", "Anxious", "Loving"],
    genetics: "ee/Bb/DD",
    estimatedRecovery: 28,
  },
  {
    id: 5,
    name: "Mystery Foal",
    type: "Horse",
    breed: "Unknown",
    age: "6 months",
    gender: "Filly",
    rescueType: "Abandoned",
    condition: "Mystery Case",
    health: 70,
    trust: 60,
    mood: 75,
    cost: 1500,
    daysInShelter: 5,
    lockDays: 7,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    issues: ["Unknown lineage", "Possible rare genetics"],
    story:
      "Found alone with unusual coat markings. Genetics and lineage to be revealed after healing.",
    traits: ["Curious", "Playful", "???"],
    genetics: "???/???/???",
    estimatedRecovery: 7,
  },
];

const shelterItems = [
  {
    name: "Bandages (x5)",
    cost: 150,
    description: "Heals minor injuries; 50% recovery speed boost",
    icon: Bandage,
  },
  {
    name: "Rescue Feed Bundle",
    cost: 80,
    description: "Cheap feed; boosts health but lowers mood slightly",
    icon: Activity,
  },
  {
    name: "Calming Herb Pack",
    cost: 200,
    description: "+15 trust points; helps trauma healing",
    icon: Heart,
  },
  {
    name: "Shelter Vet Pass",
    cost: 300,
    description: "Allows 1 free advanced vet visit per day",
    icon: Stethoscope,
  },
  {
    name: "Comfort Toys (Dog)",
    cost: 120,
    description: "Improves mood and reduces separation anxiety",
    icon: Gift,
  },
];

const achievements = [
  {
    name: "First Healer",
    description: "Fully recover your first rescue",
    icon: Heart,
    unlocked: true,
  },
  {
    name: "Compassionate Keeper",
    description: "Care for 10 sick/injured rescues",
    icon: Shield,
    unlocked: false,
    progress: 3,
  },
  {
    name: "No Coin Left Behind",
    description: "Adopt a critically ill rescue for free",
    icon: Coins,
    unlocked: false,
  },
  {
    name: "From Stable to Stage",
    description: "Win a show with a fully recovered rescue",
    icon: Trophy,
    unlocked: false,
  },
  {
    name: "Hearts & Hooves",
    description: "Bond a rescue to 100% trust",
    icon: Users,
    unlocked: true,
  },
];

function HealthStatusIcon({ condition }: { condition: string }) {
  switch (condition) {
    case "Healthy":
      return <Heart className="w-4 h-4 text-green-500" />;
    case "Mildly Injured":
      return <Bandage className="w-4 h-4 text-yellow-500" />;
    case "Critically Sick":
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case "Mystery Case":
      return <Eye className="w-4 h-4 text-purple-500" />;
    default:
      return <Activity className="w-4 h-4 text-gray-500" />;
  }
}

function getConditionColor(condition: string) {
  switch (condition) {
    case "Healthy":
      return "bg-green-100 text-green-700 border-green-300";
    case "Mildly Injured":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "Critically Sick":
      return "bg-red-100 text-red-700 border-red-300";
    case "Mystery Case":
      return "bg-purple-100 text-purple-700 border-purple-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
}

function AnimalDetailDialog({
  animal,
  onAdopt,
}: {
  animal: any;
  onAdopt: (animal: any) => void;
}) {
  const [selectedCare, setSelectedCare] = useState<string | null>(null);

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-amber-50">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3">
          <Heart className="w-6 h-6 text-red-500" />
          {animal.name} - Rescue Profile
        </DialogTitle>
      </DialogHeader>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Image and Basic Info */}
        <div className="space-y-4">
          <img
            src={animal.image}
            alt={animal.name}
            className="w-full h-64 object-cover rounded-lg border-2 border-amber-200"
          />

          <div className="bg-amber-100 rounded-lg p-4 border border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-3">
              Basic Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-amber-700">Type:</span>
                <span className="text-amber-900 font-medium">
                  {animal.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Breed:</span>
                <span className="text-amber-900 font-medium">
                  {animal.breed}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Age:</span>
                <span className="text-amber-900 font-medium">{animal.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Gender:</span>
                <span className="text-amber-900 font-medium">
                  {animal.gender}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Genetics:</span>
                <span className="text-amber-900 font-mono text-xs">
                  {animal.genetics}
                </span>
              </div>
            </div>
          </div>

          {/* Adoption Cost */}
          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-green-800">
                Adoption Cost
              </span>
              <div className="text-2xl font-bold text-green-900">
                {animal.cost === 0
                  ? "FREE"
                  : `${animal.cost.toLocaleString()} coins`}
              </div>
            </div>
            <p className="text-sm text-green-700">
              {animal.condition === "Critically Sick" &&
                "Reduced cost due to medical needs"}
              {animal.condition === "Mildly Injured" &&
                "Discounted for rehabilitation care"}
              {animal.condition === "Healthy" && "Standard adoption fee"}
              {animal.condition === "Mystery Case" &&
                "Special pricing for unknown genetics"}
            </p>
          </div>
        </div>

        {/* Right Column - Details and Care */}
        <div className="space-y-4">
          {/* Health Stats */}
          <div className="bg-amber-100 rounded-lg p-4 border border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-3">Health Status</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-amber-700">Health</span>
                  <span className="text-amber-900">{animal.health}/100</span>
                </div>
                <Progress value={animal.health} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-amber-700">Trust</span>
                  <span className="text-amber-900">{animal.trust}/100</span>
                </div>
                <Progress value={animal.trust} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-amber-700">Mood</span>
                  <span className="text-amber-900">{animal.mood}/100</span>
                </div>
                <Progress value={animal.mood} className="h-2" />
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="bg-amber-100 rounded-lg p-4 border border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-2">Rescue Story</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              {animal.story}
            </p>
          </div>

          {/* Medical Issues */}
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-semibold text-red-800 mb-2">Medical Issues</h3>
            <ul className="space-y-1">
              {animal.issues.map((issue: string, index: number) => (
                <li
                  key={index}
                  className="text-sm text-red-700 flex items-center gap-2"
                >
                  <div className="w-1 h-1 bg-red-500 rounded-full" />
                  {issue}
                </li>
              ))}
            </ul>
            {animal.estimatedRecovery > 0 && (
              <div className="mt-3 text-sm text-red-600">
                <Clock className="w-4 h-4 inline mr-1" />
                Estimated recovery: {animal.estimatedRecovery} days
              </div>
            )}
          </div>

          {/* Traits */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">
              Personality Traits
            </h3>
            <div className="flex flex-wrap gap-2">
              {animal.traits.map((trait: string, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-blue-300 text-blue-700"
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>

          {/* 7-Day Lock Notice */}
          {animal.lockDays > 0 && (
            <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-orange-600" />
                <span className="font-semibold text-orange-800">
                  7-Day Protection Period
                </span>
              </div>
              <p className="text-sm text-orange-700">
                This animal will be locked for {animal.lockDays} more days after
                adoption. Cannot be sold, released, or euthanized during this
                period.
              </p>
            </div>
          )}

          {/* Adoption Button */}
          <div className="pt-4">
            <Button
              onClick={() => onAdopt(animal)}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
              disabled={animal.lockDays === 0}
            >
              <Heart className="w-5 h-5 mr-2" />
              {animal.lockDays === 0
                ? "Available for Adoption"
                : `Available in ${animal.lockDays} days`}
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export function Shelter() {
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [shelterRep, setShelterRep] = useState(85);
  const [activeTab, setActiveTab] = useState("animals");

  const handleAdopt = (animal: any) => {
    alert(
      `Thank you for adopting ${animal.name}! Remember to provide daily care during the 7-day protection period.`,
    );
    setSelectedAnimal(null);
  };

  const criticalAnimals = rescueAnimals.filter(
    (a) => a.condition === "Critically Sick",
  ).length;
  const availableNow = rescueAnimals.filter((a) => a.lockDays === 0).length;

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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold text-amber-100">
                    Shelter & Rescue Center
                  </h1>
                  <p className="text-amber-200/80">
                    Healing hooves and second chances
                  </p>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <Gift className="w-4 h-4 mr-2" />
                Make Donation
              </Button>
            </div>

            {/* Shelter Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-amber-200 font-medium">
                    Animals in Care
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">
                  {rescueAnimals.length}
                </div>
                <div className="text-sm text-amber-300/70">
                  {criticalAnimals} critical
                </div>
              </div>

              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-amber-200 font-medium">
                    Available Now
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">
                  {availableNow}
                </div>
                <div className="text-sm text-amber-300/70">
                  ready for adoption
                </div>
              </div>

              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-amber-200 font-medium">
                    Shelter Rep
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">
                  {shelterRep}/100
                </div>
                <div className="text-sm text-amber-300/70">
                  excellent standing
                </div>
              </div>

              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-200 font-medium">
                    Rescue Fund
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">24,500</div>
                <div className="text-sm text-amber-300/70">emergency fund</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-amber-900/90 backdrop-blur-sm border-2 border-amber-700/50 shadow-xl">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-amber-800/50">
                <TabsTrigger
                  value="animals"
                  className="data-[state=active]:bg-amber-600"
                >
                  Rescue Animals
                </TabsTrigger>
                <TabsTrigger
                  value="shop"
                  className="data-[state=active]:bg-amber-600"
                >
                  Shelter Shop
                </TabsTrigger>
                <TabsTrigger
                  value="achievements"
                  className="data-[state=active]:bg-amber-600"
                >
                  Achievements
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="data-[state=active]:bg-amber-600"
                >
                  Events
                </TabsTrigger>
              </TabsList>

              <TabsContent value="animals" className="mt-6">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {rescueAnimals.map((animal) => (
                    <Card
                      key={animal.id}
                      className="bg-amber-100/80 border-2 border-amber-200 hover:border-amber-300 transition-all duration-200 hover:shadow-lg"
                    >
                      <CardContent className="p-4">
                        {/* Image */}
                        <div className="relative mb-4">
                          <img
                            src={animal.image}
                            alt={animal.name}
                            className="w-full h-40 object-cover rounded-lg"
                          />

                          {/* Status badges */}
                          <div className="absolute top-2 left-2 flex gap-2">
                            <Badge
                              className={`${getConditionColor(animal.condition)} text-xs`}
                            >
                              <HealthStatusIcon condition={animal.condition} />
                              <span className="ml-1">{animal.condition}</span>
                            </Badge>
                          </div>

                          {/* Lock status */}
                          <div className="absolute top-2 right-2">
                            {animal.lockDays > 0 ? (
                              <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                                <Lock className="w-3 h-3 mr-1" />
                                {animal.lockDays}d
                              </Badge>
                            ) : (
                              <Badge className="bg-green-100 text-green-700 border-green-300">
                                <Unlock className="w-3 h-3 mr-1" />
                                Available
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Animal Info */}
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-amber-900 text-lg">
                              {animal.name}
                            </h3>
                            <p className="text-amber-700 text-sm">
                              {animal.breed} • {animal.age} • {animal.gender}
                            </p>
                          </div>

                          {/* Health bars */}
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-amber-700">Health</span>
                                <span className="text-amber-800">
                                  {animal.health}%
                                </span>
                              </div>
                              <Progress
                                value={animal.health}
                                className="h-1.5"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-amber-700">Trust</span>
                                <span className="text-amber-800">
                                  {animal.trust}%
                                </span>
                              </div>
                              <Progress
                                value={animal.trust}
                                className="h-1.5"
                              />
                            </div>
                          </div>

                          {/* Rescue info */}
                          <div className="bg-amber-50 rounded p-3 border border-amber-200">
                            <div className="text-xs text-amber-600 mb-1">
                              Rescue Type: {animal.rescueType}
                            </div>
                            <div className="text-xs text-amber-800">
                              In shelter: {animal.daysInShelter} days
                            </div>
                          </div>

                          {/* Cost and action */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-700">
                                {animal.cost === 0
                                  ? "FREE"
                                  : `${animal.cost.toLocaleString()}`}
                              </div>
                              {animal.cost > 0 && (
                                <div className="text-xs text-amber-600">
                                  coins
                                </div>
                              )}
                            </div>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="bg-amber-600 hover:bg-amber-700"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <AnimalDetailDialog
                                animal={animal}
                                onAdopt={handleAdopt}
                              />
                            </Dialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shop" className="mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shelterItems.map((item, index) => (
                    <Card
                      key={index}
                      className="bg-amber-100/80 border-2 border-amber-200"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-amber-700" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-amber-900">
                              {item.name}
                            </h3>
                            <div className="text-amber-700 font-medium">
                              {item.cost} coins
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-amber-800 mb-4">
                          {item.description}
                        </p>
                        <Button
                          size="sm"
                          className="w-full bg-amber-600 hover:bg-amber-700"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Purchase
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <Card
                      key={index}
                      className={`border-2 ${
                        achievement.unlocked
                          ? "bg-green-50 border-green-200"
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
                            <achievement.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3
                              className={`font-semibold ${
                                achievement.unlocked
                                  ? "text-green-800"
                                  : "text-amber-900"
                              }`}
                            >
                              {achievement.name}
                            </h3>
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

                        {!achievement.unlocked &&
                          achievement.progress !== undefined && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-amber-600">
                                <span>Progress</span>
                                <span>{achievement.progress}/10</span>
                              </div>
                              <Progress
                                value={(achievement.progress / 10) * 100}
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
              </TabsContent>

              <TabsContent value="events" className="mt-6">
                <div className="space-y-6">
                  {/* Current Event */}
                  <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                          <Droplets className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-blue-900">
                            Winter Freeze Emergency
                          </h3>
                          <p className="text-blue-700">
                            Special rescue event - ends in 2 days
                          </p>
                        </div>
                      </div>
                      <p className="text-blue-800 mb-4">
                        Cold weather has left many animals in need. Adoption
                        fees reduced by 50% for all animals. Special winter care
                        items available in the shelter shop.
                      </p>
                      <div className="flex gap-3">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Heart className="w-4 h-4 mr-2" />
                          View Emergency Rescues
                        </Button>
                        <Button
                          variant="outline"
                          className="border-blue-300 text-blue-700"
                        >
                          <Gift className="w-4 h-4 mr-2" />
                          Winter Care Kit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming Events */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-amber-100/80 border-2 border-amber-200">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-amber-900 mb-2">
                          Shelter Auction Day
                        </h3>
                        <p className="text-amber-700 text-sm mb-3">
                          Rare wild-bloodline rescues appear with hidden stats
                          unlocked after care.
                        </p>
                        <div className="text-xs text-amber-600">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Starts in 5 days
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-amber-100/80 border-2 border-amber-200">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-amber-900 mb-2">
                          Spring Adoption Fair
                        </h3>
                        <p className="text-amber-700 text-sm mb-3">
                          Community event with reduced costs and adoption
                          bonuses for all animals.
                        </p>
                        <div className="text-xs text-amber-600">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Starts in 12 days
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
