import { Animal, Breeding } from "@shared/schema";

// Real genetic loci definitions for horses and dogs
export interface GeneticLocus {
  name: string;
  symbol: string;
  alleles: string[];
  type: 'dominant' | 'recessive' | 'codominant' | 'incomplete_dominant' | 'lethal_combo';
  species: 'horse' | 'dog' | 'both';
  chromosome?: string;
  effects: {
    [allele: string]: {
      color?: string;
      pattern?: string;
      health_risk?: number;
      stats?: { [stat: string]: number };
      special?: string[];
    };
  };
}

// Comprehensive genetic loci database
export const GENETIC_LOCI: { [key: string]: GeneticLocus } = {
  // HORSE COLOR GENETICS
  EXTENSION: {
    name: "Extension",
    symbol: "E",
    alleles: ['E', 'e'],
    type: 'dominant',
    species: 'horse',
    chromosome: 'MC1R',
    effects: {
      'E': { color: 'black_base', special: ['allows_black_pigment'] },
      'e': { color: 'red_base', special: ['chestnut_base'] }
    }
  },

  AGOUTI: {
    name: "Agouti",
    symbol: "A",
    alleles: ['A', 'At', 'a'],
    type: 'dominant',
    species: 'horse',
    chromosome: 'ASIP',
    effects: {
      'A': { color: 'bay', pattern: 'points_restriction' },
      'At': { color: 'seal_brown', pattern: 'limited_points' },
      'a': { color: 'black', pattern: 'uniform_black' }
    }
  },

  CREAM: {
    name: "Cream",
    symbol: "Cr",
    alleles: ['C', 'Cr'],
    type: 'incomplete_dominant',
    species: 'horse',
    chromosome: 'SLC45A2',
    effects: {
      'C': { color: 'no_dilution' },
      'Cr': { color: 'cream_dilution', special: ['single_cream'] }
    }
  },

  DUN: {
    name: "Dun",
    symbol: "D",
    alleles: ['D', 'd'],
    type: 'dominant',
    species: 'horse',
    effects: {
      'D': { color: 'dun_dilution', pattern: 'primitive_markings', special: ['dorsal_stripe', 'leg_barring'] },
      'd': { color: 'no_dun' }
    }
  },

  GREY: {
    name: "Grey",
    symbol: "G",
    alleles: ['G', 'g'],
    type: 'dominant',
    species: 'horse',
    effects: {
      'G': { color: 'progressive_greying', special: ['age_related_whitening'] },
      'g': { color: 'no_grey' }
    }
  },

  SILVER: {
    name: "Silver",
    symbol: "Z",
    alleles: ['Z', 'z'],
    type: 'dominant',
    species: 'horse',
    effects: {
      'Z': { color: 'silver_mane_tail', special: ['requires_black_base'] },
      'z': { color: 'no_silver' }
    }
  },

  TOBIANO: {
    name: "Tobiano",
    symbol: "TO",
    alleles: ['TO', 'to'],
    type: 'dominant',
    species: 'horse',
    effects: {
      'TO': { pattern: 'tobiano_white', special: ['rounded_white_patches'] },
      'to': { pattern: 'solid' }
    }
  },

  LEOPARD_COMPLEX: {
    name: "Leopard Complex",
    symbol: "Lp",
    alleles: ['Lp', 'lp'],
    type: 'incomplete_dominant',
    species: 'horse',
    effects: {
      'Lp': { pattern: 'appaloosa_base', special: ['requires_modifiers'] },
      'lp': { pattern: 'solid' }
    }
  },

  // DOG COLOR GENETICS
  DOG_EXTENSION: {
    name: "Extension (Dog)",
    symbol: "E",
    alleles: ['E', 'e'],
    type: 'recessive',
    species: 'dog',
    effects: {
      'E': { color: 'allows_dark_pigment' },
      'e': { color: 'recessive_red', special: ['yellow_lab', 'golden_retriever'] }
    }
  },

  DOG_K_LOCUS: {
    name: "K Locus",
    symbol: "K",
    alleles: ['KB', 'Kbr', 'ky'],
    type: 'dominant',
    species: 'dog',
    effects: {
      'KB': { color: 'solid_black', special: ['dominant_black'] },
      'Kbr': { pattern: 'brindle', special: ['striped_pattern'] },
      'ky': { color: 'allows_agouti' }
    }
  },

  DOG_B_LOCUS: {
    name: "B Locus (Liver)",
    symbol: "B",
    alleles: ['B', 'b'],
    type: 'recessive',
    species: 'dog',
    effects: {
      'B': { color: 'black_pigment' },
      'b': { color: 'liver_brown', special: ['chocolate_lab'] }
    }
  },

  DOG_D_LOCUS: {
    name: "D Locus (Dilution)",
    symbol: "D",
    alleles: ['D', 'd'],
    type: 'recessive',
    species: 'dog',
    effects: {
      'D': { color: 'normal_intensity' },
      'd': { color: 'dilute', special: ['blue_coat', 'fawn'] }
    }
  },

  DOG_MERLE: {
    name: "Merle",
    symbol: "M",
    alleles: ['M', 'm'],
    type: 'lethal_combo',
    species: 'dog',
    effects: {
      'M': { pattern: 'merle_dapple', health_risk: 0 },
      'm': { pattern: 'solid' }
    }
  },

  DOG_S_LOCUS: {
    name: "S Locus (Piebald)",
    symbol: "S",
    alleles: ['S', 'sp', 'sw'],
    type: 'incomplete_dominant',
    species: 'dog',
    effects: {
      'S': { pattern: 'solid' },
      'sp': { pattern: 'piebald_white', special: ['white_patches'] },
      'sw': { pattern: 'extreme_white', special: ['mostly_white'] }
    }
  }
};

// Genetic health conditions
export const GENETIC_CONDITIONS: { [key: string]: any } = {
  // HORSE CONDITIONS
  HERDA: {
    name: "Hereditary Equine Regional Dermal Asthenia",
    type: 'recessive',
    species: 'horse',
    breeds: ['Quarter Horse', 'Paint Horse'],
    carrier_risk: 0,
    affected_risk: 90,
    description: "Skin fragility condition"
  },

  SCID: {
    name: "Severe Combined Immunodeficiency",
    type: 'recessive',
    species: 'horse',
    breeds: ['Arabian'],
    carrier_risk: 0,
    affected_risk: 100,
    lethal: true,
    description: "Fatal immune deficiency"
  },

  PSSM1: {
    name: "Polysaccharide Storage Myopathy Type 1",
    type: 'dominant',
    species: 'horse',
    breeds: ['Quarter Horse', 'Draft breeds'],
    heterozygous_risk: 50,
    homozygous_risk: 90,
    description: "Muscle disorder affecting performance"
  },

  HYPP: {
    name: "Hyperkalemic Periodic Paralysis",
    type: 'dominant',
    species: 'horse',
    breeds: ['Quarter Horse'],
    heterozygous_risk: 60,
    homozygous_risk: 95,
    description: "Muscle membrane disorder"
  },

  // DOG CONDITIONS (Breed-specific)
  HIP_DYSPLASIA: {
    name: "Hip Dysplasia",
    type: 'polygenic',
    species: 'dog',
    breeds: ['German Shepherd', 'Labrador', 'Golden Retriever'],
    risk_factors: ['large_breed', 'rapid_growth'],
    description: "Hip joint malformation"
  },

  PRA: {
    name: "Progressive Retinal Atrophy",
    type: 'recessive',
    species: 'dog',
    breeds: ['Labrador', 'Poodle', 'Cocker Spaniel'],
    affected_risk: 80,
    description: "Progressive blindness"
  },

  MDR1: {
    name: "Multi-Drug Resistance 1",
    type: 'recessive',
    species: 'dog',
    breeds: ['Border Collie', 'Australian Shepherd'],
    affected_risk: 90,
    description: "Drug sensitivity"
  },

  EIC: {
    name: "Exercise Induced Collapse",
    type: 'recessive',
    species: 'dog',
    breeds: ['Labrador'],
    affected_risk: 70,
    description: "Collapse during intense exercise"
  }
};

// Temperament traits
export const TEMPERAMENT_TRAITS = {
  horse: ['Bold', 'Timid', 'Hot-blooded', 'Calm', 'Curious', 'Flighty', 'Spirited', 'Lazy'],
  dog: ['Loyal', 'Protective', 'Prey-Driven', 'Energetic', 'Stubborn', 'Gentle', 'Alert', 'Independent']
};

export class AdvancedGeneticsEngine {
  
  // Generate genetic string (e.g., "Ee Aa Crcr nT")
  static generateGeneticString(species: 'horse' | 'dog', parentA?: Animal, parentB?: Animal): string {
    const relevantLoci = Object.values(GENETIC_LOCI).filter(locus => 
      locus.species === species || locus.species === 'both'
    );
    
    const geneticPairs: string[] = [];
    
    relevantLoci.forEach(locus => {
      let genotype: [string, string];
      
      if (parentA && parentB) {
        // Inherit from parents
        const parentAGenotype = this.parseLocusFromString(parentA.geneticString || '', locus.symbol) 
          || this.generateRandomGenotype(locus);
        const parentBGenotype = this.parseLocusFromString(parentB.geneticString || '', locus.symbol) 
          || this.generateRandomGenotype(locus);
        
        genotype = this.inheritAlleles(parentAGenotype, parentBGenotype, locus);
      } else {
        // Generate random for foundation animals
        genotype = this.generateRandomGenotype(locus);
      }
      
      // Format genotype (e.g., "Ee", "CrCr", "nTO")
      const formattedGenotype = this.formatGenotype(genotype, locus);
      geneticPairs.push(formattedGenotype);
    });
    
    return geneticPairs.join(' ');
  }

  // Parse specific locus from genetic string
  static parseLocusFromString(geneticString: string, locusSymbol: string): [string, string] | null {
    const patterns = [
      new RegExp(`\\b${locusSymbol}${locusSymbol}\\b`), // Homozygous dominant
      new RegExp(`\\b${locusSymbol}[a-z]\\b`), // Heterozygous
      new RegExp(`\\b[a-z][a-z]\\b`), // Homozygous recessive
      new RegExp(`\\bn${locusSymbol}\\b`) // Heterozygous with n notation
    ];
    
    // This is simplified - would need more complex parsing for real genetic strings
    return null;
  }

  // Generate random genotype for a locus
  static generateRandomGenotype(locus: GeneticLocus): [string, string] {
    const alleles = locus.alleles;
    const allele1 = alleles[Math.floor(Math.random() * alleles.length)];
    const allele2 = alleles[Math.floor(Math.random() * alleles.length)];
    return [allele1, allele2];
  }

  // Inherit alleles from parents with potential mutations
  static inheritAlleles(
    parentA: [string, string], 
    parentB: [string, string], 
    locus: GeneticLocus,
    mutationRate: number = 0.001
  ): [string, string] {
    const alleleFromA = parentA[Math.floor(Math.random() * 2)];
    const alleleFromB = parentB[Math.floor(Math.random() * 2)];
    
    let offspring: [string, string] = [alleleFromA, alleleFromB];
    
    // Apply mutations
    if (Math.random() < mutationRate) {
      const mutationIndex = Math.floor(Math.random() * 2);
      offspring[mutationIndex] = this.generateMutation(offspring[mutationIndex], locus);
    }
    
    return offspring;
  }

  // Generate mutation
  static generateMutation(originalAllele: string, locus: GeneticLocus): string {
    const possibleAlleles = locus.alleles.filter(a => a !== originalAllele);
    return possibleAlleles[Math.floor(Math.random() * possibleAlleles.length)] || originalAllele;
  }

  // Format genotype for display (e.g., "Ee", "nTO")
  static formatGenotype(genotype: [string, string], locus: GeneticLocus): string {
    const [allele1, allele2] = genotype.sort();
    
    // Special formatting for certain loci
    if (locus.symbol === 'TO' && (allele1 === 'TO' || allele2 === 'TO')) {
      return allele1 === allele2 ? 'TOTO' : 'nTO';
    }
    
    if (allele1 === allele2) {
      return allele1 + allele1;
    }
    
    return allele1 + allele2;
  }

  // Calculate coat color from genetic string
  static calculateCoatColor(geneticString: string, species: 'horse' | 'dog'): any {
    const colorResult = {
      base_color: '',
      dilutions: [] as string[],
      patterns: [] as string[],
      description: '',
      rarity: 'common'
    };

    if (species === 'horse') {
      return this.calculateHorseColor(geneticString);
    } else {
      return this.calculateDogColor(geneticString);
    }
  }

  // Calculate horse color from genetics
  static calculateHorseColor(geneticString: string): any {
    // This would parse the genetic string and apply color rules
    // Simplified example:
    
    const hasE = geneticString.includes('E');
    const hasA = geneticString.includes('A');
    const hasCr = geneticString.includes('Cr');
    const hasG = geneticString.includes('G');
    const hasTO = geneticString.includes('TO');
    
    let baseColor = '';
    let patterns = [];
    let dilutions = [];
    
    // Base color determination
    if (!hasE) {
      baseColor = 'Chestnut';
    } else if (hasA) {
      baseColor = 'Bay';
    } else {
      baseColor = 'Black';
    }
    
    // Apply dilutions
    if (hasCr) {
      const crCount = (geneticString.match(/Cr/g) || []).length;
      if (crCount === 1) {
        if (baseColor === 'Chestnut') dilutions.push('Palomino');
        else if (baseColor === 'Bay') dilutions.push('Buckskin');
        else if (baseColor === 'Black') dilutions.push('Smoky Black');
      } else if (crCount === 2) {
        dilutions.push('Cremello/Perlino');
      }
    }
    
    // Apply patterns
    if (hasTO) patterns.push('Tobiano');
    if (hasG) patterns.push('Grey');
    
    return {
      base_color: baseColor,
      dilutions,
      patterns,
      description: this.generateColorDescription(baseColor, dilutions, patterns),
      rarity: this.calculateRarity(dilutions, patterns)
    };
  }

  // Calculate dog color from genetics
  static calculateDogColor(geneticString: string): any {
    // Similar logic for dog color genetics
    return {
      base_color: 'Black',
      patterns: [],
      description: 'Solid black coat',
      rarity: 'common'
    };
  }

  // Generate color description
  static generateColorDescription(baseColor: string, dilutions: string[], patterns: string[]): string {
    let description = baseColor;
    
    if (dilutions.length > 0) {
      description = dilutions.join(' ') + ' (' + baseColor + ' base)';
    }
    
    if (patterns.length > 0) {
      description += ' with ' + patterns.join(' and ');
    }
    
    return description;
  }

  // Calculate color rarity
  static calculateRarity(dilutions: string[], patterns: string[]): string {
    const rarityScore = dilutions.length + patterns.length;
    
    if (rarityScore === 0) return 'common';
    if (rarityScore === 1) return 'uncommon';
    if (rarityScore === 2) return 'rare';
    return 'very_rare';
  }

  // Calculate breeding compatibility
  static calculateBreedingCompatibility(mother: Animal, father: Animal): any {
    const compatibility = {
      genetic_diversity: this.calculateGeneticDiversity(mother, father),
      inbreeding_coefficient: this.calculateInbreedingCoefficient(mother, father),
      health_risks: this.assessHealthRisks(mother, father),
      color_predictions: this.predictOffspringColors(mother, father),
      stat_predictions: this.predictOffspringStats(mother, father),
      temperament_predictions: this.predictOffspringTemperament(mother, father),
      breeding_value: 0,
      recommendations: [] as string[]
    };
    
    compatibility.breeding_value = this.calculateBreedingValue(compatibility);
    compatibility.recommendations = this.generateBreedingRecommendations(compatibility);
    
    return compatibility;
  }

  // Calculate genetic diversity between two animals
  static calculateGeneticDiversity(mother: Animal, father: Animal): number {
    if (!mother.geneticString || !father.geneticString) return 0;
    
    // Compare genetic strings and calculate diversity score
    const motherAlleles = this.extractAlleles(mother.geneticString);
    const fatherAlleles = this.extractAlleles(father.geneticString);
    
    let sharedAlleles = 0;
    let totalAlleles = 0;
    
    Object.keys(motherAlleles).forEach(locus => {
      if (fatherAlleles[locus]) {
        totalAlleles += 4; // 2 alleles per parent
        const motherSet = new Set(motherAlleles[locus]);
        const fatherSet = new Set(fatherAlleles[locus]);
                 const intersection = new Set(Array.from(motherSet).filter(x => fatherSet.has(x)));
        sharedAlleles += intersection.size * 2; // Count shared alleles
      }
    });
    
    return totalAlleles > 0 ? 1 - (sharedAlleles / totalAlleles) : 0;
  }

  // Extract alleles from genetic string
  static extractAlleles(geneticString: string): { [locus: string]: string[] } {
    // Parse genetic string and extract alleles for each locus
    // This is simplified - would need proper genetic string parsing
    return {};
  }

  // Calculate inbreeding coefficient
  static calculateInbreedingCoefficient(mother: Animal, father: Animal): number {
    // Simplified calculation based on pedigree analysis
    // In a real implementation, this would trace back through generations
    
    if (!mother.pedigree || !father.pedigree) return 0;
    
    // Check for common ancestors in the first few generations
    let inbreedingCoeff = 0;
    
    // This would require a proper pedigree analysis algorithm
    // For now, return a simplified estimate
    return Math.min(inbreedingCoeff, 1);
  }

  // Assess health risks from breeding pair
  static assessHealthRisks(mother: Animal, father: Animal): any {
    const risks = {
      genetic_diseases: [] as string[],
      carrier_risks: [] as string[],
      lethal_combinations: [] as string[],
      overall_risk_score: 0
    };
    
    const species = mother.type === 'horse' ? 'horse' : 'dog';
    const relevantConditions = Object.values(GENETIC_CONDITIONS).filter(
      condition => condition.species === species
    );
    
    relevantConditions.forEach(condition => {
      const motherStatus = this.getGeneticStatus(mother, condition);
      const fatherStatus = this.getGeneticStatus(father, condition);
      
      if (condition.type === 'recessive') {
        if (motherStatus === 'carrier' && fatherStatus === 'carrier') {
          risks.genetic_diseases.push(`25% risk of ${condition.name}`);
          risks.overall_risk_score += 25;
        }
      } else if (condition.type === 'lethal_combo') {
        if (motherStatus === 'affected' && fatherStatus === 'affected') {
          risks.lethal_combinations.push(`25% lethal ${condition.name}`);
          risks.overall_risk_score += 50;
        }
      }
    });
    
    return risks;
  }

  // Get genetic status for a condition
  static getGeneticStatus(animal: Animal, condition: any): 'normal' | 'carrier' | 'affected' {
    // This would parse the animal's genetic testing results
    // For now, return a random status for demonstration
    const rand = Math.random();
    if (rand < 0.1) return 'affected';
    if (rand < 0.3) return 'carrier';
    return 'normal';
  }

  // Predict offspring colors
  static predictOffspringColors(mother: Animal, father: Animal): any {
    if (!mother.geneticString || !father.geneticString) {
      return { possible_colors: [], probabilities: {} };
    }
    
    // Generate 100 theoretical offspring to calculate probabilities
    const colorCounts: { [color: string]: number } = {};
    
    for (let i = 0; i < 100; i++) {
      const offspringGenetics = this.generateGeneticString(
        mother.type === 'horse' ? 'horse' : 'dog',
        mother,
        father
      );
      
      const color = this.calculateCoatColor(
        offspringGenetics,
        mother.type === 'horse' ? 'horse' : 'dog'
      );
      
      const colorKey = color.description;
      colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
    }
    
    const probabilities: { [color: string]: number } = {};
    Object.keys(colorCounts).forEach(color => {
      probabilities[color] = colorCounts[color] / 100;
    });
    
    return {
      possible_colors: Object.keys(colorCounts),
      probabilities
    };
  }

  // Predict offspring stats with epigenetic factors
  static predictOffspringStats(mother: Animal, father: Animal): any {
    const motherStats = {
      strength: mother.strength || 50,
      speed: mother.speed || 50,
      agility: mother.agility || 50,
      endurance: mother.endurance || 50,
      show_aptitude: mother.showAptitude || 50
    };
    
    const fatherStats = {
      strength: father.strength || 50,
      speed: father.speed || 50,
      agility: father.agility || 50,
      endurance: father.endurance || 50,
      show_aptitude: father.showAptitude || 50
    };
    
    const baseStats: any = {};
    Object.keys(motherStats).forEach(stat => {
      baseStats[stat] = (motherStats[stat as keyof typeof motherStats] + 
                       fatherStats[stat as keyof typeof fatherStats]) / 2;
    });
    
    // Apply epigenetic factors
    const epigeneticBonus = this.calculateEpigeneticBonus(mother, father);
    const hybridVigor = this.calculateHybridVigor(mother, father);
    const inbreedingPenalty = this.calculateInbreedingPenalty(mother, father);
    
    Object.keys(baseStats).forEach(stat => {
      baseStats[stat] += epigeneticBonus + hybridVigor - inbreedingPenalty;
      baseStats[stat] = Math.max(0, Math.min(100, baseStats[stat])); // Clamp to 0-100
    });
    
    return {
      predicted_stats: baseStats,
      epigenetic_bonus: epigeneticBonus,
      hybrid_vigor: hybridVigor,
      inbreeding_penalty: inbreedingPenalty,
      stat_range: this.calculateStatRange(baseStats)
    };
  }

  // Calculate epigenetic bonus based on parent care and training
  static calculateEpigeneticBonus(mother: Animal, father: Animal): number {
    let bonus = 0;
    
    // Mother's health and stress level affects offspring
    if (mother.health && mother.health > 80) bonus += 3;
    if (mother.mood && mother.mood > 80) bonus += 2;
    if (mother.training && mother.training > 50) bonus += 2;
    
    // Father's training level
    if (father.training && father.training > 50) bonus += 1;
    
    return Math.min(bonus, 10); // Cap at +10
  }

  // Calculate hybrid vigor bonus
  static calculateHybridVigor(mother: Animal, father: Animal): number {
    const diversity = this.calculateGeneticDiversity(mother, father);
    return Math.floor(diversity * 5); // Up to +5 for maximum diversity
  }

  // Calculate inbreeding penalty
  static calculateInbreedingPenalty(mother: Animal, father: Animal): number {
    const inbreedingCoeff = this.calculateInbreedingCoefficient(mother, father);
    if (inbreedingCoeff > 0.125) { // >12.5% inbreeding
      return Math.floor(inbreedingCoeff * 20); // Penalty up to -20
    }
    return 0;
  }

  // Calculate stat range for offspring
  static calculateStatRange(baseStats: any): any {
    const ranges: any = {};
    Object.keys(baseStats).forEach(stat => {
      const base = baseStats[stat];
      ranges[stat] = {
        min: Math.max(0, base - 10),
        max: Math.min(100, base + 10),
        most_likely: base
      };
    });
    return ranges;
  }

  // Predict offspring temperament
  static predictOffspringTemperament(mother: Animal, father: Animal): any {
    const species = mother.type === 'horse' ? 'horse' : 'dog';
    const possibleTraits = TEMPERAMENT_TRAITS[species];
    
    const motherTemperament = mother.temperament || possibleTraits[0];
    const fatherTemperament = father.temperament || possibleTraits[0];
    
    const predictions = {
      primary_traits: [] as string[],
      probabilities: {} as { [trait: string]: number },
      inheritance_pattern: ''
    };
    
    // If parents have same temperament, higher chance of inheritance
    if (motherTemperament === fatherTemperament) {
      predictions.primary_traits = [motherTemperament];
      predictions.probabilities[motherTemperament] = 0.7;
      predictions.inheritance_pattern = 'Strong inheritance from both parents';
    } else {
      predictions.primary_traits = [motherTemperament, fatherTemperament];
      predictions.probabilities[motherTemperament] = 0.4;
      predictions.probabilities[fatherTemperament] = 0.4;
      predictions.probabilities['Blend'] = 0.2;
      predictions.inheritance_pattern = 'Mixed traits from both parents';
    }
    
    return predictions;
  }

  // Calculate overall breeding value
  static calculateBreedingValue(compatibility: any): number {
    let value = 50; // Base value
    
    // Genetic diversity bonus
    value += compatibility.genetic_diversity * 30;
    
    // Health penalty
    value -= compatibility.health_risks.overall_risk_score * 0.5;
    
    // Inbreeding penalty
    value -= compatibility.inbreeding_coefficient * 50;
    
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  // Generate breeding recommendations
  static generateBreedingRecommendations(compatibility: any): string[] {
    const recommendations: string[] = [];
    
    if (compatibility.health_risks.overall_risk_score > 50) {
      recommendations.push('⚠️ HIGH HEALTH RISK: Consider alternative breeding partners');
    } else if (compatibility.health_risks.overall_risk_score > 25) {
      recommendations.push('⚠️ MODERATE HEALTH RISK: Genetic testing recommended');
    } else {
      recommendations.push('✅ LOW HEALTH RISK: Suitable for breeding');
    }
    
    if (compatibility.genetic_diversity < 0.3) {
      recommendations.push('🧬 LOW DIVERSITY: Consider outcrossing to unrelated lines');
    } else if (compatibility.genetic_diversity > 0.7) {
      recommendations.push('🧬 EXCELLENT DIVERSITY: Ideal breeding pair');
    }
    
    if (compatibility.inbreeding_coefficient > 0.125) {
      recommendations.push('⚠️ INBREEDING DETECTED: >12.5% coefficient detected');
    }
    
    if (compatibility.health_risks.lethal_combinations.length > 0) {
      recommendations.push('🚨 LETHAL COMBINATION RISK: Do not breed this pair');
    }
    
    recommendations.push('🧪 DNA testing recommended for both parents');
    recommendations.push('📋 Ensure current health certificates');
    
    return recommendations;
  }
}

// Breeding types and premium services
export const BREEDING_SERVICES = {
  STANDARD: {
    name: 'Standard Breeding',
    cost: 500,
    cooldown_hours: 336, // 14 days
    success_rate: 0.8,
    description: 'Natural breeding with standard success rates'
  },
  
  AI_BREEDING: {
    name: 'Artificial Insemination',
    cost: 1200,
    cooldown_hours: 168, // 7 days
    success_rate: 0.9,
    description: 'Higher success rate, reduced cooldown'
  },
  
  EMBRYO_TRANSFER: {
    name: 'Embryo Transfer',
    cost: 2500,
    cooldown_hours: 72, // 3 days
    success_rate: 0.95,
    description: 'Premium service with minimal mare downtime'
  },
  
  FROZEN_SEMEN: {
    name: 'Frozen Semen Breeding',
    cost: 800,
    cooldown_hours: 168,
    success_rate: 0.75,
    description: 'Breed with stored genetics from deceased or distant stallions'
  },
  
  CLONING: {
    name: 'Genetic Cloning',
    cost: 10000,
    cooldown_hours: 720, // 30 days
    success_rate: 0.6,
    description: 'Create genetic duplicate (premium members only)'
  }
};