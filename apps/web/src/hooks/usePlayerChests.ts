"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { ChestPeriodType } from "@shared/types";
import { casinoToast } from "@shared/utils/casinoToast";

import { webApi } from "@/libs/apiWebGanaya";
import type {
  PlayerChestClaimResponse,
  PlayerChestProgressItem,
} from "@/types/chests";

const INTERVAL_MS = 60 * 1000;
const SECONDS_IN_MIN = 60;
const MINS_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const calculateTimeRemaining = (periodType: ChestPeriodType): string => {
  const now = new Date();

  if (periodType === "WEEKLY") {
    const day = now.getUTCDay();
    const daysUntilSunday = (7 - day) % 7;
    const target = new Date(now);
    target.setUTCDate(now.getUTCDate() + daysUntilSunday);
    target.setUTCHours(23, 59, 59, 999);

    const diffSec = Math.max(
      0,
      Math.floor((target.getTime() - now.getTime()) / 1000),
    );
    const d = Math.floor(
      diffSec / (HOURS_IN_DAY * MINS_IN_HOUR * SECONDS_IN_MIN),
    );
    const h = Math.floor(
      (diffSec % (HOURS_IN_DAY * MINS_IN_HOUR * SECONDS_IN_MIN)) /
        (MINS_IN_HOUR * SECONDS_IN_MIN),
    );
    const m = Math.floor(
      (diffSec % (MINS_IN_HOUR * SECONDS_IN_MIN)) / SECONDS_IN_MIN,
    );

    return d > 0 ? `${d}d ${h}h` : `${h}h ${m}m`;
  }

  // Monthly: end of current UTC month
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const target = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));
  const diffSec = Math.max(
    0,
    Math.floor((target.getTime() - now.getTime()) / 1000),
  );
  const d = Math.floor(
    diffSec / (HOURS_IN_DAY * MINS_IN_HOUR * SECONDS_IN_MIN),
  );
  const h = Math.floor(
    (diffSec % (HOURS_IN_DAY * MINS_IN_HOUR * SECONDS_IN_MIN)) /
      (MINS_IN_HOUR * SECONDS_IN_MIN),
  );

  return `${d}d ${h}h`;
};

export function usePlayerChests(initialPeriod: ChestPeriodType = "WEEKLY") {
  const [selectedPeriod, setSelectedPeriod] =
    useState<ChestPeriodType>(initialPeriod);
  const [chests, setChests] = useState<PlayerChestProgressItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState<boolean>(false);
  const [claimedResult, setClaimedResult] =
    useState<PlayerChestClaimResponse | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  const updateTime = useCallback(() => {
    setTimeLeft(calculateTimeRemaining(selectedPeriod));
  }, [selectedPeriod]);

  useEffect(() => {
    updateTime();
    const timer = setInterval(updateTime, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [updateTime]);

  const loadChests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await webApi.getPlayerChestsProgress();
      if (res.status && Array.isArray(res.data)) {
        setChests(res.data);
      } else {
        setChests([]);
      }
    } catch {
      setChests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChests();
  }, [loadChests]);

  const weeklyChest = useMemo(() => {
    return (
      chests.find((c) => c.chest.periodType === "WEEKLY" && c.chest.isActive) ||
      chests.find((c) => c.chest.periodType === "WEEKLY") ||
      null
    );
  }, [chests]);

  const monthlyChest = useMemo(() => {
    return (
      chests.find(
        (c) => c.chest.periodType === "MONTHLY" && c.chest.isActive,
      ) ||
      chests.find((c) => c.chest.periodType === "MONTHLY") ||
      null
    );
  }, [chests]);

  const activeChest = useMemo(() => {
    return selectedPeriod === "WEEKLY" ? weeklyChest : monthlyChest;
  }, [selectedPeriod, weeklyChest, monthlyChest]);

  const percentage = useMemo(() => {
    if (!activeChest || activeChest.requiredMissions <= 0) return 0;
    const pct = Math.round(
      (activeChest.completedMissions / activeChest.requiredMissions) * 100,
    );
    return Math.min(100, Math.max(0, pct));
  }, [activeChest]);

  const claimChest = useCallback(
    async (chestId?: number) => {
      const targetId = chestId || activeChest?.chest.id;
      if (!targetId) return;

      setIsClaiming(true);
      try {
        const res = await webApi.claimPlayerChest(targetId);
        if (res.status && res.data) {
          setClaimedResult(res.data);
          setIsRewardModalOpen(true);
          casinoToast.success({
            title: "¡Cofre Reclamado!",
            description: "Las recompensas se han añadido a tu cuenta.",
          });
          loadChests();
        } else {
          const msg = Array.isArray(res.message)
            ? res.message[0]
            : res.message || "No se pudo reclamar el cofre.";
          casinoToast.error({ title: "Error al reclamar", description: msg });
        }
      } catch {
        casinoToast.error({
          title: "Error de conexión",
          description: "Ocurrió un error inesperado al reclamar el cofre.",
        });
      } finally {
        setIsClaiming(false);
      }
    },
    [activeChest, loadChests],
  );

  return {
    selectedPeriod,
    setSelectedPeriod,
    weeklyChest,
    monthlyChest,
    activeChest,
    percentage,
    loading,
    isClaiming,
    timeLeft,
    claimChest,
    refetch: loadChests,
    isRewardModalOpen,
    setIsRewardModalOpen,
    claimedResult,
  };
}
