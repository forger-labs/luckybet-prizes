"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { PUBLIC_LINKS } from "@shared/constants";
import { Stars } from "@shared/icons/Stars";

import { useAuthContext } from "@/hooks/useAuth";
import { ChevronLeftIcon, SparklesIcon } from "@/icons";
import { ItemSidebar } from "./ItemSidebar";
import { Logout } from "./Logout";

export const Sidebar = ({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) => {
  const pathname = usePathname();
  const { user, logout } = useAuthContext();
  const displayName = user?.name || user?.login || "Jugador";

  return (
    <aside
      className={`hidden sticky lg:grid left-0 top-0 pt-20 pb-6 grid-cols-1 grid-rows-[auto_1fr_auto] bg-surface-container-low/95 backdrop-blur-xl border-r border-white/5 min-h-dvh h-dvh transition-all duration-300 z-30 ${
        open ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle collapse button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        type="button"
        className="absolute -right-3 top-24 z-40 bg-surface-container-high hover:bg-surface-container-highest border border-white/10 text-on-surface-variant hover:text-on-surface rounded-full p-1.5 shadow-lg transition-colors cursor-pointer"
        aria-label={open ? "Contraer barra lateral" : "Expandir barra lateral"}
      >
        <div
          className={`transition-transform duration-300 ${
            open ? "" : "rotate-180"
          }`}
        >
          <ChevronLeftIcon className="w-4 h-4 text-secondary" />
        </div>
      </motion.button>

      {/* User Brand & VIP Status Badge */}
      <div className="px-3 self-start">
        <div
          className={`p-2.5 rounded-2xl bg-surface-container-high/60 border border-white/5 flex items-center transition-all ${
            open ? "gap-3" : "justify-center"
          }`}
        >
          <motion.div
            whileHover={{ rotate: 12, scale: 1.05 }}
            className="p-2 bg-gradient-to-br from-secondary to-secondary-container rounded-xl flex-shrink-0 shadow-md glow-gold-sm"
          >
            <Stars height={24} width={24} />
          </motion.div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <p className="font-title-md text-sm font-bold text-on-surface tracking-tight truncate max-w-[130px]">
                    {displayName}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 self-start">
        <ul className="flex flex-col space-y-1">
          {PUBLIC_LINKS.map((link, i) => (
            <ItemSidebar
              {...link}
              pathname={pathname}
              key={`${link.path}-${i}`}
              open={open}
            />
          ))}
        </ul>
      </nav>

      {/* Bottom Logout Component */}
      <Logout logout={logout} open={open} />
    </aside>
  );
};
