import { apiClient } from "./client";
import { type ModerationItem } from "@/types";

export const moderationApi = {
  list: (params?: { status?: string; type?: string; severity?: string; page?: number; pageSize?: number }) => {
    const qs = new URLSearchParams();
    if (params?.status) qs.set("status", params.status);
    if (params?.type) qs.set("type", params.type);
    if (params?.severity) qs.set("severity", params.severity);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.pageSize) qs.set("pageSize", String(params.pageSize));
    const q = qs.toString();
    return apiClient.get<{ data: ModerationItem[]; total: number; page: number; pageSize: number; totalPages: number }>(`/moderation${q ? `?${q}` : ""}`);
  },

  get: (id: string) => apiClient.get<ModerationItem>(`/moderation/${id}`),

  approve: (id: string) => apiClient.post(`/moderation/${id}/approve`),

  dismiss: (id: string) => apiClient.post(`/moderation/${id}/dismiss`),

  escalate: (id: string) => apiClient.post(`/moderation/${id}/escalate`),
};
