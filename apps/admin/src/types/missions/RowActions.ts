import type { AdminMission } from "@shared/types";

export interface RowActionsProps {
  mission: AdminMission;
  onPreview: (mission: AdminMission) => void;
  onEdit?: (id: string) => void;
  onActivate?: (id: string) => void;
  onCancel?: (id: string) => void;
}
