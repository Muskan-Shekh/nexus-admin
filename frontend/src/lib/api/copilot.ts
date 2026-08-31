import { apiClient } from "./client";

export interface CopilotMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const copilotApi = {
  chat: (messages: CopilotMessage[]) =>
    apiClient.post<{ message: string; actions?: Array<{ type: string; params: Record<string, unknown> }> }>("/copilot/chat", { messages }),

  execute: (actions: Array<{ type: string; params: Record<string, unknown> }>) =>
    apiClient.post<{ results: Array<{ success: boolean; message: string }> }>("/copilot/execute", { actions }),
};
