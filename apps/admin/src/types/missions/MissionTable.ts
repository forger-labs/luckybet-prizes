import type { AdminMission } from "@shared/types";

export interface MissionTableProps {
  missions: AdminMission[];
  onPreview: (mission: AdminMission) => void;
  onEdit?: (id: string) => void;
  onActivate?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export interface MissionRowProps {
  mission: AdminMission;
  onPreview: (mission: AdminMission) => void;
  onEdit?: (id: string) => void;
  onActivate?: (id: string) => void;
  onCancel?: (id: string) => void;
}
