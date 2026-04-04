import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Menu, Search, Bell, Target } from 'lucide-react';
import { useStore } from '../store/useStore';
import SummaryCards from '../components/SummaryCards';
import FinancialHealth from "../components/FinancialHealth";
import Charts from '../components/Charts';
import Transactions from '../components/Transactions';
import Insights from '../components/Insights';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import ThemeToggle from '../components/ThemeToggle';
import Goals from "../components/Goals";
import RoleSwitcher from '../components/RoleSwitcher';
import Footer from "../components/Footer";
import { cn, formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { role, addTransaction, addGoal } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isTrackExpenseOpen, setIsTrackExpenseOpen] = useState(false);
  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    type: 'Expense' as 'Income' | 'Expense',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [goalData, setGoalData] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction({
      amount: Number(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date,
      notes: formData.notes,
    });
    setIsAddTransactionOpen(false);
    setIsTrackExpenseOpen(false);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal({
      name: goalData.name,
      targetAmount: Number(goalData.targetAmount),
      deadline: goalData.deadline,
    });
    setIsCreateGoalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main>
<header className="sticky top-0 z-40 bg-white dark:bg-gray-900">
{/* header unchanged */}
</header>
<div className="px-8 pb-12 max-w-[1600px] mx-auto space-y-10">
<section id="dashboard">
<div className="flex flex-col lg:flex-row justify-between gap-8">
<div>
<h2 className="text-4xl font-black">Dashboard Overview</h2>
<p className="text-gray-500">
Welcome back, Nashrah! Here's your financial pulse for today.
</p>
</div>

{role === 'Admin' && (
<div className="flex flex-wrap gap-4">

<button onClick={() => setIsAddTransactionOpen(true)}
className="px-6 py-3 bg-blue-600 text-white rounded-2xl">
<Plus size={20} /> Add Transaction
</button>

<button onClick={() => setIsTrackExpenseOpen(true)}
className="px-6 py-3 bg-green-100 text-green-600 rounded-2xl">
<TrendingDown size={20}/> Track Expense
</button>

<button onClick={() => setIsCreateGoalOpen(true)}
className="px-6 py-3 bg-red-100 text-red-600 rounded-2xl">
<Target size={20}/> Set Goal
</button>

</div>
)}
</div>
</section>
<section id="overview">
<SummaryCards />
</section>
<FinancialHealth />
<section id="goals">
<Goals />
</section>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
</div>
<section id="analytics">
<Charts />
</section>
<Insights />
<section id="transactions">
<Transactions />
</section>
</div>
<Footer />
</main>
</div>
  );
}
