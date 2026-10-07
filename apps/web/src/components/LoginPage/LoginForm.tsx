"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

import { ROUTES } from "@shared/constants";
import { LoadingIcon } from "@shared/icons/LoadingIcon";
import { casinoToast } from "@shared/utils/casinoToast";

import { useAuthContext } from "@/hooks/useAuth";
import type { LoginFormValues } from "@/types/luckybet";

const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("El usuario o correo es obligatorio")
    .min(3, "Debe tener al menos 3 caracteres"),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(4, "Debe tener al menos 4 caracteres"),
});

export const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await login({
          login: values.username.trim(),
          password: values.password,
        });

        if (result.success) {
          casinoToast.success({
            title: "¡Bienvenido!",
            description: "Has iniciado sesión exitosamente.",
          });
          router.push(ROUTES.DASHBOARD);
        } else {
          casinoToast.error({
            title: "Error al iniciar sesión",
            description:
              result.error ||
              "Credenciales incorrectas o usuario no encontrado.",
          });
        }
      } catch {
        casinoToast.error({
          title: "Error inesperado",
          description: "Ocurrió un error al intentar conectarse al servidor.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-stack-md glass-card rounded-xl p-6 md:p-8 shadow-2xl"
        noValidate
      >
        {/* Username */}
        <div className="space-y-1">
          <div className="floating-label-input">
            <input
              id="username"
              name="username"
              type="text"
              placeholder=" "
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              className={`w-full bg-surface-container border rounded-lg px-4 py-4 text-on-surface focus:outline-none transition-all ${
                formik.touched.username && formik.errors.username
                  ? "border-error focus:border-error focus:ring-1 focus:ring-error"
                  : "border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            <label
              htmlFor="username"
              className="floating-label font-label-md text-outline"
            >
              Usuario o Correo
            </label>
          </div>
          {formik.touched.username && formik.errors.username && (
            <p className="text-xs text-error pl-1 font-medium">
              {formik.errors.username}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="floating-label-input relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              className={`w-full bg-surface-container border rounded-lg px-4 py-4 text-on-surface focus:outline-none transition-all pr-12 ${
                formik.touched.password && formik.errors.password
                  ? "border-error focus:border-error focus:ring-1 focus:ring-error"
                  : "border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            <label
              htmlFor="password"
              className="floating-label font-label-md text-outline"
            >
              Contraseña
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-4 text-outline hover:text-primary transition-colors cursor-pointer"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              <span className="material-symbols-outlined">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-xs text-error pl-1 font-medium">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <a
            href="https://wa.link/uibqfs"
            target="_blank"
            className="font-label-sm text-primary hover:opacity-80 transition-opacity"
            rel="noopener noreferrer"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-secondary text-on-secondary font-label-md py-4 rounded-full shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {formik.isSubmitting ? (
            <>
              <LoadingIcon />
              <span>Iniciando sesión...</span>
            </>
          ) : (
            <span>Iniciar Sesión</span>
          )}
        </button>
      </form>
    </section>
  );
};
