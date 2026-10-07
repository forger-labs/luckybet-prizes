import type { IconProps } from "@/types/icons";

export const BoltIcon = ({
  className = "w-5 h-5",
  size,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <title>Ícono de rayo</title>
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
