  import axios from "axios";

  const API = axios.create({
    baseURL: "http://localhost:8080/api/v1/auth/",
    withCredentials: true,
  });

  export const loginApi = async (payload) => {
    return API.post("login", payload).then((res) => res.data);
  };
  export const registerApi = async (payload) => {
    return API.post("register", payload).then((res) => res.data);
  };
