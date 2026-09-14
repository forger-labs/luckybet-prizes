import { useContext } from "react";

import { AuthAdminContext } from "@/context/AuthAdminContext";

export const useAuthAdmin = () => {
  return useContext(AuthAdminContext);
};
