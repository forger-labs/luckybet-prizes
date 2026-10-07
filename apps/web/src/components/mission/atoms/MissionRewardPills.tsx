"use client";

interface MissionRewardPillsProps {
  coins: number;
  xp: number;
  bonusPercent?: number;
  className?: string;
  size?: "sm" | "md";
}

export function MissionRewardPills({
  coins,
  xp,
  bonusPercent = 0,
  className = "",
  size = "md",
}: MissionRewardPillsProps) {
  const isSm = size === "sm";

  return (
    <div
      className={`flex flex-wrap items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-surface-container-lowest/90 border border-[#3e484f]/30 ${className}`}
    >
      {/* Total Tokens Pill */}
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/15 border border-[#ffc640]/30 text-secondary shadow-[0_0_12px_rgba(255,198,64,0.18)] ${
          isSm ? "text-xs" : "text-xs sm:text-sm"
        }`}
      >
        <span className="material-symbols-outlined text-base leading-none">
          token
        </span>
        <span className="font-(--font-plus-jakarta-sans) font-black tracking-tight">
          {coins.toLocaleString()} Fichas
        </span>
        {bonusPercent > 0 && (
          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-secondary/25 rounded text-secondary border border-[#ffc640]/40">
            +{bonusPercent}%
          </span>
        )}
      </div>

      {/* XP Pill */}
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 border border-primary/30 text-primary ${
          isSm ? "text-xs" : "text-xs sm:text-sm"
        }`}
      >
        <span className="material-symbols-outlined text-base leading-none">
          stars
        </span>
        <span className="font-(--font-plus-jakarta-sans) font-black tracking-tight">
          +{xp.toLocaleString()} XP
        </span>
      </div>
    </div>
  );
}
