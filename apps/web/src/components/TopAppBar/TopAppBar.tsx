"use client";

import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@shared/constants";
import { OpenMenu } from "@shared/icons/OpenMenu";

import { Balance } from "./Balance";

export const TopAppBar = ({ onMenuToggle }: { onMenuToggle?: () => void }) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container border-b border-outline-variant flex items-center justify-between px-container-padding-mobile md:px-container-padding-desktop h-16">
      <div className="flex items-center gap-2">
        {/* Hamburger — mobile only */}

        <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2">
          <Image
            src="/luckybet_logo.png"
            alt="Logo Image"
            height={150}
            width={150}
          />
        </Link>
      </div>

      <div className="flex items-center gap-6 md:flex hidden">
        <Balance />
        <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden flex items-center justify-center border border-outline-variant">
          <Image
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8hM-6HrYibIqyzkCNgeaR05_yrCaP-yr4fKPB72nT7Q0DcF3oe3GaUlzUEM27rolQZZ3gQTMWKNsSs9cFT5e1bafbATV-s4SDR2J2TCMlckRkIOSJxCtc3xL_2BAQaCYjeYoablOUP42167imWxrMexF6FALqXxiy79177VUu_8tu4eviQGg5JSzc9ObfVYjDvtX7vBRpc_HcjX9E3ot3s5CI9F8jUyotv1ygQTsvpvB1E2wJBOf2Xr3gk1__fzBRnWRgCx3CS3Ev"
            width={40}
            height={40}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onMenuToggle}
        className="md:hidden p-1.5 rounded-md hover:bg-surface-container-high transition-colors"
        aria-label="Abrir menú"
      >
        <OpenMenu />
      </button>
    </header>
  );
};
