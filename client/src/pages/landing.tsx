import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Stable Interior Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-amber-800/60 to-amber-900/80"></div>
      
      {/* Wooden Beam Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-amber-800/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-amber-900/90 to-transparent"></div>
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-amber-800/60 to-transparent"></div>
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-amber-800/60 to-transparent"></div>
      </div>
      
      {/* Stable Door Frame Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-amber-700/30 rounded-lg"></div>
      </div>
      
      <Card className="relative z-10 max-w-lg w-full mx-4 bg-gradient-to-br from-amber-50/95 via-amber-100/90 to-amber-50/95 border-4 border-amber-700/80 shadow-2xl backdrop-blur-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🐴</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-amber-900 mb-3 font-serif">
              Everlasting Victory Acres
            </h1>
            <p className="text-amber-700 text-lg font-medium">
              Realistic Breeds Edition
            </p>
            <p className="text-amber-600 text-sm mt-2">
              Premier Horse & Dog Breeding Simulation
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-amber-100/50 rounded-lg p-4 border border-amber-300">
              <p className="text-sm text-amber-800 text-center leading-relaxed">
                Step into the most advanced breeding simulation ever created. Master real genetics, build your legacy, and compete with champions.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="w-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-700 text-amber-50 py-4 text-lg font-bold hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 transition-all duration-300 shadow-xl border-2 border-amber-600 hover:border-amber-500 transform hover:scale-105"
              >
                🚪 Enter the Stables
              </Button>
              
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-amber-700">
                <div className="bg-amber-200/50 p-2 rounded border border-amber-300">
                  <div className="font-bold">15+</div>
                  <div>Genetic Loci</div>
                </div>
                <div className="bg-amber-200/50 p-2 rounded border border-amber-300">
                  <div className="font-bold">Real</div>
                  <div>DNA Testing</div>
                </div>
                <div className="bg-amber-200/50 p-2 rounded border border-amber-300">
                  <div className="font-bold">Advanced</div>
                  <div>Breeding</div>
                </div>
              </div>
            </div>
            
            <div className="text-center border-t border-amber-300 pt-4">
              <p className="text-sm text-amber-700 mb-2 font-medium">
                🏆 Join Elite Breeders Worldwide
              </p>
              <p className="text-xs text-amber-600">
                Experience genetics like never before
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/20 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
