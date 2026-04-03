import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function FinancialHealth() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
        Financial Health Score
      </h3>

      <div className="flex items-center gap-6">
        <div className="text-4xl font-black text-green-500">
          82
        </div>

        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            Good Financial Health
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your savings rate is above average
          </p>
        </div>
      </div>

      <div className="mt-5 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "82%" }}
          transition={{ duration: 1 }}
          className="h-full bg-green-500 rounded-full"
        />
      </div>

      <div className="flex items-center gap-2 mt-3 text-green-500 text-sm font-medium">
        <TrendingUp size={16} />
        Improving this month
      </div>
    </motion.div>
  );
}