"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuthAdmin } from "@/hooks/useAuthAdmin";
import type { RoleGuardProps } from "@/types/RoleGuard";

export function RoleGuard({
  allowedRoles = ["SUPER_ADMIN"],
  children,
}: RoleGuardProps) {
  const { user } = useAuthAdmin();
  const [isChecking, setIsChecking] = useState(true);
  console.log(user);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (isChecking && !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary animate-pulse">
          <span className="material-symbols-outlined text-2xl">
            shield_lock
          </span>
        </div>
        <p className="text-body-md text-on-surface-variant font-medium">
          Verificando permisos de acceso...
        </p>
      </div>
    );
  }

  const isAuthorized = user && allowedRoles.includes(user.role);

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-error-container/20 border border-error/30 flex items-center justify-center text-error shadow-[0_0_30px_rgba(255,180,171,0.2)]">
            <span className="material-symbols-outlined text-4xl">
              lock_person
            </span>
          </div>
          <span className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-base">block</span>
          </span>
        </div>

        <h2 className="font-(--font-plus-jakarta-sans) text-headline-lg font-bold text-on-surface mb-2">
          Acceso Restringido
        </h2>
        <p className="text-body-md text-on-surface-variant max-w-md mb-8">
          Esta sección está reservada exclusivamente para usuarios con rol de{" "}
          <strong className="text-primary font-semibold">
            {allowedRoles.join(", ")}
          </strong>
          . Tu rol actual es{" "}
          <span className="text-secondary font-medium">
            {user?.role || "Sin sesión activa"}
          </span>
          .
        </p>

        <Link
          href="/panel"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/40 text-on-surface font-label-md transition-all active:scale-95 shadow-md"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>Volver al Panel Principal</span>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}

RoleGuard.displayName = "RoleGuard";
