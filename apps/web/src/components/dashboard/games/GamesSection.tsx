"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { GameItem } from "@/types/dashboard";
import { GameCard } from "./GameCard";

const GAMES: GameItem[] = [
  {
    id: "slots-1",
    title: "Midnight Slots",
    category: "Tragamonedas",
    tag: "JACKPOT",
    tagColor: "gold",
    activePlayers: 342,
    jackpot: "50.000 Fichas",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAWMpaIeCVh-NuniELi-p1JSyNHS-doWaZYRDNlIUHObxmKAt1PNNz2h8y4sB1S8ZIB2Oud5DZbymM8y_PYd-kIh00339IlrL_1zgVRrTJssnrCRLcNWUA22JeaMRbbUiH4t2Vdk7UThKro5PEIX3k4u28G4x91l64ksfwNjeh1oUDoBFGrGQt4lmLsAoUruVGoxMr-agHF-WYP7fY7MWMpZHf54mOpK7_ehtl9enrZf2N_C-3ecP5VOGgJ1-VjJPVugl0TaPkYAES",
    alt: "Tragamonedas vibrante con temática náutica",
  },
  {
    id: "roulette-1",
    title: "Nautical Roulette",
    category: "Ruleta en Vivo",
    tag: "HOT 🔥",
    tagColor: "cyan",
    activePlayers: 189,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2U-QteezK4BQ6uV657KeKXtZVWRmVkcoMs8e4N10W3p6tfgHLovJhcHr_oLQHF5y0gBKnk-hLwAxPJvBHG-r9HHNbvJEA5LT_XwNd_cXZ78dkoH_DnwrP3OjbTz-XXvN1B8PrJf9060Swi-HdPVGG-jdzHIX0FUxJ_HG5wODiuY1xzdJ4n-PgH6H4q9H0mhcwbKWiyJHs6shTxe72aNOtliy9n9AB1qK0_HmKMKNsfa8BFQcnS9m_ICnGjKX-9vwWyKLHW4mTenqc",
    alt: "Ruleta de casino premium con detalles dorados",
  },
  {
    id: "blackjack-1",
    title: "Blackjack Harbor",
    category: "Cartas VIP",
    tag: "POPULAR",
    tagColor: "purple",
    activePlayers: 254,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAX2cJbGzNF9jDdABZhs7cPnAkrDD-sG1gTlXiWjpezTiiSyaN0Fkmo-AzDLHJdJnMLk-4jYCSlijHvNqhwFTshkUzhkXuCV4ZB-BkK8oovwynHg4kmRTcdlfjl32c3u9ZNkOkRV_KJaiOpVzKRzRDCUz4ZfoTx92xjkAvRXDWakyj-nelnz3NYLzfXA-zQ9nlYcnYm1a8vk3flZO8sFdipd23MCfwTWGGa4xDvivmlF-5WZUwcgTHMPdRfLD9YUS23QS_KCMdfUOwC",
    alt: "Cartas clásicas de blackjack sobre tapete azul marino",
  },
  {
    id: "poker-1",
    title: "Deep Sea Poker",
    category: "Torneo",
    tag: "NUEVO",
    tagColor: "emerald",
    activePlayers: 118,
    jackpot: "120.000 Fichas",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkQx2Mp44plPAiopDRzV_TXgKtR1zwJg-KrHsCnS_-DyxJwOFMKRwG3o8p2wuDoBLUa-fyYwzP4kRxHx25zl7g2Et6MiieB0DryUQLhkohZf5JeMjYs8NjLNJobNjv5vJ75T1gmSRdGk352kKvDiftJgiZnVxS5lMiCLnmX-uMgoaK5Izr3GH165pAxMUwJXmOTJm4k3PUztMgw66WcIDv9_JCfQ5YKES8YYLZSOmYZnT1oeM6XBx-4Ror4PWwn5XrY2SAdcK79k2D",
    alt: "Escena dramática de póker con fichas y escalera real",
  },
];

export const GamesSection = () => {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-primary font-semibold">
              Salas Activas
            </span>
          </div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-xl md:text-2xl font-bold text-on-surface">
            Acceso Rápido
          </h2>
          <p className="text-on-surface-variant text-xs sm:text-sm">
            Entra a tus mesas y tragamonedas favoritas al instante
          </p>
        </div>

        <Link
          href="/dashboard/missions"
          className="group inline-flex items-center gap-1.5 text-primary hover:text-primary-container font-label-md text-xs sm:text-sm font-semibold transition-colors py-1"
        >
          <span>Ver todos los juegos</span>
          <span className="transform transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* Grid of Games */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-gutter">
        {GAMES.map((game, idx) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: idx * 0.08,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            <GameCard {...game} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
