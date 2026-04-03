import { User, ShieldCheck } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function RoleSwitcher() {
  const { role, setRole } = useStore();

  return (
    <div className="relative inline-block text-left">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as 'Admin' | 'Viewer')}
        className="block w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="Admin">Admin</option>
        <option value="Viewer">Viewer</option>
      </select>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {role === 'Admin' ? (
          <ShieldCheck size={18} className="text-blue-500" />
        ) : (
          <User size={18} className="text-gray-500" />
        )}
      </div>
    </div>
  );
}
