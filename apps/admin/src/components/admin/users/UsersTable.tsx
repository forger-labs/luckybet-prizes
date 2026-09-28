"use client";

import type { UsersTableProps } from "@/types/adminUsers";
import { UserRow } from "./UserRow";

export function UsersTable({ users, onEdit, onToggleActive }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low/60  text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center justify-center text-outline/60 mb-4 shadow-inner">
          <span className="material-symbols-outlined text-3xl">group_off</span>
        </div>
        <p className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface">
          No se encontraron usuarios
        </p>
        <p className="font-body-md text-sm text-on-surface-variant max-w-sm mt-1">
          Intente con otros filtros o cree un nuevo usuario administrativo.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface-container-low/70  shadow-xl">
      <table className="w-full text-left border-collapse min-w-[620px]">
        <thead>
          <tr className="border-b border-outline-variant/20 bg-surface-container-high/40">
            <th className="py-3.5 px-4 sm:pl-6 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Usuario
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Rol
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Estado
            </th>
            <th className="py-3.5 px-4 sm:pr-6 text-right text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onToggleActive={onToggleActive}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

UsersTable.displayName = "UsersTable";
