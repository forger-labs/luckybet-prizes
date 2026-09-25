import type { ReactNode } from "react";

export interface RoleGuardProps {
  allowedRoles?: string[];
  children: ReactNode;
}
