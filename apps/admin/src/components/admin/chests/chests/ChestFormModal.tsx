"use client";

import { Form, Formik } from "formik";
import { useCallback, useRef } from "react";
import * as Yup from "yup";

import { casinoToast } from "@shared/utils/casinoToast";

import { Modal } from "@/components/ui/Modal";
import type { ChestFormModalProps, ChestFormValues } from "@/types/adminChests";
import { ChestFormFields } from "./ChestFormFields";

const ChestSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(3, "Mínimo 3 caracteres")
    .max(100, "Máximo 100 caracteres")
    .required("El título es obligatorio"),
  description: Yup.string().optional(),
  periodType: Yup.string()
    .oneOf(["WEEKLY", "MONTHLY"], "Seleccione un periodo válido")
    .required("El periodo es obligatorio"),
  requiredMissions: Yup.number()
    .typeError("Debe ser un número válido")
    .integer("Debe ser un número entero")
    .min(1, "Debe ser al menos 1 misión")
    .required("Las misiones requeridas son obligatorias"),
  coinsAmount: Yup.number()
    .typeError("Debe ser un número válido")
    .integer("Debe ser un número entero")
    .min(0, "No puede ser negativo")
    .required("Las fichas son obligatorias"),
  experiencePoints: Yup.number()
    .typeError("Debe ser un número válido")
    .integer("Debe ser un número entero")
    .min(0, "No puede ser negativo")
    .required("La experiencia es obligatoria"),
  roomId: Yup.string().optional(),
  image: Yup.mixed<File>()
    .nullable()
    .optional()
    .test(
      "fileSize",
      "La imagen no debe superar los 5MB",
      (val) => !val || (val instanceof File && val.size <= 5 * 1024 * 1024),
    ),
});

export function ChestFormModal({
  open,
  onClose,
  chest,
  rooms = [],
  onSave,
  isSubmitting = false,
}: ChestFormModalProps) {
  const isCreate = chest === null;
  const dirtyRef = useRef(false);

  const handleRequestClose = useCallback(() => {
    if (dirtyRef.current) {
      casinoToast.action({
        title: "¿Descartar cambios?",
        description: "Hay modificaciones sin guardar. ¿Desea descartarlas?",
        button: {
          title: "Sí, descartar",
          onClick: () => onClose(),
        },
      });
      return;
    }
    onClose();
  }, [onClose]);

  const initialValues: ChestFormValues = {
    title: chest?.title ?? "",
    description: chest?.description ?? "",
    periodType: chest?.periodType ?? "WEEKLY",
    requiredMissions: chest?.requiredMissions ?? "",
    coinsAmount: chest?.coinsAmount ?? "",
    experiencePoints: chest?.experiencePoints ?? "",
    roomId: chest?.roomId ? String(chest.roomId) : "",
    isActive: chest?.isActive ?? true,
    image: null,
  };

  return (
    <Modal
      open={open}
      onClose={handleRequestClose}
      title={isCreate ? "Crear Nuevo Cofre" : "Editar Cofre"}
      subtitle={
        isCreate
          ? "Configure la meta de misiones requeridas, recompensas e imagen 16:9"
          : "Actualice los requisitos o recompensas del cofre"
      }
      icon="inventory_2"
      size="lg"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={ChestSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const success = await onSave(values, isCreate);
          setSubmitting(false);
          if (success) onClose();
        }}
        enableReinitialize
      >
        {(formik) => {
          dirtyRef.current = formik.dirty;
          return (
            <Form className="flex flex-col gap-5">
              <ChestFormFields
                formik={formik}
                rooms={rooms}
                currentImageUrl={chest?.imageUrl}
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/15">
                <button
                  type="button"
                  onClick={handleRequestClose}
                  className="px-5 py-2.5 rounded-xl text-body-md text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    formik.isSubmitting ||
                    (isCreate ? false : !formik.dirty)
                  }
                  className="px-5 py-2.5 rounded-xl text-body-md font-bold bg-primary text-on-primary hover:bg-primary-fixed-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                >
                  {isSubmitting || formik.isSubmitting
                    ? "Guardando..."
                    : isCreate
                      ? "Crear cofre"
                      : "Guardar cambios"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

ChestFormModal.displayName = "ChestFormModal";
