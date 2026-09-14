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
  BackendMission,
  BackendMissionStatus,
  BackendMissionStep,
  BackendMissionType,
  MissionCategory,
  MissionStatus,
  MissionStep,
  PlayerCompletedMission,
  PlayerStatus,
  ReviewStatus,
  ReviewSubmission,
  ReviewVerdict,
  SuspensionReason,
  VerificationCriterion,
  VerificationType,
} from "./admin";
export { DEFAULT_SUSPENSION_REASONS } from "./admin";
