"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  StatisticsOperationalRiskData,
  StatisticsReviewersSlaData,
} from "@/types/adminStatistics";

interface OperationsRiskTabProps {
  reviewersSla: StatisticsReviewersSlaData | null;
  operationalRisk: StatisticsOperationalRiskData | null;
  isLoading?: boolean;
}

export const OperationsRiskTab = ({
  reviewersSla,
  operationalRisk,
  isLoading = false,
}: OperationsRiskTabProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 rounded-2xl bg-surface-container border border-outline-variant/15" />
        <div className="h-80 rounded-2xl bg-surface-container border border-outline-variant/15" />
      </div>
    );
  }

  const risk = operationalRisk;
  const sla = reviewersSla;
  const hasRisk = (risk?.uncertainClaimsCount || 0) > 0;

  const chartData = (sla?.reviewers || []).map((rev) => ({
    username: rev.adminUsername,
    Aprobados: rev.approvedStepsCount,
    Rechazados: rev.rejectedStepsCount,
    avgTime: rev.averageReviewTimeMinutes,
  }));

  return (
    <div className="space-y-6">
      {/* ── Operational Risk Alert Banner ── */}
      <div
        className={`p-5 rounded-2xl border transition-all duration-300 ${
          hasRisk
            ? "bg-error-container/20 border-error/40 shadow-[0_0_20px_rgba(255,180,171,0.15)]"
            : "bg-surface-container-low border-outline-variant/20"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                hasRisk
                  ? "bg-error/20 text-error border border-error/30"
                  : "bg-surface-container-highest text-[#4ade80] border border-outline-variant/30"
              }`}
            >
              <span className="material-symbols-outlined text-2xl">
                {hasRisk ? "warning" : "verified_user"}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-base text-on-surface">
                {hasRisk
                  ? "Transacciones en Estado Incierto (TIMEOUT_UNCERTAIN)"
                  : "Monitoreo Operativo Sin Incidencias"}
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {hasRisk
                  ? "Existen reclamos con acreditación no confirmada que requieren resolución administrativa."
                  : "Todas las operaciones de crédito en LuckyBet se encuentran sincronizadas y confirmadas."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                Reclamos Inciertos
              </span>
              <span
                className={`text-xl font-black ${hasRisk ? "text-error" : "text-on-surface"}`}
              >
                {risk?.uncertainClaimsCount || 0}
              </span>
            </div>
            <div className="text-right border-l border-outline-variant/20 pl-4">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                Fichas en Riesgo
              </span>
              <span
                className={`text-xl font-black ${hasRisk ? "text-error" : "text-on-surface"}`}
              >
                {risk ? risk.uncertainCoinsAmount.toLocaleString() : "0"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Reviewers SLA & Productivity ── */}
      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-base text-on-surface">
              Rendimiento y SLA de Moderadores
            </h3>
            <p className="text-xs text-on-surface-variant">
              Evaluación de pasos manuales de misiones: aprobados vs rechazados
              y tiempo promedio de respuesta.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs">
              <span className="text-on-surface-variant">
                Tiempo Promedio Global:{" "}
              </span>
              <span className="font-bold text-primary">
                {sla
                  ? `${sla.globalAverageReviewTimeMinutes.toFixed(1)} min`
                  : "0 min"}
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs">
              <span className="text-on-surface-variant">Total Evaluados: </span>
              <span className="font-bold text-on-surface">
                {sla ? sla.totalReviewedStepsCount.toLocaleString() : "0"}
              </span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full my-2">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="username"
                  stroke="#87929a"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis stroke="#87929a" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171f33",
                    borderColor: "#2d3449",
                    borderRadius: "12px",
                    color: "#dae2fd",
                    fontSize: "12px",
                  }}
                  formatter={(value: unknown, name) => [
                    `${Number(value || 0).toLocaleString()} pasos`,
                    name === "Aprobados" ? "Aprobados" : "Rechazados",
                  ]}
                />
                <Legend
                  verticalAlign="bottom"
                  formatter={(value) => (
                    <span className="text-xs text-on-surface-variant">
                      {value}
                    </span>
                  )}
                />
                <Bar dataKey="Aprobados" fill="#4ade80" radius={[6, 6, 0, 0]} />
                <Bar
                  dataKey="Rechazados"
                  fill="#f87171"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-on-surface-variant">
              Sin actividad de moderación en este período
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
