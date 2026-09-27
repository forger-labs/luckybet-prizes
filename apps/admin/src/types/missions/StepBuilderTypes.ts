import type { FormikProps } from "formik";

import type {
  BackendGameItem,
  BackendProviderItem,
  GamePlayStepConfig,
  MissionStep,
} from "@shared/types";

import type { PartialAdminMission } from "./MissionFormModalTypes";

export type { GamePlayStepConfig, BackendGameItem, BackendProviderItem };

export interface StepBuilderProps {
  formik: FormikProps<PartialAdminMission>;
  readOnly?: boolean;
  games?: BackendGameItem[];
  providers?: BackendProviderItem[];
}

export interface StepCardProps {
  step: MissionStep;
  index: number;
  totalSteps: number;
  onChange: (updatedStep: MissionStep) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  errors?: Record<string, string>;
  games?: BackendGameItem[];
  providers?: BackendProviderItem[];
}
