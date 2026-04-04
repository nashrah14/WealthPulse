import { useStore } from "../store/useStore";
import { formatCurrency } from "../lib/utils";
import { Target } from "lucide-react";
export default function Goals() {
  const { goals } = useStore();
  if (!goals || goals.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Goals
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          No goals created yet. Create your first financial goal.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {goals.map((goal) => (
        <div
          key={goal.name}
          className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center gap-3 mb-3">
            <Target className="text-blue-500" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {goal.name}
            </h3>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Target: {formatCurrency(goal.targetAmount)}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Deadline: {goal.deadline}
          </p>
        </div>
      ))}
    </div>
  );
}
