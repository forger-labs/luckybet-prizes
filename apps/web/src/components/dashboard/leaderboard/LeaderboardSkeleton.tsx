"use client";

export const LeaderboardSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Podium Skeleton */}
      <div className="flex items-end justify-center gap-3 pt-6 px-2 min-h-[220px]">
        {/* Step 2 (Left) */}
        <div className="flex-1 flex flex-col items-center justify-end order-1">
          <div className="w-12 h-12 rounded-full bg-surface-container-highest mb-2" />
          <div className="w-full h-36 rounded-t-2xl bg-surface-container border border-outline-variant/15 p-3 space-y-2">
            <div className="w-3/4 h-3 bg-surface-container-highest rounded mx-auto" />
            <div className="w-1/2 h-3 bg-surface-container-highest rounded mx-auto" />
          </div>
        </div>

        {/* Step 1 (Center) */}
        <div className="flex-1 flex flex-col items-center justify-end order-2">
          <div className="w-14 h-14 rounded-full bg-surface-container-highest mb-2" />
          <div className="w-full h-44 rounded-t-2xl bg-surface-container-high border border-outline-variant/20 p-3 space-y-2">
            <div className="w-3/4 h-3 bg-surface-container-highest rounded mx-auto" />
            <div className="w-1/2 h-3 bg-surface-container-highest rounded mx-auto" />
          </div>
        </div>

        {/* Step 3 (Right) */}
        <div className="flex-1 flex flex-col items-center justify-end order-3">
          <div className="w-12 h-12 rounded-full bg-surface-container-highest mb-2" />
          <div className="w-full h-32 rounded-t-2xl bg-surface-container border border-outline-variant/15 p-3 space-y-2">
            <div className="w-3/4 h-3 bg-surface-container-highest rounded mx-auto" />
            <div className="w-1/2 h-3 bg-surface-container-highest rounded mx-auto" />
          </div>
        </div>
      </div>

      {/* List 4-5 Skeleton */}
      <div className="space-y-2 pt-2">
        <div className="h-12 rounded-xl bg-surface-container border border-outline-variant/15" />
        <div className="h-12 rounded-xl bg-surface-container border border-outline-variant/15" />
      </div>
    </div>
  );
};
