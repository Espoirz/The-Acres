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
  Sparkles,
  Palette,
  Camera,
  Download,
  Save,
  Share,
  RotateCcw,
  Wand2,
  Dna,
} from "lucide-react";
import { HorseGenerator } from "../components/horse-generator";
import { HorseGenetics, HORSE_BREEDS } from "../lib/horse-genetics";

export function HorseGeneratorPage() {
  const [savedHorses, setSavedHorses] = useState<
    Array<{
      horse: HorseGenetics;
      images: string[];
      savedAt: Date;
    }>
  >([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");

  const handleHorseGenerated = (horse: HorseGenetics, images: string[]) => {
    const newEntry = {
      horse,
      images,
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
              <Wand2 className="w-4 h-4" />
              AI-Powered Generation
            </div>

            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">AI Horse</span> Generator
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Create stunning, genetically accurate horses using advanced AI.
              Each horse is generated with realistic genetics, detailed
              markings, and multiple image variations.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Dna className="w-3 h-3 mr-1" />
                Real Genetics
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Palette className="w-3 h-3 mr-1" />
                Color Accuracy
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Camera className="w-3 h-3 mr-1" />
                Multiple Angles
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Enhanced
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Breed Selection */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Choose a Breed</h3>
              <p className="text-muted-foreground text-sm">
                Select a specific breed or leave blank for random generation
              </p>
            </div>

            <div className="flex gap-2">
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="bg-background border border-border rounded-lg px-4 py-2 min-w-48"
              >
                <option value="">Random Breed</option>
                {HORSE_BREEDS.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>

              <Button variant="outline" onClick={() => setSelectedBreed("")}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Generator */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <HorseGenerator
            onHorseGenerated={handleHorseGenerated}
            initialBreed={selectedBreed || undefined}
          />
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
                  <div className="aspect-square bg-muted">
                    {entry.images[0] ? (
                      <img
                        src={entry.images[0]}
                        alt={entry.horse.description}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/400x400/d4b996/8b4513?text=${encodeURIComponent(entry.horse.physical.breed)}`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {entry.horse.description}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {entry.horse.physical.breed}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {entry.horse.calculatedColor}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Save className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Share className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
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
              Advanced <span className="text-gradient">AI Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our horse generator uses cutting-edge genetics simulation and AI
              image generation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <Dna className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Realistic Genetics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Based on real horse genetics including Extension, Agouti,
                  Cream, Dun, and pattern genes. Each horse has accurate color
                  predictions and inheritance patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <Camera className="w-8 h-8 text-emerald-500 mb-2" />
                <CardTitle>Multiple Angles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate horses from different angles and poses including side
                  profile, three-quarter view, portrait shots, and action poses.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <Palette className="w-8 h-8 text-amber-500 mb-2" />
                <CardTitle>Color Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every dilution gene, white pattern, and marking is accurately
                  represented in the generated images with scientific precision.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
