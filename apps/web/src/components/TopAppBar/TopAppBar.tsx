"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@shared/constants";
import { OpenMenu } from "@shared/icons/OpenMenu";

import { useAuthContext } from "@/hooks/useAuth";
import { BellIcon, SparklesIcon } from "@/icons";
import { Balance } from "./Balance";

export const TopAppBar = ({ onMenuToggle }: { onMenuToggle?: () => void }) => {
  const { user } = useAuthContext();
  const displayName = user?.name || user?.login || "Jugador";

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 sm:px-6 md:px-container-padding-desktop h-16 transition-colors">
      {/* Brand / Logo */}
      <div className="flex items-center gap-3">
        <Link
          href={ROUTES.DASHBOARD}
          className="flex items-center gap-2 group transition-transform active:scale-95"
        >
          <div className="relative flex items-center">
            <Image
              src="/luckybet_logo.png"
              alt="LuckyBet Logo"
              height={36}
              width={130}
              priority
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-bold text-secondary bg-secondary/15 border border-secondary/30 px-2 py-0.5 rounded-full ml-1">
            <SparklesIcon className="w-3 h-3 text-secondary" />
            HARBOR
          </span>
        </Link>
      </div>

      {/* Right Desktop Nav actions */}
      <div className="hidden md:flex items-center gap-4">
        <Balance />

        {/* Notifications Icon Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          aria-label="Ver notificaciones"
          className="relative p-2 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high border border-white/10 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
        >
          <BellIcon className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface-container-lowest animate-pulse" />
        </motion.button>

        {/* User Profile Avatar with VIP ring */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="flex items-center gap-2.5 pl-2 border-l border-white/10 cursor-pointer"
        >
          <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-2 ring-secondary/50 shadow-md">
            <Image
              alt="Perfil de usuario"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8hM-6HrYibIqyzkCNgeaR05_yrCaP-yr4fKPB72nT7Q0DcF3oe3GaUlzUEM27rolQZZ3gQTMWKNsSs9cFT5e1bafbATV-s4SDR2J2TCMlckRkIOSJxCtc3xL_2BAQaCYjeYoablOUP42167imWxrMexF6FALqXxiy79177VUu_8tu4eviQGg5JSzc9ObfVYjDvtX7vBRpc_HcjX9E3ot3s5CI9F8jUyotv1ygQTsvpvB1E2wJBOf2Xr3gk1__fzBRnWRgCx3CS3Ev"
              width={36}
              height={36}
            />
          </div>
          <div className="hidden xl:flex flex-col text-left leading-tight">
            <span className="text-xs font-bold text-on-surface truncate max-w-[120px]">
              {displayName}
            </span>
            <span className="text-[10px] text-secondary font-medium">
              VIP Elite I
            </span>
          </div>
        </motion.div>
      </div>

      {/* Mobile Right Controls: Balance + Hamburger */}
      <div className="flex md:hidden items-center gap-2">
        <Balance />
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={onMenuToggle}
          className="p-2 rounded-xl bg-surface-container-high/80 border border-white/10 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          aria-label="Abrir menú de navegación"
        >
          <OpenMenu />
        </motion.button>
      </div>
    </header>
  );
};
