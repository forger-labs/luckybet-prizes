"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import type { SelectProps } from "@/types/Select";

/**
 * Select — dropdown personalizado con vidrio esmerilado.
 *
 * Sigue el patrón de Input: icono Material Symbols a la izquierda,
 * glow de foco primary, y panel flotante con glassmorphism.
 */
const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      icon,
      id,
      name,
      options,
      placeholder = "Seleccionar...",
      value,
      onChange,
      error,
      className = "",
      disabled = false,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => {
      if (containerRef.current) {
        return containerRef.current;
      }
      throw new Error("Select container ref is null");
    });

    const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

    const handleToggle = useCallback(() => {
      if (!disabled) setOpen((prev) => !prev);
    }, [disabled]);

    const handleSelect = useCallback(
      (optionValue: string) => {
        onChange?.(optionValue);
        setOpen(false);
      },
      [onChange],
    );

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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
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
      <div ref={containerRef} className={`relative ${className}`}>
        {/* Trigger */}
        <button
          type="button"
          id={id}
          name={name}
          disabled={disabled}
          onClick={handleToggle}
          className={`
            w-full flex items-center gap-2
            bg-surface-container-lowest border
            rounded-lg py-3.5 px-4 text-left
            transition-all duration-300
            font-body-md
            ${
              error
                ? "border-error text-error"
                : "border-outline-variant/30 text-on-surface"
            }
            ${
              open
                ? "border-primary input-glow"
                : "hover:border-outline-variant/60"
            }
            ${icon ? "pl-12" : ""}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {icon && (
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
              {icon}
            </span>
          )}
          <span
            className={`flex-1 truncate ${!selectedLabel ? "text-outline" : ""}`}
          >
            {selectedLabel || placeholder}
          </span>
          <span className="material-symbols-outlined text-outline transition-transform duration-200 text-sm">
            {open ? "expand_less" : "expand_more"}
          </span>
        </button>

        {/* Error message */}
        {error && <p className="mt-1 text-label-sm text-error">{error}</p>}

        {/* Dropdown panel */}
        {open && (
          <div
            className="absolute z-50 mt-1 w-full bg-surface-container/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl max-h-60 overflow-y-auto"
            role="listbox"
          >
            {options.length === 0 ? (
              <div className="px-4 py-3 text-outline text-body-md">
                Sin opciones
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full text-left px-4 py-3 text-body-md transition-colors
                    ${
                      option.value === value
                        ? "bg-primary/10 text-primary"
                        : "text-on-surface hover:bg-white/5"
                    }
                  `}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
