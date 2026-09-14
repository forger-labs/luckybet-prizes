import Link from "next/link";

import type { SidebarLinkType } from "@shared/types";

const isActive = (path: string, actualPath: string) => {
  return actualPath === path;
};

export const ItemSidebar = ({
  icon: Icon,
  path,
  text,
  pathname,
  open,
}: SidebarLinkType & { pathname: string; open: boolean }) => {
  return (
    <li
      className={
        "relative font-medium transition-colors" +
        (isActive(path, pathname)
          ? " bg-secondary-fixed-dim/8 text-secondary hover:bg-secondary-fixed-dim/25 active:bg-secondary-fixed-dim/25 border-r-4 border-secondary"
          : "text-on-surface-variant hover:bg-surface-container-high active:bg-surface-variant")
      }
    >
      <Link
        className={`flex items-center gap-3 p-3 ${
          open ? "" : "justify-center"
        }`}
        href={path}
      >
        <Icon fill={isActive(path, pathname) ? "#FFC640" : "#BDC8D1"} />
        <span
          className={
            "pt-1 overflow-hidden whitespace-nowrap transition-all duration-300 " +
            (open ? "opacity-100 w-auto" : "opacity-0 w-0 invisible")
          }
        >
          {text}
        </span>
      </Link>
    </li>
  );
};
