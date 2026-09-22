import { useContext } from "react";

import { AuthContext } from "@/context/AuthContext";
import type { AuthContextType } from "@/types/luckybet";

export const useAuthContext = (): AuthContextType => {
  return useContext(AuthContext);
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
