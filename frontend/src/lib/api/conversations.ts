import { apiClient } from "./client";
import { type Conversation } from "@/types";

export const conversationsApi = {
  list: (params?: { userId?: string; characterId?: string; flagged?: boolean; page?: number; pageSize?: number }) => {
    const qs = new URLSearchParams();
    if (params?.userId) qs.set("userId", params.userId);
    if (params?.characterId) qs.set("characterId", params.characterId);
    if (params?.flagged) qs.set("flagged", String(params.flagged));
    if (params?.page) qs.set("page", String(params.page));
    if (params?.pageSize) qs.set("pageSize", String(params.pageSize));
    const q = qs.toString();
    return apiClient.get<{ data: Conversation[]; total: number; page: number; pageSize: number; totalPages: number }>(`/conversations${q ? `?${q}` : ""}`);
  },

  get: (id: string) => apiClient.get<Conversation>(`/conversations/${id}`),

  flag: (id: string, reason: string) => apiClient.post(`/conversations/${id}/flag`, { reason }),

  escalate: (id: string) => apiClient.post(`/conversations/${id}/escalate`),

  score: (id: string) => apiClient.get<{ qualityScore: number; personaFidelity: number; coherence: number; userSatisfaction: number }>(`/conversations/${id}/score`),
};
