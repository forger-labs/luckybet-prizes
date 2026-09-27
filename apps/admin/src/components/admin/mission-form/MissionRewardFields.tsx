"use client";

import { useCallback } from "react";

import { Input } from "@/components/ui/Input";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type { MissionRewardFieldsProps } from "@/types/missions/MissionFieldTypes";
import type { SearchSelectOption } from "@/types/SearchSelect";
import { FieldGroup } from "./FieldGroup";

export function MissionRewardFields({
  formik,
  readOnly = false,
}: MissionRewardFieldsProps) {
  const { values: mission, setFieldValue, errors } = formik;

  const handleNumberChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(field, Number(e.target.value));
    };

  const searchRooms = useCallback(
    async (query: string): Promise<SearchSelectOption[]> => {
      const res = await apiAdminGanaya.getRooms({
        name: query || undefined,
        take: 7,
      });

      if (res.status && res.data) {
        return res.data.map((room) => {
          const bonusLabel =
            room.bonus === "0" ? "Sin bono" : `${room.bonus}%`;
          return {
            value: room.id.toString(),
            label: `${room.name} - ${bonusLabel}`,
          };
        });
      }
      return [];
    },
    [],
  );

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
          disabled={readOnly}
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
          disabled={readOnly}
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
        <SearchSelect
          id="mission-roomId"
          name="roomId"
          icon="meeting_room"
          placeholder="Sin sala promocional"
          searchPlaceholder="Buscar sala..."
          disabled={readOnly}
          value={mission.roomId ? String(mission.roomId) : ""}
          onChange={(val) => setFieldValue("roomId", val ? Number(val) : null)}
          onSearch={searchRooms}
        />
      </FieldGroup>
    </div>
  );
}

MissionRewardFields.displayName = "MissionRewardFields";
