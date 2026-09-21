"use client";

import { useState } from "react";

import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { MobileDrawer } from "@/components/admin/layout/MobileDrawer";

function PanelContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-background text-on-surface">
      {/* Desktop collapsible sidebar */}
      <AdminSidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Mobile drawer overlay */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Main app shell */}
      <div className="flex flex-col flex-1 min-w-0 min-h-dvh">
        <AdminHeader onOpenMobileDrawer={() => setDrawerOpen(true)} />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PanelContent>{children}</PanelContent>;
}
