"use client";

import type { ReviewViewToggleProps } from "@/types/review/ReviewSubmission";

export function ReviewViewToggle({
  viewMode,
  onChange,
}: ReviewViewToggleProps) {
  return (
    <fieldset
      aria-label="Seleccionar modo de visualización"
      className="inline-flex items-center p-1 rounded-2xl bg-surface-container-low/80 border border-outline-variant/20 backdrop-blur-sm m-0 border-none"
    >
      <button
        type="button"
        onClick={() => onChange("list")}
        aria-pressed={viewMode === "list"}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-label-sm font-semibold transition-all duration-200 cursor-pointer
          ${
            viewMode === "list"
              ? "bg-primary text-on-primary shadow-[0_0_12px_rgba(56,189,248,0.25)]"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
          }
        `}
        title="Vista por lista"
      >
        <span className="material-symbols-outlined text-lg">
          format_list_bulleted
        </span>
        <span className="hidden sm:inline">Lista</span>
      </button>

      <button
        type="button"
        onClick={() => onChange("grid")}
        aria-pressed={viewMode === "grid"}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-label-sm font-semibold transition-all duration-200 cursor-pointer
          ${
            viewMode === "grid"
              ? "bg-primary text-on-primary shadow-[0_0_12px_rgba(56,189,248,0.25)]"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
          }
        `}
        title="Vista por tarjetas"
      >
        <span className="material-symbols-outlined text-lg">grid_view</span>
        <span className="hidden sm:inline">Tarjetas</span>
      </button>
    </fieldset>
  );
}

ReviewViewToggle.displayName = "ReviewViewToggle";
