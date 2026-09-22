import type { FormikProps } from "formik";

/** Rol de usuario dentro del panel administrativo */
export type UserRole = "SUPER_ADMIN" | "REVIEWER";

/** Estado de actividad del usuario administrativo */
export type UserActiveStatus = "all" | "active" | "inactive";

/**
 * AdminUser — usuario del panel de administración.
 *
 * La API nunca devuelve el password. Los campos coinciden con
 * la respuesta de GET /users y GET /users/:id.
 */
export interface AdminUser {
  id: number;
  username: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

/** Datos del formulario de creación/edición (sin id ni createdAt) */
export interface AdminUserFormData {
  username: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

/** Props para los campos del formulario de usuario */
export interface UserFormFieldsProps {
  formik: FormikProps<AdminUserFormData>;
  isCreate: boolean;
}

/** Props para el modal de creación/edición */
export interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  /** null = modo creación, AdminUser = modo edición */
  user: AdminUser | null;
  onSave: (data: AdminUserFormData, isCreate: boolean) => void;
}

/** Props para los filtros de la tabla */
export interface UserFilterTabsProps {
  roleFilter: UserRole | "all";
  activeFilter: UserActiveStatus;
  onRoleChange: (role: UserRole | "all") => void;
  onActiveChange: (active: UserActiveStatus) => void;
}

/** Props para las tarjetas de estadísticas de usuarios */
export interface UserStatsProps {
  totalUsers: number;
  superAdminCount: number;
  reviewerCount: number;
  activeCount: number;
}

/** Estado del reducer */
export interface UsersState {
  users: AdminUser[];
  roleFilter: UserRole | "all";
  activeFilter: UserActiveStatus;
  search: string;
  page: number;
  totalPages: number;
  loading: boolean;
}

/** Props para la fila de la tabla (UserRow) */
export interface UserRowProps {
  user: AdminUser;
  onEdit: (id: number) => void;
  onToggleActive: (id: number) => void;
}

/** Props para la tabla de usuarios (UsersTable) */
export interface UsersTableProps {
  users: AdminUser[];
  onEdit: (id: number) => void;
  onToggleActive: (id: number) => void;
}

/** Acciones del reducer */
export type UsersAction =
  | { type: "SET_USERS"; payload: { users: AdminUser[]; totalPages: number } }
  | {
      type: "SET_ROLE_FILTER";
      payload: { roleFilter: UserRole | "all" };
    }
  | {
      type: "SET_ACTIVE_FILTER";
      payload: { activeFilter: UserActiveStatus };
    }
  | { type: "SET_SEARCH"; payload: { search: string } }
  | { type: "SET_PAGE"; payload: { page: number } }
  | { type: "CREATE_USER"; payload: { user: AdminUser } }
  | { type: "UPDATE_USER"; payload: { user: AdminUser } }
  | { type: "TOGGLE_USER_ACTIVE"; payload: { id: number } };
