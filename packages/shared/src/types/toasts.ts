import type { ReactNode } from "react";
import type { Toast } from "react-hot-toast";

export type ToastVariant = "success" | "error" | "info" | "action";

export interface ToastActionButton {
  title: string;
  onClick: () => void | Promise<void>;
  variant?: "primary" | "secondary" | "danger";
}

export interface CasinoToastOptions {
  title: string;
  description?: string | ReactNode;
  duration?: number;
  variant?: ToastVariant;
  button?: ToastActionButton;
  cancelButtonTitle?: string;
  onCancel?: () => void;
}

export interface CasinoToastItemProps {
  t: Toast;
  options: CasinoToastOptions;
}
