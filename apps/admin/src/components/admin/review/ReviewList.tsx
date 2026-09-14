"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import { sileo } from "sileo";

import { getAllMockSubmissions } from "./mockData";
import { ReviewableCard } from "./ReviewableCard";
import { ReviewFilterBar } from "./ReviewFilterBar";
import { ReviewModal } from "./ReviewModal";
import { type ReviewState, reviewReducer } from "./reviewReducer";
import { SkeletonCard } from "./SkeletonCard";

const INITIAL_STATE: ReviewState = {
  submissions: [],
  filter: "pending",
  category: "all",
  sortOrder: "newest",
  search: "",
  loading: true,
  selectedSubmission: null,
  modalOpen: false,
};

const EMPTY_MESSAGES: Record<
  string,
  { icon: string; title: string; desc: string }
> = {
  pending: {
    icon: "fact_check",
    title: "No hay tareas pendientes de revisión",
    desc: "Los submissions aparecerán aquí cuando los usuarios completen misiones.",
  },
  approved: {
    icon: "task_alt",
    title: "No hay tareas aprobadas",
    desc: "Las tareas que apruebes aparecerán aquí.",
  },
  rejected: {
    icon: "gpp_bad",
    title: "No hay tareas rechazadas",
    desc: "Las tareas que rechaces aparecerán aquí.",
  },
};

function ReviewList() {
  const [state, dispatch] = useReducer(reviewReducer, INITIAL_STATE);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: "LOAD_SUBMISSIONS",
        payload: { submissions: getAllMockSubmissions() },
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      const sub = state.submissions.find((s) => s.id === id);
      if (sub)
        dispatch({
          type: "SELECT_SUBMISSION",
          payload: { submission: sub as never },
        });
    },
    [state.submissions],
  );

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, []);

  const handleApprove = useCallback(async (id: string, _notes?: string) => {
    await new Promise((r) => setTimeout(r, 400));
    dispatch({ type: "UPDATE_STATUS", payload: { id, status: "approved" } });
    sileo.success({ title: "Tarea aprobada correctamente", duration: 3000 });
  }, []);

  const handleReject = useCallback(async (id: string, _notes: string) => {
    await new Promise((r) => setTimeout(r, 400));
    dispatch({ type: "UPDATE_STATUS", payload: { id, status: "rejected" } });
    sileo.success({ title: "Tarea rechazada", duration: 3000 });
  }, []);

  const filtered = useMemo(() => {
    const { filter, category, sortOrder, search, submissions } = state;

    let result = submissions;

    // Status filter
    result = result.filter((s) => s.status === filter);

    // Category filter
    if (category !== "all") {
      result = result.filter((s) => s.missionCategory === category);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.userName.toLowerCase().includes(q) ||
          s.missionTitle.toLowerCase().includes(q),
      );
    }

    // Date sort
    result = [...result].sort((a, b) => {
      const diff =
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      return sortOrder === "newest" ? diff : -diff;
    });

    return result;
  }, [state]);

  const empty = EMPTY_MESSAGES[state.filter];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-headline-lg text-on-surface font-headline-lg">
        Revisión de Tareas
      </h1>

      <ReviewFilterBar
        activeTab={state.filter}
        category={state.category}
        sortOrder={state.sortOrder}
        onTabChange={(tab) =>
          dispatch({ type: "SET_FILTER", payload: { filter: tab } })
        }
        onCategoryChange={(cat) =>
          dispatch({ type: "SET_CATEGORY", payload: { category: cat } })
        }
        onSortChange={(order) =>
          dispatch({ type: "SET_SORT_ORDER", payload: { sortOrder: order } })
        }
      />

      {state.loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, () => crypto.randomUUID()).map((key) => (
            <SkeletonCard key={key} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="material-symbols-outlined text-6xl text-outline/40">
            {empty.icon}
          </span>
          <p className="text-title-md text-on-surface-variant text-center">
            {empty.title}
          </p>
          <p className="text-body-md text-outline text-center max-w-md">
            {empty.desc}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((submission) => (
            <ReviewableCard
              key={submission.id}
              submission={submission}
              onClick={handleSelect}
            />
          ))}
        </div>
      )}

      {state.selectedSubmission && (
        <ReviewModal
          submission={state.selectedSubmission}
          open={state.modalOpen}
          onClose={handleClose}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

export { ReviewList };
