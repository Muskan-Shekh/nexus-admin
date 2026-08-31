import { apiClient } from "./client";
import { type Character } from "@/types";

export const chatsApi = {
  list: (params?: { search?: string; status?: string; genre?: string; page?: number; pageSize?: number }) => {
    const qs = new URLSearchParams();
    if (params?.search) qs.set("search", params.search);
    if (params?.status) qs.set("status", params.status);
    if (params?.genre) qs.set("genre", params.genre);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.pageSize) qs.set("pageSize", String(params.pageSize));
    const q = qs.toString();
    return apiClient.get<{ data: Character[]; total: number; page: number; pageSize: number; totalPages: number }>(
      `/chats${q ? `?${q}` : ""}`
    );
  },

  get: (id: string) => apiClient.get<Character>(`/chats/${id}`),

  create: (data: Partial<Character>) => apiClient.post<Character>("/chats", data),

  update: (id: string, data: Partial<Character>) => apiClient.patch<Character>(`/chats/${id}`, data),

  delete: (id: string) => apiClient.delete(`/chats/${id}`),

  generate: (prompt: string) =>
    apiClient.post<{ character: Character; cost: number; model: string }>("/chats/generate", { prompt }),
};
