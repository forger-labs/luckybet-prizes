"use client";

import { useCallback, useEffect, useState } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import webApi from "@/libs/apiWebGanaya";
import type {
  LeaderboardPeriod,
  LeaderboardPeriodOption,
  LeaderboardUser,
} from "@/types/leaderboard";

export const LEADERBOARD_PERIOD_OPTIONS: LeaderboardPeriodOption[] = [
  { id: "MONTHLY", label: "Mensual" },
  { id: "WEEKLY", label: "Semanal" },
  { id: "ALL_TIME", label: "Histórico" },
];

export interface UseLeaderboardOptions {
  initialPeriod?: LeaderboardPeriod;
  limit?: number;
}

export function useLeaderboard(options: UseLeaderboardOptions = {}) {
  const { initialPeriod = "MONTHLY", limit = 5 } = options;
  const [period, setPeriod] = useState<LeaderboardPeriod>(initialPeriod);
  const [topUsers, setTopUsers] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLeaderboard = useCallback(
    async (selectedPeriod: LeaderboardPeriod) => {
      setIsLoading(true);
      try {
        const response = await webApi.getLeaderboard({
          period: selectedPeriod,
          limit,
        });

        if (response.status && response.data) {
          setTopUsers(response.data.leaderboard ?? []);
        } else {
          setTopUsers([]);
        }
      } catch {
        casinoToast.error({
          title: "Error al cargar la tabla de líderes",
          description:
            "No se pudieron obtener las estadísticas de los mejores jugadores.",
        });
        setTopUsers([]);
      } finally {
        setIsLoading(false);
      }
    },
    [limit],
  );

  useEffect(() => {
    fetchLeaderboard(period);
  }, [period, fetchLeaderboard]);

  const handlePeriodChange = useCallback((newPeriod: LeaderboardPeriod) => {
    setPeriod(newPeriod);
  }, []);

  return {
    period,
    topUsers,
    isLoading,
    periodOptions: LEADERBOARD_PERIOD_OPTIONS,
    setPeriod: handlePeriodChange,
    refetch: () => fetchLeaderboard(period),
  };
}
