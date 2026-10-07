"use client";

import { motion } from "framer-motion";

import { CheckCircleIcon } from "@/icons";
import type { MissionStep } from "@/types/missions";

interface Props {
  steps: MissionStep[];
  onToggleStep?: (stepId: string) => void;
  accentColor?: string;
  verificationNote?: string;
}

export const MissionStepChecklist = ({
  steps,
  onToggleStep,
  accentColor = "#38bdf8",
  verificationNote,
}: Props) => {
  const completedSteps = steps.filter((s) => s.completed).length;
  const progressPercent =
    steps.length > 0 ? Math.round((completedSteps / steps.length) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Header & Progress */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="font-(--font-plus-jakarta-sans) text-base sm:text-lg font-black text-white">
            Pasos de la Misión
          </h3>
          <p className="text-xs text-[#bdc8d1] font-medium">
            Completa cada objetivo para desbloquear tu recompensa
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-[#87929a]">
            {completedSteps}/{steps.length}
          </span>
          <span
            className="text-xs font-black px-2.5 py-0.5 rounded-md border"
            style={{
              backgroundColor: "#00354a",
              color: accentColor,
              borderColor: accentColor,
            }}
          >
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-[#0b1326] h-2.5 rounded-full overflow-hidden border border-white/10 p-0.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full rounded-full bg-primary-container shadow-[0_0_8px_#38bdf8]"
        />
      </div>

      {/* Steps List */}
      <div className="space-y-3 pt-1">
        {steps.map((step, idx) => {
          const isDone = step.completed;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onToggleStep?.(step.id)}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer select-none ${
                isDone
                  ? "bg-surface-container-low border-[#059669] text-white"
                  : "bg-surface-container border-[#2d3449] hover:border-primary hover:bg-[#222a3d]"
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                {/* Step Number Chip */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-colors shadow-sm ${
                    isDone
                      ? "bg-[#10b981] text-[#064e3b]"
                      : "bg-on-primary text-primary border border-[#38bdf8]"
                  }`}
                >
                  {isDone ? (
                    <CheckCircleIcon className="w-5 h-5 text-[#064e3b]" />
                  ) : (
                    step.number || `0${idx + 1}`
                  )}
                </div>

                {/* Step Text */}
                <div className="truncate">
                  <p
                    className={`font-label-md text-sm font-bold transition-colors ${
                      isDone ? "text-[#34d399] line-through" : "text-white"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-[#bdc8d1] truncate mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Indicator Chip */}
              <div className="shrink-0">
                {isDone ? (
                  <span className="text-[11px] font-black text-[#34d399] bg-[#064e3b] px-2.5 py-1 rounded-md border border-[#059669]">
                    Completado
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-[#dae2fd] bg-[#222a3d] px-2.5 py-1 rounded-md border border-[#3e484f]">
                    Pendiente
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Verification / Security note */}
      {verificationNote && (
        <div className="p-3.5 rounded-xl bg-surface-container-low border-2 border-[#2d3449] flex items-start gap-2.5">
          <span className="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">
            verified_user
          </span>
          <p className="text-xs text-[#bdc8d1] leading-relaxed">
            {verificationNote}
          </p>
        </div>
      )}
    </div>
  );
};
