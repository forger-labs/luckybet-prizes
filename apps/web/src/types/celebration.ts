export interface RewardCelebrationData {
  coins: number;
  title?: string;
  subtitle?: string;
}

export interface RewardCelebrationContextType {
  triggerCelebration: (data: RewardCelebrationData) => void;
}

export interface CoinCelebrationModalProps {
  data: RewardCelebrationData | null;
  isOpen: boolean;
  onClose: () => void;
}
