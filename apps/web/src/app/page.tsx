"use client";

import Link from "next/link";

import { LoginForm } from "@/components/LoginPage/LoginForm";
import { LoginHeader } from "@/components/LoginPage/LoginHeader";

export default function LoginPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center min-h-dvh px-container-padding-mobile md:px-container-padding-desktop py-stack-lg overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-[-10%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="hidden md:block fixed top-1/3 left-1/4 w-48 h-48 bg-tertiary/5 rounded-full blur-[80px] pointer-events-none" />

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <LoginHeader />

        {/* Login Form */}
        <LoginForm />

        {/* Register Link */}
        <section className="mt-auto py-stack-md w-full text-center">
          <p className="font-body-md text-on-surface-variant">
            ¿No tienes cuenta?{" "}
            <Link
              href="/"
              className="text-primary font-label-md ml-1 hover:underline underline-offset-4"
            >
              Regístrate
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
