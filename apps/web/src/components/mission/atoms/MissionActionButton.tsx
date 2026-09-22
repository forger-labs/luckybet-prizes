"use client";

import { motion } from "framer-motion";

import { CheckCircleIcon } from "@/icons";

interface Props {
  completed?: boolean;
  onClick?: () => void;
}

export const MissionActionButton = ({ completed, onClick }: Props) => {
  if (completed) {
    return (
      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container-highest/80 text-on-surface-variant/80 font-bold text-xs border border-white/5 cursor-default">
        <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
        Completado
      </span>
    );
  }

  return (
    <motion.button
      whileHover={{
        scale: 1.04,
        boxShadow: "0 0 15px rgba(56, 189, 248, 0.35)",
      }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      type="button"
      className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
    >
      Hacer Misión
    </motion.button>
  );
};
