"use client";

import type { LoginCardProps } from "@/types/login";

export default function LoginCard({
  icon = "admin_panel_settings",
  title,
  subtitle,
  children,
  footer,
}: LoginCardProps) {
  return (
    <div className="w-full max-w-[460px] bg-surface-container-low/90 backdrop-blur-2xl rounded-2xl p-8 md:p-10 border border-outline-variant/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative z-10 transition-all">
      {/* Top Ambient Glow behind card */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-12 bg-primary/20 blur-2xl rounded-full pointer-events-none" />

      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-8">
        {/* Emblem */}
        <div className="relative mb-4 group">
          <div className="absolute inset-0 bg-primary/25 rounded-2xl blur-lg animate-glow-pulse" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-surface-container-highest to-surface-container-high border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-transform duration-300 group-hover:scale-105">
            <span className="material-symbols-outlined text-3xl">{icon}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-(--font-plus-jakarta-sans) text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight leading-tight">
          {title}
        </h1>

        {/* Subtitle Pill */}
        {subtitle && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/25 text-secondary text-xs font-semibold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            {subtitle}
          </div>
        )}
      </div>

      {/* Form Body */}
      {children}

      {/* Security Footer */}
      <div className="mt-8 pt-6 border-t border-outline-variant/15 flex items-center justify-center gap-2 text-on-surface-variant/80 text-xs">
        <span className="material-symbols-outlined text-sm text-primary/80">
          lock
        </span>
        <span>Acceso restringido · Conexión segura cifrada</span>
      </div>

      {footer && (
        <div className="mt-4 text-center text-xs text-on-surface-variant">
          {footer}
        </div>
      )}
    </div>
  );
}
