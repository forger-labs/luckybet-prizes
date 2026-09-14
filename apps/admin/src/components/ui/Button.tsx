"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";

import { LoadingIcon } from "@shared/icons/LoadingIcon";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant (default: "primary") */
  variant?: ButtonVariant;
  /** Show loading spinner */
  loading?: boolean;
  /** Icon at the start (Material Symbols name) */
  leadingIcon?: string;
  /** Icon at the end (Material Symbols name) */
  trailingIcon?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-fixed-dim active:scale-[0.98]",
  secondary:
    "bg-secondary text-on-secondary hover:bg-secondary-fixed-dim active:scale-[0.98] glow-button",
  ghost:
    "bg-transparent text-primary border border-primary/40 hover:bg-primary/10 active:scale-[0.98]",
  danger:
    "bg-error-container text-on-error-container hover:bg-error active:scale-[0.98]",
};

/**
 * Button — átomo base para acciones.
 *
 * Variantes: primary (light-blue), secondary (gold CTA), ghost (bordered),
 * danger (error state). Soporta loading spinner e iconos Material Symbols.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      loading = false,
      leadingIcon,
      trailingIcon,
      className = "",
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2
          font-headline-lg-mobile text-headline-lg-mobile
          py-4 px-6 rounded-lg
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <LoadingIcon />
        ) : leadingIcon ? (
          <span className="material-symbols-outlined">{leadingIcon}</span>
        ) : null}
        {children}
        {!loading && trailingIcon && (
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            {trailingIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant };
