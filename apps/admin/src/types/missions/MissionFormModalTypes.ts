import type { AdminMission } from "@shared/types";
export type PartialAdminMission = Omit<
  AdminMission,
  "id" | "createdAt" | "participants"
> & {
  image?: File;
};

export interface MissionFormModalProps {
  open: boolean;
  onClose: () => void;
  /** null = create mode, AdminMission = edit/view mode */
  mission: AdminMission | null;
  onSave: (data: PartialAdminMission, isCreate: boolean) => void;
}

export interface FormErrors {
  title?: string;
  description?: string;
  tokenReward?: string;
  bonusPercent?: string;
  xpReward?: string;
  category?: string;
  steps?: string;
  [key: `step_${number}_title`]: string;
}
