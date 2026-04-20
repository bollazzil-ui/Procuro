"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Bot,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useAuthStore } from "@/stores/auth-store";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Procurements", href: "/procurements", icon: ShoppingCart },
  { name: "AI Agent", href: "/agent", icon: Bot },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const resetAuth = useAuthStore((s) => s.reset);

  const handleSignOut = async () => {
  setSigningOut(true);
  try {
        const supabase = createClient();
        // Clear server-side cookies first (most important for middleware)
        await fetch("/api/auth/signout", { method: "POST" });
        // Then clear any remaining client-side session
        await supabase.auth.signOut({ scope: "local" });
      } catch (err) {
        console.error("Sign out error:", err);
      } finally {
        resetAuth();
        // Hard navigation to home — forces middleware to re-run
        // with cleared cookies and discards any stale client state.
        window.location.href = "/";
      }
    };

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-900",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-4 dark:border-gray-700">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md">
            <svg viewBox="0 0 60 60" className="h-5 w-5" aria-hidden="true">
              <path
                d="M14 6 h18 a16 16 0 0 1 0 32 H22 v16 a4 4 0 0 1 -8 0 Z
                   M22 14 v16 h10 a8 8 0 0 0 0 -16 Z"
                fill="white"
                fillRule="evenodd"
              />
              <circle cx="40" cy="50" r="3.2" fill="white" />
            </svg>
          </div>
          {!collapsed && (
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Procuro
            </span>
          )}
        </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
                )}
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-200 p-3 dark:border-gray-700">
        <button
          onClick={() => setConfirmOpen(true)}
          disabled={signingOut}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Sign Out" : undefined}
        >
          {signingOut ? (
            <svg
              className="h-5 w-5 shrink-0 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <LogOut className="h-5 w-5 shrink-0" />
          )}
          {!collapsed && <span>{signingOut ? "Signing out..." : "Sign Out"}</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mt-2 flex w-full items-center justify-center rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Sign out?"
        description="You'll need to sign in again to access your account."
        confirmLabel="Sign Out"
        confirmVariant="destructive"
        isConfirming={signingOut}
        onConfirm={async () => {
          await handleSignOut();
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </aside>
  );
}
