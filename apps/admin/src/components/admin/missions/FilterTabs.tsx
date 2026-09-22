"use client";

import type { FilterTabsProps, FilterValue } from "@/types/missions/FilterTabs";

const FILTER_OPTIONS: { value: FilterValue; label: string; icon?: string }[] = [
  { value: "all", label: "Todas" },
  { value: "active", label: "Activas" },
  { value: "inactive", label: "Inactivas" },
  { value: "completed", label: "Completadas" },
  { value: "cancelled", label: "Canceladas" },
];

function FilterTabs({ activeFilter, onChange }: FilterTabsProps) {
  return (
    <div
      className="flex flex-wrap gap-2 p-1 rounded-2xl bg-surface-container-low/80 border border-outline-variant/20 w-fit backdrop-blur-sm"
      role="tablist"
      aria-label="Filtrar misiones por estado"
    >
      {FILTER_OPTIONS.map((opt) => {
        const isActive = activeFilter === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.value)}
            className={`
              px-4 py-2 rounded-xl text-label-sm font-semibold transition-all duration-200 cursor-pointer select-none
              ${
                isActive
                  ? "bg-primary text-on-primary shadow-[0_0_14px_rgba(56,189,248,0.25)] scale-100"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
              }
            `}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

FilterTabs.displayName = "FilterTabs";

export { FilterTabs };
