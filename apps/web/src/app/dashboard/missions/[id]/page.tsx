"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { TopAppBar } from "@/components/TopAppBar/TopAppBar";

const missionData: Record<
  string,
  {
    id: string;
    name: string;
    reward: string;
    icon: string;
    color: string;
    steps: string[];
    description: string;
    image: string;
  }
> = {
  instagram: {
    id: "i-1",
    name: "Instagram Explorer",
    reward: "6.000 fichas",
    icon: "camera",
    color: "#E1306C",
    description: "Completá los pasos para reclamar tu botín real.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtDQiDEy5gi2rPeLo-4jVny7N8PBMHtLtqF74vQIdq9JGmBlPUbynFVgN0fHX9cUc-ubavyBqrgDM1em2v0H1yM5N_bnVQr6DESWw02I37iuTUKQes2a91m7TwO2w8UR9cHpvv_AiVW9SJ_wTMAE0CKL0EoMWFUgeHQ5tOTm4GNQUVMZghDRqvg_MTOhP3H87ijPtz88fGpHq1wAcnsXCD1NmSKEMAgZQl53LoJXHnRySax6fBznu5_G-Ny8e-xh20YCIyUZmJyKJ4",
    steps: [
      "Seguir la cuenta",
      "Comentar algo positivo",
      "Activar notificaciones",
    ],
  },
  telegram: {
    id: "t-1",

    name: "Telegram Explorer",
    reward: "4.500 fichas",
    icon: "send",
    color: "#0088cc",
    description:
      "Unite al canal y activá las notificaciones para recibir tu recompensa.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkSkzErHPVB2v-2XLuFWNEj2muBqY1r_epJ1FKc4l2ZDpMJQA8pC4zICxBBnmYhUohPpwhGaupOxgAehubgFLsf1DjAtmefs4XikobHbJNahMG0gT6VHUTZVJcatpXVgivZxFb7TK3W4qyz6jwDntOBZ6unIhQGsDR7lXwfovJSVixPI9uiOJed9x5pdShz-7ZpxXWW5lWveFHr89yRhiJK3jk4x8WeAa-mAtTsVVLLvf8mvJglJPUhu_WoXW82CCUtyVSabZlS480",
    steps: ["Unirse al canal", "Activar notificaciones", "Escribir un saludo"],
  },
  whatsapp: {
    id: "w-1",

    name: "WhatsApp Challenge",
    reward: "3.000 fichas",
    icon: "chat",
    color: "#25D366",
    description: "Compartí y ayudanos a crecer en WhatsApp.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkSkzErHPVB2v-2XLuFWNEj2muBqY1r_epJ1FKc4l2ZDpMJQA8pC4zICxBBnmYhUohPpwhGaupOxgAehubgFLsf1DjAtmefs4XikobHbJNahMG0gT6VHUTZVJcatpXVgivZxFb7TK3W4qyz6jwDntOBZ6unIhQGsDR7lXwfovJSVixPI9uiOJed9x5pdShz-7ZpxXWW5lWveFHr89yRhiJK3jk4x8WeAa-mAtTsVVLLvf8mvJglJPUhu_WoXW82CCUtyVSabZlS480",
    steps: ["Compartir el link", "Enviar a 3 contactos", "Capturar pantalla"],
  },
  twitter: {
    id: "tw-1",

    name: "Twitter/X Explorer",
    reward: "2.500 fichas",
    icon: "x",
    color: "#1da1f2",
    description: "Seguinos en X y participá de la conversación.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkSkzErHPVB2v-2XLuFWNEj2muBqY1r_epJ1FKc4l2ZDpMJQA8pC4zICxBBnmYhUohPpwhGaupOxgAehubgFLsf1DjAtmefs4XikobHbJNahMG0gT6VHUTZVJcatpXVgivZxFb7TK3W4qyz6jwDntOBZ6unIhQGsDR7lXwfovJSVixPI9uiOJed9x5pdShz-7ZpxXWW5lWveFHr89yRhiJK3jk4x8WeAa-mAtTsVVLLvf8mvJglJPUhu_WoXW82CCUtyVSabZlS480",
    steps: ["Seguir la cuenta", "Retuitear un post", "Comentar"],
  },
};

export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const mission = missionData[id];

  if (!mission) {
    return (
      <div className="min-h-dvh bg-background flex items-center justify-center">
        <TopAppBar />
        <div className="text-center pt-20">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            Misión no encontrada
          </h2>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="mt-4 bg-secondary text-on-secondary font-label-md px-6 py-3 rounded-full active-scale"
          >
            Volver al tablero
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <TopAppBar />

      {/* Ambient glows */}
      <div className="fixed top-0 right-0 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="fixed bottom-0 left-0 -z-10 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />

      <main className="pt-20 pb-24 md:pb-16 px-container-padding-mobile md:px-container-padding-desktop">
        <div className="max-w-5xl mx-auto">
          {/* Desktop back button */}
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="hidden md:flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 font-label-md"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Volver al tablero
          </button>

          {/* Desktop 2-column layout */}
          <div className="md:grid md:grid-cols-5 md:gap-gutter md:items-start">
            {/* Left column — Hero (spans 3 cols on desktop) */}
            <div className="md:col-span-3">
              {/* Mission Hero */}
              <div className="relative mt-4 md:mt-0 mb-8">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-3xl blur-2xl" />
                <div className="relative glass-card rounded-3xl p-8 flex flex-col items-center text-center overflow-hidden md:p-10">
                  {/* Icon */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform rotate-3 active-scale"
                    style={{
                      background: `linear-gradient(135deg, #ffdf9f 0%, #ffc640 100%)`,
                      boxShadow: `0 0 20px rgba(255, 198, 64, 0.25)`,
                    }}
                  >
                    <Image
                      alt={`${mission.name} icon`}
                      className="w-12 h-12"
                      src={mission.image}
                      width={48}
                      height={48}
                    />
                  </div>
                  <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold mb-2">
                    {mission.name}
                  </h2>
                  <p className="font-body-md text-on-surface-variant mb-6">
                    {mission.description}
                  </p>

                  {/* Reward Badge */}
                  <div className="bg-secondary-container/20 border border-secondary/30 rounded-full px-6 py-2 flex items-center gap-2 mb-2">
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      military_tech
                    </span>
                    <span className="font-title-md text-title-md text-secondary font-bold">
                      {mission.reward}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — Checklist + Actions (spans 2 cols on desktop) */}
            <div className="md:col-span-2 md:pt-4">
              {/* Checklist */}
              <section className="w-full space-y-4 mb-stack-lg">
                <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest pl-2">
                  Pasos a seguir
                </h3>
                <div className="space-y-3">
                  {mission.steps.map((step) => (
                    <ChecklistItem key={`${step}-${mission.id}`} label={step} />
                  ))}
                </div>
              </section>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full h-14 bg-secondary text-on-secondary-container font-title-md rounded-xl flex items-center justify-center gap-2 glow-gold active:scale-[0.98] transition-all hover:brightness-110"
                >
                  <span className="material-symbols-outlined">open_in_new</span>
                  Ir a la red
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="w-full h-14 bg-surface-container-high text-on-surface-variant font-label-md rounded-xl flex items-center justify-center active:scale-[0.98] transition-all hover:bg-surface-variant border border-outline-variant/30"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ───── Checklist Item Component ───── */
function ChecklistItem({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="w-full glass-card rounded-xl p-4 flex items-center gap-4 group hover:bg-surface-container-high transition-all text-left"
    >
      <div className="w-6 h-6 rounded-full border-2 border-primary/40 flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
        <span className="material-symbols-outlined text-primary text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">
          check
        </span>
      </div>
      <span className="font-body-md text-on-surface">{label}</span>
    </button>
  );
}
