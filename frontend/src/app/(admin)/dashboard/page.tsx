"use client";

import Link from "next/link";
import { Tv, Users, Tags, FileType, Play, UserPlus, MessageSquare, Eye, ShieldCheck, TrendingUp, Plus } from "lucide-react";
import { cn, formatDate, formatNumber } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { type Episode } from "@/types";
import { type User } from "@/lib/auth/auth-context";

const totalUsers = 12847;
const totalCharacters = 1284;
const totalEpisodes = 8432;
const totalGenres = 24;
const totalContentItems = totalCharacters + totalEpisodes + 156 + 89;

const recentEpisodes: Episode[] = [
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
    title: "Shadows of the Past",
    slug: "shadows-of-the-past",
    characterId: "2",
    order: 2,
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
    id: "3",
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
  {
    id: "4",
    title: "Digital Frontier",
    slug: "digital-frontier",
    characterId: "1",
    order: 3,
    content: "Beyond the boundaries of known code lay a frontier uncharted...",
    status: "published",
    aiGenerated: true,
    confidence: 0.91,
    model: "gpt-4o",
    cost: 0.0198,
    createdAt: "2025-06-12T09:00:00Z",
    updatedAt: "2025-07-17T16:00:00Z",
  },
];

const recentUsers: User[] = [
  {
    id: "1",
    email: "alex@example.com",
    name: "Alex Rivera",
    role: "user",
    plan: "pro",
    status: "active",
  },
  {
    id: "2",
    email: "jordan@example.com",
    name: "Jordan Chen",
    role: "user",
    plan: "free",
    status: "active",
  },
  {
    id: "3",
    email: "taylor@example.com",
    name: "Taylor Morgan",
    role: "editor",
    plan: "enterprise",
    status: "active",
  },
  {
    id: "4",
    email: "casey@example.com",
    name: "Casey Brooks",
    role: "user",
    plan: "pro",
    status: "suspended",
  },
  {
    id: "5",
    email: "morgan@example.com",
    name: "Morgan Lee",
    role: "user",
    plan: "free",
    status: "active",
  },
];

const activityStats = [
  { label: "Total Conversations", value: 45621, icon: MessageSquare, change: 12.5 },
  { label: "Total Messages", value: 892340, icon: MessageSquare, change: 8.2 },
  { label: "Moderation Queue", value: 23, icon: ShieldCheck, change: -5.4 },
  { label: "Avg. Session Duration", value: 4.2, icon: TrendingUp, change: 3.1, suffix: " min" },
];

const statusColors: Record<string, "success" | "secondary" | "outline" | "warning" | "info"> = {
  published: "success",
  review: "warning",
  draft: "secondary",
  scheduled: "info",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Platform overview and recent activity.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Users" value={totalUsers} icon={Users} change={5.2} />
        <StatCard title="Characters" value={totalCharacters} icon={Users} change={12.5} />
        <StatCard title="Episodes" value={totalEpisodes} icon={Tv} change={8.2} />
        <StatCard title="Genres" value={totalGenres} icon={Tags} change={2.1} />
        <StatCard title="Content Items" value={totalContentItems} icon={FileType} change={15.3} />
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickAction label="Add Character" href="/characters-episodes" />
          <QuickAction label="Add Episode" href="/characters-episodes" />
          <QuickAction label="Manage Episodes" href="/episodes" />
          <QuickAction label="View Characters" href="/chats" />
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Recent Episodes Added</h3>
            </div>
            <Badge variant="secondary">Last 7 days</Badge>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Episode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEpisodes.slice(0, 5).map((ep) => (
                <TableRow key={ep.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{ep.title}</p>
                      <p className="text-xs text-muted-foreground">Character ID: {ep.characterId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[ep.status] || "secondary"}>{ep.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{formatDate(ep.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Recent Users Registered</h3>
            </div>
            <Badge variant="secondary">Last 7 days</Badge>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground capitalize">{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={user.plan === "enterprise" ? "info" : user.plan === "pro" ? "ai" : "secondary"}>
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={user.status === "active" ? "success" : "destructive"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Overall Platform Activity</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activityStats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {formatNumber(stat.value)}{stat.suffix || ""}
              </p>
              <div className="mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-xs font-medium text-success">+{stat.change}%</span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, change }: { title: string; value: number; icon: React.ElementType; change: number }) {
  const isPositive = change >= 0;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-xl font-bold text-foreground">{formatNumber(value)}</p>
          <div className="mt-1 flex items-center gap-1">
            <span className={cn("text-xs font-medium", isPositive ? "text-success" : "text-error")}>
              {isPositive ? "+" : ""}{change}%
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
    </Card>
  );
}

function QuickAction({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
    >
      <Plus className="h-4 w-4" />
      {label}
    </Link>
  );
}
