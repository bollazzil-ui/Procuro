"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge, PriorityBadge } from "@/components/ui/status-indicator";
import {
  ShoppingCart,
  TrendingUp,
  Clock,
  CheckCircle2,
  Plus,
  ArrowRight,
  Bot,
  DollarSign,
  Activity,
} from "lucide-react";
import Link from "next/link";
import type { ProcurementStatus, ProcurementPriority } from "@/types/database";

// Mock data for UI demonstration
const stats = [
  {
    name: "Active Procurements",
    value: "12",
    change: "+3 this week",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    name: "Total Savings",
    value: "$24,500",
    change: "+12% vs. manual",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    name: "Pending Approval",
    value: "4",
    change: "2 urgent",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
  {
    name: "Completed",
    value: "48",
    change: "+8 this month",
    icon: CheckCircle2,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
];

const recentProcurements: {
  id: string;
  title: string;
  status: ProcurementStatus;
  priority: ProcurementPriority;
  budget: string;
  date: string;
}[] = [
  {
    id: "1",
    title: "Office Supplies Q2 2026",
    status: "agent_processing",
    priority: "medium",
    budget: "$2,500",
    date: "Mar 18, 2026",
  },
  {
    id: "2",
    title: "Server Hardware Upgrade",
    status: "quotes_received",
    priority: "high",
    budget: "$45,000",
    date: "Mar 17, 2026",
  },
  {
    id: "3",
    title: "Marketing Materials Print Run",
    status: "pending_review",
    priority: "low",
    budget: "$8,200",
    date: "Mar 16, 2026",
  },
  {
    id: "4",
    title: "Cloud Infrastructure Renewal",
    status: "approved",
    priority: "urgent",
    budget: "$120,000",
    date: "Mar 15, 2026",
  },
  {
    id: "5",
    title: "Ergonomic Furniture Bundle",
    status: "draft",
    priority: "medium",
    budget: "$15,000",
    date: "Mar 14, 2026",
  },
];

const recentActivity = [
  {
    id: "1",
    action: "AI Agent completed supplier research",
    target: "Server Hardware Upgrade",
    time: "2 hours ago",
    icon: Bot,
  },
  {
    id: "2",
    action: "New quote received from",
    target: "TechSupply Co.",
    time: "4 hours ago",
    icon: TrendingUp,
  },
  {
    id: "3",
    action: "Procurement approved",
    target: "Cloud Infrastructure Renewal",
    time: "6 hours ago",
    icon: CheckCircle2,
  },
  {
    id: "4",
    action: "New procurement created",
    target: "Office Supplies Q2 2026",
    time: "1 day ago",
    icon: ShoppingCart,
  },
];

export default function DashboardPage() {
  return (
    <>
      <Header
        title="Dashboard"
        description="Overview of your procurement activities"
        actions={
          <Link href="/procurements/new">
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New Procurement
            </Button>
          </Link>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.name}
                    </p>
                    <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`rounded-xl p-3 ${stat.bgColor}`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Procurements */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Procurements</CardTitle>
                <Link href="/procurements">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {recentProcurements.map((procurement) => (
                  <Link
                    key={procurement.id}
                    href={`/procurements/${procurement.id}`}
                    className="flex items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {procurement.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {procurement.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {procurement.budget}
                      </span>
                      <PriorityBadge priority={procurement.priority} />
                      <StatusBadge status={procurement.status} />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Activity className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="mt-0.5 rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
                      <activity.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {activity.action}{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {activity.target}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Agent Quick Access */}
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-600 p-3 shadow-lg shadow-blue-500/25">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Procurement Agent
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Start a conversation with our AI agent to automate your next procurement.
                </p>
              </div>
            </div>
            <Link href="/agent">
              <Button>
                Launch Agent
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
