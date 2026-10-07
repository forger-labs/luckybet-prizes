"use client";

import { motion } from "framer-motion";

import { SparklesIcon } from "@/icons";

export const DashboardWelcomeHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2"
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary bg-secondary/10 border border-secondary/20 px-2.5 py-0.5 rounded-full">
            <SparklesIcon className="w-3.5 h-3.5 text-secondary" />
            Pase de Temporada Activo
          </span>
        </div>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
          ¡Bienvenido de vuelta, Comandante! 👋
        </h1>
      </div>
    </motion.header>
  );
};
