export interface LuckyBetLoginData {
  login: string;
  password: string;
}

export interface LuckyBetLoginContent {
  language?: string;
  [key: string]: unknown;
}

export interface LuckyBetTerminalInfoContent {
  id: number | string;
  login: string;
  cash?: number | string;
  currency?: string;
  group?: number | string;
  name?: string;
  language?: string;
  vipRank?: string;
  [key: string]: unknown;
}

export interface LuckyBetRequest<T = unknown> {
  cmd: string;
  version: number;
  domain: string;
  type?: string;
  token?: string;
  first?: boolean;
  data?: T;
  [key: string]: unknown;
}

export interface LuckyBetResponse<T = unknown> {
  status: "success" | "fail";
  token?: string;
  content?: T;
  errorCode?: string;
  error?: string;
  datetime?: string;
  microtime?: number;
  [key: string]: unknown;
}

export interface LuckyBetPlayerUser {
  id: number | string;
  login: string;
  cash: number | string;
  currency: string;
  language?: string;
  name?: string;
  group?: number | string;
}

export interface AuthContextType {
  token: string | null;
  user: LuckyBetPlayerUser | null;
  isLoading: boolean;
  isValidating: boolean;
  login: (
    credentials: LuckyBetLoginData,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  verifyToken: () => Promise<boolean>;
}

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LuckyBetGameItem {
  id?: string | number;
  game?: string;
  name?: string;
  title?: string;
  provider?: string;
  img?: string;
  imageUrl?: string;
  category?: string;
  activePlayers?: number;
  [key: string]: unknown;
}
