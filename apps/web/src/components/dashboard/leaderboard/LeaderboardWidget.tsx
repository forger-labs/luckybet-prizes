"use client";

import { useLeaderboard } from "@/hooks/useLeaderboard";
import { SparklesIcon, TrophyIcon } from "@/icons";
import { LeaderboardListRow } from "./LeaderboardListRow";
import { LeaderboardPeriodSelector } from "./LeaderboardPeriodSelector";
import { LeaderboardPodiumStep } from "./LeaderboardPodiumStep";
import { LeaderboardSkeleton } from "./LeaderboardSkeleton";

export const LeaderboardWidget = () => {
  const { period, topUsers, isLoading, periodOptions, setPeriod } =
    useLeaderboard({
      initialPeriod: "MONTHLY",
      limit: 5,
    });

  const firstPlace = topUsers.find((u) => u.rank === 1) || topUsers[0];
  const secondPlace = topUsers.find((u) => u.rank === 2) || topUsers[1];
  const thirdPlace = topUsers.find((u) => u.rank === 3) || topUsers[2];
  const remainingUsers = topUsers.filter((u) => u.rank > 3);

  return (
    <div className="rounded-2xl bg-surface-container-low/90 border border-outline-variant/20 p-4 sm:p-6 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex flex-col justify-between h-full">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/15">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 flex items-center justify-center text-secondary shadow-[0_0_16px_rgba(255,198,64,0.15)] shrink-0">
            <TrophyIcon className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-lg-mobile sm:font-title-md font-bold text-on-surface tracking-tight">
                Tabla de Líderes
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-secondary bg-secondary/10 border border-secondary/20 uppercase tracking-wider">
                <SparklesIcon className="w-3 h-3 text-secondary" />
                Top 5
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Jugadores con mayor cantidad de fichas acumuladas
            </p>
          </div>
        </div>

        {/* Period Selector Tabs */}
        <LeaderboardPeriodSelector
          options={periodOptions}
          currentPeriod={period}
          onSelect={setPeriod}
          disabled={isLoading}
        />
      </div>

      {/* ── Content ── */}
      <div className="py-2 flex-1 flex flex-col justify-center">
        {isLoading ? (
          <LeaderboardSkeleton />
        ) : topUsers.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-xl bg-surface-container/40 border border-dashed border-outline-variant/20">
            <TrophyIcon className="w-10 h-10 text-on-surface-variant/40 mx-auto mb-2" />
            <p className="font-semibold text-sm text-on-surface">
              Sin datos de clasificación
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Sé el primero en completar misiones en este período para liderar
              el ranking.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Podium (Top 1, 2, 3) */}
            <div className="flex items-end justify-center gap-2 sm:gap-3 pt-6 px-1">
              <LeaderboardPodiumStep user={secondPlace} rank={2} />
              <LeaderboardPodiumStep user={firstPlace} rank={1} />
              <LeaderboardPodiumStep user={thirdPlace} rank={3} />
            </div>

            {/* List for ranks 4 and 5 */}
            {remainingUsers.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-outline-variant/15">
                {remainingUsers.map((user, idx) => (
                  <LeaderboardListRow
                    key={user.playerId || user.rank}
                    user={user}
                    index={idx}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
