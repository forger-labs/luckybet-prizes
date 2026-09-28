"use client";

import { useMemo } from "react";

import { Input } from "@/components/ui/Input";
import {
  type LocalOption,
  LocalSearchSelect,
} from "@/components/ui/LocalSearchSelect";
import type { MissionRewardFieldsProps } from "@/types/missions/MissionFieldTypes";
import { FieldGroup } from "./FieldGroup";

export function MissionRewardFields({
  formik,
  rooms = [],
}: MissionRewardFieldsProps) {
  const { values: mission, setFieldValue, errors } = formik;

  const handleNumberChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(field, Number(e.target.value));
    };

  const roomOptions: LocalOption[] = useMemo(() => {
    return rooms.map((room) => {
      const bonusLabel = room.bonus === "0" ? "Sin bono" : `${room.bonus}%`;
      return {
        value: room.id.toString(),
        label: `${room.name} - ${bonusLabel}`,
      };
    });
  }, [rooms]);

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

      {/* Sala Promocional Asociada */}
      <FieldGroup
        htmlFor="mission-roomId"
        label="Sala Promocional (opcional)"
        error={errors.roomId as string}
      >
        <LocalSearchSelect
          id="mission-roomId"
          name="roomId"
          icon="meeting_room"
          placeholder="Sin sala promocional"
          searchPlaceholder="Buscar sala..."
          options={roomOptions}
          value={mission.roomId ? String(mission.roomId) : ""}
          onChange={(val) => setFieldValue("roomId", val ? Number(val) : null)}
        />
      </FieldGroup>
    </div>
  );
}

MissionRewardFields.displayName = "MissionRewardFields";
