import api from "./axios";

const setupInterceptors = () => {
  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await api.post("/auth/refresh");
          return api(originalRequest);
        } catch (err) {
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    },
  );
};

export default setupInterceptors;
