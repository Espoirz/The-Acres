import { useState } from "react";
import {
  Briefcase,
  Users,
  Heart,
  Stethoscope,
  Map,
  ShoppingBag,
  Trophy,
  Crown,
  Star,
  Coins,
  Clock,
  CheckCircle,
  Lock,
  Zap,
  Target,
  Brain,
  TrendingUp,
  Award,
  Calendar,
  Settings,
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

// Career definitions based on the documentation
const careers = [
  {
    id: "breeder",
    name: "Breeder",
    icon: Users,
    description:
      "Master of lineages and trait planning. Unlock rare breeding tools and private stud access.",
    basePay: 3000,
    raisePercent: 7,
    keyStats: ["Genetics", "Pedigree Planning"],
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    darkBgColor: "bg-purple-900/20",
    level: 3,
    xp: 1250,
    nextLevelXp: 1500,
    skillTree: [
      {
        tier: 1,
        name: "Lineage Tracker",
        description: "Highlight recessives & mutations",
        unlocked: true,
      },
      {
        tier: 2,
        name: "Enhanced GEBVs",
        description: "+5% accuracy in trait predictions",
        unlocked: true,
      },
      {
        tier: 3,
        name: "Prestige Bloodline Tag",
        description: "Your bred animals gain prestige tags (+10% value)",
        unlocked: false,
      },
    ],
    dailyTasks: [
      { task: "Run simulated breeding plans", completed: true, xp: 50 },
      { task: "Approve/decline stud requests", completed: false, xp: 30 },
      { task: "Breed animals or manage embryos", completed: false, xp: 80 },
    ],
  },
  {
    id: "trainer",
    name: "Trainer",
    icon: Target,
    description:
      "Master training drills and discipline routines to prep animals for competition.",
    basePay: 2500,
    raisePercent: 5,
    keyStats: ["Training", "Temperament Handling"],
    color: "text-green-500",
    bgColor: "bg-green-100",
    darkBgColor: "bg-green-900/20",
    level: 5,
    xp: 2100,
    nextLevelXp: 2500,
    skillTree: [
      {
        tier: 1,
        name: "Stat Booster",
        description: "+3 XP gain per session",
        unlocked: true,
      },
      {
        tier: 2,
        name: "Cooldown Reduction",
        description: "-10% training time cooldown",
        unlocked: true,
      },
      {
        tier: 3,
        name: "Advanced Arena Use",
        description: "Unlock unique drills (agility tunnel, obstacle course)",
        unlocked: true,
      },
    ],
    dailyTasks: [
      { task: "Train animals (your own or clients)", completed: true, xp: 60 },
      { task: "Host mini training events", completed: true, xp: 40 },
      { task: "Diagnose training blockers", completed: false, xp: 50 },
    ],
  },
  {
    id: "veterinarian",
    name: "Veterinarian",
    icon: Stethoscope,
    description:
      "Diagnose, heal, and enhance animals through advanced care and genetic screening.",
    basePay: 3500,
    raisePercent: 6,
    keyStats: ["Medicine", "Anatomy"],
    color: "text-red-500",
    bgColor: "bg-red-100",
    darkBgColor: "bg-red-900/20",
    level: 2,
    xp: 680,
    nextLevelXp: 1000,
    skillTree: [
      {
        tier: 1,
        name: "Quick Heal",
        description: "+15% faster recovery for basic injuries",
        unlocked: true,
      },
      {
        tier: 2,
        name: "Genetic Insight",
        description: "Unlock advanced coat/trait reveal",
        unlocked: false,
      },
      {
        tier: 3,
        name: "Surgical Mastery",
        description: "Permanent unlock of rare procedures",
        unlocked: false,
      },
    ],
    dailyTasks: [
      { task: "Treat injured animals", completed: false, xp: 70 },
      { task: "Perform diagnostics", completed: false, xp: 45 },
      { task: "Monitor breeding health risks", completed: false, xp: 55 },
    ],
  },
  {
    id: "explorer",
    name: "Explorer",
    icon: Map,
    description:
      "Travel wild biomes, track creatures, and gather exotic materials.",
    basePay: 2000,
    raisePercent: 4,
    keyStats: ["Tracking", "Endurance"],
    color: "text-amber-500",
    bgColor: "bg-amber-100",
    darkBgColor: "bg-amber-900/20",
    level: 4,
    xp: 1850,
    nextLevelXp: 2000,
    skillTree: [
      {
        tier: 1,
        name: "Tracking Boost",
        description: "+10% encounter success chance",
        unlocked: true,
      },
      {
        tier: 2,
        name: "Shortened Taming",
        description: "-2 days taming time",
        unlocked: true,
      },
      {
        tier: 3,
        name: "Rare Lure Maker",
        description: "Craft mythic taming items",
        unlocked: false,
      },
    ],
    dailyTasks: [
      { task: "Explore and catch wilds", completed: true, xp: 80 },
      { task: "Gather resources (herbs, gems)", completed: false, xp: 35 },
      { task: "Map new biome areas", completed: false, xp: 65 },
    ],
  },
  {
    id: "merchant",
    name: "Merchant",
    icon: ShoppingBag,
    description:
      "Craft, sell, and manage player economy through workshops and trades.",
    basePay: 2800,
    raisePercent: 6,
    keyStats: ["Economy", "Crafting"],
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    darkBgColor: "bg-blue-900/20",
    level: 1,
    xp: 150,
    nextLevelXp: 500,
    skillTree: [
      {
        tier: 1,
        name: "Price Boost",
        description: "+10% markup for high-quality items",
        unlocked: false,
      },
      {
        tier: 2,
        name: "Demand Radar",
        description: "See trending items in market",
        unlocked: false,
      },
      {
        tier: 3,
        name: "Marketplace Control",
        description: "Create flash sales and auctions",
        unlocked: false,
      },
    ],
    dailyTasks: [
      { task: "Craft gear or feed", completed: false, xp: 40 },
      { task: "Price and list items", completed: false, xp: 30 },
      { task: "Trade with clubs or breeders", completed: false, xp: 50 },
    ],
  },
  {
    id: "show_champion",
    name: "Show Champion",
    icon: Trophy,
    description: "Dedicate your play to events, competition, and public fame.",
    basePay: 2200,
    raisePercent: 5,
    keyStats: ["Show Skills", "Bonding"],
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
    darkBgColor: "bg-yellow-900/20",
    level: 6,
    xp: 2890,
    nextLevelXp: 3000,
    skillTree: [
      {
        tier: 1,
        name: "Bonus Pool Access",
        description: "Join premium prize pools",
        unlocked: true,
      },
      {
        tier: 2,
        name: "Early Entry",
        description: "1 hour early registration access",
        unlocked: true,
      },
      {
        tier: 3,
        name: "Personal Arena",
        description: "Host paid public shows for prestige coins",
        unlocked: true,
      },
    ],
    dailyTasks: [
      { task: "Enter animals in shows", completed: true, xp: 75 },
      { task: "Complete trick routines", completed: true, xp: 45 },
      { task: "Earn ribbons/trophies", completed: false, xp: 90 },
    ],
  },
  {
    id: "club_manager",
    name: "Club Manager",
    icon: Crown,
    description:
      "Lead clubs, manage elections, fund projects, and moderate forums.",
    basePay: 1800,
    raisePercent: 3,
    keyStats: ["Leadership", "Governance"],
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
    darkBgColor: "bg-indigo-900/20",
    level: 0,
    xp: 0,
    nextLevelXp: 300,
    skillTree: [
      {
        tier: 1,
        name: "Member Retention",
        description: "Boost club activity bonuses",
        unlocked: false,
      },
      {
        tier: 2,
        name: "Research Tree Access",
        description: "Unlock advanced club upgrades",
        unlocked: false,
      },
      {
        tier: 3,
        name: "Election Master",
        description: "Influence voting outcomes",
        unlocked: false,
      },
    ],
    dailyTasks: [
      { task: "Assign club roles", completed: false, xp: 25 },
      { task: "Run breeding programs", completed: false, xp: 40 },
      { task: "Approve contributions", completed: false, xp: 35 },
    ],
  },
];

const SkillTreeNode = ({
  skill,
  isLocked,
}: {
  skill: any;
  isLocked: boolean;
}) => {
  return (
    <div
      className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
        skill.unlocked
          ? "bg-amber-100/80 border-amber-400 shadow-lg"
          : isLocked
            ? "bg-gray-200/50 border-gray-400"
            : "bg-amber-50/50 border-amber-300 hover:border-amber-400 cursor-pointer"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            skill.unlocked
              ? "bg-amber-500 text-white"
              : isLocked
                ? "bg-gray-400 text-gray-200"
                : "bg-amber-200 text-amber-700"
          }`}
        >
          {skill.unlocked ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Lock className="w-4 h-4" />
          )}
        </div>
        <div className="flex-1">
          <h4
            className={`font-semibold ${skill.unlocked ? "text-amber-900" : isLocked ? "text-gray-500" : "text-amber-800"}`}
          >
            {skill.name}
          </h4>
          <div className="text-xs text-amber-600/80">Tier {skill.tier}</div>
        </div>
      </div>
      <p
        className={`text-sm ${skill.unlocked ? "text-amber-800" : isLocked ? "text-gray-500" : "text-amber-700"}`}
      >
        {skill.description}
      </p>

      {!skill.unlocked && !isLocked && (
        <Button
          size="sm"
          className="mt-3 w-full bg-amber-600 hover:bg-amber-700 text-white"
        >
          Unlock for 100 XP
        </Button>
      )}
    </div>
  );
};

export function Careers() {
  const [selectedCareer, setSelectedCareer] = useState(careers[1]); // Default to Trainer (level 5)
  const [activeTab, setActiveTab] = useState("overview");

  const currentCareer = selectedCareer;
  const nextMonthlyPay = Math.floor(
    currentCareer.basePay *
      (1 + (currentCareer.raisePercent / 100) * currentCareer.level),
  );
  const completedTasks = currentCareer.dailyTasks.filter(
    (task) => task.completed,
  ).length;
  const totalTasks = currentCareer.dailyTasks.length;

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
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-amber-100">
                  Career Center
                </h1>
                <p className="text-amber-200/80">
                  Forge your legacy beyond the ranch—shape the world through
                  expertise
                </p>
              </div>
            </div>

            {/* Player Level & Unlock Status */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-200 font-medium">
                    Player Level
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">
                  Level 12
                </div>
                <div className="text-sm text-amber-300/70">
                  Careers unlocked at Level 6
                </div>
              </div>

              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-200 font-medium">
                    Monthly Earnings
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">
                  {nextMonthlyPay.toLocaleString()}
                </div>
                <div className="text-sm text-amber-300/70">coins/month</div>
              </div>

              <div className="bg-amber-800/50 rounded-lg p-4 border border-amber-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-200 font-medium">
                    Active Careers
                  </span>
                </div>
                <div className="text-2xl font-bold text-amber-100">1</div>
                <div className="text-sm text-amber-300/70">
                  Premium: Dual-class at Lv20
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Panel - Career Selection */}
          <div className="lg:col-span-1">
            <Card className="bg-amber-900/90 backdrop-blur-sm border-2 border-amber-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-amber-100 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Choose Career
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {careers.map((career) => (
                  <div
                    key={career.id}
                    onClick={() => setSelectedCareer(career)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedCareer.id === career.id
                        ? "border-amber-400 bg-amber-800/70 shadow-lg"
                        : "border-amber-600/30 bg-amber-800/30 hover:bg-amber-800/50 hover:border-amber-500/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-8 h-8 rounded-lg ${career.darkBgColor} flex items-center justify-center`}
                      >
                        <career.icon className={`w-4 h-4 ${career.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-amber-100 truncate">
                          {career.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-amber-300">
                            Lv {career.level}
                          </span>
                          <span className="text-amber-400">
                            • {career.basePay} coins
                          </span>
                        </div>
                      </div>
                    </div>

                    {career.level > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-amber-200/80">
                          <span>Progress</span>
                          <span>
                            {career.xp}/{career.nextLevelXp} XP
                          </span>
                        </div>
                        <Progress
                          value={(career.xp / career.nextLevelXp) * 100}
                          className="h-1 bg-amber-700"
                        />
                      </div>
                    )}

                    {career.level === 0 && (
                      <Badge
                        variant="outline"
                        className="border-amber-600/50 text-amber-300 text-xs"
                      >
                        Not Started
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Career Details */}
          <div className="lg:col-span-3">
            <Card className="bg-amber-900/90 backdrop-blur-sm border-2 border-amber-700/50 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${currentCareer.darkBgColor} flex items-center justify-center`}
                    >
                      <currentCareer.icon
                        className={`w-6 h-6 ${currentCareer.color}`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-amber-100 flex items-center gap-2">
                        {currentCareer.name}
                        {currentCareer.level > 0 && (
                          <Badge className="bg-amber-600 text-white">
                            Level {currentCareer.level}
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-amber-200/80 text-sm">
                        {currentCareer.description}
                      </p>
                    </div>
                  </div>

                  {currentCareer.level === 0 ? (
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <Zap className="w-4 h-4 mr-2" />
                      Start Career
                    </Button>
                  ) : (
                    <div className="text-right">
                      <div className="text-lg font-bold text-amber-100">
                        {nextMonthlyPay.toLocaleString()}
                      </div>
                      <div className="text-xs text-amber-300/70">
                        coins/month
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4 bg-amber-800/50">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-amber-600"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="skills"
                      className="data-[state=active]:bg-amber-600"
                    >
                      Skill Tree
                    </TabsTrigger>
                    <TabsTrigger
                      value="tasks"
                      className="data-[state=active]:bg-amber-600"
                    >
                      Daily Tasks
                    </TabsTrigger>
                    <TabsTrigger
                      value="progression"
                      className="data-[state=active]:bg-amber-600"
                    >
                      Progression
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-amber-800/30 rounded-lg p-4 border border-amber-600/30">
                          <h3 className="font-semibold text-amber-200 mb-3">
                            Career Statistics
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-amber-300/80">
                                Base Pay:
                              </span>
                              <span className="text-amber-100 font-medium">
                                {currentCareer.basePay.toLocaleString()} coins
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-amber-300/80">
                                Raise per Level:
                              </span>
                              <span className="text-amber-100 font-medium">
                                +{currentCareer.raisePercent}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-amber-300/80">
                                Current Level:
                              </span>
                              <span className="text-amber-100 font-medium">
                                {currentCareer.level}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-amber-300/80">
                                Total XP:
                              </span>
                              <span className="text-amber-100 font-medium">
                                {currentCareer.xp.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-amber-800/30 rounded-lg p-4 border border-amber-600/30">
                          <h3 className="font-semibold text-amber-200 mb-3">
                            Key Skills
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {currentCareer.keyStats.map((stat, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="border-amber-500/50 text-amber-200"
                              >
                                {stat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-amber-800/30 rounded-lg p-4 border border-amber-600/30">
                          <h3 className="font-semibold text-amber-200 mb-3">
                            Today's Progress
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-amber-300/80">
                                Tasks Completed:
                              </span>
                              <span className="text-amber-100 font-medium">
                                {completedTasks}/{totalTasks}
                              </span>
                            </div>
                            <Progress
                              value={(completedTasks / totalTasks) * 100}
                              className="h-2 bg-amber-700"
                            />

                            <div className="flex items-center justify-between">
                              <span className="text-amber-300/80">
                                XP Earned Today:
                              </span>
                              <span className="text-amber-100 font-medium">
                                {currentCareer.dailyTasks
                                  .filter((t) => t.completed)
                                  .reduce((sum, t) => sum + t.xp, 0)}{" "}
                                XP
                              </span>
                            </div>
                          </div>
                        </div>

                        {currentCareer.level > 0 && (
                          <div className="bg-amber-800/30 rounded-lg p-4 border border-amber-600/30">
                            <h3 className="font-semibold text-amber-200 mb-3">
                              Next Level
                            </h3>
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-amber-300/80">
                                  Progress:
                                </span>
                                <span className="text-amber-200">
                                  {currentCareer.xp}/{currentCareer.nextLevelXp}{" "}
                                  XP
                                </span>
                              </div>
                              <Progress
                                value={
                                  (currentCareer.xp /
                                    currentCareer.nextLevelXp) *
                                  100
                                }
                                className="h-2 bg-amber-700"
                              />
                              <div className="text-xs text-amber-300/70">
                                {currentCareer.nextLevelXp - currentCareer.xp}{" "}
                                XP to level {currentCareer.level + 1}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="mt-6">
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-amber-200 mb-2">
                          Skill Tree
                        </h3>
                        <p className="text-amber-300/70">
                          Unlock powerful abilities as you progress in your
                          career
                        </p>
                      </div>

                      <div className="grid gap-4">
                        {currentCareer.skillTree.map((skill, index) => (
                          <SkillTreeNode
                            key={index}
                            skill={skill}
                            isLocked={skill.tier > currentCareer.level}
                          />
                        ))}
                      </div>

                      {currentCareer.level === 0 && (
                        <div className="text-center p-8 bg-amber-800/20 rounded-lg border border-amber-600/30">
                          <Lock className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-amber-200 mb-2">
                            Career Not Started
                          </h3>
                          <p className="text-amber-300/70 mb-4">
                            Start this career to begin unlocking skills
                          </p>
                          <Button className="bg-amber-600 hover:bg-amber-700">
                            <Zap className="w-4 h-4 mr-2" />
                            Begin {currentCareer.name} Career
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="tasks" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-amber-200">
                          Daily Tasks
                        </h3>
                        <div className="text-sm text-amber-300/70">
                          Resets in: 14h 32m
                        </div>
                      </div>

                      <div className="space-y-3">
                        {currentCareer.dailyTasks.map((task, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                              task.completed
                                ? "bg-green-900/20 border-green-600/50"
                                : "bg-amber-800/30 border-amber-600/30 hover:border-amber-500/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    task.completed
                                      ? "bg-green-600 text-white"
                                      : "bg-amber-600/50 border-2 border-amber-400"
                                  }`}
                                >
                                  {task.completed && (
                                    <CheckCircle className="w-4 h-4" />
                                  )}
                                </div>
                                <div>
                                  <h4
                                    className={`font-medium ${task.completed ? "text-green-200 line-through" : "text-amber-200"}`}
                                  >
                                    {task.task}
                                  </h4>
                                  <div className="text-sm text-amber-300/70">
                                    +{task.xp} XP
                                  </div>
                                </div>
                              </div>

                              {!task.completed && currentCareer.level > 0 && (
                                <Button
                                  size="sm"
                                  className="bg-amber-600 hover:bg-amber-700"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Complete
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {currentCareer.level === 0 && (
                        <div className="text-center p-6 bg-amber-800/20 rounded-lg border border-amber-600/30">
                          <Calendar className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                          <h3 className="font-semibold text-amber-200 mb-2">
                            No Tasks Available
                          </h3>
                          <p className="text-amber-300/70">
                            Start this career to unlock daily tasks
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="progression" className="mt-6">
                    <div className="space-y-6">
                      <div className="bg-amber-800/30 rounded-lg p-6 border border-amber-600/30">
                        <h3 className="text-xl font-semibold text-amber-200 mb-4">
                          Training Path
                        </h3>
                        <div className="space-y-4">
                          {currentCareer.id === "trainer" && (
                            <>
                              <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-amber-200">
                                  Train 3 animals → Unlock "Speed Boost Drill"
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-amber-200">
                                  Win 2 shows → Unlock "Stamina Regimen"
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-amber-400" />
                                <span className="text-amber-300/80">
                                  Host a training clinic → Unlock "Behavioral
                                  Tracker"
                                </span>
                              </div>
                            </>
                          )}
                          {currentCareer.id === "breeder" && (
                            <>
                              <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-amber-200">
                                  Breed 5 animals → Unlock "Pedigree Review"
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-amber-400" />
                                <span className="text-amber-300/80">
                                  Use breeding planner 3 times → Unlock "Carrier
                                  Detection"
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-400">
                                  Use embryo transfer → Unlock "Surrogate
                                  Manager"
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="bg-amber-800/30 rounded-lg p-6 border border-amber-600/30">
                        <h3 className="text-xl font-semibold text-amber-200 mb-4">
                          Level Benefits
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[...Array(10)].map((_, level) => (
                            <div
                              key={level}
                              className={`p-3 rounded border ${
                                level < currentCareer.level
                                  ? "bg-green-900/20 border-green-600/50 text-green-200"
                                  : level === currentCareer.level
                                    ? "bg-amber-900/30 border-amber-500 text-amber-200"
                                    : "bg-gray-900/20 border-gray-600/50 text-gray-400"
                              }`}
                            >
                              <div className="font-medium">
                                Level {level + 1}
                              </div>
                              <div className="text-sm">
                                {level < currentCareer.level
                                  ? "Unlocked"
                                  : level === currentCareer.level
                                    ? "Current"
                                    : "Locked"}
                                • Pay:{" "}
                                {Math.floor(
                                  currentCareer.basePay *
                                    (1 +
                                      (currentCareer.raisePercent / 100) *
                                        level),
                                ).toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Premium Features */}
        <Card className="mt-8 bg-gradient-to-r from-amber-900/90 via-orange-900/90 to-amber-900/90 backdrop-blur-sm border-2 border-amber-600/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-100">
                    Premium Career Features
                  </h3>
                  <p className="text-amber-200/80">
                    Unlock dual careers, faster progression, and exclusive
                    bonuses
                  </p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
