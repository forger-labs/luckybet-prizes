import type { FormikProps } from "formik";

import type {
  BackendPlayer,
  BackendPlayerLevel,
  BackendPlayerRoom,
  GetPlayersQuery,
  UpdatePlayerPayload,
} from "@shared/types";

export type {
  BackendPlayer,
  BackendPlayerLevel,
  BackendPlayerRoom,
  GetPlayersQuery,
  UpdatePlayerPayload,
};

/** Player alias of BackendPlayer for domain consistency */
export type Player = BackendPlayer;

export type PlayerStatusFilter = "all" | "active" | "suspended";

/** Filter criteria for searching and paginating players */
export interface PlayerFilters {
  username: string;
  phone: string;
  status: PlayerStatusFilter;
  levelId: string;
  roomId: string;
}

/** Values for player editing form */
export interface PlayerFormValues {
  username: string;
  phone: string;
  isActive: boolean;
}

export interface PlayerStatsProps {
  totalPlayers: number;
  activePlayers: number;
  suspendedPlayers: number;
  totalExperience: number;
}

/** Estado del reducer */
export interface PlayersState {
  players: Player[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  isSubmitting: boolean;
  filters: PlayerFilters;
  selectedPlayer: Player | null;
  isEditModalOpen: boolean;
}

/** Acciones del reducer */
export type PlayersAction =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: { players: Player[]; total: number };
    }
  | { type: "FETCH_ERROR" }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "SET_FILTERS"; payload: Partial<PlayerFilters> }
  | { type: "RESET_FILTERS" }
  | { type: "OPEN_EDIT_MODAL"; payload: Player }
  | { type: "CLOSE_EDIT_MODAL" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR" }
  | { type: "SET_SELECTED_PLAYER"; payload: Player | null };

/** Props para la fila de la tabla */
export interface PlayerRowProps {
  player: Player;
  onEdit: (player: Player) => void;
  onToggleStatus: (player: Player) => void;
}

/** Props para la tabla de jugadores */
export interface PlayersTableProps {
  players: Player[];
  loading: boolean;
  onEdit: (player: Player) => void;
  onToggleStatus: (player: Player) => void;
}

/** Props para la barra de filtros */
export interface PlayersFilterBarProps {
  filters: PlayerFilters;
  limit: number;
  onFilterChange: (filter: Partial<PlayerFilters>) => void;
  onLimitChange: (limit: number) => void;
  onResetFilters: () => void;
}

/** Props para el modal de edición de jugador */
export interface PlayerEditModalProps {
  open: boolean;
  onClose: () => void;
  player: Player | null;
  onSave: (values: PlayerFormValues) => Promise<boolean>;
  isSubmitting?: boolean;
}

/** Props para los campos del formulario de edición */
export interface PlayerEditFormFieldsProps {
  formik: FormikProps<PlayerFormValues>;
}
