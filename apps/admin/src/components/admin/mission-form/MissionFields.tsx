"use client";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { MissionFieldsProps } from "@/types/missions/MissionFieldTypes";
import { FieldGroup } from "./FieldGroup";
import { MissionCoverUpload } from "./MissionCoverUpload";
import { MissionRewardFields } from "./MissionRewardFields";
import { ReadOnlyFieldRow } from "./ReadOnlyFieldRow";

const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: "daily", label: "Misión diaria" },
  { value: "weekly", label: "Misión semanal" },
  { value: "fixed", label: "Misión fija" },
  { value: "special_event", label: "Evento especial" },
];

const FIELD_LABELS: Record<string, string> = {
  title: "Título de la misión",
  description: "Descripción detallada",
  tokenReward: "Recompensa en fichas",
  bonusPercent: "Porcentaje de bono",
  xpReward: "Experiencia XP",
  category: "Categoría",
};

export function MissionFields({
  formik,
  readOnly = false,
}: MissionFieldsProps) {
  const { values: mission, setFieldValue, errors } = formik;

  const handleInputChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFieldValue(field, e.target.value);
    };

  /* ── Read-only mode ── */
  if (readOnly) {
    return (
      <div className="flex flex-col gap-3 p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/20">
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

          if (field === "category" && typeof displayValue === "string") {
            displayValue = CATEGORY_OPTIONS.find(
              (o) => o.value === displayValue,
            )?.label;
          }

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
    <div className="flex flex-col gap-5">
      {/* Title */}
      <FieldGroup
        htmlFor="mission-title"
        label={FIELD_LABELS.title}
        required
        error={errors.title as string}
      >
        <Input
          id="mission-title"
          placeholder="Ej: Racha de inicio de sesión diario"
          value={mission.title ?? ""}
          onChange={handleInputChange("title")}
          wrapperClassName="w-full"
        />
      </FieldGroup>

      {/* Description */}
      <FieldGroup
        htmlFor="mission-description"
        label={FIELD_LABELS.description}
        required
        error={errors.description as string}
      >
        <Textarea
          id="mission-description"
          placeholder="Describa el objetivo y las instrucciones para los jugadores..."
          value={mission.description ?? ""}
          onChange={handleInputChange("description")}
        />
      </FieldGroup>

      {/* Category */}
      <FieldGroup
        htmlFor="mission-category"
        label={FIELD_LABELS.category}
        required
        error={errors.category as string}
      >
        <Select
          id="mission-category"
          options={CATEGORY_OPTIONS}
          value={mission.category ?? "daily"}
          onChange={(val) => setFieldValue("category", val)}
          className="w-full"
        />
      </FieldGroup>

      {/* Rewards Grid */}
      <MissionRewardFields formik={formik} />

      {/* Cover Image Upload */}
      <MissionCoverUpload
        coverImage={mission.coverImage}
        onChange={setFieldValue}
      />
    </div>
  );
}

MissionFields.displayName = "MissionFields";
