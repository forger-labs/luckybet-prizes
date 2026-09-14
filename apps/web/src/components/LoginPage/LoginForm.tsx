import { useRouter } from "next/navigation";
import { useState } from "react";

import { ROUTES } from "@shared/constants";

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <section className="w-full">
      <form
        onSubmit={handleSubmit}
        className="space-y-stack-md glass-card rounded-xl p-6 md:p-8 shadow-2xl"
      >
        {/* Username */}
        <div className="floating-label-input">
          <input
            id="username"
            type="text"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <label
            htmlFor="username"
            className="floating-label font-label-md text-outline"
          >
            Usuario o Correo
          </label>
        </div>

        {/* Password */}
        <div className="floating-label-input">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-12"
          />
          <label
            htmlFor="password"
            className="floating-label font-label-md text-outline"
          >
            Contraseña
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-4 text-outline hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <a
            href="https://wa.link/uibqfs"
            target="_blank"
            className="font-label-sm text-primary hover:opacity-80 transition-opacity"
            rel="noopener"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-secondary text-on-secondary font-label-md py-4 rounded-full shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all font-bold"
        >
          Iniciar Sesión
        </button>
      </form>
    </section>
  );
};
