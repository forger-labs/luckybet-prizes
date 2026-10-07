"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { PUBLIC_LINKS } from "@shared/constants";
import { CloseMenu } from "@shared/icons/CloseMenu";
import { Stars } from "@shared/icons/Stars";

import { useAuthContext } from "@/hooks/useAuth";
import { SparklesIcon } from "@/icons";
import { ItemSidebar } from "./ItemSidebar";
import { Logout } from "./Logout";
import { useDashboardData } from "@/hooks/useDashboardData";

export const MobileSidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const { user, logout } = useAuthContext();
  const {userRank} = useDashboardData()
  const displayName = user?.name || user?.login || "Jugador";

  // Close drawer on route change
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-out Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 left-0 bottom-0 z-50 h-dvh w-72 bg-surface-container-low/95 backdrop-blur-2xl border-r border-white/10 p-5 flex flex-col justify-between shadow-2xl overflow-y-auto"
          >
            {/* Top Brand & Close Action */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-secondary to-secondary-container rounded-xl flex-shrink-0 shadow-md glow-gold-sm">
                    <Stars height={24} width={24} />
                  </div>
                  <div>
                    <p className="font-title-md text-sm font-bold text-on-surface truncate max-w-[130px]">
                      {displayName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                  aria-label="Cerrar menú"
                  type="button"
                >
                  <CloseMenu />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="mt-5">
                <ul className="flex flex-col space-y-1">
                  {PUBLIC_LINKS.map((link, i) => (
                    <ItemSidebar
                      {...link}
                      pathname={pathname}
                      key={`${link.path}-${i}`}
                      open={true}
                    />
                  ))}
                </ul>
              </nav>
            </div>

            {/* Bottom Profile card & Logout */}
            <div className="mt-6 pt-4 space-y-4">
              <div className="p-3 rounded-xl bg-surface-container-high/40 border border-white/5 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-secondary/40 shrink-0">
                  <Image
                    alt="Perfil de usuario"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8hM-6HrYibIqyzkCNgeaR05_yrCaP-yr4fKPB72nT7Q0DcF3oe3GaUlzUEM27rolQZZ3gQTMWKNsSs9cFT5e1bafbATV-s4SDR2J2TCMlckRkIOSJxCtc3xL_2BAQaCYjeYoablOUP42167imWxrMexF6FALqXxiy79177VUu_8tu4eviQGg5JSzc9ObfVYjDvtX7vBRpc_HcjX9E3ot3s5CI9F8jUyotv1ygQTsvpvB1E2wJBOf2Xr3gk1__fzBRnWRgCx3CS3Ev"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-on-surface truncate max-w-[140px]">
                    {displayName}
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    {userRank ? `Rango: ${userRank.currentTier} ${userRank.currentXp} XP` : "Rango: Desconocido"}
                  </span>
                </div>
              </div>

              <Logout logout={logout} open={true} />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
