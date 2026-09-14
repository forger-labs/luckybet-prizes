"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ModalProps, ModalSize } from "@/types/Modal";

const sizeStyles: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

/**
 * Modal — overlay de vidrio esmerilado con fondo blur.
 *
 * Soporta cierre por backdrop click, tecla Escape, botón X en el header,
 * y animación de entrada (scale + fade). Ideal para formularios y
 * visualización detallada sin cambiar de ruta.
 */
function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  const [animating, setAnimating] = useState(false);
  const previousActiveElement = useRef<Element | null>(null);

  // Lock body scroll and trap focus when open
  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement;
      // Trigger mount animation on next frame
      requestAnimationFrame(() => setAnimating(true));
    } else {
      setAnimating(false);
      document.body.style.overflow = "";
      // Restore focus
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open, handleEscape]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`
          relative w-full ${sizeStyles[size]}
          bg-surface-container/80 backdrop-blur-xl
          border border-white/10 rounded-xl
          shadow-[0_0_40px_rgba(56,189,248,0.1)]
          transition-all duration-200 ease-out
          ${animating ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
          <h2 className="text-title-md text-on-surface font-headline-lg">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-outline cursor-pointer p-2 hover:text-on-surface transition-colors rounded-lg hover:bg-white/5"
          >
            <span className="text-xl text-red-400">Cerrar</span>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.displayName = "Modal";

export { Modal };
