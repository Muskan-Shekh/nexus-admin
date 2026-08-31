"use client";

import { useState } from "react";
import { Plus, Globe, Search, Eye, Edit } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Drawer } from "@/components/ui/drawer";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { LoadingState, EmptyState } from "@/components/ui/states";

const mockPages = [
  { id: "1", title: "About", slug: "/about", status: "published", author: "Admin", updatedAt: "2025-07-20T10:00:00Z" },
  { id: "2", title: "Privacy Policy", slug: "/privacy", status: "published", author: "Legal", updatedAt: "2025-07-15T14:30:00Z" },
  { id: "3", title: "Terms of Service", slug: "/terms", status: "draft", author: "Legal", updatedAt: "2025-07-10T09:00:00Z" },
];

export default function CMSPage() {
  const [pages] = useState(mockPages);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = pages.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">CMS Pages</h2>
          <p className="text-sm text-muted-foreground">Manage static pages and content.</p>
        </div>
        <Button onClick={() => setDrawerOpen(true)}>
          <Plus className="h-4 w-4" /> New Page
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search pages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select defaultValue="all" options={[
            { value: "all", label: "All Statuses" },
            { value: "published", label: "Published" },
            { value: "draft", label: "Draft" },
          ]} />
        </div>
      </Card>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon={<Globe className="h-12 w-12" />} title="No pages found" description="Create your first CMS page." action={<Button onClick={() => setDrawerOpen(true)}>Create Page</Button>} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{page.slug}</TableCell>
                  <TableCell>
                    <Badge variant={page.status === "published" ? "success" : "secondary"}>{page.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{page.author}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(page.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(true)}><Edit className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Edit Page" description="Manage page content and SEO" footer={
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
          <Button onClick={() => setDrawerOpen(false)}>Save Page</Button>
        </div>
      }>
        <div className="space-y-4">
          <Input label="Title" placeholder="Page title" />
          <Input label="Slug" placeholder="/page-slug" />
          <Input label="SEO Title" placeholder="SEO title" />
          <Input label="SEO Description" placeholder="Meta description" />
          <Select label="Status" defaultValue="draft" options={[
            { value: "draft", label: "Draft" },
            { value: "published", label: "Published" },
          ]} />
        </div>
      </Drawer>
    </div>
  );
}
