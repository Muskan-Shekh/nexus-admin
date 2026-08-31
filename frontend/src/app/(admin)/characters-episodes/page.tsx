"use client";

import { useState } from "react";
import { Plus, Sparkles, Pencil, Trash2, Play, UserSquare } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { EmptyState } from "@/components/ui/states";
import { type Character, type Episode } from "@/types";

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

const mockEpisodes: Episode[] = [
  {
    id: "1",
    title: "The Awakening",
    slug: "the-awakening",
    characterId: "1",
    order: 1,
    content: "The stars aligned as Luna opened her eyes to a new destiny...",
    status: "published",
    aiGenerated: true,
    confidence: 0.94,
    model: "gpt-4o",
    cost: 0.0234,
    createdAt: "2025-01-20T10:00:00Z",
    updatedAt: "2025-07-21T14:30:00Z",
  },
  {
    id: "2",
    title: "Digital Frontier",
    slug: "digital-frontier",
    characterId: "1",
    order: 2,
    content: "Beyond the boundaries of known code lay a frontier uncharted...",
    status: "published",
    aiGenerated: true,
    confidence: 0.91,
    model: "gpt-4o",
    cost: 0.0198,
    createdAt: "2025-06-12T09:00:00Z",
    updatedAt: "2025-07-17T16:00:00Z",
  },
  {
    id: "3",
    title: "Shadows of the Past",
    slug: "shadows-of-the-past",
    characterId: "2",
    order: 1,
    content: "Nexus Prime navigated through the digital shadows, searching for meaning...",
    status: "review",
    aiGenerated: true,
    confidence: 0.89,
    model: "gpt-4o",
    cost: 0.0187,
    createdAt: "2025-03-25T08:00:00Z",
    updatedAt: "2025-07-19T11:20:00Z",
  },
  {
    id: "4",
    title: "Midnight Clues",
    slug: "midnight-clues",
    characterId: "3",
    order: 1,
    content: "The neon lights flickered as Seraphina stepped into the crime scene...",
    status: "draft",
    aiGenerated: false,
    createdAt: "2025-05-05T16:00:00Z",
    updatedAt: "2025-07-18T09:45:00Z",
  },
];

const statusColors: Record<string, "success" | "secondary" | "outline" | "warning" | "info"> = {
  published: "success",
  review: "warning",
  draft: "secondary",
  scheduled: "info",
};

export default function CharactersEpisodesPage() {
  const [characters] = useState<Character[]>(mockCharacters);
  const [episodes, setEpisodes] = useState<Episode[]>(mockEpisodes);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(mockCharacters[0].id);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string }>({ open: false, id: "" });
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedCharacter = characters.find((c) => c.id === selectedCharacterId) || characters[0];
  const characterEpisodes = episodes
    .filter((e) => e.characterId === selectedCharacterId)
    .filter((e) => {
      const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || e.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    const newEp: Episode = {
      id: Math.random().toString(36).slice(2),
      title: `New Episode ${episodes.filter((e) => e.characterId === selectedCharacterId).length + 1}`,
      slug: `new-episode-${Date.now()}`,
      characterId: selectedCharacterId,
      order: episodes.filter((e) => e.characterId === selectedCharacterId).length + 1,
      content: "New episode content...",
      status: "draft",
      aiGenerated: true,
      confidence: 0.90,
      model: "gpt-4o",
      cost: 0.015,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEpisodes((prev) => [...prev, newEp]);
    setSelectedEpisode(newEp);
    setDrawerOpen(true);
    setIsGenerating(false);
  };

  const handleDelete = () => {
    setEpisodes((prev) => prev.filter((e) => e.id !== deleteDialog.id));
    setDeleteDialog({ open: false, id: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Characters & Episodes</h2>
          <p className="text-sm text-muted-foreground">Manage character profiles and their episode content.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 p-4">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Characters</h3>
          <div className="space-y-2">
            {characters.map((char) => {
              const episodeCount = episodes.filter((e) => e.characterId === char.id).length;
              const isActive = char.id === selectedCharacterId;
              return (
                <button
                  key={char.id}
                  onClick={() => setSelectedCharacterId(char.id)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                    isActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-surface-elevated"
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    {char.avatar ? (
                      <img src={char.avatar} alt={char.name} className="h-full w-full rounded-lg object-cover" />
                    ) : (
                      <UserSquare className="h-5 w-5 text-secondary-foreground" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{char.name}</p>
                    <p className="text-xs text-muted-foreground">{episodeCount} episodes</p>
                  </div>
                  <Badge variant={char.status === "published" ? "success" : char.status === "draft" ? "secondary" : "outline"}>
                    {char.status}
                  </Badge>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-lg border border-border p-3">
            <p className="text-sm font-medium text-foreground">{selectedCharacter.name}</p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{selectedCharacter.persona}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedCharacter.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
              ))}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Genre: <span className="text-foreground">{selectedCharacter.genre}</span>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Episodes for {selectedCharacter.name}</h3>
                <p className="text-xs text-muted-foreground">{characterEpisodes.length} episode{characterEpisodes.length !== 1 ? "s" : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ai" onClick={handleGenerate} loading={isGenerating}>
                  <Sparkles className="h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate with AI"}
                </Button>
                <Button onClick={() => { setSelectedEpisode(null); setDrawerOpen(true); }}>
                  <Plus className="h-4 w-4" /> New Episode
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <Input placeholder="Search episodes..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-xs" />
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={[
                { value: "all", label: "All Statuses" },
                { value: "draft", label: "Draft" },
                { value: "review", label: "In Review" },
                { value: "published", label: "Published" },
                { value: "scheduled", label: "Scheduled" },
              ]} />
            </div>
          </div>

          {characterEpisodes.length === 0 ? (
            <EmptyState
              icon={<Play className="h-12 w-12" />}
              title="No episodes found"
              description="This character has no episodes yet. Create one to get started."
              action={
                <Button onClick={() => { setSelectedEpisode(null); setDrawerOpen(true); }}>
                  <Plus className="h-4 w-4 mr-2" /> Create Episode
                </Button>
              }
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Episode</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>AI</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {characterEpisodes.map((ep) => (
                  <TableRow key={ep.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{ep.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{ep.content}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">#{ep.order}</TableCell>
                    <TableCell>
                      <Badge variant={statusColors[ep.status] || "secondary"}>{ep.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {ep.aiGenerated ? (
                        <div className="flex flex-col gap-0.5">
                          <Badge variant="ai" className="text-[10px]">AI</Badge>
                          {ep.confidence && <span className="text-[10px] text-muted-foreground">{(ep.confidence * 100).toFixed(0)}%</span>}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Manual</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(ep.updatedAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => { setSelectedEpisode(ep); setDrawerOpen(true); }}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteDialog({ open: true, id: ep.id })}>
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
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setSelectedEpisode(null); }}
        title={selectedEpisode ? "Edit Episode" : "New Episode"}
        description={selectedEpisode ? `Episode for ${selectedCharacter.name}` : `Create a new episode for ${selectedCharacter.name}`}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => { setDrawerOpen(false); setSelectedEpisode(null); }}>Cancel</Button>
            <Button onClick={() => { setDrawerOpen(false); setSelectedEpisode(null); }}>
              {selectedEpisode ? "Save Changes" : "Create Episode"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input label="Title" defaultValue={selectedEpisode?.title} placeholder="Episode title" />
          <Textarea label="Content" defaultValue={selectedEpisode?.content} placeholder="Episode content..." className="min-h-[200px]" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Status" defaultValue={selectedEpisode?.status || "draft"} options={[
              { value: "draft", label: "Draft" },
              { value: "review", label: "In Review" },
              { value: "published", label: "Published" },
              { value: "scheduled", label: "Scheduled" },
            ]} />
            <Input label="Order" type="number" defaultValue={selectedEpisode?.order ?? 1} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium text-foreground">Schedule</p>
              <p className="text-xs text-muted-foreground">Publish at a specific time</p>
            </div>
            <Switch checked={!!selectedEpisode?.scheduledAt} onCheckedChange={() => {}} />
          </div>
        </div>
      </Drawer>

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: "" })}
        onConfirm={handleDelete}
        title="Delete Episode"
        description="This will permanently delete this episode and its content."
        confirmLabel="Delete"
        variant="destructive"
      />
    </div>
  );
}
