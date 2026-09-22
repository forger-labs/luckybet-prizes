"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { CoinsIcon, SparklesIcon } from "@/icons";
import type { WinnerItem } from "@/types/dashboard";

const INITIAL_WINNERS: WinnerItem[] = [
  {
    id: "win-1",
    name: "User99",
    game: "Midnight Slots",
    prize: "500",
    timestamp: "Hace 10s",
  },
  {
    id: "win-2",
    name: "ElitePlayer_X",
    game: "Nautical Roulette",
    prize: "2.400",
    timestamp: "Hace 45s",
  },
  {
    id: "win-3",
    name: "MarinaMaster",
    game: "Deep Sea Poker",
    prize: "15.000",
    timestamp: "Hace 2m",
    isJackpot: true,
  },
  {
    id: "win-4",
    name: "CapitanGold",
    game: "Blackjack Harbor",
    prize: "3.200",
    timestamp: "Hace 3m",
  },
];

const POOL_WINNERS: WinnerItem[] = [
  {
    id: "pool-1",
    name: "OceanKing7",
    game: "Midnight Slots",
    prize: "1.200",
    timestamp: "Ahora",
  },
  {
    id: "pool-2",
    name: "HarborGhost",
    game: "Nautical Roulette",
    prize: "4.500",
    timestamp: "Ahora",
  },
  {
    id: "pool-3",
    name: "DeepBlue",
    game: "Blackjack Harbor",
    prize: "800",
    timestamp: "Ahora",
  },
  {
    id: "pool-4",
    name: "TidalWave",
    game: "Deep Sea Poker",
    prize: "22.000",
    timestamp: "Ahora",
    isJackpot: true,
  },
  {
    id: "pool-5",
    name: "SolNavigante",
    game: "Midnight Slots",
    prize: "7.500",
    timestamp: "Ahora",
  },
];

export const LiveWinnersFeed = () => {
  const [winners, setWinners] = useState<WinnerItem[]>(INITIAL_WINNERS);
  const [poolIdx, setPoolIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const candidate = POOL_WINNERS[poolIdx];
      const newWin: WinnerItem = {
        ...candidate,
        id: `live-${Date.now()}`,
        timestamp: "Ahora",
      };

      setWinners((prev) => [newWin, ...prev.slice(0, 3)]);
      setPoolIdx((prev) => (prev + 1) % POOL_WINNERS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [poolIdx]);

  return (
    <section className="lg:col-span-2 glass-card-strong rounded-2xl p-6 border border-white/10 flex flex-col justify-between shadow-xl">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="absolute w-4 h-4 rounded-full bg-emerald-400/40 animate-ping" />
            </div>
            <div>
              <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
                Ganadores en Vivo
              </h3>
              <p className="text-xs text-on-surface-variant">
                Actualizaciones de premios en tiempo real
              </p>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
            <SparklesIcon className="w-3 h-3" />
            EN DIRECTO
          </span>
        </div>

        {/* Live List */}
        <div className="space-y-2.5 overflow-hidden min-h-[220px]">
          <AnimatePresence initial={false}>
            {winners.map((winner) => (
              <motion.div
                key={winner.id}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                  winner.isJackpot
                    ? "bg-secondary/10 border-secondary/40 shadow-sm"
                    : "bg-surface-container-high/60 border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      winner.isJackpot
                        ? "bg-secondary text-on-secondary glow-gold-sm"
                        : "bg-surface-container-highest text-primary"
                    }`}
                  >
                    {winner.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-label-md text-xs sm:text-sm font-semibold text-on-surface">
                        {winner.name}
                      </p>
                      {winner.isJackpot && (
                        <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.2 rounded bg-secondary/30 text-secondary border border-secondary/40">
                          Jackpot
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-on-surface-variant">
                      en{" "}
                      <span className="text-on-surface/80">{winner.game}</span>{" "}
                      • {winner.timestamp}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-secondary font-bold text-xs sm:text-sm flex items-center gap-1">
                    <CoinsIcon className="w-3.5 h-3.5 text-secondary" />+
                    {winner.prize}
                  </span>
                  <span className="text-[10px] text-on-surface-variant/70 block">
                    fichas
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
