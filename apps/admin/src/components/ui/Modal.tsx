"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ModalProps, ModalSize } from "@/types/Modal";

const sizeStyles: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  icon,
  children,
  size = "md",
}: ModalProps) {
  const [animating, setAnimating] = useState(false);
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement;
      requestAnimationFrame(() => setAnimating(true));
      document.body.style.overflow = "hidden";
    } else {
      setAnimating(false);
      document.body.style.overflow = "";
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar modal"
        className={`
          fixed inset-0 bg-black/70 backdrop-blur-md cursor-default transition-opacity duration-300
          ${animating ? "opacity-100" : "opacity-0"}
        `}
        onClick={onClose}
      />

      {/* Modal Dialog Panel */}
      <div
        className={`
          relative w-full ${sizeStyles[size]} my-auto
          bg-surface-container-low/95 backdrop-blur-2xl
          border border-outline-variant/30 rounded-2xl
          shadow-[0_25px_60px_rgba(0,0,0,0.8)]
          transition-all duration-300 ease-out z-10
          flex flex-col max-h-[88vh]
          ${animating ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-2"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/20 shrink-0 bg-surface-container/40 rounded-t-2xl">
          <div className="flex items-center gap-3 min-w-0">
            {icon && (
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(56,189,248,0.15)] shrink-0">
                <span className="material-symbols-outlined text-xl">
                  {icon}
                </span>
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface truncate">
                {title}
              </h3>
              {subtitle && (
                <p className="text-label-sm text-on-surface-variant truncate mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-9 h-9 rounded-xl bg-surface-container border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high hover:border-outline-variant/60 active:scale-95 transition-all cursor-pointer shrink-0 ml-3"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Body content */}
        <div className="px-6 py-5 overflow-y-auto overflow-x-hidden flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.displayName = "Modal";
