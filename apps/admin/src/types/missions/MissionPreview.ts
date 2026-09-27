import type { AdminMission } from "@shared/types";

export interface MissionPreviewModalProps {
  open: boolean;
  onClose: () => void;
  mission: AdminMission | null;
}

export interface MissionCountdownProps {
  expiresAt?: string;
  activatedAt?: string;
  type?: "daily" | "weekly" | "fixed" | "special_event";
  className?: string;
}
