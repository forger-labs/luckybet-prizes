"use client";

import { DashboardWelcomeHeader } from "@/components/dashboard/DashboardWelcomeHeader";
import { FeaturedChestCard } from "@/components/dashboard/FeaturedChestCard";
import { GamesSection } from "@/components/dashboard/games/GamesSection";
import { LiveWinnersFeed } from "@/components/dashboard/LiveWinnersFeed";
import { TrendingGames } from "@/components/dashboard/TrendingGames";
import { UserStatusWidget } from "@/components/dashboard/UserStatusWidget";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function DashboardPage() {
  const { userRank, games, isFallbackGames, isLoadingGames, isLoadingUser } =
    useDashboardData();

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 sm:space-y-stack-md">
      {/* Welcome Banner */}
      <DashboardWelcomeHeader />

      {/* User Status & Featured Hero Chest with Weekly/Monthly toggle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-gutter items-stretch">
        <div className="lg:col-span-4">
          <UserStatusWidget status={userRank} isLoading={isLoadingUser} />
        </div>
        <div className="lg:col-span-8 min-h-[300px]">
          <FeaturedChestCard />
        </div>
      </div>

      {/* Quick Access Games with Played/Featured Support */}
      <GamesSection
        games={games}
        isFallback={isFallbackGames}
        isLoading={isLoadingGames}
      />

      {/* Live Winners Feed & Trending Harbor Games */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-gutter">
        <LiveWinnersFeed />
        <TrendingGames />
      </div>
    </div>
  );
}
