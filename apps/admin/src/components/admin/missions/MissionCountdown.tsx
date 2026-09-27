"use client";

import { useEffect, useState } from "react";

import type { MissionCountdownProps } from "@/types/missions/MissionPreview";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isExpired: boolean;
}

function calculateTimeLeft(
  expiresAt?: string,
  activatedAt?: string,
  type?: string,
): TimeLeft {
  let targetDate: Date | null = null;

  if (expiresAt) {
    targetDate = new Date(expiresAt);
  } else if (activatedAt && type) {
    const act = new Date(activatedAt).getTime();
    if (type === "daily") {
      targetDate = new Date(act + 24 * 60 * 60 * 1000);
    } else if (type === "weekly") {
      targetDate = new Date(act + 7 * 24 * 60 * 60 * 1000);
    }
  }

  if (!targetDate || Number.isNaN(targetDate.getTime())) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isExpired: false,
    };
  }

  const diffMs = targetDate.getTime() - Date.now();

  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isExpired: true,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalSeconds, isExpired: false };
}

export function MissionCountdown({
  expiresAt,
  activatedAt,
  type,
  className = "",
}: MissionCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(expiresAt, activatedAt, type),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiresAt, activatedAt, type));
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, activatedAt, type]);

  if (timeLeft.isExpired) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-error-container/30 text-error border border-error/30 ${className}`}
      >
        <span className="material-symbols-outlined text-xs">timer_off</span>
        <span>Expirada</span>
      </span>
    );
  }

  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    if (type === "fixed") {
      return (
        <span className="text-[11px] text-outline flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">
            all_inclusive
          </span>
          <span>Permanente</span>
        </span>
      );
    }
    return null;
  }

  // Visual urgency styling
  const isCritical = timeLeft.totalSeconds < 3600; // < 1 hora (rojo pulsante)
  const isWarning = timeLeft.totalSeconds < 21600; // < 6 horas (dorado)

  let badgeStyle =
    "bg-primary/15 text-primary border-primary/30 shadow-[0_0_8px_rgba(56,189,248,0.15)]";
  let iconName = "timer";

  if (isCritical) {
    badgeStyle =
      "bg-error-container/30 text-error border-error/40 shadow-[0_0_10px_rgba(255,180,171,0.25)] animate-pulse";
    iconName = "alarm";
  } else if (isWarning) {
    badgeStyle =
      "bg-secondary/15 text-secondary border-secondary/30 shadow-[0_0_10px_rgba(255,198,64,0.2)]";
    iconName = "hourglass_top";
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  const formattedTime =
    timeLeft.days > 0
      ? `${timeLeft.days}d ${pad(timeLeft.hours)}h ${pad(timeLeft.minutes)}m`
      : `${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold border transition-all ${badgeStyle} ${className}`}
      title={`Tiempo restante: ${formattedTime}`}
    >
      <span className="material-symbols-outlined text-xs">{iconName}</span>
      <span>{formattedTime}</span>
    </span>
  );
}

MissionCountdown.displayName = "MissionCountdown";
