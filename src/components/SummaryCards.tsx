import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import { formatCurrency } from "../lib/utils";
import SkeletonCard from "./SkeletonCard";
import { motion } from "framer-motion";

export default function SummaryCards() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
  }, 800);

  return () => clearTimeout(timer);
  }, []);
  const { transactions } = useStore();

  const cards = [
    {
      title: "Total Balance",
      amount: 90895,
      subtitle: "COMBINED WEALTH ACROSS ACCOUNTS",
      percentage: "+ 12.5%",
      icon: <Wallet size={20} className="text-blue-600" />,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      trend: "up",
    },
    {
      title: "Total Income",
      amount: 146133,
      subtitle: "TOTAL EARNINGS THIS MONTH",
      percentage: "+ 8.2%",
      icon: <TrendingUp size={20} className="text-green-600" />,
      bg: "bg-green-50 dark:bg-green-900/20",
      trend: "up",
    },
    {
      title: "Total Expenses",
      amount: 55238,
      subtitle: "TOTAL SPENDING THIS MONTH",
      percentage: "- 4.1%",
      icon: <TrendingDown size={20} className="text-red-600" />,
      bg: "bg-red-50 dark:bg-red-900/20",
      trend: "down",
    },
    {
      title: "Savings Rate",
      amount: 62.2,
      subtitle: "PERCENTAGE OF INCOME SAVED",
      percentage: "+ 2.4%",
      isPercentage: true,
      icon: <PiggyBank size={20} className="text-orange-600" />,
      bg: "bg-orange-50 dark:bg-orange-900/20",
      trend: "up",
    },
  ];

  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    
    {loading
      ? Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))
      : cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -6,
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            }}
            transition={{
              duration: 0.2,
              delay: index * 0.1,
            }}
            className="p-6 bg-white dark:bg-gray-800 rounded-[28px] shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-xl ${card.bg}`}>
                {card.icon}
              </div>

              <div
                className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                  card.trend === "up"
                    ? "text-green-600 bg-green-50 dark:bg-green-900/20"
                    : "text-red-600 bg-red-50 dark:bg-red-900/20"
                }`}
              >
                {card.trend === "up"
                  ? card.arrowUp
                  : card.arrowDown}
                {card.percentage}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {card.title}
              </h3>

              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {card.isPercentage
                  ? `${card.amount.toFixed(1)}%`
                  : formatCurrency(card.amount)}
              </p>
            </div>

            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mt-4 tracking-wider uppercase">
              {card.subtitle}
            </p>
          </motion.div>
        ))}
  </div>
);
}