import type { FormikProps } from "formik";

import type { MissionStep } from "@shared/types";

import type { PartialAdminMission } from "./MissionFormModalTypes";

export interface StepBuilderProps {
  formik: FormikProps<PartialAdminMission>;
  readOnly?: boolean;
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
}
