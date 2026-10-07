import React from "react";
import toast from "react-hot-toast";

import { CasinoToastItem } from "../components/toasts/CasinoToastItem";
import type { CasinoToastOptions } from "../types/toasts";

function renderCustomToast(options: CasinoToastOptions) {
  const duration =
    options.duration ?? (options.variant === "action" ? Infinity : 4000);

  return toast.custom(
    (t) => React.createElement(CasinoToastItem, { t, options }),
    {
      duration,
    },
  );
}

export const casinoToast = {
  show(options: CasinoToastOptions) {
    return renderCustomToast(options);
  },

  success(
    titleOrOptions: string | CasinoToastOptions,
    description?: string,
    duration = 4000,
  ) {
    if (typeof titleOrOptions === "object") {
      return renderCustomToast({
        ...titleOrOptions,
        variant: "success",
      });
    }
    return renderCustomToast({
      title: titleOrOptions,
      description,
      duration,
      variant: "success",
    });
  },

  error(
    titleOrOptions: string | CasinoToastOptions,
    description?: string,
    duration = 5000,
  ) {
    if (typeof titleOrOptions === "object") {
      return renderCustomToast({
        ...titleOrOptions,
        variant: "error",
      });
    }
    return renderCustomToast({
      title: titleOrOptions,
      description,
      duration,
      variant: "error",
    });
  },

  info(
    titleOrOptions: string | CasinoToastOptions,
    description?: string,
    duration = 4000,
  ) {
    if (typeof titleOrOptions === "object") {
      return renderCustomToast({
        ...titleOrOptions,
        variant: "info",
      });
    }
    return renderCustomToast({
      title: titleOrOptions,
      description,
      duration,
      variant: "info",
    });
  },

  action(options: CasinoToastOptions) {
    return renderCustomToast({
      ...options,
      variant: "action",
      duration: options.duration ?? Infinity,
    });
  },

  dismiss(toastId?: string) {
    toast.dismiss(toastId);
  },

  clear() {
    toast.dismiss();
  },
};
