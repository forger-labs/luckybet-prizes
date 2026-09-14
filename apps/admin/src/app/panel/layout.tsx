"use client";

import { useState } from "react";

import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { MobileDrawer } from "@/components/admin/layout/MobileDrawer";

/**
 * PanelLayout — authenticated admin shell for all /panel/* routes.
 *
 * Provides:
 * 1. Session guard via AuthAdminProvider (redirects to / if not authenticated)
 * 2. Desktop collapsible sidebar (AdminSidebar)
 * 3. Mobile overlay drawer (MobileDrawer)
 * 4. Responsive content area with proper padding per Midnight Harbor specs
 */
function PanelContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-dvh">
      {/* Desktop sidebar */}
      <AdminSidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Mobile hamburger trigger — only visible < 768px */}
      <button
        type="button"
        className="fixed top-4 left-4 z-30 p-2 pb-0 rounded-lg bg-surface-container border border-outline-variant/30 md:hidden hover:bg-surface-container-high transition-colors"
        onClick={() => setDrawerOpen(true)}
        aria-label="Abrir menú"
      >
        <span className="material-symbols-outlined text-on-surface">menu</span>
      </button>

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Content area */}
      <main className="max-sm:max-w-[96vw] mx-auto flex-1 min-h-dvh transition-all pb-10 duration-300 pt-20 px-container-padding-mobile md:px-container-padding-desktop">
        {children}
      </main>
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
