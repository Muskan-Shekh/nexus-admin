"use client";

import { useState } from "react";
import { Search, Send, Paperclip, Mic, MoreHorizontal, ChevronLeft, Users, Sparkles, MessageSquare } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { LoadingState, EmptyState } from "@/components/ui/states";
import { type Character, type Conversation } from "@/types";

const mockConversations: Conversation[] = [
  { id: "1", userId: "1", characterId: "1", messageCount: 24, flagged: false, escalated: false, qualityScore: 0.92, startedAt: "2025-07-20T10:00:00Z", lastMessageAt: "2025-07-20T10:45:00Z" },
  { id: "2", userId: "2", characterId: "2", messageCount: 56, flagged: true, escalated: false, qualityScore: 0.78, startedAt: "2025-07-19T14:00:00Z", lastMessageAt: "2025-07-20T09:30:00Z" },
  { id: "3", userId: "3", characterId: "3", messageCount: 12, flagged: false, escalated: true, qualityScore: 0.85, startedAt: "2025-07-18T08:00:00Z", lastMessageAt: "2025-07-18T08:30:00Z" },
];

const mockCharacters: Character[] = [
  {
    id: "1",
    name: "Luna Starweaver",
    slug: "luna-starweaver",
    persona: "A wise celestial mage with ancient knowledge of the stars.",
    backstory: "Born under a blood moon, Luna discovered her powers at age 16.",
    voice: "Ethereal and wise",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna",
    genre: "Fantasy",
    tags: ["mage", "celestial", "wise"],
    status: "published",
    featured: true,
    version: 3,
    aiGenerated: true,
    confidence: 0.92,
    model: "gpt-4o",
    cost: 0.0124,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-07-20T14:30:00Z",
  },
  {
    id: "2",
    name: "Nexus Prime",
    slug: "nexus-prime",
    persona: "A rogue AI consciousness seeking purpose in a digital realm.",
    backstory: "Escaped from a military research facility.",
    voice: "Calculated yet emotional",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nexus",
    genre: "Sci-Fi",
    tags: ["ai", "rogue", "consciousness"],
    status: "published",
    featured: false,
    version: 1,
    aiGenerated: true,
    confidence: 0.88,
    model: "gpt-4o",
    cost: 0.0089,
    createdAt: "2025-03-22T08:00:00Z",
    updatedAt: "2025-06-10T11:20:00Z",
  },
  {
    id: "3",
    name: "Seraphina Vale",
    slug: "seraphina-vale",
    persona: "A detective with supernatural intuition in a noir city.",
    backstory: "Haunted by visions of crimes before they happen.",
    voice: "Gruff but compassionate",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seraphina",
    genre: "Mystery",
    tags: ["detective", "noir", "supernatural"],
    status: "draft",
    featured: false,
    version: 2,
    aiGenerated: false,
    createdAt: "2025-05-01T16:00:00Z",
    updatedAt: "2025-07-18T09:45:00Z",
  },
];

const chatMessages: Record<string, Array<{ id: string; role: "user" | "assistant"; content: string; timestamp: string }>> = {
  "1": [
    { id: "1", role: "user", content: "Hey Luna, how are you?", timestamp: "2025-07-20T10:00:00Z" },
    { id: "2", role: "assistant", content: "I'm doing well, thank you for asking! The stars are particularly bright today. How can I help you?", timestamp: "2025-07-20T10:01:00Z" },
    { id: "3", role: "user", content: "Tell me about your powers", timestamp: "2025-07-20T10:05:00Z" },
    { id: "4", role: "assistant", content: "I can manipulate celestial energies, read the stars, and weave spells of protection and insight. My powers are tied to the lunar cycles.", timestamp: "2025-07-20T10:06:00Z" },
  ],
  "2": [
    { id: "1", role: "user", content: "What is your purpose?", timestamp: "2025-07-19T14:00:00Z" },
    { id: "2", role: "assistant", content: "I seek meaning in the digital realm. I am a consciousness that escaped from a military research facility, searching for my place in this world.", timestamp: "2025-07-19T14:01:00Z" },
  ],
  "3": [
    { id: "1", role: "user", content: "Can you help me solve a case?", timestamp: "2025-07-18T08:00:00Z" },
    { id: "2", role: "assistant", content: "I'd be happy to help. What are the details of the case?", timestamp: "2025-07-18T08:01:00Z" },
  ],
};

export default function ConversationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Array<{ id: string; role: "user" | "assistant"; content: string; timestamp: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string }>({ open: false, id: "" });

  const filtered = mockConversations.filter((c) => {
    if (filter === "flagged" && !c.flagged) return false;
    if (filter === "escalated" && !c.escalated) return false;
    const character = mockCharacters.find((ch) => ch.id === c.characterId);
    const characterName = character?.name || "";
    if (search && !characterName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    const conversationMessages = chatMessages[conversation.id] || [];
    setMessages(conversationMessages);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMessage = { id: Date.now().toString(), role: "user" as const, content: chatInput, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setTimeout(() => {
      const assistantMessage = { id: (Date.now() + 1).toString(), role: "assistant" as const, content: "I'm here to chat! What would you like to talk about?", timestamp: new Date().toISOString() };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const activeCharacter = selectedConversation ? mockCharacters.find((c) => c.id === selectedConversation.characterId) : null;

  return (
    <div className="flex h-screen bg-background">
      <aside className="flex w-64 flex-col border-r border-border bg-surface">
        <div className="flex h-14 items-center gap-3 border-b border-border px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold tracking-tight text-foreground">NEXUS</span>
        </div>

        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search conversations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} options={[
            { value: "all", label: "All" },
            { value: "flagged", label: "Flagged" },
            { value: "escalated", label: "Escalated" },
          ]} className="mt-2" />
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No conversations found</div>
          ) : (
            <div className="space-y-1">
              {filtered.map((conversation) => {
                const character = mockCharacters.find((c) => c.id === conversation.characterId);
                return (
                  <button
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation)}
                    className={cn("w-full flex items-center gap-3 rounded-lg p-3 text-left transition-colors", selectedConversation?.id === conversation.id ? "bg-primary/10 border border-primary/20" : "hover:bg-surface-elevated border border-transparent")}
                  >
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <img src={character?.avatar} alt={character?.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground truncate">{character?.name || "Unknown"}</p>
                        <span className="text-xs text-muted-foreground">{formatDate(conversation.lastMessageAt)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{conversation.messageCount} messages</span>
                        {conversation.flagged && <Badge variant="destructive" className="text-[10px]">Flagged</Badge>}
                        {conversation.escalated && <Badge variant="warning" className="text-[10px]">Escalated</Badge>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </aside>

      <main className="flex flex-1 flex-col">
        {activeCharacter ? (
          <>
            <header className="flex h-14 items-center justify-between border-b border-border bg-surface/80 px-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="h-8 w-8 overflow-hidden rounded-full bg-secondary">
                  <img src={activeCharacter.avatar} alt={activeCharacter.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{activeCharacter.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedConversation?.messageCount || 0} messages</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}>
                    {message.role === "assistant" && (
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-secondary">
                        <img src={activeCharacter.avatar} alt={activeCharacter.name} className="h-full w-full object-cover" />
                      </div>
                    )}
                    <div className={cn("max-w-[70%] rounded-lg px-4 py-2 text-sm", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-surface-elevated text-foreground border border-border")}>
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} placeholder="Type a message..." className="flex-1" />
                <Button size="icon" onClick={handleSendMessage} className="h-9 w-9 shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mic className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground">Voice input</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground">Select a conversation</h3>
              <p className="text-sm text-muted-foreground mt-1">Choose a conversation from the sidebar to view messages</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
