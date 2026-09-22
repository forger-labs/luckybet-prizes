"use client";

import { useEffect, useState } from "react";

import type { Mission } from "@shared/types/mission";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MissionSection } from "@/components/mission/organisms/MissionSection";

const DAILY_MISSIONS: Mission[] = [
  {
    id: "instagram",
    title: "Seguir en Instagram",
    description:
      "Sigue la cuenta oficial de LuckyBet en Instagram para mantenerte al día con las promociones exclusivas.",
    reward: "500 fichas",
    icon: "camera",
    color: "#E1306C",
    href: "/dashboard/missions/instagram",
    completed: true,
  },
  {
    id: "telegram",
    title: "Unirse al canal de Telegram",
    description:
      "Únete al canal oficial de Telegram y recibe alertas inmediatas de torneos y eventos especiales.",
    reward: "750 fichas",
    icon: "send",
    color: "#0088cc",
    href: "/dashboard/missions/telegram",
  },
  {
    id: "whatsapp",
    title: "Compartir en WhatsApp",
    description:
      "Comparte LuckyBet con tus amigos de WhatsApp y ambos recibirán un paquete de bienvenida.",
    reward: "300 fichas",
    icon: "chat",
    color: "#25D366",
    href: "/dashboard/missions/whatsapp",
  },
  {
    id: "twitter",
    title: "Seguir en Twitter / X",
    description:
      "Sigue a LuckyBet en Twitter/X para participar en sorteos semanales de fichas de juego.",
    reward: "400 fichas",
    icon: "x",
    color: "#1da1f2",
    href: "/dashboard/missions/twitter",
  },
];

const FIXED_MISSIONS: Mission[] = [
  {
    id: "profile",
    title: "Completar perfil",
    description:
      "Asegura tu cuenta verificando tu correo electrónico y completando tus datos personales.",
    reward: "200 fichas",
    icon: "person",
    color: "#a78bfa",
    completed: false,
    progress: 65,
  },
  {
    id: "referral",
    title: "Invitar a un amigo",
    description:
      "Invita a un amigo a registrarse con tu código y recibe recompensas adicionales por sus partidas.",
    reward: "1000 fichas",
    icon: "share",
    color: "#f97316",
    progress: 30,
  },
  {
    id: "first-deposit",
    title: "Primer depósito",
    description:
      "Realiza tu primer depósito en el cajero y recibe un bono del 100% de inmediato.",
    reward: "5000 fichas",
    icon: "account_balance",
    color: "#22c55e",
    completed: true,
  },
];

const INTERVAL_IN_MILLISECONDS = 1000;
const DAY_HOURS = 24;
const HOURS_IN_SECONDS = 60;
const MINUTES_IN_SECONDS = 60;

const formatTime = (hour: number, minute: number, second: number) => {
  const h = hour.toString().padStart(2, "0");
  const m = minute.toString().padStart(2, "0");
  const s = second.toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
};

export default function MissionsPage() {
  const [hour, setHour] = useState(24);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const updateCountdown = () => {
      const date = new Date();
      const hours = DAY_HOURS - date.getUTCHours() - 1;
      const minutes = MINUTES_IN_SECONDS - date.getUTCMinutes() - 1;
      const seconds = HOURS_IN_SECONDS - date.getUTCSeconds() - 1;

      setHour(Math.max(0, hours));
      setMinute(Math.max(0, minutes));
      setSecond(Math.max(0, seconds));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, INTERVAL_IN_MILLISECONDS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 sm:space-y-stack-md">
      <DashboardHeader />

      {/* Bento grid for Missions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Missions */}
        <div className="lg:col-span-8">
          <MissionSection
            title="Misiones Diarias"
            titleColor="#8ed5ff"
            timer={`Se renueva en ${formatTime(hour, minute, second)}`}
            missions={DAILY_MISSIONS}
            columns={2}
          />
        </div>

        {/* Fixed Missions */}
        <div className="lg:col-span-4">
          <MissionSection
            title="Misiones Permanentes"
            titleColor="#ffc640"
            missions={FIXED_MISSIONS}
            columns={1}
          />
        </div>
      </div>
    </div>
  );
}
