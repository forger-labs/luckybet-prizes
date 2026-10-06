"use client";

import { usePlayerChests } from "./usePlayerChests";

export function useWeeklyChest() {
  return usePlayerChests("WEEKLY");
}
