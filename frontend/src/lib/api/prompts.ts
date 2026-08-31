import { apiClient } from "./client";
import { type Prompt } from "@/types";

export const promptsApi = {
  list: (params?: { status?: string; characterId?: string; page?: number; pageSize?: number }) => {
    const qs = new URLSearchParams();
    if (params?.status) qs.set("status", params.status);
    if (params?.characterId) qs.set("characterId", params.characterId);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.pageSize) qs.set("pageSize", String(params.pageSize));
    const q = qs.toString();
    return apiClient.get<{ data: Prompt[]; total: number; page: number; pageSize: number; totalPages: number }>(`/prompts${q ? `?${q}` : ""}`);
  },

  get: (id: string) => apiClient.get<Prompt>(`/prompts/${id}`),

  create: (data: Partial<Prompt>) => apiClient.post<Prompt>("/prompts", data),

  update: (id: string, data: Partial<Prompt>) => apiClient.patch<Prompt>(`/prompts/${id}`, data),

  delete: (id: string) => apiClient.delete(`/prompts/${id}`),

  improve: (id: string) =>
    apiClient.post<{ prompt: Prompt; cost: number; model: string }>(`/prompts/${id}/improve`),

  versions: (id: string) => apiClient.get<{ data: Prompt["versions"] }>(`/prompts/${id}/versions`),

  rollback: (id: string, versionId: string) =>
    apiClient.post<{ prompt: Prompt }>(`/prompts/${id}/rollback`, { versionId }),
};
