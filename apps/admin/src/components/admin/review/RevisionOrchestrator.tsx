"use client";

import { useCallback, useEffect, useState } from "react";

import type { RevisionActiveTab } from "@/types/review/AdminMissionRewards";
import { ReviewList } from "./ReviewList";
import { MissionRewardsTabContent } from "./rewards/MissionRewardsTabContent";

const TAB_STORAGE_KEY = "admin_active_revision_tab";

export function RevisionOrchestrator() {
  const [activeTab, setActiveTab] = useState<RevisionActiveTab>("review");

  useEffect(() => {
    const saved = localStorage.getItem(
      TAB_STORAGE_KEY,
    ) as RevisionActiveTab | null;
    if (saved === "review" || saved === "rewards") {
      setActiveTab(saved);
    }
  }, []);

  const handleChangeTab = useCallback((tab: RevisionActiveTab) => {
    setActiveTab(tab);
    localStorage.setItem(TAB_STORAGE_KEY, tab);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Section Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-on-surface">
            Revisión y Recompensas
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            Auditoría de evidencias manuales y gestión de reclamos de misiones
          </p>
        </div>

        {/* Tab Switch Selector */}
        <div
          className="flex p-1 rounded-2xl bg-surface-container-low border border-outline-variant/20 w-fit"
          role="tablist"
          aria-label="Pestañas de revisión y recompensas"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "review"}
            onClick={() => handleChangeTab("review")}
            className={`
              px-4 py-2 rounded-xl text-label-sm font-semibold transition-all duration-200 cursor-pointer select-none inline-flex items-center gap-2
              ${
                activeTab === "review"
                  ? "bg-primary text-on-primary shadow-sm font-bold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
              }
            `}
          >
            <span className="material-symbols-outlined text-base">
              fact_check
            </span>
            <span>Revisión de Evidencias</span>
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
            <span>Reclamo de Premios</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "review" ? <ReviewList /> : <MissionRewardsTabContent />}
    </div>
  );
}

RevisionOrchestrator.displayName = "RevisionOrchestrator";
