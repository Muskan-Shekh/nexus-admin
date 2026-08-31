import { apiClient } from "./client";
import { type MediaAsset } from "@/types";

export const mediaApi = {
  list: (params?: { search?: string; mimeType?: string; page?: number; pageSize?: number }) => {
    const qs = new URLSearchParams();
    if (params?.search) qs.set("search", params.search);
    if (params?.mimeType) qs.set("mimeType", params.mimeType);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.pageSize) qs.set("pageSize", String(params.pageSize));
    const q = qs.toString();
    return apiClient.get<{ data: MediaAsset[]; total: number; page: number; pageSize: number; totalPages: number }>(`/media${q ? `?${q}` : ""}`);
  },

  get: (id: string) => apiClient.get<MediaAsset>(`/media/${id}`),

  upload: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<MediaAsset>("/media/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  delete: (id: string) => apiClient.delete(`/media/${id}`),
};
