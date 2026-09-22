"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { UsersIcon } from "@/icons";
import type { GameItem } from "@/types/dashboard";

export const GameCard = ({
  title,
  category,
  imageUrl,
  alt,
  tag,
  tagColor = "gold",
  activePlayers,
  jackpot,
}: GameItem) => {
  const tagColorClasses = {
    gold: "bg-secondary/20 text-secondary border-secondary/40",
    cyan: "bg-primary/20 text-primary border-primary/40",
    emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    purple: "bg-tertiary/20 text-tertiary border-tertiary/40",
  };

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-xl cursor-pointer bg-surface-container"
    >
      {/* Game Image */}
      <Image
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        alt={alt}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        src={imageUrl}
      />

      {/* Dynamic Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top Overlay Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        {tag ? (
          <span
            className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${tagColorClasses[tagColor]}`}
          >
            {tag}
          </span>
        ) : (
          <span className="text-[10px] text-on-surface-variant/80 uppercase tracking-wider px-2 py-0.5 rounded bg-surface-container-lowest/60 backdrop-blur-md">
            {category}
          </span>
        )}

        <span className="inline-flex items-center gap-1 text-[11px] text-on-surface bg-surface-container-lowest/80 border border-white/10 px-2 py-0.5 rounded-full backdrop-blur-md font-medium">
          <UsersIcon className="w-3 h-3 text-primary" />
          {activePlayers}
        </span>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
          {jackpot && (
            <p className="text-[11px] font-bold text-secondary flex items-center gap-1 mb-0.5">
              <span>Bote:</span>
              <span>{jackpot}</span>
            </p>
          )}
          <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-on-surface-variant font-medium">
            {category}
          </p>
        </div>

        {/* Hover Action Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          className="mt-2.5 w-full bg-primary hover:bg-primary-container text-on-primary font-label-md py-2.5 rounded-xl font-bold text-xs sm:text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
        >
          Jugar Ahora
        </motion.button>
      </div>
    </motion.div>
  );
};
