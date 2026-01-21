import api from "./axios";

export const loginApi = async (payload) => {
  return api.post("auth/login", payload).then((res) => res.data);
};
export const registerApi = async (payload) => {
  const res = await api.post("auth/register", payload);
  return res.data;
};
