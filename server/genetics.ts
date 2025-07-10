import { Animal, Breeding } from "@shared/schema";

// Genetic trait definitions
export interface GeneticTrait {
  name: string;
  type: 'dominant' | 'recessive' | 'codominant' | 'polygenic' | 'sex_linked';
  alleles: string[];
  effects: {
    [allele: string]: {
      stats?: { [stat: string]: number };
      health?: { [condition: string]: number };
      appearance?: { [feature: string]: any };
      special?: string[];
    };
  };
  expressionPattern?: string; // for complex inheritance
  chromosomeLocation?: string;
}

// Comprehensive genetic trait database
export const GENETIC_TRAITS: { [key: string]: GeneticTrait } = {
  // Coat Color Genes
  EXTENSION: {
    name: "Extension (Black/Red)",
    type: 'dominant',
    alleles: ['E', 'e'],
    effects: {
      'E': { appearance: { baseColor: 'black_based' } },
      'e': { appearance: { baseColor: 'red_based' } }
    },
    chromosomeLocation: 'MC1R'
  },
  
  AGOUTI: {
    name: "Agouti (Banding Pattern)",
    type: 'dominant',
    alleles: ['A', 'At', 'a'],
    effects: {
      'A': { appearance: { pattern: 'wild_type_banding' } },
      'At': { appearance: { pattern: 'tan_points' } },
      'a': { appearance: { pattern: 'solid' } }
    },
    chromosomeLocation: 'ASIP'
  },

  CREAM: {
    name: "Cream Dilution",
    type: 'codominant',
    alleles: ['C', 'Ccr'],
    effects: {
      'C': { appearance: { dilution: 'none' } },
      'Ccr': { appearance: { dilution: 'cream' } }
    },
    chromosomeLocation: 'SLC45A2'
  },

  DUN: {
    name: "Dun Factor",
    type: 'dominant',
    alleles: ['D', 'd'],
    effects: {
      'D': { appearance: { primitive_markings: true, dilution: 'dun' } },
      'd': { appearance: { primitive_markings: false } }
    }
  },

  // Performance Genes
  MYOSTATIN: {
    name: "Myostatin (Muscle Development)",
    type: 'recessive',
    alleles: ['M', 'm'],
    effects: {
      'M': { stats: { strength: 0, speed: 5 } },
      'm': { stats: { strength: 15, speed: -3 }, health: { muscle_dystrophy: 5 } }
    },
    chromosomeLocation: 'MSTN'
  },

  ACTN3: {
    name: "Alpha-Actinin-3 (Speed Gene)",
    type: 'codominant',
    alleles: ['R', 'X'],
    effects: {
      'R': { stats: { speed: 8, endurance: -2 } },
      'X': { stats: { speed: -3, endurance: 6 } }
    },
    chromosomeLocation: 'ACTN3'
  },

  ACE: {
    name: "Angiotensin Converting Enzyme (Endurance)",
    type: 'codominant',
    alleles: ['I', 'D'],
    effects: {
      'I': { stats: { endurance: 10, speed: -2 } },
      'D': { stats: { speed: 5, endurance: -3 } }
    },
    chromosomeLocation: 'ACE'
  },

  // Health Genes
  MDR1: {
    name: "Multi-Drug Resistance 1",
    type: 'recessive',
    alleles: ['N', 'mut'],
    effects: {
      'N': { health: {} },
      'mut': { health: { drug_sensitivity: 80 }, special: ['medication_warning'] }
    },
    chromosomeLocation: 'ABCB1'
  },

  HERDA: {
    name: "Hereditary Equine Regional Dermal Asthenia",
    type: 'recessive',
    alleles: ['N', 'H'],
    effects: {
      'N': { health: {} },
      'H': { health: { skin_fragility: 90 }, special: ['breeding_restriction'] }
    }
  },

  SCID: {
    name: "Severe Combined Immunodeficiency",
    type: 'recessive',
    alleles: ['N', 'S'],
    effects: {
      'N': { health: {} },
      'S': { health: { immune_deficiency: 95 }, special: ['lethal'] }
    }
  },

  // Temperament Genes
  DRD4: {
    name: "Dopamine Receptor D4 (Curiosity)",
    type: 'polygenic',
    alleles: ['L', 'S'],
    effects: {
      'L': { stats: { intelligence: 5, focus: -3 } },
      'S': { stats: { intelligence: -2, focus: 8 } }
    }
  },

  // Size Genes
  LCORL: {
    name: "Height Gene",
    type: 'polygenic',
    alleles: ['T', 'C'],
    effects: {
      'T': { appearance: { height_modifier: 2 } },
      'C': { appearance: { height_modifier: -1 } }
    }
  }
};

// Genetic calculation engine
export class GeneticsEngine {
  
  // Generate random genotype for a trait
  static generateRandomGenotype(trait: GeneticTrait): [string, string] {
    const alleles = trait.alleles;
    const allele1 = alleles[Math.floor(Math.random() * alleles.length)];
    const allele2 = alleles[Math.floor(Math.random() * alleles.length)];
    return [allele1, allele2];
  }

  // Calculate offspring genotype from parent genotypes
  static calculateOffspringGenotype(
    parentA: [string, string], 
    parentB: [string, string],
    mutationRate: number = 0.001
  ): [string, string] {
    // Random selection from each parent
    const alleleFromA = parentA[Math.floor(Math.random() * 2)];
    const alleleFromB = parentB[Math.floor(Math.random() * 2)];
    
    let offspring: [string, string] = [alleleFromA, alleleFromB];
    
    // Apply mutations
    if (Math.random() < mutationRate) {
      const mutatedAlleleIndex = Math.floor(Math.random() * 2);
      offspring[mutatedAlleleIndex] = this.generateMutation(offspring[mutatedAlleleIndex]);
    }
    
    return offspring;
  }

  // Generate genetic mutations
  static generateMutation(originalAllele: string): string {
    // Common mutation patterns
    const mutations = [
      originalAllele + 'm', // Add mutation marker
      originalAllele.replace(/.$/, 'x'), // Replace last character
      'mut_' + originalAllele // Prefix mutation
    ];
    return mutations[Math.floor(Math.random() * mutations.length)];
  }

  // Calculate phenotype from genotype
  static calculatePhenotype(genotype: [string, string], trait: GeneticTrait): any {
    const [allele1, allele2] = genotype.sort(); // Sort for consistency
    
    switch (trait.type) {
      case 'dominant':
        return this.calculateDominantExpression(genotype, trait);
      case 'recessive':
        return this.calculateRecessiveExpression(genotype, trait);
      case 'codominant':
        return this.calculateCodominantExpression(genotype, trait);
      case 'polygenic':
        return this.calculatePolygenicExpression(genotype, trait);
      case 'sex_linked':
        return this.calculateSexLinkedExpression(genotype, trait);
      default:
        return trait.effects[allele1] || {};
    }
  }

  static calculateDominantExpression(genotype: [string, string], trait: GeneticTrait): any {
    const [allele1, allele2] = genotype;
    
    // Find the most dominant allele
    const dominanceOrder = trait.alleles;
    let dominantAllele = allele1;
    
    if (dominanceOrder.indexOf(allele2) < dominanceOrder.indexOf(allele1)) {
      dominantAllele = allele2;
    }
    
    return trait.effects[dominantAllele] || {};
  }

  static calculateRecessiveExpression(genotype: [string, string], trait: GeneticTrait): any {
    const [allele1, allele2] = genotype;
    
    // Recessive traits only express when homozygous
    if (allele1 === allele2) {
      return trait.effects[allele1] || {};
    }
    
    // Return wild type (first allele in array)
    return trait.effects[trait.alleles[0]] || {};
  }

  static calculateCodominantExpression(genotype: [string, string], trait: GeneticTrait): any {
    const [allele1, allele2] = genotype;
    
    // Blend effects from both alleles
    const effect1 = trait.effects[allele1] || {};
    const effect2 = trait.effects[allele2] || {};
    
    return this.blendEffects(effect1, effect2);
  }

  static calculatePolygenicExpression(genotype: [string, string], trait: GeneticTrait): any {
    const [allele1, allele2] = genotype;
    
    // Additive effects
    const effect1 = trait.effects[allele1] || {};
    const effect2 = trait.effects[allele2] || {};
    
    return this.additiveEffects(effect1, effect2);
  }

  static calculateSexLinkedExpression(genotype: [string, string], trait: GeneticTrait): any {
    // For now, treat as dominant (can be enhanced for actual sex determination)
    return this.calculateDominantExpression(genotype, trait);
  }

  // Blend two genetic effects
  static blendEffects(effect1: any, effect2: any): any {
    const result: any = {};
    
    // Blend stats
    if (effect1.stats || effect2.stats) {
      result.stats = {};
      const stats1 = effect1.stats || {};
      const stats2 = effect2.stats || {};
      
      const allStats = new Set([...Object.keys(stats1), ...Object.keys(stats2)]);
      allStats.forEach(stat => {
        result.stats[stat] = ((stats1[stat] || 0) + (stats2[stat] || 0)) / 2;
      });
    }
    
    // Blend appearance
    if (effect1.appearance || effect2.appearance) {
      result.appearance = { ...effect1.appearance, ...effect2.appearance };
    }
    
    // Combine health effects
    if (effect1.health || effect2.health) {
      result.health = { ...effect1.health, ...effect2.health };
    }
    
    // Combine special traits
    if (effect1.special || effect2.special) {
      result.special = [...(effect1.special || []), ...(effect2.special || [])];
    }
    
    return result;
  }

  // Add genetic effects
  static additiveEffects(effect1: any, effect2: any): any {
    const result: any = {};
    
    // Add stats
    if (effect1.stats || effect2.stats) {
      result.stats = {};
      const stats1 = effect1.stats || {};
      const stats2 = effect2.stats || {};
      
      const allStats = new Set([...Object.keys(stats1), ...Object.keys(stats2)]);
      allStats.forEach(stat => {
        result.stats[stat] = (stats1[stat] || 0) + (stats2[stat] || 0);
      });
    }
    
    // Other effects follow blend logic
    if (effect1.appearance || effect2.appearance) {
      result.appearance = { ...effect1.appearance, ...effect2.appearance };
    }
    
    if (effect1.health || effect2.health) {
      result.health = { ...effect1.health, ...effect2.health };
    }
    
    if (effect1.special || effect2.special) {
      result.special = [...(effect1.special || []), ...(effect2.special || [])];
    }
    
    return result;
  }

  // Generate complete genetic profile for an animal
  static generateGeneticProfile(parentA?: Animal, parentB?: Animal): any {
    const profile: any = {};
    
    Object.keys(GENETIC_TRAITS).forEach(traitName => {
      const trait = GENETIC_TRAITS[traitName];
      
      let genotype: [string, string];
      
      if (parentA && parentB) {
        // Inherit from parents
        const parentAGenotype = parentA.genetics[traitName] || this.generateRandomGenotype(trait);
        const parentBGenotype = parentB.genetics[traitName] || this.generateRandomGenotype(trait);
        genotype = this.calculateOffspringGenotype(parentAGenotype, parentBGenotype);
      } else {
        // Generate random for foundation animals
        genotype = this.generateRandomGenotype(trait);
      }
      
      profile[traitName] = {
        genotype,
        phenotype: this.calculatePhenotype(genotype, trait),
        trait: trait.name
      };
    });
    
    return profile;
  }

  // Calculate breeding compatibility and predictions
  static calculateBreedingPrediction(parentA: Animal, parentB: Animal): any {
    const predictions: any = {
      offspring: [],
      statistics: {},
      health_risks: [],
      recommended: true
    };
    
    // Generate multiple potential offspring to show probabilities
    for (let i = 0; i < 100; i++) {
      const genetics = this.generateGeneticProfile(parentA, parentB);
      predictions.offspring.push(genetics);
    }
    
    // Calculate statistics
    predictions.statistics = this.calculateOffspringStatistics(predictions.offspring);
    
    // Assess health risks
    predictions.health_risks = this.assessHealthRisks(parentA, parentB);
    
    // Calculate inbreeding coefficient
    predictions.inbreeding_coefficient = this.calculateInbreedingCoefficient(parentA, parentB);
    
    // Breeding recommendation
    predictions.recommended = predictions.health_risks.length === 0 && 
                             predictions.inbreeding_coefficient < 0.25;
    
    return predictions;
  }

  // Calculate statistics from offspring predictions
  static calculateOffspringStatistics(offspring: any[]): any {
    const stats: any = {
      coat_colors: {},
      avg_stats: {},
      trait_probabilities: {}
    };
    
    // Analyze coat color distribution
    offspring.forEach(animal => {
      // This would analyze the combined genetic effects for coat color
      const colorKey = 'color_analysis'; // Simplified
      stats.coat_colors[colorKey] = (stats.coat_colors[colorKey] || 0) + 1;
    });
    
    // Calculate average stat bonuses
    const statTotals: any = {};
    const statCounts: any = {};
    
    offspring.forEach(animal => {
      Object.values(animal).forEach((trait: any) => {
        if (trait.phenotype && trait.phenotype.stats) {
          Object.entries(trait.phenotype.stats).forEach(([stat, value]) => {
            statTotals[stat] = (statTotals[stat] || 0) + (value as number);
            statCounts[stat] = (statCounts[stat] || 0) + 1;
          });
        }
      });
    });
    
    Object.keys(statTotals).forEach(stat => {
      stats.avg_stats[stat] = statTotals[stat] / statCounts[stat];
    });
    
    return stats;
  }

  // Assess health risks from breeding
  static assessHealthRisks(parentA: Animal, parentB: Animal): string[] {
    const risks: string[] = [];
    
    // Check for known genetic health issues
    const healthTraits = ['MDR1', 'HERDA', 'SCID'];
    
    healthTraits.forEach(traitName => {
      const traitDef = GENETIC_TRAITS[traitName];
      if (!traitDef) return;
      
      const parentAGenotype = parentA.genetics[traitName] || ['N', 'N'];
      const parentBGenotype = parentB.genetics[traitName] || ['N', 'N'];
      
      // Check for carrier x carrier risks
      const aCarrier = parentAGenotype.includes('mut') || parentAGenotype.includes('H') || parentAGenotype.includes('S');
      const bCarrier = parentBGenotype.includes('mut') || parentBGenotype.includes('H') || parentBGenotype.includes('S');
      
      if (aCarrier && bCarrier) {
        risks.push(`25% chance of ${traitDef.name} in offspring`);
      }
    });
    
    return risks;
  }

  // Calculate inbreeding coefficient (simplified)
  static calculateInbreedingCoefficient(parentA: Animal, parentB: Animal): number {
    // This would require full pedigree analysis
    // For now, return a simplified calculation based on genetic similarity
    
    if (!parentA.genetics || !parentB.genetics) return 0;
    
    let sharedAlleles = 0;
    let totalAlleles = 0;
    
    Object.keys(GENETIC_TRAITS).forEach(traitName => {
      const genotypeA = parentA.genetics[traitName];
      const genotypeB = parentB.genetics[traitName];
      
      if (genotypeA && genotypeB) {
        totalAlleles += 4; // 2 alleles per parent
        
        // Count shared alleles
        genotypeA.forEach((allele: string) => {
          if (genotypeB.includes(allele)) {
            sharedAlleles++;
          }
        });
      }
    });
    
    return totalAlleles > 0 ? sharedAlleles / totalAlleles : 0;
  }

  // Genetic diversity analysis
  static analyzeGeneticDiversity(animals: Animal[]): any {
    const diversity = {
      allele_frequencies: {},
      heterozygosity: {},
      effective_population_size: 0,
      endangered_alleles: []
    };
    
    // Calculate allele frequencies
    Object.keys(GENETIC_TRAITS).forEach(traitName => {
      const alleleCount: any = {};
      let totalAlleles = 0;
      
      animals.forEach(animal => {
        const genotype = animal.genetics[traitName];
        if (genotype) {
          genotype.forEach((allele: string) => {
            alleleCount[allele] = (alleleCount[allele] || 0) + 1;
            totalAlleles++;
          });
        }
      });
      
      // Convert to frequencies
      diversity.allele_frequencies[traitName] = {};
      Object.keys(alleleCount).forEach(allele => {
        diversity.allele_frequencies[traitName][allele] = alleleCount[allele] / totalAlleles;
      });
      
      // Calculate heterozygosity
      let hetCount = 0;
      animals.forEach(animal => {
        const genotype = animal.genetics[traitName];
        if (genotype && genotype[0] !== genotype[1]) {
          hetCount++;
        }
      });
      diversity.heterozygosity[traitName] = hetCount / animals.length;
      
      // Find endangered alleles (frequency < 5%)
      Object.entries(diversity.allele_frequencies[traitName]).forEach(([allele, freq]) => {
        if ((freq as number) < 0.05) {
          diversity.endangered_alleles.push(`${traitName}:${allele}`);
        }
      });
    });
    
    // Calculate effective population size (simplified)
    diversity.effective_population_size = Math.min(animals.length, 50); // Simplified calculation
    
    return diversity;
  }
}