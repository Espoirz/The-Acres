import React, { createContext, useContext, useState, ReactNode } from "react";

interface PremiumStatus {
  isPremium: boolean;
  premiumExpiresAt?: Date;
  gems: number;
  features: {
    extraStalls: boolean;
    bulkOperations: boolean;
    autoClean: boolean;
    autoShows: boolean;
    dogBreeding: boolean;
    extendedEmbryoStorage: boolean;
    trainingBonus: boolean;
    extendedTrading: boolean;
    createShows: boolean;
    fastAdoption: boolean;
  };
}

interface PremiumContextType {
  premiumStatus: PremiumStatus;
  setPremiumStatus: (status: PremiumStatus) => void;
  hasFeature: (featureKey: keyof PremiumStatus["features"]) => boolean;
  getStallLimit: () => number;
  getEmbryoLimit: () => number;
  getTradesPerWeek: () => number;
  getTrainingBonus: () => number;
  getJobBonus: () => number;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export function PremiumProvider({ children }: { children: ReactNode }) {
  const [premiumStatus, setPremiumStatus] = useState<PremiumStatus>({
    isPremium: false, // Set to true for testing
    gems: 15,
    features: {
      extraStalls: false,
      bulkOperations: false,
      autoClean: false,
      autoShows: false,
      dogBreeding: false,
      extendedEmbryoStorage: false,
      trainingBonus: false,
      extendedTrading: false,
      createShows: false,
      fastAdoption: false,
    },
  });

  const hasFeature = (featureKey: keyof PremiumStatus["features"]) => {
    return premiumStatus.isPremium && premiumStatus.features[featureKey];
  };

  const getStallLimit = () => {
    return hasFeature("extraStalls") ? 40 : 20;
  };

  const getEmbryoLimit = () => {
    return hasFeature("extendedEmbryoStorage") ? 5 : 2;
  };

  const getTradesPerWeek = () => {
    return hasFeature("extendedTrading") ? 10 : 5;
  };

  const getTrainingBonus = () => {
    return hasFeature("trainingBonus") ? 5 : 0; // 5% bonus
  };

  const getJobBonus = () => {
    return hasFeature("trainingBonus") ? 3 : 0; // 3% bonus
  };

  return (
    <PremiumContext.Provider
      value={{
        premiumStatus,
        setPremiumStatus,
        hasFeature,
        getStallLimit,
        getEmbryoLimit,
        getTradesPerWeek,
        getTrainingBonus,
        getJobBonus,
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error("usePremium must be used within a PremiumProvider");
  }
  return context;
}
