"use client";

import type { Dispatch } from "react";

import { Pagination } from "@/components/ui/Pagination";
import type {
  PrizesAction,
  PrizesState,
  ResolveChestClaimPayload,
} from "@/types/adminChests";
import { PrizeDetailModal } from "./PrizeDetailModal";
import { PrizesFilterBar } from "./PrizesFilterBar";
import { PrizesStatsCards } from "./PrizesStatsCards";
import { PrizesTable } from "./PrizesTable";
import { ResolveClaimModal } from "./ResolveClaimModal";

interface PrizesTabContentProps {
  state: PrizesState;
  dispatch: Dispatch<PrizesAction>;
  stats: {
    totalPrizes: number;
    claimedPrizes: number;
    uncertainPrizes: number;
    pendingPrizes: number;
  };
  onResolveClaim: (payload: ResolveChestClaimPayload) => Promise<boolean>;
}

export function PrizesTabContent({
  state,
  dispatch,
  stats,
  onResolveClaim,
}: PrizesTabContentProps) {
  const totalPages = Math.max(1, Math.ceil(state.total / state.limit));

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      <PrizesStatsCards
        totalPrizes={stats.totalPrizes}
        claimedPrizes={stats.claimedPrizes}
        uncertainPrizes={stats.uncertainPrizes}
        pendingPrizes={stats.pendingPrizes}
      />

      <PrizesFilterBar
        filters={state.filters}
        limit={state.limit}
        onFilterChange={(f) => dispatch({ type: "SET_FILTERS", payload: f })}
        onLimitChange={(l) => dispatch({ type: "SET_LIMIT", payload: l })}
        onResetFilters={() => dispatch({ type: "RESET_FILTERS" })}
      />

      <PrizesTable
        prizes={state.prizes}
        isLoading={state.isLoading}
        onViewDetail={(p) =>
          dispatch({ type: "OPEN_DETAIL_MODAL", payload: p })
        }
        onResolveClaim={(p) =>
          dispatch({ type: "OPEN_RESOLVE_MODAL", payload: p })
        }
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

      {state.isDetailModalOpen && (
        <PrizeDetailModal
          open={state.isDetailModalOpen}
          onClose={() => dispatch({ type: "CLOSE_DETAIL_MODAL" })}
          prize={state.selectedPrize}
          onResolveFromDetail={(p) =>
            dispatch({ type: "OPEN_RESOLVE_MODAL", payload: p })
          }
        />
      )}

      {state.isResolveModalOpen && (
        <ResolveClaimModal
          open={state.isResolveModalOpen}
          onClose={() => dispatch({ type: "CLOSE_RESOLVE_MODAL" })}
          prize={state.selectedPrize}
          onResolve={onResolveClaim}
          isSubmitting={state.isSubmitting}
        />
      )}
    </div>
  );
}

PrizesTabContent.displayName = "PrizesTabContent";
