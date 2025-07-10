import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-900 via-orange-800 to-red-900">
      {/* Wooden Panel Background */}
      <div className="absolute inset-0">
        {/* Vertical wooden slats */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 bg-gradient-to-b from-amber-800/60 via-amber-700/40 to-amber-900/60 border-r border-amber-600/30"
              style={{
                left: `${i * 8.33}%`,
                width: '6%',
              }}
            />
          ))}
        </div>
        
        {/* Horizontal wooden beams */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-0 right-0 h-4 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800"></div>
          <div className="absolute bottom-20 left-0 right-0 h-6 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900"></div>
        </div>
        
        {/* Metallic accents inspired by elevator buttons/trim */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-16 left-8 w-1 h-32 bg-gradient-to-b from-zinc-400 to-zinc-600 rounded-full"></div>
          <div className="absolute top-16 right-8 w-1 h-32 bg-gradient-to-b from-zinc-400 to-zinc-600 rounded-full"></div>
          <div className="absolute bottom-16 left-8 w-1 h-32 bg-gradient-to-b from-zinc-400 to-zinc-600 rounded-full"></div>
          <div className="absolute bottom-16 right-8 w-1 h-32 bg-gradient-to-b from-zinc-400 to-zinc-600 rounded-full"></div>
        </div>
      </div>
      
      {/* Sophisticated lighting effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full bg-gradient-to-br from-amber-50/95 via-orange-50/90 to-amber-100/95 backdrop-blur-xl border-2 border-orange-200/50 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              {/* Logo with metallic accent */}
              <div className="mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-600 via-amber-700 to-orange-800 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden">
                  {/* Metallic ring accent */}
                  <div className="absolute inset-2 border-2 border-zinc-300/60 rounded-full"></div>
                  <span className="text-3xl relative z-10">🐴</span>
                </div>
                {/* Subtle metallic base */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-zinc-400 via-zinc-300 to-zinc-400 rounded-full opacity-40"></div>
              </div>
              
              <h1 className="text-4xl font-bold text-orange-900 mb-3 font-serif tracking-tight">
                Everlasting Victory Acres
              </h1>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mb-3"></div>
              <p className="text-orange-800 text-lg font-medium">
                Realistic Breeds Edition
              </p>
              <p className="text-orange-700 text-sm mt-2 opacity-80">
                Premier Horse & Dog Breeding Simulation
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Feature highlight with wooden panel styling */}
              <div className="relative bg-gradient-to-r from-amber-100/80 to-orange-100/60 rounded-lg p-5 border border-orange-200/60 overflow-hidden">
                {/* Subtle wooden texture */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-800/20 via-transparent to-amber-800/20"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-amber-600/30"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-600/30"></div>
                </div>
                <p className="text-sm text-orange-900 text-center leading-relaxed relative z-10 font-medium">
                  Step into the most advanced breeding simulation ever created. Master real genetics, build your legacy, and compete with champions.
                </p>
              </div>
              
              {/* Sophisticated entry button */}
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="w-full bg-gradient-to-r from-orange-700 via-orange-800 to-red-800 text-orange-50 py-5 text-lg font-bold hover:from-orange-600 hover:via-orange-700 hover:to-red-700 transition-all duration-300 shadow-xl border border-orange-600/50 hover:border-orange-500 transform hover:scale-[1.02] relative overflow-hidden group"
              >
                {/* Metallic shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-xl">🚪</span>
                  Enter the Stables
                </span>
              </Button>
              
              {/* Stats grid with wooden panel aesthetic */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                {[
                  { value: "15+", label: "Genetic Loci" },
                  { value: "Real", label: "DNA Testing" },
                  { value: "Advanced", label: "Breeding" }
                ].map((stat, i) => (
                  <div key={i} className="relative bg-gradient-to-b from-amber-200/70 to-orange-200/50 p-3 rounded border border-orange-300/50 overflow-hidden">
                    {/* Wooden panel lines */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-0 left-0 right-0 h-px bg-amber-600/40"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-600/40"></div>
                      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-amber-600/20"></div>
                    </div>
                    <div className="relative z-10">
                      <div className="font-bold text-orange-900">{stat.value}</div>
                      <div className="text-orange-800 leading-tight">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer with metallic accent line */}
            <div className="text-center mt-8 pt-6 border-t border-gradient-to-r from-transparent via-orange-300/50 to-transparent relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-zinc-400 to-zinc-500"></div>
              <p className="text-sm text-orange-800 mb-2 font-medium">
                🏆 Join Elite Breeders Worldwide
              </p>
              <p className="text-xs text-orange-700 opacity-80">
                Experience genetics like never before
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sophisticated ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-300/30 rounded-full animate-pulse"
            style={{
              left: `${15 + i * 10}%`,
              top: `${25 + (i % 4) * 15}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
