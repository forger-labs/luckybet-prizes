export const LOCAL_STORAGE_KEYS = {
  accessToken: "ac_token_admin",
  refreshToken: "rf_token_admin",
};

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3030";

export const ROUTES = {
  index: "/",
  panel: {
    index: "/panel",
    revision: "/panel/revision",
  },
};
