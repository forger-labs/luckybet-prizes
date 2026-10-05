"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";

import { Input } from "@/components/ui/Input";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type {
  ChestFormFieldsProps,
  ChestPeriodType,
} from "@/types/adminChests";
import type { SearchSelectOption } from "@/types/SearchSelect";

const PERIOD_OPTIONS: { value: ChestPeriodType; label: string }[] = [
  { value: "WEEKLY", label: "Semanal (WEEKLY)" },
  { value: "MONTHLY", label: "Mensual (MONTHLY)" },
];

export function ChestFormFields({
  formik,
  rooms = [],
  currentImageUrl,
}: ChestFormFieldsProps) {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } =
    formik;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const roomOptions: SearchSelectOption[] = useMemo(() => {
    return rooms.map((r) => ({
      value: r.id.toString(),
      label: `${r.name} - ${r.bonus === "0" ? "Sin bono" : `+${r.bonus}%`}`,
    }));
  }, [rooms]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFieldValue("image", file);
  };

  const previewSrc = values.image
    ? URL.createObjectURL(values.image)
    : currentImageUrl;

  return (
    <div className="flex flex-col gap-4 pt-1">
      {/* 16:9 Image Upload */}
      <div className="flex flex-col gap-1.5">
        <span className="text-label-sm font-semibold text-on-surface-variant">
          Portada del Cofre (Relación 16:9)
        </span>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative w-full aspect-video rounded-2xl bg-surface-container border-2 border-dashed border-outline-variant/30 hover:border-primary/50 overflow-hidden flex flex-col items-center justify-center gap-2 cursor-pointer transition-all group"
        >
          {previewSrc ? (
            <>
              <Image
                src={previewSrc}
                alt="Vista previa del cofre"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                <span className="material-symbols-outlined text-lg">edit</span>
                <span>Cambiar imagen (16:9)</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-3xl">
                add_photo_alternate
              </span>
              <span className="text-xs font-semibold text-on-surface">
                Subir imagen en formato 16:9
              </span>
              <span className="text-[10px] text-outline">
                PNG, JPEG o WebP (Máx. 5MB)
              </span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleImageChange}
          />
        </button>
        {touched.image && errors.image && (
          <p className="text-label-sm text-error mt-0.5">{errors.image}</p>
        )}
      </div>

      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="chest-title"
          className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
        >
          Título del cofre
        </label>
        <Input
          id="chest-title"
          name="title"
          placeholder="ej: Cofre Semanal de Bronce"
          icon="inventory_2"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          wrapperClassName="w-full"
        />
        {touched.title && errors.title && (
          <p className="text-label-sm text-error mt-0.5">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="chest-description"
          className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
        >
          Descripción del cofre
        </label>
        <Textarea
          id="chest-description"
          name="description"
          placeholder="Instrucciones y detalles de recompensas..."
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {/* Period & Required Missions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="chest-periodType"
            className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
          >
            Tipo de Periodo
          </label>
          <Select
            id="chest-periodType"
            options={PERIOD_OPTIONS}
            value={values.periodType}
            onChange={(val) => setFieldValue("periodType", val)}
            className="relative"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="chest-requiredMissions"
            className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
          >
            Misiones requeridas
          </label>
          <Input
            id="chest-requiredMissions"
            name="requiredMissions"
            type="number"
            min={1}
            icon="checklist"
            placeholder="5"
            value={
              values.requiredMissions === ""
                ? ""
                : String(values.requiredMissions)
            }
            onChange={handleChange}
            onBlur={handleBlur}
            wrapperClassName="w-full"
          />
        </div>
      </div>

      {/* Rewards Row (Coins & XP) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="chest-coinsAmount"
            className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
          >
            Fichas otorgadas
          </label>
          <Input
            id="chest-coinsAmount"
            name="coinsAmount"
            type="number"
            min={0}
            icon="token"
            placeholder="500"
            value={values.coinsAmount === "" ? "" : String(values.coinsAmount)}
            onChange={handleChange}
            onBlur={handleBlur}
            wrapperClassName="w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="chest-experiencePoints"
            className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
          >
            Puntos de XP
          </label>
          <Input
            id="chest-experiencePoints"
            name="experiencePoints"
            type="number"
            min={0}
            icon="stars"
            placeholder="100"
            value={
              values.experiencePoints === ""
                ? ""
                : String(values.experiencePoints)
            }
            onChange={handleChange}
            onBlur={handleBlur}
            wrapperClassName="w-full"
          />
        </div>
      </div>

      {/* Sala Promocional Asociada (Memoria Local) */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="chest-roomId"
          className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
        >
          Sala Promocional (opcional)
        </label>
        <SearchSelect
          id="chest-roomId"
          name="roomId"
          icon="meeting_room"
          placeholder="Sin sala promocional"
          searchPlaceholder="Buscar sala..."
          options={roomOptions}
          value={values.roomId}
          onChange={(val) => setFieldValue("roomId", val)}
          // className="relative"
        />
      </div>
    </div>
  );
}

ChestFormFields.displayName = "ChestFormFields";
