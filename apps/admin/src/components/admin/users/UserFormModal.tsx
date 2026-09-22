"use client";

import { Form, Formik } from "formik";
import { useCallback, useRef } from "react";
import * as Yup from "yup";

import { casinoToast } from "@shared/utils/casinoToast";

import { Modal } from "@/components/ui/Modal";
import type { UserFormModalProps } from "@/types/adminUsers";
import { UserFormFields } from "./UserFormFields";

const CreateSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Mínimo 3 caracteres")
    .max(20, "Máximo 20 caracteres")
    .matches(/^[a-zA-Z0-9._-]+$/, "Solo letras, números, puntos y guiones")
    .required("El usuario es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .max(50, "Máximo 50 caracteres")
    .required("La contraseña es obligatoria"),
  role: Yup.string()
    .oneOf(["SUPER_ADMIN", "REVIEWER"], "Seleccione un rol válido")
    .required("El rol es obligatorio"),
  isActive: Yup.boolean(),
});

const EditSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Mínimo 3 caracteres")
    .max(20, "Máximo 20 caracteres")
    .matches(/^[a-zA-Z0-9._-]+$/, "Solo letras, números, puntos y guiones")
    .required("El usuario es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .max(50, "Máximo 50 caracteres"),
  role: Yup.string()
    .oneOf(["SUPER_ADMIN", "REVIEWER"], "Seleccione un rol válido")
    .required("El rol es obligatorio"),
  isActive: Yup.boolean(),
});

export function UserFormModal({
  open,
  onClose,
  user,
  onSave,
}: UserFormModalProps) {
  const isCreate = user === null;
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

  const initialValues = {
    username: user?.username ?? "",
    password: "",
    role: user?.role ?? ("REVIEWER" as const),
    isActive: user?.isActive ?? true,
  };

  return (
    <Modal
      open={open}
      onClose={handleRequestClose}
      title={isCreate ? "Crear Nuevo Usuario" : "Editar Usuario"}
      subtitle={
        isCreate
          ? "Defina el nombre de usuario, contraseña y rol asignado"
          : "Actualice los permisos o credenciales del usuario"
      }
      icon={isCreate ? "person_add" : "manage_accounts"}
      size="md"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={isCreate ? CreateSchema : EditSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSave(values, isCreate);
          setSubmitting(false);
          onClose();
        }}
        enableReinitialize
      >
        {(formik) => {
          dirtyRef.current = formik.dirty;
          return (
            <Form className="flex flex-col gap-5">
              <UserFormFields formik={formik} isCreate={isCreate} />

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
                    formik.isSubmitting || (isCreate ? false : !formik.dirty)
                  }
                  className="px-5 py-2.5 rounded-xl text-body-md font-bold bg-primary text-on-primary hover:bg-primary-fixed-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                >
                  {isCreate ? "Crear usuario" : "Guardar cambios"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

UserFormModal.displayName = "UserFormModal";
