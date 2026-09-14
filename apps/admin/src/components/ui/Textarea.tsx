"use client";

import { forwardRef } from "react";

import type { TextareaProps } from "@/types/Textarea";

/**
 * Textarea — átomo multi-línea con icono opcional y estado de error.
 *
 * Sigue el patrón de Input: fondo surface-container-lowest, glow de foco
 * primary, icono Material Symbols. Resize vertical únicamente.
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ icon, error, className = "", ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute top-4 left-4 text-outline pointer-events-none">
            {icon}
          </span>
        )}
        <textarea
          ref={ref}
          className={`
            w-full bg-surface-container-lowest border
            rounded-lg py-3.5 px-4 text-on-surface placeholder:text-outline
            focus:outline-none focus:border-primary
            transition-all duration-300 input-glow
            font-body-md resize-y min-h-25
            ${icon ? "pl-12" : ""}
            ${error ? "border-error" : "border-outline-variant/30"}
            ${className}
          `}
          aria-invalid={!!error}
          {...props}
        />
        {error && <p className="mt-1 text-label-sm text-error">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
