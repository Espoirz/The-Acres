import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { useAuth } from "./hooks/useAuth";
import { Navigation } from "./components/navigation";
import { Home } from "./pages/home";
import { Animals } from "./pages/animals";
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="font-display text-4xl font-bold mb-4 text-gradient">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">{description}</p>
        <div className="text-sm text-muted-foreground">Coming soon...</div>
      </div>
    </div>
  );
}

const Breeding = () => (
  <PlaceholderPage
    title="Breeding Center"
    description="Advanced breeding tools and genetic analysis for creating the perfect offspring."
  />
);

const Competitions = () => (
  <PlaceholderPage
    title="Competitions"
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

const Premium = () => (
  <PlaceholderPage
    title="Premium Features"
    description="Unlock advanced tools, exclusive content, and enhanced gameplay experiences."
  />
);

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-hero-gradient rounded-full animate-bounce mx-auto mb-4" />
          <p className="text-muted-foreground">Loading Victory Acres...</p>
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
            <Route path="/breeding" component={Breeding} />
            <Route path="/competitions" component={Competitions} />
            <Route path="/marketplace" component={Marketplace} />
            <Route path="/explore" component={Explore} />
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
