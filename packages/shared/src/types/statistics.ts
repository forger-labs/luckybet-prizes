export type LeaderboardPeriod = "WEEKLY" | "MONTHLY" | "ALL_TIME";

export interface LeaderboardUser {
  rank: number;
  playerId: number;
  username: string;
  totalCoins: number;
  missionsCoins: number;
  levelsCoins: number;
  chestsCoins: number;
}

export interface LeaderboardResponseData {
  period: LeaderboardPeriod;
  startDate: string;
  endDate: string;
  leaderboard: LeaderboardUser[];
}

export interface LeaderboardQuery {
  period?: LeaderboardPeriod;
  limit?: number;
}

export interface StatisticsDateRangeQuery {
  startDate?: string;
  endDate?: string;
}

export interface StatisticsSummaryCoinsBreakdown {
  missionsCoins: number;
  levelsCoins: number;
  chestsCoins: number;
  totalCoins: number;
}

export interface StatisticsSummaryEventsCount {
  completedMissionsCount: number;
  levelUpsCount: number;
  claimedChestsCount: number;
}

export interface StatisticsSummaryData {
  coinsBreakdown: StatisticsSummaryCoinsBreakdown;
  eventsCount: StatisticsSummaryEventsCount;
}

export interface StatisticsLiabilitiesBreakdown {
  missionsPendingCoins: number;
  levelsPendingCoins: number;
  chestsPendingCoins: number;
}

export interface StatisticsLiabilitiesData {
  pendingCoins: number;
  claimedCoins: number;
  claimRate: number;
  pendingClaimsCount: number;
  breakdown: StatisticsLiabilitiesBreakdown;
}

export interface RiskBreakdownItem {
  count: number;
  coinsAmount: number;
}

export interface StatisticsOperationalRiskData {
  uncertainClaimsCount: number;
  uncertainCoinsAmount: number;
  breakdown: {
    missions: RiskBreakdownItem;
    levels: RiskBreakdownItem;
    chests: RiskBreakdownItem;
  };
}

export interface ReviewerSlaItem {
  adminId: number;
  adminUsername: string;
  reviewedStepsCount: number;
  approvedStepsCount: number;
  rejectedStepsCount: number;
  averageReviewTimeMinutes: number;
}

export interface StatisticsReviewersSlaData {
  globalAverageReviewTimeMinutes: number;
  totalReviewedStepsCount: number;
  reviewers: ReviewerSlaItem[];
}

export interface StatisticsMissionsEngagementData {
  completionRate: number;
  completedCount: number;
  inProgressCount: number;
  cancelledOrExpiredCount: number;
  averageCompletionMinutes: number;
}

export interface LevelDistributionItem {
  levelId: number;
  levelName: string;
  minExperience: number;
  playersCount: number;
  percentage: number;
}

export interface StatisticsLevelsDistributionData {
  totalActivePlayers: number;
  distribution: LevelDistributionItem[];
}

export interface ChestSummaryItem {
  chestId: number;
  chestTitle: string;
  requiredMissions: number;
  coinsAmount: number;
  periodType: "WEEKLY" | "MONTHLY";
  participantsCount: number;
  claimedCount: number;
  claimRate: number;
  totalCoinsDistributed: number;
}

export interface StatisticsChestsSummaryData {
  periodKey: string;
  chests: ChestSummaryItem[];
}

export interface ChestsSummaryQuery {
  periodKey?: string;
}
