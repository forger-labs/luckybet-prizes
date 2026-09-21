"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useAuthAdmin } from "@/hooks/useAuthAdmin";
import type { AdminHeaderProps } from "@/types/navbar/AdminSidebar";

const ROUTE_INFO: Record<
  string,
  { title: string; subtitle: string; icon: string }
> = {
  "/panel": {
    title: "Misiones",
    subtitle: "Gestión y catálogo de misiones activas",
    icon: "assignment",
  },
  "/panel/revision": {
    title: "Revisión de Tareas",
    subtitle: "Validación de evidencias y recompensas",
    icon: "fact_check",
  },
  "/panel/jugadores": {
    title: "Jugadores",
    subtitle: "Monitoreo de actividad y progresión",
    icon: "stadia_controller",
  },
  "/panel/usuarios": {
    title: "Usuarios",
    subtitle: "Control de accesos y roles administrativos",
    icon: "group",
  },
};

export const AdminHeader = ({
  onOpenMobileDrawer,
  title,
  subtitle,
}: AdminHeaderProps) => {
  const pathname = usePathname();
  const { user } = useAuthAdmin();

  const currentRoute = useMemo(() => {
    return (
      ROUTE_INFO[pathname] || {
        title: title || "Panel de Control",
        subtitle: subtitle || "Administración general",
        icon: "dashboard",
      }
    );
  }, [pathname, title, subtitle]);

  const initials = useMemo(() => {
    if (!user?.username) return "AD";
    return user.username.slice(0, 2).toUpperCase();
  }, [user?.username]);

  return (
    <header className="sticky top-0 z-20 w-full bg-surface-container/85 backdrop-blur-xl border-b border-outline-variant/20 transition-all duration-300">
      <div className="flex items-center justify-between h-20 px-4 md:px-8">
        {/* Left: Mobile trigger & Page Info */}
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <button
            type="button"
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-surface-container-high/60 border border-outline-variant/30 md:hidden hover:bg-surface-container-highest hover:border-primary/40 active:scale-95 transition-all text-on-surface cursor-pointer"
            onClick={onOpenMobileDrawer}
            aria-label="Abrir menú de navegación"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 text-primary shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              <span className="material-symbols-outlined text-xl">
                {currentRoute.icon}
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface truncate tracking-tight">
                  {currentRoute.title}
                </h1>
                <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-sm font-medium bg-primary/10 text-primary border border-primary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Activo
                </span>
              </div>
              <p className="font-body-md text-label-sm text-on-surface-variant truncate hidden sm:block">
                {currentRoute.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right: System Health & User Pill */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Live System Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/25">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider text-[11px]">
              Sistema en línea
            </span>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3 p-1.5 pr-3 rounded-xl bg-surface-container-high/50 border border-outline-variant/20 hover:border-primary/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary font-bold text-xs shadow-[0_0_12px_rgba(56,189,248,0.25)]">
              {initials}
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="font-label-md text-label-md font-semibold text-on-surface leading-tight">
                {user?.username || "Administrador"}
              </span>
              <span className="font-label-sm text-[10px] text-secondary font-medium tracking-wide uppercase">
                {user?.role || "ADMIN"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
