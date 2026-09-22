"use client";

import { motion } from "framer-motion";

import { BoltIcon, CoinsIcon, SparklesIcon } from "@/icons";

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
        <p className="text-on-surface-variant text-xs sm:text-sm mt-0.5">
          Tienes{" "}
          <strong className="text-primary font-medium">
            3 misiones activas
          </strong>{" "}
          disponibles hoy en el puerto.
        </p>
      </div>

      {/* Quick stats badges */}
      <div className="flex items-center gap-3">
        <div className="bg-surface-container-high/80 border border-white/10 rounded-xl px-3.5 py-2 flex items-center gap-2.5 backdrop-blur-md">
          <div className="p-1.5 rounded-lg bg-secondary/20 text-secondary">
            <CoinsIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
              Recompensa Diaria
            </p>
            <p className="text-xs font-bold text-secondary">Disponible</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          className="bg-gradient-to-r from-secondary-container to-secondary text-on-secondary px-4 py-2.5 rounded-xl text-xs font-bold shadow-md glow-gold-sm hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <BoltIcon className="w-3.5 h-3.5" />
          Reclamar Bonus
        </motion.button>
      </div>
    </motion.header>
  );
};
