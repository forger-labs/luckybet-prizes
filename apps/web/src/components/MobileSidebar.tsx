"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { PUBLIC_LINKS } from "@shared/constants";
import { CloseMenu } from "@shared/icons/CloseMenu";
import { Stars } from "@shared/icons/Stars";

import { ItemSidebar } from "./ItemSidebar";
import { Logout } from "./Logout";
import { Balance } from "./TopAppBar/Balance";

export const MobileSidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Close drawer on route change
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  return (
    <>
      <div
        className={
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden " +
          (open ? "opacity-100" : "opacity-0 pointer-events-none")
        }
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={
          "fixed top-0 left-0 z-[45] h-dvh w-72 bg-surface-container pt-20 pb-6 grid grid-cols-1 grid-rows-[auto_1fr_auto_auto] transition-transform duration-300 md:hidden " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        {/* User info + close button */}
        <div className="flex items-center justify-between pr-4 pl-6 self-start ">
          <div className="flex items-center gap-3">
            <div className="block p-2 bg-secondary-fixed-dim rounded-md flex-shrink-0">
              <Stars height={32} width={32} />
            </div>
            <p className="font-(--font-be-vietnam-pro) text-base font-medium text-secondary-fixed-dim whitespace-nowrap">
              Ala Del Billete
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-surface-container-high transition-colors"
            aria-label="Cerrar menú"
            type="button"
          >
            <CloseMenu />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 self-start">
          <ul className="flex flex-col">
            {PUBLIC_LINKS.map((link, i) => (
              <ItemSidebar
                {...link}
                pathname={pathname}
                key={`${link.path}-${i}`}
                open={true}
              />
            ))}
          </ul>
        </nav>

        <div className="flex items-center ml-4 mb-4 ">
          <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden flex items-center justify-center border border-outline-variant">
            <Image
              alt="User Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8hM-6HrYibIqyzkCNgeaR05_yrCaP-yr4fKPB72nT7Q0DcF3oe3GaUlzUEM27rolQZZ3gQTMWKNsSs9cFT5e1bafbATV-s4SDR2J2TCMlckRkIOSJxCtc3xL_2BAQaCYjeYoablOUP42167imWxrMexF6FALqXxiy79177VUu_8tu4eviQGg5JSzc9ObfVYjDvtX7vBRpc_HcjX9E3ot3s5CI9F8jUyotv1ygQTsvpvB1E2wJBOf2Xr3gk1__fzBRnWRgCx3CS3Ev"
              width={40}
              height={40}
            />
          </div>
          <Balance className="ml-4 border-none" />
        </div>
        <Logout logout={() => {}} open={true} />
      </aside>
    </>
  );
};
