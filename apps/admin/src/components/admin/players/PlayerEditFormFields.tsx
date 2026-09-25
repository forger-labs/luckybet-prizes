"use client";

import { Field } from "formik";

import { Input } from "@/components/ui/Input";
import type { PlayerEditFormFieldsProps } from "@/types/adminPlayers";

export function PlayerEditFormFields({ formik }: PlayerEditFormFieldsProps) {
  const { values, handleChange, handleBlur, errors, touched } = formik;

  return (
    <div className="flex flex-col gap-5 pt-2">
      {/* Username (Read-only) */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="player-edit-username"
          className="text-label-sm font-semibold text-on-surface-variant"
        >
          Nombre de Usuario (LuckyBet)
        </label>
        <Input
          id="player-edit-username"
          name="username"
          value={values.username}
          disabled
          icon="account_circle"
          className="opacity-70 cursor-not-allowed bg-surface-container-high/40 border-outline-variant/20"
          wrapperClassName="w-full"
        />
        <p className="text-[11px] text-outline mt-0.5">
          El nombre de usuario es un identificador inmutable asignado por
          LuckyBet.
        </p>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="player-edit-phone"
          className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
        >
          Número de Teléfono / WhatsApp
        </label>
        <Input
          id="player-edit-phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="ej: +584121234567"
          icon="call"
          wrapperClassName="w-full"
        />
        {touched.phone && errors.phone && (
          <p className="text-label-sm text-error mt-0.5">{errors.phone}</p>
        )}
      </div>

      {/* Active Status */}
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
        <Field
          id="player-edit-isActive"
          name="isActive"
          type="checkbox"
          className="w-5 h-5 rounded-md border-outline-variant/30 bg-surface-container-lowest checked:bg-primary checked:border-primary transition-all cursor-pointer accent-primary"
        />
        <label
          htmlFor="player-edit-isActive"
          className="text-body-md text-on-surface font-medium cursor-pointer select-none"
        >
          Cuenta activa con acceso a misiones y recompensas
        </label>
      </div>
    </div>
  );
}

PlayerEditFormFields.displayName = "PlayerEditFormFields";
