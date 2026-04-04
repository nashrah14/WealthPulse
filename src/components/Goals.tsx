import { useStore } from "../store/useStore";
import { formatCurrency } from "../lib/utils";
import { Target, Calendar } from "lucide-react";
import { motion } from "motion/react";
export default function Goals() {
  const { goals } = useStore();
  if (!goals || goals.length === 0) {
    return (
      <div className="p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Financial Goals
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          No goals created yet. Start by setting your first financial goal.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Financial Goals
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id || goal.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              y: -5,
              scale: 1.01
            }}
            className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <Target className="text-blue-600" size={18} />
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {goal.name}
                </h3>
              </div>
            </div>

            {/* Amount */}
            <div className="mb-4">
              <p className="text-xs text-gray-400 uppercase font-semibold">
                Target Amount
              </p>

              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(goal.targetAmount)}
              </p>
            </div>

            {/* Progress Bar*/}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span>0%</span>
              </div>

              <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[5%] rounded-full" />
              </div>
            </div>

            {/* Deadline */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar size={14} />
              Deadline: {goal.deadline}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
