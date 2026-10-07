"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FeaturedChestCard } from "@/components/dashboard/FeaturedChestCard";
import { MissionCard } from "@/components/mission/molecules/MissionCard";
import { MissionFilterTabs } from "@/components/mission/molecules/MissionFilterTabs";
import { MissionStatsBar } from "@/components/mission/molecules/MissionStatsBar";
import { MissionsGridSkeleton } from "@/components/mission/molecules/MissionsGridSkeleton";
import { SparklesIcon } from "@/icons";
import { webApi } from "@/libs/apiWebGanaya";
import type {
  ClientMission,
  MissionCategory,
  MissionCategoryTab,
  MissionStatsSummary,
} from "@/types/missions";
import type { UserMissionWithSteps } from "@/types/player";

const TYPE_TO_CATEGORY: Record<string, Exclude<MissionCategory, "all">> = {
  DAILY: "daily",
  WEEKLY: "weekly",
  FIXED: "fixed",
};

export default function MissionsPage() {
  const [missions, setMissions] = useState<ClientMission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] =
    useState<MissionCategory>("all");

  // ── Parallel Data Fetching & Deduplication ──
  const loadMissionsData = useCallback(async () => {
    setLoading(true);
    try {
      const [allMissionsRes, myMissionsRes] = await Promise.all([
        webApi.getMissions({ status: "ACTIVE", take: 100 }),
        webApi.getMyMissions({ orderDirection: "ASC", take: 100 }),
      ]);

      const myMissionsMap = new Map<number, UserMissionWithSteps>();
      if (myMissionsRes.status && Array.isArray(myMissionsRes.data)) {
        for (const userMission of myMissionsRes.data) {
          myMissionsMap.set(userMission.missionId, userMission);
        }
      }

      const activeCatalogMissions = allMissionsRes.data ?? [];

      const unifiedMissions: ClientMission[] = activeCatalogMissions.map(
        (cat) => {
          const userMission = myMissionsMap.get(cat.id);
          const isJoined = Boolean(userMission);
          const userMissionStatus = userMission?.status;

          const baseCoins = cat.coinsAmount ?? 0;
          const bonusPercent = cat.room ? Number(cat.room.bonus) || 0 : 0;
          const totalCoins = Math.round(
            baseCoins + baseCoins * (bonusPercent / 100),
          );

          const steps = cat.steps ?? [];
          const totalStepsCount = steps.length;
          let completedStepsCount = 0;

          if (userMission?.steps && Array.isArray(userMission.steps)) {
            completedStepsCount = userMission.steps.filter(
              (s) => s.status === "APPROVED",
            ).length;
          } else if (userMissionStatus === "COMPLETED") {
            completedStepsCount = totalStepsCount;
          }

          const progressPercent =
            totalStepsCount > 0
              ? Math.round((completedStepsCount / totalStepsCount) * 100)
              : userMissionStatus === "COMPLETED"
                ? 100
                : 0;

          const category = TYPE_TO_CATEGORY[cat.type] || "daily";

          return {
            id: cat.id,
            title: cat.title,
            description: cat.description,
            type: cat.type,
            category,
            status: cat.status,
            coinsAmount: cat.coinsAmount,
            experiencePoints: cat.experiencePoints,
            totalCoins,
            room: cat.room,
            imageUrl: cat.imageUrl,
            activatedAt: cat.activatedAt,
            expiresAt: cat.expiresAt,
            steps,
            isJoined,
            userMissionId: userMission?.id,
            userMissionStatus,
            currentStep: userMission?.currentStep ?? 1,
            progressPercent,
            completedStepsCount,
            totalStepsCount,
          };
        },
      );

      setMissions(unifiedMissions);
    } catch {
      casinoToast.error({
        title: "Error al cargar misiones",
        description: "No se pudieron obtener las misiones en este momento.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMissionsData();
  }, [loadMissionsData]);

  // ── Start Mission Action Handler ──
  const handleStartMission = useCallback(
    async (missionId: number) => {
      try {
        const res = await webApi.startMission(missionId);
        if (res.status) {
          casinoToast.success({
            title: "¡Misión Iniciada!",
            description: "La misión se ha agregado a tu lista de progreso.",
          });
          loadMissionsData();
        } else {
          casinoToast.error({
            title: "No se pudo iniciar",
            description: Array.isArray(res.message)
              ? res.message[0]
              : res.message || "Error al iniciar la misión.",
          });
        }
      } catch {
        casinoToast.error({
          title: "Error de red",
          description: "Ocurrió un error inesperado al iniciar la misión.",
        });
      }
    },
    [loadMissionsData],
  );

  // ── Computed Stats Summary ──
  const stats: MissionStatsSummary = useMemo(() => {
    const claimable = missions
      .filter((m) => m.userMissionStatus !== "COMPLETED")
      .reduce((acc, m) => acc + (m.totalCoins || 0), 0);
    const completed = missions.filter(
      (m) => m.userMissionStatus === "COMPLETED",
    ).length;

    return {
      claimableCoins: claimable,
      completedCount: completed,
      totalCount: missions.length,
    };
  }, [missions]);

  // ── Category Tabs ──
  const categoryTabs: MissionCategoryTab[] = useMemo(() => {
    return [
      { id: "all", label: "Todas", count: missions.length },
      {
        id: "daily",
        label: "Diarias",
        count: missions.filter((m) => m.category === "daily").length,
      },
      {
        id: "weekly",
        label: "Semanales",
        count: missions.filter((m) => m.category === "weekly").length,
      },
      {
        id: "fixed",
        label: "Permanentes",
        count: missions.filter((m) => m.category === "fixed").length,
      },
    ];
  }, [missions]);

  // ── Filtered Missions by Category ──
  const filteredMissions = useMemo(() => {
    if (selectedCategory === "all") return missions;
    return missions.filter((m) => m.category === selectedCategory);
  }, [missions, selectedCategory]);

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 sm:space-y-stack-md">
      {/* Header Banner */}
      <DashboardHeader />

      {/* Featured Active Chest Hero Banner with Weekly/Monthly toggle */}
      <div className="flex gap-4 md:gap-2 flex-col md:flex-row items-stretch justify-between">
        <MissionStatsBar stats={stats} />
        <div className="w-full min-h-[300px]">
          <FeaturedChestCard />
        </div>
      </div>

      {/* Solid Casino Stats Bar */}

      {/* Filter and Countdown Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <MissionFilterTabs
          categories={categoryTabs}
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Missions Grid or Loading Skeleton */}
      {loading ? (
        <MissionsGridSkeleton />
      ) : (
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
                <MissionCard mission={mission} onStart={handleStartMission} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && filteredMissions.length === 0 && (
        <div className="text-center py-16 px-4 rounded-2xl bg-surface-container border-2 border-[#2d3449]">
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
