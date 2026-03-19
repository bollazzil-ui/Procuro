"""
LangGraph State Definition for the Procurement Agent

Defines the TypedDict state schema that flows through the graph.
Each node reads from and writes to this shared state.
"""

from typing import TypedDict, Literal
from dataclasses import dataclass, field


class ProcurementRequirements(TypedDict, total=False):
    """Structured procurement requirements extracted from user input."""
    item_description: str
    specifications: dict[str, str]
    quantity: int
    budget_range: dict[str, float]  # {"min": ..., "max": ...}
    delivery_timeline: str
    quality_requirements: list[str]
    preferred_suppliers: list[str]


class ResearchResult(TypedDict):
    """A single research finding."""
    source: str
    title: str
    summary: str
    relevance_score: float
    url: str


class SupplierCandidate(TypedDict, total=False):
    """A potential supplier identified during sourcing."""
    name: str
    contact_email: str
    website: str
    rating: float
    price_estimate: float
    lead_time_days: int
    certifications: list[str]
    notes: str


class ComparisonMatrix(TypedDict, total=False):
    """Multi-criteria comparison of supplier quotes."""
    criteria: list[str]
    weights: dict[str, float]
    scores: dict[str, dict[str, float]]
    recommendation: str


class AgentDecision(TypedDict, total=False):
    """The agent's final recommendation."""
    recommended_supplier: str
    reasoning: str
    confidence_score: float
    alternatives: list[str]


class Message(TypedDict):
    """A chat message in the agent session."""
    role: Literal["user", "assistant", "system", "tool"]
    content: str
    metadata: dict | None


class AgentState(TypedDict, total=False):
    """
    The complete state that flows through the LangGraph procurement agent.

    This state is passed between nodes and persisted in the database.
    Each node can read from any field and write to the fields it owns.
    """
    # Session info
    procurement_id: str
    current_node: Literal[
        "intake", "research", "sourcing", "comparison", "approval", "human_feedback"
    ]

    # Conversation
    messages: list[Message]

    # Processed data (each populated by its respective node)
    requirements: ProcurementRequirements | None
    research_results: list[ResearchResult]
    supplier_candidates: list[SupplierCandidate]
    comparison_matrix: ComparisonMatrix | None
    decision: AgentDecision | None

    # Control flow
    needs_human_input: bool
    error: str | None
