"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge, PriorityBadge } from "@/components/ui/status-indicator";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Plus,
  Search,
  Filter,
  ShoppingCart,
  Calendar,
  DollarSign,
  MoreVertical,
} from "lucide-react";
import type { ProcurementStatus, ProcurementPriority } from "@/types/database";

// Mock data
const mockProcurements: {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ProcurementStatus;
  priority: ProcurementPriority;
  budget: string;
  quantity: number;
  deadline: string;
  createdAt: string;
  quotesCount: number;
}[] = [
  {
    id: "1",
    title: "Office Supplies Q2 2026",
    description: "Quarterly office supplies including paper, pens, and printer cartridges",
    category: "Office Supplies",
    status: "agent_processing",
    priority: "medium",
    budget: "$2,000 - $2,500",
    quantity: 500,
    deadline: "Apr 15, 2026",
    createdAt: "Mar 18, 2026",
    quotesCount: 0,
  },
  {
    id: "2",
    title: "Server Hardware Upgrade",
    description: "Dell PowerEdge R760 servers for data center expansion",
    category: "IT Hardware",
    status: "quotes_received",
    priority: "high",
    budget: "$40,000 - $50,000",
    quantity: 4,
    deadline: "May 1, 2026",
    createdAt: "Mar 17, 2026",
    quotesCount: 3,
  },
  {
    id: "3",
    title: "Marketing Materials Print Run",
    description: "Brochures, business cards, and banner designs for trade show",
    category: "Marketing",
    status: "pending_review",
    priority: "low",
    budget: "$7,000 - $9,000",
    quantity: 5000,
    deadline: "Jun 1, 2026",
    createdAt: "Mar 16, 2026",
    quotesCount: 2,
  },
  {
    id: "4",
    title: "Cloud Infrastructure Renewal",
    description: "Annual AWS Reserved Instance renewal and expansion",
    category: "IT Services",
    status: "approved",
    priority: "urgent",
    budget: "$100,000 - $130,000",
    quantity: 1,
    deadline: "Apr 1, 2026",
    createdAt: "Mar 15, 2026",
    quotesCount: 1,
  },
  {
    id: "5",
    title: "Ergonomic Furniture Bundle",
    description: "Standing desks and ergonomic chairs for new office floor",
    category: "Furniture",
    status: "draft",
    priority: "medium",
    budget: "$12,000 - $18,000",
    quantity: 25,
    deadline: "Jul 1, 2026",
    createdAt: "Mar 14, 2026",
    quotesCount: 0,
  },
  {
    id: "6",
    title: "Software Licenses - Design Tools",
    description: "Figma and Adobe Creative Cloud enterprise licenses",
    category: "Software",
    status: "ordered",
    priority: "medium",
    budget: "$15,000 - $18,000",
    quantity: 15,
    deadline: "Apr 10, 2026",
    createdAt: "Mar 10, 2026",
    quotesCount: 2,
  },
];

const statusFilters: { value: ProcurementStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "pending_review", label: "Pending" },
  { value: "agent_processing", label: "Processing" },
  { value: "quotes_received", label: "Quotes" },
  { value: "approved", label: "Approved" },
  { value: "ordered", label: "Ordered" },
  { value: "delivered", label: "Delivered" },
];

export default function ProcurementsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ProcurementStatus | "all">(
    "all"
  );

  const filtered = mockProcurements.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || p.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Header
        title="Procurements"
        description="Manage your procurement requests"
        actions={
          <Link href="/procurements/new">
            <Button>
              <Plus className="h-4 w-4" />
              New Procurement
            </Button>
          </Link>
        }
      />

      <div className="p-6 space-y-6">
        {/* Search and filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Search procurements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <div className="flex gap-1">
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeFilter === filter.value
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Procurement list */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart className="h-12 w-12" />}
            title="No procurements found"
            description="Create your first procurement request to get started with AI-powered sourcing."
            action={
              <Link href="/procurements/new">
                <Button>
                  <Plus className="h-4 w-4" />
                  New Procurement
                </Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((procurement) => (
              <Link
                key={procurement.id}
                href={`/procurements/${procurement.id}`}
              >
                <Card className="transition-all hover:border-blue-200 hover:shadow-md dark:hover:border-blue-800">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                            {procurement.title}
                          </h3>
                          <StatusBadge status={procurement.status} />
                          <PriorityBadge priority={procurement.priority} />
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {procurement.description}
                        </p>
                        <div className="mt-3 flex items-center gap-5 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Badge variant="secondary">
                              {procurement.category}
                            </Badge>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <DollarSign className="h-3.5 w-3.5" />
                            {procurement.budget}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            Due {procurement.deadline}
                          </span>
                          {procurement.quotesCount > 0 && (
                            <span className="flex items-center gap-1.5">
                              <Badge variant="default">
                                {procurement.quotesCount} quote
                                {procurement.quotesCount > 1 ? "s" : ""}
                              </Badge>
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="ml-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
