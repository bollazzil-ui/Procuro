"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge, PriorityBadge } from "@/components/ui/status-indicator";
import {
  ArrowLeft,
  Bot,
  Calendar,
  DollarSign,
  Package,
  CheckCircle2,
  Clock,
  Building2,
  Mail,
  ExternalLink,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";

// Mock data for a single procurement
const procurement = {
  id: "2",
  title: "Server Hardware Upgrade",
  description:
    "Dell PowerEdge R760 servers for data center expansion. Need 4 units with dual Xeon processors, 256GB RAM, and NVMe storage arrays.",
  category: "IT Hardware",
  status: "quotes_received" as const,
  priority: "high" as const,
  budgetMin: 40000,
  budgetMax: 50000,
  currency: "USD",
  quantity: 4,
  unit: "units",
  deadline: "May 1, 2026",
  createdAt: "Mar 17, 2026",
  requirements:
    "Must include 3-year ProSupport warranty. Servers must support VMware ESXi 8.0. Rack-mounted 2U form factor required. Need next-business-day on-site service.",
};

const quotes = [
  {
    id: "q1",
    supplierName: "TechSupply Co.",
    supplierEmail: "sales@techsupply.com",
    unitPrice: 11200,
    totalPrice: 44800,
    leadTimeDays: 14,
    rating: 4.8,
    status: "pending" as const,
    sourcedBy: "agent" as const,
    notes:
      "Includes 3-year warranty. Free installation support. Volume discount applied.",
  },
  {
    id: "q2",
    supplierName: "ServerWorld Direct",
    supplierEmail: "enterprise@serverworld.com",
    unitPrice: 10800,
    totalPrice: 43200,
    leadTimeDays: 21,
    rating: 4.5,
    status: "pending" as const,
    sourcedBy: "agent" as const,
    notes:
      "Competitive pricing. 3-year warranty included. Shipping from EU warehouse.",
  },
  {
    id: "q3",
    supplierName: "Dell Direct Enterprise",
    supplierEmail: "enterprise@dell.com",
    unitPrice: 12500,
    totalPrice: 50000,
    leadTimeDays: 7,
    rating: 4.9,
    status: "pending" as const,
    sourcedBy: "manual" as const,
    notes:
      "Official Dell pricing with ProSupport Plus. Fastest delivery. Dedicated account manager.",
  },
];

const timeline = [
  {
    date: "Mar 17, 2026 09:30",
    event: "Procurement request created",
    type: "create",
  },
  {
    date: "Mar 17, 2026 09:31",
    event: "AI Agent started research",
    type: "agent",
  },
  {
    date: "Mar 17, 2026 10:15",
    event: "Market research completed - 12 suppliers identified",
    type: "agent",
  },
  {
    date: "Mar 17, 2026 11:00",
    event: "Quote received from TechSupply Co.",
    type: "quote",
  },
  {
    date: "Mar 17, 2026 14:30",
    event: "Quote received from ServerWorld Direct",
    type: "quote",
  },
  {
    date: "Mar 18, 2026 08:00",
    event: "Manual quote added from Dell Direct Enterprise",
    type: "manual",
  },
];

export default function ProcurementDetailPage() {
  return (
    <>
      <Header
        title={procurement.title}
        description={`Created ${procurement.createdAt}`}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/procurements">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <Link href="/agent">
              <Button variant="outline" size="sm">
                <Bot className="h-4 w-4" />
                Open Agent
              </Button>
            </Link>
            <Button variant="success" size="sm">
              <CheckCircle2 className="h-4 w-4" />
              Approve
            </Button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* Status bar */}
        <div className="flex items-center gap-3">
          <StatusBadge status={procurement.status} />
          <PriorityBadge priority={procurement.priority} />
          <Badge variant="secondary">{procurement.category}</Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {procurement.description}
                </p>
                {procurement.requirements && (
                  <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                    <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Requirements
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {procurement.requirements}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quotes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    Supplier Quotes ({quotes.length})
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    Add Quote
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quotes.map((quote, idx) => (
                    <div
                      key={quote.id}
                      className={`rounded-xl border p-4 transition-colors ${
                        idx === 1
                          ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/10"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {quote.supplierName}
                            </h4>
                            {idx === 1 && (
                              <Badge variant="success">Best Value</Badge>
                            )}
                            <Badge
                              variant={
                                quote.sourcedBy === "agent"
                                  ? "purple"
                                  : "secondary"
                              }
                            >
                              {quote.sourcedBy === "agent"
                                ? "AI Sourced"
                                : "Manual"}
                            </Badge>
                          </div>
                          <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                            <Mail className="h-3.5 w-3.5" />
                            {quote.supplierEmail}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${quote.totalPrice.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${quote.unitPrice.toLocaleString()} / unit
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Truck className="h-4 w-4" />
                          {quote.leadTimeDays} days
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 text-amber-500" />
                          {quote.rating}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {quote.notes}
                      </p>

                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="success">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-3.5 w-3.5" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Details */}
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-gray-500">
                    <DollarSign className="h-4 w-4" />
                    Budget
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ${procurement.budgetMin.toLocaleString()} - $
                    {procurement.budgetMax.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-gray-500">
                    <Package className="h-4 w-4" />
                    Quantity
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {procurement.quantity} {procurement.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    Deadline
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {procurement.deadline}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-gray-500">
                    <Building2 className="h-4 w-4" />
                    Category
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {procurement.category}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            item.type === "agent"
                              ? "bg-purple-500"
                              : item.type === "quote"
                              ? "bg-blue-500"
                              : item.type === "create"
                              ? "bg-emerald-500"
                              : "bg-gray-400"
                          }`}
                        />
                        {idx < timeline.length - 1 && (
                          <div className="mt-1 h-full w-px bg-gray-200 dark:bg-gray-700" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {item.event}
                        </p>
                        <p className="text-xs text-gray-400">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
