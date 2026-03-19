import { create } from "zustand";
import type { AgentMessage, AgentGraphState, AgentNode } from "@/types/agent";

interface AgentState {
  sessionId: string | null;
  messages: AgentMessage[];
  graphState: AgentGraphState | null;
  currentNode: AgentNode | null;
  isProcessing: boolean;
  error: string | null;
  setSessionId: (id: string | null) => void;
  addMessage: (message: AgentMessage) => void;
  setMessages: (messages: AgentMessage[]) => void;
  setGraphState: (state: AgentGraphState | null) => void;
  setCurrentNode: (node: AgentNode | null) => void;
  setProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  sessionId: null,
  messages: [],
  graphState: null,
  currentNode: null,
  isProcessing: false,
  error: null,
  setSessionId: (sessionId) => set({ sessionId }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  setGraphState: (graphState) => set({ graphState }),
  setCurrentNode: (currentNode) => set({ currentNode }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      sessionId: null,
      messages: [],
      graphState: null,
      currentNode: null,
      isProcessing: false,
      error: null,
    }),
}));
