"use client";

import { motion } from "framer-motion";

import { CashIcon } from "@shared/icons/CashIcon";

import { useAuthContext } from "@/hooks/useAuth";

export const Balance = ({ className = "" }: { className?: string }) => {
  const { user } = useAuthContext();

  const formattedCash =
    typeof user?.cash === "number"
      ? user.cash.toLocaleString("es-AR")
      : user?.cash || "0";

  const currency = user?.currency || "ARS";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2.5 bg-surface-container-high/80 hover:bg-surface-container-high border border-white/10 px-3.5 py-1.5 rounded-xl transition-all shadow-inner"
      >
        <div className="shrink-0 drop-shadow-[0_0_8px_rgba(255,198,64,0.4)]">
          <CashIcon fill="#FFC640" height={20} width={20} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-on-surface-variant uppercase font-semibold tracking-wider leading-tight">
            Saldo
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm font-bold text-secondary tracking-tight">
              {formattedCash}
            </span>
            <span className="text-[10px] font-semibold text-primary">
              {currency}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
