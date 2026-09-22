"use client";

import type { UserRowProps } from "@/types/adminUsers";

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  REVIEWER: "Revisor",
};

export function UserRow({ user, onEdit, onToggleActive }: UserRowProps) {
  const roleLabel = ROLE_LABELS[user.role] ?? user.role;
  const initial = user.username ? user.username[0].toUpperCase() : "U";

  return (
    <tr className="border-b border-outline-variant/15 last:border-b-0 hover:bg-surface-container-high/40 transition-colors duration-150 group">
      {/* Username & Avatar */}
      <td className="py-4 px-4 sm:pl-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-surface-container-highest to-surface-container-high border border-outline-variant/30 flex items-center justify-center font-bold text-sm text-primary shadow-sm shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <span className="font-(--font-plus-jakarta-sans) text-body-md font-semibold text-on-surface block truncate group-hover:text-primary transition-colors">
              {user.username}
            </span>
            <span className="text-[11px] text-on-surface-variant/70 block">
              ID: #{user.id}
            </span>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="py-4 px-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-semibold border ${
            user.role === "SUPER_ADMIN"
              ? "bg-tertiary/15 text-tertiary border-tertiary/30"
              : "bg-primary/15 text-primary border-primary/30"
          }`}
        >
          <span className="material-symbols-outlined text-xs">
            {user.role === "SUPER_ADMIN" ? "verified" : "shield"}
          </span>
          <span>{roleLabel}</span>
        </span>
      </td>

      {/* Active Status */}
      <td className="py-4 px-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-semibold border ${
            user.isActive
              ? "bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30"
              : "bg-error-container/30 text-error border-error-container/40"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              user.isActive ? "bg-[#4ade80] animate-pulse" : "bg-error"
            }`}
          />
          <span>{user.isActive ? "Activo" : "Inactivo"}</span>
        </span>
      </td>

      {/* Actions */}
      <td className="py-4 px-4 sm:pr-6 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(user.id)}
            className="flex items-center justify-center w-9 h-9 rounded-xl text-outline hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all cursor-pointer"
            aria-label={`Editar usuario ${user.username}`}
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleActive(user.id)}
            className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all cursor-pointer border border-transparent ${
              user.isActive
                ? "text-outline hover:text-error hover:bg-error/10 hover:border-error/20"
                : "text-outline hover:text-[#4ade80] hover:bg-[#22c55e]/10 hover:border-[#22c55e]/20"
            }`}
            aria-label={
              user.isActive
                ? `Desactivar usuario ${user.username}`
                : `Activar usuario ${user.username}`
            }
          >
            <span className="material-symbols-outlined text-lg">
              {user.isActive ? "block" : "check_circle"}
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}

UserRow.displayName = "UserRow";
