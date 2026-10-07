"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_LINKS } from "@shared/constants";

import { useAuthAdmin } from "@/hooks/useAuthAdmin";
import type { AdminSidebarProps } from "@/types/navbar/AdminSidebar";

export const AdminSidebar = ({ open, onToggle }: AdminSidebarProps) => {
  const pathname = usePathname();
  const { logout, user } = useAuthAdmin();

  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={`
        hidden md:flex flex-col sticky left-0 top-0 h-dvh min-h-dvh
        bg-surface-container-low border-r border-outline-variant/20
        transition-all duration-300 ease-out z-30 shrink-0 select-none
        ${open ? "w-64" : "w-20"}
      `}
    >
      {/* ── Brand Header ── */}
      <div className="flex items-center justify-between h-20 px-4 border-b border-outline-variant/15 relative">
        <div
          className={`flex items-center gap-3 overflow-hidden ${
            open ? "px-2" : "justify-center w-full"
          }`}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary-container/10 border border-primary/30 text-primary shadow-[0_0_16px_rgba(56,189,248,0.2)] shrink-0">
            <span className="material-symbols-outlined text-2xl">
              admin_panel_settings
            </span>
          </div>

          {open && (
            <div className="min-w-0 transition-opacity duration-200">
              <span className="font-(--font-plus-jakarta-sans) text-base font-bold text-on-surface tracking-tight block truncate">
                LuckyBet
              </span>
              <span className="font-label-sm text-[10px] text-primary/80 uppercase tracking-widest block">
                Portal Admin
              </span>
            </div>
          )}
        </div>

        {/* Toggle rail button */}
        <button
          onClick={onToggle}
          type="button"
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-surface-container border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 hover:bg-surface-container-high transition-all shadow-md cursor-pointer z-40 active:scale-90"
          aria-label={
            open ? "Contraer barra lateral" : "Expandir barra lateral"
          }
        >
          <span
            className={`material-symbols-outlined text-base transition-transform duration-300 ${
              open ? "" : "rotate-180"
            }`}
          >
            chevron_left
          </span>
        </button>
      </div>

      {/* ── Main Navigation ── */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto space-y-1.5">
        <ul className="space-y-1.5">
          {ADMIN_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <li key={link.path}>
                <Link
                  href={link.path}
                  title={!open ? link.text : undefined}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-xl font-label-md text-sm
                    transition-all duration-200 group relative
                    ${
                      active
                        ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_14px_rgba(56,189,248,0.12)] font-semibold"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 active:scale-[0.98]"
                    }
                    ${open ? "" : "justify-center px-0"}
                  `}
                >
                  <span
                    className={`material-symbols-outlined text-xl shrink-0 transition-colors ${
                      active
                        ? "text-primary"
                        : "text-on-surface-variant group-hover:text-primary"
                    }`}
                  >
                    {link.icon}
                  </span>

                  {open && (
                    <span className="truncate tracking-wide">{link.text}</span>
                  )}

                  {active && (
                    <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#38bdf8]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Footer: User card & Logout ── */}
      <div className="p-3 border-t border-outline-variant/15 space-y-2 bg-surface-container/30">
        {open && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-surface-container-lowest/60 border border-outline-variant/15">
            <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary text-xs font-bold shrink-0">
              <span className="material-symbols-outlined text-base">
                shield_person
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-label-md text-xs font-semibold text-on-surface truncate">
                {user?.username || "Administrador"}
              </p>
              <p className="font-label-sm text-[10px] text-on-surface-variant truncate">
                Sesión segura
              </p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={logout}
          title={!open ? "Cerrar sesión" : undefined}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-sm
            text-error/80 hover:text-error hover:bg-error-container/20 active:scale-[0.98]
            transition-all duration-200 cursor-pointer
            ${open ? "" : "justify-center px-0"}
          `}
        >
          <span className="material-symbols-outlined text-xl shrink-0">
            logout
          </span>
          {open && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
};
