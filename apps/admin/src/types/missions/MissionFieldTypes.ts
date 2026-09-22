import type { FormikProps } from "formik";
import type { ReactNode } from "react";

import type { PartialAdminMission } from "./MissionFormModalTypes";

export interface MissionFieldsProps {
  formik: FormikProps<PartialAdminMission>;
  readOnly?: boolean;
}

export interface MissionCoverUploadProps {
  coverImage?: string;
  onChange: (field: string, value: unknown) => void;
}

export interface MissionRewardFieldsProps {
  formik: FormikProps<PartialAdminMission>;
}

export interface FieldGroupProps {
  htmlFor: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}
