"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import PasswordField from "./PasswordField";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("El usuario es requerido")
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(50, "El usuario no puede exceder 50 caracteres"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña no puede exceder 100 caracteres"),
});

interface LoginFormProps {
  onLogin?: (username: string, password: string) => Promise<void>;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      if (!onLogin) return;

      try {
        await onLogin(values.username, values.password);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Credenciales inválidas";
        setFieldError("password", message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form className="space-y-stack-md" onSubmit={formik.handleSubmit}>
      {/* Username */}
      <div className="space-y-2">
        <label
          className="font-label-md text-label-md text-on-surface-variant ml-1"
          htmlFor="username"
        >
          Usuario
        </label>
        <Input
          icon="person"
          type="text"
          id="username"
          name="username"
          placeholder="admin"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-error font-body-md text-body-md flex items-center gap-2 mt-1">
            <span className="material-symbols-outlined text-[18px]!">
              error
            </span>
            {formik.errors.username}
          </p>
        )}
      </div>

      {/* Password */}
      <PasswordField
        label="Contraseña"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password ? formik.errors.password : undefined}
      />

      {/* Submit */}
      <Button
        type="submit"
        variant="secondary"
        loading={formik.isSubmitting}
        trailingIcon="arrow_forward"
        className="w-full mt-stack-md"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Iniciando sesión..." : "Inicia sesión"}
      </Button>
    </form>
  );
}
