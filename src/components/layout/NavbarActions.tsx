"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import { Avatar } from "@/components/ui/avatar";

export function NavbarActions() {
  const { user, profile, isLoading } = useAuthStore();

  if (isLoading) {
    // Skeleton placeholder while auth resolves
    return <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />;
  }

  if (user) {
    return (
      <Link
        href="/dashboard"
        className="flex items-center gap-2 group"
        title="Go to Dashboard"
      >
        <Avatar
          src={profile?.avatar_url}
          name={profile?.full_name || user.email || "User"}
          size="sm"
          className="ring-2 ring-transparent group-hover:ring-blue-500 transition-all"
        />
        <span className="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white transition-colors">
          {profile?.full_name?.split(" ")[0] || "Dashboard"}
        </span>
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
      >
        Get Started
      </Link>
    </>
  );
}