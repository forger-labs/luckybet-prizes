"use client";

import type {
  ChestPeriodMode,
  StatisticsChestsSummaryData,
} from "@/types/adminStatistics";

interface ChestsPerformanceTabProps {
  chestsSummary: StatisticsChestsSummaryData | null;
  periodMode: ChestPeriodMode;
  selectedDate: string;
  periodKey: string;
  onPeriodChange: (mode: ChestPeriodMode, dateStr: string) => void;
  isLoading?: boolean;
}

export const ChestsPerformanceTab = ({
  chestsSummary,
  periodMode,
  selectedDate,
  periodKey,
  onPeriodChange,
  isLoading = false,
}: ChestsPerformanceTabProps) => {
  const chests = chestsSummary?.chests || [];

  const handleModeToggle = (newMode: ChestPeriodMode) => {
    onPeriodChange(newMode, selectedDate);
  };

  const handleDateChange = (newDate: string) => {
    onPeriodChange(periodMode, newDate);
  };

  const handleSetCurrentDate = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    onPeriodChange(periodMode, `${y}-${m}-${d}`);
  };

  return (
    <div className="space-y-6">
      {/* ── Period Selector Header (Calendar based, no raw text entry) ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-on-surface">
              Auditoría de Cofres por Período
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20">
              Clave: {periodKey}
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Selecciona la fecha en el calendario para calcular automáticamente
            el período semanal o mensual.
          </p>
        </div>

        {/* Interactive Calendar Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Pill Toggle: Weekly vs Monthly */}
          <div className="flex items-center gap-1 p-1 bg-surface-container rounded-xl border border-outline-variant/30">
            <button
              type="button"
              onClick={() => handleModeToggle("WEEKLY")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                periodMode === "WEEKLY"
                  ? "bg-primary text-on-primary font-bold shadow-[0_0_10px_rgba(56,189,248,0.25)]"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Semanal (ISO)
            </button>
            <button
              type="button"
              onClick={() => handleModeToggle("MONTHLY")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                periodMode === "MONTHLY"
                  ? "bg-primary text-on-primary font-bold shadow-[0_0_10px_rgba(56,189,248,0.25)]"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Mensual
            </button>
          </div>

          {/* Calendar Date Picker */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="chest-calendar-picker"
              className="text-xs text-on-surface-variant font-medium"
            >
              Fecha:
            </label>
            <input
              id="chest-calendar-picker"
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:border-primary cursor-pointer"
            />
          </div>

          {/* Quick Button: Current Period */}
          <button
            type="button"
            onClick={handleSetCurrentDate}
            className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-semibold text-primary transition-all cursor-pointer"
          >
            Actual
          </button>
        </div>
      </div>

      {/* ── Chests Performance Cards Grid ── */}

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-16 rounded-2xl bg-surface-container border border-outline-variant/15" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 rounded-2xl bg-surface-container border border-outline-variant/15"
              />
            ))}
          </div>
        </div>
      ) : chests.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl bg-surface-container/30 border border-dashed border-outline-variant/20">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-2 block">
            inventory_2
          </span>
          <p className="font-semibold text-sm text-on-surface">
            No hay registros de cofres para el período {periodKey}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            Selecciona otra fecha en el selector para auditar períodos
            anteriores o futuros.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chests.map((chest) => {
            return (
              chest.periodType === periodMode && (
                <div
                  key={chest.chestId}
                  className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col justify-between hover:border-primary/40 transition-all duration-200 shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                        {chest.periodType === "WEEKLY" ? "Semanal" : "Mensual"}
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium">
                        Meta: {chest.requiredMissions} misiones
                      </span>
                    </div>

                    <h4
                      className="font-bold text-base text-on-surface truncate"
                      title={chest.chestTitle}
                    >
                      {chest.chestTitle}
                    </h4>
                    <p className="text-xs text-secondary font-bold mt-0.5">
                      Premio: {chest.coinsAmount.toLocaleString()} fichas
                    </p>
                  </div>

                  {/* Stats Breakdown */}
                  <div className="pt-4 mt-4 border-t border-outline-variant/15 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant">
                        Participantes:
                      </span>
                      <span className="font-bold text-on-surface">
                        {chest.participantsCount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant">
                        Reclamados:
                      </span>
                      <span className="font-bold text-[#4ade80]">
                        {chest.claimedCount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant">
                        Tasa de Conversión:
                      </span>
                      <span className="font-bold text-primary">
                        {chest.claimRate.toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-outline-variant/10">
                      <span className="text-on-surface-variant font-medium">
                        Fichas Repartidas:
                      </span>
                      <span className="font-black text-secondary">
                        {chest.totalCoinsDistributed.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};
