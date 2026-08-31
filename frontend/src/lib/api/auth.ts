import { apiClient } from "./client";

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<{ user: { id: string; email: string; name: string; role: string; plan: string; status: string }; token: string }>("/auth/login", {
      email,
      password,
    }),

  register: (data: { email: string; password: string; name: string }) =>
    apiClient.post<{ user: { id: string; email: string; name: string; role: string; plan: string; status: string }; token: string }>("/auth/register", data),

  forgotPassword: (email: string) => apiClient.post<{ message: string }>("/auth/forgot-password", { email }),

  resetPassword: (token: string, password: string) =>
    apiClient.post<{ message: string }>("/auth/reset-password", { token, password }),
};
