"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";

interface ImageExpandOverlayProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

/**
 * ImageExpandOverlay — full-screen image viewer.
 *
 * Renders a fixed overlay with a dark backdrop and the image centered
 * both vertically and horizontally. Disables background scroll while open.
 * Closes on backdrop click, Escape, or the close button.
 */
function ImageExpandOverlay({
  src,
  alt,
  open,
  onClose,
}: ImageExpandOverlayProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, handleEscape]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Imagen ampliada"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/80 cursor-default"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-2xl">close</span>
      </button>

      {/* Image */}
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={1200}
          className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-lg"
          priority
        />
      </div>
    </div>
  );
}

export { ImageExpandOverlay };
