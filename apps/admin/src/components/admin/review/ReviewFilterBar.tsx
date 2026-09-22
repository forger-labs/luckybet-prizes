"use client";

import { Select } from "@/components/ui/Select";
import type { ReviewMissionType } from "@/types/review/ReviewQueueByPlayer";
import type {
  ReviewFilter,
  ReviewFilterBarProps,
} from "@/types/review/ReviewSubmission";

const TABS: { value: ReviewFilter; label: string; icon: string }[] = [
  { value: "pending", label: "Pendientes", icon: "pending" },
  { value: "approved", label: "Aprobadas", icon: "task_alt" },
  { value: "rejected", label: "Rechazadas", icon: "cancel" },
];

const TYPE_OPTIONS: { value: ReviewMissionType | "all"; label: string }[] = [
  { value: "all", label: "Todas las categorías" },
  { value: "DAILY", label: "Diarias" },
  { value: "WEEKLY", label: "Semanales" },
  { value: "FIXED", label: "Fijas" },
];

export function ReviewFilterBar({
  activeTab,
  activeType,
  onTabChange,
  onTypeChange,
}: ReviewFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
      {/* Status tabs */}
      <div
        className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-surface-container-low/80 border border-outline-variant/20 w-fit backdrop-blur-sm"
        role="tablist"
        aria-label="Filtrar por estado de revisión"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.value)}
              className={`
                px-4 py-2 rounded-xl text-label-sm font-semibold transition-all duration-200 cursor-pointer select-none inline-flex items-center gap-1.5
                ${
                  isActive
                    ? "bg-primary text-on-primary shadow-[0_0_14px_rgba(56,189,248,0.25)] font-bold"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
                }
              `}
            >
              <span className="material-symbols-outlined text-base">
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Category select filter */}
      <div className="w-full sm:w-64">
        <Select
          id="review-category"
          icon="category"
          options={TYPE_OPTIONS}
          value={activeType}
          onChange={(v) => onTypeChange(v as ReviewMissionType | "all")}
        />
      </div>
    </div>
  );
}

ReviewFilterBar.displayName = "ReviewFilterBar";
