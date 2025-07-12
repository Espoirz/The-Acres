// Horse Genetics Engine for AI Image Generation

export interface HorseGenes {
  // Base colors
  extension: "EE" | "Ee" | "ee";
  agouti: "AA" | "Aa" | "aa";

  // Dilution genes
  cream: "N/N" | "N/Cr" | "Cr/Cr";
  dun: "N/N" | "D/d" | "D/D";
  champagne: "N/N" | "CH/n" | "CH/CH";
  silver: "N/N" | "Z/n" | "Z/Z";
  pearl: "N/N" | "Prl/n" | "Prl/Prl";
  mushroom: "N/N" | "mu/n" | "mu/mu";

  // White patterns
  tobiano: "N/N" | "TO/n" | "TO/TO";
  frame: "N/N" | "O/n";
  sabino: "N/N" | "SB1/n" | "SB1/SB1";
  splashWhite: "N/N" | "SW/n" | "SW/SW";
  dominantWhite: "N/N" | "W/n" | "W/W";

  // Appaloosa
  leopardComplex: "N/N" | "LP/n" | "LP/LP";
  patn1: "N/N" | "PATN1/n" | "PATN1/PATN1";

  // Grey
  grey: "N/N" | "G/g" | "G/G";

  // Fantasy genes (for game)
  unicorn?: "N/N" | "U/n" | "U/U";
  pegasus?: "N/N" | "P/n" | "P/P";
  mythicGlow?: "N/N" | "MG/n" | "MG/MG";
}

export interface HorseMarkings {
  faceMarking: "none" | "star" | "snip" | "stripe" | "blaze" | "baldFace";
  leftFront: "none" | "coronet" | "pastern" | "sock" | "stocking";
  rightFront: "none" | "coronet" | "pastern" | "sock" | "stocking";
  leftHind: "none" | "coronet" | "pastern" | "sock" | "stocking";
  rightHind: "none" | "coronet" | "pastern" | "sock" | "stocking";
}

export interface HorsePhysical {
  breed: string;
  height: number; // in hands
  age: number;
  sex: "stallion" | "mare" | "gelding";
  build: "light" | "medium" | "heavy";
}

export interface HorseGenetics {
  genes: HorseGenes;
  markings: HorseMarkings;
  physical: HorsePhysical;
  calculatedColor: string;
  description: string;
}

// Base color calculation
export function calculateBaseColor(extension: string, agouti: string): string {
  if (extension === "ee") return "chestnut";
  if (extension.includes("E") && agouti === "aa") return "black";
  if (extension.includes("E") && agouti.includes("A")) return "bay";
  return "chestnut";
}

// Apply dilution genes
export function applyDilutions(baseColor: string, genes: HorseGenes): string {
  let color = baseColor;

  // Cream gene dilutions
  if (genes.cream === "N/Cr") {
    if (baseColor === "chestnut") color = "palomino";
    else if (baseColor === "bay") color = "buckskin";
    else if (baseColor === "black") color = "smoky black";
  } else if (genes.cream === "Cr/Cr") {
    if (baseColor === "chestnut") color = "cremello";
    else if (baseColor === "bay") color = "perlino";
    else if (baseColor === "black") color = "smoky cream";
  }

  // Dun gene
  if (genes.dun !== "N/N") {
    if (color === "bay" || color === "buckskin") color = "bay dun";
    else if (color === "chestnut" || color === "palomino") color = "red dun";
    else if (color === "black" || color === "smoky black") color = "grullo";
  }

  // Champagne gene
  if (genes.champagne !== "N/N") {
    if (color.includes("chestnut") || color.includes("palomino"))
      color = "gold champagne";
    else if (color.includes("bay")) color = "amber champagne";
    else if (color.includes("black")) color = "classic champagne";
  }

  // Silver gene (affects black)
  if (genes.silver !== "N/N") {
    if (color.includes("black")) color = "silver dapple";
    else if (color.includes("bay")) color = "silver bay";
  }

  // Pearl gene
  if (
    genes.pearl === "Prl/Prl" ||
    (genes.pearl.includes("Prl") && genes.cream.includes("Cr"))
  ) {
    color = "pearl";
  }

  // Mushroom gene
  if (genes.mushroom !== "N/N" && color.includes("chestnut")) {
    color = "mushroom";
  }

  return color;
}

// Apply white patterns
export function applyWhitePatterns(color: string, genes: HorseGenes): string {
  const patterns: string[] = [];

  if (genes.tobiano !== "N/N") patterns.push("tobiano");
  if (genes.frame !== "N/N") patterns.push("frame overo");
  if (genes.sabino !== "N/N") patterns.push("sabino");
  if (genes.splashWhite !== "N/N") patterns.push("splash white");
  if (genes.dominantWhite !== "N/N") patterns.push("dominant white");

  // Appaloosa patterns
  if (genes.leopardComplex !== "N/N" && genes.patn1 !== "N/N") {
    if (genes.leopardComplex === "LP/LP") patterns.push("few spot leopard");
    else if (genes.patn1 === "PATN1/PATN1") patterns.push("leopard complex");
    else patterns.push("blanket appaloosa");
  } else if (genes.leopardComplex !== "N/N") {
    patterns.push("snowflake appaloosa");
  }

  if (patterns.length > 0) {
    return `${color} ${patterns.join(" ")}`;
  }

  return color;
}

// Apply grey gene (progressive whitening)
export function applyGrey(
  color: string,
  genes: HorseGenes,
  age: number,
): string {
  if (genes.grey !== "N/N") {
    if (age < 5) return `${color} (greying)`;
    else if (age < 10) return `light grey (${color} base)`;
    else return `white (${color} base)`;
  }
  return color;
}

// Calculate final color
export function calculateHorseColor(genes: HorseGenes, age: number): string {
  const baseColor = calculateBaseColor(genes.extension, genes.agouti);
  let color = applyDilutions(baseColor, genes);
  color = applyWhitePatterns(color, genes);
  color = applyGrey(color, genes, age);

  // Add fantasy elements
  if (genes.mythicGlow !== "N/N") {
    color = `${color} with bioluminescent mane and tail`;
  }

  return color;
}

// Generate random genetics
export function generateRandomGenes(): HorseGenes {
  const randomAllele = (options: string[]) =>
    options[Math.floor(Math.random() * options.length)];

  return {
    extension: randomAllele(["EE", "Ee", "ee"]) as any,
    agouti: randomAllele(["AA", "Aa", "aa"]) as any,
    cream: randomAllele(["N/N", "N/N", "N/N", "N/Cr", "Cr/Cr"]) as any,
    dun: randomAllele(["N/N", "N/N", "N/N", "D/d", "D/D"]) as any,
    champagne: randomAllele(["N/N", "N/N", "N/N", "CH/n"]) as any,
    silver: randomAllele(["N/N", "N/N", "N/N", "Z/n"]) as any,
    pearl: randomAllele(["N/N", "N/N", "N/N", "Prl/n"]) as any,
    mushroom: randomAllele(["N/N", "N/N", "N/N", "mu/n"]) as any,
    tobiano: randomAllele(["N/N", "N/N", "TO/n"]) as any,
    frame: randomAllele(["N/N", "N/N", "O/n"]) as any,
    sabino: randomAllele(["N/N", "N/N", "SB1/n"]) as any,
    splashWhite: randomAllele(["N/N", "N/N", "SW/n"]) as any,
    dominantWhite: randomAllele(["N/N", "N/N", "W/n"]) as any,
    leopardComplex: randomAllele(["N/N", "N/N", "LP/n"]) as any,
    patn1: randomAllele(["N/N", "N/N", "PATN1/n"]) as any,
    grey: randomAllele(["N/N", "N/N", "G/g"]) as any,
    unicorn: randomAllele(["N/N", "N/N", "N/N", "U/n"]) as any,
    pegasus: randomAllele(["N/N", "N/N", "N/N", "P/n"]) as any,
    mythicGlow: randomAllele(["N/N", "N/N", "N/N", "MG/n"]) as any,
  };
}

// Generate random markings
export function generateRandomMarkings(): HorseMarkings {
  const randomMarking = (options: string[]) =>
    options[Math.floor(Math.random() * options.length)];

  const faceOptions = [
    "none",
    "none",
    "star",
    "snip",
    "stripe",
    "blaze",
    "baldFace",
  ];
  const legOptions = ["none", "none", "coronet", "pastern", "sock", "stocking"];

  return {
    faceMarking: randomMarking(faceOptions) as any,
    leftFront: randomMarking(legOptions) as any,
    rightFront: randomMarking(legOptions) as any,
    leftHind: randomMarking(legOptions) as any,
    rightHind: randomMarking(legOptions) as any,
  };
}

// Breed offspring genetics
export function breedHorses(sire: HorseGenes, dam: HorseGenes): HorseGenes {
  const inheritAllele = (gene1: string, gene2: string) => {
    const alleles1 = gene1.split("/");
    const alleles2 = gene2.split("/");
    const fromSire = alleles1[Math.floor(Math.random() * alleles1.length)];
    const fromDam = alleles2[Math.floor(Math.random() * alleles2.length)];
    return [fromSire, fromDam].sort().join("/");
  };

  return {
    extension: inheritAllele(sire.extension, dam.extension) as any,
    agouti: inheritAllele(sire.agouti, dam.agouti) as any,
    cream: inheritAllele(sire.cream, dam.cream) as any,
    dun: inheritAllele(sire.dun, dam.dun) as any,
    champagne: inheritAllele(sire.champagne, dam.champagne) as any,
    silver: inheritAllele(sire.silver, dam.silver) as any,
    pearl: inheritAllele(sire.pearl, dam.pearl) as any,
    mushroom: inheritAllele(sire.mushroom, dam.mushroom) as any,
    tobiano: inheritAllele(sire.tobiano, dam.tobiano) as any,
    frame: inheritAllele(sire.frame, dam.frame) as any,
    sabino: inheritAllele(sire.sabino, dam.sabino) as any,
    splashWhite: inheritAllele(sire.splashWhite, dam.splashWhite) as any,
    dominantWhite: inheritAllele(sire.dominantWhite, dam.dominantWhite) as any,
    leopardComplex: inheritAllele(
      sire.leopardComplex,
      dam.leopardComplex,
    ) as any,
    patn1: inheritAllele(sire.patn1, dam.patn1) as any,
    grey: inheritAllele(sire.grey, dam.grey) as any,
    unicorn: inheritAllele(sire.unicorn || "N/N", dam.unicorn || "N/N") as any,
    pegasus: inheritAllele(sire.pegasus || "N/N", dam.pegasus || "N/N") as any,
    mythicGlow: inheritAllele(
      sire.mythicGlow || "N/N",
      dam.mythicGlow || "N/N",
    ) as any,
  };
}

// Common horse breeds
export const HORSE_BREEDS = [
  "Arabian",
  "Thoroughbred",
  "Quarter Horse",
  "Paint Horse",
  "Appaloosa",
  "Friesian",
  "Clydesdale",
  "Shire",
  "Percheron",
  "Andalusian",
  "Mustang",
  "Morgan",
  "Tennessee Walker",
  "Standardbred",
  "Warmblood",
  "Icelandic Horse",
  "Haflinger",
  "Shetland Pony",
  "Welsh Pony",
  "Connemara",
];

// Generate complete horse genetics
export function generateCompleteHorse(
  breed?: string,
  customGenes?: Partial<HorseGenes>,
): HorseGenetics {
  const genes = { ...generateRandomGenes(), ...customGenes };
  const markings = generateRandomMarkings();
  const selectedBreed =
    breed || HORSE_BREEDS[Math.floor(Math.random() * HORSE_BREEDS.length)];

  const physical: HorsePhysical = {
    breed: selectedBreed,
    height: 14 + Math.random() * 4, // 14-18 hands
    age: 1 + Math.floor(Math.random() * 20),
    sex: ["stallion", "mare", "gelding"][Math.floor(Math.random() * 3)] as any,
    build: ["light", "medium", "heavy"][Math.floor(Math.random() * 3)] as any,
  };

  const calculatedColor = calculateHorseColor(genes, physical.age);

  return {
    genes,
    markings,
    physical,
    calculatedColor,
    description: `A ${physical.age}-year-old ${calculatedColor} ${selectedBreed} ${physical.sex}`,
  };
}
