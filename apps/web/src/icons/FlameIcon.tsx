import type { IconProps } from "@/types/icons";

export const FlameIcon = ({
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
    <title>Ícono de fuego</title>
    <path d="M12 23c4.97 0 9-3.8 9-8.5 0-3.37-2.02-6.28-4.95-7.64.44 1.34.45 2.85-.05 4.14-.65-2.05-2.1-3.69-3.9-4.7C10.74 3.73 10.02 1.3 10 0c-2.45 2.1-4.7 5.17-4.96 8.5C3.37 10.3 2 12.72 2 15.5 2 19.64 6.48 23 12 23Zm-1-5.5c-.83 0-1.5-.67-1.5-1.5 0-1.5 1.5-2.5 1.5-4 1.25 1.25 2.5 2.25 2.5 4 0 .83-.67 1.5-1.5 1.5h-1Z" />
  </svg>
);
