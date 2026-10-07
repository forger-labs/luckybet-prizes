"use client";

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  StatisticsLiabilitiesData,
  StatisticsSummaryData,
} from "@/types/adminStatistics";

interface FinancialOverviewTabProps {
  summary: StatisticsSummaryData | null;
  liabilities: StatisticsLiabilitiesData | null;
  isLoading?: boolean;
}

const PIE_COLORS = ["#38bdf8", "#ffc640", "#a3abff"];

export const FinancialOverviewTab = ({
  summary,
  liabilities,
  isLoading = false,
}: FinancialOverviewTabProps) => {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 rounded-2xl bg-surface-container border border-outline-variant/15" />
          <div className="h-80 rounded-2xl bg-surface-container border border-outline-variant/15" />
        </div>
      </div>
    );
  }

  const coins = summary?.coinsBreakdown;
  const events = summary?.eventsCount;
  const liab = liabilities;

  const pieData = coins
    ? [
        { name: "Misiones", value: coins.missionsCoins },
        { name: "Niveles", value: coins.levelsCoins },
        { name: "Cofres", value: coins.chestsCoins },
      ].filter((item) => item.value > 0)
    : [];

  const barData = [
    {
      category: "Misiones",
      Reclamadas: coins?.missionsCoins || 0,
      Pendientes: liab?.breakdown?.missionsPendingCoins || 0,
    },
    {
      category: "Niveles",
      Reclamadas: coins?.levelsCoins || 0,
      Pendientes: liab?.breakdown?.levelsPendingCoins || 0,
    },
    {
      category: "Cofres",
      Reclamadas: coins?.chestsCoins || 0,
      Pendientes: liab?.breakdown?.chestsPendingCoins || 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Coins Claimed */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-primary/20 shadow-md">
          <div className="flex items-center justify-between text-primary mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Fichas Reclamadas
            </span>
            <span className="material-symbols-outlined text-xl">paid</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-on-surface">
            {coins ? coins.totalCoins.toLocaleString() : "0"}
          </p>
          <p className="text-[11px] text-on-surface-variant mt-1">
            Total histórico emitido a jugadores
          </p>
        </div>

        {/* Pending Liabilities */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-secondary/20 shadow-md">
          <div className="flex items-center justify-between text-secondary mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Pasivo Flotante
            </span>
            <span className="material-symbols-outlined text-xl">
              hourglass_empty
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-secondary">
            {liab ? liab.pendingCoins.toLocaleString() : "0"}
          </p>
          <p className="text-[11px] text-on-surface-variant mt-1">
            {liab?.pendingClaimsCount || 0} reclamos por cobrar
          </p>
        </div>

        {/* Claim Rate */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 shadow-md">
          <div className="flex items-center justify-between text-[#4ade80] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Tasa de Reclamo
            </span>
            <span className="material-symbols-outlined text-xl">
              trending_up
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-on-surface">
            {liab ? `${liab.claimRate.toFixed(1)}%` : "0%"}
          </p>
          <p className="text-[11px] text-on-surface-variant mt-1">
            Porcentaje de conversión efectiva
          </p>
        </div>

        {/* Total Events Completed */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 shadow-md">
          <div className="flex items-center justify-between text-[#c5c9ff] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Eventos Totales
            </span>
            <span className="material-symbols-outlined text-xl">
              military_tech
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-on-surface">
            {events
              ? (
                  events.completedMissionsCount +
                  events.levelUpsCount +
                  events.claimedChestsCount
                ).toLocaleString()
              : "0"}
          </p>
          <div className="flex items-center gap-2 text-[10px] text-on-surface-variant mt-1">
            <span>🎯 {events?.completedMissionsCount || 0}</span>
            <span>⭐ {events?.levelUpsCount || 0}</span>
            <span>🎁 {events?.claimedChestsCount || 0}</span>
          </div>
        </div>
      </div>

      {/* ── Charts Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Donut Chart: Coins Distribution */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-on-surface mb-1">
              Distribución de Fichas Reclamadas
            </h3>
            <p className="text-xs text-on-surface-variant">
              Proporción de fichas emitidas según el canal de recompensa.
            </p>
          </div>

          <div className="h-64 w-full my-2">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((item, index) => (
                      <Cell
                        key={item.name}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#171f33",
                      borderColor: "#2d3449",
                      borderRadius: "12px",
                      color: "#dae2fd",
                      fontSize: "12px",
                    }}
                    formatter={(value: unknown) => [
                      `${Number(value || 0).toLocaleString()} fichas`,
                      "Volumen",
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
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-on-surface-variant">
                Sin datos en este período
              </div>
            )}
          </div>
        </div>

        {/* Bar Chart: Claimed vs Pending */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-on-surface mb-1">
              Fichas Reclamadas vs Pasivos Pendientes
            </h3>
            <p className="text-xs text-on-surface-variant">
              Comparativa de volumen efectivo acreditado versus pasivo retenido
              por cobrar.
            </p>
          </div>

          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="category"
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
                  formatter={(value: unknown) => [
                    `${Number(value || 0).toLocaleString()} fichas`,
                    "",
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
                <Bar
                  dataKey="Reclamadas"
                  fill="#38bdf8"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="Pendientes"
                  fill="#ffc640"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
