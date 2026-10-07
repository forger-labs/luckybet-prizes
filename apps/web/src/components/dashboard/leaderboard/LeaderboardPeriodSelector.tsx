"use client";

import type {
  LeaderboardPeriod,
  LeaderboardPeriodOption,
} from "@/types/leaderboard";

interface LeaderboardPeriodSelectorProps {
  options: LeaderboardPeriodOption[];
  currentPeriod: LeaderboardPeriod;
  onSelect: (period: LeaderboardPeriod) => void;
  disabled?: boolean;
}

export const LeaderboardPeriodSelector = ({
  options,
  currentPeriod,
  onSelect,
  disabled = false,
}: LeaderboardPeriodSelectorProps) => {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-surface-container-lowest/80 border border-outline-variant/30 rounded-xl">
      {options.map((option) => {
        const isSelected = currentPeriod === option.id;
        return (
          <button
            key={option.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(option.id)}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none
              ${
                isSelected
                  ? "bg-primary text-on-primary shadow-[0_0_12px_rgba(56,189,248,0.3)] font-bold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
