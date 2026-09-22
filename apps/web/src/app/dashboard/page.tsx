import { DashboardWelcomeHeader } from "@/components/dashboard/DashboardWelcomeHeader";
import { FeaturedMission } from "@/components/dashboard/FeaturedMission";
import { GamesSection } from "@/components/dashboard/games/GamesSection";
import { LiveWinnersFeed } from "@/components/dashboard/LiveWinnersFeed";
import { TrendingGames } from "@/components/dashboard/TrendingGames";
import { UserStatusWidget } from "@/components/dashboard/UserStatusWidget";

export default function DashboardPage() {
  return (
    <div className="max-w-[1280px] mx-auto space-y-6 sm:space-y-stack-md">
      {/* Welcome Banner */}
      <DashboardWelcomeHeader />

      {/* User Status & Featured Hero Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-gutter">
        <div className="lg:col-span-4 min-h-[320px]">
          <UserStatusWidget />
        </div>
        <div className="lg:col-span-8 min-h-[320px]">
          <FeaturedMission />
        </div>
      </div>

      {/* Quick Access Games */}
      <GamesSection />

      {/* Live Winners Feed & Trending Harbor Games */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-gutter">
        <LiveWinnersFeed />
        <TrendingGames />
      </div>
    </div>
  );
}
