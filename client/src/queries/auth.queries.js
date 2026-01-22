import { loginApi, logoutApi, registerApi } from "@/apis/auth.api";
import useUserStore from "@/app/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};
export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
  });
};
export const useLogout = () => {
  const queryClient = useQueryClient();
  const logOut = useUserStore((state) => state.logOut);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
      logOut();
      navigate("/login");
    },
  });
};
