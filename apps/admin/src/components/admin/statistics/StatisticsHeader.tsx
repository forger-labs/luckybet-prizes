"use client";

import type { DateFilterPreset } from "@/types/adminStatistics";

interface StatisticsHeaderProps {
  preset: DateFilterPreset;
  startDate: string;
  endDate: string;
  onPresetChange: (preset: DateFilterPreset) => void;
  onCustomDatesChange: (startDate: string, endDate: string) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

const PRESET_OPTIONS: { id: DateFilterPreset; label: string }[] = [
  { id: "7d", label: "Últimos 7 días" },
  { id: "30d", label: "Últimos 30 días" },
  { id: "this_month", label: "Este mes" },
  { id: "custom", label: "Personalizado" },
];

export const StatisticsHeader = ({
  preset,
  startDate,
  endDate,
  onPresetChange,
  onCustomDatesChange,
  onRefresh,
  isLoading = false,
}: StatisticsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 pb-2">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-(--font-plus-jakarta-sans) text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Reportes & Estadísticas
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
              🇦🇷 Hora ARG (UTC-3)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Métricas financieras, rendimiento de gamificación, SLA de moderación
            y auditoría de riesgos.
          </p>
        </div>

        {/* Controls: Preset Pills & Refresh */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container-low border border-outline-variant/20">
            {PRESET_OPTIONS.map((opt) => {
              const isSelected = preset === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onPresetChange(opt.id)}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer select-none
                    ${
                      isSelected
                        ? "bg-primary text-on-primary shadow-[0_0_12px_rgba(56,189,248,0.25)] font-bold"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50"
                    }
                  `}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            title="Actualizar datos"
            className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-primary transition-all cursor-pointer disabled:opacity-50"
          >
            <span
              className={`material-symbols-outlined text-lg ${isLoading ? "animate-spin" : ""}`}
            >
              refresh
            </span>
          </button>
        </div>
      </div>

      {/* ── Custom Date & Time Range Pickers (Argentina Timezone UTC-3) ── */}
      {preset === "custom" && (
        <div className="flex flex-wrap items-center gap-4 p-3.5 rounded-xl bg-surface-container-low border border-primary/30 shadow-inner">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <span className="material-symbols-outlined text-base">
              schedule
            </span>
            <span>Rango de Fecha y Hora (Argentina):</span>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="stat-start-datetime"
              className="text-xs text-on-surface-variant font-medium"
            >
              Desde:
            </label>
            <input
              id="stat-start-datetime"
              type="datetime-local"
              value={startDate}
              onChange={(e) => onCustomDatesChange(e.target.value, endDate)}
              className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:border-primary cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="stat-end-datetime"
              className="text-xs text-on-surface-variant font-medium"
            >
              Hasta:
            </label>
            <input
              id="stat-end-datetime"
              type="datetime-local"
              value={endDate}
              min={startDate}
              onChange={(e) => onCustomDatesChange(startDate, e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:border-primary cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
