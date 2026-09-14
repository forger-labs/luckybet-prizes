"use client";

import { type InputHTMLAttributes, useState } from "react";

import { Input } from "@/components/ui/Input";

interface PasswordFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "icon"> {
  /** Label text */
  label?: string;
  /** Forgot-password link node (rendered inline with label) */
  forgotLink?: React.ReactNode;
  /** Validation error message */
  error?: string;
}

/**
 * PasswordField — molécula que extiende Input con toggle de visibilidad.
 *
 * No es un átomo puro porque agrupa lógica de estado (mostrar/ocultar)
 * que solo aplica a passwords. Sigue el enfoque flexible.
 */
export default function PasswordField({
  label = "Secure Password",
  forgotLink,
  error,
  placeholder = "••••••••••••",
  className = "",
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <label
          className="font-label-md text-label-md text-on-surface-variant"
          htmlFor="password"
        >
          {label}
        </label>
        {forgotLink}
      </div>
      <div className="relative">
        <Input
          icon="lock"
          id="password"
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className={`pr-12 ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
          tabIndex={-1}
        >
          <span className="material-symbols-outlined text-[20px]!">
            {visible ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
      {error && (
        <p className="text-error font-body-md text-body-md flex items-center gap-2 mt-1">
          <span className="material-symbols-outlined text-[18px]!">error</span>
          {error}
        </p>
      )}
    </div>
  );
}
