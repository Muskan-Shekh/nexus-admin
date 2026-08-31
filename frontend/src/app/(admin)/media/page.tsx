"use client";

import { useState } from "react";
import { Upload, Search, Image, Film, FileText, Trash2 } from "lucide-react";
import { cn, formatNumber, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { LoadingState, EmptyState } from "@/components/ui/states";
import { type MediaAsset } from "@/types";

const mockAssets: MediaAsset[] = [
  { id: "1", name: "luna-avatar.png", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna", mimeType: "image/png", size: 245000, tags: ["avatar", "fantasy"], createdAt: "2025-07-20T10:00:00Z" },
  { id: "2", name: "nexus-avatar.png", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=nexus", mimeType: "image/png", size: 198000, tags: ["avatar", "scifi"], createdAt: "2025-07-19T14:00:00Z" },
  { id: "3", name: "intro-video.mp4", url: "#", mimeType: "video/mp4", size: 15000000, tags: ["video", "intro"], createdAt: "2025-07-18T09:00:00Z" },
];

const mimeIcon = (mime: string) => {
  if (mime.startsWith("image/")) return Image;
  if (mime.startsWith("video/")) return Film;
  return FileText;
};

export default function MediaPage() {
  const [assets] = useState(mockAssets);
  const [search, setSearch] = useState("");

  const filtered = assets.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.tags.some((t) => t.includes(search.toLowerCase())));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Media Library</h2>
          <p className="text-sm text-muted-foreground">Upload and manage media assets.</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" /> Upload
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search media..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </Card>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon={<Image className="h-12 w-12" />} title="No media found" description="Upload assets to get started." action={<Button><Upload className="h-4 w-4 mr-2" />Upload</Button>} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((asset) => {
                const Icon = mimeIcon(asset.mimeType);
                return (
                  <TableRow key={asset.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{asset.name}</p>
                          <p className="text-xs text-muted-foreground">{asset.mimeType}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">{asset.mimeType.split("/")[0]}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{(asset.size / 1024).toFixed(1)} KB</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {asset.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(asset.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-error" /></Button>
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
