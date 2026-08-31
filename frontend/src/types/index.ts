export interface Character {
  id: string;
  name: string;
  slug: string;
  persona: string;
  backstory: string;
  voice: string;
  avatar?: string;
  genre: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  featured: boolean;
  version: number;
  aiGenerated: boolean;
  confidence?: number;
  model?: string;
  cost?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Episode {
  id: string;
  title: string;
  slug: string;
  characterId: string;
  character?: Character;
  order: number;
  content: string;
  status: "draft" | "review" | "published" | "scheduled";
  scheduledAt?: string;
  aiGenerated: boolean;
  confidence?: number;
  model?: string;
  cost?: number;
  createdAt: string;
  updatedAt: string;
}

export interface StoryFlow {
  id: string;
  name: string;
  description: string;
  nodes: StoryFlowNode[];
  edges: StoryFlowEdge[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StoryFlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, unknown>;
}

export interface StoryFlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
  condition?: string;
}

export interface Prompt {
  id: string;
  name: string;
  content: string;
  variables: PromptVariable[];
  versions: PromptVersion[];
  abVariants: ABVariant[];
  qualityScore?: number;
  status: "draft" | "active" | "archived";
  characterId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromptVariable {
  name: string;
  description?: string;
  required: boolean;
  defaultValue?: string;
}

export interface PromptVersion {
  id: string;
  promptId: string;
  content: string;
  changelog: string;
  createdAt: string;
}

export interface ABVariant {
  id: string;
  promptId: string;
  name: string;
  content: string;
  trafficSplit: number;
  metrics: ABMetrics;
}

export interface ABMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
}

import type { User } from "@/lib/auth/auth-context";

export interface Conversation {
  id: string;
  userId: string;
  user?: User;
  characterId: string;
  character?: Character;
  messageCount: number;
  flagged: boolean;
  escalated: boolean;
  qualityScore?: number;
  startedAt: string;
  lastMessageAt: string;
}

export interface ModerationItem {
  id: string;
  type: "safety" | "nsfw" | "minors" | "self_harm" | "abuse" | "user_report" | "ai_flag" | "escalation";
  entityType: "conversation" | "character" | "episode" | "user";
  entityId: string;
  reason: string;
  status: "pending" | "reviewing" | "resolved" | "dismissed";
  severity: "low" | "medium" | "high" | "critical";
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  entityType: string;
  entityId: string;
  entityName?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  aiModel?: string;
  promptVersion?: string;
  cost?: number;
  outcome: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  description?: string;
  usageCount: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  usageCount: number;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  tags: string[];
  createdAt: string;
}

export interface DashboardStats {
  totalCharacters: number;
  totalEpisodes: number;
  totalConversations: number;
  activeUsers: number;
  aiGenerations: number;
  moderationQueue: number;
  avgResponseTime: number;
  systemHealth: "healthy" | "degraded" | "down";
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}
