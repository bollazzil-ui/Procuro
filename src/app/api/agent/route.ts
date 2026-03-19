import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/agent
 *
 * Start or continue an agent session.
 * This endpoint will connect to the LangGraph backend
 * once the agent is implemented.
 *
 * Request body:
 * - procurement_id: string (required)
 * - message: string (optional, user message)
 * - session_id: string (optional, to continue existing session)
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { procurement_id, message, session_id } = body;

  if (!procurement_id) {
    return NextResponse.json(
      { error: "procurement_id is required" },
      { status: 400 }
    );
  }

  // TODO: Connect to LangGraph backend
  // 1. Create or retrieve agent session
  // 2. Send message to LangGraph graph
  // 3. Stream or return response
  //
  // Future implementation:
  // const response = await fetch(`${process.env.LANGGRAPH_API_URL}/runs`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     graph_id: "procurement_agent",
  //     input: { messages: [{ role: "user", content: message }] },
  //     config: { configurable: { thread_id: session_id } },
  //   }),
  // });

  return NextResponse.json({
    message: "Agent functionality not yet implemented",
    session_id: session_id || "placeholder-session-id",
    status: "pending_implementation",
    procurement_id,
  });
}

/**
 * GET /api/agent?session_id=xxx
 *
 * Get the current state of an agent session.
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "session_id is required" },
      { status: 400 }
    );
  }

  // TODO: Fetch session state from Supabase
  // const { data: session } = await supabase
  //   .from("agent_sessions")
  //   .select("*")
  //   .eq("id", sessionId)
  //   .single();

  return NextResponse.json({
    message: "Agent functionality not yet implemented",
    session_id: sessionId,
    status: "pending_implementation",
  });
}
