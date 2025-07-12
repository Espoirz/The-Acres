import { Link } from "wouter";
import {
  Heart,
  Trophy,
  Users,
  Crown,
  Map,
  Zap,
  Star,
  ArrowRight,
  Play,
  ChevronRight,
  Award,
  Target,
  Palette,
  TrendingUp,
  Calendar,
  MessageCircle,
  Gem,
  BarChart3,
  Clock,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const quickStats = [
  { label: "Total Horses", value: "24", icon: Heart, color: "text-red-500" },
  {
    label: "Competitions Won",
    value: "12",
    icon: Trophy,
    color: "text-amber-500",
  },
  {
    label: "Training Sessions",
    value: "156",
    icon: Target,
    color: "text-green-500",
  },
  {
    label: "Total Value",
    value: "$45,250",
    icon: Star,
    color: "text-purple-500",
  },
];

const recentActivity = [
  {
    time: "2 hours ago",
    action: "Training completed",
    horse: "Thunder Storm",
    result: "+15 XP",
    icon: Target,
    color: "text-green-600",
  },
  {
    time: "4 hours ago",
    action: "Competition won",
    horse: "Moonlight Dancer",
    result: "1st Place",
    icon: Trophy,
    color: "text-amber-600",
  },
  {
    time: "6 hours ago",
    action: "New foal born",
    horse: "Silver Belle",
    result: "Healthy filly",
    icon: Heart,
    color: "text-pink-600",
  },
  {
    time: "1 day ago",
    action: "Horse purchased",
    horse: "Storm Runner",
    result: "$8,500",
    icon: Star,
    color: "text-blue-600",
  },
];

const upcomingEvents = [
  {
    date: "Today 3:00 PM",
    event: "Regional Dressage Championship",
    horse: "Silver Belle",
    status: "Registered",
  },
  {
    date: "Tomorrow 10:00 AM",
    event: "Endurance Training Session",
    horse: "Moonlight Dancer",
    status: "Scheduled",
  },
  {
    date: "Wed 2:00 PM",
    event: "Breeding Appointment",
    horse: "Thunder Storm",
    status: "Confirmed",
  },
];

const features = [
  {
    icon: Heart,
    title: "Realistic Genetics",
    description:
      "Experience authentic horse breeding with real genetic inheritance patterns and color variations.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: Star,
    title: "Premium Breeds",
    description:
      "Discover and breed rare heritage horses with unique characteristics and bloodlines.",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Trophy,
    title: "Competitions & Shows",
    description:
      "Compete in prestigious horse shows and earn recognition for your breeding achievements.",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    icon: Map,
    title: "Wild Capture",
    description:
      "Explore stunning landscapes to capture wild horses and discover rare breeds.",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Join a vibrant community of horse enthusiasts, share knowledge, and make friends.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "Horse Creator",
    description:
      "Design your perfect horse with detailed customization options and breeding tools.",
    gradient: "from-indigo-500 to-purple-500",
  },
];

export function Home() {
  return (
    <div
      style={{ minHeight: "100vh", background: "var(--background-primary)" }}
    >
      {/* Hero Dashboard */}
      <section
        style={{
          background:
            "linear-gradient(135deg, var(--primary-green) 0%, var(--primary-green-light) 100%)",
          color: "white",
          padding: "2rem 0",
        }}
      >
        <div className="horse-sim-container">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Badge
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                marginBottom: "1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Crown className="w-4 h-4" />
              Welcome back, Alex!
            </Badge>

            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "700",
                margin: "0 0 1rem 0",
                fontFamily: "Crimson Text, serif",
              }}
            >
              Victory Acres
            </h1>

            <p
              style={{
                fontSize: "1.25rem",
                opacity: 0.9,
                maxWidth: "600px",
                margin: "0 auto 2rem auto",
                lineHeight: 1.6,
              }}
            >
              The ultimate horse breeding simulation where authentic genetics
              meet passionate community. Build your legacy, one horse at a time.
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/animals">
                <button
                  className="horse-btn horse-btn-accent"
                  style={{
                    background: "white",
                    color: "var(--primary-green)",
                    border: "2px solid white",
                  }}
                >
                  <Heart className="w-5 h-5" />
                  <span>View My Horses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/horse-generator">
                <button
                  className="horse-btn horse-btn-secondary"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "white",
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <Palette className="w-5 h-5" />
                  <span>Create Horse</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="horse-grid horse-grid-4" style={{ gap: "1rem" }}>
            {quickStats.map((stat, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <stat.icon
                  className={`w-8 h-8 mx-auto mb-2 ${stat.color}`}
                  style={{ color: "white" }}
                />
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    marginBottom: "0.25rem",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section style={{ padding: "2rem 0" }}>
        <div className="horse-sim-container">
          <div
            className="horse-grid horse-grid-3"
            style={{ gap: "2rem", alignItems: "start" }}
          >
            {/* Recent Activity */}
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
                  Recent Activity
                </h3>
              </div>
              <div className="horse-card-content">
                <div style={{ display: "grid", gap: "1rem" }}>
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem",
                        background: "var(--background-accent)",
                        borderRadius: "8px",
                        border: "1px solid var(--card-border)",
                      }}
                    >
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: "500",
                            fontSize: "0.875rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {activity.action}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          {activity.horse} • {activity.time}
                        </div>
                      </div>
                      <Badge
                        className="horse-badge-common"
                        style={{ fontSize: "0.625rem" }}
                      >
                        {activity.result}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Link href="/animals">
                  <button
                    className="horse-btn horse-btn-secondary"
                    style={{ width: "100%", marginTop: "1rem" }}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>View All Activity</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Upcoming Events */}
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
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </h3>
              </div>
              <div className="horse-card-content">
                <div style={{ display: "grid", gap: "1rem" }}>
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "1rem",
                        background: "var(--background-accent)",
                        borderRadius: "8px",
                        border: "1px solid var(--card-border)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          {event.date}
                        </div>
                        <Badge
                          className="horse-badge-uncommon"
                          style={{ fontSize: "0.625rem" }}
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <div
                        style={{
                          fontWeight: "500",
                          fontSize: "0.875rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {event.event}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {event.horse}
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/competitions">
                  <button
                    className="horse-btn horse-btn-secondary"
                    style={{ width: "100%", marginTop: "1rem" }}
                  >
                    <Trophy className="w-4 h-4" />
                    <span>View All Events</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
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
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </h3>
              </div>
              <div className="horse-card-content">
                <div style={{ display: "grid", gap: "1rem" }}>
                  <Link href="/training">
                    <button
                      className="horse-btn horse-btn-primary"
                      style={{ width: "100%" }}
                    >
                      <Target className="w-5 h-5" />
                      <span>Train All Horses</span>
                    </button>
                  </Link>

                  <button
                    className="horse-btn horse-btn-secondary"
                    style={{ width: "100%" }}
                  >
                    <Heart className="w-5 h-5" />
                    <span>Feed & Care</span>
                  </button>

                  <Link href="/breeding">
                    <button
                      className="horse-btn horse-btn-accent"
                      style={{ width: "100%" }}
                    >
                      <Users className="w-5 h-5" />
                      <span>Breeding Center</span>
                    </button>
                  </Link>

                  <Link href="/marketplace">
                    <button
                      className="horse-btn horse-btn-secondary"
                      style={{ width: "100%" }}
                    >
                      <Star className="w-5 h-5" />
                      <span>Browse Market</span>
                    </button>
                  </Link>

                  <Link href="/wild-capture">
                    <button
                      className="horse-btn horse-btn-accent"
                      style={{ width: "100%" }}
                    >
                      <Map className="w-5 h-5" />
                      <span>Wild Capture</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          background: "var(--background-secondary)",
          padding: "3rem 0",
        }}
      >
        <div className="horse-sim-container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "1rem",
                fontFamily: "Crimson Text, serif",
                color: "var(--text-primary)",
              }}
            >
              Why Choose{" "}
              <span style={{ color: "var(--primary-green)" }}>
                Victory Acres
              </span>
              ?
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--text-secondary)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Experience the most realistic and engaging horse breeding
              simulation with authentic genetics and passionate community.
            </p>
          </div>

          <div className="horse-grid horse-grid-3" style={{ gap: "2rem" }}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="horse-card horse-shine"
                style={{ height: "fit-content" }}
              >
                <div className="horse-card-content">
                  <div
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      borderRadius: "12px",
                      background: `linear-gradient(135deg, var(--primary-green), var(--primary-green-light))`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                      color: "var(--text-primary)",
                      fontFamily: "Crimson Text, serif",
                    }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {feature.description}
                  </p>

                  <button className="horse-btn horse-btn-secondary">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section
        style={{
          background:
            "linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-copper) 100%)",
          color: "white",
          padding: "3rem 0",
        }}
      >
        <div className="horse-sim-container">
          <div style={{ textAlign: "center" }}>
            <Badge
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                marginBottom: "1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Crown className="w-4 h-4" />
              Premium Features
            </Badge>

            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "1rem",
                fontFamily: "Crimson Text, serif",
              }}
            >
              Unlock the Full Experience
            </h2>

            <p
              style={{
                fontSize: "1.125rem",
                opacity: 0.9,
                maxWidth: "600px",
                margin: "0 auto 2rem auto",
              }}
            >
              Get access to advanced breeding tools, extra stalls, automation
              features, and exclusive content for just $5/month.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {[
                "20 Extra Stalls",
                "Auto Care & Training",
                "Dog Breeding",
                "Premium Shows",
                "Advanced Genetics",
              ].map((feature) => (
                <Badge
                  key={feature}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <Star className="w-3 h-3 mr-1" />
                  {feature}
                </Badge>
              ))}
            </div>

            <Link href="/premium">
              <button
                className="horse-btn horse-btn-premium"
                style={{
                  background: "white",
                  color: "var(--accent-gold)",
                  border: "2px solid white",
                  fontSize: "1.125rem",
                  padding: "0.75rem 2rem",
                }}
              >
                <Crown className="w-5 h-5" />
                <span>Upgrade to Premium</span>
                <Gem className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
