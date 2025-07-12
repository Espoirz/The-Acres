import { useState } from "react";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Eye, EyeOff, Heart, Sparkles, Crown } from "lucide-react";

export default function Landing() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - redirect to game
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Barn Interior Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F587d1a381dc140a2b97537bd0994633f%2Fcb1338710a254c3db11369b05d3070f5?format=webp&width=800')`,
        }}
      >
        {/* Warm overlay to enhance readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-transparent to-amber-900/40" />
      </div>

      {/* Floating barn elements for ambiance */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-amber-200/10 rounded-full blur-xl animate-float" />
      <div
        className="absolute top-40 right-32 w-20 h-20 bg-orange-200/10 rounded-full blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-32 left-1/4 w-24 h-24 bg-yellow-200/10 rounded-full blur-xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Login Card with Barn Wood Styling */}
          <div className="bg-gradient-to-br from-amber-900/90 via-orange-900/85 to-amber-800/90 backdrop-blur-sm rounded-2xl border-2 border-amber-700/50 shadow-2xl shadow-black/50 p-8 relative overflow-hidden">
            {/* Wood grain texture overlay */}
            <div
              className="absolute inset-0 opacity-20 bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700"
              style={{
                backgroundImage: `repeating-linear-gradient(
                     90deg,
                     transparent,
                     transparent 2px,
                     rgba(139, 69, 19, 0.1) 2px,
                     rgba(139, 69, 19, 0.1) 4px
                   )`,
              }}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="font-display text-3xl font-bold text-amber-100">
                      Victory Acres
                    </h1>
                    <div className="flex items-center gap-1 text-amber-200/80 text-sm">
                      <Sparkles className="w-3 h-3" />
                      <span>Breed • Train • Compete</span>
                      <Sparkles className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                <p className="text-amber-200/70 text-sm leading-relaxed">
                  Welcome to the most immersive horse & dog breeding simulation
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  {/* Username Field */}
                  <div>
                    <label className="block text-sm font-medium text-amber-200 mb-2">
                      Username
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      value={loginData.username}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      className="w-full bg-amber-50/90 border-2 border-amber-700/50 rounded-lg px-4 py-3 text-amber-900 placeholder-amber-600/60 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-amber-200 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        className="w-full bg-amber-50/90 border-2 border-amber-700/50 rounded-lg px-4 py-3 pr-12 text-amber-900 placeholder-amber-600/60 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200 backdrop-blur-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:via-orange-700 hover:to-amber-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border border-amber-500/50"
                >
                  Enter the Ranch
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-amber-700/30" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-gradient-to-r from-transparent via-amber-900/90 to-transparent text-amber-200/60">
                      New to Victory Acres?
                    </span>
                  </div>
                </div>

                {/* Register Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-2 border-amber-600/50 text-amber-200 hover:bg-amber-800/30 hover:border-amber-500 font-medium py-3 rounded-lg transition-all duration-200 backdrop-blur-sm"
                >
                  Create New Account
                </Button>
              </form>

              {/* Footer Links */}
              <div className="mt-8 pt-6 border-t border-amber-700/30">
                <div className="flex justify-center gap-6 text-xs text-amber-200/60">
                  <button className="hover:text-amber-200 transition-colors">
                    Forgot Password?
                  </button>
                  <span>•</span>
                  <button className="hover:text-amber-200 transition-colors">
                    Need Help?
                  </button>
                </div>

                {/* Premium Badge */}
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-full text-xs text-amber-200 backdrop-blur-sm">
                    <Crown className="w-3 h-3" />
                    <span>Premium features available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            {[
              { label: "Active Ranchers", value: "12K+" },
              { label: "Animals Bred", value: "500K+" },
              { label: "Shows Won", value: "25K+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-amber-900/40 backdrop-blur-sm rounded-lg p-3 border border-amber-700/30"
              >
                <div className="text-lg font-bold text-amber-100">
                  {stat.value}
                </div>
                <div className="text-xs text-amber-200/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle hay particle effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-300/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
