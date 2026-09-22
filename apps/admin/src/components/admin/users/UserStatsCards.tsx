"use client";

import type { UserStatsProps } from "@/types/adminUsers";

export function UserStatsCards({
  totalUsers,
  superAdminCount,
  reviewerCount,
  activeCount,
}: UserStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-on-surface-variant block">
          Total Usuarios
        </span>
        <span className="text-2xl font-bold text-on-surface mt-1 block">
          {totalUsers}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-tertiary block">Super Admins</span>
        <span className="text-2xl font-bold text-tertiary mt-1 block">
          {superAdminCount}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-primary block">Revisores</span>
        <span className="text-2xl font-bold text-primary mt-1 block">
          {reviewerCount}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/20 backdrop-blur-md">
        <span className="text-label-sm text-[#4ade80] block">Activos</span>
        <span className="text-2xl font-bold text-[#4ade80] mt-1 block">
          {activeCount}
        </span>
      </div>
    </div>
  );
}

UserStatsCards.displayName = "UserStatsCards";
