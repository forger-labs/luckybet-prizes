import type { AdminMission } from "@shared/types";

export interface MissionTableProps {
  missions: AdminMission[];
  onEdit?: (id: string) => void;
  onActivate?: (id: string) => void;
  onCancel?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

export interface MissionRowProps {
  mission: AdminMission;
  onEdit?: (id: string) => void;
  onActivate?: (id: string) => void;
  onCancel?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}
