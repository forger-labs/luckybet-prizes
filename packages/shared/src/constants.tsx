import { Home } from "./icons/Home";
import { Ranking } from "./icons/Ranking";
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
  {
    path: ROUTES.RANKING,
    icon: (props: IconsProps) => <Ranking {...props} />,
    text: "Ranking",
  },
];
