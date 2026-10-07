"use client";

import { useCallback, useEffect, useState } from "react";

import type { BackendLevel } from "@shared/types";
import { casinoToast } from "@shared/utils/casinoToast";

import { webApi } from "@/libs/apiWebGanaya";
import type {
  ClaimCelebrationData,
  PlayerLevelReward,
} from "@/types/levelRewards";

export function calculateTotalCoinsWithBonus(
  baseCoins: number,
  roomBonus?: string | null,
): { totalCoins: number; bonusPercent: number } {
  const bonusPercent = Number(roomBonus) || 0;
  if (bonusPercent <= 0) {
    return { totalCoins: baseCoins, bonusPercent: 0 };
  }
  const bonusCoins = (baseCoins * bonusPercent) / 100;
  return {
    totalCoins: Math.round(baseCoins + bonusCoins),
    bonusPercent,
  };
}

interface UseLevelRewardsOptions {
  roomBonus?: string | null;
  onClaimSuccess?: () => void;
}

export function useLevelRewards(options?: UseLevelRewardsOptions) {
  const { roomBonus = "0", onClaimSuccess } = options || {};

  const [pendingRewards, setPendingRewards] = useState<PlayerLevelReward[]>([]);
  const [levelsMap, setLevelsMap] = useState<Record<number, BackendLevel>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [celebrationData, setCelebrationData] =
    useState<ClaimCelebrationData | null>(null);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState<boolean>(false);

  const loadLevels = useCallback(async () => {
    try {
      const res = await webApi.getLevels({ take: 50, sortOrder: "ASC" });
      if (res.status && res.data) {
        const map: Record<number, BackendLevel> = {};
        for (const lvl of res.data) {
          map[lvl.id] = lvl;
        }
        setLevelsMap(map);
        return map;
      }
    } catch {
      // fallback
    }
    return {};
  }, []);

  const fetchPendingRewards = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await webApi.getMyLevelRewards({
        status: "PENDING",
        orderBy: "levelId",
        orderDirection: "ASC",
        take: 50,
      });

      if (res.status && res.data) {
        setPendingRewards(res.data);
      } else {
        setPendingRewards([]);
      }
    } catch {
      setPendingRewards([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLevels();
    fetchPendingRewards();
  }, [loadLevels, fetchPendingRewards]);

  const nextReward = pendingRewards.length > 0 ? pendingRewards[0] : null;
  const pendingCount = pendingRewards.length;
  const nextLevel = nextReward
    ? (levelsMap[nextReward.levelId] ?? nextReward.level)
    : null;

  const nextLevelName =
    nextLevel?.name ?? (nextReward ? `Nivel ${nextReward.levelId}` : "");
  const nextLevelImage = nextLevel?.image ?? null;

  const calculatedCoinsForNext = nextReward
    ? calculateTotalCoinsWithBonus(nextReward.coinsAmount, roomBonus).totalCoins
    : 0;

  const claimRewardByLevelId = useCallback(
    async (levelId: number) => {
      if (isClaiming) return false;

      setIsClaiming(true);
      try {
        const res = await webApi.claimLevelReward(levelId);

        if (res.status && res.data) {
          const reward = res.data;
          const lvl = levelsMap[reward.levelId] ?? reward.level;
          const { totalCoins, bonusPercent } = calculateTotalCoinsWithBonus(
            reward.coinsAmount,
            roomBonus,
          );

          setCelebrationData({
            reward,
            levelName: lvl?.name ?? `Nivel ${reward.levelId}`,
            levelImage: lvl?.image ?? null,
            baseCoins: reward.coinsAmount,
            totalCoins,
            bonusPercent,
          });

          setIsCelebrationOpen(true);

          // Remove the claimed reward from FIFO queue
          setPendingRewards((prev) =>
            prev.filter(
              (r) => r.id !== reward.id && r.levelId !== reward.levelId,
            ),
          );

          if (onClaimSuccess) {
            onClaimSuccess();
          }

          return true;
        }

        casinoToast.error({
          title: "Error al reclamar premio",
          description:
            typeof res.message === "string"
              ? res.message
              : "No se pudo procesar el reclamo del premio",
        });
        return false;
      } catch {
        casinoToast.error({
          title: "Error de conexión",
          description:
            "No se pudo conectar con el servidor para reclamar el premio",
        });
        return false;
      } finally {
        setIsClaiming(false);
      }
    },
    [isClaiming, levelsMap, roomBonus, onClaimSuccess],
  );

  const claimNextReward = useCallback(async () => {
    if (!nextReward) return false;
    return await claimRewardByLevelId(nextReward.levelId);
  }, [nextReward, claimRewardByLevelId]);

  const closeCelebration = useCallback(() => {
    setIsCelebrationOpen(false);
    setCelebrationData(null);
  }, []);

  const claimNextFromModal = useCallback(async () => {
    if (pendingRewards.length === 0) {
      closeCelebration();
      return;
    }
    const nextInQueue = pendingRewards[0];
    await claimRewardByLevelId(nextInQueue.levelId);
  }, [pendingRewards, claimRewardByLevelId, closeCelebration]);

  const subsequentPendingReward =
    pendingRewards.length > 0 ? pendingRewards[0] : null;
  const subsequentLevel = subsequentPendingReward
    ? (levelsMap[subsequentPendingReward.levelId] ??
      subsequentPendingReward.level)
    : null;
  const subsequentLevelName =
    subsequentLevel?.name ??
    (subsequentPendingReward
      ? `Nivel ${subsequentPendingReward.levelId}`
      : undefined);

  return {
    pendingRewards,
    nextReward,
    pendingCount,
    nextLevelName,
    nextLevelImage,
    calculatedCoinsForNext,
    isLoading,
    isClaiming,
    celebrationData,
    isCelebrationOpen,
    hasMorePending: pendingRewards.length > 0,
    remainingCount: pendingRewards.length,
    subsequentLevelName,
    claimNextReward,
    claimRewardByLevelId,
    claimNextFromModal,
    closeCelebration,
    refetchRewards: fetchPendingRewards,
  };
}
