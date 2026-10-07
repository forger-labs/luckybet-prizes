"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ROUTES } from "@shared/constants";
import { casinoToast } from "@shared/utils/casinoToast";

import { LOCAL_STORAGE_KEYS, TOKEN_CHECK_INTERVAL_MS } from "@/constant";
import { luckybetClient } from "@/libs/luckybetClient";
import type {
  AuthContextType,
  LuckyBetLoginData,
  LuckyBetPlayerUser,
  LuckyBetTerminalInfoContent,
} from "@/types/luckybet";

function mapProfileToUser(
  content: LuckyBetTerminalInfoContent,
): LuckyBetPlayerUser {
  return {
    id: content.id,
    login: content.login,
    cash: content.cash ?? 0,
    currency: content.currency ?? "ARS",
    language: content.language,
    name: content.name,
    group: content.group,
  };
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  isLoading: true,
  isValidating: false,
  login: async () => ({ success: false }),
  logout: async () => {},
  verifyToken: async () => false,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<LuckyBetPlayerUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const isValidatingRef = useRef(false);

  const clearSession = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    }
    setToken(null);
    setUser(null);
  }, []);

  const validateToken = useCallback(
    async (
      tokenToVerify: string,
      isFirst = false,
      showToast = false,
    ): Promise<boolean> => {
      if (isValidatingRef.current) return true;
      isValidatingRef.current = true;
      setIsValidating(true);
      try {
        const res = await luckybetClient.terminalInfo(tokenToVerify, isFirst);
        if (res.status === "success" && res.content) {
          setUser(mapProfileToUser(res.content));
          return true;
        }
        const isAuthError =
          res.status === "fail" &&
          (res.errorCode === "authorize_error" ||
            res.errorCode === "invalid_token" ||
            res.errorCode === "session_expired" ||
            res.errorCode === "user_not_found" ||
            res.error?.toLowerCase().includes("autorizaci"));

        if (isAuthError) {
          clearSession();
          if (showToast) {
            casinoToast.error({
              title: "Sesión expirada",
              description:
                "Su sesión ha expirado. Por favor, inicie sesión nuevamente.",
            });
          }
          return false;
        }
        return true;
      } catch {
        return true;
      } finally {
        isValidatingRef.current = false;
        setIsValidating(false);
      }
    },
    [clearSession],
  );

  useEffect(() => {
    const restoreSession = async () => {
      if (typeof window === "undefined") {
        setIsLoading(false);
        return;
      }
      const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.token);
      if (storedToken) {
        setToken(storedToken);
        const isValid = await validateToken(storedToken, true, false);
        if (!isValid) clearSession();
      }
      setIsLoading(false);
    };
    restoreSession();
  }, [validateToken, clearSession]);

  useEffect(() => {
    if (!token || isLoading) return;
    const intervalId = setInterval(async () => {
      const isValid = await validateToken(token, false, true);
      if (!isValid) router.push(ROUTES.LOGIN);
    }, TOKEN_CHECK_INTERVAL_MS);

    const handleVisibility = async () => {
      if (document.visibilityState === "visible" && token) {
        const isValid = await validateToken(token, false, true);
        if (!isValid) router.push(ROUTES.LOGIN);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [token, isLoading, validateToken, router]);

  useEffect(() => {
    if (isLoading) return;
    const isAuth = Boolean(token && user);
    const isLoginPage = pathname === ROUTES.LOGIN;
    if (isAuth && isLoginPage) router.push(ROUTES.MISSIONS);
    else if (!isAuth && !isLoginPage && pathname.startsWith("/dashboard"))
      router.push(ROUTES.LOGIN);
  }, [isLoading, token, user, pathname, router]);

  const login = useCallback(async (credentials: LuckyBetLoginData) => {
    setIsLoading(true);
    try {
      const res = await luckybetClient.login(credentials);
      if (res.status === "success" && res.token) {
        const newToken = res.token;
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_KEYS.token, newToken);
        }
        setToken(newToken);
        const profile = await luckybetClient.terminalInfo(newToken, true);
        if (profile.status === "success" && profile.content) {
          setUser(mapProfileToUser(profile.content));
        }
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return {
        success: false,
        error: res.error || "Usuario o contraseña incorrectos",
      };
    } catch {
      setIsLoading(false);
      return {
        success: false,
        error: "Error inesperado al intentar iniciar sesión",
      };
    }
  }, []);

  const logout = useCallback(async () => {
    if (token) {
      try {
        await luckybetClient.logout(token);
      } catch {
        // Best effort
      }
    }
    clearSession();
    router.push(ROUTES.LOGIN);
  }, [token, clearSession, router]);

  const verifyToken = useCallback(async () => {
    if (!token) return false;
    return validateToken(token, false, false);
  }, [token, validateToken]);

  const value = useMemo(
    () => ({
      token,
      user,
      isLoading,
      isValidating,
      login,
      logout,
      verifyToken,
    }),
    [token, user, isLoading, isValidating, login, logout, verifyToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
