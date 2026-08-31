"use client";

import { useState } from "react";
import { Plus, Tags, Search, Merge } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { LoadingState, EmptyState } from "@/components/ui/states";
import { type Genre, type Tag } from "@/types";

const mockGenres: Genre[] = [
  { id: "1", name: "Fantasy", slug: "fantasy", description: "Magic, mythical creatures, and epic quests", usageCount: 420 },
  { id: "2", name: "Sci-Fi", slug: "sci-fi", description: "Futuristic technology and space exploration", usageCount: 380 },
  { id: "3", name: "Romance", slug: "romance", description: "Love stories and relationships", usageCount: 290 },
];

const mockTags: Tag[] = [
  { id: "1", name: "mage", slug: "mage", usageCount: 120 },
  { id: "2", name: "ai", slug: "ai", usageCount: 98 },
  { id: "3", name: "detective", slug: "detective", usageCount: 76 },
  { id: "4", name: "noir", slug: "noir", usageCount: 54 },
];

export default function TaxonomyPage() {
  const [genres] = useState(mockGenres);
  const [tags] = useState(mockTags);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("genres");

  const filteredGenres = genres.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));
  const filteredTags = tags.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Genres & Tags</h2>
          <p className="text-sm text-muted-foreground">Organize content with genres and tags.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue={activeTab}>
        <TabsList>
          <TabsTrigger value="genres">Genres</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>
        <TabsContent value="genres">
          <Card>
            <div className="p-4 border-b border-border">
              <Input placeholder="Search genres..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-xs" />
            </div>
            {filteredGenres.length === 0 ? (
              <EmptyState icon={<Tags className="h-12 w-12" />} title="No genres found" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGenres.map((genre) => (
                    <TableRow key={genre.id}>
                      <TableCell className="font-medium">{genre.name}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">{genre.slug}</TableCell>
                      <TableCell className="text-muted-foreground">{genre.description}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{genre.usageCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </TabsContent>
        <TabsContent value="tags">
          <Card>
            <div className="p-4 border-b border-border">
              <Input placeholder="Search tags..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-xs" />
            </div>
            {filteredTags.length === 0 ? (
              <EmptyState icon={<Tags className="h-12 w-12" />} title="No tags found" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-right">Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTags.map((tag) => (
                    <TableRow key={tag.id}>
                      <TableCell className="font-medium">{tag.name}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">{tag.slug}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{tag.usageCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
