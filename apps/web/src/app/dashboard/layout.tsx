"use client";

import { type ReactNode, useState } from "react";

import { MobileSidebar } from "@/components/MobileSidebar";
import { Sidebar } from "@/components/Sidebar";
import { TopAppBar } from "@/components/TopAppBar/TopAppBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div>
      <TopAppBar onMenuToggle={() => setMobileOpen(!mobileOpen)} />

      <div className="flex">
        <Sidebar
          open={desktopOpen}
          onToggle={() => setDesktopOpen(!desktopOpen)}
        />

        {/* Mobile drawer */}
        <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

        <main className="px-8 pt-26 pb-20 min-h-dvh bg-background flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
