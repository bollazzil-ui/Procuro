import { Badge } from "./badge";
import type { ProcurementStatus, ProcurementPriority } from "@/types/database";

const statusConfig: Record<
  ProcurementStatus,
  { label: string; variant: "default" | "success" | "warning" | "danger" | "secondary" | "purple" }
> = {
  draft: { label: "Draft", variant: "secondary" },
  pending_review: { label: "Pending Review", variant: "warning" },
  agent_processing: { label: "Agent Processing", variant: "purple" },
  quotes_received: { label: "Quotes Received", variant: "default" },
  approved: { label: "Approved", variant: "success" },
  ordered: { label: "Ordered", variant: "default" },
  delivered: { label: "Delivered", variant: "success" },
  cancelled: { label: "Cancelled", variant: "danger" },
};

const priorityConfig: Record<
  ProcurementPriority,
  { label: string; variant: "default" | "success" | "warning" | "danger" | "secondary" }
> = {
  low: { label: "Low", variant: "secondary" },
  medium: { label: "Medium", variant: "default" },
  high: { label: "High", variant: "warning" },
  urgent: { label: "Urgent", variant: "danger" },
};

export function StatusBadge({ status }: { status: ProcurementStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function PriorityBadge({ priority }: { priority: ProcurementPriority }) {
  const config = priorityConfig[priority];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
