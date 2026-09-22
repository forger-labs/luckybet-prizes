"use client";

import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { sileo } from "sileo";
import * as Yup from "yup";

import type {
  AdminMission,
  MissionStep,
  VerificationType,
} from "@shared/types";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type {
  MissionFormModalProps,
  PartialAdminMission,
} from "@/types/missions/MissionFormModalTypes";
import { MissionFields } from "./MissionFields";
import { StepBuilder } from "./StepBuilder";

const DEFAULT_STEP: MissionStep = {
  id: 1,
  title: "",
  verificationType: "IMAGE" as VerificationType,
  order: 1,
};

const validationSchema = Yup.object({
  title: Yup.string()
    .required("El título es obligatorio")
    .min(3, "Mínimo 3 caracteres"),
  description: Yup.string()
    .required("La descripción es obligatoria")
    .min(10, "Mínimo 10 caracteres"),
  tokenReward: Yup.number()
    .required("La recompensa es obligatoria")
    .min(1, "Debe ser mayor a 0"),
  bonusPercent: Yup.number().min(0).max(100),
  xpReward: Yup.number()
    .required("La experiencia es obligatoria")
    .min(1, "Debe ser mayor a 0"),
  category: Yup.string().required("Seleccione una categoría"),
  steps: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required("El título del paso es obligatorio"),
      }),
    )
    .min(1, "Agregue al menos un paso"),
});

function createEmptyInitialValues(): PartialAdminMission {
  return {
    title: "",
    description: "",
    tokenReward: 0,
    bonusPercent: 0,
    xpReward: 0,
    category: "daily",
    status: "inactive",
    steps: [{ ...DEFAULT_STEP, id: Date.now() }],
  };
}

export function MissionFormModal({
  open,
  onClose,
  mission,
  onSave,
}: MissionFormModalProps) {
  const isCreating = mission === null;
  const readOnly = !isCreating && mission.status === "active";
  const [dirty, setDirty] = useState(false);

  const formik = useFormik({
    initialValues: isCreating ? createEmptyInitialValues() : { ...mission },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const steps = ((values.steps as MissionStep[]) || []).map((s, i) => ({
        ...s,
        order: i + 1,
      }));

      const payload: PartialAdminMission = {
        title: (values.title as string) || "",
        description: (values.description as string) || "",
        tokenReward: Number(values.tokenReward) || 0,
        bonusPercent: Number(values.bonusPercent) || 0,
        xpReward: Number(values.xpReward) || 0,
        category: (values.category as AdminMission["category"]) || "daily",
        status: (values.status as AdminMission["status"]) || "inactive",
        steps,
        coverImage: values.coverImage as string | undefined,
        image: values.image as File | undefined,
      };

      onSave(payload, isCreating);
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset form on modal open
  useEffect(() => {
    if (open) {
      formik.resetForm({
        values: isCreating
          ? createEmptyInitialValues()
          : ({ ...mission } as PartialAdminMission),
      });
      setDirty(false);
    }
  }, [open, isCreating, mission]);

  useEffect(() => {
    setDirty(formik.dirty);
  }, [formik.dirty]);

  const handleRequestClose = useCallback(() => {
    if (dirty) {
      sileo.action({
        title: "¿Descartar cambios?",
        description: "Hay modificaciones sin guardar. ¿Desea descartarlas?",
        button: {
          title: "Sí, descartar",
          onClick: () => {
            onClose();
            sileo.clear();
          },
        },
      });
      return;
    }
    onClose();
  }, [dirty, onClose]);

  return (
    <Modal
      open={open}
      onClose={handleRequestClose}
      title={
        isCreating
          ? "Crear Nueva Misión"
          : readOnly
            ? "Detalles de Misión"
            : "Editar Misión"
      }
      subtitle={
        isCreating
          ? "Configure los parámetros de la misión y sus pasos"
          : undefined
      }
      icon="assignment"
      size="xl"
    >
      {readOnly && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-5">
          <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">
            lock
          </span>
          <p className="text-body-md text-on-surface-variant text-sm leading-relaxed">
            Misión activa — contenido protegido contra edición para salvaguardar
            el progreso de los jugadores.
          </p>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <MissionFields formik={formik} readOnly={readOnly} />

        {!readOnly && (
          <div className="pt-6 border-t border-outline-variant/20">
            <StepBuilder formik={formik} readOnly={readOnly} />
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-5 border-t border-outline-variant/20">
          <button
            type="button"
            onClick={handleRequestClose}
            className="px-5 py-2.5 rounded-xl text-body-md text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            {readOnly ? "Cerrar" : "Cancelar"}
          </button>
          {!readOnly && (
            <Button
              type="submit"
              variant="secondary"
              className="font-bold shadow-[0_0_15px_rgba(255,198,64,0.2)] hover:shadow-[0_0_20px_rgba(255,198,64,0.35)] cursor-pointer"
            >
              {isCreating ? "Crear misión" : "Guardar cambios"}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}

MissionFormModal.displayName = "MissionFormModal";
