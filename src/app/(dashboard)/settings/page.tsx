"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Bell, Globe, Shield, Palette, Bot } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <Header title="Settings" description="Manage your account preferences" />

      <div className="mx-auto max-w-3xl p-6 space-y-6">
        {saved && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
            Settings saved successfully.
          </div>
        )}

        {/* General */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-500" />
              <div>
                <CardTitle>General</CardTitle>
                <CardDescription>Basic application settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              id="language"
              label="Language"
              options={[
                { value: "en", label: "English" },
                { value: "de", label: "Deutsch" },
                { value: "fr", label: "Fran\u00e7ais" },
                { value: "es", label: "Espa\u00f1ol" },
              ]}
              defaultValue="en"
            />
            <Select
              id="currency"
              label="Default Currency"
              options={[
                { value: "USD", label: "USD ($)" },
                { value: "EUR", label: "EUR (\u20AC)" },
                { value: "GBP", label: "GBP (\u00A3)" },
                { value: "CHF", label: "CHF" },
              ]}
              defaultValue="USD"
            />
            <Select
              id="timezone"
              label="Timezone"
              options={[
                { value: "utc", label: "UTC" },
                { value: "est", label: "Eastern (EST)" },
                { value: "cet", label: "Central European (CET)" },
                { value: "pst", label: "Pacific (PST)" },
              ]}
              defaultValue="utc"
            />
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-500" />
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Choose what you get notified about
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                id: "new_quotes",
                label: "New quotes received",
                description: "Get notified when a supplier submits a quote",
                defaultChecked: true,
              },
              {
                id: "agent_updates",
                label: "Agent activity updates",
                description:
                  "Updates on AI agent progress and completed tasks",
                defaultChecked: true,
              },
              {
                id: "approval_requests",
                label: "Approval requests",
                description:
                  "When a procurement requires your approval",
                defaultChecked: true,
              },
              {
                id: "delivery_updates",
                label: "Delivery updates",
                description: "Shipping and delivery status changes",
                defaultChecked: false,
              },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 cursor-pointer rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <input
                  type="checkbox"
                  defaultChecked={item.defaultChecked}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </label>
            ))}
          </CardContent>
        </Card>

        {/* AI Agent */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bot className="h-5 w-5 text-gray-500" />
              <div>
                <CardTitle>AI Agent Configuration</CardTitle>
                <CardDescription>
                  Configure the procurement AI agent behavior
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              id="agent_autonomy"
              label="Agent Autonomy Level"
              options={[
                {
                  value: "supervised",
                  label: "Supervised - Confirm all actions",
                },
                {
                  value: "semi",
                  label: "Semi-autonomous - Confirm important actions",
                },
                {
                  value: "autonomous",
                  label: "Autonomous - Agent decides independently",
                },
              ]}
              defaultValue="semi"
            />
            <Input
              id="max_budget"
              type="number"
              label="Auto-approval Budget Limit"
              placeholder="Procurements under this amount can be auto-approved"
            />
            <label className="flex items-start gap-3 cursor-pointer rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Require human approval for all purchases
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The agent will always ask for your confirmation before
                  finalizing any procurement
                </p>
              </div>
            </label>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-gray-500" />
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Account security settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-400">
                Danger Zone
              </h4>
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                Permanently delete your account and all associated data.
              </p>
              <Button variant="destructive" size="sm" className="mt-3">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </>
  );
}
