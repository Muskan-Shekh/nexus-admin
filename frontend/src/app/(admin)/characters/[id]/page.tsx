"use client";

import { useState } from "react";
import { Search, ChevronRight, MoreHorizontal, ChevronLeft, RefreshCw, Edit, Copy, Archive, Trash2, Save, LayoutDashboard, Users, UserSquare, ShieldCheck, FolderOpen, Tags, CreditCard, ScrollText, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { type Character } from "@/types";

const mockCharacter: Character = {
  id: "1",
  name: "Riya Kapoor",
  slug: "riya-kapoor",
  persona: "Do saal baad didi apni best friend Riya ko ghar laati hai. Tumhe dekhte hi woh ekdum freeze ho jaati hai...",
  backstory: "24-year-old fashion content creator. Confident, witty and impossible to read. Naturally playful and loves teasing people just to see their reaction. Socially intelligent and always in control of the conversation. She rarely shows what she's actually thinking. Speaks natural Gen Z Hinglish.",
  voice: "Natural Gen Z Hinglish",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  genre: "Romance",
  tags: ["friend", "best-friend", "sister"],
  status: "published",
  featured: true,
  version: 3,
  aiGenerated: true,
  confidence: 0.92,
  model: "gpt-4o",
  cost: 0.0124,
  createdAt: "2025-01-15T10:00:00Z",
  updatedAt: "2025-07-20T14:30:00Z",
};

const visibilityOptions = [
  { value: "public", label: "public" },
  { value: "private", label: "private" },
  { value: "unlisted", label: "unlisted" },
];

const publishStateOptions = [
  { value: "published", label: "published" },
  { value: "draft", label: "draft" },
  { value: "archived", label: "archived" },
];

const moderationOptions = [
  { value: "not_required", label: "not_required" },
  { value: "required", label: "required" },
  { value: "pending", label: "pending" },
];

const featuredOptions = [
  { value: "false", label: "false" },
  { value: "true", label: "true" },
];

export default function CharacterDetailPage() {
  const [character] = useState<Character>(mockCharacter);
  const [visibility, setVisibility] = useState("public");
  const [publishState, setPublishState] = useState("published");
  const [moderation, setModeration] = useState("not_required");
  const [featured, setFeatured] = useState("false");
  const [coverHeading, setCoverHeading] = useState("Not set");
  const [shortTagline, setShortTagline] = useState("Do saal baad didi apni best friend Riya ko ghar laati hai. Tumhe dekhte hi woh ekdum freeze ho jaati hai...");
  const [detailedDescription, setDetailedDescription] = useState("Character is Riya Kapoor. 24-year-old fashion content creator. Confident, witty and impossible to read. Naturally playful and loves teasing people just to see their reaction. Socially intelligent and always in control of the conversation. She rarely shows what she's actually thinking. Speaks natural Gen Z Hinglish. This relationship is ALWAYS a slow burn.");
  const [startScene, setStartScene] = useState("Shaam ka time hai. Didi aur Riya weekend ke liye apne ghar ke liye tayyar ho rahi hai. Riya apna suitcase side mein rakhti hai. Tumhe dekh ke woh pehle kitna thoda nervous nazar tum par padti hai. Woh ekdum casual room scan karti hai. Jaise hi uske nazar tum par padti hai, woh ek hush mein ha n ho, normal banne ki koshish karti hai.");

  return (
    <div className="flex h-screen bg-background">
      <aside className="flex w-64 flex-col border-r border-border bg-surface">
        <div className="flex h-14 items-center gap-3 border-b border-border px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
            <span className="text-sm font-bold text-primary-foreground">2A</span>
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-foreground">2AM Admin</p>
            <p className="text-[10px] text-muted-foreground">OPERATIONS CONSOLE</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            <SidebarItem icon={LayoutDashboard} label="Dashboard Overview" />
            <SidebarItem icon={Users} label="User Management" />
            <SidebarItem icon={UserSquare} label="Character Management" active />
            <SidebarItem icon={ShieldCheck} label="Character Moderation" />
            <SidebarItem icon={FolderOpen} label="Media & Assets" />
            <SidebarItem icon={Tags} label="Categories" />
            <SidebarItem icon={CreditCard} label="Subscription Plans" />
            <SidebarItem icon={ScrollText} label="Activity Logs" />
            <SidebarItem icon={Bell} label="Notifications & Alerts" />
          </div>
        </nav>

        <div className="border-t border-border p-3">
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh data
          </button>
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs">Sign out</span>
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border bg-surface/80 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-sm font-semibold text-foreground">PRODUCTION CONSOLE</h1>
              <p className="text-xs text-muted-foreground">Character Details</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="h-9 w-64 pl-9" />
            </div>
            <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90">
              READY
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>LIBRARY</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground">CHARACTER DETAILS</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                  <ChevronLeft className="h-4 w-4" />
                  Back to list
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>

            <Card className="overflow-hidden">
              <div className="relative h-64 w-full">
                <img src={mockCharacter.avatar} alt={character.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-end gap-4">
                  <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-surface bg-secondary">
                    <img src={mockCharacter.avatar} alt={character.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="mb-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="border-success text-success text-[10px]">PUBLIC</Badge>
                      <Badge variant="success" className="text-[10px]">PUBLISHED</Badge>
                      <Badge variant="secondary" className="text-[10px]">NOT_REQUIRED</Badge>
                    </div>
                    <h1 className="text-2xl font-bold text-white">{character.name}</h1>
                  </div>
                </div>
              </div>
              <p className="p-4 text-sm text-muted-foreground border-b border-border">{character.persona}</p>
            </Card>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <Edit className="h-3.5 w-3.5" />
                Edit core fields
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <Copy className="h-3.5 w-3.5" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                Unpublish
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <Archive className="h-3.5 w-3.5" />
                Archive
              </Button>
              <Button variant="destructive" size="sm" className="h-8 gap-1.5">
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </div>

            <Card className="p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Status Controls</h3>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-4 gap-4">
                  <Select label="Visibility" value={visibility} onChange={(e) => setVisibility(e.target.value)} options={visibilityOptions} />
                  <Select label="Publish state" value={publishState} onChange={(e) => setPublishState(e.target.value)} options={publishStateOptions} />
                  <Select label="Moderation" value={moderation} onChange={(e) => setModeration(e.target.value)} options={moderationOptions} />
                  <Select label="Featured" value={featured} onChange={(e) => setFeatured(e.target.value)} options={featuredOptions} />
                </div>
                <div className="flex justify-end">
                  <Button size="sm" className="bg-warning text-warning-foreground hover:bg-warning/90">
                    <Save className="h-4 w-4 mr-2" />
                    Save status
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Overview</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">CHARACTER ID</p>
                  <p className="text-sm font-medium text-foreground">81962537-c950-4f58-8a66-74cc73d0ea1e</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">OWNER</p>
                  <p className="text-sm font-medium text-foreground">mahendra.ai.engineer@gmail.com</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">LANGUAGE</p>
                  <p className="text-sm font-medium text-foreground">hinglish</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">GENDER</p>
                  <p className="text-sm font-medium text-foreground">female</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">STORY MODE</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">DEFAULT MODE</p>
                  <p className="text-sm font-medium text-foreground">—</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Content</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">COVER HEADING</label>
                  <Input value={coverHeading} onChange={(e) => setCoverHeading(e.target.value)} className="bg-surface-elevated border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">SHORT TAGLINE</label>
                  <Textarea value={shortTagline} onChange={(e) => setShortTagline(e.target.value)} className="bg-surface-elevated border-border min-h-[80px]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">DETAILED DESCRIPTION</label>
                  <Textarea value={detailedDescription} onChange={(e) => setDetailedDescription(e.target.value)} className="bg-surface-elevated border-border min-h-[120px]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">START SCENE</label>
                  <Textarea value={startScene} onChange={(e) => setStartScene(e.target.value)} className="bg-surface-elevated border-border min-h-[120px]" />
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active }: { icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <button className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground")}>
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </button>
  );
}
