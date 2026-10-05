"use client";

export function MissionDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
      {/* Back Button Skeleton */}
      <div className="w-36 h-9 rounded-xl bg-[#171f33] border border-[#2d3449]" />

      {/* Hero Skeleton */}
      <div className="rounded-3xl bg-[#171f33] border-2 border-[#2d3449] p-8 space-y-6">
        <div className="w-full h-44 rounded-2xl bg-[#131b2e]" />
        <div className="w-1/2 h-8 rounded-xl bg-[#222a3d]" />
        <div className="w-3/4 h-4 rounded-lg bg-[#222a3d]" />
        <div className="w-64 h-12 rounded-xl bg-[#060e20]" />
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#171f33] border-2 border-[#2d3449] space-y-4">
          <div className="w-48 h-6 rounded-lg bg-[#222a3d]" />
          <div className="w-full h-24 rounded-2xl bg-[#131b2e]" />
          <div className="w-full h-24 rounded-2xl bg-[#131b2e]" />
        </div>

        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#171f33] border-2 border-[#2d3449] space-y-4">
          <div className="w-36 h-5 rounded-lg bg-[#222a3d]" />
          <div className="w-28 h-8 rounded-xl bg-[#222a3d]" />
          <div className="w-full h-12 rounded-2xl bg-[#222a3d]" />
        </div>
      </div>
    </div>
  );
}
