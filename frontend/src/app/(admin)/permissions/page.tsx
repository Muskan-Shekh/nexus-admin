"use client";

import { useState } from "react";
import { Shield, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { LoadingState, EmptyState } from "@/components/ui/states";

const modules = ["Dashboard", "Chats", "Episodes", "Story Flows", "Prompts", "Conversations", "Users", "Roles", "Permissions", "Taxonomy", "CMS", "Notifications", "Audit Logs", "Analytics", "Moderation", "Media", "Settings"];
const actions = ["Read", "Create", "Update", "Delete", "Publish", "Moderate"];

const permissions = modules.reduce((acc, mod) => {
  acc[mod] = actions.reduce((a, act) => ({ ...a, [act]: Math.random() > 0.5 }), {} as Record<string, boolean>);
  return acc;
}, {} as Record<string, Record<string, boolean>>);

export default function PermissionsPage() {
  const [search, setSearch] = useState("");

  const filteredModules = modules.filter((m) => m.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Permissions</h2>
        <p className="text-sm text-muted-foreground">Configure module-level access controls.</p>
      </div>

      <Card className="p-4">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search modules..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </Card>

      <Card>
        {filteredModules.length === 0 ? (
          <EmptyState icon={<Shield className="h-12 w-12" />} title="No modules found" description="Try a different search term." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                {actions.map((action) => (
                  <TableHead key={action} className="text-center">{action}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredModules.map((mod) => (
                <TableRow key={mod}>
                  <TableCell className="font-medium">{mod}</TableCell>
                  {actions.map((action) => (
                    <TableCell key={action} className="text-center">
                      <input
                        type="checkbox"
                        checked={permissions[mod][action]}
                        onChange={() => {}}
                        className="h-4 w-4 rounded border-border bg-surface text-primary"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
