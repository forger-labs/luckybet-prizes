"use client";

import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
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
  id: "new_step_1",
  title: "",
  verificationType: "upload_image" as VerificationType,
  order: 1,
};

/* ── Yup validation schema ── */

const validationSchema = Yup.object({
  title: Yup.string()
    .required("El título es requerido")
    .min(3, "El título debe tener al menos 3 caracteres"),
  description: Yup.string()
    .required("La descripción es requerida")
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  tokenReward: Yup.number()
    .required("La recompensa es requerida")
    .min(1, "La recompensa debe ser mayor a 0"),
  bonusPercent: Yup.number().min(0).max(100),
  xpReward: Yup.number()
    .required("La experiencia es requerida")
    .min(1, "La experiencia debe ser mayor a 0"),
  category: Yup.string().required("Seleccioná una categoría"),
  steps: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required("El título del paso es obligatorio"),
      }),
    )
    .min(1, "Agregá al menos un paso"),
});

/* ── Helpers ── */

function createEmptyInitialValues(): PartialAdminMission {
  return {
    title: "",
    description: "",
    tokenReward: 0,
    bonusPercent: 0,
    xpReward: 0,
    category: "daily",
    status: "inactive",
    steps: [{ ...DEFAULT_STEP, id: crypto.randomUUID() }],
  };
}

/**
 * MissionFormModal — modal de creación/edición de misión.
 *
 * Usa Formik + Yup para manejo de estado y validación.
 * Pasa formik directamente a MissionFields y StepBuilder
 * para que ellos extraigan lo que necesitan.
 */
function MissionFormModal({
  open,
  onClose,
  mission,
  onSave,
}: MissionFormModalProps) {
  const isCreating = mission === null;
  const readOnly = !isCreating && mission.status === "active";

  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

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
      console.log("whatsup");
      if (isCreating) {
        const createData: PartialAdminMission = {
          title: (values.title as string) || "",
          description: (values.description as string) || "",
          tokenReward: Number(values.tokenReward) || 0,
          bonusPercent: Number(values.bonusPercent) || 0,
          xpReward: Number(values.xpReward) || 0,
          category: (values.category as AdminMission["category"]) || "daily",
          status: "inactive",
          steps,
          coverImage: values.coverImage as string | undefined,
        };
        console.log(createData);
        onSave(createData, true);
      } else {
        const updateData: PartialAdminMission = {
          title: values.title as string,
          description: values.description as string,
          tokenReward: Number(values.tokenReward),
          bonusPercent: Number(values.bonusPercent),
          xpReward: Number(values.xpReward),
          category: values.category as AdminMission["category"],
          status: (values.status as AdminMission["status"]) || "inactive",
          steps,
          coverImage: values.coverImage as string | undefined,
        };
        onSave(updateData, false);
      }
    },
  });

  /* ── Reset form when modal opens ── */
  // biome-ignore lint/correctness/useExhaustiveDependencies: use formik
  useEffect(() => {
    if (open) {
      formik.resetForm({
        values: isCreating
          ? createEmptyInitialValues()
          : ({ ...mission } as PartialAdminMission),
      });
      setShowDiscardConfirm(false);
    }
  }, [open, isCreating, mission]);

  /* ── Close with dirty guard ── */
  const handleClose = useCallback(() => {
    if (formik.dirty) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  }, [formik.dirty, onClose]);

  const confirmDiscard = useCallback(() => {
    setShowDiscardConfirm(false);
    formik.resetForm();
    onClose();
  }, [formik, onClose]);

  const cancelDiscard = useCallback(() => {
    setShowDiscardConfirm(false);
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        title={
          isCreating
            ? "Nueva Misión"
            : readOnly
              ? "Detalles de misión"
              : "Editar Misión"
        }
        size="lg"
      >
        {/* Content Lock Banner */}
        {readOnly && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/15 mb-4">
            <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">
              info
            </span>
            <p className="text-body-md text-on-surface-variant">
              Misión activa — contenido bloqueado. Los parámetros no pueden
              modificarse.
            </p>
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* Mission Fields — recibe formik completo */}
          <MissionFields formik={formik} readOnly={readOnly} />

          {/* Step Builder — hidden in readOnly mode */}
          {!readOnly && (
            <>
              <div className="mt-6 pt-6 border-t border-outline-variant/20">
                <StepBuilder formik={formik} readOnly={readOnly} />
              </div>
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-outline-variant/20">
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="text-base"
                >
                  Descartar
                </Button>
                <Button
                  variant="primary"
                  disabled={readOnly}
                  className="text-base cursor-pointer"
                  type="submit"
                >
                  Guardar
                </Button>
              </div>
            </>
          )}
        </form>
      </Modal>

      {/* Discard Confirmation Dialog */}
      {showDiscardConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Cancelar descarte"
            className="absolute inset-0 bg-black/50 cursor-default"
            onClick={cancelDiscard}
          />
          <div className="relative bg-surface-container border border-white/10 rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-title-md text-on-surface mb-2">
              ¿Descartar cambios?
            </h3>
            <p className="text-body-md text-on-surface-variant mb-4">
              Los cambios sin guardar se perderán.
            </p>
            <div className="flex items-center justify-start gap-3">
              <Button
                variant="ghost"
                className="text-base"
                onClick={cancelDiscard}
              >
                Seguir editando
              </Button>
              <Button
                variant="danger"
                className="text-base"
                onClick={confirmDiscard}
              >
                Descartar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

MissionFormModal.displayName = "MissionFormModal";

export { MissionFormModal };
