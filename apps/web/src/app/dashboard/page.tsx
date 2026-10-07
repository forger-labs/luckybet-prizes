"use client";

import { DashboardWelcomeHeader } from "@/components/dashboard/DashboardWelcomeHeader";
import { FeaturedChestCard } from "@/components/dashboard/FeaturedChestCard";
import { GamesSection } from "@/components/dashboard/games/GamesSection";
import { LeaderboardWidget } from "@/components/dashboard/leaderboard";
import { UserStatusWidget } from "@/components/dashboard/UserStatusWidget";
import { LevelUpCelebrationModal } from "@/components/levels/LevelUpCelebrationModal";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useLevelRewards } from "@/hooks/useLevelRewards";

export default function DashboardPage() {
  const {
    userRank,
    games,
    isFallbackGames,
    isLoadingGames,
    isLoadingUser,
    refetch: refetchDashboard,
  } = useDashboardData();

  const {
    nextReward,
    pendingCount,
    nextLevelName,
    nextLevelImage,
    calculatedCoinsForNext,
    isClaiming,
    celebrationData,
    isCelebrationOpen,
    hasMorePending,
    remainingCount,
    subsequentLevelName,
    claimNextReward,
    claimNextFromModal,
    closeCelebration,
  } = useLevelRewards({
    roomBonus: userRank.roomBonus,
    onClaimSuccess: refetchDashboard,
  });

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 sm:space-y-stack-md">
      {/* Welcome Banner */}
      <DashboardWelcomeHeader />

      {/* User Status & Featured Hero Chest with Weekly/Monthly toggle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-gutter items-stretch">
        <div className="lg:col-span-4">
          <UserStatusWidget
            status={userRank}
            isLoading={isLoadingUser}
            pendingRewardCount={pendingCount}
            nextReward={nextReward}
            nextLevelName={nextLevelName}
            nextLevelImage={nextLevelImage}
            calculatedCoinsForNext={calculatedCoinsForNext}
            isClaimingReward={isClaiming}
            onClaimReward={claimNextReward}
          />
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

      {/* Monthly & Realtime Leaderboard Podium */}
      <section className="pt-2">
        <LeaderboardWidget />
      </section>

      {/* Level Up Celebration Modal */}
      <LevelUpCelebrationModal
        isOpen={isCelebrationOpen}
        onClose={closeCelebration}
        celebrationData={celebrationData}
        hasMorePending={hasMorePending}
        remainingCount={remainingCount}
        nextLevelName={subsequentLevelName}
        onClaimNext={claimNextFromModal}
        isClaimingNext={isClaiming}
      />
    </div>
  );
}
