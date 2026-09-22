"use client";

import type { FieldGroupProps } from "@/types/missions/MissionFieldTypes";

export function FieldGroup({
  label,
  required = false,
  error,
  htmlFor,
  children,
}: FieldGroupProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-label-sm font-semibold text-on-surface-variant cursor-pointer select-none"
      >
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-label-sm text-error mt-0.5 animate-in fade-in duration-200">
          {error}
        </p>
      )}
    </div>
  );
}

FieldGroup.displayName = "FieldGroup";
