"use client";

import { Input } from "@/components/ui/Input";
import type { MissionRewardFieldsProps } from "@/types/missions/MissionFieldTypes";
import { FieldGroup } from "./FieldGroup";

export function MissionRewardFields({ formik }: MissionRewardFieldsProps) {
  const { values: mission, setFieldValue, errors } = formik;

  const handleNumberChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(field, Number(e.target.value));
    };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/20">
      {/* Token reward */}
      <FieldGroup
        htmlFor="tokenReward"
        label="Fichas de recompensa"
        required
        error={errors.tokenReward as string}
      >
        <Input
          id="tokenReward"
          type="number"
          icon="token"
          placeholder="100"
          min={0}
          value={mission.tokenReward ?? ""}
          onChange={handleNumberChange("tokenReward")}
          wrapperClassName="w-full"
        />
      </FieldGroup>

      {/* Bonus percent */}
      <FieldGroup
        htmlFor="bonusPercent"
        label="Bono adicional (%)"
        error={errors.bonusPercent as string}
      >
        <Input
          id="bonusPercent"
          type="number"
          icon="percent"
          placeholder="0"
          min={0}
          max={100}
          value={mission.bonusPercent ?? ""}
          onChange={handleNumberChange("bonusPercent")}
          wrapperClassName="w-full"
        />
      </FieldGroup>

      {/* XP reward */}
      <FieldGroup
        htmlFor="xpReward"
        label="Puntos de experiencia (XP)"
        required
        error={errors.xpReward as string}
      >
        <Input
          id="xpReward"
          type="number"
          icon="stars"
          placeholder="50"
          min={0}
          value={mission.xpReward ?? ""}
          onChange={handleNumberChange("xpReward")}
          wrapperClassName="w-full"
        />
      </FieldGroup>
    </div>
  );
}

MissionRewardFields.displayName = "MissionRewardFields";
