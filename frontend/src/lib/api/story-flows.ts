import { apiClient } from "./client";
import { type StoryFlow, type StoryFlowNode, type StoryFlowEdge } from "@/types";

export const storyFlowsApi = {
  list: () => apiClient.get<{ data: StoryFlow[] }>("/story-flows"),

  get: (id: string) => apiClient.get<StoryFlow>(`/story-flows/${id}`),

  create: (data: Partial<StoryFlow>) => apiClient.post<StoryFlow>("/story-flows", data),

  update: (id: string, data: Partial<StoryFlow>) => apiClient.patch<StoryFlow>(`/story-flows/${id}`, data),

  delete: (id: string) => apiClient.delete(`/story-flows/${id}`),

  generate: (prompt: string) =>
    apiClient.post<{ nodes: StoryFlowNode[]; edges: StoryFlowEdge[]; cost: number; model: string }>("/story-flows/generate", { prompt }),
};
