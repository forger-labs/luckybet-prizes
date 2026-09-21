"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { ADMIN_LINKS } from "@shared/constants";

import { useAuthAdmin } from "@/hooks/useAuthAdmin";
import type { MobileDrawerProps } from "@/types/navbar/AdminSidebar";

export const MobileDrawer = ({ open, onClose }: MobileDrawerProps) => {
  const pathname = usePathname();
  const { logout, user } = useAuthAdmin();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-dvh w-80 max-w-[85vw] bg-surface-container-low/95 backdrop-blur-2xl
          border-r border-outline-variant/30 flex flex-col justify-between p-6 transition-transform duration-300 ease-out md:hidden shadow-2xl
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Top: Brand & Close */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/25 to-primary-container/10 border border-primary/30 text-primary shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                <span className="material-symbols-outlined text-2xl">
                  admin_panel_settings
                </span>
              </div>
              <div>
                <span className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface block leading-tight">
                  LuckyBet
                </span>
                <span className="font-label-sm text-[10px] text-primary/80 uppercase tracking-widest block">
                  Panel de Administración
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-surface-container border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
              aria-label="Cerrar menú"
              type="button"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Nav List */}
          <nav>
            <ul className="space-y-2">
              {ADMIN_LINKS.map((link) => {
                const active = isActive(link.path);
                return (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-sm
                        transition-all duration-200
                        ${
                          active
                            ? "bg-primary/15 text-primary border border-primary/30 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.1)]"
                            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
                        }
                      `}
                    >
                      <span
                        className={`material-symbols-outlined text-xl ${
                          active ? "text-primary" : "text-on-surface-variant"
                        }`}
                      >
                        {link.icon}
                      </span>
                      <span>{link.text}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Bottom: User & Logout */}
        <div className="pt-4 border-t border-outline-variant/20 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/20">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              <span className="material-symbols-outlined text-lg">
                account_circle
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-label-md text-xs font-semibold text-on-surface truncate">
                {user?.username || "Administrador"}
              </p>
              <p className="font-label-sm text-[10px] text-secondary font-medium tracking-wide uppercase">
                {user?.role || "ADMIN"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl font-label-md text-sm text-error hover:bg-error-container/20 border border-error/20 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};
