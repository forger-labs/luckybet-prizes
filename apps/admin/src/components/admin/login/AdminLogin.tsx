"use client";

import { useRouter } from "next/navigation";
import { sileo } from "sileo";

import { ROUTES } from "@/constant";
import { useAuthAdmin } from "@/hooks/useAuthAdmin";
import LoginCard from "./LoginCard";
import LoginForm from "./LoginForm";

export default function AdminLogin() {
  const { login } = useAuthAdmin();
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    try {
      const res = await login(username, password);
      if (res.status) {
        sileo.success({
          title: `Bienvenido, ${username}`,
          duration: 3500,
        });

        router.push(ROUTES.panel.index);
        return
      }

      sileo.error({
        title: "Error en el inicio de sesion",
        description: `${res.message}`,
      });
    } catch (err) {
      sileo.error({
        title: "Error en el inicio de sesion",
        description: `${err}`,
      });
    }
  };

  return (
    <main className="min-h-dvh flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden bg-background">
      {/* ── Ambient Background Layer (Zero JS, 60fps GPU-accelerated) ── */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Cyber subtle grid */}
        <div className="absolute inset-0 bg-cyber-grid opacity-60" />

        {/* Top-left Arctic Neon Orb */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/15 rounded-full blur-[120px] animate-glow-pulse" />

        {/* Bottom-right Evening Gold Orb */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] animate-glow-pulse" />

        {/* Center ambient vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,19,38,0.7)_100%)]" />
      </div>

      {/* ── Login Centerpiece ── */}
      <div className="w-full flex justify-center animate-in fade-in zoom-in-95 duration-500">
        <LoginCard
          icon="admin_panel_settings"
          title="LuckyBet Premios"
          subtitle="Panel de Control"
        >
          <LoginForm onLogin={handleLogin} />
        </LoginCard>
      </div>
    </main>
  );
}
