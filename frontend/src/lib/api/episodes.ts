import { apiClient } from "./client";
import { type Episode } from "@/types";

export const episodesApi = {
  list: (params?: { characterId?: string; status?: string; page?: number; pageSize?: number }) => {
    const qs = new URLSearchParams();
    if (params?.characterId) qs.set("characterId", params.characterId);
    if (params?.status) qs.set("status", params.status);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.pageSize) qs.set("pageSize", String(params.pageSize));
    const q = qs.toString();
    return apiClient.get<{ data: Episode[]; total: number; page: number; pageSize: number; totalPages: number }>(`/episodes${q ? `?${q}` : ""}`);
  },

  get: (id: string) => apiClient.get<Episode>(`/episodes/${id}`),

  create: (data: Partial<Episode>) => apiClient.post<Episode>("/episodes", data),

  update: (id: string, data: Partial<Episode>) => apiClient.patch<Episode>(`/episodes/${id}`, data),

  delete: (id: string) => apiClient.delete(`/episodes/${id}`),

  generate: (prompt: string) =>
    apiClient.post<{ episode: Episode; cost: number; model: string }>("/episodes/generate", { prompt }),
};
