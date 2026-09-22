"use client";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { LevelFormFieldsProps } from "@/types/adminLevels";
import type { SelectOption } from "@/types/Select";
import { LevelImageUpload } from "./LevelImageUpload";

const BONUS_OPTIONS: SelectOption[] = [
  { value: "", label: "Sin bonus adicional" },
  { value: "0", label: "0%" },
  { value: "30", label: "30%" },
  { value: "40", label: "40%" },
  { value: "50", label: "50%" },
  { value: "100", label: "100%" },
  { value: "150", label: "150%" },
  { value: "200", label: "200%" },
];

export function LevelFormFields({
  formik,
  isCreate: _isCreate,
  currentImageUrl,
}: LevelFormFieldsProps) {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } =
    formik;

  return (
    <div className="flex flex-col gap-4 pt-1">
      {/* Medal / Image Upload */}
      <LevelImageUpload
        imageFile={values.image}
        currentImageUrl={currentImageUrl}
        onChange={(file) => setFieldValue("image", file)}
        error={
          touched.image && errors.image ? (errors.image as string) : undefined
        }
      />

      {/* Level Name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="level-name"
          className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
        >
          Nombre del nivel
        </label>
        <Input
          id="level-name"
          name="name"
          icon="military_tech"
          placeholder="ej: Nivel 1 - Novato, Oro I, etc."
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          wrapperClassName="w-full"
        />
        {touched.name && errors.name && (
          <p className="text-label-sm text-error mt-0.5">{errors.name}</p>
        )}
      </div>

      {/* Experience and Coins row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Min Experience */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="level-minExperience"
            className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
          >
            Experiencia mínima (XP)
          </label>
          <Input
            id="level-minExperience"
            name="minExperience"
            type="number"
            icon="speed"
            placeholder="ej: 1000"
            value={
              values.minExperience === "" ? "" : String(values.minExperience)
            }
            onChange={handleChange}
            onBlur={handleBlur}
            wrapperClassName="w-full"
          />
          {touched.minExperience && errors.minExperience && (
            <p className="text-label-sm text-error mt-0.5">
              {errors.minExperience}
            </p>
          )}
        </div>

        {/* Coins Reward */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="level-coins"
            className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
          >
            Monedas de recompensa
          </label>
          <Input
            id="level-coins"
            name="coins"
            type="number"
            icon="toll"
            placeholder="ej: 50"
            value={values.coins === "" ? "" : String(values.coins)}
            onChange={handleChange}
            onBlur={handleBlur}
            wrapperClassName="w-full"
          />
          {touched.coins && errors.coins && (
            <p className="text-label-sm text-error mt-0.5">{errors.coins}</p>
          )}
        </div>
      </div>

      {/* Bonus Select */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="level-bonus"
          className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
        >
          Bonus adicional de recompensa
        </label>
        <Select
          id="level-bonus"
          name="bonus"
          icon="percent"
          options={BONUS_OPTIONS}
          value={values.bonus}
          onChange={(val) => setFieldValue("bonus", val)}
          placeholder="Seleccionar porcentaje de bonus..."
          error={
            touched.bonus && errors.bonus ? (errors.bonus as string) : undefined
          }
        />
      </div>
    </div>
  );
}

LevelFormFields.displayName = "LevelFormFields";
