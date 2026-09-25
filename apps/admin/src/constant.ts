import type { RoomBonus } from "@shared/types";

export const LOCAL_STORAGE_KEYS = {
  accessToken: "ac_token_admin",
  refreshToken: "rf_token_admin",
};

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3030";

export const ROUTES = {
  index: "/",
  panel: {
    index: "/panel",
    revision: "/panel/revision",
    salas: "/panel/salas",
  },
};

export const BONUS_OPTIONS: { value: RoomBonus; label: string }[] = [
  { value: "0", label: "0% — Sin bono adicional" },
  { value: "30", label: "+30% — Bono estándar" },
  { value: "40", label: "+40% — Bono intermedio" },
  { value: "50", label: "+50% — Bono preferencial" },
  { value: "100", label: "+100% — Bono doble" },
  { value: "150", label: "+150% — Bono super" },
  { value: "200", label: "+200% — Bono máximo" },
];
