import { apiClient } from "./client";
import { type ChartDataPoint } from "@/types";

export const analyticsApi = {
  overview: () => apiClient.get<{
    totalUsers: number;
    totalConversations: number;
    totalCharacters: number;
    aiGenerations: number;
    avgResponseTime: number;
    aiCost: number;
  }>("/analytics/overview"),

  engagement: (range?: string) =>
    apiClient.get<{ data: ChartDataPoint[] }>(`/analytics/engagement${range ? `?range=${range}` : ""}`),

  retention: () => apiClient.get<{ data: ChartDataPoint[] }>("/analytics/retention"),

  contentPerformance: () => apiClient.get<{ data: Array<{ name: string; value: number; color: string }> }>("/analytics/content-performance"),

  userGrowth: (range?: string) =>
    apiClient.get<{ data: ChartDataPoint[] }>(`/analytics/user-growth${range ? `?range=${range}` : ""}`),

  export: (type: string, range?: string) =>
    apiClient.get<{ url: string }>(`/analytics/export/${type}${range ? `?range=${range}` : ""}`),
};
