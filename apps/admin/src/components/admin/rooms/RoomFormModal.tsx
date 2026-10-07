"use client";

import { Form, Formik } from "formik";
import { useCallback, useRef } from "react";
import * as Yup from "yup";

import { casinoToast } from "@shared/utils/casinoToast";

import { Modal } from "@/components/ui/Modal";
import type {
  RoomBonus,
  RoomFormModalProps,
  RoomFormValues,
} from "@/types/adminRooms";
import { RoomFormFields } from "./RoomFormFields";

const RoomSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .required("El nombre de la sala es obligatorio"),
  bonus: Yup.string()
    .oneOf(
      ["0", "30", "40", "50", "100", "150", "200"],
      "Seleccione un porcentaje de bono válido",
    )
    .required("El bono es obligatorio"),
  isActive: Yup.boolean().required(),
});

export function RoomFormModal({
  open,
  onClose,
  room,
  onSave,
  isSubmitting,
}: RoomFormModalProps) {
  const isCreate = room === null;
  const dirtyRef = useRef(false);

  const handleRequestClose = useCallback(() => {
    if (dirtyRef.current) {
      casinoToast.action({
        title: "¿Descartar cambios?",
        description:
          "Hay modificaciones sin guardar en la sala. ¿Desea descartarlas?",
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

  const initialValues: RoomFormValues = {
    name: room?.name ?? "",
    bonus: (room?.bonus as RoomBonus) ?? "0",
    isActive: room?.isActive ?? true,
  };

  return (
    <Modal
      open={open}
      onClose={handleRequestClose}
      title={isCreate ? "Registrar Nueva Sala" : "Editar Sala Promocional"}
      subtitle={
        isCreate
          ? "Configure el nombre de la sala en LuckyBet y su porcentaje de bono asignado"
          : "Actualice el nombre o porcentaje de bono de la sala"
      }
      icon={isCreate ? "add_business" : "edit_square"}
      size="md"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={RoomSchema}
        onSubmit={async (values, { setSubmitting: setFormikSubmitting }) => {
          const ok = await onSave(values, isCreate);
          setFormikSubmitting(false);
          if (ok) {
            onClose();
          }
        }}
        enableReinitialize
      >
        {(formik) => {
          dirtyRef.current = formik.dirty;
          return (
            <Form className="flex flex-col gap-5">
              <RoomFormFields formik={formik} isCreate={isCreate} />

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
                      ? "Crear Sala"
                      : "Guardar Cambios"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

RoomFormModal.displayName = "RoomFormModal";
