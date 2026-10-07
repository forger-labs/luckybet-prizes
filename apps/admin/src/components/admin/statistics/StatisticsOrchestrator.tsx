"use client";

import { useAdminStatistics } from "@/hooks/useAdminStatistics";
import { ChestsPerformanceTab } from "./ChestsPerformanceTab";
import { FinancialOverviewTab } from "./FinancialOverviewTab";
import { GamificationTab } from "./GamificationTab";
import { OperationsRiskTab } from "./OperationsRiskTab";
import { StatisticsHeader } from "./StatisticsHeader";
import { StatisticsTabNav } from "./StatisticsTabNav";

export const StatisticsOrchestrator = () => {
  const {
    activeTab,
    setActiveTab,
    tabs,
    dateRange,
    setDatePreset,
    setCustomDates,
    chestsPeriodMode,
    chestsSelectedDate,
    chestsPeriodKey,
    updateChestsPeriod,
    summary,
    liabilities,
    operationalRisk,
    reviewersSla,
    missionsEngagement,
    levelsDistribution,
    chestsSummary,
    isLoadingOverview,
    isLoadingGamification,
    isLoadingOperations,
    isLoadingChests,
    refetchCurrentTab,
  } = useAdminStatistics();

  const isCurrentLoading =
    (activeTab === "overview" && isLoadingOverview) ||
    (activeTab === "gamification" && isLoadingGamification) ||
    (activeTab === "operations" && isLoadingOperations) ||
    (activeTab === "chests" && isLoadingChests);

  return (
    <div className="space-y-6">
      {/* Header with Date Preset Filter & Refresh */}
      <StatisticsHeader
        preset={dateRange.preset}
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onPresetChange={setDatePreset}
        onCustomDatesChange={setCustomDates}
        onRefresh={refetchCurrentTab}
        isLoading={isCurrentLoading}
      />

      {/* Tabs Navigation */}
      <StatisticsTabNav
        tabs={tabs}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Active Tab View */}
      <div>
        {activeTab === "overview" && (
          <FinancialOverviewTab
            summary={summary}
            liabilities={liabilities}
            isLoading={isLoadingOverview}
          />
        )}

        {activeTab === "gamification" && (
          <GamificationTab
            levelsDistribution={levelsDistribution}
            missionsEngagement={missionsEngagement}
            isLoading={isLoadingGamification}
          />
        )}

        {activeTab === "operations" && (
          <OperationsRiskTab
            reviewersSla={reviewersSla}
            operationalRisk={operationalRisk}
            isLoading={isLoadingOperations}
          />
        )}

        {activeTab === "chests" && (
          <ChestsPerformanceTab
            chestsSummary={chestsSummary}
            periodMode={chestsPeriodMode}
            selectedDate={chestsSelectedDate}
            periodKey={chestsPeriodKey}
            onPeriodChange={updateChestsPeriod}
            isLoading={isLoadingChests}
          />
        )}
      </div>
    </div>
  );
};
