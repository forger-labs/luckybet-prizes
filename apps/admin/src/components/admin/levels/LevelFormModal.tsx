"use client";

import { Form, Formik } from "formik";
import { useCallback, useRef } from "react";
import * as Yup from "yup";

import { casinoToast } from "@shared/utils/casinoToast";

import { Modal } from "@/components/ui/Modal";
import type { LevelFormModalProps, LevelFormValues } from "@/types/adminLevels";
import { LevelFormFields } from "./LevelFormFields";

const CreateLevelSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1, "El nombre debe tener al menos 1 caracter")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .required("El nombre del nivel es obligatorio"),
  minExperience: Yup.number()
    .typeError("Debe ser un número válido")
    .integer("Debe ser un número entero")
    .min(0, "La experiencia no puede ser negativa")
    .required("La experiencia mínima es obligatoria"),
  coins: Yup.number()
    .typeError("Debe ser un número válido")
    .integer("Debe ser un número entero")
    .min(0, "Las monedas no pueden ser negativas")
    .required("La cantidad de monedas es obligatoria"),
  roomId: Yup.string().optional(),
  image: Yup.mixed<File>()
    .required("La medalla del nivel es obligatoria")
    .test(
      "fileSize",
      "La imagen no debe superar los 5MB",
      (val) => !val || (val instanceof File && val.size <= 5 * 1024 * 1024),
    ),
});

const EditLevelSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1, "El nombre debe tener al menos 1 caracter")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .required("El nombre del nivel es obligatorio"),
  minExperience: Yup.number()
    .typeError("Debe ser un número válido")
    .integer("Debe ser un número entero")
    .min(0, "La experiencia no puede ser negativa")
    .required("La experiencia mínima es obligatoria"),
  coins: Yup.number()
    .typeError("Debe ser un número válido")
    .integer("Debe ser un número entero")
    .min(0, "Las monedas no pueden ser negativas")
    .required("La cantidad de monedas es obligatoria"),
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

export function LevelFormModal({
  open,
  onClose,
  level,
  onSave,
  isSubmitting = false,
}: LevelFormModalProps) {
  const isCreate = level === null;
  const dirtyRef = useRef(false);

  const handleRequestClose = useCallback(() => {
    if (dirtyRef.current) {
      casinoToast.action({
        title: "¿Descartar cambios?",
        description: "Hay modificaciones sin guardar. ¿Desea descartarlas?",
        button: {
          title: "Sí, descartar",
          onClick: () => {
            onClose();
          },
        },
      });
      return;
    }
    onClose();
  }, [onClose]);

  const initialValues: LevelFormValues = {
    name: level?.name ?? "",
    minExperience: level?.minExperience ?? "",
    coins: level?.coins ?? "",
    roomId: level?.roomId ? String(level.roomId) : "",
    image: null,
  };

  return (
    <Modal
      open={open}
      onClose={handleRequestClose}
      title={isCreate ? "Crear Nuevo Nivel" : "Editar Nivel"}
      subtitle={
        isCreate
          ? "Configure el nombre, medalla, requisitos de experiencia y recompensas"
          : "Actualice los requisitos o recompensas asociadas al nivel"
      }
      icon={isCreate ? "add_circle" : "edit_square"}
      size="md"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={isCreate ? CreateLevelSchema : EditLevelSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const success = await onSave(values, isCreate);
          setSubmitting(false);
          if (success) {
            onClose();
          }
        }}
        enableReinitialize
      >
        {(formik) => {
          dirtyRef.current = formik.dirty;
          const isButtonDisabled =
            formik.isSubmitting ||
            isSubmitting ||
            (isCreate ? false : !formik.dirty);

          return (
            <Form className="flex flex-col gap-5">
              <LevelFormFields
                formik={formik}
                isCreate={isCreate}
                currentImageUrl={level?.image}
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
                  disabled={isButtonDisabled}
                  className="px-5 py-2.5 rounded-xl text-body-md font-bold bg-primary text-on-primary hover:bg-primary-fixed-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                >
                  {isCreate ? "Crear nivel" : "Guardar cambios"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

LevelFormModal.displayName = "LevelFormModal";
