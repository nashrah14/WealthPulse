import { motion } from "framer-motion";

export default function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-[28px] shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        <div className="w-14 h-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>

      <div className="space-y-2">
        <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      <div className="w-40 h-3 bg-gray-200 dark:bg-gray-700 rounded mt-4" />
    </motion.div>
  );
}