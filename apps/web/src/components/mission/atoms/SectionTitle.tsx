interface Props {
  title: string;
  color?: string;
  badge?: string;
}

export const SectionTitle = ({ title, color, badge }: Props) => (
  <div className="flex items-center gap-2.5">
    <h2
      className="font-title-md text-base sm:text-xl font-bold tracking-tight text-on-surface"
      style={{ color: color ?? "var(--color-on-surface)" }}
    >
      {title}
    </h2>
    {badge && (
      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant border border-white/5">
        {badge}
      </span>
    )}
  </div>
);
