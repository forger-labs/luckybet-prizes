import type {
  AdminMission,
  BackendGameItem,
  BackendProviderItem,
  BackendRoom,
} from "@shared/types";

export type PartialAdminMission = Omit<
  AdminMission,
  "id" | "createdAt" | "participants"
> & {
  image?: File;
};

export interface MissionFormModalProps {
  open: boolean;
  onClose: () => void;
  mission: AdminMission | null;
  onSave: (data: PartialAdminMission, isCreate: boolean) => Promise<boolean>;
  isSubmitting?: boolean;
  games?: BackendGameItem[];
  providers?: BackendProviderItem[];
  rooms?: BackendRoom[];
}

export interface FormErrors {
  title?: string;
  description?: string;
  tokenReward?: string;
  roomId?: string;
  xpReward?: string;
  category?: string;
  steps?: string;
  [key: `step_${number}_title`]: string;
}
