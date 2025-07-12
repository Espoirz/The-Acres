import { Link } from "wouter";
import {
  Heart,
  Trophy,
  Users,
  Sparkles,
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
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const features = [
  {
    icon: Heart,
    title: "Realistic Genetics",
    description:
      "Breed horses and dogs with authentic color genetics including Ee Aa CrCr and LP/n patterns.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Mythical Breeds",
    description:
      "Discover and breed rare unicorns, pegasi, and other mystical creatures with unique abilities.",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: Trophy,
    title: "Competitions & Shows",
    description:
      "Compete in skill-based mini-games and prestigious shows to earn rewards and recognition.",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    icon: Map,
    title: "Explore Biomes",
    description:
      "Journey through diverse landscapes to capture wild animals and discover hidden treasures.",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Users,
    title: "Social Gameplay",
    description:
      "Join clubs, participate in elections, and engage with a vibrant community of breeders.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "AI-Powered",
    description:
      "Experience dynamic storytelling with AI-written NPCs and generated animal portraits.",
    gradient: "from-indigo-500 to-purple-500",
  },
];

const careers = [
  {
    name: "Trainer",
    description:
      "Master the art of animal training and unlock advanced coaching techniques.",
    icon: Target,
    color: "text-emerald-600",
  },
  {
    name: "Veterinarian",
    description:
      "Heal and care for animals while researching genetic improvements.",
    icon: Heart,
    color: "text-red-600",
  },
  {
    name: "Explorer",
    description:
      "Venture into wild biomes to discover rare breeds and hidden secrets.",
    icon: Map,
    color: "text-blue-600",
  },
];

const stats = [
  { label: "Active Players", value: "12,000+" },
  { label: "Animals Bred", value: "500K+" },
  { label: "Competitions Held", value: "2,500+" },
  { label: "Mythical Breeds", value: "50+" },
];

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 hero-gradient opacity-10" />

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-violet/20 rounded-full blur-xl animate-float" />
        <div
          className="absolute top-40 right-32 w-16 h-16 bg-amber/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-24 h-24 bg-emerald/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <Badge className="premium-badge mb-6">
              <Crown className="w-3 h-3 mr-1" />
              Now in Open Beta
            </Badge>

            {/* Main headline */}
            <h1 className="font-display text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">Everlasting</span>
              <br />
              <span className="text-foreground">Victory Acres</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
              The ultimate breeding simulation where{" "}
              <strong>real genetics</strong> meet
              <strong className="text-violet"> mythical creatures</strong>.
              Breed, train, and compete with horses and dogs in an immersive
              world of endless possibilities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="btn-primary group text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Watch Trailer
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              A World of{" "}
              <span className="text-gradient">Endless Discovery</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the most advanced breeding simulation ever created,
              where every decision shapes your legacy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-emerald/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              Choose Your <span className="text-gradient">Career Path</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Shape your destiny with specialized skill trees and unique
              gameplay experiences.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {careers.map((career, index) => (
              <div
                key={index}
                className="relative group bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden"
              >
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-6 ${career.color}`}
                  >
                    <career.icon className="w-8 h-8" />
                  </div>

                  <h3 className="font-display text-2xl font-semibold mb-4 text-foreground">
                    {career.name}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {career.description}
                  </p>

                  <Button variant="outline" className="group">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Teaser */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-amber/10 via-yellow/10 to-amber/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <Badge className="premium-badge mb-6 text-lg px-4 py-2">
              <Crown className="w-4 h-4 mr-2" />
              Premium Features
            </Badge>

            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
              Unlock the <span className="text-gradient">Full Experience</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Access advanced breeding tools, AI portrait generators, exclusive
              events, and much more.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                "Gene Viewer",
                "Embryo Transfer",
                "AI Portraits",
                "Custom Barns",
                "Exclusive Events",
              ].map((feature) => (
                <Badge
                  key={feature}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                >
                  <Star className="w-3 h-3 mr-1 text-amber" />
                  {feature}
                </Badge>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-amber to-yellow-500 hover:from-amber/90 hover:to-yellow-500/90 text-white shadow-lg shadow-amber/20"
            >
              <Crown className="w-5 h-5 mr-2" />
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your <span className="text-gradient">Legacy</span>?
          </h2>

          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of players already building their dream stables in
            Everlasting Victory Acres.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/animals">
              <Button size="lg" className="btn-primary text-lg px-8 py-4">
                <Heart className="w-5 h-5 mr-2" />
                View My Animals
              </Button>
            </Link>

            <Link href="/breeding">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Users className="w-5 h-5 mr-2" />
                Start Breeding
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
