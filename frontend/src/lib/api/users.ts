import { apiClient } from "./client";

export const usersApi = {
  list: (params?: { search?: string; role?: string; status?: string; page?: number; pageSize?: number }) => {
    const qs = new URLSearchParams();
    if (params?.search) qs.set("search", params.search);
    if (params?.role) qs.set("role", params.role);
    if (params?.status) qs.set("status", params.status);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.pageSize) qs.set("pageSize", String(params.pageSize));
    const q = qs.toString();
    return apiClient.get<{ data: Array<{ id: string; name: string; email: string; role: string; plan: string; status: string; activity: string }>; total: number; page: number; pageSize: number; totalPages: number }>(`/users${q ? `?${q}` : ""}`);
  },

  get: (id: string) => apiClient.get<{ id: string; name: string; email: string; role: string; plan: string; status: string }>(`/users/${id}`),

  update: (id: string, data: { name?: string; email?: string; role?: string; plan?: string; status?: string }) =>
    apiClient.patch(`/users/${id}`, data),

  suspend: (id: string) => apiClient.post(`/users/${id}/suspend`),

  ban: (id: string) => apiClient.post(`/users/${id}/ban`),

  impersonate: (id: string) =>
    apiClient.post<{ token: string }>(`/users/${id}/impersonate`),
};
