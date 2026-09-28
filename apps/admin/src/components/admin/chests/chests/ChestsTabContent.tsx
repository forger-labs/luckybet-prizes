"use client";

import type { Dispatch } from "react";

import { Pagination } from "@/components/ui/Pagination";
import type {
  BackendChest,
  BackendRoom,
  ChestFormValues,
  ChestsAction,
  ChestsState,
} from "@/types/adminChests";
import { ChestFormModal } from "./ChestFormModal";
import { ChestPreviewModal } from "./ChestPreviewModal";
import { ChestsFilterBar } from "./ChestsFilterBar";
import { ChestsStatsCards } from "./ChestsStatsCards";
import { ChestsTable } from "./ChestsTable";

interface ChestsTabContentProps {
  state: ChestsState;
  dispatch: Dispatch<ChestsAction>;
  rooms: BackendRoom[];
  stats: {
    totalChests: number;
    activeChests: number;
    weeklyChests: number;
    monthlyChests: number;
  };
  onSaveChest: (data: ChestFormValues, isCreate: boolean) => Promise<boolean>;
  onToggleStatus: (chest: BackendChest) => void;
}

export function ChestsTabContent({
  state,
  dispatch,
  rooms,
  stats,
  onSaveChest,
  onToggleStatus,
}: ChestsTabContentProps) {
  const totalPages = Math.max(1, Math.ceil(state.total / state.limit));

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      <ChestsStatsCards
        totalChests={stats.totalChests}
        activeChests={stats.activeChests}
        weeklyChests={stats.weeklyChests}
        monthlyChests={stats.monthlyChests}
      />

      <ChestsFilterBar
        filters={state.filters}
        limit={state.limit}
        rooms={rooms}
        onFilterChange={(f) => dispatch({ type: "SET_FILTERS", payload: f })}
        onLimitChange={(l) => dispatch({ type: "SET_LIMIT", payload: l })}
        onResetFilters={() => dispatch({ type: "RESET_FILTERS" })}
      />

      <ChestsTable
        chests={state.chests}
        isLoading={state.isLoading}
        onPreview={(c) => dispatch({ type: "OPEN_PREVIEW_MODAL", payload: c })}
        onEdit={(c) => dispatch({ type: "OPEN_EDIT_MODAL", payload: c })}
        onToggleStatus={onToggleStatus}
      />

      {state.total > state.limit && (
        <div className="flex justify-center pt-4 border-t border-outline-variant/15">
          <Pagination
            current={state.page}
            total={totalPages}
            onChange={(p) => dispatch({ type: "SET_PAGE", payload: p })}
          />
        </div>
      )}

      {state.isFormModalOpen && (
        <ChestFormModal
          open={state.isFormModalOpen}
          onClose={() => dispatch({ type: "CLOSE_FORM_MODAL" })}
          chest={state.selectedChest}
          rooms={rooms}
          onSave={onSaveChest}
          isSubmitting={state.isSubmitting}
        />
      )}

      {state.isPreviewModalOpen && (
        <ChestPreviewModal
          open={state.isPreviewModalOpen}
          onClose={() => dispatch({ type: "CLOSE_PREVIEW_MODAL" })}
          chest={state.selectedChest}
        />
      )}
    </div>
  );
}

ChestsTabContent.displayName = "ChestsTabContent";
