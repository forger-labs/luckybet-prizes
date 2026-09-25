export type MissionCategory = "all" | "daily" | "fixed" | "special";

export type MissionPlatform =
  | "instagram"
  | "telegram"
  | "whatsapp"
  | "twitter"
  | "profile"
  | "referral"
  | "deposit"
  | "special";

export type MissionStatusType =
  | "available"
  | "in_progress"
  | "completed"
  | "expired";

export interface MissionStep {
  id: string;
  number: string;
  label: string;
  description?: string;
  completed: boolean;
  required?: boolean;
}

export interface MissionDetailData {
  id: string;
  key: string;
  name: string;
  category: Exclude<MissionCategory, "all">;
  platform: MissionPlatform;
  rewardCoins: number;
  rewardXp: number;
  rewardFormatted: string;
  xpFormatted?: string;
  icon: string;
  color: string;
  glowColor?: string;
  description: string;
  longDescription?: string;
  image?: string;
  actionUrl?: string;
  actionLabel?: string;
  steps: MissionStep[];
  status: MissionStatusType;
  expiresIn?: string;
  verificationNote?: string;
}

export interface MissionItem {
  id: string;
  title: string;
  description?: string;
  reward: string;
  rewardCoins?: number;
  rewardXp?: number;
  icon: string;
  color: string;
  category: Exclude<MissionCategory, "all">;
  platform?: MissionPlatform;
  completed?: boolean;
  progress?: number;
  href?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface MissionStatsSummary {
  claimableCoins: number;
  completedCount: number;
  totalCount: number;
  xpMultiplier: string;
}

export interface MissionCategoryTab {
  id: MissionCategory;
  label: string;
  count: number;
  icon?: string;
}

export interface MissionFilterTabsProps {
  categories: MissionCategoryTab[];
  activeCategory: MissionCategory;
  onSelectCategory: (category: MissionCategory) => void;
}
