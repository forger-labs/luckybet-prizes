"use client";

import { Field } from "formik";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { UserFormFieldsProps } from "@/types/adminUsers";

const ROLE_OPTIONS = [
  { value: "REVIEWER", label: "Revisor (Reviewer)" },
  { value: "SUPER_ADMIN", label: "Super Administrador" },
];

export function UserFormFields({ formik, isCreate }: UserFormFieldsProps) {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } =
    formik;

  return (
    <div className="flex flex-col gap-5 pt-2">
      {/* Username */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="user-username"
          className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
        >
          Nombre de usuario
        </label>
        <Input
          name="username"
          id="user-username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="ej: admin.operaciones"
          icon="person"
          wrapperClassName="w-full"
        />
        {touched.username && errors.username && (
          <p className="text-label-sm text-error mt-0.5">{errors.username}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="user-password"
          className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
        >
          Contraseña
          {!isCreate && (
            <span className="text-outline font-normal ml-1">
              (deje vacío para conservar la actual)
            </span>
          )}
        </label>
        <Input
          name="password"
          id="user-password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={
            isCreate
              ? "Ingrese una contraseña segura"
              : "Nueva contraseña (opcional)"
          }
          icon="lock"
          wrapperClassName="w-full"
        />
        {touched.password && errors.password && (
          <p className="text-label-sm text-error mt-0.5">{errors.password}</p>
        )}
      </div>

      {/* Role */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="user-role"
          className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
        >
          Rol de acceso
        </label>
        <Select
          id="user-role"
          name="role"
          icon="badge"
          options={ROLE_OPTIONS}
          value={values.role}
          onChange={(v) => setFieldValue("role", v)}
          error={
            touched.role && errors.role ? (errors.role as string) : undefined
          }
        />
      </div>

      {/* Active status */}
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
        <Field
          id="user-isActive"
          name="isActive"
          type="checkbox"
          className="w-5 h-5 rounded-md border-outline-variant/30 bg-surface-container-lowest checked:bg-primary checked:border-primary transition-all cursor-pointer accent-primary"
        />
        <label
          htmlFor="user-isActive"
          className="text-body-md text-on-surface font-medium cursor-pointer select-none"
        >
          Usuario con acceso activo a la plataforma
        </label>
      </div>
    </div>
  );
}

UserFormFields.displayName = "UserFormFields";
