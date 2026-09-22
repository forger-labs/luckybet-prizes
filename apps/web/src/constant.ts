export const LOCAL_STORAGE_KEYS = {
  token: "ig_token",
  accessToken: "ig_token",
  refreshToken: "",
};

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3030";

export const LUCKYBET_API_URL =
  process.env.NEXT_PUBLIC_LUCKYBET_API_URL ??
  "https://api.luckybet.site/?act=command&area=cmd";

export const LUCKYBET_DOMAIN =
  process.env.NEXT_PUBLIC_LUCKYBET_DOMAIN ?? "luckybet.site";

export const LUCKYBET_VERSION = 9;

export const TOKEN_CHECK_INTERVAL_MS = 60_000;

import type { GameItem } from "@/types/dashboard";

export const DEFAULT_FEATURED_GAMES: GameItem[] = [
  {
    id: "vs20olympgate",
    title: "Gates of Olympus",
    category: "Pragmatic Play",
    tag: "POPULAR",
    tagColor: "gold",
    activePlayers: 480,
    jackpot: "50.000 Fichas",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAWMpaIeCVh-NuniELi-p1JSyNHS-doWaZYRDNlIUHObxmKAt1PNNz2h8y4sB1S8ZIB2Oud5DZbymM8y_PYd-kIh00339IlrL_1zgVRrTJssnrCRLcNWUA22JeaMRbbUiH4t2Vdk7UThKro5PEIX3k4u28G4x91l64ksfwNjeh1oUDoBFGrGQt4lmLsAoUruVGoxMr-agHF-WYP7fY7MWMpZHf54mOpK7_ehtl9enrZf2N_C-3ecP5VOGgJ1-VjJPVugl0TaPkYAES",
    alt: "Gates of Olympus tragamonedas",
  },
  {
    id: "roulette-vip",
    title: "Nautical Roulette",
    category: "Ruleta en Vivo",
    tag: "HOT 🔥",
    tagColor: "cyan",
    activePlayers: 210,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2U-QteezK4BQ6uV657KeKXtZVWRmVkcoMs8e4N10W3p6tfgHLovJhcHr_oLQHF5y0gBKnk-hLwAxPJvBHG-r9HHNbvJEA5LT_XwNd_cXZ78dkoH_DnwrP3OjbTz-XXvN1B8PrJf9060Swi-HdPVGG-jdzHIX0FUxJ_HG5wODiuY1xzdJ4n-PgH6H4q9H0mhcwbKWiyJHs6shTxe72aNOtliy9n9AB1qK0_HmKMKNsfa8BFQcnS9m_ICnGjKX-9vwWyKLHW4mTenqc",
    alt: "Ruleta de casino premium",
  },
  {
    id: "blackjack-vip",
    title: "Blackjack Harbor",
    category: "Cartas VIP",
    tag: "VIP",
    tagColor: "purple",
    activePlayers: 185,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAX2cJbGzNF9jDdABZhs7cPnAkrDD-sG1gTlXiWjpezTiiSyaN0Fkmo-AzDLHJdJnMLk-4jYCSlijHvNqhwFTshkUzhkXuCV4ZB-BkK8oovwynHg4kmRTcdlfjl32c3u9ZNkOkRV_KJaiOpVzKRzRDCUz4ZfoTx92xjkAvRXDWakyj-nelnz3NYLzfXA-zQ9nlYcnYm1a8vk3flZO8sFdipd23MCfwTWGGa4xDvivmlF-5WZUwcgTHMPdRfLD9YUS23QS_KCMdfUOwC",
    alt: "Cartas de blackjack VIP",
  },
  {
    id: "sweet-bonanza",
    title: "Sweet Bonanza",
    category: "Pragmatic Play",
    tag: "NUEVO",
    tagColor: "emerald",
    activePlayers: 320,
    jackpot: "120.000 Fichas",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkQx2Mp44plPAiopDRzV_TXgKtR1zwJg-KrHsCnS_-DyxJwOFMKRwG3o8p2wuDoBLUa-fyYwzP4kRxHx25zl7g2Et6MiieB0DryUQLhkohZf5JeMjYs8NjLNJobNjv5vJ75T1gmSRdGk352kKvDiftJgiZnVxS5lMiCLnmX-uMgoaK5Izr3GH165pAxMUwJXmOTJm4k3PUztMgw66WcIDv9_JCfQ5YKES8YYLZSOmYZnT1oeM6XBx-4Ror4PWwn5XrY2SAdcK79k2D",
    alt: "Sweet Bonanza tragamonedas",
  },
  {
    id: "sugar-rush",
    title: "Sugar Rush 1000",
    category: "Pragmatic Play",
    tag: "POPULAR",
    tagColor: "gold",
    activePlayers: 290,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAWMpaIeCVh-NuniELi-p1JSyNHS-doWaZYRDNlIUHObxmKAt1PNNz2h8y4sB1S8ZIB2Oud5DZbymM8y_PYd-kIh00339IlrL_1zgVRrTJssnrCRLcNWUA22JeaMRbbUiH4t2Vdk7UThKro5PEIX3k4u28G4x91l64ksfwNjeh1oUDoBFGrGQt4lmLsAoUruVGoxMr-agHF-WYP7fY7MWMpZHf54mOpK7_ehtl9enrZf2N_C-3ecP5VOGgJ1-VjJPVugl0TaPkYAES",
    alt: "Sugar Rush 1000 tragamonedas",
  },
];
