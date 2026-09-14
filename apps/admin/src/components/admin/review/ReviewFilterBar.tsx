"use client";

import { useMemo } from "react";

import type { MissionCategory } from "@shared/types";

import type { ReviewFilter } from "@/types/review/ReviewSubmission";

const TABS: { value: ReviewFilter; label: string }[] = [
  { value: "pending", label: "Pendientes" },
  { value: "approved", label: "Aprobadas" },
  { value: "rejected", label: "Rechazadas" },
];

const CATEGORIES: { value: MissionCategory | "all"; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "daily", label: "Diaria" },
  { value: "weekly", label: "Semanal" },
  { value: "fixed", label: "Fija" },
  { value: "special_event", label: "Evento" },
];

const SORT_OPTIONS: { value: "newest" | "oldest"; label: string }[] = [
  { value: "newest", label: "Más recientes" },
  { value: "oldest", label: "Más antiguas" },
];

interface ReviewFilterBarProps {
  activeTab: ReviewFilter;
  category: MissionCategory | "all";
  sortOrder: "newest" | "oldest";
  onTabChange: (tab: ReviewFilter) => void;
  onCategoryChange: (cat: MissionCategory | "all") => void;
  onSortChange: (order: "newest" | "oldest") => void;
}

function ReviewFilterBar({
  activeTab,
  category,
  sortOrder,
  onTabChange,
  onCategoryChange,
  onSortChange,
}: ReviewFilterBarProps) {
  const _totalCounts = useMemo(() => {
    return { pending: 0, approved: 0, rejected: 0 };
    // Counts come from parent; mock for now
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Status tabs */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filtrar por estado"
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
                px-4 py-2 rounded-full text-label-sm font-semibold
                transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Category + date filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category select */}
        <div className="flex items-center gap-2">
          <span className="text-label-sm text-on-surface-variant shrink-0">
            Categoría:
          </span>
          <select
            value={category}
            onChange={(e) =>
              onCategoryChange(e.target.value as MissionCategory | "all")
            }
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer"
            aria-label="Filtrar por categoría"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort by date */}
        <div className="flex items-center gap-2">
          <span className="text-label-sm text-on-surface-variant shrink-0">
            Orden:
          </span>
          <select
            value={sortOrder}
            onChange={(e) =>
              onSortChange(e.target.value as "newest" | "oldest")
            }
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer"
            aria-label="Ordenar por fecha"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

ReviewFilterBar.displayName = "ReviewFilterBar";

export { ReviewFilterBar };
export type { ReviewFilterBarProps };
