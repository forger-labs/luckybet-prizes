import type { IconProps } from "@/types/icons";

export const PlusIcon = ({
  className = "w-4 h-4",
  size,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <title>Ícono de sumar</title>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);
