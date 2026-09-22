"use client";

import { motion } from "framer-motion";

import { FlameIcon, TrendUpIcon } from "@/icons";
import type { TrendingGameItem } from "@/types/dashboard";

const TRENDING_LIST: TrendingGameItem[] = [
  {
    id: "trend-1",
    title: "Blackjack Harbor",
    category: "Cartas VIP",
    growth: "+34%",
    isPositive: true,
    activePlayers: 254,
    popularityPercentage: 88,
  },
  {
    id: "trend-2",
    title: "Midnight Slots",
    category: "Tragamonedas",
    growth: "+28%",
    isPositive: true,
    activePlayers: 342,
    popularityPercentage: 76,
  },
  {
    id: "trend-3",
    title: "Deep Sea Poker",
    category: "Torneos",
    growth: "+19%",
    isPositive: true,
    activePlayers: 118,
    popularityPercentage: 62,
  },
];

export const TrendingGames = () => {
  return (
    <section className="glass-card-strong rounded-2xl p-6 border border-white/10 flex flex-col justify-between shadow-xl">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-primary font-semibold uppercase tracking-wider mb-0.5">
              <FlameIcon className="w-3.5 h-3.5 text-secondary" />
              <span>Populares</span>
            </div>
            <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
              Juegos en Tendencia
            </h3>
          </div>

          <span className="text-[11px] font-medium text-on-surface-variant bg-surface-container-highest px-2.5 py-1 rounded-full border border-white/5">
            Semana Actual
          </span>
        </div>

        {/* List of Trending Games */}
        <div className="space-y-3.5">
          {TRENDING_LIST.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.3 }}
              className="p-3 rounded-xl bg-surface-container-high/50 hover:bg-surface-container-high border border-white/5 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-label-md text-xs sm:text-sm font-bold text-on-surface">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-on-surface-variant">
                    {item.category} • {item.activePlayers} en mesa
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  <TrendUpIcon className="w-3.5 h-3.5" />
                  {item.growth}
                </div>
              </div>

              {/* Popularity Bar */}
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.popularityPercentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
