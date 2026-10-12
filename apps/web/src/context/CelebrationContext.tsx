"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { CoinCelebrationModal } from "@/components/celebration/CoinCelebrationModal";
import { triggerCoinShower } from "@/components/celebration/CoinShowerCanvas";
import type {
  RewardCelebrationContextType,
  RewardCelebrationData,
} from "@/types/celebration";

export const CelebrationContext =
  createContext<RewardCelebrationContextType | null>(null);

export function CelebrationProvider({ children }: { children: ReactNode }) {
  const [celebrationData, setCelebrationData] =
    useState<RewardCelebrationData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const triggerCelebration = useCallback((data: RewardCelebrationData) => {
    setCelebrationData(data);
    setIsOpen(true);
    triggerCoinShower();
  }, []);

  const value = useMemo(
    () => ({
      triggerCelebration,
    }),
    [triggerCelebration],
  );

  return (
    <CelebrationContext.Provider value={value}>
      {children}
      <CoinCelebrationModal
        isOpen={isOpen}
        data={celebrationData}
        onClose={handleClose}
      />
    </CelebrationContext.Provider>
  );
}

export function useCelebration(): RewardCelebrationContextType {
  const context = useContext(CelebrationContext);
  if (!context) {
    throw new Error(
      "useCelebration debe utilizarse dentro de un CelebrationProvider",
    );
  }
  return context;
}
