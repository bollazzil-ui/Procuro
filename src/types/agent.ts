/**
 * LangGraph Agent Types
 *
 * These types define the architecture for the procurement AI agent
 * powered by LangGraph. The actual implementation will be added later.
 *
 * Graph Architecture:
 *
 * START → intake_node → research_node → sourcing_node → comparison_node → approval_node → END
 *                ↑                                                              │
 *                └──────────────── human_feedback_node ←─────────────────────────┘
 */

// Agent message types for the chat interface
export interface AgentMessage {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  timestamp: string;
  metadata?: {
    node?: AgentNode;
    tool_calls?: ToolCall[];
    sources?: string[];
  };
}

// LangGraph node definitions
export type AgentNode =
  | "intake"
  | "research"
  | "sourcing"
  | "comparison"
  | "approval"
  | "human_feedback";

// Graph state that flows between nodes
export interface AgentGraphState {
  procurement_id: string;
  current_node: AgentNode;
  messages: AgentMessage[];
  requirements: ProcurementRequirements | null;
  research_results: ResearchResult[];
  supplier_candidates: SupplierCandidate[];
  comparison_matrix: ComparisonMatrix | null;
  decision: AgentDecision | null;
  needs_human_input: boolean;
  error: string | null;
}

export interface ProcurementRequirements {
  item_description: string;
  specifications: Record<string, string>;
  quantity: number;
  budget_range: { min: number; max: number };
  delivery_timeline: string;
  quality_requirements: string[];
  preferred_suppliers: string[];
}

export interface ResearchResult {
  source: string;
  title: string;
  summary: string;
  relevance_score: number;
  url?: string;
}

export interface SupplierCandidate {
  name: string;
  contact_email: string;
  website?: string;
  rating: number;
  price_estimate: number;
  lead_time_days: number;
  certifications: string[];
  notes: string;
}

export interface ComparisonMatrix {
  criteria: string[];
  weights: Record<string, number>;
  scores: Record<string, Record<string, number>>;
  recommendation: string;
}

export interface AgentDecision {
  recommended_supplier: string;
  reasoning: string;
  confidence_score: number;
  alternatives: string[];
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
  result?: string;
}

// API types for communicating with the LangGraph backend
export interface AgentStartRequest {
  procurement_id: string;
  user_message?: string;
}

export interface AgentStepResponse {
  session_id: string;
  state: AgentGraphState;
  is_complete: boolean;
}

export interface AgentFeedbackRequest {
  session_id: string;
  feedback: string;
  approved: boolean;
}
