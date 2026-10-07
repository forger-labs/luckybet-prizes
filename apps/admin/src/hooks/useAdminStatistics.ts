"use client";

import { useCallback, useEffect, useState } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  ChestPeriodMode,
  DateFilterPreset,
  DateRangeState,
  StatisticsChestsSummaryData,
  StatisticsLevelsDistributionData,
  StatisticsLiabilitiesData,
  StatisticsMissionsEngagementData,
  StatisticsOperationalRiskData,
  StatisticsReviewersSlaData,
  StatisticsSummaryData,
  StatisticsTabId,
  StatisticsTabOption,
} from "@/types/adminStatistics";
import {
  formatToArgentinaDateOnlyInput,
  formatToArgentinaDateTimeInput,
  formatToArgentinaIsoString,
  getArgentinaNow,
  getIsoWeekKey,
  getMonthKey,
} from "@/utils/dateUtils";

export const STATISTICS_TABS: StatisticsTabOption[] = [
  {
    id: "overview",
    label: "Finanzas & Pasivos",
    icon: "account_balance_wallet",
  },
  {
    id: "gamification",
    label: "Gamificación & Niveles",
    icon: "military_tech",
  },
  { id: "operations", label: "Moderación & Riesgo", icon: "shield" },
  { id: "chests", label: "Rendimiento de Cofres", icon: "inventory_2" },
];

export const getPresetArgentinaRange = (
  preset: DateFilterPreset,
): { startLocal: string; endLocal: string } => {
  const now = getArgentinaNow();
  const endLocal = formatToArgentinaDateTimeInput(now);

  if (preset === "7d") {
    const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startStr = formatToArgentinaDateOnlyInput(start);
    return { startLocal: `${startStr}T00:00`, endLocal };
  }

  if (preset === "30d") {
    const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const startStr = formatToArgentinaDateOnlyInput(start);
    return { startLocal: `${startStr}T00:00`, endLocal };
  }

  if (preset === "this_month") {
    const nowStr = formatToArgentinaDateOnlyInput(now);
    const [year, month] = nowStr.split("-");
    return { startLocal: `${year}-${month}-01T00:00`, endLocal };
  }

  // Custom fallback
  const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return { startLocal: formatToArgentinaDateTimeInput(start), endLocal };
};

export const calculateDateRange = (
  preset: DateFilterPreset,
  customStart?: string,
  customEnd?: string,
): { startDate?: string; endDate?: string } => {
  if (preset === "custom" && customStart && customEnd) {
    const startDate = formatToArgentinaIsoString(customStart);
    const endDate = formatToArgentinaIsoString(customEnd);
    return { startDate, endDate };
  }

  const { startLocal, endLocal } = getPresetArgentinaRange(preset);
  return {
    startDate: formatToArgentinaIsoString(startLocal),
    endDate: formatToArgentinaIsoString(endLocal),
  };
};

export function useAdminStatistics() {
  const initialRange = getPresetArgentinaRange("30d");

  const [activeTab, setActiveTab] = useState<StatisticsTabId>("overview");
  const [dateRange, setDateRange] = useState<DateRangeState>({
    preset: "30d",
    startDate: initialRange.startLocal,
    endDate: initialRange.endLocal,
  });

  // Chests Period Controls (Argentina calendar based)
  const todayStr = formatToArgentinaDateOnlyInput(getArgentinaNow());
  const [chestsPeriodMode, setChestsPeriodMode] =
    useState<ChestPeriodMode>("WEEKLY");
  const [chestsSelectedDate, setChestsSelectedDate] =
    useState<string>(todayStr);
  const [chestsPeriodKey, setChestsPeriodKey] = useState<string>(
    getIsoWeekKey(todayStr),
  );

  // Data states
  const [summary, setSummary] = useState<StatisticsSummaryData | null>(null);
  const [liabilities, setLiabilities] =
    useState<StatisticsLiabilitiesData | null>(null);
  const [operationalRisk, setOperationalRisk] =
    useState<StatisticsOperationalRiskData | null>(null);
  const [reviewersSla, setReviewersSla] =
    useState<StatisticsReviewersSlaData | null>(null);
  const [missionsEngagement, setMissionsEngagement] =
    useState<StatisticsMissionsEngagementData | null>(null);
  const [levelsDistribution, setLevelsDistribution] =
    useState<StatisticsLevelsDistributionData | null>(null);
  const [chestsSummary, setChestsSummary] =
    useState<StatisticsChestsSummaryData | null>(null);

  // Loading states
  const [isLoadingOverview, setIsLoadingOverview] = useState<boolean>(true);
  const [isLoadingGamification, setIsLoadingGamification] =
    useState<boolean>(false);
  const [isLoadingOperations, setIsLoadingOperations] =
    useState<boolean>(false);
  const [isLoadingChests, setIsLoadingChests] = useState<boolean>(false);

  // Update Chests Period Key when date or mode changes
  const updateChestsPeriod = useCallback(
    (mode: ChestPeriodMode, dateStr: string) => {
      setChestsPeriodMode(mode);
      setChestsSelectedDate(dateStr);
      const key =
        mode === "WEEKLY" ? getIsoWeekKey(dateStr) : getMonthKey(dateStr);
      setChestsPeriodKey(key);
    },
    [],
  );

  // Fetch Overview (Summary + Liabilities)
  const fetchOverviewData = useCallback(
    async (
      preset: DateFilterPreset,
      customStart?: string,
      customEnd?: string,
    ) => {
      setIsLoadingOverview(true);
      try {
        const dates = calculateDateRange(preset, customStart, customEnd);
        const [sumRes, liabRes] = await Promise.all([
          apiAdminGanaya.getStatisticsSummary(dates),
          apiAdminGanaya.getLiabilities(dates),
        ]);

        if (sumRes.status && sumRes.data) setSummary(sumRes.data);
        if (liabRes.status && liabRes.data) setLiabilities(liabRes.data);
      } catch {
        casinoToast.error({
          title: "Error de estadísticas",
          description:
            "No se pudieron obtener los datos de resumen financiero.",
        });
      } finally {
        setIsLoadingOverview(false);
      }
    },
    [],
  );

  // Fetch Gamification (Levels Distribution + Missions Engagement)
  const fetchGamificationData = useCallback(
    async (
      preset: DateFilterPreset,
      customStart?: string,
      customEnd?: string,
    ) => {
      setIsLoadingGamification(true);
      try {
        const dates = calculateDateRange(preset, customStart, customEnd);
        const [levelsRes, engRes] = await Promise.all([
          apiAdminGanaya.getLevelsDistribution(),
          apiAdminGanaya.getMissionsEngagement(dates),
        ]);

        if (levelsRes.status && levelsRes.data)
          setLevelsDistribution(levelsRes.data);
        if (engRes.status && engRes.data) setMissionsEngagement(engRes.data);
      } catch {
        casinoToast.error({
          title: "Error de estadísticas",
          description: "No se pudieron obtener las métricas de gamificación.",
        });
      } finally {
        setIsLoadingGamification(false);
      }
    },
    [],
  );

  // Fetch Operations & Risk (Reviewers SLA + Operational Risk)
  const fetchOperationsData = useCallback(
    async (
      preset: DateFilterPreset,
      customStart?: string,
      customEnd?: string,
    ) => {
      setIsLoadingOperations(true);
      try {
        const dates = calculateDateRange(preset, customStart, customEnd);
        const [slaRes, riskRes] = await Promise.all([
          apiAdminGanaya.getReviewersSla(dates),
          apiAdminGanaya.getOperationalRisk(dates),
        ]);

        if (slaRes.status && slaRes.data) setReviewersSla(slaRes.data);
        if (riskRes.status && riskRes.data) setOperationalRisk(riskRes.data);
      } catch {
        casinoToast.error({
          title: "Error de estadísticas",
          description:
            "No se pudieron obtener los reportes operativos y de SLA.",
        });
      } finally {
        setIsLoadingOperations(false);
      }
    },
    [],
  );

  // Fetch Chests Summary
  const fetchChestsData = useCallback(async (periodKey?: string) => {
    setIsLoadingChests(true);
    try {
      const query = periodKey?.trim()
        ? { periodKey: periodKey.trim() }
        : undefined;
      const res = await apiAdminGanaya.getChestsSummary(query);
      if (res.status && res.data) setChestsSummary(res.data);
    } catch {
      casinoToast.error({
        title: "Error de estadísticas",
        description: "No se pudo obtener el resumen de cofres.",
      });
    } finally {
      setIsLoadingChests(false);
    }
  }, []);

  // Auto fetch when activeTab, dateRange, or chestsPeriodKey changes
  useEffect(() => {
    if (activeTab === "overview") {
      fetchOverviewData(
        dateRange.preset,
        dateRange.startDate,
        dateRange.endDate,
      );
    } else if (activeTab === "gamification") {
      fetchGamificationData(
        dateRange.preset,
        dateRange.startDate,
        dateRange.endDate,
      );
    } else if (activeTab === "operations") {
      fetchOperationsData(
        dateRange.preset,
        dateRange.startDate,
        dateRange.endDate,
      );
    } else if (activeTab === "chests") {
      fetchChestsData(chestsPeriodKey);
    }
  }, [
    activeTab,
    dateRange.preset,
    dateRange.startDate,
    dateRange.endDate,
    chestsPeriodKey,
    fetchOverviewData,
    fetchGamificationData,
    fetchOperationsData,
    fetchChestsData,
  ]);

  const handlePresetChange = (preset: DateFilterPreset) => {
    if (preset === "custom") {
      setDateRange((prev) => ({ ...prev, preset: "custom" }));
      return;
    }
    const { startLocal, endLocal } = getPresetArgentinaRange(preset);
    setDateRange({
      preset,
      startDate: startLocal,
      endDate: endLocal,
    });
  };

  const handleCustomDateChange = (startDate: string, endDate: string) => {
    setDateRange({ preset: "custom", startDate, endDate });
  };

  return {
    activeTab,
    setActiveTab,
    tabs: STATISTICS_TABS,
    dateRange,
    setDatePreset: handlePresetChange,
    setCustomDates: handleCustomDateChange,
    // Chests controls
    chestsPeriodMode,
    chestsSelectedDate,
    chestsPeriodKey,
    updateChestsPeriod,
    // Data
    summary,
    liabilities,
    operationalRisk,
    reviewersSla,
    missionsEngagement,
    levelsDistribution,
    chestsSummary,
    // Loadings
    isLoadingOverview,
    isLoadingGamification,
    isLoadingOperations,
    isLoadingChests,
    // Refetchers
    refetchCurrentTab: () => {
      if (activeTab === "overview")
        fetchOverviewData(
          dateRange.preset,
          dateRange.startDate,
          dateRange.endDate,
        );
      if (activeTab === "gamification")
        fetchGamificationData(
          dateRange.preset,
          dateRange.startDate,
          dateRange.endDate,
        );
      if (activeTab === "operations")
        fetchOperationsData(
          dateRange.preset,
          dateRange.startDate,
          dateRange.endDate,
        );
      if (activeTab === "chests") fetchChestsData(chestsPeriodKey);
    },
  };
}
