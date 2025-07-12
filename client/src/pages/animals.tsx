import { useState } from "react";
import {
  Heart,
  Droplets,
  Sparkles,
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
  Search,
  Plus,
  BarChart3,
  Calendar,
  Settings,
  Crown,
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
      "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop",
    stats: {
      health: 95,
      energy: 82,
      mood: 88,
      cleanliness: 76,
      training: 65,
      level: 15,
    },
    capacity: 4,
    isPregnant: false,
    lastFed: "2 hours ago",
    location: "Pasture A",
    genetics: "ee/Aa/CrCr/LP/n",
    build: "refined",
    owner: "You",
    value: 2500,
    specialty: "Endurance",
    achievements: ["First Place - Desert Cup", "Champion Bloodlines"],
    nextActivity: "Training in 2h",
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
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    stats: {
      health: 100,
      energy: 95,
      mood: 92,
      cleanliness: 85,
      training: 88,
      level: 22,
    },
    capacity: 5,
    isPregnant: false,
    lastFed: "1 hour ago",
    location: "Training Arena",
    genetics: "Ee/AA/nn/lp/lp",
    build: "athletic",
    owner: "You",
    value: 8750,
    specialty: "Racing",
    achievements: ["Triple Crown Winner", "Speed Record Holder"],
    nextActivity: "Race in 4h",
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
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    stats: {
      health: 92,
      energy: 78,
      mood: 85,
      cleanliness: 68,
      training: 25,
      level: 3,
    },
    capacity: 2,
    isPregnant: false,
    lastFed: "3 hours ago",
    location: "Foal Paddock",
    genetics: "ee/Aa/nn/TO/n",
    build: "foal",
    owner: "You",
    value: 1200,
    specialty: "Learning",
    achievements: ["Healthy Foal", "Good Bloodlines"],
    nextActivity: "Play time in 1h",
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
      "https://images.unsplash.com/photo-1553284965-d1c0a5eed0ca?w=400&h=300&fit=crop",
    stats: {
      health: 88,
      energy: 65,
      mood: 90,
      cleanliness: 94,
      training: 92,
      level: 28,
    },
    capacity: 5,
    isPregnant: true,
    lastFed: "30 minutes ago",
    location: "Maternity Stall",
    genetics: "Ee/aa/nn/nn",
    build: "heavy",
    owner: "You",
    value: 12500,
    specialty: "Dressage",
    achievements: ["Grand Prix Champion", "Breeding Excellence"],
    nextActivity: "Vet check in 6h",
  },
];

// Daily log activities
const dailyLog = [
  {
    time: "14:45",
    action: "Training completed",
    horse: "Thunder Storm",
    user: "You",
    icon: Trophy,
    color: "text-green-600",
    points: "+15 XP",
  },
  {
    time: "14:30",
    action: "Fed and groomed",
    horse: "Moonlight Dancer",
    user: "Stable Hand",
    icon: Heart,
    color: "text-red-500",
    points: "+5 Care",
  },
  {
    time: "14:15",
    action: "Visited by player",
    horse: "Silver Belle",
    user: "Luna550",
    icon: MessageCircle,
    color: "text-blue-500",
    points: "+2 Social",
  },
  {
    time: "13:50",
    action: "Moved to pasture",
    horse: "Whisper Wind",
    user: "You",
    icon: MapPin,
    color: "text-green-700",
    points: "+3 Mood",
  },
  {
    time: "13:30",
    action: "Vet checkup",
    horse: "All Horses",
    user: "Dr. Martinez",
    icon: Heart,
    color: "text-purple-600",
    points: "+10 Health",
  },
  {
    time: "13:00",
    action: "Competition entry",
    horse: "Thunder Storm",
    user: "You",
    icon: Trophy,
    color: "text-amber-600",
    points: "Registered",
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
  const getStatLevel = (value: number) => {
    if (value >= 80) return "high";
    if (value >= 60) return "medium";
    return "low";
  };

  return (
    <div className="stat-container">
      <div
        className="stat-label"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="stat-name">{label}</span>
        </div>
        <span className="stat-value">{value}%</span>
      </div>
      <div className="stat-bar">
        <div
          className={`stat-fill ${getStatLevel(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

const HorseCard = ({ horse }: { horse: (typeof horses)[0] }) => {
  const getAgeCategory = (age: string) => {
    if (age.includes("months")) return "foal";
    const years = parseInt(age);
    if (years < 4) return "young";
    if (years > 15) return "senior";
    return "adult";
  };

  const ageCategory = getAgeCategory(horse.age);

  return (
    <div className="horse-card horse-shine">
      {/* Horse Image Header */}
      <div
        style={{
          position: "relative",
          height: "180px",
          background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${horse.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "12px 12px 0 0",
        }}
      >
        {/* Overlay Info */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            right: "1rem",
            color: "white",
          }}
        >
          <h3
            className="horse-card-title"
            style={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              fontSize: "1.125rem",
              marginBottom: "0.25rem",
            }}
          >
            {horse.name}
          </h3>
          <div
            style={{
              fontSize: "0.875rem",
              textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            }}
          >
            {horse.age} • {horse.gender} • {horse.breed}
          </div>
        </div>

        {/* Status Badges */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Badge
            className={`horse-badge ${ageCategory === "foal" ? "horse-badge-uncommon" : "horse-badge-common"}`}
          >
            Level {horse.stats.level}
          </Badge>
          {horse.isPregnant && (
            <Badge className="horse-badge-rare">
              <Heart className="w-3 h-3 mr-1" />
              Pregnant
            </Badge>
          )}
          <Badge className="horse-badge-legendary">
            ${horse.value.toLocaleString()}
          </Badge>
        </div>

        {/* Location */}
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(255,255,255,0.9)",
            padding: "0.25rem 0.75rem",
            borderRadius: "12px",
            fontSize: "0.75rem",
          }}
        >
          <MapPin className="w-3 h-3 text-green-600" />
          <span>{horse.location}</span>
        </div>
      </div>

      {/* Horse Details */}
      <div className="horse-card-content">
        {/* Color and Markings */}
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              marginBottom: "0.25rem",
            }}
          >
            <strong>{horse.color}</strong> • {horse.height}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            {horse.markings}
          </div>
        </div>

        {/* Stats */}
        <div style={{ marginBottom: "1rem" }}>
          <div className="horse-grid-2" style={{ gap: "0.75rem" }}>
            <StatBar
              label="Health"
              value={horse.stats.health}
              color="text-red-500"
              icon={Heart}
            />
            <StatBar
              label="Energy"
              value={horse.stats.energy}
              color="text-blue-500"
              icon={Zap}
            />
            <StatBar
              label="Mood"
              value={horse.stats.mood}
              color="text-green-500"
              icon={Sparkles}
            />
            <StatBar
              label="Clean"
              value={horse.stats.cleanliness}
              color="text-cyan-500"
              icon={Droplets}
            />
          </div>
        </div>

        {/* Specialty and Achievements */}
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <Star className="w-4 h-4 text-amber-500" />
            <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
              {horse.specialty}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.25rem",
            }}
          >
            {horse.achievements.slice(0, 2).map((achievement, index) => (
              <Badge
                key={index}
                className="horse-badge-common"
                style={{ fontSize: "0.625rem" }}
              >
                {achievement}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="horse-grid-2"
          style={{ gap: "0.5rem", marginBottom: "1rem" }}
        >
          <button className="horse-btn horse-btn-primary">
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          <button className="horse-btn horse-btn-secondary">
            <Play className="w-4 h-4" />
            <span>Activity</span>
          </button>
          <button className="horse-btn horse-btn-secondary">
            <Brush className="w-4 h-4" />
            <span>Groom</span>
          </button>
          <button className="horse-btn horse-btn-accent">
            <BarChart3 className="w-4 h-4" />
            <span>Train</span>
          </button>
        </div>

        {/* Next Activity */}
        <div
          style={{
            padding: "0.75rem",
            background: "var(--background-accent)",
            borderRadius: "6px",
            border: "1px solid var(--card-border)",
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Clock className="w-3 h-3" />
            <span>Next: {horse.nextActivity}</span>
          </div>
          <div style={{ marginTop: "0.25rem" }}>Last fed: {horse.lastFed}</div>
        </div>
      </div>
    </div>
  );
};

export function Animals() {
  const [sortBy, setSortBy] = useState("name");
  const [filterBreed, setFilterBreed] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const sortedHorses = [...horses].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "age":
        return parseInt(a.age) - parseInt(b.age);
      case "level":
        return b.stats.level - a.stats.level;
      case "value":
        return b.value - a.value;
      default:
        return 0;
    }
  });

  const filteredHorses = sortedHorses.filter((horse) => {
    const matchesSearch =
      horse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      horse.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBreed = filterBreed === "all" || horse.breed === filterBreed;
    return matchesSearch && matchesBreed;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background-primary)",
      }}
    >
      {/* Header */}
      <div className="horse-sim-header">
        <div className="horse-sim-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  margin: "0 0 0.5rem 0",
                  fontFamily: "Crimson Text, serif",
                }}
              >
                My Stable
              </h1>
              <p
                style={{
                  margin: 0,
                  opacity: 0.9,
                  fontSize: "1rem",
                }}
              >
                You currently have <strong>{horses.length} horses</strong> of{" "}
                <strong>
                  {new Set(horses.map((h) => h.breed)).size} different breeds
                </strong>
              </p>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button className="horse-btn horse-btn-premium">
                <Crown className="w-4 h-4" />
                <span>Upgrade Stable</span>
              </button>
              <button className="horse-btn horse-btn-accent">
                <Plus className="w-4 h-4" />
                <span>Add Horse</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="horse-sim-nav">
        <div className="horse-sim-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "2rem" }}>
              <a href="#" className="active">
                All Horses
              </a>
              <a href="#">Mares</a>
              <a href="#">Stallions</a>
              <a href="#">Foals</a>
              <a href="#">In Training</a>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <Search
                  className="w-4 h-4"
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search horses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="horse-input"
                  style={{
                    paddingLeft: "2.5rem",
                    width: "200px",
                  }}
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger
                  className="horse-input horse-select"
                  style={{ width: "140px" }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="age">Age</SelectItem>
                  <SelectItem value="level">Level</SelectItem>
                  <SelectItem value="value">Value</SelectItem>
                </SelectContent>
              </Select>

              <button className="horse-btn horse-btn-secondary">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="horse-sim-container"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div className="horse-layout">
          {/* Main horses section */}
          <div style={{ gridColumn: "1 / -1" }}>
            <div className="horse-grid horse-grid-3" style={{ gap: "1.5rem" }}>
              {filteredHorses.map((horse) => (
                <HorseCard key={horse.id} horse={horse} />
              ))}
            </div>
          </div>

          {/* Daily log sidebar - positioned absolute for demo */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
              width: "300px",
              zIndex: 1000,
            }}
          >
            <div className="horse-card">
              <div className="horse-card-header">
                <h3
                  className="horse-card-title"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Clock className="w-5 h-5" />
                  Daily Activity Log
                </h3>
              </div>
              <div className="horse-card-content">
                <div
                  style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    marginBottom: "1rem",
                  }}
                >
                  {dailyLog.map((entry, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: "0.75rem",
                        padding: "0.75rem",
                        marginBottom: "0.5rem",
                        background: "var(--background-accent)",
                        borderRadius: "6px",
                        border: "1px solid var(--card-border)",
                      }}
                    >
                      <entry.icon className={`w-4 h-4 mt-0.5 ${entry.color}`} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {entry.time}
                        </div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          <strong>{entry.action}</strong>
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {entry.horse} • {entry.user}
                        </div>
                        {entry.points && (
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--success-green)",
                              fontWeight: "500",
                              marginTop: "0.25rem",
                            }}
                          >
                            {entry.points}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick stats */}
                <div
                  style={{
                    padding: "1rem",
                    background: "var(--background-secondary)",
                    borderRadius: "6px",
                    border: "1px solid var(--card-border)",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      marginBottom: "0.75rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    Quick Stats
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gap: "0.5rem",
                      fontSize: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "var(--text-secondary)" }}>
                        Total Horses:
                      </span>
                      <span
                        style={{
                          fontWeight: "600",
                          color: "var(--text-primary)",
                        }}
                      >
                        {horses.length}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "var(--text-secondary)" }}>
                        Pregnant:
                      </span>
                      <span
                        style={{
                          fontWeight: "600",
                          color: "var(--text-primary)",
                        }}
                      >
                        {horses.filter((h) => h.isPregnant).length}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "var(--text-secondary)" }}>
                        Avg Level:
                      </span>
                      <span
                        style={{
                          fontWeight: "600",
                          color: "var(--text-primary)",
                        }}
                      >
                        {Math.round(
                          horses.reduce((sum, h) => sum + h.stats.level, 0) /
                            horses.length,
                        )}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "var(--text-secondary)" }}>
                        Total Value:
                      </span>
                      <span
                        style={{
                          fontWeight: "600",
                          color: "var(--success-green)",
                        }}
                      >
                        $
                        {horses
                          .reduce((sum, h) => sum + h.value, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
