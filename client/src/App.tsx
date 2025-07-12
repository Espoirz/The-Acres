import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { useAuth } from "./hooks/useAuth";
import { Navigation } from "./components/navigation";

// Import all pages
import { Home } from "./pages/home";
import { Animals } from "./pages/animals";
import { Training } from "./pages/training";
import { Careers } from "./pages/careers";
import { Shelter } from "./pages/shelter";
import { Breeding } from "./pages/breeding";
import { Minigames } from "./pages/minigames";
import { WildCapture } from "./pages/wild-capture";
import { HorseGeneratorPage } from "./pages/horse-generator";
import Landing from "./pages/landing";
import LoginPreview from "./pages/login-preview";
import NotFound from "./pages/not-found";

// Placeholder components for routes not yet implemented
function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: `linear-gradient(rgba(139, 69, 19, 0.1), rgba(160, 82, 45, 0.1)), url('https://cdn.builder.io/api/v1/image/assets%2F587d1a381dc140a2b97537bd0994633f%2Fb964361c6e914269bf8363694e1fe4ca?format=webp&width=800')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="bg-amber-900/90 backdrop-blur-sm rounded-2xl border-2 border-amber-700/50 p-8 shadow-2xl">
          <h1 className="font-display text-4xl font-bold mb-4 text-gradient">
            {title}
          </h1>
          <p className="text-xl text-amber-200/80 mb-8">{description}</p>
          <div className="text-sm text-amber-300/70">
            This feature is coming soon! Use the navigation to explore other
            areas of Victory Acres.
          </div>
        </div>
      </div>
    </div>
  );
}

const Competitions = () => (
  <PlaceholderPage
    title="Competitions Arena"
    description="Compete in shows, races, and skill-based challenges to earn rewards and prestige."
  />
);

const Marketplace = () => (
  <PlaceholderPage
    title="Marketplace"
    description="Buy, sell, and trade animals with other players in the global marketplace."
  />
);

const Explore = () => (
  <PlaceholderPage
    title="Explore Biomes"
    description="Venture into diverse landscapes to discover wild animals and hidden treasures."
  />
);

import { Premium } from "./pages/premium";

const Genetics = () => (
  <PlaceholderPage
    title="Gene Viewer"
    description="Advanced genetic analysis tools for understanding inheritance patterns and traits."
  />
);

const Profile = () => (
  <PlaceholderPage
    title="Profile & Settings"
    description="Manage your account, preferences, and game settings."
  />
);

function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1">{children}</main>
    </div>
  );
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 69, 19, 0.1), rgba(160, 82, 45, 0.1)), url('https://cdn.builder.io/api/v1/image/assets%2F587d1a381dc140a2b97537bd0994633f%2Fcb1338710a254c3db11369b05d3070f5?format=webp&width=800')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center bg-amber-900/90 backdrop-blur-sm rounded-2xl border-2 border-amber-700/50 p-8 shadow-2xl">
          <div className="w-16 h-16 bg-hero-gradient rounded-full animate-bounce mx-auto mb-4" />
          <p className="text-amber-200 text-lg">Loading Victory Acres...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/preview" component={LoginPreview} />
      {!isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <GameLayout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/animals" component={Animals} />
            <Route path="/horse-generator" component={HorseGeneratorPage} />
            <Route path="/training" component={Training} />
            <Route path="/breeding" component={Breeding} />
            <Route path="/careers" component={Careers} />
            <Route path="/shelter" component={Shelter} />
            <Route path="/wild-capture" component={WildCapture} />
            <Route path="/minigames" component={Minigames} />
            <Route path="/competitions" component={Competitions} />
            <Route path="/marketplace" component={Marketplace} />
            <Route path="/premium" component={Premium} />
            <Route path="/genetics" component={Genetics} />
            <Route path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </GameLayout>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
