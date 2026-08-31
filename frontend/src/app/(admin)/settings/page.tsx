"use client";

import { useState } from "react";
import { User, Lock, Palette, Building2, Globe, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account and platform configuration.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue={activeTab}>
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="organisation">Organisation</TabsTrigger>
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="ai">AI Configuration</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent-foreground flex items-center justify-center text-xl font-bold text-primary-foreground">
                  A
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Admin User</h3>
                  <p className="text-sm text-muted-foreground">admin@nexus.ai</p>
                </div>
              </div>
              <Input label="Display Name" defaultValue="Admin User" />
              <Input label="Email" type="email" defaultValue="admin@nexus.ai" />
              <Textarea label="Bio" placeholder="Tell us about yourself..." />
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card className="p-6">
            <div className="space-y-4">
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm Password" type="password" />
              <Button>Update Password</Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Use dark theme across the application</p>
                </div>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Compact Mode</p>
                  <p className="text-xs text-muted-foreground">Reduce spacing for higher density</p>
                </div>
                <Switch checked={false} onCheckedChange={() => {}} />
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="organisation">
          <Card className="p-6">
            <div className="space-y-4">
              <Input label="Organisation Name" defaultValue="Nexus AI" />
              <Input label="Organisation Slug" defaultValue="nexus-ai" />
              <Button>Save Organisation</Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="platform">
          <Card className="p-6">
            <div className="space-y-4">
              <Select label="Default Language" defaultValue="en" options={[
                { value: "en", label: "English" },
                { value: "es", label: "Spanish" },
                { value: "fr", label: "French" },
              ]} />
              <Select label="Timezone" defaultValue="utc" options={[
                { value: "utc", label: "UTC" },
                { value: "est", label: "Eastern Time" },
                { value: "pst", label: "Pacific Time" },
              ]} />
              <Button>Save Platform Settings</Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="ai">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">AI Autonomy Level</p>
                  <p className="text-xs text-muted-foreground">Control how much AI can act without approval</p>
                </div>
                <Select defaultValue="approval" className="w-40" options={[
                  { value: "suggest", label: "Suggest Only" },
                  { value: "approval", label: "Approval Required" },
                  { value: "autonomous", label: "Autonomous" },
                ]} />
              </div>
              <Input label="Default AI Model" defaultValue="gpt-4o" />
              <Input label="Max Cost per Generation" type="number" defaultValue="0.05" />
              <Button>Save AI Configuration</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
