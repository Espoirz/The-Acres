import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Home,
  Heart,
  Users,
  Trophy,
  ShoppingBag,
  Map,
  Settings,
  Crown,
  Menu,
  X,
  Sparkles,
  Target,
  Briefcase,
  Shield,
  Dna,
  Gamepad2,
  Stethoscope,
  Palette,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "My Animals", href: "/animals", icon: Heart },
  { name: "Horse Generator", href: "/horse-generator", icon: Palette },
  { name: "Training Center", href: "/training", icon: Target },
  { name: "Breeding Lab", href: "/breeding", icon: Dna },
  { name: "Career Center", href: "/careers", icon: Briefcase },
  { name: "Shelter & Rescue", href: "/shelter", icon: Shield },
  { name: "Wild Capture", href: "/wild-capture", icon: Map },
  { name: "Mini-Games", href: "/minigames", icon: Gamepad2 },
  { name: "Competitions", href: "/competitions", icon: Trophy },
  { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
];

const premiumItems = [
  { name: "Premium Tools", href: "/premium", icon: Crown },
  { name: "Gene Viewer", href: "/genetics", icon: Sparkles },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLink = ({
    href,
    icon: Icon,
    children,
    isPremium = false,
  }: {
    href: string;
    icon: any;
    children: React.ReactNode;
    isPremium?: boolean;
  }) => {
    const isActive = location === href;

    return (
      <Link href={href}>
        <span
          className={cn(
            "nav-link group relative",
            isActive && "active",
            isPremium && "text-amber hover:text-amber-foreground",
          )}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Icon className="w-5 h-5" />
          <span className="font-medium">{children}</span>
          {isPremium && <Crown className="w-3 h-3 text-amber ml-1" />}
          {isActive && (
            <span className="absolute inset-0 rounded-lg bg-primary/10 -z-10" />
          )}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {mobileMenuOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Navigation sidebar */}
      <nav
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-40",
          "transform transition-transform duration-300 ease-in-out",
          "lg:transform-none",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border">
            <Link href="/">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 bg-hero-gradient rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-lg text-sidebar-foreground group-hover:text-gradient transition-colors">
                    Victory Acres
                  </h1>
                  <p className="text-xs text-sidebar-foreground/60">
                    Breed • Train • Compete
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Main navigation */}
          <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <NavLink key={item.href} href={item.href} icon={item.icon}>
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Premium section */}
            <div className="pt-6">
              <h3 className="px-3 mb-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                Premium Features
              </h3>
              <div className="space-y-1">
                {premiumItems.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    isPremium
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">
                  A
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Alex Trainer
                </p>
                <p className="text-xs text-sidebar-foreground/60">
                  Level 15 • 2,450 XP
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <NavLink href="/profile" icon={Settings}>
                Settings
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content spacer for desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  );
}
