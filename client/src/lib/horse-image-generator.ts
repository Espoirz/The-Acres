// AI Image Generation for Horses Based on Genetics

import { HorseGenetics, HorseMarkings, HorsePhysical } from "./horse-genetics";

export interface ImageGenerationOptions {
  style?: "realistic" | "painterly" | "photographic" | "artistic";
  pose?: "standing" | "running" | "grazing" | "portrait" | "action";
  background?:
    | "pasture"
    | "stable"
    | "mountains"
    | "beach"
    | "forest"
    | "plain";
  lighting?: "golden hour" | "overcast" | "bright sun" | "dramatic" | "soft";
  angle?: "side profile" | "three quarter" | "front view" | "rear view";
}

// Convert genetics to detailed description
export function generateDetailedDescription(genetics: HorseGenetics): string {
  const { genes, markings, physical, calculatedColor } = genetics;

  let description = `A ${physical.age}-year-old ${calculatedColor} ${physical.breed} ${physical.sex}`;

  // Add build description
  const buildDescriptions = {
    light: "with a refined, athletic build",
    medium: "with a well-proportioned, sturdy build",
    heavy: "with a powerful, muscular build",
  };
  description += ` ${buildDescriptions[physical.build]}`;

  // Add height
  const hands = Math.floor(physical.height);
  const inches = Math.round((physical.height - hands) * 4);
  description += `, standing ${hands}.${inches} hands high`;

  // Add markings details
  const markingDescriptions: string[] = [];

  if (markings.faceMarking !== "none") {
    markingDescriptions.push(`a white ${markings.faceMarking} on the face`);
  }

  const legMarkings = [
    { leg: "left front", marking: markings.leftFront },
    { leg: "right front", marking: markings.rightFront },
    { leg: "left hind", marking: markings.leftHind },
    { leg: "right hind", marking: markings.rightHind },
  ].filter((leg) => leg.marking !== "none");

  if (legMarkings.length > 0) {
    const legDesc = legMarkings
      .map((leg) => `${leg.marking} on ${leg.leg} leg`)
      .join(", ");
    markingDescriptions.push(legDesc);
  }

  if (markingDescriptions.length > 0) {
    description += ` with ${markingDescriptions.join(" and ")}`;
  }

  return description;
}

// Generate AI prompt for realistic horse image
export function generateHorseImagePrompt(
  genetics: HorseGenetics,
  options: ImageGenerationOptions = {},
): string {
  const {
    style = "realistic",
    pose = "standing",
    background = "pasture",
    lighting = "golden hour",
    angle = "side profile",
  } = options;

  // Base description
  const baseDescription = generateDetailedDescription(genetics);

  // Color details
  const colorDetails = generateColorDescription(genetics);

  // Physical details
  const physicalDetails = generatePhysicalDescription(genetics);

  // Markings details
  const markingsDetails = generateMarkingsDescription(genetics.markings);

  // Fantasy elements
  const fantasyDetails = generateFantasyDescription(genetics);

  // Pose and setting
  const poseDescription = generatePoseDescription(pose, angle);
  const backgroundDescription = generateBackgroundDescription(background);
  const lightingDescription = generateLightingDescription(lighting);

  // Style instructions
  const styleInstructions = generateStyleInstructions(style);

  // Combine all elements
  const prompt = [
    `${baseDescription}.`,
    colorDetails,
    physicalDetails,
    markingsDetails,
    fantasyDetails,
    poseDescription,
    backgroundDescription,
    lightingDescription,
    styleInstructions,
    "Highly detailed, professional quality, no human riders, no text or watermarks",
  ]
    .filter(Boolean)
    .join(" ");

  return prompt;
}

function generateColorDescription(genetics: HorseGenetics): string {
  const { genes, calculatedColor } = genetics;
  let description = `The horse has a beautiful ${calculatedColor} coat`;

  // Add specific color details
  if (calculatedColor.includes("dun")) {
    description +=
      " with primitive markings including dorsal stripe and leg barring";
  }

  if (calculatedColor.includes("champagne")) {
    description += " with metallic sheen and amber eyes";
  }

  if (calculatedColor.includes("silver")) {
    description += " with silver-dappled mane and tail";
  }

  if (
    calculatedColor.includes("cream") ||
    calculatedColor.includes("palomino") ||
    calculatedColor.includes("buckskin")
  ) {
    description += " with contrasting dark points on legs, mane, and tail";
  }

  if (
    calculatedColor.includes("appaloosa") ||
    calculatedColor.includes("leopard")
  ) {
    description += " with distinctive spotted pattern";
  }

  if (
    calculatedColor.includes("tobiano") ||
    calculatedColor.includes("overo")
  ) {
    description += " with bold white pinto markings";
  }

  if (genes.grey !== "N/N") {
    description += " showing grey gene expression";
  }

  return description + ".";
}

function generatePhysicalDescription(genetics: HorseGenetics): string {
  const { physical } = genetics;

  let description = "";

  // Breed-specific characteristics
  const breedCharacteristics: Record<string, string> = {
    Arabian:
      "with the distinctive dished face, arched neck, and high tail carriage typical of Arabians",
    Thoroughbred:
      "with the lean, athletic build and refined features of a Thoroughbred",
    "Quarter Horse":
      "with the muscular hindquarters and compact build characteristic of Quarter Horses",
    Friesian:
      "with the flowing mane and tail, feathered legs, and noble bearing of a Friesian",
    Clydesdale:
      "with the massive build, feathered legs, and gentle expression of a Clydesdale",
    Mustang:
      "with the hardy, wild appearance and alert expression of a Mustang",
    "Paint Horse":
      "with the sturdy Quarter Horse build typical of Paint Horses",
    Appaloosa:
      "with the lean build and alert expression characteristic of Appaloosas",
  };

  if (breedCharacteristics[physical.breed]) {
    description += breedCharacteristics[physical.breed];
  }

  // Age-related features
  if (physical.age < 3) {
    description += ", showing youthful proportions and playful demeanor";
  } else if (physical.age > 15) {
    description += ", displaying the wisdom and dignity of an older horse";
  }

  return description;
}

function generateMarkingsDescription(markings: HorseMarkings): string {
  const details: string[] = [];

  // Face markings
  const faceDescriptions: Record<string, string> = {
    star: "a small white star on the forehead",
    snip: "a white snip on the muzzle",
    stripe: "a narrow white stripe down the face",
    blaze: "a bold white blaze down the face",
    baldFace: "extensive white markings covering most of the face",
  };

  if (markings.faceMarking !== "none") {
    details.push(faceDescriptions[markings.faceMarking]);
  }

  // Leg markings
  const legDescriptions: Record<string, string> = {
    coronet: "coronet markings",
    pastern: "white pastern markings",
    sock: "white sock markings",
    stocking: "white stocking markings",
  };

  const legMarkings = [
    markings.leftFront,
    markings.rightFront,
    markings.leftHind,
    markings.rightHind,
  ].filter((marking) => marking !== "none");

  if (legMarkings.length > 0) {
    const uniqueMarkings = [...new Set(legMarkings)];
    details.push(
      `${uniqueMarkings.map((m) => legDescriptions[m]).join(" and ")} on the legs`,
    );
  }

  return details.length > 0
    ? `The horse displays ${details.join(" and ")}.`
    : "";
}

function generateFantasyDescription(genetics: HorseGenetics): string {
  const { genes } = genetics;
  const fantasyElements: string[] = [];

  if (genes.unicorn && genes.unicorn !== "N/N") {
    fantasyElements.push("a spiraling horn emerging from the forehead");
  }

  if (genes.pegasus && genes.pegasus !== "N/N") {
    fantasyElements.push("magnificent feathered wings");
  }

  if (genes.mythicGlow && genes.mythicGlow !== "N/N") {
    fantasyElements.push("a subtle bioluminescent glow in the mane and tail");
  }

  return fantasyElements.length > 0
    ? `Fantasy elements include ${fantasyElements.join(" and ")}.`
    : "";
}

function generatePoseDescription(pose: string, angle: string): string {
  const poseDescriptions: Record<string, string> = {
    standing: "standing alert and proud",
    running: "galloping with powerful stride",
    grazing: "peacefully grazing with head lowered",
    portrait: "posed for a portrait shot",
    action: "captured in dynamic motion",
  };

  const angleDescriptions: Record<string, string> = {
    "side profile": "shown in perfect side profile",
    "three quarter": "photographed at a three-quarter angle",
    "front view": "facing directly toward the camera",
    "rear view": "photographed from behind",
  };

  return `The horse is ${poseDescriptions[pose]}, ${angleDescriptions[angle]}.`;
}

function generateBackgroundDescription(background: string): string {
  const backgroundDescriptions: Record<string, string> = {
    pasture: "Set in a lush green pasture with rolling hills",
    stable: "Positioned in front of a rustic wooden stable",
    mountains: "Against a backdrop of majestic mountains",
    beach: "On a pristine beach with ocean waves",
    forest: "In a peaceful forest clearing",
    plain: "On an open plain with vast sky",
  };

  return backgroundDescriptions[background] + ".";
}

function generateLightingDescription(lighting: string): string {
  const lightingDescriptions: Record<string, string> = {
    "golden hour": "Bathed in warm golden hour lighting",
    overcast: "Under soft, even overcast lighting",
    "bright sun": "In bright, clear sunlight",
    dramatic: "With dramatic, moody lighting",
    soft: "In gentle, diffused lighting",
  };

  return lightingDescriptions[lighting] + ".";
}

function generateStyleInstructions(style: string): string {
  const styleInstructions: Record<string, string> = {
    realistic: "Photorealistic style with perfect anatomical accuracy",
    painterly: "Classical oil painting style with rich brushwork",
    photographic: "Professional photography with perfect composition",
    artistic: "Artistic interpretation with enhanced colors and details",
  };

  return styleInstructions[style] + ".";
}

// Generate multiple image variations
export function generateImageVariations(
  genetics: HorseGenetics,
  count: number = 4,
): string[] {
  const poses = ["standing", "running", "grazing", "portrait"] as const;
  const angles = ["side profile", "three quarter", "front view"] as const;
  const backgrounds = ["pasture", "stable", "mountains", "forest"] as const;
  const lightings = ["golden hour", "bright sun", "soft", "dramatic"] as const;

  const prompts: string[] = [];

  for (let i = 0; i < count; i++) {
    const options: ImageGenerationOptions = {
      pose: poses[i % poses.length],
      angle: angles[i % angles.length],
      background: backgrounds[i % backgrounds.length],
      lighting: lightings[i % lightings.length],
      style: "realistic",
    };

    prompts.push(generateHorseImagePrompt(genetics, options));
  }

  return prompts;
}

// Mock image generation function (replace with actual AI service)
export async function generateHorseImage(prompt: string): Promise<string> {
  // This would integrate with actual AI image generation services like:
  // - DALL-E
  // - Midjourney
  // - Stable Diffusion
  // - Custom trained models

  console.log("Generating image with prompt:", prompt);

  // For now, return a placeholder
  return `https://api.placeholder.com/800x600/horse-image?seed=${encodeURIComponent(prompt.slice(0, 50))}`;
}

// Batch generate images
export async function generateHorseImages(
  genetics: HorseGenetics,
  options: ImageGenerationOptions[] = [],
): Promise<string[]> {
  const defaultOptions =
    options.length > 0
      ? options
      : [
          {
            pose: "standing",
            angle: "side profile",
            background: "pasture",
            lighting: "golden hour",
          },
          {
            pose: "portrait",
            angle: "three quarter",
            background: "stable",
            lighting: "soft",
          },
          {
            pose: "running",
            angle: "side profile",
            background: "mountains",
            lighting: "dramatic",
          },
          {
            pose: "grazing",
            angle: "three quarter",
            background: "forest",
            lighting: "bright sun",
          },
        ];

  const promises = defaultOptions.map((option) => {
    const prompt = generateHorseImagePrompt(genetics, option);
    return generateHorseImage(prompt);
  });

  return Promise.all(promises);
}
