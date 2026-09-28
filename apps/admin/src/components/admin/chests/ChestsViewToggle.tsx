"use client";

import type { ChestsViewToggleProps } from "@/types/adminChests";

export function ChestsViewToggle({
  activeTab,
  onChangeTab,
  uncertainCount = 0,
}: ChestsViewToggleProps) {
  return (
    <div
      className="flex items-center p-1 rounded-2xl bg-surface-container-low border border-outline-variant/20 w-fit shadow-inner"
      role="tablist"
      aria-label="Selector de vista de cofres y premios"
    >
      {/* Tab 1: Catálogo */}
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "chests"}
        onClick={() => onChangeTab("chests")}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-xl font-label-md text-sm transition-all duration-200 cursor-pointer select-none
          ${
            activeTab === "chests"
              ? "bg-primary text-on-primary font-bold shadow-[0_0_14px_rgba(56,189,248,0.25)]"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
          }
        `}
      >
        <span className="material-symbols-outlined text-lg">inventory_2</span>
        <span>Catálogo de Cofres</span>
      </button>

      {/* Tab 2: Premios */}
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "prizes"}
        onClick={() => onChangeTab("prizes")}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-xl font-label-md text-sm transition-all duration-200 cursor-pointer select-none relative
          ${
            activeTab === "prizes"
              ? "bg-primary text-on-primary font-bold shadow-[0_0_14px_rgba(56,189,248,0.25)]"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
          }
        `}
      >
        <span className="material-symbols-outlined text-lg">receipt_long</span>
        <span>Premios y Reclamos</span>

        {uncertainCount > 0 && (
          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-error text-on-error animate-pulse shadow-sm">
            {uncertainCount}
          </span>
        )}
      </button>
    </div>
  );
}

ChestsViewToggle.displayName = "ChestsViewToggle";
