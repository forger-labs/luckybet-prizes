"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AUTH_TOKEN, ROUTES } from "@shared/constants";
import type { AuthContextType, UserType } from "@shared/types/authContext";
import { jwtDecode } from "@shared/utils/decodeJWT";

export const AuthContext = createContext<AuthContextType>({
  authToken: null,
  user: null,
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      try {
        jwtDecode<UserType>(token); // Validate JWT, don't store if invalid
        return token;
      } catch {
        console.error("Error decoding stored token");
        localStorage.removeItem(AUTH_TOKEN);
      }
    }
    return null;
  });

  const navigation = useRouter();
  const pathname = usePathname();

  // Derive user from authToken — avoids setState cascades in effects.
  // Also checks expiry so stale tokens never produce a non-null user,
  // preventing redirect loops after token expiry.
  const user = useMemo<UserType | null>(() => {
    if (!authToken) return null;
    try {
      const decoded = jwtDecode<UserType>(authToken);
      const time = Date.now() / 1000;
      if (decoded.exp && decoded.exp < time) return null;
      return decoded;
    } catch {
      return null;
    }
  }, [authToken]);

  const logout = useCallback(() => {
    setAuthToken(null);
    localStorage.removeItem(AUTH_TOKEN);
    navigation.push(ROUTES.LOGIN);
  }, [navigation]);

  // Clean up stale tokens from localStorage when user is derived but token exists
  // TODO: check this code in case it deletes AUTH_TOKEN when user is null but authToken is valid
  useEffect(() => {
    if (!user && authToken) {
      localStorage.removeItem(AUTH_TOKEN);
    }
  }, [authToken, user]);

  // Route guard — only handles navigation, no setState calls
  useEffect(() => {
    if (user && pathname === ROUTES.LOGIN) {
      navigation.push(ROUTES.DASHBOARD);
      return;
    }

    if (!user && pathname !== ROUTES.LOGIN) {
      navigation.push(ROUTES.LOGIN);
      return;
    }
  }, [pathname, user, navigation]);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
