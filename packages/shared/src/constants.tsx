import { Home } from "./icons/Home";
import { RocketLaunch } from "./icons/RocketLaunch";
import type { AdminSidebarLink, SidebarLinkType } from "./types";
import type { IconsProps } from "./types/iconsProps";

export const AUTH_TOKEN = "authToken";

export const ROUTES = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  MISSIONS: "/dashboard/missions",
  RANKING: "/dashboard/ranking",
};

export const ADMIN_TOKEN = "adminToken";

export const ADMIN_ROUTES = {
  MISIONES: "/panel",
  REVISION: "/panel/revision",
  USUARIOS: "/panel/usuarios",
  JUGADORES: "/panel/jugadores",
  NIVELES: "/panel/niveles",
  SALAS: "/panel/salas",
  COFRES: "/panel/cofres",
  ESTADISTICAS: "/panel/estadisticas",
};

export const ADMIN_LINKS: AdminSidebarLink[] = [
  {
    path: ADMIN_ROUTES.MISIONES,
    icon: "assignment",
    text: "Misiones",
  },
  {
    path: ADMIN_ROUTES.REVISION,
    icon: "fact_check",
    text: "Revisión de Tareas",
  },
  {
    path: ADMIN_ROUTES.JUGADORES,
    icon: "stadia_controller",
    text: "Jugadores",
  },
  {
    path: ADMIN_ROUTES.USUARIOS,
    icon: "group",
    text: "Usuarios",
  },
  {
    path: ADMIN_ROUTES.NIVELES,
    icon: "military_tech",
    text: "Niveles",
  },
  {
    path: ADMIN_ROUTES.SALAS,
    icon: "meeting_room",
    text: "Salas",
  },
  {
    path: ADMIN_ROUTES.COFRES,
    icon: "inventory_2",
    text: "Cofres",
  },
  {
    path: ADMIN_ROUTES.ESTADISTICAS,
    icon: "query_stats",
    text: "Estadísticas",
  },
];

export const PUBLIC_LINKS: SidebarLinkType[] = [
  {
    path: ROUTES.DASHBOARD,
    icon: (props: IconsProps) => <Home {...props} />,
    text: "Inicio",
  },
  {
    path: ROUTES.MISSIONS,
    icon: (props: IconsProps) => <RocketLaunch {...props} />,
    text: "Misiones",
  },
];
