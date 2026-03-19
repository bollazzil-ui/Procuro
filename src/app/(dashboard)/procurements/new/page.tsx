"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { ArrowLeft, Bot, Send, Sparkles } from "lucide-react";
import Link from "next/link";

const categories = [
  { value: "office_supplies", label: "Office Supplies" },
  { value: "it_hardware", label: "IT Hardware" },
  { value: "it_services", label: "IT Services" },
  { value: "software", label: "Software" },
  { value: "furniture", label: "Furniture" },
  { value: "marketing", label: "Marketing" },
  { value: "professional_services", label: "Professional Services" },
  { value: "raw_materials", label: "Raw Materials" },
  { value: "maintenance", label: "Maintenance & Repair" },
  { value: "other", label: "Other" },
];

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

const currencies = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (\u20AC)" },
  { value: "GBP", label: "GBP (\u00A3)" },
  { value: "CHF", label: "CHF" },
];

export default function NewProcurementPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useAgent, setUseAgent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement Supabase insert
    // For now, simulate submission
    await new Promise((r) => setTimeout(r, 1000));

    if (useAgent) {
      router.push("/agent");
    } else {
      router.push("/procurements");
    }
  };

  return (
    <>
      <Header
        title="New Procurement"
        description="Create a new procurement request"
        actions={
          <Link href="/procurements">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="mx-auto max-w-3xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Describe what you need to procure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                id="title"
                label="Title"
                placeholder="e.g., Office Supplies Q2 2026"
                required
              />
              <Textarea
                id="description"
                label="Description"
                placeholder="Describe what you need, including any specific requirements or preferences..."
                rows={4}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  id="category"
                  label="Category"
                  options={categories}
                  placeholder="Select a category"
                  required
                />
                <Select
                  id="priority"
                  label="Priority"
                  options={priorities}
                  defaultValue="medium"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Budget & Quantity */}
          <Card>
            <CardHeader>
              <CardTitle>Budget & Quantity</CardTitle>
              <CardDescription>
                Set your budget range and quantity requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Select
                  id="currency"
                  label="Currency"
                  options={currencies}
                  defaultValue="USD"
                />
                <Input
                  id="budgetMin"
                  type="number"
                  label="Min Budget"
                  placeholder="0"
                  min={0}
                />
                <Input
                  id="budgetMax"
                  type="number"
                  label="Max Budget"
                  placeholder="0"
                  min={0}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="quantity"
                  type="number"
                  label="Quantity"
                  placeholder="1"
                  min={1}
                  defaultValue="1"
                  required
                />
                <Input
                  id="unit"
                  label="Unit"
                  placeholder="e.g., pieces, kg, hours"
                />
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>
                When do you need this delivered?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                id="deadline"
                type="date"
                label="Delivery Deadline"
              />
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Requirements</CardTitle>
              <CardDescription>
                Any specific technical requirements, certifications, or preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="requirements"
                placeholder="e.g., Must be ISO 9001 certified, minimum 2-year warranty, compatible with existing systems..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* AI Agent Toggle */}
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-blue-600 p-3 shadow-lg shadow-blue-500/25">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Use AI Agent
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Let our AI agent automatically research suppliers, gather
                    quotes, and provide recommendations.
                  </p>
                  <label className="mt-3 flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useAgent}
                      onChange={(e) => setUseAgent(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enable AI-assisted procurement
                    </span>
                    <Sparkles className="h-4 w-4 text-blue-500" />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Link href="/procurements">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button variant="secondary" type="submit" disabled={isSubmitting}>
              Save as Draft
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {useAgent ? (
                <>
                  <Bot className="h-4 w-4" />
                  Create & Start Agent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
