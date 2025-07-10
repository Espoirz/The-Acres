import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Rabbit, Coins, Star, User, Home, PawPrint, Heart, ShoppingCart, Wrench, Trophy } from "lucide-react";

export function Navigation() {
  const { user } = useAuth();
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/animals", label: "Animals", icon: PawPrint },
    { path: "/breeding", label: "Breeding", icon: Heart },
    { path: "/training", label: "Training", icon: Trophy },
    { path: "/marketplace", label: "Marketplace", icon: ShoppingCart },
    { path: "/facilities", label: "Facilities", icon: Wrench },
  ];

  return (
    <nav className="bg-gradient-to-r from-[hsl(25,60%,20%)] to-[hsl(25,50%,30%)] text-[hsl(45,50%,96%)] shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Top bar with branding and user info */}
        <div className="flex items-center justify-between p-4 border-b border-[hsl(25,40%,40%)]">
          <div className="flex items-center space-x-4">
            <Rabbit className="w-8 h-8 text-[hsl(40,80%,50%)]" />
            <h1 className="text-2xl font-bold">Victory Acres</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-[hsl(25,40%,40%)] px-3 py-1 rounded-full">
                <Coins className="w-4 h-4 text-[hsl(40,80%,50%)]" />
                <span className="font-semibold">${user?.currency?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center space-x-2 bg-[hsl(25,40%,40%)] px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-[hsl(40,80%,50%)]" />
                <span className="font-semibold">Level {user?.prestige || 1}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {user?.profileImageUrl ? (
                <img 
                  src={user.profileImageUrl} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover border-2 border-[hsl(40,80%,50%)]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[hsl(40,80%,50%)] flex items-center justify-center">
                  <User className="w-4 h-4 text-[hsl(25,60%,20%)]" />
                </div>
              )}
              <span className="font-medium">
                {user?.firstName || 'Player'}
              </span>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={() => window.location.href = '/api/logout'}
              className="text-[hsl(45,50%,96%)] hover:bg-[hsl(25,50%,40%)]"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation menu */}
        <div className="flex space-x-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-[hsl(40,80%,50%)] text-[hsl(25,60%,20%)] font-semibold' 
                      : 'text-[hsl(45,50%,96%)] hover:bg-[hsl(25,50%,40%)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
