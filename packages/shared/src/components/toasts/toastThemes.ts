import type { ToastVariant } from "../../types/toasts";

export interface ToastThemeConfig {
  icon: string;
  tagLabel: string;
  containerBg: string;
  borderColor: string;
  boxShadow: string;
  emblemBg: string;
  emblemText: string;
  tagBg: string;
  tagText: string;
  titleColor: string;
  descColor: string;
  barColor: string;
  closeBtnHover: string;
}

export const VARIANT_THEMES: Record<ToastVariant, ToastThemeConfig> = {
  success: {
    icon: "check_circle",
    tagLabel: "Operación Exitosa",
    containerBg: "bg-[#062c24]",
    borderColor: "border-[#10b981]",
    boxShadow: "0 10px 30px -5px rgba(16, 185, 129, 0.45)",
    emblemBg: "bg-[#059669]",
    emblemText: "text-white",
    tagBg: "bg-[#10b981]",
    tagText: "text-[#022c22]",
    titleColor: "text-white",
    descColor: "text-[#a7f3d0]",
    barColor: "bg-[#34d399]",
    closeBtnHover: "hover:bg-[#059669]",
  },
  error: {
    icon: "gpp_bad",
    tagLabel: "Error del Sistema",
    containerBg: "bg-[#3f0713]",
    borderColor: "border-[#f43f5e]",
    boxShadow: "0 10px 30px -5px rgba(244, 63, 94, 0.45)",
    emblemBg: "bg-[#e11d48]",
    emblemText: "text-white",
    tagBg: "bg-[#f43f5e]",
    tagText: "text-white",
    titleColor: "text-white",
    descColor: "text-[#fecdd3]",
    barColor: "bg-[#fb7185]",
    closeBtnHover: "hover:bg-[#e11d48]",
  },
  info: {
    icon: "info",
    tagLabel: "Información",
    containerBg: "bg-[#082f49]",
    borderColor: "border-[#0ea5e9]",
    boxShadow: "0 10px 30px -5px rgba(14, 165, 233, 0.45)",
    emblemBg: "bg-[#0284c7]",
    emblemText: "text-white",
    tagBg: "bg-primary-container",
    tagText: "text-[#082f49]",
    titleColor: "text-white",
    descColor: "text-[#bae6fd]",
    barColor: "bg-primary-container",
    closeBtnHover: "hover:bg-[#0284c7]",
  },
  action: {
    icon: "help",
    tagLabel: "Acción Requerida",
    containerBg: "bg-[#381e04]",
    borderColor: "border-[#f59e0b]",
    boxShadow: "0 10px 30px -5px rgba(245, 158, 11, 0.45)",
    emblemBg: "bg-[#d97706]",
    emblemText: "text-white",
    tagBg: "bg-[#fbbf24]",
    tagText: "text-[#451a03]",
    titleColor: "text-white",
    descColor: "text-[#fde68a]",
    barColor: "bg-[#fbbf24]",
    closeBtnHover: "hover:bg-[#d97706]",
  },
};
