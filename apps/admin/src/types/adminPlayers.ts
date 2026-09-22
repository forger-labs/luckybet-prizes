/**
 * Player — jugador registrado en la plataforma (modelo backend).
 */
export interface Player {
  id: number;
  username: string;
  phone: string | null;
  isActive: boolean;
}

export type PlayerStatusFilter = "all" | "active" | "suspended";

export interface PlayerFilters {
  search: string;
  status: PlayerStatusFilter;
}

export interface PlayerStatsProps {
  totalPlayers: number;
  activePlayers: number;
  suspendedPlayers: number;
  page: number;
  totalPages: number;
}

/** Estado del reducer */
export interface PlayersState {
  players: Player[];
  filters: PlayerFilters;
  page: number;
  totalPages: number;
  loading: boolean;
}

/** Acciones del reducer */
export type PlayersAction =
  | {
      type: "SET_PLAYERS";
      payload: { players: Player[]; totalPages: number };
    }
  | { type: "SET_FILTER"; payload: { filter: Partial<PlayerFilters> } }
  | { type: "SET_PAGE"; payload: { page: number } }
  | { type: "SET_LOADING"; payload: { loading: boolean } };

/** Props para la fila de la tabla */
export interface PlayerRowProps {
  player: Player;
}

/** Props para la tabla de jugadores */
export interface PlayersTableProps {
  players: Player[];
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

/** Props para la barra de filtros */
export interface PlayersFilterBarProps {
  filters: PlayerFilters;
  onFilterChange: (filter: Partial<PlayerFilters>) => void;
}
