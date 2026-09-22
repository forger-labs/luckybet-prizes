"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { SidebarLinkType } from "@shared/types";

const isActive = (path: string, actualPath: string) => {
  return actualPath === path;
};

export const ItemSidebar = ({
  icon: Icon,
  path,
  text,
  pathname,
  open,
}: SidebarLinkType & { pathname: string; open: boolean }) => {
  const active = isActive(path, pathname);

  return (
    <li className="relative my-0.5 px-2">
      <Link
        href={path}
        className={`relative group flex items-center rounded-xl p-3 text-sm font-semibold transition-all duration-200 ${
          open ? "gap-3.5" : "justify-center"
        } ${
          active
            ? "bg-secondary/15 text-secondary shadow-sm"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 active:bg-surface-variant"
        }`}
      >
        {/* Active Pill Indicator (Full perimeter rounded hairline, not a side-stripe) */}
        {active && (
          <motion.div
            layoutId="sidebar-active-indicator"
            className="absolute inset-0 rounded-xl border border-secondary/40 pointer-events-none"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}

        {/* Icon with glow when active */}
        <div
          className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
            active ? "drop-shadow-[0_0_8px_rgba(255,198,64,0.4)]" : ""
          }`}
        >
          <Icon fill={active ? "#FFC640" : "#BDC8D1"} />
        </div>

        {/* Text Label */}
        {open && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            className="whitespace-nowrap overflow-hidden tracking-tight font-medium"
          >
            {text}
          </motion.span>
        )}

        {/* Collapsed Tooltip */}
        {!open && (
          <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-surface-container-highest text-on-surface text-xs font-semibold rounded-lg shadow-xl border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            {text}
          </div>
        )}
      </Link>
    </li>
  );
};
