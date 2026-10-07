import type { JSX } from "react";

import type { IconsProps } from "./iconsProps";

export type SidebarLinkType = {
  path: string;
  icon: (props: IconsProps) => JSX.Element;
  text: string;
};

export type {
  AdminMission,
  AdminPlayer,
  AdminSidebarLink,
  BackendChest,
  BackendChestRoom,
  BackendGameItem,
  BackendLevel,
  BackendLevelRoom,
  BackendMission,
  BackendMissionRoom,
  BackendMissionStatus,
  BackendMissionType,
  BackendPlayer,
  BackendPlayerLevel,
  BackendPlayerRoom,
  BackendProviderItem,
  BackendRoom,
  BackendUpdateMissionPayload,
  ChestPeriodType,
  ClaimStatus,
  CreateRoomPayload,
  GamePlayStepConfig,
  GetAdminPlayerChestsQuery,
  GetChestsQuery,
  GetLevelsQuery,
  GetMissionsQuery,
  GetPlayersQuery,
  GetRoomsQuery,
  LevelBonus,
  MissionCategory,
  MissionStatus,
  MissionStep,
  PlayerCompletedMission,
  PlayerStatus,
  ResolveChestClaimPayload,
  ReviewStatus,
  ReviewSubmission,
  ReviewVerdict,
  RoomBonus,
  SuspensionReason,
  UpdateChestPayload,
  UpdatePlayerPayload,
  UpdateRoomPayload,
  UserMissionChestAdmin,
  VerificationCriterion,
  VerificationType,
} from "./admin";
export { DEFAULT_SUSPENSION_REASONS } from "./admin";
export type { Mission, MissionSectionProps } from "./mission";
export type {
  ChestSummaryItem,
  ChestsSummaryQuery,
  LeaderboardPeriod,
  LeaderboardQuery,
  LeaderboardResponseData,
  LeaderboardUser,
  LevelDistributionItem,
  ReviewerSlaItem,
  RiskBreakdownItem,
  StatisticsChestsSummaryData,
  StatisticsDateRangeQuery,
  StatisticsLevelsDistributionData,
  StatisticsLiabilitiesBreakdown,
  StatisticsLiabilitiesData,
  StatisticsMissionsEngagementData,
  StatisticsOperationalRiskData,
  StatisticsReviewersSlaData,
  StatisticsSummaryCoinsBreakdown,
  StatisticsSummaryData,
  StatisticsSummaryEventsCount,
} from "./statistics";
export type {
  CasinoToastItemProps,
  CasinoToastOptions,
  ToastActionButton,
  ToastVariant,
} from "./toasts";
