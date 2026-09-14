import type { Metadata } from "next";
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Toaster } from "sileo";
import "sileo/styles.css";

import { AuthAdminProvider } from "@/context/AuthAdminContext";

const materialSymbolsUrl =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";

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
  title: "LuckyBet Premios — Admin",
  description: "Panel de administración de LuckyBet Premios.",
};

export default function AdminRootLayout({
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
        <link
          crossOrigin="anonymous"
          href={materialSymbolsUrl}
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-background text-on-surface antialiased">
        <AuthAdminProvider>{children}</AuthAdminProvider>
        <Toaster position="top-right" theme="light" />
      </body>
    </html>
  );
}
