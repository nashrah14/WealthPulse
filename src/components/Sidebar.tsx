import { LayoutDashboard, PieChart as AnalyticsIcon, Receipt, Target, Settings, LogOut, Zap, X } from 'lucide-react';
import { cn } from '../lib/utils';

const menuItems = [
  { icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true },
  { icon: <AnalyticsIcon size={18} />, label: 'Analytics', active: false },
  { icon: <Receipt size={18} />, label: 'Transactions', active: false },
  { icon: <Target size={18} />, label: 'Goals', active: false },
  { icon: <Settings size={18} />, label: 'Settings', active: false },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile & Desktop Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-transform duration-300 z-50 w-72",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
          
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">

                {/* Updated Logo */}
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-md p-1">
                <img src="/logo.png"
                     alt="WealthPulse"
                     className="w-full h-full object-contain"
                    />
                </div>

                <span className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                  WealthPulse
                </span>
              </div>

              <span className="text-[9px] font-bold text-blue-600 tracking-[0.2em] uppercase ml-1">
                Track • Analyze • Prosper
              </span>
            </div>

            <button 
              onClick={onClose}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all group",
                  item.active 
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                    : "text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100"
                )}
              >
                <div className={cn(
                  "transition-transform group-hover:scale-110",
                  item.active ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                )}>
                  {item.icon}
                </div>
                <span className="font-semibold text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Upgrade Card */}
          <div className="mt-auto p-5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-[24px] relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white mb-3">
                <Zap size={16} fill="currentColor" />
              </div>
              <h4 className="text-white font-bold text-xs mb-1">WealthPulse Pro</h4>
              <p className="text-blue-100 text-[10px] leading-relaxed mb-3">Unlock advanced wealth tracking & AI insights</p>
              <button className="w-full py-2 bg-white text-blue-600 text-[10px] font-bold rounded-lg hover:bg-blue-50 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Logout */}
          <button className="mt-4 flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
            <LogOut size={18} />
            <span className="font-semibold text-sm">Logout</span>
          </button>

        </div>
      </aside>
    </>
  );
}