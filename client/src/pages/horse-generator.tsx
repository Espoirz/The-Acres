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
  Palette,
  Save,
  Share,
  RotateCcw,
  Shuffle,
  Heart,
  AlertTriangle,
} from "lucide-react";
import { SimpleHorseGenerator } from "../components/simple-horse-generator";
import {
  HorseTraits,
  generateColorDescription,
  generateMarkingsDescription,
} from "../lib/simple-horse-generator";

export function HorseGeneratorPage() {
  const [savedHorses, setSavedHorses] = useState<
    Array<{
      horse: HorseTraits;
      savedAt: Date;
    }>
  >([]);

  const handleHorseGenerated = (horse: HorseTraits) => {
    const newEntry = {
      horse,
      savedAt: new Date(),
    };
    setSavedHorses((prev) => [newEntry, ...prev.slice(0, 9)]); // Keep last 10
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-emerald/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shuffle className="w-4 h-4" />
              Realistic Horse Traits
            </div>

            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">Horse</span> Generator
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Generate realistic horses with authentic traits, markings, colors,
              and genetic conditions. Each horse is unique with detailed
              characteristics based on real horse genetics.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Palette className="w-3 h-3 mr-1" />
                Realistic Colors
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Heart className="w-3 h-3 mr-1" />
                Authentic Markings
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Health Conditions
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Horse className="w-3 h-3 mr-1" />
                20+ Breeds
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Generator */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <SimpleHorseGenerator onHorseGenerated={handleHorseGenerated} />
        </div>
      </section>

      {/* Recently Generated */}
      {savedHorses.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl font-bold mb-2">
                  Recently Generated
                </h2>
                <p className="text-muted-foreground">
                  Your last {savedHorses.length} generated horses
                </p>
              </div>

              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save All to Stable
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedHorses.map((entry, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">
                        {entry.horse.name}
                      </h3>
                      {entry.horse.defects.length > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {entry.horse.defects.length} condition
                          {entry.horse.defects.length !== 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {entry.horse.age < 1
                        ? `${Math.round(entry.horse.age * 12)} months`
                        : `${Math.floor(entry.horse.age)} years`}{" "}
                      • {entry.horse.gender} • {entry.horse.breed}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <div className="mb-2">
                        <span className="font-medium">Color: </span>
                        <span>{generateColorDescription(entry.horse)}</span>
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Markings: </span>
                        <span className="text-muted-foreground">
                          {generateMarkingsDescription(entry.horse)}
                        </span>
                      </div>
                      <div className="mb-2">
                        <span className="font-medium">Height: </span>
                        <span>{entry.horse.height.toFixed(1)} hands</span>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Health: {entry.horse.stats.health}%</div>
                      <div>Energy: {entry.horse.stats.energy}%</div>
                      <div>Mood: {entry.horse.stats.mood}%</div>
                      <div>Level: {entry.horse.stats.level}</div>
                    </div>

                    {/* Defects Summary */}
                    {entry.horse.defects.length > 0 && (
                      <div className="text-xs">
                        <span className="font-medium text-orange-600">
                          Conditions:{" "}
                        </span>
                        {entry.horse.defects.map((d) => d.name).join(", ")}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Save className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Share className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">
              Realistic <span className="text-gradient">Horse Traits</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Generate horses with authentic characteristics based on real
              equine genetics and biology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <Palette className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Authentic Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Based on real horse genetics with base colors, dilutions, and
                  patterns like bay, chestnut, palomino, dun, and appaloosa
                  markings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <Heart className="w-8 h-8 text-red-500 mb-2" />
                <CardTitle>Detailed Markings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Realistic white markings including stars, blazes, socks,
                  stockings, and complex patterns with proper inheritance
                  probabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <AlertTriangle className="w-8 h-8 text-orange-500 mb-2" />
                <CardTitle>Health Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Includes realistic genetic conditions and defects like
                  clubfoot, parrot mouth, and roaring that affect care
                  requirements and stats.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
