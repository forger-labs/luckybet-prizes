"use client";

import Image from "next/image";
import { useRef } from "react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { MissionFieldsProps } from "@/types/missions/MissionFieldTypes";
import { FieldGroup } from "./FieldGroup";
import { ReadOnlyFieldRow } from "./ReadOnlyFieldRow";

const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: "daily", label: "Diaria" },
  { value: "weekly", label: "Semanal" },
  { value: "fixed", label: "Fija" },
  { value: "special_event", label: "Evento especial" },
];

const FIELD_LABELS: Record<string, string> = {
  title: "Título de la misión",
  description: "Descripción",
  tokenReward: "Recompensa en fichas",
  bonusPercent: "Porcentaje de bono",
  xpReward: "Experiencia",
  category: "Categoría",
};

/**
 * MissionFields — grupo de campos del formulario de misión.
 *
 * Recibe formik directamente y extrae values, setFieldValue y errors.
 * Soporta modo readOnly (etiquetas + badge "Bloqueado") para misiones activas.
 */
function MissionFields({ formik, readOnly = false }: MissionFieldsProps) {
  const { values: mission, setFieldValue: onChange, errors } = formik;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        e.target.type === "number" ? Number(e.target.value) : e.target.value;
      onChange(field, value);
    };

  const handleSelectChange = (field: string) => (value: string) => {
    onChange(field, value);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    // handle images upload as multiform-part data
    reader.onload = (_event) => {
      onChange("coverImage", "/placeholder.jpeg");
    };
    reader.readAsDataURL(file);
  };

  /* ── Read-only mode: fields as labels + "Bloqueado" badge ── */
  if (readOnly) {
    return (
      <div className="flex flex-col gap-4">
        {(
          [
            "title",
            "description",
            "tokenReward",
            "bonusPercent",
            "xpReward",
            "category",
          ] as const
        ).map((field) => {
          let displayValue: string | number | undefined = mission[field];

          // Translate category value to label
          if (field === "category" && typeof displayValue === "string") {
            displayValue = CATEGORY_OPTIONS.find(
              (o) => o.value === displayValue,
            )?.label;
          }

          // Format numbers
          if (typeof displayValue === "number") {
            displayValue =
              field === "tokenReward" || field === "xpReward"
                ? displayValue.toLocaleString()
                : `${displayValue}%`;
          }

          return (
            <ReadOnlyFieldRow
              key={field}
              label={FIELD_LABELS[field]}
              value={displayValue}
            />
          );
        })}
      </div>
    );
  }

  /* ── Editable mode ── */
  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <FieldGroup
        htmlFor="title"
        label={FIELD_LABELS.title}
        required
        error={errors.title}
      >
        <Input
          id="title"
          placeholder="Ej: Daily Login Streak"
          value={mission.title ?? ""}
          onChange={handleInputChange("title")}
          wrapperClassName="w-full"
        />
      </FieldGroup>

      {/* Description */}
      <FieldGroup
        htmlFor="description"
        label={FIELD_LABELS.description}
        required
        error={errors.description}
      >
        <Textarea
          id="description"
          placeholder="Descripción de la misión"
          value={mission.description ?? ""}
          onChange={handleInputChange("description")}
        />
      </FieldGroup>

      {/* Token reward */}
      <FieldGroup
        htmlFor="tokenReward"
        label={FIELD_LABELS.tokenReward}
        required
        error={errors.tokenReward}
      >
        <Input
          id="tokenReward"
          type="number"
          icon="payments"
          placeholder="0"
          min={0}
          value={mission.tokenReward ?? ""}
          onChange={handleInputChange("tokenReward")}
          wrapperClassName="w-full"
        />
      </FieldGroup>

      {/* Bonus percent */}
      <FieldGroup
        htmlFor="bonusPercent"
        label={FIELD_LABELS.bonusPercent}
        error={errors.bonusPercent}
      >
        <Input
          type="number"
          icon="percent"
          placeholder="0"
          min={0}
          max={100}
          id="bonusPercent"
          value={mission.bonusPercent ?? ""}
          onChange={handleInputChange("bonusPercent")}
          wrapperClassName="w-full"
        />
      </FieldGroup>

      {/* XP reward */}
      <FieldGroup
        htmlFor="xpReward"
        label={FIELD_LABELS.xpReward}
        required
        error={errors.xpReward}
      >
        <Input
          id="xpReward"
          type="number"
          icon="stars"
          placeholder="0"
          min={0}
          value={mission.xpReward ?? ""}
          onChange={handleInputChange("xpReward")}
          wrapperClassName="w-full"
        />
      </FieldGroup>

      {/* Category */}
      <FieldGroup
        htmlFor="category"
        label={FIELD_LABELS.category}
        required
        error={errors.category}
      >
        <Select
          options={CATEGORY_OPTIONS}
          placeholder="Seleccionar categoría"
          value={mission.category ?? ""}
          onChange={handleSelectChange("category")}
          className="w-full"
        />
      </FieldGroup>

      {/* Cover image */}
      <div>
        <span className="text-label-sm text-on-surface-variant mb-1 block">
          Imagen de portada
        </span>
        {mission.coverImage ? (
          <div className="relative rounded-lg overflow-hidden border border-outline-variant/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image
              width={100}
              height={100}
              src={mission.coverImage}
              alt="Cover preview"
              className="w-full h-auto"
            />
            <button
              type="button"
              onClick={() => {
                onChange("coverImage", undefined);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="absolute top-2 right-2 p-1.5 bg-surface-container/80 backdrop-blur-sm rounded-lg text-error hover:text-error/80 transition-colors"
              aria-label="Eliminar imagen"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 p-8 rounded-lg border-2 border-dashed border-outline-variant/40 cursor-pointer hover:border-primary/30 transition-colors">
            <span className="material-symbols-outlined text-3xl text-outline/60">
              cloud_upload
            </span>
            <span className="text-body-md text-outline">
              Hacé clic o arrastrá una imagen
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverUpload}
            />
          </label>
        )}
      </div>
    </div>
  );
}

MissionFields.displayName = "MissionFields";

export { MissionFields };
