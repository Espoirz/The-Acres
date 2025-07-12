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
  Target,
  Briefcase,
  Shield,
  Dna,
  Gamepad2,
  Palette,
  Bell,
  Gem,
  User,
  BarChart3,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

const navigationItems = [
  {
    name: "Stable Overview",
    href: "/",
    icon: Home,
    description: "Your stable dashboard",
  },
  {
    name: "My Horses",
    href: "/animals",
    icon: Heart,
    description: "Manage your horses",
  },
  {
    name: "Horse Generator",
    href: "/horse-generator",
    icon: Palette,
    description: "Create new horses",
  },
  {
    name: "Training Center",
    href: "/training",
    icon: Target,
    description: "Train and develop skills",
  },
  {
    name: "Breeding Lab",
    href: "/breeding",
    icon: Dna,
    description: "Genetics and breeding",
  },
  {
    name: "Career Center",
    href: "/careers",
    icon: Briefcase,
    description: "Professional development",
  },
  {
    name: "Rescue & Adoption",
    href: "/shelter",
    icon: Shield,
    description: "Help horses in need",
  },
  {
    name: "Wild Capture",
    href: "/wild-capture",
    icon: Map,
    description: "Explore and capture",
  },
  {
    name: "Competitions",
    href: "/competitions",
    icon: Trophy,
    description: "Shows and contests",
  },
  {
    name: "Marketplace",
    href: "/marketplace",
    icon: ShoppingBag,
    description: "Buy and sell horses",
  },
  {
    name: "Games & Activities",
    href: "/minigames",
    icon: Gamepad2,
    description: "Mini-games and fun",
  },
];

const premiumItems = [
  {
    name: "Premium Features",
    href: "/premium",
    icon: Crown,
    description: "Unlock advanced tools",
  },
];

const userStats = {
  name: "Alex Trainer",
  level: 15,
  experience: 2450,
  nextLevel: 2500,
  gems: 47,
  credits: 1250,
  notifications: 3,
};

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const NavLink = ({
    href,
    icon: Icon,
    children,
    description,
    isPremium = false,
  }: {
    href: string;
    icon: any;
    children: React.ReactNode;
    description: string;
    isPremium?: boolean;
  }) => {
    const isActive = location === href;

    return (
      <Link href={href}>
        <div
          className={cn(
            "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer",
            isActive
              ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
              : "text-gray-700 hover:bg-green-50 hover:text-green-700",
            isPremium &&
              "text-amber-600 hover:text-amber-700 hover:bg-amber-50",
          )}
          onClick={() => setMobileMenuOpen(false)}
          title={description}
        >
          <Icon
            className={cn("w-5 h-5 flex-shrink-0", isActive && "text-white")}
          />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <span className="font-medium text-sm block truncate">
                {children}
              </span>
              {!isActive && (
                <span className="text-xs opacity-60 block truncate">
                  {description}
                </span>
              )}
            </div>
          )}
          {isPremium && !collapsed && (
            <Crown className="w-3 h-3 text-amber-500 flex-shrink-0" />
          )}
        </div>
      </Link>
    );
  };

  const experiencePercentage =
    (userStats.experience / userStats.nextLevel) * 100;

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white/90 backdrop-blur-sm border-green-200 text-green-700"
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
          "fixed left-0 top-0 h-full bg-white border-r-2 border-green-100 z-40 transition-all duration-300 ease-in-out shadow-lg",
          "lg:transform-none",
          collapsed ? "w-16" : "w-72",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={cn(
              "p-4 border-b-2 border-green-100",
              collapsed && "px-2",
            )}
          >
            <Link href="/">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                {!collapsed && (
                  <div>
                    <h1 className="font-bold text-lg text-green-800 group-hover:text-green-600 transition-colors font-serif">
                      Victory Acres
                    </h1>
                    <p className="text-xs text-green-600 font-medium">
                      Horse & Dog Breeding
                    </p>
                  </div>
                )}
              </div>
            </Link>

            {/* Collapse Toggle - Desktop Only */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:block absolute top-4 right-2 p-1 text-green-600 hover:text-green-800 transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* User Profile */}
          {!collapsed && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-green-800 truncate">
                    {userStats.name}
                  </p>
                  <p className="text-xs text-green-600">
                    Level {userStats.level} • {userStats.experience}/
                    {userStats.nextLevel} XP
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Bell className="w-4 h-4 text-green-600" />
                  {userStats.notifications > 0 && (
                    <Badge className="bg-red-500 text-white text-xs px-1 min-w-[1rem] h-4">
                      {userStats.notifications}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Experience bar */}
              <div className="mb-3">
                <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${experiencePercentage}%` }}
                  />
                </div>
              </div>

              {/* Currency */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-green-700">
                  <Gem className="w-3 h-3 text-purple-500" />
                  <span className="font-medium">{userStats.gems}</span>
                </div>
                <div className="flex items-center gap-1 text-green-700">
                  <span className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0"></span>
                  <span className="font-medium">
                    {userStats.credits.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Main navigation */}
          <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {/* Quick Actions */}
            {!collapsed && (
              <div className="mb-6">
                <h3 className="px-3 mb-2 text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex flex-col items-center justify-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
                    <BarChart3 className="w-5 h-5 text-green-600 mb-1" />
                    <span className="text-xs font-medium text-green-700">
                      Train All
                    </span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
                    <Heart className="w-5 h-5 text-blue-600 mb-1" />
                    <span className="text-xs font-medium text-blue-700">
                      Feed All
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Main Navigation */}
            <div className="space-y-1">
              {!collapsed && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Main Menu
                </h3>
              )}
              {navigationItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  description={item.description}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Premium section */}
            <div className="pt-4 border-t border-green-100">
              {!collapsed && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  Premium
                </h3>
              )}
              <div className="space-y-1">
                {premiumItems.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    description={item.description}
                    isPremium
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t-2 border-green-100 bg-green-50">
            {!collapsed ? (
              <div className="space-y-2">
                <Link href="/profile">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-green-700 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors text-sm">
                    <Settings className="w-4 h-4" />
                    <span>Settings & Profile</span>
                  </button>
                </Link>

                <div className="text-xs text-green-600 text-center">
                  Victory Acres v2.1.0
                </div>
              </div>
            ) : (
              <Link href="/profile">
                <button className="w-full flex items-center justify-center p-2 text-green-700 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main content spacer for desktop */}
      <div
        className={cn(
          "hidden lg:block flex-shrink-0 transition-all duration-300",
          collapsed ? "w-16" : "w-72",
        )}
      />
    </>
  );
}
