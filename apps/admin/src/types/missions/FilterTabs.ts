import type { BackendRoom, MissionStatus } from "@shared/types";

export type MissionStatusFilter = "all" | MissionStatus;
export type MissionCategoryFilter = "all" | "daily" | "weekly" | "fixed";

export interface MissionFilters {
  search: string;
  status: MissionStatusFilter;
  category: MissionCategoryFilter;
  roomId: string;
}

export interface MissionsFilterBarProps {
  filters: MissionFilters;
  limit: number;
  rooms?: BackendRoom[];
  onFilterChange: (filters: Partial<MissionFilters>) => void;
  onLimitChange: (limit: number) => void;
  onResetFilters: () => void;
}
