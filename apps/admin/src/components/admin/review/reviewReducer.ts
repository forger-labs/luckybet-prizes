import type { MissionCategory, ReviewSubmission } from "@shared/types";

import type { ReviewFilter } from "@/types/review/ReviewSubmission";
import type { MockSubmission } from "./mockData";

export interface ReviewState {
  submissions: ReviewSubmission[];
  filter: ReviewFilter;
  category: MissionCategory | "all";
  sortOrder: "newest" | "oldest";
  search: string;
  loading: boolean;
  selectedSubmission:
    | (ReviewSubmission & {
        verificationCriteria?: import("@shared/types").VerificationCriterion[];
      })
    | null;
  modalOpen: boolean;
}

export type ReviewAction =
  | { type: "LOAD_SUBMISSIONS"; payload: { submissions: ReviewSubmission[] } }
  | { type: "SET_FILTER"; payload: { filter: ReviewFilter } }
  | { type: "SET_CATEGORY"; payload: { category: MissionCategory | "all" } }
  | { type: "SET_SORT_ORDER"; payload: { sortOrder: "newest" | "oldest" } }
  | { type: "SET_SEARCH"; payload: { search: string } }
  | { type: "SELECT_SUBMISSION"; payload: { submission: MockSubmission } }
  | { type: "CLOSE_MODAL" }
  | {
      type: "UPDATE_STATUS";
      payload: { id: string; status: "approved" | "rejected" };
    };

export function reviewReducer(
  state: ReviewState,
  action: ReviewAction,
): ReviewState {
  switch (action.type) {
    case "LOAD_SUBMISSIONS":
      return {
        ...state,
        submissions: action.payload.submissions,
        loading: false,
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload.filter };
    case "SET_CATEGORY":
      return { ...state, category: action.payload.category };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload.sortOrder };
    case "SET_SEARCH":
      return { ...state, search: action.payload.search };
    case "SELECT_SUBMISSION":
      return {
        ...state,
        selectedSubmission: action.payload.submission,
        modalOpen: true,
      };
    case "CLOSE_MODAL":
      return { ...state, modalOpen: false, selectedSubmission: null };
    case "UPDATE_STATUS":
      return {
        ...state,
        submissions: state.submissions.filter(
          (s) => s.id !== action.payload.id,
        ),
        modalOpen: false,
        selectedSubmission: null,
      };
    default:
      return state;
  }
}
