import { loginApi, registerApi } from "@/apis/auth.api";
import { useMutation } from "@tanstack/react-query";

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
