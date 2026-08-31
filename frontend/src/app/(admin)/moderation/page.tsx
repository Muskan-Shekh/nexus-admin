"use client";

import { useState } from "react";
import { ShieldCheck, AlertTriangle, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { LoadingState, EmptyState } from "@/components/ui/states";
import { type ModerationItem } from "@/types";

const mockModeration: ModerationItem[] = [
  { id: "1", type: "safety", entityType: "conversation", entityId: "1", reason: "Potential harmful content detected", status: "pending", severity: "high", createdAt: "2025-07-20T10:00:00Z" },
  { id: "2", type: "nsfw", entityType: "character", entityId: "2", reason: "Avatar flagged for review", status: "reviewing", severity: "medium", createdAt: "2025-07-19T14:00:00Z" },
  { id: "3", type: "user_report", entityType: "conversation", entityId: "3", reason: "User reported inappropriate behavior", status: "pending", severity: "high", createdAt: "2025-07-18T09:00:00Z" },
  { id: "4", type: "ai_flag", entityType: "episode", entityId: "4", reason: "AI detected quality issues", status: "resolved", severity: "low", createdAt: "2025-07-17T11:00:00Z" },
];

const typeIcons: Record<string, React.ElementType> = {
  safety: ShieldCheck,
  nsfw: AlertTriangle,
  minors: AlertTriangle,
  self_harm: AlertTriangle,
  abuse: AlertTriangle,
  user_report: AlertTriangle,
  ai_flag: AlertTriangle,
  escalation: AlertTriangle,
};

const severityColors: Record<string, "destructive" | "warning" | "info" | "secondary"> = {
  critical: "destructive",
  high: "destructive",
  medium: "warning",
  low: "info",
};

const statusColors: Record<string, "warning" | "info" | "success" | "secondary"> = {
  pending: "warning",
  reviewing: "info",
  resolved: "success",
  dismissed: "secondary",
};

export default function ModerationPage() {
  const [moderation] = useState(mockModeration);
  const [filter, setFilter] = useState("all");

  const filtered = moderation.filter((m) => filter === "all" || m.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Moderation</h2>
          <p className="text-sm text-muted-foreground">Review and act on flagged content.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="warning" className="text-xs">{moderation.filter((m) => m.status === "pending").length} pending</Badge>
        </div>
      </div>

      <Card className="p-4">
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} options={[
          { value: "all", label: "All Statuses" },
          { value: "pending", label: "Pending" },
          { value: "reviewing", label: "Reviewing" },
          { value: "resolved", label: "Resolved" },
          { value: "dismissed", label: "Dismissed" },
        ]} />
      </Card>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon={<ShieldCheck className="h-12 w-12" />} title="No items in queue" description="All caught up!" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => {
                const TypeIcon = typeIcons[item.type] || AlertTriangle;
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm capitalize">{item.type.replace("_", " ")}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium capitalize">{item.entityType}</p>
                        <p className="text-xs text-muted-foreground">ID: {item.entityId}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground line-clamp-1">{item.reason}</TableCell>
                    <TableCell>
                      <Badge variant={severityColors[item.severity]} className="capitalize">{item.severity}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[item.status]} className="capitalize">{item.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(item.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><CheckCircle className="h-4 w-4 text-success" /></Button>
                        <Button variant="ghost" size="icon"><XCircle className="h-4 w-4 text-error" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
