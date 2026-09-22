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
} from "@/types/luckybet";

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
  const isMountedRef = useRef(false);

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
      showToastOnError = false,
    ): Promise<boolean> => {
      setIsValidating(true);
      try {
        const response = await luckybetClient.terminalInfo(
          tokenToVerify,
          isFirst,
        );

        if (response.status === "success" && response.content) {
          const profile = response.content;
          setUser({
            id: profile.id,
            login: profile.login,
            cash: profile.cash ?? 0,
            currency: profile.currency ?? "ARS",
            language: profile.language,
            name: profile.name,
            group: profile.group,
          });
          return true;
        }

        clearSession();
        if (showToastOnError) {
          casinoToast.error({
            title: "Sesión expirada",
            description:
              "Su sesión ha expirado. Por favor, inicie sesión nuevamente.",
          });
        }
        return false;
      } catch {
        return false;
      } finally {
        setIsValidating(false);
      }
    },
    [clearSession],
  );

  // Initial session restoration
  useEffect(() => {
    isMountedRef.current = true;
    const restoreSession = async () => {
      if (typeof window === "undefined") {
        setIsLoading(false);
        return;
      }

      const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.token);
      if (storedToken) {
        setToken(storedToken);
        const isValid = await validateToken(storedToken, true, false);
        if (!isValid) {
          clearSession();
        }
      }
      setIsLoading(false);
    };

    restoreSession();

    return () => {
      isMountedRef.current = false;
    };
  }, [validateToken, clearSession]);

  // Constant token verification interval and visibility check
  useEffect(() => {
    if (!token || isLoading) return;

    const intervalId = setInterval(async () => {
      const isValid = await validateToken(token, false, true);
      if (!isValid) {
        router.push(ROUTES.LOGIN);
      }
    }, TOKEN_CHECK_INTERVAL_MS);

    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible" && token) {
        const isValid = await validateToken(token, false, true);
        if (!isValid) {
          router.push(ROUTES.LOGIN);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [token, isLoading, validateToken, router]);

  // Route guard
  useEffect(() => {
    if (isLoading) return;

    const isAuth = Boolean(token && user);
    const isLoginPage = pathname === ROUTES.LOGIN;

    if (isAuth && isLoginPage) {
      router.push(ROUTES.DASHBOARD);
      return;
    }

    if (!isAuth && !isLoginPage && pathname.startsWith("/dashboard")) {
      router.push(ROUTES.LOGIN);
    }
  }, [isLoading, token, user, pathname, router]);

  const login = useCallback(
    async (
      credentials: LuckyBetLoginData,
    ): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      try {
        const response = await luckybetClient.login(credentials);

        if (response.status === "success" && response.token) {
          const newToken = response.token;
          if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_KEYS.token, newToken);
          }
          setToken(newToken);

          // Retrieve player terminal info immediately
          const profileResponse = await luckybetClient.terminalInfo(
            newToken,
            true,
          );
          if (profileResponse.status === "success" && profileResponse.content) {
            const profile = profileResponse.content;
            setUser({
              id: profile.id,
              login: profile.login,
              cash: profile.cash ?? 0,
              currency: profile.currency ?? "ARS",
              language: profile.language,
              name: profile.name,
              group: profile.group,
            });
          }

          setIsLoading(false);
          return { success: true };
        }

        setIsLoading(false);
        return {
          success: false,
          error: response.error || "Usuario o contraseña incorrectos",
        };
      } catch {
        setIsLoading(false);
        return {
          success: false,
          error: "Error inesperado al intentar iniciar sesión",
        };
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    if (token) {
      try {
        await luckybetClient.logout(token);
      } catch {
        // Best effort logout
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
