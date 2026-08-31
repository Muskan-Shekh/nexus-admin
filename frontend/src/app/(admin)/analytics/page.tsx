"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, Users, MessageSquare, Download } from "lucide-react";
import { cn, formatNumber, formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { LoadingState } from "@/components/ui/states";
import { type ChartDataPoint } from "@/types";

const engagementData: ChartDataPoint[] = [
  { date: "Mon", value: 4200 },
  { date: "Tue", value: 4800 },
  { date: "Wed", value: 5100 },
  { date: "Thu", value: 4700 },
  { date: "Fri", value: 6200 },
  { date: "Sat", value: 7100 },
  { date: "Sun", value: 7800 },
];

const retentionData: ChartDataPoint[] = [
  { date: "Week 1", value: 100 },
  { date: "Week 2", value: 85 },
  { date: "Week 3", value: 72 },
  { date: "Week 4", value: 68 },
];

const contentPerformance = [
  { name: "Fantasy", value: 420, color: "hsl(260 84% 60%)" },
  { name: "Sci-Fi", value: 380, color: "hsl(217 91% 60%)" },
  { name: "Romance", value: 290, color: "hsl(346 77% 50%)" },
  { name: "Mystery", value: 210, color: "hsl(142 71% 45%)" },
  { name: "Horror", value: 180, color: "hsl(38 92% 50%)" },
];

const userGrowthData: ChartDataPoint[] = [
  { date: "Jan", value: 1200 },
  { date: "Feb", value: 1400 },
  { date: "Mar", value: 1600 },
  { date: "Apr", value: 1800 },
  { date: "May", value: 2200 },
  { date: "Jun", value: 2600 },
  { date: "Jul", value: 3100 },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("engagement");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
          <p className="text-sm text-muted-foreground">Platform insights and performance metrics.</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" /> Export
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-xl font-bold text-foreground">{formatNumber(3100)}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-success" />
            <span className="text-xs font-medium text-success">+19.2%</span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ai/10">
              <MessageSquare className="h-5 w-5 text-ai" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Conversations</p>
              <p className="text-xl font-bold text-foreground">{formatNumber(45621)}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-success" />
            <span className="text-xs font-medium text-success">+23.1%</span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
              <BarChart3 className="h-5 w-5 text-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Session</p>
              <p className="text-xl font-bold text-foreground">8m 24s</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-success" />
            <span className="text-xs font-medium text-success">+5.3%</span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <BarChart3 className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">AI Cost</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(1247.89)}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <TrendingDown className="h-3 w-3 text-error" />
            <span className="text-xs font-medium text-error">-3.1%</span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue={activeTab}>
        <TabsList>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="growth">User Growth</TabsTrigger>
        </TabsList>
        <TabsContent value="engagement">
          <Card className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Engagement Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 3.7% 21.8%)" />
                <XAxis dataKey="date" stroke="hsl(240 5% 64.9%)" fontSize={12} />
                <YAxis stroke="hsl(240 5% 64.9%)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(240 10% 8.5%)", border: "1px solid hsl(240 3.7% 15.9%)", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="value" stroke="hsl(260 84% 60%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
        <TabsContent value="retention">
          <Card className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground">User Retention</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 3.7% 21.8%)" />
                <XAxis dataKey="date" stroke="hsl(240 5% 64.9%)" fontSize={12} />
                <YAxis stroke="hsl(240 5% 64.9%)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(240 10% 8.5%)", border: "1px solid hsl(240 3.7% 15.9%)", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="value" stroke="hsl(142 71% 45%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
        <TabsContent value="content">
          <Card className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Content Performance by Genre</h3>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={contentPerformance} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                    {contentPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(240 10% 8.5%)", border: "1px solid hsl(240 3.7% 15.9%)", borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {contentPerformance.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="growth">
          <Card className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 3.7% 21.8%)" />
                <XAxis dataKey="date" stroke="hsl(240 5% 64.9%)" fontSize={12} />
                <YAxis stroke="hsl(240 5% 64.9%)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(240 10% 8.5%)", border: "1px solid hsl(240 3.7% 15.9%)", borderRadius: "8px" }} />
                <Bar dataKey="value" fill="hsl(260 84% 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
