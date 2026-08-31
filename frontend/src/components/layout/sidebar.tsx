"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/lib/auth/auth-context";
import {
  LayoutDashboard,
  MessageSquare,
  Tv,
  GitBranch,
  FileText,
  MessagesSquare,
  Users,
  Shield,
  Lock,
  Tags,
  FileType,
  Bell,
  ScrollText,
  BarChart3,
  ShieldCheck,
  FolderOpen,
  Settings,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  UserSquare,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  "Dashboard": LayoutDashboard,
  "Characters & Episodes": UserSquare,
  "Chats": MessageSquare,
  "Episodes": Tv,
  "Story Flows": GitBranch,
  "Prompts": FileText,
  "Conversations": MessagesSquare,
  "Users": Users,
  "Roles": Shield,
  "Permissions": Lock,
  "Genres & Tags": Tags,
  "CMS Pages": FileType,
  "Notifications": Bell,
  "Audit Logs": ScrollText,
  "Analytics": BarChart3,
  "Moderation": ShieldCheck,
  "Media Library": FolderOpen,
  "Settings": Settings,
};

function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-surface transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold tracking-tight text-foreground">NEXUS</span>
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-1">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = iconMap[item.title] || LayoutDashboard;
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
                    {!collapsed && <span>{item.title}</span>}
                    {isActive && !collapsed && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
                  </Link>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
              </Tooltip>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}

export { Sidebar };
