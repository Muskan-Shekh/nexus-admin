"use client";

import { useState } from "react";
import { Bell, Send, Search, Check, Clock } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Drawer } from "@/components/ui/drawer";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { LoadingState, EmptyState } from "@/components/ui/states";

const mockNotifications = [
  { id: "1", title: "System Maintenance", body: "Scheduled maintenance in 2 hours", type: "info", read: false, createdAt: "2025-07-20T10:00:00Z" },
  { id: "2", title: "New Feature Released", body: "AI generation is now available for episodes", type: "success", read: false, createdAt: "2025-07-19T14:00:00Z" },
  { id: "3", title: "High Moderation Queue", body: "23 items pending review", type: "warning", read: true, createdAt: "2025-07-18T09:00:00Z" },
];

export default function NotificationsPage() {
  const [notifications] = useState(mockNotifications);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = notifications.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.body.toLowerCase().includes(search.toLowerCase()));

  const typeColor = (type: string) => {
    switch (type) {
      case "success": return "success";
      case "warning": return "warning";
      case "error": return "destructive";
      default: return "info";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
          <p className="text-sm text-muted-foreground">Manage broadcast and targeted notifications.</p>
        </div>
        <Button onClick={() => setDrawerOpen(true)}>
          <Send className="h-4 w-4 mr-2" /> New Notification
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search notifications..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </Card>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon={<Bell className="h-12 w-12" />} title="No notifications found" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Notification</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((n) => (
                <TableRow key={n.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{n.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{n.body}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={typeColor(n.type)} className="capitalize">{n.type}</Badge>
                  </TableCell>
                  <TableCell>
                    {n.read ? (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground"><Check className="h-3 w-3" /> Read</div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-primary"><Clock className="h-3 w-3" /> Unread</div>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(n.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="New Notification" description="Send a notification to users" footer={
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
          <Button onClick={() => setDrawerOpen(false)}>Send</Button>
        </div>
      }>
        <div className="space-y-4">
          <Input label="Title" placeholder="Notification title" />
          <Textarea label="Body" placeholder="Notification content..." />
          <Select label="Type" defaultValue="info" options={[
            { value: "info", label: "Info" },
            { value: "success", label: "Success" },
            { value: "warning", label: "Warning" },
            { value: "error", label: "Error" },
          ]} />
        </div>
      </Drawer>
    </div>
  );
}
