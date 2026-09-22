"use client";

import Image from "next/image";
import { useRef } from "react";

import type { MissionCoverUploadProps } from "@/types/missions/MissionFieldTypes";

export function MissionCoverUpload({
  coverImage,
  onChange,
}: MissionCoverUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange("coverImage", URL.createObjectURL(file));
    onChange("image", file);
  };

  const handleRemove = () => {
    onChange("coverImage", undefined);
    onChange("image", undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-label-sm font-semibold text-on-surface-variant">
        Imagen de portada
      </span>

      {coverImage ? (
        <div className="relative rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-lowest max-h-56 flex items-center justify-center group">
          <Image
            width={500}
            height={280}
            src={coverImage}
            alt="Vista previa de portada"
            className="w-full h-auto object-cover max-h-56"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 p-2 bg-surface-container/90 backdrop-blur-md rounded-xl text-error hover:bg-error-container/80 transition-all shadow-md cursor-pointer"
            aria-label="Eliminar imagen"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 p-8 rounded-2xl border-2 border-dashed border-outline-variant/40 bg-surface-container-low/40 hover:bg-surface-container-low hover:border-primary/40 cursor-pointer transition-all">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">
              cloud_upload
            </span>
          </div>
          <span className="text-body-md font-medium text-on-surface">
            Haga clic o arrastre una imagen aquí
          </span>
          <span className="text-label-sm text-outline">
            Formatos soportados: PNG, JPG o WEBP (máx. 5MB)
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
  );
}

MissionCoverUpload.displayName = "MissionCoverUpload";
