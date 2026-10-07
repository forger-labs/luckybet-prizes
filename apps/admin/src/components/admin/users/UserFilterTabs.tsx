"use client";

import type {
  UserActiveStatus,
  UserFilterTabsProps,
  UserRole,
} from "@/types/adminUsers";

const ROLE_OPTIONS: { value: UserRole | "all"; label: string }[] = [
  { value: "all", label: "Todos los roles" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "REVIEWER", label: "Revisores" },
];

const ACTIVE_OPTIONS: { value: UserActiveStatus; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activos" },
  { value: "inactive", label: "Inactivos" },
];

export function UserFilterTabs({
  roleFilter,
  activeFilter,
  onRoleChange,
  onActiveChange,
}: UserFilterTabsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
      {/* Role filter */}
      <div
        className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-surface-container-low/80 border border-outline-variant/20 w-fit backdrop-blur-sm"
        role="tablist"
        aria-label="Filtrar por rol"
      >
        {ROLE_OPTIONS.map((opt) => {
          const isActive = roleFilter === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onRoleChange(opt.value)}
              className={`
                px-3.5 py-1.5 rounded-xl text-label-sm font-semibold transition-all duration-200 cursor-pointer select-none
                ${
                  isActive
                    ? "bg-primary text-on-primary shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
                }
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Active status filter */}
      <div
        className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-surface-container-low/80 border border-outline-variant/20 w-fit backdrop-blur-sm"
        role="tablist"
        aria-label="Filtrar por estado"
      >
        {ACTIVE_OPTIONS.map((opt) => {
          const isActive = activeFilter === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onActiveChange(opt.value)}
              className={`
                px-3.5 py-1.5 rounded-xl text-label-sm font-semibold transition-all duration-200 cursor-pointer select-none
                ${
                  isActive
                    ? "bg-secondary text-on-secondary shadow-[0_0_12px_rgba(255,198,64,0.25)] font-bold"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
                }
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

UserFilterTabs.displayName = "UserFilterTabs";
