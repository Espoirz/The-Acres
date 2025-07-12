import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  RefreshCw,
  Save,
  Shuffle,
  AlertTriangle,
  Info,
  Heart,
  Zap,
  Sparkles,
  Droplets,
} from "lucide-react";
import {
  generateHorse,
  generateColorDescription,
  generateMarkingsDescription,
  HorseTraits,
  HORSE_BREEDS,
  BASE_COLORS,
  DILUTIONS,
  PATTERNS,
  FACE_MARKINGS,
  LEG_MARKINGS,
  BODY_MARKINGS,
  DEFECTS,
} from "../lib/simple-horse-generator";

interface SimpleHorseGeneratorProps {
  onHorseGenerated?: (horse: HorseTraits) => void;
}

export function SimpleHorseGenerator({
  onHorseGenerated,
}: SimpleHorseGeneratorProps) {
  const [currentHorse, setCurrentHorse] = useState<HorseTraits | null>(null);
  const [customSettings, setCustomSettings] = useState({
    breed: "",
    baseColor: "",
    includeDefects: true,
    ageRange: "any" as "foal" | "young" | "adult" | "senior" | "any",
  });

  const generateNewHorse = () => {
    const customTraits: Partial<HorseTraits> = {};

    if (customSettings.breed) {
      customTraits.breed = customSettings.breed;
    }

    if (customSettings.baseColor) {
      customTraits.baseColor = customSettings.baseColor;
    }

    if (customSettings.ageRange !== "any") {
      switch (customSettings.ageRange) {
        case "foal":
          customTraits.age = Math.random() * 1;
          break;
        case "young":
          customTraits.age = 1 + Math.random() * 3;
          break;
        case "adult":
          customTraits.age = 4 + Math.random() * 11;
          break;
        case "senior":
          customTraits.age = 15 + Math.random() * 10;
          break;
      }
    }

    if (!customSettings.includeDefects) {
      customTraits.defects = [];
    }

    const horse = generateHorse(customTraits);
    setCurrentHorse(horse);

    if (onHorseGenerated) {
      onHorseGenerated(horse);
    }
  };

  const StatDisplay = ({
    label,
    value,
    icon: Icon,
    color,
  }: {
    label: string;
    value: number;
    icon: any;
    color: string;
  }) => (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span>{label}</span>
          <span className="font-medium">{value}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              value >= 80
                ? "bg-green-500"
                : value >= 60
                  ? "bg-yellow-500"
                  : value >= 40
                    ? "bg-orange-500"
                    : "bg-red-500"
            }`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );

  React.useEffect(() => {
    generateNewHorse();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Generator Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Horse className="w-6 h-6 text-amber-600" />
            Horse Generator
          </CardTitle>
          <p className="text-muted-foreground">
            Generate horses based on realistic traits, markings, and genetic
            conditions
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Breed</label>
              <select
                value={customSettings.breed}
                onChange={(e) =>
                  setCustomSettings((prev) => ({
                    ...prev,
                    breed: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Any Breed</option>
                {HORSE_BREEDS.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Base Color
              </label>
              <select
                value={customSettings.baseColor}
                onChange={(e) =>
                  setCustomSettings((prev) => ({
                    ...prev,
                    baseColor: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Any Color</option>
                {BASE_COLORS.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Age Range
              </label>
              <select
                value={customSettings.ageRange}
                onChange={(e) =>
                  setCustomSettings((prev) => ({
                    ...prev,
                    ageRange: e.target.value as any,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="any">Any Age</option>
                <option value="foal">Foal (0-1 years)</option>
                <option value="young">Young (1-4 years)</option>
                <option value="adult">Adult (4-15 years)</option>
                <option value="senior">Senior (15+ years)</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customSettings.includeDefects}
                  onChange={(e) =>
                    setCustomSettings((prev) => ({
                      ...prev,
                      includeDefects: e.target.checked,
                    }))
                  }
                  className="rounded"
                />
                <span className="text-sm font-medium">Include Defects</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={generateNewHorse} className="flex-1">
              <Shuffle className="w-4 h-4 mr-2" />
              Generate New Horse
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setCustomSettings({
                  breed: "",
                  baseColor: "",
                  includeDefects: true,
                  ageRange: "any",
                })
              }
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Horse Display */}
      {currentHorse && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{currentHorse.name}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary">
                  Level {currentHorse.stats.level}
                </Badge>
                {currentHorse.defects.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-1"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    Has Conditions
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    Basic Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age:</span>
                      <span className="font-medium">
                        {currentHorse.age < 1
                          ? `${Math.round(currentHorse.age * 12)} months`
                          : `${Math.floor(currentHorse.age)} years`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gender:</span>
                      <span className="font-medium capitalize">
                        {currentHorse.gender}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Breed:</span>
                      <span className="font-medium">{currentHorse.breed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Height:</span>
                      <span className="font-medium">
                        {currentHorse.height.toFixed(1)} hands
                      </span>
                    </div>
                  </div>
                </div>

                {/* Color & Markings */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Appearance</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Color: </span>
                      <span className="font-medium">
                        {generateColorDescription(currentHorse)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Markings: </span>
                      <span className="font-medium">
                        {generateMarkingsDescription(currentHorse)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Defects/Conditions */}
                {currentHorse.defects.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      Health Conditions
                    </h3>
                    <div className="space-y-2">
                      {currentHorse.defects.map((defect, index) => (
                        <div
                          key={index}
                          className="p-3 bg-orange-50 border border-orange-200 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-orange-800">
                              {defect.name}
                            </span>
                            <Badge
                              variant={
                                defect.severity === "severe"
                                  ? "destructive"
                                  : defect.severity === "moderate"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {defect.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-orange-700">
                            {defect.description}
                          </p>
                          <p className="text-xs text-orange-600 mt-1">
                            Affects: {defect.affectedStats.join(", ")} (-
                            {defect.impact}%)
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Current Stats</h3>
                  <div className="space-y-3">
                    <StatDisplay
                      label="Health"
                      value={currentHorse.stats.health}
                      icon={Heart}
                      color="text-red-500"
                    />
                    <StatDisplay
                      label="Energy"
                      value={currentHorse.stats.energy}
                      icon={Zap}
                      color="text-blue-500"
                    />
                    <StatDisplay
                      label="Mood"
                      value={currentHorse.stats.mood}
                      icon={Sparkles}
                      color="text-yellow-500"
                    />
                    <StatDisplay
                      label="Cleanliness"
                      value={currentHorse.stats.cleanliness}
                      icon={Droplets}
                      color="text-cyan-500"
                    />
                  </div>
                </div>

                {/* Detailed Traits */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    Detailed Traits
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Base Color:{" "}
                      </span>
                      <Badge variant="outline">{currentHorse.baseColor}</Badge>
                    </div>

                    {currentHorse.dilutions.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">
                          Dilutions:{" "}
                        </span>
                        {currentHorse.dilutions.map((dilution, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="ml-1"
                          >
                            {dilution}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {currentHorse.patterns.length > 0 &&
                      !currentHorse.patterns.includes("Solid") && (
                        <div>
                          <span className="text-muted-foreground">
                            Patterns:{" "}
                          </span>
                          {currentHorse.patterns.map((pattern, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="ml-1"
                            >
                              {pattern}
                            </Badge>
                          ))}
                        </div>
                      )}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full mt-6"
                  onClick={() => onHorseGenerated?.(currentHorse)}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Add to My Stable
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information Panel */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">About Horse Generation</p>
              <p>
                Horses are generated with realistic traits based on actual horse
                genetics, markings, and potential health conditions. Defects and
                conditions affect the horse's stats and care requirements. Age
                influences base stats and determines available genders (foals
                can only be fillies or colts).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
