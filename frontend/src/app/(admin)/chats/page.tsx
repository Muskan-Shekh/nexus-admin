"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Sparkles, Pencil, Trash2, Eye, MessageSquare, Search, ChevronLeft, Flame, Gamepad2, Bot, Palette, Mic, Users, Send, Paperclip } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { RadioGroup, Radio } from "@/components/ui/radio";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { LoadingState, EmptyState } from "@/components/ui/states";
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

const categories = ["movie", "Movies", "AI Image Generation", "Public Speaking"];

export default function ChatsPage() {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>(mockCharacters);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string }>({ open: false, id: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Discover more");
  const [chatInput, setChatInput] = useState("");
  const [gender, setGender] = useState("Female");
  const [messages, setMessages] = useState<Array<{ id: string; role: "user" | "assistant"; content: string; timestamp: string }>>([
    { id: "1", role: "user", content: "I want to dating with you", timestamp: new Date().toISOString() },
    { id: "2", role: "assistant", content: "Take a careful step back, my expression firm and unyielding. No. That's not something I will engage with. Let's talk about something else — how about we plan a fun day out or try a new game? What sounds good to you?", timestamp: new Date().toISOString() },
  ]);

  const filtered = characters.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.persona.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    const newChar: Character = {
      id: Math.random().toString(36).slice(2),
      name: "Aetheria Dreamweaver",
      slug: "aetheria-dreamweaver",
      persona: "A mystical dream architect who shapes realities from imagination.",
      backstory: "Discovered she could enter and shape dreams as a child.",
      voice: "Dreamy and ethereal",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aetheria",
      genre: "Fantasy",
      tags: ["dream", "mystic", "reality"],
      status: "draft",
      featured: false,
      version: 1,
      aiGenerated: true,
      confidence: 0.94,
      model: "gpt-4o",
      cost: 0.0156,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCharacters((prev) => [...prev, newChar]);
    setSelectedCharacter(newChar);
    setDrawerOpen(true);
    setIsGenerating(false);
  };

  const handleDelete = () => {
    setCharacters((prev) => prev.filter((c) => c.id !== deleteDialog.id));
    setDeleteDialog({ open: false, id: "" });
  };

  const handleEdit = (character: Character) => {
    setSelectedCharacter(character);
    setDrawerOpen(true);
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

  const activeCharacter = selectedCharacter || filtered[0] || mockCharacters[0];

  return (
    <div className="flex h-screen bg-background">
      <aside className="flex w-64 flex-col border-r border-border bg-surface">
        <div className="flex h-14 items-center gap-3 border-b border-border px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold tracking-tight text-foreground">NEXUS</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            <NavItem icon={Flame} label="Discover" active />
            <NavItem icon={Palette} label="Generate Image" />
            <NavItem icon={Users} label="Create Character" />
            <NavItem icon={MessageSquare} label="Messages" />
            <NavItem icon={Sparkles} label="Subscribe" badge="89% off" />
            <NavItem icon={Sparkles} label="Coins" badge="83% off" />
            <NavItem icon={Sparkles} label="Opals" />
            <NavItem icon={Sparkles} label="Subscriptions" />
            <NavItem icon={MessageSquare} label="Chat" />
          </div>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border bg-surface/80 px-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-foreground">{selectedCategory}</span>
            <div className="flex items-center gap-2">
              {categories.map((cat) => (
                <span key={cat} onClick={() => setSelectedCategory(cat)} className={cn("cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors", cat === selectedCategory ? "bg-primary text-primary-foreground" : "border border-border text-foreground hover:border-primary/50")}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search Characters" className="h-9 w-64 pl-9" />
            </div>
            <span className="text-sm font-medium text-foreground">EN</span>
            <div className="h-8 w-8 rounded-full bg-secondary" />
          </div>
        </header>

        <main className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Characters / Chats</h2>
                  <p className="text-sm text-muted-foreground">Discover and manage AI characters.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ai" onClick={handleGenerate} loading={isGenerating}>
                    <Sparkles className="h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate with AI"}
                  </Button>
                  <Button onClick={() => { setSelectedCharacter(null); setDrawerOpen(true); }}>
                    <Plus className="h-4 w-4" /> New Character
                  </Button>
                </div>
              </div>

              <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search characters..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                </div>
                <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={[
                  { value: "all", label: "All Statuses" },
                  { value: "draft", label: "Draft" },
                  { value: "published", label: "Published" },
                  { value: "archived", label: "Archived" },
                ]} />
              </div>

              {filtered.length === 0 ? (
                <EmptyState icon={<MessageSquare className="h-12 w-12" />} title="No characters found" description="Try adjusting your search or create a new character." action={<Button onClick={() => { setSelectedCharacter(null); setDrawerOpen(true); }}><Plus className="h-4 w-4 mr-2" /> Create Character</Button>} />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((char) => (
                    <Card key={char.id} className="p-4 transition-colors hover:border-primary/50 cursor-pointer" onClick={() => router.push(`/characters/${char.id}`)}>
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary">
                          <img src={char.avatar} alt={char.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-foreground truncate">{char.name}</h3>
                            <Badge variant={char.status === "published" ? "success" : "secondary"}>{char.status}</Badge>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{char.persona}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px]">{char.genre}</Badge>
                            {char.aiGenerated && <Badge variant="ai" className="text-[10px]">AI</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">v{char.version} • Updated {formatDate(char.updatedAt)}</span>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); setSelectedCharacter(char); }}>
                            <MessageSquare className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); handleEdit(char); }}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); setDeleteDialog({ open: true, id: char.id }); }}>
                            <Trash2 className="h-3.5 w-3.5 text-error" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="hidden w-80 border-l border-border bg-surface lg:flex flex-col">
            <div className="flex flex-col items-center p-6">
              <div className="h-32 w-32 overflow-hidden rounded-full bg-secondary">
                <img src={activeCharacter.avatar} alt={activeCharacter.name} className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{activeCharacter.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">All responses are AI-generated and fictional</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}>
                    {message.role === "assistant" && (
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-secondary">
                        <img src={activeCharacter.avatar} alt={activeCharacter.name} className="h-full w-full object-cover" />
                      </div>
                    )}
                    <div className={cn("max-w-[80%] rounded-lg px-4 py-2 text-sm", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-surface-elevated text-foreground border border-border")}>
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
          </aside>
        </main>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setSelectedCharacter(null); }}
        title={selectedCharacter ? "Edit Character" : "New Character"}
        description={selectedCharacter ? "Update character details" : "Create a new AI character"}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => { setDrawerOpen(false); setSelectedCharacter(null); }}>Cancel</Button>
            <Button onClick={() => { setDrawerOpen(false); setSelectedCharacter(null); }}>
              {selectedCharacter ? "Save Changes" : "Create Character"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Create Avatar</label>
            <Button variant="outline" className="mt-2 w-full justify-start">
              <Paperclip className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
          <Input label="Name" defaultValue={selectedCharacter?.name} placeholder="Character name" />
          <p className="text-xs text-muted-foreground">Please input 3-25 characters, letters, numbers, underscore, hyphen, and space only</p>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Gender</label>
            <RadioGroup value={gender} onValueChange={setGender} className="flex flex-row gap-4">
              <Radio value="Male" label="Male" />
              <Radio value="Female" label="Female" />
              <Radio value="Non-binary" label="Non-binary" />
            </RadioGroup>
          </div>
          <Textarea label="Intro (Public seen)" defaultValue={selectedCharacter?.persona} placeholder="Give a brief introduction..." className="min-h-[120px]" />
          <Textarea label="Greeting" placeholder="First message the character sends..." className="min-h-[120px]" />
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium text-foreground">Public</p>
              <p className="text-xs text-muted-foreground">Visible to everyone</p>
            </div>
            <Switch checked={true} onCheckedChange={() => {}} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tag</label>
            <Input placeholder="Add tag" />
            <p className="text-xs text-muted-foreground">Good tags ensure easy character discovery</p>
          </div>
          <Textarea label="Background (Privately seen)" placeholder="Provide a detailed character description..." className="min-h-[120px]" />
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Dialogue Style</label>
            <Button variant="outline" className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Add Dialogue Style
            </Button>
            <p className="text-xs text-muted-foreground">Provide examples of dialogue style for character</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Character Voice</label>
            <div className="grid grid-cols-2 gap-2">
              {["Sweet girl", "Mature woman", "Soft-spoken girl", "Flirting Lady", "Charismatic & gentle man", "Hoarse-voiced girl", "Flirting man", "Serious man", "Elegant lady", "Mean girl", "Gentle man"].map((voice) => (
                <Button key={voice} variant="outline" className="justify-start text-xs h-8">
                  {voice}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="terms" className="h-4 w-4 rounded border-border" defaultChecked />
            <label htmlFor="terms" className="text-xs text-muted-foreground">I confirm my character does not infringe on the image, intellectual property, or any other rights.</label>
          </div>
        </div>
      </Drawer>

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: "" })}
        onConfirm={handleDelete}
        title="Delete Character"
        description="This action cannot be undone. This will permanently delete the character and all associated data."
        confirmLabel="Delete"
        variant="destructive"
      />
    </div>
  );
}

function NavItem({ icon: Icon, label, active, badge, badgeColor = "bg-error text-error-foreground" }: { icon: React.ElementType; label: string; active?: boolean; badge?: string; badgeColor?: string }) {
  return (
    <button className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground")}>
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge && <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", badgeColor)}>{badge}</span>}
    </button>
  );
}
