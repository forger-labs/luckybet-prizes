"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  StatisticsLevelsDistributionData,
  StatisticsMissionsEngagementData,
} from "@/types/adminStatistics";

interface GamificationTabProps {
  levelsDistribution: StatisticsLevelsDistributionData | null;
  missionsEngagement: StatisticsMissionsEngagementData | null;
  isLoading?: boolean;
}

export const GamificationTab = ({
  levelsDistribution,
  missionsEngagement,
  isLoading = false,
}: GamificationTabProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-surface-container border border-outline-variant/15"
            />
          ))}
        </div>
        <div className="h-80 rounded-2xl bg-surface-container border border-outline-variant/15" />
      </div>
    );
  }

  const eng = missionsEngagement;
  const levels = levelsDistribution?.distribution || [];

  const chartData = levels.map((lvl) => ({
    name: lvl.levelName,
    Jugadores: lvl.playersCount,
    Porcentaje: lvl.percentage,
    minExp: lvl.minExperience,
  }));

  return (
    <div className="space-y-6">
      {/* ── Engagement Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completion Rate */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-primary/20 shadow-md">
          <div className="flex items-center justify-between text-primary mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Tasa de Completitud
            </span>
            <span className="material-symbols-outlined text-xl">
              check_circle
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-on-surface">
            {eng ? `${eng.completionRate.toFixed(1)}%` : "0%"}
          </p>
          <p className="text-[11px] text-on-surface-variant mt-1">
            {eng?.completedCount || 0} misiones finalizadas con éxito
          </p>
        </div>

        {/* In Progress Missions */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-secondary/20 shadow-md">
          <div className="flex items-center justify-between text-secondary mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              En Progreso
            </span>
            <span className="material-symbols-outlined text-xl">
              pending_actions
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-secondary">
            {eng ? eng.inProgressCount.toLocaleString() : "0"}
          </p>
          <p className="text-[11px] text-on-surface-variant mt-1">
            Jugadores actualmente avanzando pasos
          </p>
        </div>

        {/* Avg Completion Time */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 shadow-md">
          <div className="flex items-center justify-between text-[#38bdf8] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Tiempo Promedio
            </span>
            <span className="material-symbols-outlined text-xl">schedule</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-on-surface">
            {eng ? `${eng.averageCompletionMinutes.toFixed(1)} min` : "0 min"}
          </p>
          <p className="text-[11px] text-on-surface-variant mt-1">
            Duración media desde inicio hasta reclamo
          </p>
        </div>

        {/* Total Active Players */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 shadow-md">
          <div className="flex items-center justify-between text-[#c5c9ff] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Jugadores Activos
            </span>
            <span className="material-symbols-outlined text-xl">group</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-on-surface">
            {levelsDistribution
              ? levelsDistribution.totalActivePlayers.toLocaleString()
              : "0"}
          </p>
          <p className="text-[11px] text-on-surface-variant mt-1">
            Base total distribuida en los niveles
          </p>
        </div>
      </div>

      {/* ── Levels Pyramid Distribution ── */}
      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
        <div className="mb-4">
          <h3 className="font-bold text-base text-on-surface">
            Pirámide de Distribución de Jugadores por Nivel
          </h3>
          <p className="text-xs text-on-surface-variant">
            Cantidad y porcentaje de jugadores activos agrupados por jerarquía
            de nivel de experiencia.
          </p>
        </div>

        <div className="h-72 w-full my-2">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
              >
                <XAxis
                  type="number"
                  stroke="#87929a"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#87929a"
                  fontSize={12}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171f33",
                    borderColor: "#2d3449",
                    borderRadius: "12px",
                    color: "#dae2fd",
                    fontSize: "12px",
                  }}
                  formatter={(value: unknown, _name, item) => [
                    `${Number(value || 0).toLocaleString()} jugadores (${item?.payload?.Porcentaje || 0}%)`,
                    "Población",
                  ]}
                />
                <Bar dataKey="Jugadores" fill="#38bdf8" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-on-surface-variant">
              Sin datos de niveles disponibles
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
