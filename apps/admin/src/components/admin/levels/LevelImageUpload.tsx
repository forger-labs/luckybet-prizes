"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import type { LevelImageUploadProps } from "@/types/adminLevels";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function LevelImageUpload({
  imageFile,
  currentImageUrl,
  onChange,
  error,
}: LevelImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreviewUrl(currentImageUrl || null);
  }, [imageFile, currentImageUrl]);

  const validateAndSelectFile = useCallback(
    (file: File) => {
      if (
        !["image/png", "image/jpeg", "image/webp"].includes(
          file.type.toLowerCase(),
        )
      ) {
        casinoToast.error({
          title: "Formato no válido",
          description: "Solo se permiten imágenes en formato PNG, JPEG o WEBP.",
        });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        casinoToast.error({
          title: "Archivo muy pesado",
          description: "La imagen de la medalla no debe superar los 5MB.",
        });
        return;
      }
      onChange(file);
    },
    [onChange],
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSelectFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSelectFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-label-sm font-semibold text-on-surface-variant">
        Medalla / Símbolo del Nivel
      </span>

      {previewUrl ? (
        <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/80 ">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-primary/40 bg-surface-container-high/50 p-2 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <Image
              src={previewUrl}
              alt="Vista previa de medalla"
              width={96}
              height={96}
              unoptimized
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-label-sm text-on-surface-variant mt-2 font-medium">
            {imageFile ? imageFile.name : "Medalla actual"}
          </p>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 p-2 rounded-xl bg-surface-container/90 border border-outline-variant/30 text-error hover:bg-error-container/40 hover:text-error transition-all shadow-md cursor-pointer"
            aria-label="Eliminar medalla"
            title="Eliminar medalla"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      ) : (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
            isDragging
              ? "border-primary bg-primary/10 scale-[1.01]"
              : "border-outline-variant/40 bg-surface-container-lowest/50 hover:bg-surface-container-lowest hover:border-primary/40"
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <span className="material-symbols-outlined text-2xl">
              military_tech
            </span>
          </div>
          <span className="text-body-md font-medium text-on-surface text-center">
            Haga clic o arrastre una medalla aquí
          </span>
          <span className="text-label-sm text-outline text-center">
            PNG, JPEG o WEBP (máximo 5MB)
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </label>
      )}

      {error && <p className="text-label-sm text-error mt-0.5">{error}</p>}
    </div>
  );
}

LevelImageUpload.displayName = "LevelImageUpload";
