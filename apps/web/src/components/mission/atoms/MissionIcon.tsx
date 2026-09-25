interface Props {
  icon: string;
  color: string;
  glowColor?: string;
  size?: "sm" | "md" | "lg";
}

export const MissionIcon = ({ icon, color, size = "md" }: Props) => {
  const sizeClasses = {
    sm: "w-10 h-10 rounded-xl text-2xl",
    md: "w-12 h-12 rounded-xl text-3xl",
    lg: "w-16 h-16 rounded-2xl text-4xl",
  };

  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 border-2 shadow-md`}
      style={{
        backgroundColor: color,
        borderColor: `${color}`,
      }}
    >
      <span
        className="material-symbols-outlined select-none text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
    </div>
  );
};
