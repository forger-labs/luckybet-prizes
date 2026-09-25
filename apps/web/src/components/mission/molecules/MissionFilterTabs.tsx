"use client";

import type { MissionCategory, MissionCategoryTab } from "@/types/missions";

interface Props {
  categories: MissionCategoryTab[];
  activeCategory: MissionCategory;
  onSelectCategory: (category: MissionCategory) => void;
}

export const MissionFilterTabs = ({
  categories,
  activeCategory,
  onSelectCategory,
}: Props) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {categories.map((tab) => {
        const isActive = activeCategory === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectCategory(tab.id)}
            className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all shrink-0 flex items-center gap-2 cursor-pointer border-2 ${
              isActive
                ? "bg-[#38bdf8] text-[#00354a] border-[#8ed5ff] shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                : "bg-[#171f33] text-[#dae2fd] border-[#2d3449] hover:border-[#87929a] hover:bg-[#222a3d]"
            }`}
          >
            <span>{tab.label}</span>

            <span
              className={`text-[11px] font-black px-2 py-0.5 rounded-md transition-colors ${
                isActive
                  ? "bg-[#00354a] text-[#8ed5ff]"
                  : "bg-[#0b1326] text-[#87929a]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
