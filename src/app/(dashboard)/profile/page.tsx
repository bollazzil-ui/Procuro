"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Camera, Save } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

export default function ProfilePage() {
  const { profile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement Supabase profile update
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <Header
        title="Profile"
        description="Manage your personal information"
      />

      <div className="mx-auto max-w-3xl p-6 space-y-6">
        {saved && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
            Profile updated successfully.
          </div>
        )}

        {/* Avatar section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar
                  src={profile?.avatar_url}
                  name={profile?.full_name || "User"}
                  size="lg"
                  className="h-20 w-20 text-xl"
                />
                <button className="absolute -bottom-1 -right-1 rounded-full bg-blue-600 p-1.5 text-white shadow-lg transition-colors hover:bg-blue-700">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {profile?.full_name || "User"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {profile?.email || "user@example.com"}
                </p>
                {profile?.role && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {profile.role}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <form onSubmit={handleSave}>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="fullName"
                  label="Full Name"
                  defaultValue={profile?.full_name || ""}
                  placeholder="John Doe"
                />
                <Input
                  id="email"
                  type="email"
                  label="Email"
                  defaultValue={profile?.email || ""}
                  placeholder="you@company.com"
                  disabled
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="company"
                  label="Company"
                  defaultValue={profile?.company || ""}
                  placeholder="Acme Inc."
                />
                <Input
                  id="role"
                  label="Job Title"
                  defaultValue={profile?.role || ""}
                  placeholder="Procurement Manager"
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end">
            <Button type="submit" isLoading={isLoading}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
