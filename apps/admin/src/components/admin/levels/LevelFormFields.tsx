"use client";

import { useCallback } from "react";

import { Input } from "@/components/ui/Input";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type { LevelFormFieldsProps } from "@/types/adminLevels";
import type { SearchSelectOption } from "@/types/SearchSelect";
import { LevelImageUpload } from "./LevelImageUpload";

export function LevelFormFields({
  formik,
  currentImageUrl,
}: LevelFormFieldsProps) {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } =
    formik;

  const searchRooms = useCallback(
    async (query: string): Promise<SearchSelectOption[]> => {
      const res = await apiAdminGanaya.getRooms({
        name: query || undefined,
        take: 7,
      });

      if (res.status && res.data) {
        return res.data.map((room) => {
          const bonusLabel =
            room.bonus === "0" ? "Sin bono" : `+${room.bonus}%`;
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

      {/* Sala Promocional Asociada (SearchSelect) */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="level-roomId"
          className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
        >
          Sala Promocional Asignada (opcional)
        </label>
        <SearchSelect
          id="level-roomId"
          name="roomId"
          icon="meeting_room"
          placeholder="Sin sala promocional (conserva sala base)"
          searchPlaceholder="Buscar sala por nombre..."
          value={values.roomId}
          onChange={(val) => setFieldValue("roomId", val)}
          onSearch={searchRooms}
        />
        <p className="text-[11px] text-outline mt-0.5">
          Al ascender a este nivel, los premios se transferirán temporalmente a
          esta sala en LuckyBet.
        </p>
      </div>
    </div>
  );
}

LevelFormFields.displayName = "LevelFormFields";
