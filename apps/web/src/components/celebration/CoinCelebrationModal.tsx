"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import { CoinsIcon, SparklesIcon } from "@/icons";
import type { CoinCelebrationModalProps } from "@/types/celebration";

export function CoinCelebrationModal({
  data,
  isOpen,
  onClose,
}: CoinCelebrationModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  const title = data.title || "¡Recompensa Reclamada!";
  const subtitle =
    data.subtitle || "Tus fichas han sido acreditadas a tu balance.";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Solid Backdrop without blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#060e20]/90"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md bg-surface-container-high border border-secondary/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl flex flex-col items-center space-y-5"
        >
          {/* Central Animated Coin Badge */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.5, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary/15 border-2 border-secondary flex items-center justify-center text-secondary shadow-[0_0_30px_rgba(255,198,64,0.3)]"
            >
              <CoinsIcon className="w-10 h-10 sm:w-12 sm:h-12 text-secondary" />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md"
            >
              <SparklesIcon className="w-4 h-4 text-on-secondary" />
            </motion.div>
          </div>

          {/* Titles & Amount */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-secondary">
              <SparklesIcon className="w-4 h-4" />
              <span className="text-xs uppercase font-extrabold tracking-wider">
                Recompensa Obtenida
              </span>
              <SparklesIcon className="w-4 h-4" />
            </div>

            <h3 className="font-(--font-plus-jakarta-sans) text-xl sm:text-2xl font-black text-[#f8fafc]">
              {title}
            </h3>

            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
              className="font-(--font-plus-jakarta-sans) text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight pt-1 drop-shadow-[0_2px_10px_rgba(255,198,64,0.35)]"
            >
              +{data.coins.toLocaleString("es-ES")} Fichas
            </motion.p>

            <p className="font-(--font-be-vietnam-pro) text-xs sm:text-sm text-[#bdc8d1] leading-relaxed max-w-xs mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Action Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-2xl bg-secondary hover:bg-[#ffdf9f] text-on-secondary font-(--font-plus-jakarta-sans) text-sm font-black border border-[#ffdf9f] shadow-[0_0_20px_rgba(255,198,64,0.3)] transition-all cursor-pointer"
          >
            Continuar
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
