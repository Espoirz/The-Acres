// Comprehensive Breed Database for Horses and Dogs

export interface BreedInfo {
  name: string;
  category: "horse" | "dog";
  description: string;
  characteristics: string[];
  avgHeight: { min: number; max: number }; // hands for horses, inches for dogs
  avgWeight: { min: number; max: number }; // pounds
  lifespan: { min: number; max: number }; // years
  temperament: string[];
  commonColors: string[];
  possibleMarkings: string[];
  breedSpecificTraits: string[];
  rarityLevel: "common" | "uncommon" | "rare" | "legendary";
  originCountry: string;
  breedGroup?: string; // for dogs
  discipline?: string[]; // for horses
}

// HORSE BREEDS DATABASE
export const HORSE_BREEDS: Record<string, BreedInfo> = {
  Arabian: {
    name: "Arabian",
    category: "horse",
    description:
      "Ancient desert breed known for endurance, intelligence, and distinctive dished face",
    characteristics: [
      "Dished face",
      "Arched neck",
      "High tail carriage",
      "Compact body",
    ],
    avgHeight: { min: 14.1, max: 15.3 },
    avgWeight: { min: 800, max: 1000 },
    lifespan: { min: 25, max: 30 },
    temperament: ["Intelligent", "Spirited", "Alert", "Sensitive"],
    commonColors: ["Bay", "Chestnut", "Gray", "Black"],
    possibleMarkings: [
      "Star",
      "Snip",
      "Blaze",
      "White socks",
      "Small white markings",
    ],
    breedSpecificTraits: [
      "Superior endurance",
      "Heat tolerance",
      "Prepotent genetics",
    ],
    rarityLevel: "uncommon",
    originCountry: "Arabian Peninsula",
    discipline: ["Endurance", "Dressage", "Show", "Pleasure"],
  },

  Thoroughbred: {
    name: "Thoroughbred",
    category: "horse",
    description:
      "Premier racing breed developed in England, known for speed and athleticism",
    characteristics: [
      "Athletic build",
      "Long legs",
      "Refined head",
      "Deep chest",
    ],
    avgHeight: { min: 15.2, max: 17.0 },
    avgWeight: { min: 1000, max: 1200 },
    lifespan: { min: 22, max: 28 },
    temperament: ["Energetic", "Competitive", "Intelligent", "Hot-blooded"],
    commonColors: ["Bay", "Chestnut", "Brown", "Black", "Gray"],
    possibleMarkings: ["Star", "Stripe", "Blaze", "White socks", "Stockings"],
    breedSpecificTraits: [
      "Exceptional speed",
      "Athletic ability",
      "Strong heart",
    ],
    rarityLevel: "common",
    originCountry: "England",
    discipline: ["Racing", "Eventing", "Show jumping", "Dressage"],
  },

  "Quarter Horse": {
    name: "Quarter Horse",
    category: "horse",
    description:
      "Americas most popular breed, excelling in western disciplines and short-distance racing",
    characteristics: [
      "Muscular hindquarters",
      "Compact body",
      "Broad chest",
      "Short head",
    ],
    avgHeight: { min: 14.0, max: 16.0 },
    avgWeight: { min: 950, max: 1200 },
    lifespan: { min: 25, max: 35 },
    temperament: ["Calm", "Versatile", "Willing", "Intelligent"],
    commonColors: [
      "Sorrel",
      "Bay",
      "Black",
      "Brown",
      "Buckskin",
      "Palomino",
      "Gray",
    ],
    possibleMarkings: [
      "Star",
      "Snip",
      "Blaze",
      "Socks",
      "Stockings",
      "Coronet",
    ],
    breedSpecificTraits: ["Cow sense", "Quick acceleration", "Agility"],
    rarityLevel: "common",
    originCountry: "United States",
    discipline: ["Western pleasure", "Reining", "Cutting", "Barrel racing"],
  },

  "Paint Horse": {
    name: "Paint Horse",
    category: "horse",
    description:
      "Colorful breed combining Quarter Horse conformation with pinto markings",
    characteristics: [
      "Stock horse build",
      "Pinto markings",
      "Muscular frame",
      "Intelligent expression",
    ],
    avgHeight: { min: 14.0, max: 16.0 },
    avgWeight: { min: 950, max: 1150 },
    lifespan: { min: 25, max: 31 },
    temperament: ["Gentle", "Versatile", "Willing", "Calm"],
    commonColors: ["Tobiano", "Overo", "Tovero", "Solid colors"],
    possibleMarkings: [
      "Large white patches",
      "Bald face",
      "Blue eyes",
      "Pink skin",
    ],
    breedSpecificTraits: [
      "Flashy color patterns",
      "Versatility",
      "Good disposition",
    ],
    rarityLevel: "common",
    originCountry: "United States",
    discipline: ["Western pleasure", "Trail", "Ranch work", "Show"],
  },

  Appaloosa: {
    name: "Appaloosa",
    category: "horse",
    description:
      "Spotted breed developed by Nez Perce tribe, known for unique coat patterns",
    characteristics: [
      "Spotted coat",
      "Striped hooves",
      "White sclera",
      "Mottled skin",
    ],
    avgHeight: { min: 14.2, max: 16.0 },
    avgWeight: { min: 950, max: 1100 },
    lifespan: { min: 25, max: 30 },
    temperament: ["Gentle", "Versatile", "Hardy", "Intelligent"],
    commonColors: ["Leopard", "Blanket", "Snowflake", "Frost", "Solid"],
    possibleMarkings: [
      "Leopard spots",
      "Blanket with spots",
      "Roan patterns",
      "Varnish marks",
    ],
    breedSpecificTraits: [
      "Unique spotting patterns",
      "Hardy constitution",
      "Sure-footed",
    ],
    rarityLevel: "uncommon",
    originCountry: "United States",
    discipline: ["Western pleasure", "Trail", "Racing", "Gaming"],
  },

  Friesian: {
    name: "Friesian",
    category: "horse",
    description:
      "Majestic Dutch breed known for black color, flowing mane, and feathered legs",
    characteristics: [
      "Always black",
      "Flowing mane and tail",
      "Feathered legs",
      "Powerful build",
    ],
    avgHeight: { min: 15.3, max: 17.0 },
    avgWeight: { min: 1200, max: 1400 },
    lifespan: { min: 20, max: 25 },
    temperament: ["Gentle", "Willing", "Active", "Intelligent"],
    commonColors: ["Black"],
    possibleMarkings: ["Small star only", "Minimal white markings"],
    breedSpecificTraits: [
      "High-stepping action",
      "Dramatic appearance",
      "Versatile",
    ],
    rarityLevel: "rare",
    originCountry: "Netherlands",
    discipline: ["Dressage", "Driving", "Pleasure", "Show"],
  },

  Clydesdale: {
    name: "Clydesdale",
    category: "horse",
    description:
      "Scottish draft breed famous for strength, feathered legs, and gentle nature",
    characteristics: [
      "Feathered legs",
      "Large size",
      "High-stepping gait",
      "Gentle expression",
    ],
    avgHeight: { min: 16.0, max: 18.0 },
    avgWeight: { min: 1600, max: 2200 },
    lifespan: { min: 20, max: 25 },
    temperament: ["Gentle", "Energetic", "Pleasant", "Alert"],
    commonColors: ["Bay", "Brown", "Black", "Chestnut"],
    possibleMarkings: [
      "White face",
      "Four white legs",
      "White markings on body",
    ],
    breedSpecificTraits: [
      "Exceptional strength",
      "Flashy movement",
      "Good temperament",
    ],
    rarityLevel: "uncommon",
    originCountry: "Scotland",
    discipline: ["Draft work", "Driving", "Show", "Riding"],
  },

  Mustang: {
    name: "Mustang",
    category: "horse",
    description:
      "Wild horses of the American West, descended from Spanish horses",
    characteristics: [
      "Hardy constitution",
      "Sure-footed",
      "Compact build",
      "Wild heritage",
    ],
    avgHeight: { min: 13.0, max: 15.0 },
    avgWeight: { min: 700, max: 900 },
    lifespan: { min: 25, max: 30 },
    temperament: ["Independent", "Hardy", "Intelligent", "Spirited"],
    commonColors: ["Any color possible", "Often bay", "chestnut", "pinto"],
    possibleMarkings: [
      "Varied markings",
      "Primitive markings",
      "Dorsal stripes",
    ],
    breedSpecificTraits: [
      "Extreme hardiness",
      "Survival instincts",
      "Endurance",
    ],
    rarityLevel: "uncommon",
    originCountry: "United States",
    discipline: ["Trail", "Endurance", "Ranch work", "Natural horsemanship"],
  },
};

// DOG BREEDS DATABASE
export const DOG_BREEDS: Record<string, BreedInfo> = {
  "Labrador Retriever": {
    name: "Labrador Retriever",
    category: "dog",
    description:
      "Americas most popular dog breed, friendly and outgoing water retrievers",
    characteristics: [
      "Water-resistant coat",
      "Otter tail",
      "Kind eyes",
      "Athletic build",
    ],
    avgHeight: { min: 21.5, max: 24.5 },
    avgWeight: { min: 55, max: 80 },
    lifespan: { min: 10, max: 14 },
    temperament: ["Friendly", "Outgoing", "Active", "Loyal"],
    commonColors: ["Yellow", "Black", "Chocolate"],
    possibleMarkings: ["Small white chest patch", "Solid colors preferred"],
    breedSpecificTraits: [
      "Excellent swimmers",
      "Soft mouth",
      "High trainability",
    ],
    rarityLevel: "common",
    originCountry: "Canada",
    breedGroup: "Sporting",
  },

  "Golden Retriever": {
    name: "Golden Retriever",
    category: "dog",
    description:
      "Friendly, intelligent working dogs with lustrous golden coats",
    characteristics: [
      "Dense water-repelling coat",
      "Feathering",
      "Broad head",
      "Friendly expression",
    ],
    avgHeight: { min: 21.5, max: 24.0 },
    avgWeight: { min: 55, max: 75 },
    lifespan: { min: 10, max: 12 },
    temperament: ["Friendly", "Intelligent", "Devoted", "Trustworthy"],
    commonColors: ["Light golden", "Golden", "Dark golden"],
    possibleMarkings: [
      "Small white chest patch acceptable",
      "Feathering on legs and tail",
    ],
    breedSpecificTraits: [
      "Excellent family dogs",
      "High intelligence",
      "Gentle mouth",
    ],
    rarityLevel: "common",
    originCountry: "Scotland",
    breedGroup: "Sporting",
  },

  "German Shepherd": {
    name: "German Shepherd",
    category: "dog",
    description:
      "Large, athletic dogs known for courage, loyalty, and versatility",
    characteristics: [
      "Erect ears",
      "Confident carriage",
      "Noble expression",
      "Double coat",
    ],
    avgHeight: { min: 22.0, max: 26.0 },
    avgWeight: { min: 50, max: 90 },
    lifespan: { min: 9, max: 13 },
    temperament: ["Confident", "Courageous", "Smart", "Versatile"],
    commonColors: ["Black and tan", "Solid black", "Sable", "Black and silver"],
    possibleMarkings: ["Saddle pattern", "Blanket pattern", "Bi-color"],
    breedSpecificTraits: [
      "Exceptional working ability",
      "Loyalty",
      "Trainability",
    ],
    rarityLevel: "common",
    originCountry: "Germany",
    breedGroup: "Herding",
  },

  "Border Collie": {
    name: "Border Collie",
    category: "dog",
    description:
      "Workaholics of the dog world, bred for intelligence and herding ability",
    characteristics: [
      "Intense stare",
      "Athletic build",
      "Weather-resistant coat",
      "Alert expression",
    ],
    avgHeight: { min: 18.0, max: 22.0 },
    avgWeight: { min: 30, max: 55 },
    lifespan: { min: 12, max: 15 },
    temperament: ["Smart", "Energetic", "Eager", "Athletic"],
    commonColors: [
      "Black and white",
      "Red and white",
      "Tricolor",
      "Blue merle",
      "Red merle",
    ],
    possibleMarkings: [
      "White blaze",
      "White collar",
      "White legs",
      "White tip tail",
    ],
    breedSpecificTraits: [
      "Exceptional intelligence",
      "Herding instinct",
      "High energy",
    ],
    rarityLevel: "uncommon",
    originCountry: "Scotland/England",
    breedGroup: "Herding",
  },

  "Siberian Husky": {
    name: "Siberian Husky",
    category: "dog",
    description:
      "Graceful sled dogs known for endurance and striking appearance",
    characteristics: [
      "Thick double coat",
      "Erect triangular ears",
      "Striking eyes",
      "Compact feet",
    ],
    avgHeight: { min: 20.0, max: 23.5 },
    avgWeight: { min: 35, max: 60 },
    lifespan: { min: 12, max: 15 },
    temperament: ["Outgoing", "Mischievous", "Loyal", "Alert"],
    commonColors: [
      "Black and white",
      "Gray and white",
      "Red and white",
      "Sable and white",
    ],
    possibleMarkings: [
      "Facial masks",
      "White markings",
      "Blue or multicolored eyes",
    ],
    breedSpecificTraits: [
      "Cold weather tolerance",
      "Endurance",
      "Pack mentality",
    ],
    rarityLevel: "uncommon",
    originCountry: "Siberia",
    breedGroup: "Working",
  },

  "Australian Shepherd": {
    name: "Australian Shepherd",
    category: "dog",
    description:
      "Smart working dogs with striking merle coats and herding instincts",
    characteristics: [
      "Medium size",
      "Weather-resistant coat",
      "Triangular ears",
      "Docked tail",
    ],
    avgHeight: { min: 18.0, max: 23.0 },
    avgWeight: { min: 40, max: 65 },
    lifespan: { min: 12, max: 15 },
    temperament: ["Smart", "Work-oriented", "Exuberant", "Versatile"],
    commonColors: [
      "Blue merle",
      "Red merle",
      "Black",
      "Red",
      "All with white and/or tan",
    ],
    possibleMarkings: ["White markings", "Tan points", "Merle patterns"],
    breedSpecificTraits: [
      "Herding ability",
      "High intelligence",
      "Versatility",
    ],
    rarityLevel: "uncommon",
    originCountry: "United States",
    breedGroup: "Herding",
  },

  Rottweiler: {
    name: "Rottweiler",
    category: "dog",
    description:
      "Robust working dogs known for strength, loyalty, and guarding instincts",
    characteristics: [
      "Black coat with tan markings",
      "Broad head",
      "Strong build",
      "Confident bearing",
    ],
    avgHeight: { min: 22.0, max: 27.0 },
    avgWeight: { min: 80, max: 135 },
    lifespan: { min: 9, max: 10 },
    temperament: ["Loyal", "Loving", "Confident", "Guardian"],
    commonColors: ["Black with tan markings"],
    possibleMarkings: [
      "Tan markings on specific areas",
      "Small white chest spot acceptable",
    ],
    breedSpecificTraits: ["Natural guarding ability", "Strength", "Loyalty"],
    rarityLevel: "common",
    originCountry: "Germany",
    breedGroup: "Working",
  },

  "Afghan Hound": {
    name: "Afghan Hound",
    category: "dog",
    description:
      "Ancient sighthound breed known for elegance and distinctive silky coat",
    characteristics: [
      "Long silky coat",
      "Exotic expression",
      "Dignified carriage",
      "Ring tail",
    ],
    avgHeight: { min: 24.0, max: 29.0 },
    avgWeight: { min: 50, max: 60 },
    lifespan: { min: 12, max: 18 },
    temperament: ["Aloof", "Dignified", "Profoundly loyal", "Aristocratic"],
    commonColors: ["All colors acceptable", "Cream", "Red", "Black", "Brindle"],
    possibleMarkings: ["Facial markings", "White markings discouraged"],
    breedSpecificTraits: ["Exceptional sight", "Independence", "Elegance"],
    rarityLevel: "rare",
    originCountry: "Afghanistan",
    breedGroup: "Hound",
  },
};

// PREMIUM FEATURES SYSTEM
export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  benefit: string;
  category:
    | "stalls"
    | "automation"
    | "breeding"
    | "shows"
    | "training"
    | "trading";
}

export const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    id: "extra_stalls",
    name: "20 Extra Stalls",
    description: "Expand your stable capacity",
    benefit: "House up to 20 additional horses",
    category: "stalls",
  },
  {
    id: "bulk_operations",
    name: "Bulk Feed & Train",
    description: "Manage all horses at once",
    benefit: "Feed and train multiple horses simultaneously",
    category: "automation",
  },
  {
    id: "auto_clean",
    name: "Auto Clean Stalls",
    description: "Automatic stall maintenance",
    benefit: "Stalls clean themselves every 6 hours",
    category: "automation",
  },
  {
    id: "auto_shows",
    name: "Auto Enter Shows",
    description: "Automatic show participation",
    benefit: "Automatically enter eligible horses in shows",
    category: "shows",
  },
  {
    id: "create_shows",
    name: "Create Custom Shows",
    description: "Host your own competitions",
    benefit: "Create up to 20 custom shows per month",
    category: "shows",
  },
  {
    id: "dog_unlock",
    name: "Dog Adoption & Breeding",
    description: "Access the complete dog system",
    benefit: "Adopt, breed, and train dogs",
    category: "breeding",
  },
  {
    id: "embryo_storage",
    name: "Extended Embryo Storage",
    description: "Store more breeding potential",
    benefit: "Save up to 5 embryos instead of 2",
    category: "breeding",
  },
  {
    id: "fast_adoption",
    name: "Priority Adoption",
    description: "Reduced waiting times",
    benefit: "50% faster adoption processing",
    category: "automation",
  },
  {
    id: "training_bonus",
    name: "Training & Job Bonuses",
    description: "Enhanced progression rates",
    benefit: "5% training bonus and 3% job raise increase",
    category: "training",
  },
  {
    id: "private_trades",
    name: "Extended Trading",
    description: "More private trading opportunities",
    benefit: "Make up to 10 private trades per week instead of 5",
    category: "trading",
  },
];

export interface PremiumPlan {
  name: string;
  price: number; // in USD
  gemCost: number;
  duration: number; // in days
  features: string[]; // feature IDs
  popular?: boolean;
}

export const PREMIUM_PLANS: PremiumPlan[] = [
  {
    name: "Monthly Premium",
    price: 5.0,
    gemCost: 20,
    duration: 30,
    features: [
      "extra_stalls",
      "bulk_operations",
      "auto_clean",
      "auto_shows",
      "create_shows",
      "dog_unlock",
      "embryo_storage",
      "fast_adoption",
      "training_bonus",
      "private_trades",
    ],
    popular: true,
  },
  {
    name: "Quarterly Premium",
    price: 12.0,
    gemCost: 50,
    duration: 90,
    features: [
      "extra_stalls",
      "bulk_operations",
      "auto_clean",
      "auto_shows",
      "create_shows",
      "dog_unlock",
      "embryo_storage",
      "fast_adoption",
      "training_bonus",
      "private_trades",
    ],
  },
  {
    name: "Annual Premium",
    price: 40.0,
    gemCost: 180,
    duration: 365,
    features: [
      "extra_stalls",
      "bulk_operations",
      "auto_clean",
      "auto_shows",
      "create_shows",
      "dog_unlock",
      "embryo_storage",
      "fast_adoption",
      "training_bonus",
      "private_trades",
    ],
  },
];

// Helper functions
export function getBreedsByCategory(category: "horse" | "dog"): BreedInfo[] {
  const allBreeds = { ...HORSE_BREEDS, ...DOG_BREEDS };
  return Object.values(allBreeds).filter(
    (breed) => breed.category === category,
  );
}

export function getBreedInfo(breedName: string): BreedInfo | null {
  return HORSE_BREEDS[breedName] || DOG_BREEDS[breedName] || null;
}

export function getRandomBreed(category: "horse" | "dog"): BreedInfo {
  const breeds = getBreedsByCategory(category);
  return breeds[Math.floor(Math.random() * breeds.length)];
}

export function getBreedsByRarity(
  rarity: "common" | "uncommon" | "rare" | "legendary",
): BreedInfo[] {
  const allBreeds = { ...HORSE_BREEDS, ...DOG_BREEDS };
  return Object.values(allBreeds).filter(
    (breed) => breed.rarityLevel === rarity,
  );
}
