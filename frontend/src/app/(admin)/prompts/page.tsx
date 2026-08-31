"use client";

import { useState } from "react";
import { Plus, Sparkles, History, GitCompare, BarChart3, RotateCcw, Pencil, Trash2 } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LoadingState, EmptyState } from "@/components/ui/states";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { type Prompt } from "@/types";

const mockPrompts: Prompt[] = [
  {
    id: "1",
    name: "Main Chat Prompt",
    content: "You are {{character_name}}, {{persona}}. Respond in character with empathy and creativity.",
    variables: [
      { name: "character_name", description: "Name of the character", required: true, defaultValue: "" },
      { name: "persona", description: "Character personality summary", required: true, defaultValue: "" },
    ],
    versions: [
      { id: "v1", promptId: "1", content: "You are {{character_name}}.", changelog: "Initial version", createdAt: "2025-01-01T00:00:00Z" },
      { id: "v2", promptId: "1", content: "You are {{character_name}}, {{persona}}.", changelog: "Added persona variable", createdAt: "2025-02-15T00:00:00Z" },
      { id: "v3", promptId: "1", content: "You are {{character_name}}, {{persona}}. Respond in character with empathy and creativity.", changelog: "Added response guidance", createdAt: "2025-06-01T00:00:00Z" },
    ],
    abVariants: [
      { id: "a1", promptId: "1", name: "Variant A", content: "You are {{character_name}}, {{persona}}. Be concise.", trafficSplit: 50, metrics: { impressions: 1200, clicks: 340, conversions: 89 } },
      { id: "a2", promptId: "1", name: "Variant B", content: "You are {{character_name}}, {{persona}}. Be detailed and immersive.", trafficSplit: 50, metrics: { impressions: 1180, clicks: 410, conversions: 102 } },
    ],
    qualityScore: 0.87,
    status: "active",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-07-20T14:30:00Z",
  },
  {
    id: "2",
    name: "Onboarding Greeting",
    content: "Welcome, {{user_name}}! I'm {{character_name}}. How can I help you today?",
    variables: [
      { name: "user_name", description: "User's display name", required: true, defaultValue: "friend" },
      { name: "character_name", description: "Character name", required: true, defaultValue: "" },
    ],
    versions: [
      { id: "v1", promptId: "2", content: "Hello!", changelog: "Initial version", createdAt: "2025-03-10T00:00:00Z" },
    ],
    abVariants: [],
    qualityScore: 0.72,
    status: "draft",
    createdAt: "2025-03-10T00:00:00Z",
    updatedAt: "2025-07-18T09:45:00Z",
  },
];

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [search, setSearch] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string }>({ open: false, id: "" });
  const [isImproving, setIsImproving] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");

  const filtered = prompts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleImprove = async () => {
    setIsImproving(true);
    await new Promise((r) => setTimeout(r, 2000));
    if (selectedPrompt) {
      setPrompts((prev) =>
        prev.map((p) =>
          p.id === selectedPrompt.id
            ? {
                ...p,
                content: p.content + " Always stay in character and avoid breaking the fourth wall.",
                qualityScore: Math.min(1, (p.qualityScore || 0) + 0.05),
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
      setSelectedPrompt((prev) =>
        prev
          ? {
              ...prev,
              content: prev.content + " Always stay in character and avoid breaking the fourth wall.",
              qualityScore: Math.min(1, (prev.qualityScore || 0) + 0.05),
              updatedAt: new Date().toISOString(),
            }
          : null
      );
    }
    setIsImproving(false);
  };

  const handleDelete = () => {
    setPrompts((prev) => prev.filter((p) => p.id !== deleteDialog.id));
    setDeleteDialog({ open: false, id: "" });
  };

  const qualityColor = (score?: number) => {
    if (!score) return "secondary";
    if (score >= 0.85) return "success";
    if (score >= 0.7) return "warning";
    return "error";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Prompts</h2>
          <p className="text-sm text-muted-foreground">Manage prompts, versions, A/B variants, and AI improvements.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ai" onClick={handleImprove} loading={isImproving}>
            <Sparkles className="h-4 w-4" />
            {isImproving ? "Improving..." : "AI Improve"}
          </Button>
          <Button onClick={() => { setSelectedPrompt(null); setActiveTab("editor"); setDrawerOpen(true); }}>
            <Plus className="h-4 w-4" /> New Prompt
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <Input placeholder="Search prompts..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-xs" />
      </Card>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Sparkles className="h-12 w-12" />}
            title="No prompts found"
            description="Create a prompt or adjust your search."
            action={
              <Button onClick={() => { setSelectedPrompt(null); setActiveTab("editor"); setDrawerOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" /> Create Prompt
              </Button>
            }
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Variables</TableHead>
                <TableHead>Versions</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((prompt) => (
                <TableRow key={prompt.id}>
                  <TableCell className="font-medium">{prompt.name}</TableCell>
                  <TableCell>
                    <Badge variant={prompt.status === "active" ? "success" : prompt.status === "draft" ? "secondary" : "outline"}>
                      {prompt.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(prompt.qualityScore || 0) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{((prompt.qualityScore || 0) * 100).toFixed(0)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{prompt.variables.length}</TableCell>
                  <TableCell className="text-muted-foreground">{prompt.versions.length}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(prompt.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedPrompt(prompt); setActiveTab("editor"); setDrawerOpen(true); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteDialog({ open: true, id: prompt.id })}>
                        <Trash2 className="h-4 w-4 text-error" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Drawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setSelectedPrompt(null); }}
        title={selectedPrompt ? "Edit Prompt" : "New Prompt"}
        description="Manage prompt content, variables, and versions"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => { setDrawerOpen(false); setSelectedPrompt(null); }}>Cancel</Button>
            <Button onClick={() => { setDrawerOpen(false); setSelectedPrompt(null); }}>
              {selectedPrompt ? "Save Changes" : "Create Prompt"}
            </Button>
          </div>
        }
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue={activeTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="versions">Versions</TabsTrigger>
            <TabsTrigger value="ab">A/B Variants</TabsTrigger>
          </TabsList>
          <TabsContent value="editor">
            <div className="space-y-4">
              <Input label="Name" defaultValue={selectedPrompt?.name} placeholder="Prompt name" />
              <Textarea label="Content" defaultValue={selectedPrompt?.content} placeholder="Use {{variable}} syntax..." className="min-h-[160px] font-mono text-sm" />
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">AI Improve</p>
                  <p className="text-xs text-muted-foreground">Use AI to enhance this prompt</p>
                </div>
                <Button variant="ai" size="sm" onClick={handleImprove} loading={isImproving}>
                  <Sparkles className="h-4 w-4 mr-1" /> Improve
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="versions">
            <div className="space-y-3">
              {(selectedPrompt?.versions || []).map((version) => (
                <div key={version.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{version.id.toUpperCase()}</p>
                    <span className="text-xs text-muted-foreground">{formatDate(version.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{version.content}</p>
                  <p className="mt-1 text-xs text-muted-foreground italic">{version.changelog}</p>
                </div>
              ))}
              {(!selectedPrompt?.versions || selectedPrompt.versions.length === 0) && (
                <p className="text-sm text-muted-foreground">No versions yet.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="ab">
            <div className="space-y-3">
              {(selectedPrompt?.abVariants || []).map((variant) => (
                <div key={variant.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{variant.name}</p>
                    <Badge variant="secondary">{variant.trafficSplit}% traffic</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{variant.content}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Impressions: {variant.metrics.impressions}</span>
                    <span>Clicks: {variant.metrics.clicks}</span>
                    <span>Conversions: {variant.metrics.conversions}</span>
                  </div>
                </div>
              ))}
              {(!selectedPrompt?.abVariants || selectedPrompt.abVariants.length === 0) && (
                <p className="text-sm text-muted-foreground">No A/B variants configured.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Drawer>

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: "" })}
        onConfirm={handleDelete}
        title="Delete Prompt"
        description="This will permanently delete this prompt and its history."
        confirmLabel="Delete"
        variant="destructive"
      />
    </div>
  );
}
