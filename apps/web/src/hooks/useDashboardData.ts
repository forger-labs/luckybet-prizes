"use client";

import { useCallback, useEffect, useState } from "react";

import { DEFAULT_FEATURED_GAMES } from "@/constant";
import { webApi } from "@/libs/apiWebGanaya";
import { luckybetClient } from "@/libs/luckybetClient";
import type { GameItem, UserRankStatus } from "@/types/dashboard";
import type { PlayedGameItem } from "@/types/player";

const DEFAULT_RANK: UserRankStatus = {
  currentTier: "Principiante",
  nextTier: "Bronce",
  currentXp: 0,
  targetXp: 1000,
  streakDays: 1,
  multiplier: "1.0x",
};

export function useDashboardData() {
  const [userRank, setUserRank] = useState<UserRankStatus>(DEFAULT_RANK);
  const [games, setGames] = useState<GameItem[]>(DEFAULT_FEATURED_GAMES);
  const [isFallbackGames, setIsFallbackGames] = useState<boolean>(false);
  const [isLoadingGames, setIsLoadingGames] = useState<boolean>(true);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  const loadUserData = useCallback(async () => {
    setIsLoadingUser(true);
    try {
      const meRes = await webApi.getMe();
      if (meRes.status && meRes.data) {
        const player = meRes.data;
        const currentXp = player.experience ?? 0;
        const currentLevel = player.level;
        const currentTier = currentLevel?.name ?? "Nivel 1";
        const currentLevelImage = currentLevel?.image;
        const multiplier = currentLevel?.bonus
          ? `+${currentLevel.bonus}%`
          : "1.0x";

        const nextLevel = await webApi.getNextLevel(currentXp);
        const nextTier = nextLevel?.name ?? "Nivel Máximo";
        const targetXp =
          nextLevel?.minExperience ?? (currentXp > 0 ? currentXp : 1000);
        const nextLevelImage = nextLevel?.image;

        setUserRank({
          currentTier,
          nextTier,
          currentXp,
          targetXp,
          streakDays: 3,
          multiplier,
          currentLevelImage,
          nextLevelImage,
          currentLevelId: currentLevel?.id,
          nextLevelId: nextLevel?.id,
          coins: currentLevel?.coins ?? 0,
        });
      }
    } catch {
      // keep fallback rank
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  const loadPlayedGames = useCallback(async () => {
    setIsLoadingGames(true);
    try {
      const playedRes = await webApi.getPlayedGames({ days: 7, limit: 5 });
      if (
        playedRes.status &&
        playedRes.data?.games &&
        playedRes.data.games.length > 0
      ) {
        const mappedGames: GameItem[] = playedRes.data.games.map(
          (g: PlayedGameItem, i: number) => ({
            id: g.gameId || `played-${i}`,
            title: g.gameName || "Juego de Casino",
            category: g.provider || "Casino",
            imageUrl:
              g.imageUrl ||
              DEFAULT_FEATURED_GAMES[i % DEFAULT_FEATURED_GAMES.length]
                .imageUrl,
            alt: g.gameName || "Juego jugado",
            activePlayers: 150 + i * 20,
            lastPlayedAt: g.lastPlayedAt,
            tag: "JUGADO",
            tagColor: "cyan",
          }),
        );
        setGames(mappedGames);
        setIsFallbackGames(false);
      } else {
        // Fallback to client API or featured list
        try {
          const catalogRes = await luckybetClient.getGameList();
          if (
            catalogRes.status === "success" &&
            Array.isArray(catalogRes.content) &&
            catalogRes.content.length >= 5
          ) {
            const catalogGames: GameItem[] = catalogRes.content
              .slice(0, 5)
              .map((g: Record<string, unknown>, i: number) => ({
                id: String(g.id || g.game || i),
                title: String(g.name || g.title || "Juego Destacado"),
                category: String(g.provider || "Tragamonedas"),
                imageUrl: String(
                  g.img ||
                    g.imageUrl ||
                    DEFAULT_FEATURED_GAMES[i % DEFAULT_FEATURED_GAMES.length]
                      .imageUrl,
                ),
                alt: String(g.name || "Juego recomendado"),
                activePlayers: 120 + i * 35,
                tag: "DESTACADO",
                tagColor: "gold",
              }));
            setGames(catalogGames);
          } else {
            setGames(DEFAULT_FEATURED_GAMES);
          }
        } catch {
          setGames(DEFAULT_FEATURED_GAMES);
        }
        setIsFallbackGames(true);
      }
    } catch {
      setGames(DEFAULT_FEATURED_GAMES);
      setIsFallbackGames(true);
    } finally {
      setIsLoadingGames(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
    loadPlayedGames();
  }, [loadUserData, loadPlayedGames]);

  return {
    userRank,
    games,
    isFallbackGames,
    isLoadingGames,
    isLoadingUser,
    refetch: () => {
      loadUserData();
      loadPlayedGames();
    },
  };
}
