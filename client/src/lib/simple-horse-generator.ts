// Simple Horse Generator Based on Physical Traits

export interface HorseTraits {
  // Basic info
  name: string;
  age: number;
  gender: "stallion" | "mare" | "gelding" | "filly" | "colt";
  breed: string;
  height: number; // in hands

  // Color genetics
  baseColor: string;
  dilutions: string[];
  patterns: string[];

  // Physical markings
  faceMarkings: string[];
  legMarkings: LegMarkings;
  bodyMarkings: string[];

  // Defects/conditions
  defects: Defect[];

  // Stats affected by traits
  stats: {
    health: number;
    energy: number;
    mood: number;
    cleanliness: number;
    level: number;
  };
}

export interface LegMarkings {
  leftFront: string;
  rightFront: string;
  leftHind: string;
  rightHind: string;
}

export interface Defect {
  name: string;
  description: string;
  severity: "minor" | "moderate" | "severe";
  affectedStats: string[];
  impact: number; // percentage reduction
}

// Base colors
export const BASE_COLORS = ["Bay", "Chestnut", "Black", "Brown", "Gray"];

// Dilution modifiers
export const DILUTIONS = [
  "Cream (Palomino/Buckskin)",
  "Dun",
  "Champagne",
  "Silver",
  "Pearl",
];

// White patterns
export const PATTERNS = [
  "Solid",
  "Tobiano",
  "Overo",
  "Sabino",
  "Splash White",
  "Appaloosa",
  "Leopard Complex",
  "Blanket",
  "Snowflake",
];

// Face markings
export const FACE_MARKINGS = [
  "None",
  "Star",
  "Snip",
  "Stripe",
  "Blaze",
  "Bald Face",
  "Interrupted Stripe",
  "Faint Star",
  "Crescent",
];

// Leg markings
export const LEG_MARKINGS = [
  "None",
  "Coronet",
  "Pastern",
  "Ankle",
  "Sock",
  "Stocking",
  "Half Stocking",
  "Ermine Marks",
];

// Body markings
export const BODY_MARKINGS = [
  "None",
  "Belly Spot",
  "Flank Patch",
  "Shoulder Patch",
  "Medicine Hat",
  "Shield",
  "Heart",
];

// Import breed data
import {
  HORSE_BREEDS as BREED_DATABASE,
  getBreedsByCategory,
  getBreedInfo,
} from "./breed-database";

// Common horse breeds (just names for backwards compatibility)
export const HORSE_BREEDS = Object.keys(BREED_DATABASE);

// Possible defects/conditions
export const DEFECTS = [
  {
    name: "Clubfoot",
    description: "Upright hoof conformation affecting movement",
    severity: "moderate" as const,
    affectedStats: ["energy", "mood"],
    impact: 10,
  },
  {
    name: "Parrot Mouth",
    description: "Overbite affecting eating",
    severity: "minor" as const,
    affectedStats: ["health"],
    impact: 5,
  },
  {
    name: "Cataract",
    description: "Clouding of eye lens affecting vision",
    severity: "moderate" as const,
    affectedStats: ["mood", "energy"],
    impact: 15,
  },
  {
    name: "Sway Back",
    description: "Dipped back conformation",
    severity: "minor" as const,
    affectedStats: ["energy"],
    impact: 8,
  },
  {
    name: "Windsucker",
    description: "Compulsive air swallowing behavior",
    severity: "minor" as const,
    affectedStats: ["health", "mood"],
    impact: 7,
  },
  {
    name: "Roaring",
    description: "Breathing obstruction during exercise",
    severity: "moderate" as const,
    affectedStats: ["energy"],
    impact: 20,
  },
  {
    name: "Moon Blindness",
    description: "Recurrent eye inflammation",
    severity: "severe" as const,
    affectedStats: ["mood", "health"],
    impact: 25,
  },
];

// Generate random horse names
const HORSE_NAMES = [
  "Moonlight Dancer",
  "Thunder Storm",
  "Whisper Wind",
  "Silver Belle",
  "Golden Arrow",
  "Midnight Star",
  "Crimson Fire",
  "Azure Dream",
  "Stormy Weather",
  "Sunny Meadow",
  "Winter Frost",
  "Spring Blossom",
  "Royal Prince",
  "Lady Grace",
  "Black Diamond",
  "White Lightning",
  "Copper Coin",
  "Velvet Rose",
  "Iron Will",
  "Gentle Spirit",
];

// Utility functions
function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomChoices<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getAgeCategory(age: number): "foal" | "young" | "adult" | "senior" {
  if (age < 1) return "foal";
  if (age < 4) return "young";
  if (age < 15) return "adult";
  return "senior";
}

function getGenderForAge(age: number): HorseTraits["gender"] {
  if (age < 4) {
    return Math.random() < 0.5 ? "filly" : "colt";
  }
  const genders: HorseTraits["gender"][] = ["stallion", "mare", "gelding"];
  return randomChoice(genders);
}

// Generate base stats affected by age and defects
function generateBaseStats(
  age: number,
  defects: Defect[],
): HorseTraits["stats"] {
  const ageCategory = getAgeCategory(age);

  // Base stats by age
  let baseStats = {
    health: 100,
    energy: 100,
    mood: 85,
    cleanliness: 75,
    level: 1,
  };

  // Adjust for age
  switch (ageCategory) {
    case "foal":
      baseStats.energy = 60;
      baseStats.mood = 95;
      baseStats.level = 1;
      break;
    case "young":
      baseStats.energy = 90;
      baseStats.mood = 90;
      baseStats.level = Math.floor(Math.random() * 5) + 1;
      break;
    case "adult":
      baseStats.level = Math.floor(Math.random() * 20) + 5;
      break;
    case "senior":
      baseStats.health = 85;
      baseStats.energy = 70;
      baseStats.level = Math.floor(Math.random() * 15) + 15;
      break;
  }

  // Apply defect impacts
  defects.forEach((defect) => {
    defect.affectedStats.forEach((stat) => {
      if (stat in baseStats) {
        baseStats[stat as keyof typeof baseStats] = Math.max(
          20,
          baseStats[stat as keyof typeof baseStats] - defect.impact,
        );
      }
    });
  });

  // Add some randomness
  Object.keys(baseStats).forEach((key) => {
    if (key !== "level") {
      const variation = Math.floor(Math.random() * 21) - 10; // -10 to +10
      baseStats[key as keyof typeof baseStats] = Math.max(
        10,
        Math.min(100, baseStats[key as keyof typeof baseStats] + variation),
      );
    }
  });

  return baseStats;
}

// Generate color description
export function generateColorDescription(traits: HorseTraits): string {
  let description = traits.baseColor;

  if (traits.dilutions.length > 0) {
    description += ` with ${traits.dilutions.join(" and ")} dilution`;
  }

  if (traits.patterns.length > 0 && !traits.patterns.includes("Solid")) {
    description += ` showing ${traits.patterns.join(" and ")} pattern`;
  }

  return description;
}

// Generate markings description
export function generateMarkingsDescription(traits: HorseTraits): string {
  const descriptions: string[] = [];

  if (traits.faceMarkings.length > 0 && !traits.faceMarkings.includes("None")) {
    descriptions.push(`Face: ${traits.faceMarkings.join(", ")}`);
  }

  const legMarkings = Object.entries(traits.legMarkings)
    .filter(([_, marking]) => marking !== "None")
    .map(
      ([leg, marking]) =>
        `${leg.replace(/([A-Z])/g, " $1").toLowerCase()}: ${marking}`,
    );

  if (legMarkings.length > 0) {
    descriptions.push(`Legs: ${legMarkings.join(", ")}`);
  }

  if (traits.bodyMarkings.length > 0 && !traits.bodyMarkings.includes("None")) {
    descriptions.push(`Body: ${traits.bodyMarkings.join(", ")}`);
  }

  return descriptions.join(" | ") || "No white markings";
}

// Main generation function
export function generateHorse(
  customTraits?: Partial<HorseTraits>,
): HorseTraits {
  const age = customTraits?.age ?? Math.floor(Math.random() * 25) + 1;

  // Determine defects (10% chance per defect, max 2)
  const selectedDefects: Defect[] = [];
  DEFECTS.forEach((defect) => {
    if (Math.random() < 0.1 && selectedDefects.length < 2) {
      selectedDefects.push(defect);
    }
  });

  const traits: HorseTraits = {
    name: customTraits?.name ?? randomChoice(HORSE_NAMES),
    age,
    gender: customTraits?.gender ?? getGenderForAge(age),
    breed: customTraits?.breed ?? randomChoice(HORSE_BREEDS),
    height: customTraits?.height ?? 13.0 + Math.random() * 5.0, // 13-18 hands

    baseColor: customTraits?.baseColor ?? randomChoice(BASE_COLORS),
    dilutions:
      customTraits?.dilutions ??
      (Math.random() < 0.3 ? [randomChoice(DILUTIONS)] : []),
    patterns:
      customTraits?.patterns ??
      (Math.random() < 0.4 ? [randomChoice(PATTERNS)] : ["Solid"]),

    faceMarkings:
      customTraits?.faceMarkings ??
      (Math.random() < 0.6 ? [randomChoice(FACE_MARKINGS)] : ["None"]),
    legMarkings: customTraits?.legMarkings ?? {
      leftFront: Math.random() < 0.3 ? randomChoice(LEG_MARKINGS) : "None",
      rightFront: Math.random() < 0.3 ? randomChoice(LEG_MARKINGS) : "None",
      leftHind: Math.random() < 0.3 ? randomChoice(LEG_MARKINGS) : "None",
      rightHind: Math.random() < 0.3 ? randomChoice(LEG_MARKINGS) : "None",
    },
    bodyMarkings:
      customTraits?.bodyMarkings ??
      (Math.random() < 0.2 ? [randomChoice(BODY_MARKINGS)] : ["None"]),

    defects: customTraits?.defects ?? selectedDefects,

    stats: generateBaseStats(age, selectedDefects),
  };

  return traits;
}

// Generate multiple horses
export function generateMultipleHorses(count: number): HorseTraits[] {
  return Array.from({ length: count }, () => generateHorse());
}

// Breed two horses (simplified inheritance)
export function breedHorses(sire: HorseTraits, dam: HorseTraits): HorseTraits {
  const foalAge = Math.random() * 0.8; // 0-9.6 months

  // Inherit traits from parents
  const inheritedBaseColor =
    Math.random() < 0.5 ? sire.baseColor : dam.baseColor;
  const inheritedBreed = Math.random() < 0.5 ? sire.breed : dam.breed;

  // Combine dilutions and patterns
  const allDilutions = [...sire.dilutions, ...dam.dilutions];
  const allPatterns = [...sire.patterns, ...dam.patterns];

  const inheritedDilutions =
    allDilutions.length > 0
      ? randomChoices(allDilutions, Math.min(2, allDilutions.length))
      : [];
  const inheritedPatterns =
    allPatterns.length > 0
      ? randomChoices(allPatterns, Math.min(2, allPatterns.length))
      : ["Solid"];

  // 25% chance to inherit defects from either parent
  const inheritedDefects: Defect[] = [];
  [...sire.defects, ...dam.defects].forEach((defect) => {
    if (Math.random() < 0.25) {
      inheritedDefects.push(defect);
    }
  });

  return generateHorse({
    age: foalAge,
    gender: foalAge < 4 ? (Math.random() < 0.5 ? "filly" : "colt") : undefined,
    breed: inheritedBreed,
    baseColor: inheritedBaseColor,
    dilutions: inheritedDilutions,
    patterns: inheritedPatterns,
    defects: inheritedDefects,
  });
}
