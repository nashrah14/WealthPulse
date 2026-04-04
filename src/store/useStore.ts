import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockData';
interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'Income' | 'Expense';
  notes?: string;
}
interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  deadline: string;
}
interface FinanceState {
  transactions: Transaction[];
  goals: Goal[];
  role: 'Admin' | 'Viewer';
  isSidebarOpen: boolean;
  setRole: (role: 'Admin' | 'Viewer') => void;
  toggleSidebar: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, updatedTransaction: Partial<Transaction>) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
}
export const useStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: mockTransactions as Transaction[],
      goals: [],
      role: 'Admin',
      isSidebarOpen: true,

      setRole: (role) => set({ role }),

      toggleSidebar: () =>
        set((state) => ({
          isSidebarOpen: !state.isSidebarOpen
        })),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: Math.random().toString(36).substr(2, 9)
            },
            ...state.transactions
          ]
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id)
        })),
      editTransaction: (id, updatedTransaction) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedTransaction } : t
          )
        })),
      addGoal: (goal) =>
        set((state) => ({
          goals: [
            {
              ...goal,
              id: Math.random().toString(36).substr(2, 9)
            },
            ...state.goals
          ]
        })),
    }),
    {
      name: 'wealthpulse-storage',
      partialize: (state) => ({
        role: state.role,
        goals: state.goals,
        transactions: state.transactions
      }),
    }
  )
);
