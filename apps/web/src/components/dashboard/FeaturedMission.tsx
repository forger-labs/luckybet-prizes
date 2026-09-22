"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { BoltIcon, ClockIcon, CoinsIcon, SparklesIcon } from "@/icons";

export const FeaturedMission = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl border border-secondary/40 group shadow-2xl h-full flex flex-col justify-between"
    >
      {/* Background Image with cinematic grade */}
      <Image
        alt="Mesa de Blackjack en Midnight Harbor"
        fill
        sizes="(max-width: 1024px) 100vw, 66vw"
        priority
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSC7oM947uIZvDHrVhv_MLm2W22WS_o2xWCxRC7byGghsKgL558BQAx6iagOuJcBi-L6qk9cHTG9-k97XcRwzDg_y6ZPsKLGG8CEZJXE8P_CjV5g6qOi7SIBukRc7--tXAs30I-v7s9yQMYGZWUHLf3Z97x39q-UejO_nKUgUF0MHECi3DwiPFLtayaqqfB8-9dyeWE4g1pSvygY-ZPLNFBTBi9ErUQgNXNR6scLU8D8n52ME2GyhmYuVuOfSD972Kod4TAORUe7KC"
      />

      {/* Multi-layered Gradient Overlay for supreme contrast & atmospheric depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/85 to-surface-container-lowest/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-surface-container-lowest/40" />

      {/* Ambient glow accent */}
      <div className="absolute top-0 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <div className="inline-flex items-center gap-1.5 bg-secondary/20 text-secondary border border-secondary/50 px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
            <BoltIcon className="w-3.5 h-3.5 text-secondary" />
            <span className="font-label-sm text-xs uppercase tracking-wider font-bold">
              Misión del Día
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-surface-container-highest/80 text-on-surface-variant border border-white/10 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md">
            <ClockIcon className="w-3.5 h-3.5 text-primary" />
            <span>Expira en 05h 24m</span>
          </div>
        </div>

        {/* Title and Description */}
        <div className="max-w-xl my-auto py-2">
          <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface mb-2 tracking-tight">
            Gana 3 rondas en Blackjack Harbor
          </h2>
          <p className="text-on-surface-variant font-body-md text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
            Pon a prueba tu estrategia en las mesas exclusivas del puerto.
            Completa este desafío antes de la medianoche para reclamar
            recompensas especiales.
          </p>

          {/* Progress Indicator */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 max-w-xs h-2 bg-surface-container-high rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "33.3%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-secondary rounded-full glow-gold-sm"
              />
            </div>
            <span className="text-xs font-medium text-on-surface-variant">
              1 de 3 completadas
            </span>
          </div>
        </div>

        {/* Footer: Rewards & CTA Button */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 mt-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-on-surface-variant text-[11px] uppercase tracking-wider font-medium">
                Recompensa Total
              </span>
              <div className="flex items-center gap-2">
                <span className="text-secondary font-headline-lg-mobile text-xl sm:text-2xl font-bold flex items-center gap-1.5">
                  <CoinsIcon className="w-5 h-5 text-secondary" />
                  10.000 Fichas
                </span>
                <span className="text-primary text-xs font-semibold bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <SparklesIcon className="w-3 h-3" />
                  +500 XP
                </span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 25px rgba(255, 198, 64, 0.4)",
            }}
            whileTap={{ scale: 0.96 }}
            type="button"
            className="bg-secondary hover:bg-secondary-fixed text-on-secondary px-6 sm:px-8 py-3 rounded-xl font-title-md text-sm sm:text-base font-bold glow-gold active:scale-95 transition-all cursor-pointer flex items-center gap-2 shadow-lg"
          >
            <BoltIcon className="w-4 h-4 text-on-secondary" />
            Iniciar Misión
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};
