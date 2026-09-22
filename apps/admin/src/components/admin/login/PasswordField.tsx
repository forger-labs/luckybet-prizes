"use client";

import { useState } from "react";

import { Input } from "@/components/ui/Input";
import type { PasswordFieldProps } from "@/types/login";

export default function PasswordField({
  label = "Contraseña",
  forgotLink,
  error,
  placeholder = "••••••••••••",
  className = "",
  id = "password",
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <label
          className="font-label-md text-sm text-on-surface-variant font-medium cursor-pointer"
          htmlFor={id}
        >
          {label}
        </label>
        {forgotLink}
      </div>

      <div className="relative group">
        <Input
          icon="lock"
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className={`pr-12 transition-all ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary active:scale-95 transition-all cursor-pointer p-1"
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          tabIndex={-1}
        >
          <span className="material-symbols-outlined text-xl">
            {visible ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>

      {error && (
        <p className="text-error font-body-md text-xs flex items-center gap-1.5 mt-1 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-base">error</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
