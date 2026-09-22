/**
 * UsersReducer — state management for the Users admin page.
 *
 * Page-local state via useReducer. Handles loading, filtering by role and
 * active status, text search, and pagination. API calls are delegated to
 * apiAdminGanaya; the reducer only manages local UI state.
 */

import type { Dispatch } from "react";

import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type {
  AdminUser,
  AdminUserFormData,
  UserActiveStatus,
  UserRole,
  UsersAction,
  UsersState,
} from "@/types/adminUsers";

/* ── Constants ── */

const PAGE_SIZE = 8;

/* ── Initial State ── */

export const initialState: UsersState = {
  users: [],
  roleFilter: "all",
  activeFilter: "all",
  search: "",
  page: 1,
  totalPages: 1,
  loading: true,
};

/* ── Filter + Search logic ── */

function applyFilters(
  users: AdminUser[],
  roleFilter: UserRole | "all",
  activeFilter: UserActiveStatus,
  search: string,
): AdminUser[] {
  let filtered = users;

  // Role filter
  if (roleFilter !== "all") {
    filtered = filtered.filter((u) => u.role === roleFilter);
  }

  // Active status filter
  if (activeFilter === "active") {
    filtered = filtered.filter((u) => u.isActive);
  } else if (activeFilter === "inactive") {
    filtered = filtered.filter((u) => !u.isActive);
  }

  // Text search by username
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter((u) => u.username.toLowerCase().includes(q));
  }

  return filtered;
}

function getTotalPages(length: number) {
  return Math.max(1, Math.ceil(length / PAGE_SIZE));
}

/* ── Reducer ── */

export function usersReducer(
  state: UsersState,
  action: UsersAction,
): UsersState {
  switch (action.type) {
    case "SET_USERS": {
      const users = action.payload.users;
      const filtered = applyFilters(
        users,
        state.roleFilter,
        state.activeFilter,
        state.search,
      );
      return {
        ...state,
        users,
        totalPages: getTotalPages(filtered.length),
        loading: false,
        page: 1,
      };
    }

    case "SET_ROLE_FILTER": {
      const { roleFilter } = action.payload;
      const filtered = applyFilters(
        state.users,
        roleFilter,
        state.activeFilter,
        state.search,
      );
      return {
        ...state,
        roleFilter,
        totalPages: getTotalPages(filtered.length),
        page: 1,
      };
    }

    case "SET_ACTIVE_FILTER": {
      const { activeFilter } = action.payload;
      const filtered = applyFilters(
        state.users,
        state.roleFilter,
        activeFilter,
        state.search,
      );
      return {
        ...state,
        activeFilter,
        totalPages: getTotalPages(filtered.length),
        page: 1,
      };
    }

    case "SET_SEARCH": {
      const { search } = action.payload;
      const filtered = applyFilters(
        state.users,
        state.roleFilter,
        state.activeFilter,
        search,
      );
      return {
        ...state,
        search,
        totalPages: getTotalPages(filtered.length),
        page: 1,
      };
    }

    case "SET_PAGE": {
      return { ...state, page: action.payload.page };
    }

    case "CREATE_USER": {
      const users = [action.payload.user, ...state.users];
      const filtered = applyFilters(
        users,
        state.roleFilter,
        state.activeFilter,
        state.search,
      );
      return {
        ...state,
        users,
        totalPages: getTotalPages(filtered.length),
      };
    }

    case "UPDATE_USER": {
      const users = state.users.map((u) =>
        u.id === action.payload.user.id ? action.payload.user : u,
      );
      const filtered = applyFilters(
        users,
        state.roleFilter,
        state.activeFilter,
        state.search,
      );
      return {
        ...state,
        users,
        totalPages: getTotalPages(filtered.length),
      };
    }

    case "TOGGLE_USER_ACTIVE": {
      const users = state.users.map((u) =>
        u.id === action.payload.id ? { ...u, isActive: !u.isActive } : u,
      );
      const filtered = applyFilters(
        users,
        state.roleFilter,
        state.activeFilter,
        state.search,
      );
      return {
        ...state,
        users,
        totalPages: getTotalPages(filtered.length),
      };
    }

    default:
      return state;
  }
}

/* ── Selector: get current page items ── */

export function getCurrentPageItems(
  users: AdminUser[],
  roleFilter: UserRole | "all",
  activeFilter: UserActiveStatus,
  search: string,
  page: number,
): AdminUser[] {
  const filtered = applyFilters(users, roleFilter, activeFilter, search);
  const start = (page - 1) * PAGE_SIZE;
  return filtered.slice(start, start + PAGE_SIZE);
}

/* ── Action dispatchers ── */

/** Load users from the API */
export async function loadUsers(dispatch: Dispatch<UsersAction>) {
  const result = await apiAdminGanaya.getUsers();
  if (result.status && result.data) {
    const apiTotalPages = result.meta?.totalPages ?? 1;
    dispatch({
      type: "SET_USERS",
      payload: { users: result.data, totalPages: apiTotalPages },
    });
  } else {
    dispatch({
      type: "SET_USERS",
      payload: { users: [], totalPages: 1 },
    });
  }
}

/** Create a new user via API */
export async function createUser(
  dispatch: Dispatch<UsersAction>,
  data: AdminUserFormData,
): Promise<boolean> {
  const result = await apiAdminGanaya.createUser(data);
  if (result.status && result.data) {
    dispatch({ type: "CREATE_USER", payload: { user: result.data } });
    return true;
  }
  return false;
}

/** Update an existing user via API */
export async function updateUser(
  dispatch: Dispatch<UsersAction>,
  id: number,
  data: Partial<AdminUserFormData>,
): Promise<boolean> {
  const result = await apiAdminGanaya.updateUser(id, data);
  if (result.status && result.data) {
    dispatch({ type: "UPDATE_USER", payload: { user: result.data } });
    return true;
  }
  return false;
}
