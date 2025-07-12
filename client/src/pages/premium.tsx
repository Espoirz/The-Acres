import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Crown,
  Sparkles,
  Zap,
  Shield,
  Trophy,
  Heart,
  Users,
  Clock,
  TrendingUp,
  Check,
  Star,
  Gem,
  CreditCard,
  Lock,
  Unlock,
} from "lucide-react";
import {
  PREMIUM_FEATURES,
  PREMIUM_PLANS,
  PremiumFeature,
  PremiumPlan,
} from "../lib/breed-database";

interface PremiumPageProps {
  userPremium?: boolean;
  userGems?: number;
}

export function Premium({
  userPremium = false,
  userGems = 15,
}: PremiumPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<PremiumPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"usd" | "gems">("usd");

  const getFeatureIcon = (category: string) => {
    switch (category) {
      case "stalls":
        return Shield;
      case "automation":
        return Zap;
      case "breeding":
        return Heart;
      case "shows":
        return Trophy;
      case "training":
        return TrendingUp;
      case "trading":
        return Users;
      default:
        return Sparkles;
    }
  };

  const getFeatureColor = (category: string) => {
    switch (category) {
      case "stalls":
        return "text-blue-500";
      case "automation":
        return "text-purple-500";
      case "breeding":
        return "text-red-500";
      case "shows":
        return "text-amber-500";
      case "training":
        return "text-green-500";
      case "trading":
        return "text-indigo-500";
      default:
        return "text-gray-500";
    }
  };

  const FeatureCard = ({ feature }: { feature: PremiumFeature }) => {
    const Icon = getFeatureIcon(feature.category);
    const colorClass = getFeatureColor(feature.category);

    return (
      <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full bg-gray-100 ${colorClass}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{feature.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">
                {feature.description}
              </p>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-700">
                  {feature.benefit}
                </span>
              </div>
            </div>
          </div>
          {userPremium && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-green-100 text-green-800">
                <Unlock className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
          )}
          {!userPremium && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary">
                <Lock className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const PlanCard = ({ plan }: { plan: PremiumPlan }) => {
    const isSelected = selectedPlan?.name === plan.name;
    const canAffordGems = userGems >= plan.gemCost;

    return (
      <Card
        className={`relative ${isSelected ? "ring-2 ring-primary shadow-lg" : ""} ${plan.popular ? "border-amber-200" : ""}`}
      >
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-amber-500 text-white px-4 py-1">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          </div>
        )}

        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl">{plan.name}</CardTitle>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">${plan.price}</div>
            <div className="text-sm text-muted-foreground">
              or {plan.gemCost}{" "}
              <Gem className="w-4 h-4 inline text-purple-500" /> gems
            </div>
            <div className="text-sm">
              {plan.duration} days of premium access
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            {plan.features.slice(0, 5).map((featureId) => {
              const feature = PREMIUM_FEATURES.find((f) => f.id === featureId);
              return feature ? (
                <div
                  key={featureId}
                  className="flex items-center gap-2 text-sm"
                >
                  <Check className="w-4 h-4 text-green-500" />
                  <span>{feature.name}</span>
                </div>
              ) : null;
            })}
            {plan.features.length > 5 && (
              <div className="text-sm text-muted-foreground">
                +{plan.features.length - 5} more features
              </div>
            )}
          </div>

          <div className="space-y-2 pt-4">
            <Button
              className="w-full"
              variant={
                isSelected && paymentMethod === "usd" ? "default" : "outline"
              }
              onClick={() => {
                setSelectedPlan(plan);
                setPaymentMethod("usd");
              }}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Pay ${plan.price}
            </Button>

            <Button
              className="w-full"
              variant={
                isSelected && paymentMethod === "gems" ? "default" : "outline"
              }
              disabled={!canAffordGems}
              onClick={() => {
                setSelectedPlan(plan);
                setPaymentMethod("gems");
              }}
            >
              <Gem className="w-4 h-4 mr-2 text-purple-500" />
              Pay {plan.gemCost} Gems
              {!canAffordGems && (
                <span className="ml-2 text-red-500">
                  (Need {plan.gemCost - userGems} more)
                </span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Crown className="w-4 h-4" />
            Premium Features
          </div>

          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            Unlock the <span className="text-gradient">Full Experience</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Take your horse and dog breeding to the next level with premium
            features designed to enhance every aspect of your stable management.
          </p>

          {userPremium ? (
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
              <Crown className="w-5 h-5" />
              <span className="font-semibold">Premium Active</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gem className="w-5 h-5 text-purple-500" />
                <span>You have {userGems} gems</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Tabs defaultValue="features" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">
                Premium Features
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every premium feature designed to save you time and enhance your
                gameplay experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PREMIUM_FEATURES.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="plans" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">
                Choose Your Plan
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select the perfect premium plan for your needs. All plans
                include every premium feature.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {PREMIUM_PLANS.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>

            {selectedPlan && (
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">
                    Complete Purchase
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold">
                      {selectedPlan.name}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {paymentMethod === "usd"
                        ? `$${selectedPlan.price}`
                        : `${selectedPlan.gemCost} gems`}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedPlan.duration} days of premium access
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    {paymentMethod === "usd" ? (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Purchase with Card
                      </>
                    ) : (
                      <>
                        <Gem className="w-4 h-4 mr-2 text-purple-500" />
                        Purchase with Gems
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-center text-muted-foreground">
                    Premium activates immediately and includes all features
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Feature Comparison */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">
              Free vs Premium
            </h2>
            <p className="text-muted-foreground">
              See what you get with premium access
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-3 gap-0">
                  <div className="p-6 border-r">
                    <h3 className="font-semibold text-lg mb-4">Feature</h3>
                    <div className="space-y-4 text-sm">
                      <div>Stable capacity</div>
                      <div>Bulk operations</div>
                      <div>Auto maintenance</div>
                      <div>Dog breeding</div>
                      <div>Show creation</div>
                      <div>Embryo storage</div>
                      <div>Training bonus</div>
                      <div>Private trades/week</div>
                    </div>
                  </div>

                  <div className="p-6 border-r bg-gray-50">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <span>Free</span>
                    </h3>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <div>20 stalls</div>
                      <div>Manual only</div>
                      <div>Manual cleaning</div>
                      <div>Not available</div>
                      <div>0 per month</div>
                      <div>2 embryos</div>
                      <div>Standard rates</div>
                      <div>5 trades</div>
                    </div>
                  </div>

                  <div className="p-6 bg-amber-50">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Crown className="w-5 h-5 text-amber-500" />
                      <span>Premium</span>
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="font-medium text-green-600">
                        40 stalls (+20)
                      </div>
                      <div className="font-medium text-green-600">
                        Bulk feed & train
                      </div>
                      <div className="font-medium text-green-600">
                        Auto every 6h
                      </div>
                      <div className="font-medium text-green-600">
                        Full access
                      </div>
                      <div className="font-medium text-green-600">
                        20 per month
                      </div>
                      <div className="font-medium text-green-600">
                        5 embryos (+3)
                      </div>
                      <div className="font-medium text-green-600">
                        +5% training, +3% job
                      </div>
                      <div className="font-medium text-green-600">
                        10 trades (+5)
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
