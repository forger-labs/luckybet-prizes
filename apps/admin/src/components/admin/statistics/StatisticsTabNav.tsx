"use client";

import type {
  StatisticsTabId,
  StatisticsTabOption,
} from "@/types/adminStatistics";

interface StatisticsTabNavProps {
  tabs: StatisticsTabOption[];
  activeTab: StatisticsTabId;
  onSelectTab: (tabId: StatisticsTabId) => void;
}

export const StatisticsTabNav = ({
  tabs,
  activeTab,
  onSelectTab,
}: StatisticsTabNavProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-outline-variant/15">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-3 border-b-2 font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer select-none
              ${
                isActive
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/30"
              }
            `}
          >
            <span className="material-symbols-outlined text-base">
              {tab.icon}
            </span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
