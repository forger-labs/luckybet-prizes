"use client";

import type { ReviewTableProps } from "@/types/review/ReviewSubmission";
import { ReviewTableRow } from "./ReviewTableRow";

export function ReviewTable({
  submissions,
  onSelect,
  onApprove,
  onReject,
}: ReviewTableProps) {
  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low/60  text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center justify-center text-outline/60 mb-4 shadow-inner">
          <span className="material-symbols-outlined text-3xl">fact_check</span>
        </div>
        <p className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface">
          No hay tareas en esta sección
        </p>
        <p className="font-body-md text-sm text-on-surface-variant max-w-sm mt-1">
          No se encontraron envíos para el estado o categoría seleccionada.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface-container-low/70  shadow-xl">
      <table className="w-full text-left border-collapse min-w-[720px]">
        <thead>
          <tr className="border-b border-outline-variant/20 bg-surface-container-high/40">
            <th className="py-3.5 px-4 sm:pl-6 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Jugador
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Misión
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Evidencia
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
          {submissions.map((submission) => (
            <ReviewTableRow
              key={submission.id}
              submission={submission}
              onSelect={onSelect}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

ReviewTable.displayName = "ReviewTable";
