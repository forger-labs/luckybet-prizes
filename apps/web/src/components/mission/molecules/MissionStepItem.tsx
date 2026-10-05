"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { CheckCircleIcon } from "@/icons";
import type { ClientMissionStep } from "@/types/missions";

interface Props {
  step: ClientMissionStep;
  stepIndex: number;
  isMissionJoined: boolean;
  onVerifyGamePlay: (stepId: number) => Promise<void>;
  onSubmitStep: (
    stepId: number,
    data: { text?: string; file?: File },
  ) => Promise<void>;
}

export function MissionStepItem({
  step,
  stepIndex,
  isMissionJoined,
  onVerifyGamePlay,
  onSubmitStep,
}: Props) {
  const [textValue, setTextValue] = useState(
    step.submission?.submissionText || "",
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const status = step.submissionStatus || "NOT_STARTED";
  const isApproved = status === "APPROVED";
  const isPending = status === "PENDING";
  const isRejected = status === "REJECTED";

  const isGamePlay = step.type === "GAME_PLAY";
  const isImage = step.type === "IMAGE";
  const isText = step.type === "TEXT";

  const cfg = step.targetConfig;
  const isSpecificGame = Boolean(cfg?.gameId);
  const isProviderFlow = Boolean(cfg?.provider && !cfg?.gameId);

  useEffect(() => {
    if (!isRejected && step.submission?.submissionImageUrl) {
      setPreviewUrl(step.submission.submissionImageUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [step.submission?.submissionImageUrl, isRejected]);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isApproved && !isPending && isMissionJoined) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (
      !isApproved &&
      !isPending &&
      isMissionJoined &&
      e.dataTransfer.files?.[0]
    ) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMissionJoined || isApproved || isPending) return;
    setLoading(true);
    try {
      if (isGamePlay) {
        await onVerifyGamePlay(step.id);
      } else {
        await onSubmitStep(step.id, {
          text: isText ? textValue : undefined,
          file: isImage ? selectedFile || undefined : undefined,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 ${
        isApproved
          ? "bg-[#131b2e] border-[#10b981]/50 shadow-sm"
          : isRejected
            ? "bg-[#171f33] border-[#ffb4ab] shadow-[0_0_20px_rgba(255,180,171,0.15)]"
            : isPending
              ? "bg-[#171f33] border-[#ffc640]/60 shadow-[0_0_15px_rgba(255,198,64,0.15)]"
              : "bg-[#171f33] border-[#2d3449] hover:border-[#8ed5ff]/60"
      }`}
    >
      {/* Step Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3.5">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-(--font-plus-jakarta-sans) font-black text-xs shrink-0 shadow-md ${
              isApproved
                ? "bg-[#10b981] text-[#064e3b]"
                : isRejected
                  ? "bg-[#ffb4ab]/25 text-[#ffb4ab] border-2 border-[#ffb4ab]"
                  : isPending
                    ? "bg-[#ffc640]/25 text-[#ffc640] border-2 border-[#ffc640]"
                    : "bg-[#00354a] text-[#8ed5ff] border-2 border-[#38bdf8]"
            }`}
          >
            {isApproved ? (
              <CheckCircleIcon className="w-5 h-5 text-[#064e3b]" />
            ) : (
              String(step.stepOrder || stepIndex + 1).padStart(2, "0")
            )}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-(--font-plus-jakarta-sans) text-xs font-black uppercase tracking-wider text-[#94a3b8]">
                Paso {step.stepOrder || stepIndex + 1}
              </span>
              <span className="text-[#3e484f]">•</span>
              <span className="text-xs font-bold text-[#8ed5ff]">
                {isGamePlay
                  ? "Juego LuckyBet"
                  : isImage
                    ? "Captura de Pantalla"
                    : "Respuesta de Texto"}
              </span>
            </div>

            <h4
              className={`font-(--font-plus-jakarta-sans) text-base sm:text-lg font-bold leading-snug ${
                isApproved ? "text-[#34d399] line-through" : "text-[#f8fafc]"
              }`}
            >
              {step.content || `Objetivo #${stepIndex + 1}`}
            </h4>
          </div>
        </div>

        {/* Status Badge */}
        <div className="shrink-0">
          {isApproved && (
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#34d399] bg-[#064e3b] px-3 py-1 rounded-xl border border-[#059669] shadow-sm">
              <span className="material-symbols-outlined text-sm">check</span>{" "}
              Aprobado
            </span>
          )}
          {isPending && (
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#ffc640] bg-[#402d00] px-3 py-1 rounded-xl border border-[#e3aa00] shadow-sm">
              <span className="material-symbols-outlined text-sm animate-spin">
                sync
              </span>{" "}
              En Revisión
            </span>
          )}
          {isRejected && (
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#ffb4ab] bg-[#690005] px-3 py-1 rounded-xl border border-[#ffb4ab] shadow-sm">
              <span className="material-symbols-outlined text-sm">error</span>{" "}
              Rechazado
            </span>
          )}
          {status === "NOT_STARTED" && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#94a3b8] bg-[#222a3d] px-3 py-1 rounded-xl border border-[#3e484f]">
              Pendiente
            </span>
          )}
        </div>
      </div>

      {/* GAME_PLAY Detailed Rules Breakdown */}
      {isGamePlay && cfg && (
        <div className="my-3.5 p-3.5 sm:p-4 rounded-xl bg-[#0b1326] border border-[#38bdf8]/30 space-y-2">
          <div className="flex items-center gap-1.5 text-[#38bdf8] text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>Condiciones Requeridas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {/* Specific Game Mode */}
            {isSpecificGame && (
              <div className="p-2.5 rounded-lg bg-[#171f33] border border-[#2d3449] space-y-0.5">
                <span className="text-[11px] text-[#94a3b8] font-medium block">
                  Juego Asignado
                </span>
                <span className="text-xs font-mono font-bold text-[#f8fafc] truncate block">
                  {cfg.gameId}
                </span>
              </div>
            )}

            {/* Provider Flow: Provider Name */}
            {isProviderFlow && (
              <div className="p-2.5 rounded-lg bg-[#171f33] border border-[#2d3449] space-y-0.5">
                <span className="text-[11px] text-[#94a3b8] font-medium block">
                  Proveedor
                </span>
                <span className="text-xs font-bold text-[#8ed5ff] truncate block">
                  {cfg.provider}
                </span>
              </div>
            )}

            {/* Provider Flow: Min Unique Games */}
            {isProviderFlow && (
              <div className="p-2.5 rounded-lg bg-[#171f33] border border-[#2d3449] space-y-0.5">
                <span className="text-[11px] text-[#94a3b8] font-medium block">
                  Juegos Distintos
                </span>
                <span className="text-xs font-bold text-[#ffc640] block">
                  Mínimo {cfg.minUniqueGames ?? 1} juego(s)
                </span>
              </div>
            )}

            {/* Min Bet Amount (Shown for both) */}
            <div className="p-2.5 rounded-lg bg-[#171f33] border border-[#2d3449] space-y-0.5">
              <span className="text-[11px] text-[#94a3b8] font-medium block">
                Apuesta Mínima
              </span>
              <span className="text-xs font-bold text-[#4ade80] block">
                {cfg.minBet > 0
                  ? `$${cfg.minBet.toLocaleString()} fichas / jugada`
                  : "Sin mínimo de apuesta"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Reviewer Rejection Feedback */}
      {isRejected && step.submission?.reviewerNotes && (
        <div className="my-3.5 p-4 rounded-xl bg-[#690005]/30 border-2 border-[#ffb4ab] flex items-start gap-3 text-xs text-[#ffdad6]">
          <span className="material-symbols-outlined text-[#ffb4ab] text-lg shrink-0 mt-0.5">
            chat_error
          </span>
          <div className="space-y-1">
            <p className="font-bold text-[#ffb4ab] text-sm">
              Motivo del rechazo del revisor:
            </p>
            <p className="leading-relaxed text-[#f8fafc]">
              {step.submission.reviewerNotes}
            </p>
            <p className="text-[11px] text-[#ffdad6]/80 font-medium">
              Por favor corrige tu comprobante y reenvíalo a continuación.
            </p>
          </div>
        </div>
      )}

      {/* Interactive Form Section */}
      {isMissionJoined && !isApproved && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 pt-3.5 border-t border-[#2d3449] space-y-3"
        >
          {/* GAME_PLAY Verification */}
          {isGamePlay && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-xs text-[#dae2fd]">
                {isSpecificGame
                  ? `Juega en "${cfg?.gameId}" para verificar automáticamente este paso.`
                  : cfg?.provider
                    ? `Juega en títulos de ${cfg.provider} cumpliendo las condiciones de arriba.`
                    : "Juega en el casino para validar este paso automáticamente."}
              </p>
              <button
                type="submit"
                disabled={loading || isPending}
                className="px-5 py-2.5 rounded-xl bg-[#38bdf8] hover:bg-[#7bd0ff] disabled:opacity-40 text-[#00354a] font-black text-xs sm:text-sm transition-all border border-[#8ed5ff] cursor-pointer inline-flex items-center gap-2 shrink-0 shadow-md"
              >
                <span className="material-symbols-outlined text-sm">
                  {loading ? "sync" : "sports_esports"}
                </span>
                <span>{loading ? "Verificando..." : "Verificar Jugada"}</span>
              </button>
            </div>
          )}

          {/* TEXT Submission */}
          {isText && (
            <div className="space-y-2">
              <label
                htmlFor={`step-text-${step.id}`}
                className="text-xs text-[#dae2fd] font-bold block"
              >
                Ingresa la información solicitada:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id={`step-text-${step.id}`}
                  type="text"
                  disabled={loading || isPending}
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0b1326] border border-[#3e484f] text-sm text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none disabled:opacity-40"
                />
                <button
                  type="submit"
                  disabled={loading || isPending || !textValue.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#38bdf8] hover:bg-[#7bd0ff] disabled:opacity-40 text-[#00354a] font-black text-xs sm:text-sm transition-all border border-[#8ed5ff] cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0 shadow-md"
                >
                  <span className="material-symbols-outlined text-sm">
                    send
                  </span>
                  <span>
                    {loading
                      ? "Enviando..."
                      : isRejected
                        ? "Reenviar"
                        : "Enviar"}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* IMAGE Submission: Drag & Drop Dropzone */}
          {isImage && (
            <div className="space-y-3">
              <span className="text-xs text-[#dae2fd] font-bold block">
                Comprobante de captura de pantalla (máx. 5MB):
              </span>

              <input
                ref={fileInputRef}
                id={`step-file-${step.id}`}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                disabled={loading || isPending}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* In rejected state, old preview is suppressed */}
              {!isRejected && previewUrl && !selectedFile ? (
                <div className="relative w-full max-w-sm h-40 rounded-2xl overflow-hidden border-2 border-[#3e484f] bg-[#0b1326] group">
                  <Image
                    src={previewUrl}
                    alt="Comprobante en revisión"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-white bg-[#171f33]/90 px-3 py-1.5 rounded-xl border border-white/20">
                      Captura actual en revisión
                    </span>
                  </div>
                </div>
              ) : selectedFile && previewUrl ? (
                <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-2xl bg-[#0b1326] border-2 border-[#38bdf8]">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <Image
                      src={previewUrl}
                      alt="Nueva captura seleccionada"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-xs font-bold text-[#f8fafc] truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-[11px] text-[#94a3b8]">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <button
                      type="button"
                      disabled={loading || isPending}
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-[#38bdf8] hover:underline font-bold cursor-pointer block"
                    >
                      Cambiar imagen
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || isPending}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#38bdf8] hover:bg-[#7bd0ff] disabled:opacity-40 text-[#00354a] font-black text-xs sm:text-sm transition-all border border-[#8ed5ff] cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0 shadow-md"
                  >
                    <span className="material-symbols-outlined text-sm">
                      upload
                    </span>
                    <span>
                      {loading
                        ? "Subiendo..."
                        : isRejected
                          ? "Reenviar Comprobante"
                          : "Subir Comprobante"}
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={loading || isPending}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full p-6 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2.5 cursor-pointer text-center select-none ${
                    isDragging
                      ? "bg-[#00354a]/40 border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.25)]"
                      : "bg-[#0b1326] border-[#3e484f] hover:border-[#38bdf8] hover:bg-[#060e20]"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#171f33] border border-[#3e484f] flex items-center justify-center text-[#38bdf8] shadow-sm">
                    <span className="material-symbols-outlined text-2xl">
                      add_photo_alternate
                    </span>
                  </div>
                  <div>
                    <p className="font-(--font-plus-jakarta-sans) text-xs sm:text-sm font-bold text-[#f8fafc]">
                      Arrastra tu imagen aquí o{" "}
                      <span className="text-[#38bdf8] underline font-bold">
                        selecciona un archivo
                      </span>
                    </p>
                    <p className="text-[11px] text-[#94a3b8] mt-0.5">
                      PNG, JPG o WebP (Máx. 5MB)
                    </p>
                  </div>
                </button>
              )}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
