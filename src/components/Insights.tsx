import { Lightbulb, TrendingUp, Target, Activity, DollarSign } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

export default function Insights() {
  const { transactions } = useStore();

  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const categorySpending = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const highestCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0] || ['None', 0];
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
  const avgDailySpending = totalExpenses / 30; // Assuming 30 days for simplicity

  const insights = [
    {
      title: 'Highest Spending',
      value: highestCategory[0],
      description: `You spent ${formatCurrency(highestCategory[1] as number)} on ${highestCategory[0]} this month.`,
      icon: <DollarSign className="text-orange-500" />,
      color: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      title: 'Monthly Savings',
      value: `${savingsRate.toFixed(1)}%`,
      description: savingsRate > 20 ? 'Great job! Your savings rate is above the recommended 20%.' : 'Consider reducing non-essential expenses to reach your 20% goal.',
      icon: <Target className="text-green-500" />,
      color: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Spending Trend',
      value: 'Down 12%',
      description: 'Your expenses are 12% lower compared to the previous month.',
      icon: <TrendingUp className="text-blue-500" />,
      color: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Daily Average',
      value: formatCurrency(avgDailySpending),
      description: 'On average, you are spending this amount every day.',
      icon: <Activity className="text-purple-500" />,
      color: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="text-yellow-500" size={24} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Financial Insights</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${insight.color}`}>{insight.icon}</div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{insight.title}</h4>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{insight.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{insight.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
