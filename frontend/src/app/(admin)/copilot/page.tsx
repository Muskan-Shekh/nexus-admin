"use client";

import { useState } from "react";
import { Sparkles, Send, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  { id: "1", role: "assistant", content: "Hello! I'm Nexus AI, your admin copilot. How can I help you today?", timestamp: new Date(Date.now() - 60000) },
];

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { id: Math.random().toString(), role: "user", content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    const aiMessage: Message = { id: Math.random().toString(), role: "assistant", content: "I've analyzed your request. Here's what I found:\n\n- 3 characters match your criteria\n- 2 episodes need review\n- Estimated cost: $0.24\n\nWould you like me to proceed?", timestamp: new Date() };
    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">Admin Copilot</h2>
        <p className="text-sm text-muted-foreground">Your AI assistant for platform management.</p>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[80%] rounded-xl px-4 py-3", msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-surface-elevated text-foreground border border-border")}>
                  {msg.role === "assistant" && (
                    <div className="mb-1 flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-ai" />
                      <span className="text-xs font-medium text-ai">Nexus AI</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                  <p className={cn("mt-1 text-[10px]", msg.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-surface-elevated border border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Ask Nexus AI anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              className="flex-1"
            />
            <Button onClick={handleSend} loading={isLoading} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">Nexus AI can make mistakes. Verify important actions before executing.</p>
        </div>
      </Card>
    </div>
  );
}
