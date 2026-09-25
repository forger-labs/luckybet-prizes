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
  BackendCreateMissionPayload,
  BackendLevel,
  BackendLevelRoom,
  BackendMission,
  BackendMissionStatus,
  BackendMissionType,
  BackendPlayer,
  BackendPlayerLevel,
  BackendPlayerRoom,
  BackendRoom,
  CreateRoomPayload,
  GetLevelsQuery,
  GetPlayersQuery,
  GetRoomsQuery,
  LevelBonus,
  MissionCategory,
  MissionStatus,
  MissionStep,
  PlayerCompletedMission,
  PlayerStatus,
  ReviewStatus,
  ReviewSubmission,
  ReviewVerdict,
  RoomBonus,
  SuspensionReason,
  UpdatePlayerPayload,
  UpdateRoomPayload,
  VerificationCriterion,
  VerificationType,
} from "./admin";
export { DEFAULT_SUSPENSION_REASONS } from "./admin";
export type { Mission, MissionSectionProps } from "./mission";
export type {
  CasinoToastItemProps,
  CasinoToastOptions,
  ToastActionButton,
  ToastVariant,
} from "./toasts";
