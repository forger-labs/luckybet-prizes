import type {
  ChestSummaryItem,
  LevelDistributionItem,
  ReviewerSlaItem,
  RiskBreakdownItem,
  StatisticsChestsSummaryData,
  StatisticsLevelsDistributionData,
  StatisticsLiabilitiesBreakdown,
  StatisticsLiabilitiesData,
  StatisticsMissionsEngagementData,
  StatisticsOperationalRiskData,
  StatisticsReviewersSlaData,
  StatisticsSummaryCoinsBreakdown,
  StatisticsSummaryData,
  StatisticsSummaryEventsCount,
} from "@shared/types";

export type {
  ChestSummaryItem,
  LevelDistributionItem,
  ReviewerSlaItem,
  RiskBreakdownItem,
  StatisticsChestsSummaryData,
  StatisticsLevelsDistributionData,
  StatisticsLiabilitiesBreakdown,
  StatisticsLiabilitiesData,
  StatisticsMissionsEngagementData,
  StatisticsOperationalRiskData,
  StatisticsReviewersSlaData,
  StatisticsSummaryCoinsBreakdown,
  StatisticsSummaryData,
  StatisticsSummaryEventsCount,
};

export type StatisticsTabId =
  | "overview"
  | "gamification"
  | "operations"
  | "chests";

export interface StatisticsTabOption {
  id: StatisticsTabId;
  label: string;
  icon: string;
  badge?: string;
}

export type DateFilterPreset = "7d" | "30d" | "this_month" | "custom";

export interface DateRangeState {
  preset: DateFilterPreset;
  startDate: string;
  endDate: string;
}

export type ChestPeriodMode = "WEEKLY" | "MONTHLY";

export interface AdminStatisticsState {
  activeTab: StatisticsTabId;
  dateRange: DateRangeState;
  chestsPeriodKey: string;
  chestsPeriodMode: ChestPeriodMode;
  summary: StatisticsSummaryData | null;
  liabilities: StatisticsLiabilitiesData | null;
  operationalRisk: StatisticsOperationalRiskData | null;
  reviewersSla: StatisticsReviewersSlaData | null;
  missionsEngagement: StatisticsMissionsEngagementData | null;
  levelsDistribution: StatisticsLevelsDistributionData | null;
  chestsSummary: StatisticsChestsSummaryData | null;
  isLoadingOverview: boolean;
  isLoadingGamification: boolean;
  isLoadingOperations: boolean;
  isLoadingChests: boolean;
}
