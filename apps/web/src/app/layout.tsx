import type { Metadata } from "next";
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { CasinoToaster } from "@shared/components/toasts/CasinoToaster";

import { AuthContextProvider } from "@/context/AuthContext";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuckyBet Premios",
  description: "Completa misiones y gana premios reales.",
};

export const viewport = {
  themeColor: "#0b1326",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`dark ${beVietnamPro.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-[#200C42] text-on-surface antialiased">
        <AuthContextProvider>
          {children}
          <CasinoToaster />
        </AuthContextProvider>
      </body>
    </html>
  );
}
