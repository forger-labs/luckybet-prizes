"use client";

import { useCallback, useEffect, useState } from "react";

import type { LevelsActiveTab } from "@/types/adminLevels";
import { LevelsList } from "./LevelsList";
import { LevelRewardsTabContent } from "./rewards/LevelRewardsTabContent";

const TAB_STORAGE_KEY = "admin_active_levels_tab";

export function LevelsOrchestrator() {
  const [activeTab, setActiveTab] = useState<LevelsActiveTab>("levels");

  useEffect(() => {
    const saved = localStorage.getItem(
      TAB_STORAGE_KEY,
    ) as LevelsActiveTab | null;
    if (saved === "levels" || saved === "rewards") {
      setActiveTab(saved);
    }
  }, []);

  const handleChangeTab = useCallback((tab: LevelsActiveTab) => {
    setActiveTab(tab);
    localStorage.setItem(TAB_STORAGE_KEY, tab);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Section Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-on-surface">
            Gestión de Niveles y Recompensas
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            Administre los niveles de experiencia y audite los reclamos por
            ascenso de nivel
          </p>
        </div>

        {/* Tab Switch Selector */}
        <div
          className="flex p-1 rounded-2xl bg-surface-container-low border border-outline-variant/20 w-fit"
          role="tablist"
          aria-label="Pestañas de niveles y recompensas"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "levels"}
            onClick={() => handleChangeTab("levels")}
            className={`
              px-4 py-2 rounded-xl text-label-sm font-semibold transition-all duration-200 cursor-pointer select-none inline-flex items-center gap-2
              ${
                activeTab === "levels"
                  ? "bg-primary text-on-primary shadow-sm font-bold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
              }
            `}
          >
            <span className="material-symbols-outlined text-base">
              military_tech
            </span>
            <span>Catálogo de Niveles</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "rewards"}
            onClick={() => handleChangeTab("rewards")}
            className={`
              px-4 py-2 rounded-xl text-label-sm font-semibold transition-all duration-200 cursor-pointer select-none inline-flex items-center gap-2
              ${
                activeTab === "rewards"
                  ? "bg-primary text-on-primary shadow-sm font-bold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
              }
            `}
          >
            <span className="material-symbols-outlined text-base">paid</span>
            <span>Recompensas de Nivel</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "levels" ? <LevelsList /> : <LevelRewardsTabContent />}
    </div>
  );
}

LevelsOrchestrator.displayName = "LevelsOrchestrator";
