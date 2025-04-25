import { useAppSelector } from "@/app/store/store.config";
import { useCallback } from "react";

export function useAuth() {
  const auth = useAppSelector((store) => store.auth);

  const logout = useCallback(() => {}, []);

  return { ...auth, logout };
}
