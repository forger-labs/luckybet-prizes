"use client";

import { motion } from "framer-motion";

import { LogoutIcon } from "@shared/icons/LogoutIcon";

export const Logout = ({
  logout = () => {},
  open,
}: {
  logout: () => void;
  open: boolean;
}) => {
  return (
    <div className="px-2 mt-auto pt-4 border-t border-white/5">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group w-full flex items-center rounded-xl p-3 text-xs font-semibold text-error/80 hover:text-error hover:bg-error-container/20 active:bg-error-container/30 transition-all cursor-pointer ${
          open ? "gap-3.5" : "justify-center"
        }`}
        type="button"
        onClick={logout}
      >
        <div className="shrink-0 transition-transform group-hover:-translate-x-0.5">
          <LogoutIcon />
        </div>
        {open && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            className="overflow-hidden whitespace-nowrap tracking-tight"
          >
            Cerrar Sesión
          </motion.span>
        )}

        {!open && (
          <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-surface-container-highest text-error text-xs font-semibold rounded-lg shadow-xl border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            Cerrar Sesión
          </div>
        )}
      </motion.button>
    </div>
  );
};
