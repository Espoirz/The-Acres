import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(25,50%,20%)] via-[hsl(25,40%,30%)] to-[hsl(25,30%,25%)] opacity-90"></div>
      
      <Card className="relative z-10 max-w-md w-full mx-4 bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,45%,55%)] shadow-2xl backdrop-blur-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[hsl(25,60%,20%)] mb-2">
              Everlasting Victory Acres
            </h1>
            <p className="text-[hsl(25,45%,35%)]">
              Premier Horse & Dog Breeding Experience
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-sm text-[hsl(25,45%,35%)]">
                Build your dream ranch, breed champion animals, and compete in prestigious shows.
              </p>
              
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="w-full bg-gradient-to-r from-[hsl(25,60%,35%)] to-[hsl(25,50%,40%)] text-[hsl(45,50%,96%)] py-3 font-semibold hover:from-[hsl(25,50%,40%)] hover:to-[hsl(25,60%,35%)] transition-all duration-300 shadow-lg"
              >
                Enter the Stables
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-[hsl(25,45%,35%)]">
                Join thousands of breeders building their legacy
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
