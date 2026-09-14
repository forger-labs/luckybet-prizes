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

import { jwtDecode } from "@shared/utils/decodeJWT";

import { LOCAL_STORAGE_KEYS } from "@/constant";
import { apiAdminGanaya } from "@/libs/apiAdminGanaya";
import type { AdminUser } from "@/types/auth";

interface AuthAdminContextType {
  user: AdminUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthAdminContext = createContext<AuthAdminContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthAdminProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const path = usePathname();
  const router = useRouter();

  const login = useCallback(async (username: string, password: string) => {
    const res = await apiAdminGanaya.login(username, password);

    if (res.data?.accessToken) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.accessToken,
        res.data.accessToken,
      );
      const payload = jwtDecode<AdminUser>(res.data.accessToken);

      setUser(payload);
    }
  }, []);

  const getMe = useCallback(async () => {
    if (!user) {
      if (path !== "/") {
        const me = await apiAdminGanaya.getMe();
        if (me.status) {
          setUser(me.data);
        }
      }
    }
  }, [user, path]);

  useEffect(() => {
    getMe();
  }, [getMe]);

  const logout = useCallback(async () => {
    await apiAdminGanaya.logout();
    localStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
    setUser(null);
    router.push("/");
  }, [router]);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return (
    <AuthAdminContext.Provider value={value}>
      {children}
    </AuthAdminContext.Provider>
  );
};
