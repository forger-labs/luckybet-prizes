export function SkeletonCard() {
  return (
    <div className="bg-surface-container-high rounded-xl p-4 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-container-highest" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-28 rounded bg-surface-container-highest" />
          <div className="h-2.5 w-16 rounded bg-surface-container-highest" />
        </div>
      </div>
      <div className="h-4 w-3/4 rounded bg-surface-container-highest" />
      <div className="flex gap-2">
        <div className="h-5 w-14 rounded-full bg-surface-container-highest" />
        <div className="h-5 w-20 rounded-full bg-surface-container-highest" />
      </div>
      <div className="h-30 rounded-md bg-surface-container-highest" />
    </div>
  );
}
