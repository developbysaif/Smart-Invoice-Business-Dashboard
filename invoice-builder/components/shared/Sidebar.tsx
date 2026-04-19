'use client';
import { useAuth } from '@/lib/AuthContext';
import { AppView } from '@/types';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Receipt, 
  BarChart3, 
  PieChart, 
  LogOut, 
  Moon, 
  Sun,
  Plus
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const { view, goTo, logout, darkMode, toggleDark } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: PieChart },
  ];

  return (
    <aside className="w-64 glass border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary-gradient flex items-center justify-center text-white font-bold text-xl shadow-lg">
            A
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-primary-gradient">Antigravity</span>
        </div>

        <button 
          onClick={() => goTo('invoice-create')}
          className="btn-primary w-full mb-8 shadow-indigo-500/20 shadow-lg"
        >
          <Plus size={18} />
          Create Invoice
        </button>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id as AppView)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                view === item.id 
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
              )}
            >
              <item.icon size={20} className={cn(
                "transition-colors",
                view === item.id ? "text-indigo-600 dark:text-indigo-400" : "group-hover:text-slate-900 dark:group-hover:text-slate-100"
              )} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-2">
        <button
          onClick={toggleDark}
          className="w-full btn-secondary justify-start"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{darkMode ? 'Light' : 'Dark'} Mode</span>
        </button>
        <button
          onClick={() => {
            if (confirm('Logout?')) logout();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
