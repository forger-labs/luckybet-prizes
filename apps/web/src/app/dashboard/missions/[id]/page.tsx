"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { casinoToast } from "@shared/utils/casinoToast";

import { MissionDetailHero } from "@/components/mission/molecules/MissionDetailHero";
import { MissionDetailSkeleton } from "@/components/mission/molecules/MissionDetailSkeleton";
import { MissionStepItem } from "@/components/mission/molecules/MissionStepItem";
import { BoltIcon, ChevronLeftIcon, SparklesIcon } from "@/icons";
import { webApi } from "@/libs/apiWebGanaya";
import type {
  ClientMissionDetail,
  ClientMissionStep,
  MissionCategory,
} from "@/types/missions";
import type { StepSubmissionItem, UserMissionWithSteps } from "@/types/player";

const TYPE_TO_CATEGORY: Record<string, Exclude<MissionCategory, "all">> = {
  DAILY: "daily",
  WEEKLY: "weekly",
  FIXED: "fixed",
};

export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idStr = (params?.id as string) || "";
  const missionId = Number(idStr);

  const [missionDetail, setMissionDetail] =
    useState<ClientMissionDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // ── Load Mission & User Mission State ──
  const loadMissionData = useCallback(async () => {
    if (!missionId || Number.isNaN(missionId)) {
      setLoading(false);
      return;
    }

    try {
      const [catRes, myMissionsRes] = await Promise.all([
        webApi.getMissionById(missionId),
        webApi.getMyMissions({ missionId, take: 1 }),
      ]);

      if (!catRes.status || !catRes.data) {
        casinoToast.error({
          title: "Misión no encontrada",
          description: "No se pudo cargar la información de la misión.",
        });
        setLoading(false);
        return;
      }

      const cat = catRes.data;
      const userMission: UserMissionWithSteps | undefined =
        myMissionsRes.status &&
        Array.isArray(myMissionsRes.data) &&
        myMissionsRes.data.length > 0
          ? myMissionsRes.data[0]
          : undefined;

      const isJoined = Boolean(userMission);
      const userMissionStatus = userMission?.status;
      let isCompleted: boolean = false;

      // ── Check Reward Status via findRewardByUMId ──
      let rewardStatus: ClientMissionDetail["rewardStatus"] = null;
      if (userMission?.id) {
        const rewardRes = await webApi.findRewardByUMId(userMission.id);
        if (rewardRes.status && rewardRes.data) {
          rewardStatus = rewardRes.data.status;
          if (rewardStatus === "CLAIMED") {
            isCompleted = true;
          }
        }
      }

      const baseCoins = cat.coinsAmount ?? 0;
      const bonusPercent = cat.room ? Number(cat.room.bonus) || 0 : 0;
      const totalCoins = Math.round(
        baseCoins + baseCoins * (bonusPercent / 100),
      );

      const catalogSteps = cat.steps ?? [];
      const userStepsMap = new Map<number, StepSubmissionItem>();

      if (userMission?.steps && Array.isArray(userMission.steps)) {
        for (const s of userMission.steps) {
          userStepsMap.set(s.missionStepId, s);
        }
      }

      const detailedSteps: ClientMissionStep[] = catalogSteps.map((step) => {
        const sub = userStepsMap.get(step.id);
        const subStatus: ClientMissionStep["submissionStatus"] = sub
          ? (sub.status as ClientMissionStep["submissionStatus"])
          : isCompleted
            ? "APPROVED"
            : "NOT_STARTED";

        return {
          ...step,
          submission: sub,
          submissionStatus: subStatus,
          targetConfig: step.targetConfig ?? null,
        };
      });

      const completedStepsCount = detailedSteps.filter(
        (s) => s.submissionStatus === "APPROVED",
      ).length;
      const totalStepsCount = detailedSteps.length;
      const progressPercent =
        totalStepsCount > 0
          ? Math.round((completedStepsCount / totalStepsCount) * 100)
          : isCompleted
            ? 100
            : 0;

      const currentStep = userMission?.currentStep ?? 0;
      const canSubmitOrClaim =
        isJoined &&
        rewardStatus !== "CLAIMED" &&
        ((completedStepsCount === totalStepsCount && totalStepsCount > 0) ||
          rewardStatus === "PENDING" ||
          isCompleted);

      const category = TYPE_TO_CATEGORY[cat.type] || "daily";

      setMissionDetail({
        id: cat.id,
        title: cat.title,
        description: cat.description,
        type: cat.type,
        category,
        status: cat.status,
        coinsAmount: cat.coinsAmount,
        experiencePoints: cat.experiencePoints,
        totalCoins,
        room: cat.room,
        imageUrl: cat.imageUrl,
        activatedAt: cat.activatedAt,
        expiresAt: cat.expiresAt,
        steps: catalogSteps,
        detailedSteps,
        isJoined,
        userMissionId: userMission?.id,
        userMissionStatus,
        currentStep,
        progressPercent,
        completedStepsCount,
        totalStepsCount,
        isCompleted: isCompleted,
        canSubmitOrClaim,
        rewardStatus,
      });
    } catch {
      casinoToast.error({
        title: "Error de red",
        description: "Ocurrió un error al consultar los datos de la misión.",
      });
    } finally {
      setLoading(false);
    }
  }, [missionId]);

  useEffect(() => {
    loadMissionData();
  }, [loadMissionData]);

  // ── Start Mission Action ──
  const handleStartMission = async () => {
    if (!missionId) return;
    setActionLoading(true);
    try {
      const res = await webApi.startMission(missionId);
      if (res.status) {
        casinoToast.success({
          title: "¡Misión Iniciada!",
          description: "Ya puedes comenzar a completar los pasos y objetivos.",
        });
        await loadMissionData();
      } else {
        casinoToast.error({
          title: "Error",
          description: Array.isArray(res.message)
            ? res.message[0]
            : res.message || "No se pudo iniciar la misión.",
        });
      }
    } catch {
      casinoToast.error({
        title: "Error de conexión",
        description: "No se pudo comunicar con el servidor.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // ── Verify Game Play Step Action ──
  const handleVerifyGamePlay = async (stepId: number) => {
    if (!missionDetail?.userMissionId) return;
    try {
      const res = await webApi.verifyGamePlayStep(
        missionDetail.userMissionId,
        stepId,
      );
      if (res.status && res.data?.status === "APPROVED") {
        casinoToast.success({
          title: "¡Paso Verificado!",
          description: "Se comprobó exitosamente tu jugada en el casino.",
        });
        await loadMissionData();
      } else {
        casinoToast.error({
          title: "Verificación no cumplida",
          description: Array.isArray(res.message)
            ? res.message[0]
            : res.message ||
              "Aún no cumples los requisitos de juego para este paso.",
        });
      }
    } catch {
      casinoToast.error({
        title: "Error al verificar",
        description: "No se pudo comprobar la jugada en este momento.",
      });
    }
  };

  // ── Submit Step (Text or Image) Action ──
  const handleSubmitStep = async (
    stepId: number,
    data: { text?: string; file?: File },
  ) => {
    if (!missionDetail?.userMissionId) return;
    try {
      const formData = new FormData();
      if (data.text) formData.append("submissionText", data.text);
      if (data.file) formData.append("submissionImage", data.file);

      const res = await webApi.submitMissionStep(
        missionDetail.userMissionId,
        stepId,
        formData,
      );

      if (res.status) {
        casinoToast.success({
          title: "Comprobante Enviado",
          description: "Tu comprobante fue recibido y está en revisión.",
        });
        await loadMissionData();
      } else {
        casinoToast.error({
          title: "Error al enviar",
          description: Array.isArray(res.message)
            ? res.message[0]
            : res.message || "No se pudo enviar la evidencia del paso.",
        });
      }
    } catch {
      casinoToast.error({
        title: "Error de red",
        description: "No fue posible subir el comprobante.",
      });
    }
  };

  // ── Claim Mission Reward Action ──
  const handleClaimReward = async () => {
    if (!missionDetail?.userMissionId) return;
    setActionLoading(true);
    try {
      const res = await webApi.claimMissionReward(missionDetail.userMissionId);
      if (res.status) {
        casinoToast.success({
          title: "¡Recompensa Reclamada!",
          description:
            "Tus fichas y experiencia han sido acreditadas a tu balance.",
        });
        await loadMissionData();
      } else {
        casinoToast.error({
          title: "Error al reclamar",
          description: Array.isArray(res.message)
            ? res.message[0]
            : res.message || "No se pudo procesar el reclamo de la recompensa.",
        });
      }
    } catch {
      casinoToast.error({
        title: "Error de conexión",
        description: "Ocurrió un fallo al reclamar tus fichas.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <MissionDetailSkeleton />;
  }

  if (!missionDetail) {
    return (
      <div className="max-w-5xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-black text-white">Misión no encontrada</h2>
        <button
          type="button"
          onClick={() => router.push("/dashboard/missions")}
          className="px-5 py-2.5 rounded-xl bg-[#38bdf8] text-[#00354a] font-bold text-sm cursor-pointer"
        >
          Volver al listado
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-stack-md">
      {/* Back to Missions Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/dashboard/missions")}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#f8fafc] hover:text-[#38bdf8] transition-colors cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#171f33] border-2 border-[#2d3449] flex items-center justify-center group-hover:border-[#38bdf8] group-hover:bg-[#222a3d] transition-all shadow-sm">
            <ChevronLeftIcon className="w-4 h-4 text-white group-hover:text-[#38bdf8] transition-colors" />
          </div>
          <span>Volver a Misiones</span>
        </button>

        <span className="text-xs text-[#94a3b8] font-mono font-bold">
          ID: #{missionDetail.id}
        </span>
      </div>

      {/* Hero Section */}
      <MissionDetailHero mission={missionDetail} />

      {/* Grid: Step Progression List + Action Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Step Checklist & Forms (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-[#171f33] border-2 border-[#2d3449] shadow-[0_4px_25px_rgba(0,0,0,0.5)] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#2d3449]">
            <div>
              <h3 className="font-(--font-plus-jakarta-sans) text-base sm:text-lg font-black text-[#f8fafc]">
                Objetivos de la Misión
              </h3>
              <p className="text-xs text-[#94a3b8]">
                Completa cada paso para desbloquear tu recompensa
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-[#00354a] text-[#8ed5ff] text-xs font-mono font-bold border border-[#38bdf8]/40">
              {missionDetail.completedStepsCount}/
              {missionDetail.totalStepsCount} ({missionDetail.progressPercent}%)
            </span>
          </div>

          {/* Steps List */}
          <div className="space-y-4">
            {missionDetail.detailedSteps.map((step, idx) => (
              <MissionStepItem
                key={step.id || idx}
                step={step}
                stepIndex={idx}
                isMissionJoined={missionDetail.isJoined}
                onVerifyGamePlay={handleVerifyGamePlay}
                onSubmitStep={handleSubmitStep}
              />
            ))}
          </div>
        </div>

        {/* Right: Actions CTA Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-[#171f33] border-2 border-[#ffc640]/50 shadow-[0_4px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(255,198,64,0.15)] space-y-4">
            <div className="flex items-center gap-2 text-[#ffc640]">
              <SparklesIcon className="w-4 h-4 text-[#ffc640]" />
              <span className="text-xs uppercase font-black tracking-wider">
                Recompensa del Casino
              </span>
            </div>

            <div className="space-y-1">
              <p className="font-(--font-plus-jakarta-sans) text-2xl sm:text-3xl font-black text-[#ffc640] tracking-tight">
                +{missionDetail.totalCoins.toLocaleString("es-ES")} Fichas
              </p>
              <p className="text-xs text-[#dae2fd] font-medium leading-relaxed">
                +{missionDetail.experiencePoints} XP de nivel garantizados al
                completar todos los objetivos.
              </p>
            </div>

            <div className="pt-3 space-y-3">
              {/* Not Joined Yet CTA */}
              {!missionDetail.isJoined && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={actionLoading}
                  onClick={handleStartMission}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#38bdf8] hover:bg-[#7bd0ff] text-[#00354a] font-(--font-plus-jakarta-sans) text-sm sm:text-base font-black border-2 border-[#8ed5ff] shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <BoltIcon className="w-4 h-4 text-[#00354a]" />
                  <span>
                    {actionLoading ? "Iniciando..." : "Comenzar Misión"}
                  </span>
                </motion.button>
              )}

              {/* Claim Reward Button */}
              {missionDetail.canSubmitOrClaim && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={actionLoading}
                  onClick={handleClaimReward}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#ffc640] hover:bg-[#ffdf9f] text-[#402d00] font-(--font-plus-jakarta-sans) text-sm sm:text-base font-black border-2 border-[#ffdf9f] shadow-[0_0_20px_rgba(255,198,64,0.35)] transition-all text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <SparklesIcon className="w-4 h-4 text-[#402d00]" />
                  <span>
                    {actionLoading ? "Reclamando..." : "Reclamar Recompensa"}
                  </span>
                </motion.button>
              )}

              {/* Completed Status State */}
              {missionDetail.isCompleted && (
                <div className="w-full py-3 px-4 rounded-2xl bg-[#064e3b] border-2 border-[#059669] text-[#34d399] text-center font-black text-sm flex items-center justify-center gap-2 shadow-sm">
                  <span className="material-symbols-outlined text-base">
                    check_circle
                  </span>
                  <span>Misión Completada y Reclamada</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => router.push("/dashboard/missions")}
                className="w-full py-3 px-6 rounded-2xl bg-[#222a3d] hover:bg-[#2d3449] text-[#f8fafc] font-(--font-be-vietnam-pro) text-xs sm:text-sm font-bold border-2 border-[#3e484f] transition-all text-center cursor-pointer"
              >
                Cerrar y volver
              </button>
            </div>
          </div>

          {/* Security / Tips Box */}
          <div className="p-5 rounded-2xl bg-[#131b2e] border-2 border-[#2d3449] text-xs text-[#dae2fd] space-y-1.5">
            <p className="font-bold text-[#f8fafc] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#38bdf8]">
                verified
              </span>
              Validación de Pasos
            </p>
            <p className="leading-relaxed">
              Los pasos se procesan de forma simultánea. Si un paso fue
              rechazado por el revisor, podrás corregirlo y reenviarlo
              directamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
