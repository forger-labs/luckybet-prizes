"use client";

import { Form, Formik } from "formik";
import { useCallback, useRef } from "react";
import * as Yup from "yup";

import { casinoToast } from "@shared/utils/casinoToast";

import { Modal } from "@/components/ui/Modal";
import type {
  PlayerEditModalProps,
  PlayerFormValues,
} from "@/types/adminPlayers";
import { PlayerEditFormFields } from "./PlayerEditFormFields";

const PlayerSchema = Yup.object().shape({
  username: Yup.string().required(),
  phone: Yup.string()
    .trim()
    .matches(/^[+]?[0-9\s-]{6,20}$/, {
      message: "Formato de teléfono inválido (ej: +584121234567)",
      excludeEmptyString: true,
    }),
  isActive: Yup.boolean().required(),
});

export function PlayerEditModal({
  open,
  onClose,
  player,
  onSave,
  isSubmitting,
}: PlayerEditModalProps) {
  const dirtyRef = useRef(false);

  const handleRequestClose = useCallback(() => {
    if (dirtyRef.current) {
      casinoToast.action({
        title: "¿Descartar cambios?",
        description:
          "Hay modificaciones sin guardar en el jugador. ¿Desea descartarlas?",
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

  const initialValues: PlayerFormValues = {
    username: player?.username ?? "",
    phone: player?.phone ?? "",
    isActive: player?.isActive ?? true,
  };

  return (
    <Modal
      open={open}
      onClose={handleRequestClose}
      title="Editar Jugador"
      subtitle="Actualice el número de contacto o estado de actividad del jugador"
      icon="manage_accounts"
      size="md"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={PlayerSchema}
        onSubmit={async (values, { setSubmitting: setFormikSubmitting }) => {
          const ok = await onSave(values);
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
              <PlayerEditFormFields formik={formik} />

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
                    isSubmitting || formik.isSubmitting || !formik.dirty
                  }
                  className="px-5 py-2.5 rounded-xl text-body-md font-bold bg-primary text-on-primary hover:bg-primary-fixed-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                >
                  {isSubmitting || formik.isSubmitting
                    ? "Guardando..."
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

PlayerEditModal.displayName = "PlayerEditModal";
