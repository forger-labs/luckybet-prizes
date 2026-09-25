"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { MissionDetailHero } from "@/components/mission/molecules/MissionDetailHero";
import { MissionStepChecklist } from "@/components/mission/molecules/MissionStepChecklist";
import { BoltIcon, ChevronLeftIcon, SparklesIcon } from "@/icons";
import type { MissionDetailData } from "@/types/missions";

const MISSIONS_MAP: Record<string, MissionDetailData> = {
  instagram: {
    id: "instagram",
    key: "instagram",
    name: "Seguir en Instagram",
    category: "daily",
    platform: "instagram",
    rewardCoins: 500,
    rewardXp: 150,
    rewardFormatted: "500 Fichas",
    xpFormatted: "+150 XP",
    icon: "photo_camera",
    color: "#e11d48",
    description:
      "Sigue la cuenta oficial de LuckyBet en Instagram para mantenerte al día con las promociones exclusivas y sorteos.",
    longDescription:
      "Conviértete en un seguidor destacado de LuckyBet en Instagram. Entérate de todos los eventos, sorteos relámpago de fichas, nuevos lanzamientos de tragamonedas y torneos exclusivos de la comunidad.",
    status: "completed",
    expiresIn: "Expira en 18h",
    actionUrl: "https://instagram.com/luckybet",
    actionLabel: "Abrir Instagram",
    verificationNote:
      "La verificación de seguimiento se sincroniza automáticamente con tu perfil social enlazado.",
    steps: [
      {
        id: "s1",
        number: "01",
        label: "Seguir a @LuckyBetOficial",
        description: "Abre la aplicación de Instagram y presiona Seguir",
        completed: true,
      },
      {
        id: "s2",
        number: "02",
        label: "Dar 'Me gusta' a la publicación fijada",
        description: "Interactúa con la última publicación del feed",
        completed: true,
      },
      {
        id: "s3",
        number: "03",
        label: "Activar notificaciones de publicaciones",
        description: "No te pierdas los códigos de regalo sorpresa",
        completed: true,
      },
    ],
  },
  telegram: {
    id: "telegram",
    key: "telegram",
    name: "Unirse al canal de Telegram",
    category: "daily",
    platform: "telegram",
    rewardCoins: 750,
    rewardXp: 200,
    rewardFormatted: "750 Fichas",
    xpFormatted: "+200 XP",
    icon: "send",
    color: "#0284c7",
    description:
      "Únete al canal oficial de Telegram y recibe alertas inmediatas de torneos, códigos de bono y eventos especiales.",
    longDescription:
      "El canal VIP de Telegram es donde se publican primero los bonos especiales, multiplicadores de depósito y tiradas gratis. Únete ahora y reclama tu bono inicial.",
    status: "available",
    expiresIn: "Expira en 22h",
    actionUrl: "https://t.me/luckybet_oficial",
    actionLabel: "Unirse a Telegram",
    verificationNote:
      "Una vez dentro del canal, el bot de LuckyBet acreditará tus fichas automáticamente en menos de 2 minutos.",
    steps: [
      {
        id: "t1",
        number: "01",
        label: "Unirse al canal oficial de Telegram",
        description: "Haz clic en el enlace y pulsa 'Unirme'",
        completed: false,
      },
      {
        id: "t2",
        number: "02",
        label: "Activar notificaciones del canal",
        description: "Mantén el canal sin silenciar para recibir códigos",
        completed: false,
      },
      {
        id: "t3",
        number: "03",
        label: "Enviar /claim en el bot de bienvenida",
        description: "Verifica tu nombre de usuario para reclamar el botín",
        completed: false,
      },
    ],
  },
  whatsapp: {
    id: "whatsapp",
    key: "whatsapp",
    name: "Compartir en WhatsApp",
    category: "daily",
    platform: "whatsapp",
    rewardCoins: 300,
    rewardXp: 100,
    rewardFormatted: "300 Fichas",
    xpFormatted: "+100 XP",
    icon: "chat",
    color: "#16a34a",
    description:
      "Comparte LuckyBet con tus amigos de WhatsApp y ambos recibirán un paquete de bienvenida en fichas.",
    longDescription:
      "Envía tu enlace de recomendación a tus grupos o contactos de confianza en WhatsApp. Por cada amigo que ingrese, se desbloquearán tiradas y fichas extras.",
    status: "available",
    expiresIn: "Expira en 14h",
    actionUrl: "https://wa.me/?text=Unete%20a%20LuckyBet",
    actionLabel: "Compartir en WhatsApp",
    verificationNote:
      "Las recompensas se acreditan tan pronto como se comparta el enlace con al menos un contacto.",
    steps: [
      {
        id: "w1",
        number: "01",
        label: "Generar enlace de invitación",
        description: "Copia tu enlace personal con código de regalo",
        completed: true,
      },
      {
        id: "w2",
        number: "02",
        label: "Enviar a 3 amigos o un grupo de juego",
        description: "Comparte la emoción del casino en vivo",
        completed: false,
      },
      {
        id: "w3",
        number: "03",
        label: "Confirmar envío",
        description: "Regresa a esta ventana para reclamar",
        completed: false,
      },
    ],
  },
  twitter: {
    id: "twitter",
    key: "twitter",
    name: "Seguir en Twitter / X",
    category: "daily",
    platform: "twitter",
    rewardCoins: 400,
    rewardXp: 120,
    rewardFormatted: "400 Fichas",
    xpFormatted: "+120 XP",
    icon: "flutter_dash",
    color: "#0284c7",
    description:
      "Sigue a LuckyBet en Twitter/X y retuitea el post fijado para participar en los sorteos semanales de saldo.",
    longDescription:
      "Participa en la comunidad global de Twitter/X. Interactúa con las encuestas de nuevos juegos y sorteos de giros gratis semanales.",
    status: "available",
    expiresIn: "Expira en 20h",
    actionUrl: "https://x.com/luckybet",
    actionLabel: "Abrir Twitter / X",
    verificationNote:
      "Sincroniza tu @handle para verificar la acción de forma instantánea.",
    steps: [
      {
        id: "x1",
        number: "01",
        label: "Seguir a @LuckyBetCasino",
        description: "Presiona el botón de seguir en el perfil",
        completed: false,
      },
      {
        id: "x2",
        number: "02",
        label: "Retuitear el post del torneo actual",
        description: "Comparte con tus seguidores la tabla de clasificación",
        completed: false,
      },
    ],
  },
  profile: {
    id: "profile",
    key: "profile",
    name: "Completar Perfil y Teléfono",
    category: "fixed",
    platform: "profile",
    rewardCoins: 1200,
    rewardXp: 300,
    rewardFormatted: "1.200 Fichas",
    xpFormatted: "+300 XP",
    icon: "badge",
    color: "#7c3aed",
    description:
      "Asegura tu cuenta verificando tu número telefónico y completando tus preferencias de juego.",
    longDescription:
      "Un perfil completamente verificado protege tus ganancias, acelera las solicitudes de retiro en el cajero y desbloquea el estatus VIP Harbor.",
    status: "in_progress",
    actionUrl: "/dashboard",
    actionLabel: "Ir a Mi Perfil",
    verificationNote:
      "Tu número de teléfono se validará a través de un código SMS de 6 dígitos.",
    steps: [
      {
        id: "p1",
        number: "01",
        label: "Ingresar número de WhatsApp / Teléfono",
        description: "Formato internacional válido (+54, +56, etc.)",
        completed: true,
      },
      {
        id: "p2",
        number: "02",
        label: "Verificar código de seguridad SMS",
        description: "Ingresa los 6 dígitos recibidos",
        completed: true,
      },
      {
        id: "p3",
        number: "03",
        label: "Establecer avatar y apodo de juego",
        description: "Personaliza cómo te ven en el ranking",
        completed: false,
      },
    ],
  },
  referral: {
    id: "referral",
    key: "referral",
    name: "Invitar a un Amigo",
    category: "fixed",
    platform: "referral",
    rewardCoins: 2500,
    rewardXp: 500,
    rewardFormatted: "2.500 Fichas",
    xpFormatted: "+500 XP",
    icon: "group_add",
    color: "#ea580c",
    description:
      "Invita a un amigo a registrarse con tu código y recibe recompensas automáticas por sus primeras partidas.",
    longDescription:
      "El programa de afiliados de LuckyBet te premia con un 5% de comisión continua en fichas por cada partida jugada por tus invitados.",
    status: "in_progress",
    actionUrl: "/dashboard",
    actionLabel: "Copiar Enlace de Referido",
    verificationNote:
      "La recompensa se liberará cuando tu amigo complete su primera sesión de juego.",
    steps: [
      {
        id: "r1",
        number: "01",
        label: "Compartir tu código de referido",
        description: "Envía tu enlace personalizado a un contacto",
        completed: true,
      },
      {
        id: "r2",
        number: "02",
        label: "El amigo completa su registro",
        description: "Debe crear una cuenta con tu código de invitado",
        completed: false,
      },
      {
        id: "r3",
        number: "03",
        label: "Primera partida jugada",
        description: "Gana 2.500 fichas al instante de su primera apuesta",
        completed: false,
      },
    ],
  },
  "first-deposit": {
    id: "first-deposit",
    key: "first-deposit",
    name: "Primer Depósito en Cajero",
    category: "fixed",
    platform: "deposit",
    rewardCoins: 5000,
    rewardXp: 1000,
    rewardFormatted: "5.000 Fichas",
    xpFormatted: "+1000 XP",
    icon: "account_balance_wallet",
    color: "#059669",
    description:
      "Realiza tu primer depósito en el cajero oficial y activa el multiplicador de bono de bienvenida del 100%.",
    longDescription:
      "Duplica tu saldo inicial con el paquete de bienvenida para nuevos jugadores. Recibe 5.000 fichas de bonificación y una insignia de jugador fundador.",
    status: "completed",
    actionUrl: "/dashboard",
    actionLabel: "Abrir Cajero",
    verificationNote:
      "Los depósitos se procesan de forma instantánea a través del cajero verificado de LuckyBet.",
    steps: [
      {
        id: "d1",
        number: "01",
        label: "Seleccionar método de pago",
        description: "Transferencia bancaria, tarjeta o billetera virtual",
        completed: true,
      },
      {
        id: "d2",
        number: "02",
        label: "Acreditar monto mínimo de bienvenida",
        description: "Acreditación directa 1:1 en tu billetera",
        completed: true,
      },
      {
        id: "d3",
        number: "03",
        label: "Reclamar 5.000 fichas y bono de nivel",
        description: "¡Bono asignado exitosamente!",
        completed: true,
      },
    ],
  },
};

export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "";

  const mission = MISSIONS_MAP[id] || {
    id,
    key: id,
    name: `Misión: ${id}`,
    category: "daily",
    platform: "special",
    rewardCoins: 1000,
    rewardXp: 200,
    rewardFormatted: "1.000 Fichas",
    xpFormatted: "+200 XP",
    icon: "stars",
    color: "#0284c7",
    description:
      "Completa los objetivos de este desafío para ganar tus fichas.",
    longDescription:
      "Esta misión especial pone a prueba tus habilidades en las mesas y tragamonedas de Midnight Harbor.",
    status: "available",
    actionLabel: "Iniciar Misión",
    steps: [
      {
        id: "gen-1",
        number: "01",
        label: "Aceptar el desafío",
        description: "Confirma tu participación",
        completed: true,
      },
      {
        id: "gen-2",
        number: "02",
        label: "Cumplir con el objetivo del juego",
        description: "Juega según las reglas especificadas",
        completed: false,
      },
    ],
  };

  const [steps, setSteps] = useState(mission.steps);

  const handleToggleStep = (stepId: string) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id === stepId ? { ...s, completed: !s.completed } : s,
      ),
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-stack-md">
      {/* Back to Missions Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/dashboard/missions")}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#dae2fd] hover:text-[#38bdf8] transition-colors cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#171f33] border-2 border-[#2d3449] flex items-center justify-center group-hover:border-[#38bdf8] group-hover:bg-[#222a3d] transition-all shadow-sm">
            <ChevronLeftIcon className="w-4 h-4 text-white group-hover:text-[#38bdf8] transition-colors" />
          </div>
          <span>Volver a Misiones</span>
        </button>

        <span className="text-xs text-[#87929a] font-bold">
          ID: #{mission.id}
        </span>
      </div>

      {/* Solid Casino Hero Section */}
      <MissionDetailHero mission={mission} />

      {/* Grid: Step Progression Checklist + Action CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Step Checklist (Spans 8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-[#171f33] border-2 border-[#2d3449] shadow-[0_4px_25px_rgba(0,0,0,0.5)] space-y-5">
          <MissionStepChecklist
            steps={steps}
            onToggleStep={handleToggleStep}
            accentColor="#38bdf8"
            verificationNote={mission.verificationNote}
          />
        </div>

        {/* Right: Actions CTA (Spans 4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-[#171f33] border-2 border-[#ffc640]/40 shadow-[0_4px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(255,198,64,0.1)] space-y-4">
            <div className="flex items-center gap-2 text-[#ffc640]">
              <SparklesIcon className="w-4 h-4 text-[#ffc640]" />
              <span className="text-xs uppercase font-black tracking-wider">
                Recompensa Garantizada
              </span>
            </div>

            <div className="space-y-1">
              <p className="font-(--font-plus-jakarta-sans) text-2xl sm:text-3xl font-black text-[#ffc640] tracking-tight">
                +{mission.rewardCoins.toLocaleString("es-ES")}
              </p>
              <p className="text-xs text-[#bdc8d1] font-medium">
                Fichas acreditadas inmediatamente a tu balance al completar
                todos los pasos.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              {mission.actionUrl && (
                <motion.a
                  href={mission.actionUrl}
                  target={
                    mission.actionUrl.startsWith("http") ? "_blank" : "_self"
                  }
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#ffc640] hover:bg-[#ffdf9f] text-[#402d00] font-(--font-plus-jakarta-sans) text-sm sm:text-base font-black border-2 border-[#ffdf9f] shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BoltIcon className="w-4 h-4 text-[#402d00]" />
                  <span>{mission.actionLabel || "Iniciar Misión"}</span>
                </motion.a>
              )}

              <button
                type="button"
                onClick={() => router.push("/dashboard/missions")}
                className="w-full py-3 px-6 rounded-2xl bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] font-(--font-be-vietnam-pro) text-xs sm:text-sm font-bold border-2 border-[#3e484f] transition-all text-center cursor-pointer"
              >
                Cerrar y volver
              </button>
            </div>
          </div>

          {/* Tips Box */}
          <div className="p-5 rounded-2xl bg-[#131b2e] border-2 border-[#2d3449] text-xs text-[#bdc8d1] space-y-1.5">
            <p className="font-bold text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#38bdf8]">
                info
              </span>
              Consejo de Casino
            </p>
            <p className="leading-relaxed">
              Las misiones diarias se reinician a las 00:00 UTC. Asegúrate de
              reclamar tus recompensas antes del reinicio diario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
