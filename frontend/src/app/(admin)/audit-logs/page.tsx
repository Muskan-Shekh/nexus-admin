"use client";

import { useState } from "react";
import { Search, User, Filter, ScrollText } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LoadingState, EmptyState } from "@/components/ui/states";
import { type AuditLogEntry } from "@/types";

const mockLogs: AuditLogEntry[] = [
  { id: "1", actorId: "1", actorName: "Admin", action: "create", entityType: "character", entityId: "1", entityName: "Luna Starweaver", aiModel: "gpt-4o", cost: 0.0124, outcome: "success", timestamp: "2025-07-20T10:00:00Z" },
  { id: "2", actorId: "2", actorName: "Editor", action: "publish", entityType: "episode", entityId: "2", entityName: "Episode #342", outcome: "success", timestamp: "2025-07-20T09:30:00Z" },
  { id: "3", actorId: "1", actorName: "Admin", action: "update", entityType: "prompt", entityId: "1", entityName: "Main Chat Prompt", aiModel: "gpt-4o", cost: 0.0089, outcome: "success", timestamp: "2025-07-19T14:00:00Z" },
  { id: "4", actorId: "3", actorName: "System", action: "flag", entityType: "conversation", entityId: "1", entityName: "Conversation #8921", outcome: "pending", timestamp: "2025-07-19T12:00:00Z" },
];

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockLogs.filter((log) => {
    if (filter !== "all" && log.entityType !== filter) return false;
    if (search && !log.entityName?.toLowerCase().includes(search.toLowerCase()) && !log.actorName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const outcomeColor = (outcome: string) => {
    switch (outcome) {
      case "success": return "success";
      case "pending": return "warning";
      case "failure": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Audit Logs</h2>
        <p className="text-sm text-muted-foreground">Immutable history of all platform actions.</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} options={[
            { value: "all", label: "All Entities" },
            { value: "character", label: "Characters" },
            { value: "episode", label: "Episodes" },
            { value: "prompt", label: "Prompts" },
            { value: "conversation", label: "Conversations" },
          ]} />
        </div>
      </Card>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon={<ScrollText className="h-12 w-12" />} title="No audit logs found" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>AI Model</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {log.actorName.charAt(0)}
                      </div>
                      <span className="font-medium">{log.actorName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{log.action}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{log.entityName}</p>
                      <p className="text-xs text-muted-foreground capitalize">{log.entityType}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{log.aiModel || "-"}</TableCell>
                  <TableCell className="text-muted-foreground">{log.cost ? `$${log.cost.toFixed(4)}` : "-"}</TableCell>
                  <TableCell>
                    <Badge variant={outcomeColor(log.outcome)} className="capitalize">{log.outcome}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(log.timestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
