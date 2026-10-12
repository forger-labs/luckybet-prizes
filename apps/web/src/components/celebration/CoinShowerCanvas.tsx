"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";

export const GOLD_COIN_COLORS = ["#ffc640", "#e3aa00", "#f9bd22", "#ffdf9f"];

/**
 * Triggers a coin shower animation with canvas-confetti.
 * Respects prefers-reduced-motion to avoid motion sickness.
 */
export function triggerCoinShower(): void {
  if (typeof window === "undefined") return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    return;
  }

  // Central burst
  confetti({
    particleCount: 60,
    spread: 90,
    origin: { y: 0.6 },
    colors: GOLD_COIN_COLORS,
    ticks: 200,
    gravity: 1.1,
    scalar: 1.2,
    shapes: ["circle"],
    zIndex: 9999,
  });

  // Left side cannon
  confetti({
    particleCount: 35,
    angle: 60,
    spread: 60,
    origin: { x: 0.05, y: 0.75 },
    colors: GOLD_COIN_COLORS,
    ticks: 200,
    gravity: 1.1,
    scalar: 1.1,
    shapes: ["circle"],
    zIndex: 9999,
  });

  // Right side cannon
  confetti({
    particleCount: 35,
    angle: 120,
    spread: 60,
    origin: { x: 0.95, y: 0.75 },
    colors: GOLD_COIN_COLORS,
    ticks: 200,
    gravity: 1.1,
    scalar: 1.1,
    shapes: ["circle"],
    zIndex: 9999,
  });
}

export function CoinShowerCanvas({ active = false }: { active?: boolean }) {
  useEffect(() => {
    if (active) {
      triggerCoinShower();
    }
  }, [active]);

  return null;
}
