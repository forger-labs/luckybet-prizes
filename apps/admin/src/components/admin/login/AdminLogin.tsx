"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { sileo } from "sileo";

import { ROUTES } from "@/constant";
import { useAuthAdmin } from "@/hooks/useAuthAdmin";
import LoginCard from "./LoginCard";
import LoginForm from "./LoginForm";

/**
 * AdminLogin — organismo principal de la pantalla de login administrativo.
 *
 * Compone LoginCard + LoginForm con los efectos ambientales
 * (background glows, partículas flotantes) y el footer legal.
 */
export default function AdminLogin() {
  const { login } = useAuthAdmin();
  const router = useRouter();
  const particleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleLogin = async (username: string, password: string) => {
    await login(username, password);

    sileo.success({
      title: `Bienvenido, ${username}`,
      duration: 4000,
    });

    router.push(ROUTES.panel.index);
  };

  // Floating particles — pure atmosphere, no state
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement("div");
      const size = Math.random() * 4 + 2;
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;

      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        background: "rgba(142, 213, 255, 0.2)",
        position: "fixed",
        borderRadius: "50%",
        left: `${startX}vw`,
        top: `${startY}vh`,
        pointerEvents: "none",
        zIndex: "-5",
      });

      document.body.appendChild(particle);

      const animation = particle.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 0 },
          {
            transform: `translate(${Math.random() * 100 - 50}px, -100px) scale(0)`,
            opacity: 0.5,
          },
          {
            transform: `translate(${Math.random() * 200 - 100}px, -200px) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 3000 + 3000,
          easing: "ease-out",
        },
      );

      animation.onfinish = () => particle.remove();
    };

    particleRef.current = setInterval(createParticle, 500);
    return () => {
      if (particleRef.current) clearInterval(particleRef.current);
    };
  }, []);

  return (
    <main className="min-h-dvh flex items-center justify-center p-container-padding-mobile md:p-container-padding-desktop relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
      </div>

      {/* Login Card */}
      <LoginCard
        icon="admin_panel_settings"
        title="LuckyBet Premios"
        subtitle="Admin Portal"
      >
        <LoginForm onLogin={handleLogin} />
      </LoginCard>
    </main>
  );
}
