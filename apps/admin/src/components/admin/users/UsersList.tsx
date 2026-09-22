"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import { sileo } from "sileo";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import type { AdminUserFormData, UserRole } from "@/types/adminUsers";
import { UserFilterTabs } from "./UserFilterTabs";
import { UserFormModal } from "./UserFormModal";
import { UserStatsCards } from "./UserStatsCards";
import {
  createUser,
  getCurrentPageItems,
  initialState,
  loadUsers,
  updateUser,
  usersReducer,
} from "./UsersReducer";
import { UsersTable } from "./UsersTable";

export function UsersList() {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    loadUsers(dispatch);
  }, []);

  const pageUsers = getCurrentPageItems(
    state.users,
    state.roleFilter,
    state.activeFilter,
    state.search,
    state.page,
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_SEARCH", payload: { search: e.target.value } });
    },
    [],
  );

  const handleRoleChange = useCallback((roleFilter: UserRole | "all") => {
    dispatch({ type: "SET_ROLE_FILTER", payload: { roleFilter } });
  }, []);

  const handleActiveChange = useCallback(
    (activeFilter: "all" | "active" | "inactive") => {
      dispatch({ type: "SET_ACTIVE_FILTER", payload: { activeFilter } });
    },
    [],
  );

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: { page } });
  }, []);

  const handleCreate = useCallback(() => {
    setEditingUser(null);
    setShowFormModal(true);
  }, []);

  const handleEdit = useCallback((id: number) => {
    setEditingUser(id);
    setShowFormModal(true);
  }, []);

  const handleToggleActive = useCallback(
    (id: number) => {
      const user = state.users.find((u) => u.id === id);
      if (!user) return;
      const willActivate = !user.isActive;
      const actionVerb = willActivate ? "activar" : "desactivar";

      sileo.action({
        title: willActivate ? "¿Activar usuario?" : "¿Desactivar usuario?",
        description: `¿Desea ${actionVerb} la cuenta de "${user.username}"?`,
        button: {
          title: willActivate ? "Activar" : "Desactivar",
          onClick: async () => {
            const ok = await updateUser(dispatch, id, {
              isActive: !user.isActive,
            });
            if (ok) {
              sileo.success({
                title: willActivate
                  ? "Usuario activado"
                  : "Usuario desactivado",
                description: `El usuario "${user.username}" fue ${actionVerb} correctamente.`,
              });
            } else {
              sileo.error({
                title: "Error",
                description: `No fue posible ${actionVerb} al usuario "${user.username}".`,
              });
            }
          },
        },
      });
    },
    [state.users],
  );

  const handleSave = useCallback(
    async (data: AdminUserFormData, isCreate: boolean) => {
      const ok = isCreate
        ? await createUser(dispatch, data)
        : editingUser !== null
          ? await updateUser(dispatch, editingUser, data)
          : false;

      if (ok) {
        setShowFormModal(false);
        setEditingUser(null);
        sileo.success({
          title: isCreate ? "Usuario creado" : "Usuario actualizado",
          description: `El usuario "${data.username}" fue ${isCreate ? "creado" : "actualizado"} exitosamente.`,
        });
      } else {
        sileo.error({
          title: "Error",
          description: `No fue posible ${isCreate ? "crear" : "actualizar"} el usuario.`,
        });
      }
    },
    [editingUser],
  );

  const editingUserObj =
    editingUser !== null
      ? (state.users.find((u) => u.id === editingUser) ?? null)
      : null;
  const superAdminCount = state.users.filter(
    (u) => u.role === "SUPER_ADMIN",
  ).length;
  const reviewerCount = state.users.filter((u) => u.role === "REVIEWER").length;
  const activeCount = state.users.filter((u) => u.isActive).length;

  if (state.loading) {
    return (
      <div className="flex items-center justify-center py-28">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <span className="material-symbols-outlined text-3xl animate-spin">
              sync
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant font-medium">
            Cargando directorio de usuarios...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <UserStatsCards
        totalUsers={state.users.length}
        superAdminCount={superAdminCount}
        reviewerCount={reviewerCount}
        activeCount={activeCount}
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="w-full sm:max-w-md">
          <Input
            id="search-users"
            icon="search"
            placeholder="Buscar por nombre de usuario..."
            value={state.search}
            onChange={handleSearchChange}
            wrapperClassName="w-full"
            className="bg-surface-container-low/90 border-outline-variant/30 focus:border-primary"
          />
        </div>
        <Button
          leadingIcon="person_add"
          onClick={handleCreate}
          variant="secondary"
          className="whitespace-nowrap shrink-0 font-bold shadow-[0_0_15px_rgba(255,198,64,0.2)] hover:shadow-[0_0_20px_rgba(255,198,64,0.35)] cursor-pointer"
        >
          Crear usuario
        </Button>
      </div>

      <UserFilterTabs
        roleFilter={state.roleFilter}
        activeFilter={state.activeFilter}
        onRoleChange={handleRoleChange}
        onActiveChange={handleActiveChange}
      />

      <UsersTable
        users={pageUsers}
        onEdit={handleEdit}
        onToggleActive={handleToggleActive}
      />

      <div className="flex justify-center pt-4 border-t border-outline-variant/15">
        <Pagination
          current={state.page}
          total={state.totalPages}
          onChange={handlePageChange}
        />
      </div>

      {showFormModal && (
        <UserFormModal
          open={showFormModal}
          onClose={() => {
            setShowFormModal(false);
            setEditingUser(null);
          }}
          user={editingUserObj}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

UsersList.displayName = "UsersList";
