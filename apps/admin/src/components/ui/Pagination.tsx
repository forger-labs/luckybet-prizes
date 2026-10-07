"use client";

import { useCallback, useMemo } from "react";

import type { PageEntry, PaginationProps } from "@/types/Pagination";

/**
 * Pagination — navegación de páginas con elipsis.
 *
 * Muestra máximo 5 páginas visibles. Cuando hay más de 5,
 * usa elipsis para colapsar páginas intermedias. Sigue el
 * patrón de diseño Midnight Harbor con glow primary en la
 * página activa.
 */
function Pagination({ current, total, onChange }: PaginationProps) {
  const handlePrev = useCallback(() => {
    if (current > 1) onChange(current - 1);
  }, [current, onChange]);

  const handleNext = useCallback(() => {
    if (current < total) onChange(current + 1);
  }, [current, total, onChange]);

  const pages = useMemo(() => {
    const result: PageEntry[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) result.push({ type: "page", value: i });
    } else {
      result.push({ type: "page", value: 1 });

      if (current <= 3) {
        result.push({ type: "page", value: 2 }, { type: "page", value: 3 });
        result.push({ type: "ellipsis", id: "end" });
        result.push({ type: "page", value: total });
      } else if (current >= total - 2) {
        result.push({ type: "ellipsis", id: "start" });
        result.push(
          { type: "page", value: total - 2 },
          { type: "page", value: total - 1 },
          { type: "page", value: total },
        );
      } else {
        result.push({ type: "ellipsis", id: "left" });
        result.push(
          { type: "page", value: current - 1 },
          { type: "page", value: current },
          { type: "page", value: current + 1 },
        );
        result.push({ type: "ellipsis", id: "right" });
        result.push({ type: "page", value: total });
      }
    }

    return result;
  }, [current, total]);

  if (total <= 1) return null;

  return (
    <nav aria-label="Paginación" className="flex items-center gap-1">
      {/* Previous */}
      <button
        type="button"
        disabled={current <= 1}
        onClick={handlePrev}
        aria-label="Página anterior"
        className={`
          flex items-center justify-center w-9 h-9 rounded-lg
          transition-all duration-200 cursor-pointer
          ${
            current <= 1
              ? "text-outline/40 cursor-not-allowed"
              : "text-on-surface cursor-pointer hover:bg-white/5 active:scale-95"
          }
        `}
      >
        <span className="material-symbols-outlined text-sm">chevron_left</span>
      </button>

      {/* Page numbers */}
      {pages.map((page) => {
        if (page.type === "ellipsis") {
          return (
            <span
              key={`ellipsis-${page.id}`}
              className="flex items-center justify-center w-9 h-9 text-outline text-body-md"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page.value}
            type="button"
            disabled={page.value === current}
            onClick={() => onChange(page.value)}
            aria-label={`Ir a página ${page.value}`}
            aria-current={page.value === current ? "page" : undefined}
            className={`
              flex items-center justify-center w-9 h-9 rounded-lg text-body-md
              transition-all duration-200 cursor-pointer
              ${
                page.value === current
                  ? "bg-primary/15 text-primary glow-primary-sm"
                  : "text-on-surface hover:bg-white/5 active:scale-95"
              }
            `}
          >
            {page.value}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        disabled={current >= total}
        onClick={handleNext}
        aria-label="Página siguiente"
        className={`
          flex items-center justify-center w-9 h-9 rounded-lg
          transition-all duration-200
          ${
            current >= total
              ? "text-outline/40 cursor-not-allowed"
              : "text-on-surface cursor-pointer hover:bg-white/5 active:scale-95"
          }
        `}
      >
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </button>
    </nav>
  );
}

Pagination.displayName = "Pagination";

export { Pagination };
