import { CoinsIcon } from "@/icons";

interface Props {
  reward: string;
  completed?: boolean;
}

export const MissionReward = ({ reward, completed }: Props) => (
  <span
    className={`font-bold text-xs sm:text-sm flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
      completed
        ? "text-on-surface-variant/60 bg-surface-container-high/40 line-through"
        : "text-secondary bg-secondary/10 border border-secondary/25 glow-gold-sm"
    }`}
  >
    <CoinsIcon className="w-4 h-4 text-secondary shrink-0" />
    <span>+{reward}</span>
  </span>
);
