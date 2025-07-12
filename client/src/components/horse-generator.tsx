import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Palette,
  Zap,
  Download,
  RefreshCw,
  Eye,
  Settings,
  Sparkles,
  Camera,
  Image as ImageIcon,
} from "lucide-react";
import {
  HorseGenetics,
  generateCompleteHorse,
  calculateHorseColor,
  HORSE_BREEDS,
} from "../lib/horse-genetics";
import {
  generateHorseImagePrompt,
  generateHorseImages,
  ImageGenerationOptions,
} from "../lib/horse-image-generator";

interface HorseGeneratorProps {
  onHorseGenerated?: (horse: HorseGenetics, images: string[]) => void;
  initialBreed?: string;
}

export function HorseGenerator({
  onHorseGenerated,
  initialBreed,
}: HorseGeneratorProps) {
  const [currentHorse, setCurrentHorse] = useState<HorseGenetics | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [selectedImageOptions, setSelectedImageOptions] =
    useState<ImageGenerationOptions>({
      style: "realistic",
      pose: "standing",
      background: "pasture",
      lighting: "golden hour",
      angle: "side profile",
    });

  // Generate a new horse
  const generateNewHorse = () => {
    const horse = generateCompleteHorse(initialBreed);
    setCurrentHorse(horse);
    setGeneratedImages([]);
  };

  // Generate images for current horse
  const generateImages = async () => {
    if (!currentHorse) return;

    setIsGeneratingImages(true);
    try {
      const images = await generateHorseImages(currentHorse, [
        selectedImageOptions,
        { ...selectedImageOptions, angle: "three quarter" },
        { ...selectedImageOptions, pose: "portrait" },
        { ...selectedImageOptions, pose: "running" },
      ]);
      setGeneratedImages(images);

      if (onHorseGenerated) {
        onHorseGenerated(currentHorse, images);
      }
    } catch (error) {
      console.error("Failed to generate images:", error);
    } finally {
      setIsGeneratingImages(false);
    }
  };

  // Initialize with a random horse
  useEffect(() => {
    generateNewHorse();
  }, [initialBreed]);

  if (!currentHorse) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Horse Information Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                AI Horse Generator
              </CardTitle>
              <p className="text-muted-foreground">
                Generate realistic horse images based on genetic traits
              </p>
            </div>
            <Button onClick={generateNewHorse} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              New Horse
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Horse Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {currentHorse.description}
                </h3>
                <Badge variant="secondary" className="mr-2">
                  {currentHorse.physical.breed}
                </Badge>
                <Badge variant="outline" className="mr-2">
                  {currentHorse.physical.height.toFixed(1)} hands
                </Badge>
                <Badge variant="outline">
                  {currentHorse.physical.age} years old
                </Badge>
              </div>

              {/* Color Genetics */}
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Color Genetics
                </h4>
                <div className="text-sm space-y-1">
                  <div className="grid grid-cols-2 gap-2">
                    <span>
                      Extension:{" "}
                      <code className="genetics-display">
                        {currentHorse.genes.extension}
                      </code>
                    </span>
                    <span>
                      Agouti:{" "}
                      <code className="genetics-display">
                        {currentHorse.genes.agouti}
                      </code>
                    </span>
                    <span>
                      Cream:{" "}
                      <code className="genetics-display">
                        {currentHorse.genes.cream}
                      </code>
                    </span>
                    <span>
                      Dun:{" "}
                      <code className="genetics-display">
                        {currentHorse.genes.dun}
                      </code>
                    </span>
                    <span>
                      Grey:{" "}
                      <code className="genetics-display">
                        {currentHorse.genes.grey}
                      </code>
                    </span>
                    <span>
                      Tobiano:{" "}
                      <code className="genetics-display">
                        {currentHorse.genes.tobiano}
                      </code>
                    </span>
                  </div>
                </div>
              </div>

              {/* Markings */}
              <div>
                <h4 className="font-medium mb-2">White Markings</h4>
                <div className="text-sm space-y-1">
                  <div>
                    Face:{" "}
                    <span className="capitalize">
                      {currentHorse.markings.faceMarking}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <span>LF: {currentHorse.markings.leftFront}</span>
                    <span>RF: {currentHorse.markings.rightFront}</span>
                    <span>LH: {currentHorse.markings.leftHind}</span>
                    <span>RH: {currentHorse.markings.rightHind}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Generation Options */}
            <div className="space-y-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Image Options
              </h4>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="block mb-1 font-medium">Style</label>
                  <select
                    value={selectedImageOptions.style}
                    onChange={(e) =>
                      setSelectedImageOptions({
                        ...selectedImageOptions,
                        style: e.target.value as any,
                      })
                    }
                    className="w-full p-2 border border-border rounded"
                  >
                    <option value="realistic">Realistic</option>
                    <option value="painterly">Painterly</option>
                    <option value="photographic">Photographic</option>
                    <option value="artistic">Artistic</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Pose</label>
                  <select
                    value={selectedImageOptions.pose}
                    onChange={(e) =>
                      setSelectedImageOptions({
                        ...selectedImageOptions,
                        pose: e.target.value as any,
                      })
                    }
                    className="w-full p-2 border border-border rounded"
                  >
                    <option value="standing">Standing</option>
                    <option value="running">Running</option>
                    <option value="grazing">Grazing</option>
                    <option value="portrait">Portrait</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Background</label>
                  <select
                    value={selectedImageOptions.background}
                    onChange={(e) =>
                      setSelectedImageOptions({
                        ...selectedImageOptions,
                        background: e.target.value as any,
                      })
                    }
                    className="w-full p-2 border border-border rounded"
                  >
                    <option value="pasture">Pasture</option>
                    <option value="stable">Stable</option>
                    <option value="mountains">Mountains</option>
                    <option value="forest">Forest</option>
                    <option value="beach">Beach</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Lighting</label>
                  <select
                    value={selectedImageOptions.lighting}
                    onChange={(e) =>
                      setSelectedImageOptions({
                        ...selectedImageOptions,
                        lighting: e.target.value as any,
                      })
                    }
                    className="w-full p-2 border border-border rounded"
                  >
                    <option value="golden hour">Golden Hour</option>
                    <option value="bright sun">Bright Sun</option>
                    <option value="soft">Soft</option>
                    <option value="dramatic">Dramatic</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={generateImages}
                disabled={isGeneratingImages}
                className="w-full"
              >
                {isGeneratingImages ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating Images...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Generate Images
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Images */}
      {generatedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Generated Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {generatedImages.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={`Generated horse ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback for placeholder images
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/400x400/d4b996/8b4513?text=Horse+${index + 1}`;
                      }}
                    />
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge variant="secondary" className="text-xs">
                      Variation {index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Prompt Preview */}
      {currentHorse && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              AI Prompt Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap">
                {generateHorseImagePrompt(currentHorse, selectedImageOptions)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
