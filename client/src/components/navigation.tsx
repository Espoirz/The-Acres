import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Rabbit, Coins, Star, User } from "lucide-react";

export function Navigation() {
  const { user } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-[hsl(25,60%,20%)] to-[hsl(25,50%,30%)] text-[hsl(45,50%,96%)] p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Rabbit className="w-8 h-8 text-[hsl(40,80%,50%)]" />
          <h1 className="text-2xl font-bold">Victory Acres</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Coins className="w-5 h-5 text-[hsl(40,80%,50%)]" />
              <span className="font-semibold">${user?.currency?.toLocaleString() || 0}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-[hsl(40,80%,50%)]" />
              <span className="font-semibold">Level {user?.prestige || 1}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {user?.profileImageUrl ? (
              <img 
                src={user.profileImageUrl} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-[hsl(40,80%,50%)]" />
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
    </nav>
  );
}
