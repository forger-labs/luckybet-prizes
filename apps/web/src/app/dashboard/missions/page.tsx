"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MissionCard } from "@/components/mission/molecules/MissionCard";
import { MissionFilterTabs } from "@/components/mission/molecules/MissionFilterTabs";
import { MissionStatsBar } from "@/components/mission/molecules/MissionStatsBar";
import { ClockIcon, SparklesIcon } from "@/icons";
import type {
  MissionCategory,
  MissionCategoryTab,
  MissionItem,
  MissionStatsSummary,
} from "@/types/missions";

const ALL_MISSIONS: MissionItem[] = [
  {
    id: "instagram",
    title: "Seguir en Instagram",
    description:
      "Sigue la cuenta oficial de LuckyBet en Instagram para enterarte de códigos de bono exclusivos y sorteos semanales.",
    reward: "500 Fichas",
    rewardCoins: 500,
    rewardXp: 150,
    icon: "photo_camera",
    color: "#e11d48",
    category: "daily",
    platform: "instagram",
    completed: true,
  },
  {
    id: "telegram",
    title: "Unirse al canal de Telegram",
    description:
      "Únete al canal oficial de Telegram y recibe alertas inmediatas de torneos de tragamonedas, giros gratis y eventos.",
    reward: "750 Fichas",
    rewardCoins: 750,
    rewardXp: 200,
    icon: "send",
    color: "#0284c7",
    category: "daily",
    platform: "telegram",
    completed: false,
  },
  {
    id: "whatsapp",
    title: "Compartir en WhatsApp",
    description:
      "Comparte LuckyBet con tus amigos de WhatsApp y ambos recibirán un paquete de bienvenida con fichas de juego.",
    reward: "300 Fichas",
    rewardCoins: 300,
    rewardXp: 100,
    icon: "chat",
    color: "#16a34a",
    category: "daily",
    platform: "whatsapp",
    completed: false,
  },
  {
    id: "twitter",
    title: "Seguir en Twitter / X",
    description:
      "Sigue a LuckyBet en Twitter/X y retuitea la publicación del torneo para participar en sorteos relámpago.",
    reward: "400 Fichas",
    rewardCoins: 400,
    rewardXp: 120,
    icon: "flutter_dash",
    color: "#0284c7",
    category: "daily",
    platform: "twitter",
    completed: false,
  },
  {
    id: "profile",
    title: "Completar Perfil y Teléfono",
    description:
      "Asegura tu cuenta de casino verificando tu teléfono para depósitos rápidos y retiros sin demoras.",
    reward: "1.200 Fichas",
    rewardCoins: 1200,
    rewardXp: 300,
    icon: "badge",
    color: "#7c3aed",
    category: "fixed",
    platform: "profile",
    completed: false,
    progress: 65,
  },
  {
    id: "referral",
    title: "Invitar a un Amigo",
    description:
      "Invita a un amigo a registrarse con tu enlace y gana fichas automáticas cada vez que juegue en el casino.",
    reward: "2.500 Fichas",
    rewardCoins: 2500,
    rewardXp: 500,
    icon: "group_add",
    color: "#ea580c",
    category: "fixed",
    platform: "referral",
    completed: false,
    progress: 30,
  },
  {
    id: "first-deposit",
    title: "Primer Depósito en Cajero",
    description:
      "Realiza tu primera carga de saldo y duplica tu balance con el bono de bienvenida exclusivo del 100%.",
    reward: "5.000 Fichas",
    rewardCoins: 5000,
    rewardXp: 1000,
    icon: "account_balance_wallet",
    color: "#059669",
    category: "fixed",
    platform: "deposit",
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
  const [selectedCategory, setSelectedCategory] =
    useState<MissionCategory>("all");
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

  const stats: MissionStatsSummary = useMemo(() => {
    const claimable = ALL_MISSIONS.filter((m) => !m.completed).reduce(
      (acc, m) => acc + (m.rewardCoins || 0),
      0,
    );
    const completed = ALL_MISSIONS.filter((m) => m.completed).length;

    return {
      claimableCoins: claimable,
      completedCount: completed,
      totalCount: ALL_MISSIONS.length,
      xpMultiplier: "+25% VIP",
    };
  }, []);

  const categoryTabs: MissionCategoryTab[] = useMemo(() => {
    return [
      { id: "all", label: "Todas", count: ALL_MISSIONS.length },
      {
        id: "daily",
        label: "Diarias",
        count: ALL_MISSIONS.filter((m) => m.category === "daily").length,
      },
      {
        id: "fixed",
        label: "Permanentes",
        count: ALL_MISSIONS.filter((m) => m.category === "fixed").length,
      },
      {
        id: "special",
        label: "Especiales",
        count: ALL_MISSIONS.filter((m) => m.category === "special").length,
      },
    ];
  }, []);

  const filteredMissions = useMemo(() => {
    if (selectedCategory === "all") return ALL_MISSIONS;
    return ALL_MISSIONS.filter((m) => m.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 sm:space-y-stack-md">
      {/* Header Banner */}
      <DashboardHeader />

      {/* Solid Casino Stats Bar */}
      <MissionStatsBar stats={stats} />

      {/* Filter and Countdown Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <MissionFilterTabs
          categories={categoryTabs}
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Casino Countdown Timer Pill */}
        <div className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-xl bg-[#171f33] border-2 border-[#38bdf8]/40 shadow-md">
          <ClockIcon className="w-4 h-4 text-[#38bdf8]" />
          <span className="text-xs text-[#bdc8d1] font-bold">Reinicio en:</span>
          <span className="font-(--font-plus-jakarta-sans) text-xs sm:text-sm font-black text-[#8ed5ff] tracking-wider font-mono">
            {formatTime(hour, minute, second)}
          </span>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <AnimatePresence mode="popLayout">
          {filteredMissions.map((mission, idx) => (
            <motion.div
              key={mission.id}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{
                duration: 0.2,
                delay: idx * 0.03,
              }}
              className="h-full"
            >
              <MissionCard mission={mission} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredMissions.length === 0 && (
        <div className="text-center py-16 px-4 rounded-2xl bg-[#171f33] border-2 border-[#2d3449]">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#222a3d] flex items-center justify-center text-[#87929a]">
            <SparklesIcon className="w-8 h-8 opacity-40" />
          </div>
          <h3 className="font-(--font-plus-jakarta-sans) text-lg font-black text-white mb-1">
            No hay misiones disponibles
          </h3>
          <p className="text-xs sm:text-sm text-[#87929a]">
            Actualmente no hay misiones en esta categoría. Vuelve a consultar
            más tarde.
          </p>
        </div>
      )}
    </div>
  );
}
