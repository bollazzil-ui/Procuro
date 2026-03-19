"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Send,
  User,
  Loader2,
  Search,
  FileText,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import type { AgentNode } from "@/types/agent";

// Graph node visualization
const graphNodes: {
  id: AgentNode;
  label: string;
  icon: React.ElementType;
  description: string;
}[] = [
  {
    id: "intake",
    label: "Intake",
    icon: FileText,
    description: "Understanding your requirements",
  },
  {
    id: "research",
    label: "Research",
    icon: Search,
    description: "Researching the market",
  },
  {
    id: "sourcing",
    label: "Sourcing",
    icon: Sparkles,
    description: "Finding suppliers",
  },
  {
    id: "comparison",
    label: "Compare",
    icon: BarChart3,
    description: "Comparing options",
  },
  {
    id: "approval",
    label: "Approval",
    icon: CheckCircle2,
    description: "Ready for your review",
  },
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm your AI procurement agent. I can help you find suppliers, gather quotes, and compare options. Tell me what you need to procure, and I'll get started.",
    timestamp: new Date().toISOString(),
  },
];

export default function AgentPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentNode, setCurrentNode] = useState<AgentNode | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);

    // Simulate agent processing through nodes
    const nodes: AgentNode[] = [
      "intake",
      "research",
      "sourcing",
      "comparison",
    ];
    for (const node of nodes) {
      setCurrentNode(node);
      await new Promise((r) => setTimeout(r, 1500));
    }

    // Simulate agent response
    const agentResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `I've analyzed your request. Here's what I found:\n\n**Market Research Summary:**\nI identified several potential suppliers for your needs. The market shows competitive pricing with average lead times of 2-3 weeks.\n\n**Top Recommendations:**\n1. **SupplierA** - Best price at $X per unit, 14-day delivery\n2. **SupplierB** - Premium quality, 7-day delivery, slightly higher price\n3. **SupplierC** - Best value with volume discounts\n\nWould you like me to:\n- Get detailed quotes from these suppliers?\n- Expand the search to more vendors?\n- Adjust any criteria?`,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, agentResponse]);
    setCurrentNode(null);
    setIsProcessing(false);
  };

  return (
    <>
      <Header
        title="AI Procurement Agent"
        description="Powered by LangGraph"
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMessages(initialMessages);
              setCurrentNode(null);
            }}
          >
            <RotateCcw className="h-4 w-4" />
            New Session
          </Button>
        }
      />

      <div className="flex h-[calc(100vh-4rem)] flex-col">
        {/* Graph Visualization */}
        <div className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-center justify-center gap-2">
            {graphNodes.map((node, idx) => (
              <div key={node.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    currentNode === node.id
                      ? "bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-2 dark:bg-blue-900/30 dark:text-blue-400"
                      : currentNode &&
                        graphNodes.findIndex((n) => n.id === currentNode) >
                          idx
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {currentNode === node.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : currentNode &&
                    graphNodes.findIndex((n) => n.id === currentNode) > idx ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <node.icon className="h-3.5 w-3.5" />
                  )}
                  {node.label}
                </div>
                {idx < graphNodes.length - 1 && (
                  <div
                    className={`mx-1 h-px w-8 ${
                      currentNode &&
                      graphNodes.findIndex((n) => n.id === currentNode) > idx
                        ? "bg-emerald-300 dark:bg-emerald-600"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          {currentNode && (
            <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
              {graphNodes.find((n) => n.id === currentNode)?.description}...
            </p>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    message.role === "user"
                      ? "bg-gray-200 dark:bg-gray-700"
                      : "bg-gradient-to-br from-blue-600 to-indigo-600"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>

                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
                  }`}
                >
                  <div
                    className={`whitespace-pre-wrap text-sm ${
                      message.role === "user"
                        ? "text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                  <div className="flex items-center gap-1.5">
                    <div className="typing-dot h-2 w-2 rounded-full bg-gray-400" />
                    <div className="typing-dot h-2 w-2 rounded-full bg-gray-400" />
                    <div className="typing-dot h-2 w-2 rounded-full bg-gray-400" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="mx-auto max-w-3xl">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Describe what you need to procure..."
                  disabled={isProcessing}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:bg-gray-800"
                />
              </div>
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isProcessing}
                className="h-[46px] w-[46px] rounded-xl"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <AlertCircle className="h-3 w-3 text-gray-400" />
              <p className="text-xs text-gray-400">
                Agent functionality is a preview. Full LangGraph integration coming soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
