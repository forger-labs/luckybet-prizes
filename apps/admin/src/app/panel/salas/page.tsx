"use client";

import { RoleGuard } from "@/components/admin/guards/RoleGuard";
import { RoomsList } from "@/components/admin/rooms/RoomsList";

export default function SalasPage() {
  return (
    <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
      <RoomsList />
    </RoleGuard>
  );
}
