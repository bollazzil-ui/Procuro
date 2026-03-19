export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company: string | null;
          role: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          company?: string | null;
          role?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          company?: string | null;
          role?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      procurement_requests: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          category: string;
          status: ProcurementStatus;
          priority: ProcurementPriority;
          budget_min: number | null;
          budget_max: number | null;
          currency: string;
          quantity: number;
          unit: string | null;
          delivery_deadline: string | null;
          requirements: Json | null;
          agent_session_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          category: string;
          status?: ProcurementStatus;
          priority?: ProcurementPriority;
          budget_min?: number | null;
          budget_max?: number | null;
          currency?: string;
          quantity?: number;
          unit?: string | null;
          delivery_deadline?: string | null;
          requirements?: Json | null;
          agent_session_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          category?: string;
          status?: ProcurementStatus;
          priority?: ProcurementPriority;
          budget_min?: number | null;
          budget_max?: number | null;
          currency?: string;
          quantity?: number;
          unit?: string | null;
          delivery_deadline?: string | null;
          requirements?: Json | null;
          agent_session_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      supplier_quotes: {
        Row: {
          id: string;
          procurement_id: string;
          supplier_name: string;
          supplier_email: string | null;
          unit_price: number;
          total_price: number;
          currency: string;
          lead_time_days: number | null;
          notes: string | null;
          status: QuoteStatus;
          sourced_by: "agent" | "manual";
          created_at: string;
        };
        Insert: {
          id?: string;
          procurement_id: string;
          supplier_name: string;
          supplier_email?: string | null;
          unit_price: number;
          total_price: number;
          currency?: string;
          lead_time_days?: number | null;
          notes?: string | null;
          status?: QuoteStatus;
          sourced_by?: "agent" | "manual";
          created_at?: string;
        };
        Update: {
          id?: string;
          procurement_id?: string;
          supplier_name?: string;
          supplier_email?: string | null;
          unit_price?: number;
          total_price?: number;
          currency?: string;
          lead_time_days?: number | null;
          notes?: string | null;
          status?: QuoteStatus;
          sourced_by?: "agent" | "manual";
          created_at?: string;
        };
      };
      agent_sessions: {
        Row: {
          id: string;
          user_id: string;
          procurement_id: string | null;
          status: AgentSessionStatus;
          graph_state: Json | null;
          messages: Json[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          procurement_id?: string | null;
          status?: AgentSessionStatus;
          graph_state?: Json | null;
          messages?: Json[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          procurement_id?: string | null;
          status?: AgentSessionStatus;
          graph_state?: Json | null;
          messages?: Json[];
          created_at?: string;
          updated_at?: string;
        };
      };
      activity_log: {
        Row: {
          id: string;
          user_id: string;
          procurement_id: string | null;
          action: string;
          details: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          procurement_id?: string | null;
          action: string;
          details?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          procurement_id?: string | null;
          action?: string;
          details?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      procurement_status: ProcurementStatus;
      procurement_priority: ProcurementPriority;
      quote_status: QuoteStatus;
      agent_session_status: AgentSessionStatus;
    };
  };
}

export type ProcurementStatus =
  | "draft"
  | "pending_review"
  | "agent_processing"
  | "quotes_received"
  | "approved"
  | "ordered"
  | "delivered"
  | "cancelled";

export type ProcurementPriority = "low" | "medium" | "high" | "urgent";

export type QuoteStatus = "pending" | "accepted" | "rejected" | "expired";

export type AgentSessionStatus =
  | "idle"
  | "researching"
  | "sourcing"
  | "comparing"
  | "awaiting_approval"
  | "completed"
  | "error";

// Convenience types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProcurementRequest =
  Database["public"]["Tables"]["procurement_requests"]["Row"];
export type SupplierQuote =
  Database["public"]["Tables"]["supplier_quotes"]["Row"];
export type AgentSession =
  Database["public"]["Tables"]["agent_sessions"]["Row"];
export type ActivityLog = Database["public"]["Tables"]["activity_log"]["Row"];
