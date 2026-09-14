"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_LINKS } from "@shared/constants";

import { useAuthAdmin } from "@/hooks/useAuthAdmin";
import type { AdminSidebarProps } from "@/types/navbar/AdminSidebar";

/**
 * AdminSidebar — desktop collapsible sidebar for the admin panel.
 *
 * Follows the web Sidebar.tsx pattern for collapsible behavior, adapted
 * to the admin domain with Material Symbols icons, logo/badge area,
 * navigation items from ADMIN_LINKS, a "Claim Daily Bonus" CTA,
 * and a settings + logout section at the bottom.
 */
export const AdminSidebar = ({ open, onToggle }: AdminSidebarProps) => {
  const pathname = usePathname();
  const { logout } = useAuthAdmin();

  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={
        "hidden md:grid sticky left-0 top-0 pt-10 pb-6 grid-cols-1 grid-rows-[auto_auto_1fr_auto_auto] bg-surface-container min-h-dvh h-dvh transition-all duration-300 z-30 shrink-0 " +
        (open ? "w-64" : "w-20")
      }
    >
      {/* ── Toggle Button ── */}
      <button
        onClick={onToggle}
        type="button"
        className={
          "absolute hover:cursor-pointer z-10 left-full top-[0%] bg-surface-container border-r border-b border-outline-variant rounded-r-full pr-2 pt-2 pb-1 hover:bg-surface-container-high transition-colors"
        }
        aria-label={open ? "Contraer menú" : "Expandir menú"}
      >
        <span className="material-symbols-outlined text-on-surface transition-transform duration-300">
          {open ? "chevron_left" : "chevron_right"}
        </span>
      </button>

      {/* ── Logo + User Badge ── */}
      <div
        className={
          "flex items-center self-start pr-2 gap-3 mb-6 " +
          (open ? "pl-6" : "pl-5 justify-center")
        }
      >
        <div className="block p-2 pb-0 bg-primary/20 rounded-lg shrink-0">
          <span className="material-symbols-outlined text-primary text-2xl">
            admin_panel_settings
          </span>
        </div>

        <div
          className={
            "overflow-hidden transition-all duration-300 " +
            (open ? "opacity-100 w-auto" : "opacity-0 w-0 invisible")
          }
        >
          <p className="font-(--font-plus-jakarta-sans) text-title-md font-semibold text-on-surface whitespace-nowrap leading-tight">
            Admin LuckyBet
          </p>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="self-start">
        <ul className="flex flex-col">
          {ADMIN_LINKS.map((link) => (
            <li
              key={link.path}
              className={
                "relative font-medium transition-colors " +
                (isActive(link.path)
                  ? "bg-primary/10 text-primary border-r-4 border-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high active:bg-surface-variant")
              }
            >
              <Link
                className={
                  "flex items-center gap-3 p-3 " +
                  (open ? "" : "justify-center")
                }
                href={link.path}
              >
                <span
                  className={
                    "material-symbols-outlined " +
                    (isActive(link.path)
                      ? "text-primary"
                      : "text-on-surface-variant")
                  }
                >
                  {link.icon}
                </span>
                <span
                  className={
                    "pt-0.5 overflow-hidden whitespace-nowrap transition-all duration-300 " +
                    (open ? "opacity-100 w-auto" : "opacity-0 w-0 invisible")
                  }
                >
                  {link.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Settings + Logout ── */}
      <div className="self-end border-t border-outline-variant/30 pt-2">
        <Link
          href="#"
          className={
            "flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high active:bg-surface-variant transition-colors " +
            (open ? "" : "justify-center")
          }
        >
          <span className="material-symbols-outlined">settings</span>
          <span
            className={
              "overflow-hidden whitespace-nowrap transition-all duration-300 " +
              (open ? "opacity-100 w-auto" : "opacity-0 w-0 invisible")
            }
          >
            Configuración
          </span>
        </Link>

        {/* Logout */}
        <button
          type="button"
          className={
            "w-full flex items-center gap-3 p-3 hover:cursor-pointer text-on-surface-variant hover:bg-surface-container-high active:bg-surface-variant transition-colors " +
            (open ? "" : "justify-center")
          }
          onClick={logout}
        >
          <span className="material-symbols-outlined">logout</span>
          <span
            className={
              "overflow-hidden whitespace-nowrap transition-all duration-300 " +
              (open ? "opacity-100 w-auto" : "opacity-0 w-0 invisible")
            }
          >
            Cierra sesión
          </span>
        </button>
      </div>
    </aside>
  );
};
