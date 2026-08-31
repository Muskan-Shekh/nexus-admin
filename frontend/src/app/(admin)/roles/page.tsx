"use client";

import { useState } from "react";
import { Plus, Shield, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { LoadingState, EmptyState } from "@/components/ui/states";

const mockRoles = [
  { id: "1", name: "Super Admin", description: "Full platform access", users: 2, permissions: 48 },
  { id: "2", name: "Editor", description: "Content management access", users: 8, permissions: 24 },
  { id: "3", name: "Moderator", description: "Review and moderate content", users: 5, permissions: 12 },
  { id: "4", name: "Viewer", description: "Read-only access", users: 32, permissions: 6 },
];

export default function RolesPage() {
  const [roles, setRoles] = useState(mockRoles);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string }>({ open: false, id: "" });

  const handleDelete = () => {
    setRoles((prev) => prev.filter((r) => r.id !== deleteDialog.id));
    setDeleteDialog({ open: false, id: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Roles</h2>
          <p className="text-sm text-muted-foreground">Manage roles and access levels.</p>
        </div>
        <Button onClick={() => setDrawerOpen(true)}>
          <Plus className="h-4 w-4" /> New Role
        </Button>
      </div>

      <Card>
        {roles.length === 0 ? (
          <EmptyState icon={<Shield className="h-12 w-12" />} title="No roles found" description="Create a role to get started." action={<Button onClick={() => setDrawerOpen(true)}>Create Role</Button>} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="text-muted-foreground">{role.description}</TableCell>
                  <TableCell className="text-muted-foreground">{role.users}</TableCell>
                  <TableCell className="text-muted-foreground">{role.permissions}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(true)}>
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteDialog({ open: true, id: role.id })}>
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

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="New Role" description="Create a new role" footer={
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
          <Button onClick={() => setDrawerOpen(false)}>Create Role</Button>
        </div>
      }>
        <div className="space-y-4">
          <Input label="Name" placeholder="Role name" />
          <Input label="Description" placeholder="Brief description" />
        </div>
      </Drawer>

      <ConfirmDialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: "" })} onConfirm={handleDelete} title="Delete Role" description="This action cannot be undone." confirmLabel="Delete" variant="destructive" />
    </div>
  );
}
