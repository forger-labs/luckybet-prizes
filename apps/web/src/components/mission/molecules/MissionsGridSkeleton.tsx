"use client";

export function MissionsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {[1, 2, 3, 4, 5, 6].map((idx) => (
        <div
          key={idx}
          className="rounded-2xl bg-[#171f33] border-2 border-[#2d3449] overflow-hidden p-5 sm:p-6 flex flex-col justify-between animate-pulse min-h-[380px]"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="w-20 h-6 rounded-lg bg-[#222a3d]" />
              <div className="w-24 h-6 rounded-lg bg-[#222a3d]" />
            </div>

            <div className="w-full h-36 rounded-xl bg-[#131b2e] mb-4" />

            <div className="w-3/4 h-6 rounded-md bg-[#222a3d] mb-2" />
            <div className="w-full h-4 rounded-md bg-[#222a3d] mb-4" />

            <div className="w-full h-12 rounded-xl bg-[#060e20] mb-4" />

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <div className="w-16 h-3 rounded bg-[#222a3d]" />
                <div className="w-8 h-3 rounded bg-[#222a3d]" />
              </div>
              <div className="w-full h-2 rounded-full bg-[#060e20]" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t-2 border-[#2d3449] mt-2">
            <div className="w-20 h-4 rounded bg-[#222a3d]" />
            <div className="w-28 h-9 rounded-xl bg-[#222a3d]" />
          </div>
        </div>
      ))}
    </div>
  );
}
