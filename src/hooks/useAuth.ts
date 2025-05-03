import { resetAuth } from "@/app/store/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "@/app/store/store.config";
import { Modal } from "antd";
import { useCallback } from "react";

export function useAuth() {
  const auth = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    Modal.confirm({
      title: "Are you sure",
      content:
        "You are logging out of your account. You have to sign in again.",
      onOk: () => {
        dispatch(resetAuth());
      },
    });
  }, [dispatch]);

  return { ...auth, logout };
}
