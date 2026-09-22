"use client";

import { motion } from "framer-motion";

import { SparklesIcon } from "@/icons";
import { WeeklyBonus } from "./WeeklyBonus";

export const DashboardHeader = () => {
  return (
    <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      {/* Greeting & Active Quest status */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="md:flex-1 space-y-1.5"
      >
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/25 px-2.5 py-0.5 rounded-full">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>Centro de Recompensas</span>
        </div>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
          Misiones & Desafíos
        </h1>
        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-lg">
          Completa objetivos diarios y comunitarios para acumular fichas, ganar
          experiencia y ascender en el ranking de LuckyBet.
        </p>
      </motion.div>

      <div className="md:w-80 lg:w-96">
        <WeeklyBonus />
      </div>
    </section>
  );
};
