import type { FormikProps } from "formik";

import type { PartialAdminMission } from "./MissionFormModalTypes";

export interface MissionFieldsProps {
  formik: FormikProps<PartialAdminMission>;
  readOnly?: boolean;
}
