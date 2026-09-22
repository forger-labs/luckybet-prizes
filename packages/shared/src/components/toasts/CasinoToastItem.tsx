"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { CasinoToastItemProps } from "../../types/toasts";
import { VARIANT_THEMES } from "./toastThemes";

export function CasinoToastItem({ t, options }: CasinoToastItemProps) {
  const {
    title,
    description,
    variant = "info",
    button,
    cancelButtonTitle = "Cancelar",
    onCancel,
  } = options;
  const theme = VARIANT_THEMES[variant];
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const duration = t.duration || 4000;

  useEffect(() => {
    if (isPaused || !t.visible || variant === "action") return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, [isPaused, t.visible, duration, variant]);

  const handleActionClick = async () => {
    if (button?.onClick) await button.onClick();
    toast.dismiss(t.id);
  };

  const handleCancelClick = () => {
    if (onCancel) onCancel();
    toast.dismiss(t.id);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ boxShadow: theme.boxShadow }}
      className={`
        relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-2xl
        ${theme.containerBg} border-2 ${theme.borderColor}
        p-4 sm:p-5 transition-all duration-300 select-none
        ${t.visible ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-2"}
      `}
      role="alert"
    >
      <div className="flex items-start gap-3.5 relative z-10">
        {/* Solid Vivid Status Emblem */}
        <div
          className={`w-11 h-11 rounded-xl ${theme.emblemBg} flex items-center justify-center shrink-0 shadow-md`}
        >
          <span
            className={`material-symbols-outlined text-2xl ${theme.emblemText}`}
          >
            {theme.icon}
          </span>
        </div>

        {/* Text & Action Content */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-extrabold tracking-wider uppercase ${theme.tagBg} ${theme.tagText} shadow-sm`}
            >
              {theme.tagLabel}
            </span>
          </div>

          <h4
            className={`font-(--font-plus-jakarta-sans) text-base font-extrabold ${theme.titleColor} tracking-tight leading-snug`}
          >
            {title}
          </h4>

          {description && (
            <div
              className={`mt-1 text-xs font-semibold ${theme.descColor} leading-relaxed break-words`}
            >
              {description}
            </div>
          )}

          {/* Action buttons */}
          {button && (
            <div className="mt-3.5 flex items-center gap-2.5 pt-2.5 border-t border-white/20">
              <button
                type="button"
                onClick={handleActionClick}
                className="px-4 py-1.5 rounded-xl text-xs font-black bg-[#fbbf24] text-[#451a03] hover:bg-[#fde047] active:scale-95 transition-all shadow-md cursor-pointer"
              >
                {button.title}
              </button>
              <button
                type="button"
                onClick={handleCancelClick}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white/90 hover:text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
              >
                {cancelButtonTitle}
              </button>
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => toast.dismiss(t.id)}
          aria-label="Cerrar notificación"
          className={`w-8 h-8 rounded-lg text-white/80 hover:text-white ${theme.closeBtnHover} transition-all flex items-center justify-center cursor-pointer shrink-0`}
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Synchronized Solid Progress Bar */}
      {variant !== "action" && (
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/30 overflow-hidden">
          <div
            className={`h-full ${theme.barColor} transition-all duration-75`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

CasinoToastItem.displayName = "CasinoToastItem";
