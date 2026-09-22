"use client";

import { Toaster } from "react-hot-toast";

export function CasinoToaster() {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{
        top: 24,
        right: 24,
        bottom: 24,
        left: 24,
        zIndex: 99999,
      }}
      toastOptions={{
        duration: 4000,
        style: {
          background: "transparent",
          boxShadow: "none",
          padding: 0,
          border: "none",
        },
      }}
    />
  );
}

CasinoToaster.displayName = "CasinoToaster";
