import type { ReviewSubmission, VerificationCriterion } from "@shared/types";

export interface MockSubmission extends ReviewSubmission {
  verificationCriteria: VerificationCriterion[];
}

const now = Date.now();

function hoursAgo(h: number): string {
  return new Date(now - h * 3600_000).toISOString();
}

export const mockPendingSubmissions: MockSubmission[] = [
  {
    id: "rev-001",
    missionId: "m-001",
    userId: "u-001",
    userName: "Martina López",
    missionTitle: "Primera recarga del día",
    missionCategory: "daily",
    missionDescription:
      "El usuario debe realizar su primera recarga del día con un monto mínimo de $50 y adjuntar el comprobante correspondiente.",
    submittedAt: hoursAgo(0.5),
    images: ["https://picsum.photos/seed/rev001/400/400"],
    userNote: "¡Listo! Ya hice mi primera recarga de hoy.",
    status: "pending",
    verificationCriteria: [
      {
        label: "La recarga se realizó hoy",
        description:
          "Verificar que la fecha del comprobante coincida con la fecha actual.",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "El monto mínimo se cumple",
        description:
          "Confirmar que el monto de la recarga sea igual o superior a $50.",
        images: ["https://picsum.photos/seed/step001a/400/400"],
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Captura de pantalla visible",
        description:
          "La imagen del comprobante debe ser legible y mostrar todos los datos.",
        images: ["https://picsum.photos/seed/step001b/400/400"],
        passed: false,
        id: crypto.randomUUID(),
      },
      {
        label: "Fecha y hora coinciden",
        description:
          "La hora del comprobante debe estar dentro del rango permitido (00:00-23:59 del día actual).",
        passed: true,
        id: crypto.randomUUID(),
      },
    ],
  },
  {
    id: "rev-002",
    missionId: "m-003",
    userId: "u-002",
    userName: "Santiago Ríos",
    missionTitle: "Compartí en redes sociales",
    missionCategory: "weekly",
    missionDescription:
      "El usuario debe compartir una publicación del casino en sus redes sociales (Facebook, Twitter o Instagram) incluyendo el hashtag oficial.",
    submittedAt: hoursAgo(2),
    images: ["https://picsum.photos/seed/rev002/400/400"],
    userNote: undefined,
    status: "pending",
    verificationCriteria: [
      {
        label: "Publicación visible en el perfil",
        description:
          "La publicación debe estar activa y visible en el perfil público del usuario.",
        images: ["https://picsum.photos/seed/step002a/400/400"],
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Incluye el hashtag oficial",
        description:
          "La publicación debe contener #LuckyBetPremios en el texto o los comentarios.",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "La cuenta es pública",
        description:
          "Verificar que el perfil desde el que se compartió sea de acceso público.",
        passed: false,
        id: crypto.randomUUID(),
      },
      {
        label: "Contenido apropiado",
        description:
          "La publicación no debe contener lenguaje ofensivo, enlaces externos no autorizados ni contenido inapropiado.",
        passed: true,
        id: crypto.randomUUID(),
      },
    ],
  },
  {
    id: "rev-003",
    missionId: "m-007",
    userId: "u-003",
    userName: "Camila Fernández",
    missionTitle: "Ganá 3 manos de Blackjack",
    missionCategory: "fixed",
    missionDescription:
      "El usuario debe ganar al menos 3 manos de Blackjack en una misma sesión de juego y adjuntar capturas de cada mano ganadora.",
    submittedAt: hoursAgo(5),
    images: [
      "https://picsum.photos/seed/rev003a/400/400",
      "https://picsum.photos/seed/rev003b/400/400",
    ],
    userNote:
      "Adjunto capturas de las 3 manos ganadoras. La tercera fue blackjack natural 🃏",
    status: "pending",
    verificationCriteria: [
      {
        label: "Mínimo 3 manos ganadoras",
        description:
          "Verificar que el historial muestre al menos 3 manos ganadoras en la sesión.",
        images: ["https://picsum.photos/seed/step003a/400/400"],
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Capturas de cada mano",
        description:
          "Cada mano ganadora debe tener su propia captura de pantalla legible.",
        images: [
          "https://picsum.photos/seed/step003b/400/400",
          "https://picsum.photos/seed/step003c/400/400",
          "https://picsum.photos/seed/step003d/400/400",
        ],
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Apuesta mínima cumplida",
        description: "Cada mano debe tener una apuesta mínima de $5.",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Misma sesión de juego",
        description:
          "Todas las manos deben pertenecer a la misma sesión de juego (fecha y hora continuas).",
        passed: false,
        id: crypto.randomUUID(),
      },
    ],
  },
  {
    id: "rev-004",
    missionId: "m-012",
    userId: "u-004",
    userName: "Facundo Molina",
    missionTitle: "Torneo de fin de semana",
    missionCategory: "special_event",
    missionDescription:
      "El usuario debe participar en el torneo de fin de semana, jugar al menos 10 rondas y alcanzar una puntuación válida.",
    submittedAt: hoursAgo(12),
    images: [],
    userNote: undefined,
    status: "pending",
    verificationCriteria: [
      {
        label: "Participación registrada en el torneo",
        description:
          "Verificar que el usuario aparezca en la lista de participantes del torneo.",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Jugó al menos 10 rondas",
        description:
          "Confirmar que el historial del torneo muestre 10 o más rondas jugadas.",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Puntuación final visible",
        description:
          "La puntuación final debe estar registrada y ser visible en el resumen del torneo.",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "No usó asistencia externa",
        description:
          "Verificar que no haya señales de uso de software externo o asistentes de juego automatizados.",
        passed: true,
        id: crypto.randomUUID(),
      },
    ],
  },
  {
    id: "rev-005",
    missionId: "m-015",
    userId: "u-005",
    userName: "Valentina Paz",
    missionTitle: "Depósito acumulado semanal",
    missionCategory: "weekly",
    missionDescription:
      "El usuario debe acumular un mínimo de $100 en depósitos durante la semana, con al menos 2 depósitos separados.",
    submittedAt: hoursAgo(24),
    images: ["https://picsum.photos/seed/rev005/400/400"],
    userNote:
      "Deposité $150 durante la semana. Adjunto resumen de transacciones.",
    status: "pending",
    verificationCriteria: [
      {
        label: "Depósito total ≥ $100 semanal",
        description:
          "Sumar todos los depósitos de la semana y verificar que alcancen o superen los $100.",
        images: ["https://picsum.photos/seed/step005a/400/400"],
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Mínimo 2 depósitos separados",
        description:
          "Debe haber al menos 2 transacciones de depósito en días distintos dentro de la semana.",
        passed: false,
        id: crypto.randomUUID(),
      },
      {
        label: "Fechas dentro de la semana",
        description:
          "Verificar que todos los depósitos estén fechados dentro de la semana en curso (lunes a domingo).",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Método de pago verificado",
        description:
          "Confirmar que el método de pago usado esté verificado en la cuenta del usuario.",
        passed: true,
        id: crypto.randomUUID(),
      },
    ],
  },
  {
    id: "rev-006",
    missionId: "m-020",
    userId: "u-006",
    userName: "Benjamín Torres",
    missionTitle: "Jugá 50 manos de póker",
    missionCategory: "daily",
    missionDescription:
      "El usuario debe jugar 50 manos de póker en el día con una apuesta promedio mínima de $5 por mano, sin usar auto-play.",
    submittedAt: hoursAgo(3),
    images: [],
    userNote: undefined,
    status: "pending",
    verificationCriteria: [
      {
        label: "50 manos jugadas en el día",
        description:
          "Verificar que el historial muestre 50 manos de póker jugadas en la fecha actual.",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Apuesta promedio ≥ $5",
        description:
          "Calcular el promedio de apuesta de las 50 manos y confirmar que sea de $5 o más.",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Historial de manos visible",
        description:
          "El historial de manos debe estar accesible y mostrar las 50 manos con sus detalles.",
        images: ["https://picsum.photos/seed/step006a/400/400"],
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Sin uso de auto-play",
        description:
          "Verificar que no haya evidencia de uso de funcionalidad de auto-play o bots.",
        passed: false,
        id: crypto.randomUUID(),
      },
    ],
  },
];

export const mockApprovedSubmissions: MockSubmission[] = [
  {
    id: "rev-010",
    missionId: "m-002",
    userId: "u-007",
    userName: "Agustina Díaz",
    missionTitle: "Primer depósito del mes",
    missionCategory: "fixed",
    missionDescription:
      "El usuario debe realizar su primer depósito del mes por un mínimo de $100 usando transferencia bancaria.",
    submittedAt: hoursAgo(48),
    images: ["https://picsum.photos/seed/rev010/400/400"],
    userNote: "Deposité $200 usando transferencia bancaria.",
    status: "approved",
    verificationCriteria: [
      {
        label: "Depósito mínimo $100",
        description: "Confirmar que el monto del depósito sea de $100 o más.",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Comprobante de transferencia",
        description:
          "El comprobante debe mostrar el monto, la fecha y los datos de la cuenta de destino.",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Cuenta verificada",
        description:
          "La cuenta bancaria del usuario debe estar verificada en el sistema.",
        passed: true,
        id: crypto.randomUUID(),
      },
    ],
  },
  {
    id: "rev-011",
    missionId: "m-005",
    userId: "u-008",
    userName: "Luciana Méndez",
    missionTitle: "Jugá 100 manos de ruleta",
    missionCategory: "daily",
    missionDescription:
      "El usuario debe jugar 100 manos de ruleta en una sesión continua, con una apuesta mínima de $1 por mano.",
    submittedAt: hoursAgo(72),
    images: [],
    userNote: undefined,
    status: "approved",
    verificationCriteria: [
      {
        label: "100 manos jugadas",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Apuesta mínima $1 por mano",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Sesión continua",
        passed: true,
        id: crypto.randomUUID(),
      },
    ],
  },
  {
    id: "rev-012",
    missionId: "m-008",
    userId: "u-009",
    userName: "Tomás Herrera",
    missionTitle: "Evento de slots de oro",
    missionCategory: "special_event",
    missionDescription:
      "El usuario debe participar en el evento especial de slots, realizar 200 tiradas y alcanzar el nivel 3 del evento.",
    submittedAt: hoursAgo(96),
    images: [
      "https://picsum.photos/seed/rev012a/400/400",
      "https://picsum.photos/seed/rev012b/400/400",
    ],
    userNote:
      "Participé en el evento de slots. Hice 200 tiradas y llegué al nivel 3.",
    status: "approved",
    verificationCriteria: [
      {
        label: "Participación en el evento",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "200 tiradas realizadas",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Nivel 3 alcanzado",
        passed: true,
        id: crypto.randomUUID(),
      },
    ],
  },
];

export const mockRejectedSubmissions: MockSubmission[] = [
  {
    id: "rev-020",
    missionId: "m-010",
    userId: "u-010",
    userName: "Ignacio Vargas",
    missionTitle: "Completá tu perfil",
    missionCategory: "fixed",
    missionDescription:
      "El usuario debe completar todos los datos de su perfil: foto, teléfono y datos personales.",
    submittedAt: hoursAgo(36),
    images: [],
    userNote: "Ya completé todos los datos de mi perfil.",
    status: "rejected",
    verificationCriteria: [
      {
        label: "Foto de perfil cargada",
        description:
          "Verificar que el perfil tenga una foto de perfil visible.",
        passed: false,
        id: crypto.randomUUID(),
      },
      {
        label: "Teléfono verificado",
        description:
          "Confirmar que el número de teléfono esté verificado mediante SMS.",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Datos personales completos",
        description:
          "Todos los campos obligatorios del perfil deben estar completos.",
        passed: true,
        id: crypto.randomUUID(),
      },
    ],
  },
  {
    id: "rev-021",
    missionId: "m-018",
    userId: "u-011",
    userName: "Emilia Roldán",
    missionTitle: "Recomendá a un amigo",
    missionCategory: "weekly",
    missionDescription:
      "El usuario debe recomendar LuckyBet a un amigo usando su código de referido. El amigo debe registrarse y hacer un depósito inicial.",
    submittedAt: hoursAgo(60),
    images: ["https://picsum.photos/seed/rev021/400/400"],
    userNote: "Mi amigo Juan se registró con mi código.",
    status: "rejected",
    verificationCriteria: [
      {
        label: "Amigo registrado con código",
        description:
          "Verificar que el amigo se haya registrado usando el código de referido del usuario.",
        passed: true,
        id: crypto.randomUUID(),
      },
      {
        label: "Amigo hizo depósito inicial",
        description:
          "Confirmar que el amigo haya realizado su primer depósito (mínimo $20).",
        passed: false,
        id: crypto.randomUUID(),
      },
      {
        label: "Captura de confirmación",
        description:
          "El usuario debe adjuntar una captura de pantalla que muestre el registro exitoso del amigo.",
        images: ["https://picsum.photos/seed/step021a/400/400"],
        passed: false,
        id: crypto.randomUUID(),
      },
    ],
  },
];

export function getAllMockSubmissions(): MockSubmission[] {
  return [
    ...mockPendingSubmissions,
    ...mockApprovedSubmissions,
    ...mockRejectedSubmissions,
  ];
}
