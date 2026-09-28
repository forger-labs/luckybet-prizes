"use client";

import type { RowActionsProps } from "@/types/missions/RowActions";

/**
 * RowActions — Botonera de acciones inline directa (anti-quiebre responsive).
 * No usa dropdowns para evitar solapamientos o desbordes en vista móvil.
 */
export function RowActions({
  mission,
  onPreview,
  onEdit,
  onActivate,
  onCancel,
  onComplete,
}: RowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1.5 flex-wrap">
      {/* 1. Botón de Vista Previa (Siempre disponible / Destacado) */}
      <button
        type="button"
        onClick={() => onPreview(mission)}
        className="w-8 h-8 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
        title="Vista previa de la carta"
        aria-label="Vista previa de la carta"
      >
        <span className="material-symbols-outlined text-base">visibility</span>
      </button>

      {/* 2. Editar (Misiones inactivas) */}
      {mission.status === "inactive" && onEdit && (
        <button
          type="button"
          onClick={() => onEdit(mission.id)}
          className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-outline-variant/30 flex items-center justify-center transition-all cursor-pointer active:scale-95"
          title="Editar misión"
          aria-label="Editar misión"
        >
          <span className="material-symbols-outlined text-base">edit</span>
        </button>
      )}

      {/* 3. Activar (Misiones inactivas) */}
      {mission.status === "inactive" && onActivate && (
        <button
          type="button"
          onClick={() => onActivate(mission.id)}
          className="w-8 h-8 rounded-lg bg-[#22c55e]/10 hover:bg-[#22c55e]/20 text-[#4ade80] border border-[#22c55e]/30 hover:border-[#22c55e]/50 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
          title="Activar misión"
          aria-label="Activar misión"
        >
          <span className="material-symbols-outlined text-base">
            play_arrow
          </span>
        </button>
      )}

      {/* 4. Finalizar / Completar (Misiones activas) */}
      {mission.status === "active" && onComplete && (
        <button
          type="button"
          onClick={() => onComplete(mission.id)}
          className="w-8 h-8 rounded-lg bg-[#22c55e]/15 hover:bg-[#22c55e]/30 text-[#4ade80] border border-[#22c55e]/40 hover:border-[#22c55e]/60 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
          title="Finalizar misión (Marcar como completada)"
          aria-label="Finalizar misión"
        >
          <span className="material-symbols-outlined text-base">
            check_circle
          </span>
        </button>
      )}

      {/* 5. Cancelar (Misiones activas) */}
      {mission.status === "active" && onCancel && (
        <button
          type="button"
          onClick={() => onCancel(mission.id)}
          className="w-8 h-8 rounded-lg bg-error-container/20 hover:bg-error-container/40 text-error border border-error/30 hover:border-error/50 flex items-center justify-center transition-all cursor-pointer active:scale-95"
          title="Cancelar misión"
          aria-label="Cancelar misión"
        >
          <span className="material-symbols-outlined text-base">block</span>
        </button>
      )}
    </div>
  );
}

RowActions.displayName = "RowActions";
