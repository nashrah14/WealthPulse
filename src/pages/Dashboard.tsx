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
  
  // Modal states
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isTrackExpenseOpen, setIsTrackExpenseOpen] = useState(false);
  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);

  // Form states
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
    setFormData({ amount: '', category: '', type: 'Expense', date: new Date().toISOString().split('T')[0], notes: '' });
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal({
      name: goalData.name,
      targetAmount: Number(goalData.targetAmount),
      deadline: goalData.deadline,
    });
    setIsCreateGoalOpen(false);
    setGoalData({ name: '', targetAmount: '', deadline: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="transition-all duration-300 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 sm:px-8 py-6 flex items-center justify-between gap-4 sm:gap-8 border-b border-gray-100 dark:border-gray-800 transition-colors">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="flex-1 relative hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search transactions..."
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-800 dark:text-gray-100"
              />
            </div>
            <button className="sm:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Search size={24} />
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <ThemeToggle />
            
            <button className="relative p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors hidden sm:block">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-50 dark:border-gray-950" />
            </button>

            <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-800 hidden sm:block" />

            <div className="block">
              <RoleSwitcher />
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Nashrah Fathima</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Finance Manager</p>
              </div>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/20">
                NF
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-8 pb-12 max-w-[1600px] mx-auto space-y-10">
          {/* Hero Section */}
          <section id="dashboard">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tight mb-2">Dashboard Overview</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Welcome back, Nashrah! Here's your financial pulse for today.</p>
            </div>
            </section>
            
            {role === 'Admin' && (
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => setIsAddTransactionOpen(true)}
                  className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-2xl shadow-xl shadow-blue-600/25 transition-all active:scale-95"
                >
                  <Plus size={20} />
                  Add Transaction
                </button>
                <button 
                  onClick={() => setIsTrackExpenseOpen(true)}
                  className="flex items-center gap-2 px-6 py-3.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-bold rounded-2xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-all active:scale-95"
                >
                  <TrendingDown size={20} />
                  Track Expense
                </button>
                <button 
                  onClick={() => setIsCreateGoalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all active:scale-95"
                >
                  <Target size={20} />
                  Set Goal
                </button>
              </div>
            )}
          </div>

          <section id="overview">
            <SummaryCards />
          </section>
          <FinancialHealth />
          <section id="goals">
            <Goals />
          </section>

          {/* Budget & Goals Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">Monthly Budget</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Current Spending</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-400">{formatCurrency(50000)} Limit</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Spent so far</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-gray-100">{formatCurrency(15000)}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-400">{formatCurrency(35000)} left</p>
                </div>
                <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '30%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
                <p className="text-xs font-bold text-gray-400">30.0% of your monthly budget used</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">Savings Goal</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">New Car Fund</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-400">{formatCurrency(150000)} Target</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Current Savings</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-gray-100">{formatCurrency(90895)}</p>
                  </div>
                  <p className="text-sm font-bold text-green-500">+ {formatCurrency(2500)} this week</p>
                </div>
                <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '60.6%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
                <p className="text-xs font-bold text-green-500 flex items-center gap-1">
                  <TrendingUp size={14} /> Keep it up! You're making steady progress.
                </p>
              </div>
            </motion.div>
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

      {/* Modals */}
      <Modal 
        isOpen={isAddTransactionOpen} 
        onClose={() => setIsAddTransactionOpen(false)} 
        title="Add Transaction"
      >
        <form onSubmit={handleAddTransaction} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount (₹)</label>
            <input 
              required
              type="number" 
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="0.00"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <input 
                required
                type="text" 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. Food"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <input 
              required
              type="date" 
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
            <textarea 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              rows={3}
              placeholder="Optional notes..."
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 mt-4"
          >
            Save Transaction
          </button>
        </form>
      </Modal>

      <Modal 
        isOpen={isTrackExpenseOpen} 
        onClose={() => setIsTrackExpenseOpen(false)} 
        title="Track Expense"
      >
        <form onSubmit={handleAddTransaction} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount (₹)</label>
            <input 
              required
              type="number" 
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value, type: 'Expense'})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <input 
              required
              type="text" 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. Groceries"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <input 
              required
              type="date" 
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
            <textarea 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              rows={3}
              placeholder="Optional notes..."
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-95 mt-4"
          >
            Add Expense
          </button>
        </form>
      </Modal>

      <Modal 
        isOpen={isCreateGoalOpen} 
        onClose={() => setIsCreateGoalOpen(false)} 
        title="Create Goal"
      >
        <form onSubmit={handleAddGoal} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Goal Name</label>
            <input 
              required
              type="text" 
              value={goalData.name}
              onChange={(e) => setGoalData({...goalData, name: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. Buy a new laptop"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Amount (₹)</label>
            <input 
              required
              type="number" 
              value={goalData.targetAmount}
              onChange={(e) => setGoalData({...goalData, targetAmount: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Deadline</label>
            <input 
              required
              type="date" 
              value={goalData.deadline}
              onChange={(e) => setGoalData({...goalData, deadline: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 transition-all active:scale-95 mt-4"
          >
            Create Goal
          </button>
        </form>
      </Modal>
    </div>
  );
}
