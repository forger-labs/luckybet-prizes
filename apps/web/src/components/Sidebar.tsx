"use client";

import { usePathname } from "next/navigation";

import { PUBLIC_LINKS } from "@shared/constants";
import { ExpandMenu } from "@shared/icons/ExpandMenu";
import { Stars } from "@shared/icons/Stars";

import { ItemSidebar } from "./ItemSidebar";
import { Logout } from "./Logout";

export const Sidebar = ({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) => {
  const pathname = usePathname();

  return (
    <aside
      className={
        "hidden sticky md:grid left-0 top-0 pt-20 pb-6 grid-cols-1 grid-rows-[auto_1fr_auto] bg-surface-container min-h-dvh h-dvh transition-all duration-300 " +
        (open ? "w-64" : "w-20")
      }
    >
      {/* Toggle button — positioned on the right edge */}
      <button
        onClick={onToggle}
        type="button"
        className={
          "absolute hover:cursor-pointer z-10 left-[100%] bg-surface-container border-r border-b  block border-outline-variant rounded-r-full pr-1 pt-2 pb-2 hover:bg-surface-container-high transition-colors top-[65px] "
        }
        aria-label={open ? "Contraer menú" : "Expandir menú"}
      >
        <ExpandMenu
          className={`transition-transform duration-300 ${
            open ? "" : "rotate-180"
          }`}
        />
      </button>

      {/* Username + icon */}

      <div
        className={
          "flex items-center self-start pr-2 gap-3 " +
          (open ? "pl-6" : "pl-5 justify-center")
        }
      >
        <div className="block p-2 bg-secondary-fixed-dim rounded-md flex-shrink-0">
          <Stars height={32} width={32} />
        </div>

        <p
          className={
            "font-(--font-be-vietnam-pro) text-base font-medium text-secondary-fixed-dim whitespace-nowrap overflow-hidden transition-all duration-300 " +
            (open ? "opacity-100 w-auto" : "opacity-0 w-0 invisible")
          }
        >
          Ala Del Billete
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-6 self-start">
        <ul className="flex flex-col">
          {PUBLIC_LINKS.map((link, i) => (
            <ItemSidebar
              {...link}
              pathname={pathname}
              key={`${link.path}-${i}`}
              open={open}
            />
          ))}
        </ul>
      </nav>

      <Logout logout={() => {}} open={open} />
    </aside>
  );
};
