"use client";

import { useState } from "react";
import { Sparkles, Play, Save, Plus, Trash2 } from "lucide-react";
import ReactFlow, { Background, Controls, MiniMap, addEdge, useNodesState, useEdgesState, type Node, type Edge, type Connection } from "reactflow";
import "reactflow/dist/style.css";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Drawer } from "@/components/ui/drawer";
import { LoadingState } from "@/components/ui/states";

const initialNodes: Node[] = [
  { id: "1", type: "default", position: { x: 250, y: 0 }, data: { label: "Start" } },
  { id: "2", type: "default", position: { x: 100, y: 150 }, data: { label: "Choice A" } },
  { id: "3", type: "default", position: { x: 400, y: 150 }, data: { label: "Choice B" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", label: "Go left" },
  { id: "e1-3", source: "1", target: "3", label: "Go right" },
];

export default function StoryFlowsPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [flowName, setFlowName] = useState("Fantasy Arc");
  const [isGenerating, setIsGenerating] = useState(false);

  const onConnect = (params: Connection) => setEdges((eds) => addEdge(params, eds));

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    const newNode: Node = {
      id: Math.random().toString(36).slice(2),
      type: "default",
      position: { x: Math.random() * 400 + 50, y: Math.random() * 300 + 50 },
      data: { label: "New Node" },
    };
    setNodes((nds) => [...nds, newNode]);
    setSelectedNode(newNode);
    setDrawerOpen(true);
    setIsGenerating(false);
  };

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Story Flows</h2>
          <p className="text-sm text-muted-foreground">Design narrative branching with visual flow editor.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ai" onClick={handleGenerate} loading={isGenerating}>
            <Sparkles className="h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate Flow"}
          </Button>
          <Button>
            <Save className="h-4 w-4" /> Save
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          <div className="flex items-center justify-between border-b border-border p-3">
            <Input value={flowName} onChange={(e) => setFlowName(e.target.value)} className="max-w-xs border-0 bg-transparent focus-visible:ring-0 text-sm font-medium" />
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Draft</Badge>
            </div>
          </div>
          <div className="h-[500px]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              fitView
            >
              <Background color="hsl(240 3.7% 21.8%)" gap={16} />
              <Controls />
              <MiniMap nodeColor="hsl(260 84% 60%)" />
            </ReactFlow>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Flow Properties</h3>
          {selectedNode ? (
            <div className="space-y-4">
              <Input label="Node ID" value={selectedNode.id} disabled />
              <Input label="Label" defaultValue={selectedNode.data.label as string} />
              <Textarea label="Content" placeholder="Node content..." />
              <Select label="Type" defaultValue="dialogue" options={[
                { value: "dialogue", label: "Dialogue" },
                { value: "choice", label: "Choice" },
                { value: "condition", label: "Condition" },
                { value: "action", label: "Action" },
              ]} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">Select a node to edit its properties</p>
            </div>
          )}
        </Card>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setSelectedNode(null); }}
        title="Edit Node"
        description="Configure node properties"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => { setDrawerOpen(false); setSelectedNode(null); }}>Cancel</Button>
            <Button onClick={() => { setDrawerOpen(false); setSelectedNode(null); }}>Save</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input label="Label" defaultValue={selectedNode?.data.label as string} />
          <Textarea label="Content" placeholder="Node content..." />
          <Select label="Type" defaultValue="dialogue" options={[
            { value: "dialogue", label: "Dialogue" },
            { value: "choice", label: "Choice" },
            { value: "condition", label: "Condition" },
          ]} />
        </div>
      </Drawer>
    </div>
  );
}
