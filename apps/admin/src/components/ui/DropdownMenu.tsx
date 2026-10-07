"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { DropdownItem, DropdownMenuProps } from "@/types/DropdownMenu";

/**
 * DropdownMenu — menú contextual con vidrio esmerilado.
 *
 * Se abre al hacer click en el trigger, soporta iconos Material Symbols
 * por item y variante danger para acciones destructivas (texto rojo).
 */
function DropdownMenu({ trigger, items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleItemClick = useCallback((item: DropdownItem) => {
    item.onClick();
    setOpen(false);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Trigger */}
      <button type="button" onClick={handleToggle} className="cursor-pointer">
        {trigger}
      </button>

      {/* Menu panel */}
      {open && (
        <div className="absolute right-0 z-50 mt-1 min-w-45 bg-surface-container/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl py-1">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleItemClick(item)}
              className={`
                w-full flex items-center gap-3 px-4 py-2.5 text-body-md transition-colors
                ${
                  item.variant === "danger"
                    ? "text-error hover:bg-error-container/20"
                    : "text-on-surface hover:bg-white/5"
                }
              `}
            >
              {item.icon && (
                <span className="material-symbols-outlined text-lg">
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

DropdownMenu.displayName = "DropdownMenu";

export { DropdownMenu };
