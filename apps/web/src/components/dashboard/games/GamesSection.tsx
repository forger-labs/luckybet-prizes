"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { SparklesIcon } from "@/icons";
import type { GameItem } from "@/types/dashboard";
import { GameCard } from "./GameCard";

interface GamesSectionProps {
  games?: GameItem[];
  isFallback?: boolean;
  isLoading?: boolean;
}

export const GamesSection = ({
  games = [],
  isFallback = false,
  isLoading = false,
}: GamesSectionProps) => {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-primary font-semibold">
              {isFallback ? "Juegos Destacados" : "Actividad Semanal"}
            </span>
            {!isFallback && games.length > 0 && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/25 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                Últimos 7 días
              </span>
            )}
          </div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-xl md:text-2xl font-bold text-on-surface">
            {isFallback
              ? "Descubre Juegos Recomendados"
              : "Jugados Recientemente"}
          </h2>
          <p className="text-on-surface-variant text-xs sm:text-sm">
            {isFallback
              ? "Explora nuestra selección destacada y empieza a ganar recompensas"
              : "Tus salas y partidas jugadas durante esta semana"}
          </p>
        </div>

        <Link
          href="/dashboard/missions"
          className="group inline-flex items-center gap-1.5 text-primary hover:text-primary-container font-label-md text-xs sm:text-sm font-semibold transition-colors py-1 shrink-0"
        >
          <span>Ver todas las misiones</span>
          <span className="transform transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* Fallback Invitation Banner */}
      {isFallback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-primary/15 via-primary-container/10 to-secondary/10 border border-primary/25 flex items-center gap-3.5 shadow-lg backdrop-blur-md"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
            <SparklesIcon className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-body-md text-sm font-semibold text-on-surface">
              ¡Aún no has jugado esta semana!
            </p>
            <p className="text-body-sm text-xs text-on-surface-variant">
              Descubre estos 5 juegos destacados, participa y comienza a subir
              de nivel para desbloquear recompensas exclusivas.
            </p>
          </div>
        </motion.div>
      )}

      {/* Grid of Games */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
          {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"].map((skId) => (
            <div
              key={skId}
              className="aspect-[3/4] rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 animate-pulse"
            />
          ))}
        </div>
      ) : games.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
          {games.slice(0, 5).map((game, idx) => (
            <motion.div
              key={game.id || idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.05,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              <GameCard {...game} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center rounded-2xl border border-outline-variant/20 bg-surface-container-low/50">
          <p className="text-on-surface-variant text-sm">
            No hay juegos disponibles en este momento.
          </p>
        </div>
      )}
    </section>
  );
};
