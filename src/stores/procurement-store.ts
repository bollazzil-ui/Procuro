import { create } from "zustand";
import type { ProcurementRequest, SupplierQuote } from "@/types/database";

interface ProcurementState {
  procurements: ProcurementRequest[];
  currentProcurement: ProcurementRequest | null;
  quotes: SupplierQuote[];
  isLoading: boolean;
  setProcurements: (procurements: ProcurementRequest[]) => void;
  setCurrentProcurement: (procurement: ProcurementRequest | null) => void;
  setQuotes: (quotes: SupplierQuote[]) => void;
  setLoading: (loading: boolean) => void;
  addProcurement: (procurement: ProcurementRequest) => void;
  updateProcurement: (id: string, updates: Partial<ProcurementRequest>) => void;
}

export const useProcurementStore = create<ProcurementState>((set) => ({
  procurements: [],
  currentProcurement: null,
  quotes: [],
  isLoading: false,
  setProcurements: (procurements) => set({ procurements }),
  setCurrentProcurement: (currentProcurement) => set({ currentProcurement }),
  setQuotes: (quotes) => set({ quotes }),
  setLoading: (isLoading) => set({ isLoading }),
  addProcurement: (procurement) =>
    set((state) => ({
      procurements: [procurement, ...state.procurements],
    })),
  updateProcurement: (id, updates) =>
    set((state) => ({
      procurements: state.procurements.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
      currentProcurement:
        state.currentProcurement?.id === id
          ? { ...state.currentProcurement, ...updates }
          : state.currentProcurement,
    })),
}));
