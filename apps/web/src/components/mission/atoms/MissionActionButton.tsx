"use client";

import { motion } from "framer-motion";

import { CheckCircleIcon } from "@/icons";

interface Props {
  completed?: boolean;
  label?: string;
  onClick?: () => void;
}

export const MissionActionButton = ({
  completed,
  label = "Hacer Misión",
  onClick,
}: Props) => {
  if (completed) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#064e3b] text-[#34d399] font-black text-xs border-2 border-[#059669]">
        <CheckCircleIcon className="w-3.5 h-3.5 text-[#34d399]" />
        Completado
      </span>
    );
  }

  return (
    <motion.button
      whileHover={{
        scale: 1.04,
      }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      type="button"
      className="px-4 py-2 rounded-xl bg-[#38bdf8] hover:bg-[#7bd0ff] text-[#00354a] font-black text-xs sm:text-sm transition-all border-2 border-[#8ed5ff] shadow-md cursor-pointer inline-flex items-center gap-1.5"
    >
      <span>{label}</span>
    </motion.button>
  );
};
