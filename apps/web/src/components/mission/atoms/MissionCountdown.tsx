"use client";

import { useEffect, useState } from "react";

import { ClockIcon } from "@/icons";
import type { MissionCountdownProps } from "@/types/missions";

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
    const normalizedType = type.toLowerCase();
    if (normalizedType === "daily") {
      targetDate = new Date(act + 24 * 60 * 60 * 1000);
    } else if (normalizedType === "weekly") {
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
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#ffb4ab]/15 text-[#ffb4ab] border border-[#ffb4ab]/30 ${className}`}
      >
        <span className="material-symbols-outlined text-sm">timer_off</span>
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
    if (type?.toLowerCase() === "fixed") {
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#171f33]/90 text-[#87929a] border border-[#3e484f]/40 ${className}`}
        >
          <span className="material-symbols-outlined text-sm">
            all_inclusive
          </span>
          <span>Permanente</span>
        </span>
      );
    }
    return null;
  }

  const isCritical = timeLeft.totalSeconds < 3600;
  const isWarning = timeLeft.totalSeconds < 21600;

  let badgeStyle =
    "bg-[#8ed5ff]/15 text-[#8ed5ff] border-[#8ed5ff]/30 shadow-[0_0_12px_rgba(56,189,248,0.15)]";

  if (isCritical) {
    badgeStyle =
      "bg-[#ffb4ab]/20 text-[#ffb4ab] border-[#ffb4ab]/40 animate-pulse shadow-[0_0_12px_rgba(255,180,171,0.25)]";
  } else if (isWarning) {
    badgeStyle =
      "bg-[#ffc640]/15 text-[#ffc640] border-[#ffc640]/30 shadow-[0_0_12px_rgba(255,198,64,0.2)]";
  }

  const formattedTime =
    timeLeft.days > 0
      ? `${timeLeft.days}d ${String(timeLeft.hours).padStart(2, "0")}h`
      : `${String(timeLeft.hours).padStart(2, "0")}:${String(
          timeLeft.minutes,
        ).padStart(2, "0")}:${String(timeLeft.seconds).padStart(2, "0")}`;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold border backdrop-blur-md transition-colors duration-200 ${badgeStyle} ${className}`}
    >
      <ClockIcon className="w-3.5 h-3.5 shrink-0" />
      <span>{formattedTime}</span>
    </span>
  );
}
