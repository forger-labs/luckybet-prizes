import type { InputHTMLAttributes, ReactNode } from "react";

export interface LoginCardProps {
  /** Brand logo icon (Material Symbols name) */
  icon?: string;
  /** Brand title */
  title: string;
  /** Brand subtitle */
  subtitle?: string;
  /** Card body content */
  children: ReactNode;
  /** Footer content (shown below a divider) */
  footer?: ReactNode;
}

export interface LoginFormProps {
  onLogin?: (username: string, password: string) => Promise<void>;
}

export interface PasswordFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "icon"> {
  /** Label text */
  label?: string;
  /** Forgot-password link node (rendered inline with label) */
  forgotLink?: ReactNode;
  /** Validation error message */
  error?: string;
}
