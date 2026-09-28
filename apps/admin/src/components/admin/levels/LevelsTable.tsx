"use client";

import type { LevelsTableProps } from "@/types/adminLevels";
import { LevelRow } from "./LevelRow";

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"];

export function LevelsTable({ levels, isLoading, onEdit }: LevelsTableProps) {
  if (isLoading) {
    return (
      <div className="w-full overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface-container-low/70  shadow-xl">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-outline-variant/20 bg-surface-container-high/40">
              <th className="py-3.5 px-4 sm:pl-6 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Medalla / Símbolo
              </th>
              <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Nombre de Nivel
              </th>
              <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Exp. Mínima
              </th>
              <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Monedas
              </th>
              <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Sala Asignada
              </th>
              <th className="py-3.5 px-4 sm:pr-6 text-right text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {SKELETON_KEYS.map((key) => (
              <tr key={key} className="animate-pulse">
                <td className="py-4 px-4 sm:pl-6">
                  <div className="w-11 h-11 rounded-xl bg-surface-container-highest/60" />
                </td>
                <td className="py-4 px-4">
                  <div className="h-4 w-32 bg-surface-container-highest/60 rounded mb-1" />
                  <div className="h-3 w-16 bg-surface-container-highest/40 rounded" />
                </td>
                <td className="py-4 px-4">
                  <div className="h-6 w-24 bg-surface-container-highest/60 rounded-full" />
                </td>
                <td className="py-4 px-4">
                  <div className="h-6 w-20 bg-surface-container-highest/60 rounded-full" />
                </td>
                <td className="py-4 px-4">
                  <div className="h-6 w-20 bg-surface-container-highest/60 rounded-full" />
                </td>
                <td className="py-4 px-4 sm:pr-6 text-right">
                  <div className="inline-block h-8 w-8 bg-surface-container-highest/60 rounded-xl" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (levels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low/60  text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center justify-center text-outline/60 mb-4 shadow-inner">
          <span className="material-symbols-outlined text-3xl">
            military_tech
          </span>
        </div>
        <p className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface">
          No se encontraron niveles
        </p>
        <p className="font-body-md text-sm text-on-surface-variant max-w-sm mt-1">
          Intente con otros filtros o cree un nuevo nivel de progresión.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface-container-low/70  shadow-xl">
      <table className="w-full text-left border-collapse min-w-[640px]">
        <thead>
          <tr className="border-b border-outline-variant/20 bg-surface-container-high/40">
            <th className="py-3.5 px-4 sm:pl-6 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Medalla / Símbolo
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Nombre de Nivel
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Exp. Mínima
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Monedas
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Sala Asignada
            </th>
            <th className="py-3.5 px-4 sm:pr-6 text-right text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {levels.map((level) => (
            <LevelRow key={level.id} level={level} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

LevelsTable.displayName = "LevelsTable";
