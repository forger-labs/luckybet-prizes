import type { FormikProps } from "formik";

import type {
  BackendRoom,
  CreateRoomPayload,
  GetRoomsQuery,
  RoomBonus,
  UpdateRoomPayload,
} from "@shared/types";

export type {
  BackendRoom,
  CreateRoomPayload,
  GetRoomsQuery,
  RoomBonus,
  UpdateRoomPayload,
};

/** AdminRoom alias of BackendRoom for domain consistency */
export type AdminRoom = BackendRoom;

/** Values for the room creation/editing form */
export interface RoomFormValues {
  name: string;
  bonus: RoomBonus;
  isActive: boolean;
}

/** Filter criteria for searching and paginating rooms */
export interface RoomFilters {
  name: string;
  bonus: string;
  isActive: string; // "all" | "active" | "inactive"
}

/** State for the admin rooms reducer and management views */
export interface RoomsState {
  rooms: BackendRoom[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  isSubmitting: boolean;
  filters: RoomFilters;
  selectedRoom: BackendRoom | null;
  isModalOpen: boolean;
  isEditMode: boolean;
}

/** Action types for roomsReducer */
export type RoomsAction =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: { rooms: BackendRoom[]; total: number };
    }
  | { type: "FETCH_ERROR" }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "SET_FILTERS"; payload: Partial<RoomFilters> }
  | { type: "RESET_FILTERS" }
  | { type: "OPEN_CREATE_MODAL" }
  | { type: "OPEN_EDIT_MODAL"; payload: BackendRoom }
  | { type: "CLOSE_MODAL" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR" }
  | { type: "SET_SELECTED_ROOM"; payload: BackendRoom | null };

/** Props for room form fields */
export interface RoomFormFieldsProps {
  formik: FormikProps<RoomFormValues>;
  isCreate: boolean;
}

/** Props for room creation and update modal */
export interface RoomFormModalProps {
  open: boolean;
  onClose: () => void;
  room: BackendRoom | null;
  onSave: (data: RoomFormValues, isCreate: boolean) => Promise<boolean>;
  isSubmitting?: boolean;
}

/** Props for room stats cards */
export interface RoomsStatsCardsProps {
  totalRooms: number;
  activeRooms: number;
  bonusRoomsCount: number;
  highestBonus: string;
}

/** Props for room filter bar */
export interface RoomsFilterBarProps {
  filters: RoomFilters;
  limit: number;
  onFilterChange: (filters: Partial<RoomFilters>) => void;
  onLimitChange: (limit: number) => void;
  onResetFilters: () => void;
}

/** Props for rooms table */
export interface RoomsTableProps {
  rooms: BackendRoom[];
  isLoading: boolean;
  onEdit: (room: BackendRoom) => void;
  onToggleStatus: (room: BackendRoom) => void;
}

/** Props for single room row */
export interface RoomRowProps {
  room: BackendRoom;
  onEdit: (room: BackendRoom) => void;
  onToggleStatus: (room: BackendRoom) => void;
}
