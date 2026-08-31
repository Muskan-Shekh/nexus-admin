"use client";

import { useState } from "react";
import { Plus, Search, Shield, MoreHorizontal, Pencil, Trash2, Ban, Eye, Users } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Drawer } from "@/components/ui/drawer";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { LoadingState, EmptyState } from "@/components/ui/states";

const mockUsers = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "user", plan: "pro", status: "active", activity: "2025-07-20T10:00:00Z" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "user", plan: "free", status: "active", activity: "2025-07-19T14:00:00Z" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "moderator", plan: "enterprise", status: "suspended", activity: "2025-07-15T08:00:00Z" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string }>({ open: false, id: "" });

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteDialog.id));
    setDeleteDialog({ open: false, id: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Users</h2>
          <p className="text-sm text-muted-foreground">Manage user accounts and access.</p>
        </div>
        <Button onClick={() => { setSelectedUser(null); setDrawerOpen(true); }}>
          <Plus className="h-4 w-4" /> New User
        </Button>
      </div>

      <Card className="p-4">
        <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-xs" />
      </Card>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon={<Users className="h-12 w-12" />} title="No users found" description="Try adjusting your search." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">{user.plan}</Badge>
                  </TableCell>
                  <TableCell>
                     <Badge variant={user.status === "active" ? "success" : "destructive"} className="capitalize">{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(user.activity)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedUser(user); setDrawerOpen(true); }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteDialog({ open: true, id: user.id })}>
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

      <Drawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setSelectedUser(null); }}
        title={selectedUser ? "Edit User" : "New User"}
        description={selectedUser ? "Update user details" : "Create a new user"}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => { setDrawerOpen(false); setSelectedUser(null); }}>Cancel</Button>
            <Button onClick={() => { setDrawerOpen(false); setSelectedUser(null); }}>{selectedUser ? "Save Changes" : "Create User"}</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input label="Name" defaultValue={selectedUser?.name} placeholder="Full name" />
          <Input label="Email" type="email" defaultValue={selectedUser?.email} placeholder="user@example.com" />
          <Select label="Role" defaultValue={selectedUser?.role || "user"} options={[
            { value: "user", label: "User" },
            { value: "moderator", label: "Moderator" },
            { value: "admin", label: "Admin" },
          ]} />
          <Select label="Plan" defaultValue={selectedUser?.plan || "free"} options={[
            { value: "free", label: "Free" },
            { value: "pro", label: "Pro" },
            { value: "enterprise", label: "Enterprise" },
          ]} />
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium text-foreground">Active</p>
              <p className="text-xs text-muted-foreground">Allow user to access the platform</p>
            </div>
            <Switch checked={selectedUser?.status !== "suspended"} onCheckedChange={() => {}} />
          </div>
        </div>
      </Drawer>

      <ConfirmDialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: "" })} onConfirm={handleDelete} title="Delete User" description="This will permanently delete the user account." confirmLabel="Delete" variant="destructive" />
    </div>
  );
}
