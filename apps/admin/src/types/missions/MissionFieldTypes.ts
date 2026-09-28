import type { FormikProps } from "formik";
import type { ReactNode } from "react";

import type { BackendRoom } from "@shared/types";

import type { PartialAdminMission } from "./MissionFormModalTypes";

export interface MissionFieldsProps {
  formik: FormikProps<PartialAdminMission>;
  rooms?: BackendRoom[];
}

export interface MissionCoverUploadProps {
  coverImage?: string;
  onChange: (field: string, value: unknown) => void;
}

export interface MissionRewardFieldsProps {
  formik: FormikProps<PartialAdminMission>;
  rooms?: BackendRoom[];
}

export interface FieldGroupProps {
  htmlFor: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}
