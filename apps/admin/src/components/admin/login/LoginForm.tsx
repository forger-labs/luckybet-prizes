"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { LoginFormProps } from "@/types/login";
import PasswordField from "./PasswordField";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("El nombre de usuario es obligatorio")
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(50, "El usuario no puede exceder 50 caracteres"),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña no puede exceder 100 caracteres"),
});

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
    <form className="space-y-5" onSubmit={formik.handleSubmit}>
      {/* Username */}
      <div className="space-y-2">
        <label
          className="font-label-md text-sm text-on-surface-variant font-medium ml-1 cursor-pointer block"
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
          autoComplete="username"
          className="bg-surface-container-lowest/80 border-outline-variant/30 focus:border-primary focus:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-error font-body-md text-xs flex items-center gap-1.5 mt-1 animate-in fade-in duration-200">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{formik.errors.username}</span>
          </p>
        )}
      </div>

      {/* Password */}
      <PasswordField
        id="password"
        label="Contraseña"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        autoComplete="current-password"
        error={formik.touched.password ? formik.errors.password : undefined}
      />

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="secondary"
          loading={formik.isSubmitting}
          trailingIcon="arrow_forward"
          className="w-full text-base font-bold tracking-wide shadow-[0_0_20px_rgba(255,198,64,0.2)] hover:shadow-[0_0_25px_rgba(255,198,64,0.35)] active:scale-[0.98] transition-all cursor-pointer"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Autenticando..." : "Iniciar sesión"}
        </Button>
      </div>
    </form>
  );
}
