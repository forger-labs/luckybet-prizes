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
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-[#400003] text-[#ffdad6] border-2 border-[#ffb4ab] shadow-[0_4px_12px_rgba(0,0,0,0.8)] ${className}`}
      >
        <span className="material-symbols-outlined text-sm text-[#ffb4ab]">
          timer_off
        </span>
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
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-[#060e20] text-[#dae2fd] border-2 border-[#3e484f] shadow-[0_4px_12px_rgba(0,0,0,0.7)] ${className}`}
        >
          <span className="material-symbols-outlined text-sm text-[#8ed5ff]">
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

  // Solid dark background for ultra-high contrast against any bright or light image background
  let badgeStyle =
    "bg-[#060e20] text-[#8ed5ff] border-2 border-[#38bdf8] shadow-[0_4px_16px_rgba(0,0,0,0.85)]";

  if (isCritical) {
    badgeStyle =
      "bg-[#2c0508] text-[#ffdad6] border-2 border-[#ffb4ab] animate-pulse shadow-[0_4px_16px_rgba(0,0,0,0.9),0_0_12px_rgba(255,180,171,0.4)]";
  } else if (isWarning) {
    badgeStyle =
      "bg-[#1c1200] text-[#ffdf9f] border-2 border-[#ffc640] shadow-[0_4px_16px_rgba(0,0,0,0.85),0_0_12px_rgba(255,198,64,0.3)]";
  }

  const formattedTime =
    timeLeft.days > 0
      ? `${timeLeft.days}d ${String(timeLeft.hours).padStart(2, "0")}h`
      : `${String(timeLeft.hours).padStart(2, "0")}:${String(
          timeLeft.minutes,
        ).padStart(2, "0")}:${String(timeLeft.seconds).padStart(2, "0")}`;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-black transition-all ${badgeStyle} ${className}`}
    >
      <ClockIcon className="w-3.5 h-3.5 shrink-0" />
      <span>{formattedTime}</span>
    </span>
  );
}
