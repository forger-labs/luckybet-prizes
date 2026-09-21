export const LOCAL_STORAGE_KEYS = {
  token: "ig_token",
};

export const LUCKYBET_API_URL =
  process.env.NEXT_PUBLIC_LUCKYBET_API_URL ??
  "https://api.luckybet.site/?act=command&area=cmd";

export const LUCKYBET_DOMAIN =
  process.env.NEXT_PUBLIC_LUCKYBET_DOMAIN ?? "luckybet.site";

export const LUCKYBET_VERSION = 9;

export const TOKEN_CHECK_INTERVAL_MS = 60_000;
