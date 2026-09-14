"use client";

import { useEffect, useState } from "react";

import type { Mission } from "@shared/types/mission";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MissionSection } from "@/components/mission/organisms/MissionSection";

const dailyMissions: Mission[] = [
  {
    id: "instagram",
    title: "Seguir en Instagram",
    description:
      "Seguí la cuenta oficial de LuckyBet en Instagram para mantenerte al día con las últimas promociones.",
    reward: "500 fichas",
    icon: "camera",
    color: "#E1306C",
    href: "/dashboard/missions/instagram",
    completed: true,
  },
  {
    id: "telegram",
    title: "Unirse al Telegram",
    description:
      "Unite al canal oficial de Telegram y recibí notificaciones exclusivas de eventos especiales.",
    reward: "750 fichas",
    icon: "send",
    color: "#0088cc",
    href: "/dashboard/missions/telegram",
  },
  {
    id: "whatsapp",
    title: "Compartir en WhatsApp",
    description:
      "Compartí LuckyBet con tus amigos en WhatsApp y ambos recibirán una recompensa.",
    reward: "300 fichas",
    icon: "chat",
    color: "#25D366",
    href: "/dashboard/missions/whatsapp",
  },
  {
    id: "twitter",
    title: "Seguir en Twitter/X",
    description:
      "Seguí a LuckyBet en Twitter/X para participar en sorteos semanales exclusivos.",
    reward: "400 fichas",
    icon: "x",
    color: "#1da1f2",
    href: "/dashboard/missions/twitter",
  },
];

const fixedMissions: Mission[] = [
  {
    id: "profile",
    title: "Completar perfil",
    description:
      "Asegurá tu cuenta verificando tu correo y completando tu información de perfil.",
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
      "Invitá a un amigo a registrarse y ambos recibirán un bono de bienvenida.",
    reward: "1000 fichas",
    icon: "share",
    color: "#f97316",
    progress: 30,
  },
  {
    id: "first-deposit",
    title: "Primer depósito",
    description:
      "Realizá tu primer depósito y recibí un bono del 100% inmediato.",
    reward: "5000 fichas",
    icon: "account_balance",
    color: "#22c55e",
    completed: true,
  },
];

const INTERVAL_IN_MILISECONDS = 100;

const DAY_HOURS = 24;
const HOURS_IN_SECONDS = 60;
const MINUTES_IN_SECONDS = 60;

const showTime = (hour: number, minute: number, second: number) => {
  const formattedHour = hour >= 10 ? hour : `0${hour}`;
  const formattedMinute = minute >= 10 ? minute : `0${minute}`;
  const formattedSecond = second >= 10 ? second : `0${second}`;

  return `${formattedHour}:${formattedMinute}:${formattedSecond}`;
};

export default function MissionsPage() {
  const [hour, setHour] = useState(24);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const countDownUntilZero = () => {
      const date = new Date();
      const hours = DAY_HOURS - date.getUTCHours() - 1;
      const minutes = MINUTES_IN_SECONDS - date.getUTCMinutes() - 1;
      const seconds = HOURS_IN_SECONDS - date.getUTCSeconds() - 1;

      setHour(hours);
      setMinute(minutes);
      setSecond(seconds);
    };

    const timeoutToClear = setInterval(
      countDownUntilZero,
      INTERVAL_IN_MILISECONDS,
    );

    return () => clearInterval(timeoutToClear);
  }, []);

  return (
    <>
      {/* Ambient glows */}
      <div className="fixed top-0 right-0 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="fixed bottom-0 left-0 -z-10 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />

      <div className="md:pb-12 px-container-padding-mobile md:px-container-padding-desktop">
        <div className="max-w-7xl mx-auto space-y-stack-md md:space-y-stack-lg">
          <DashboardHeader />

          {/* 12-column bento grid */}
          <div className="grid grid-cols-12 gap-stack-md">
            {/* Daily Missions */}
            <div className="col-span-12 lg:col-span-8">
              <MissionSection
                title="Misiones Diarias"
                titleColor="#8ed5ff"
                icon="schedule"
                timer={`Se renueva en ${showTime(hour, minute, second)}`}
                missions={dailyMissions}
                columns={2}
              />
            </div>

            {/* Fixed Missions */}
            <div className="col-span-12 lg:col-span-4">
              <MissionSection
                title="Misiones Fijas"
                titleColor="#ffc640"
                icon="verified"
                missions={fixedMissions}
                columns={1}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
