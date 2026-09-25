"use client";

import { Field } from "formik";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { RoomBonus, RoomFormFieldsProps } from "@/types/adminRooms";

const BONUS_OPTIONS: { value: RoomBonus; label: string }[] = [
  { value: "0", label: "0% — Sin bono adicional" },
  { value: "30", label: "+30% — Bono estándar" },
  { value: "40", label: "+40% — Bono intermedio" },
  { value: "50", label: "+50% — Bono preferencial" },
  { value: "100", label: "+100% — Bono doble" },
  { value: "150", label: "+150% — Bono super" },
  { value: "200", label: "+200% — Bono máximo" },
];

export function RoomFormFields({ formik }: RoomFormFieldsProps) {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } =
    formik;

  return (
    <div className="flex flex-col gap-5 pt-2">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="room-name"
          className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
        >
          Nombre de la Sala / Senior LuckyBet
        </label>
        <Input
          id="room-name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="ej: SeniorSuperPromocional"
          icon="meeting_room"
          wrapperClassName="w-full"
        />
        {touched.name && errors.name && (
          <p className="text-label-sm text-error mt-0.5">{errors.name}</p>
        )}
      </div>

      {/* Bonus */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="room-bonus"
          className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
        >
          Porcentaje de Bono Asignado
        </label>
        <Select
          id="room-bonus"
          name="bonus"
          icon="percent"
          options={BONUS_OPTIONS}
          value={values.bonus}
          onChange={(v) => setFieldValue("bonus", v)}
          error={
            touched.bonus && errors.bonus ? (errors.bonus as string) : undefined
          }
        />
      </div>

      {/* Active Status */}
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
        <Field
          id="room-isActive"
          name="isActive"
          type="checkbox"
          className="w-5 h-5 rounded-md border-outline-variant/30 bg-surface-container-lowest checked:bg-primary checked:border-primary transition-all cursor-pointer accent-primary"
        />
        <label
          htmlFor="room-isActive"
          className="text-body-md text-on-surface font-medium cursor-pointer select-none"
        >
          Sala activa y disponible para promociones y transferencias
        </label>
      </div>
    </div>
  );
}

RoomFormFields.displayName = "RoomFormFields";
