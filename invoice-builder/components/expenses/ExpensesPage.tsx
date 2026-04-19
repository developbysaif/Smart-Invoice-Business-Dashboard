'use client';
import { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { useStore } from '@/lib/useStore';
import { Plus, Trash2, Tag, Calendar, DollarSign, PieChart as PieChartIcon } from 'lucide-react';
import { Expense } from '@/types';

export default function ExpensesPage() {
  const { expenses, addExpense, deleteExpense } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Tools',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ['Rent', 'Tools', 'Marketing', 'Hosting', 'Subscriptions', 'Meals', 'Travel', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date
    });
    setFormData({ title: '', amount: '', category: 'Tools', date: new Date().toISOString().split('T')[0] });
    setIsModalOpen(false);
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Expenses</h1>
            <p className="text-slate-500 dark:text-slate-400">Track your business spending and categories.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            <Plus size={18} />
            Add Expense
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="card p-6 bg-indigo-600 text-white border-none shadow-xl shadow-indigo-500/20">
              <h3 className="text-indigo-100 text-sm font-medium mb-1">Total Expenses</h3>
              <p className="text-3xl font-bold">${totalExpense.toLocaleString()}</p>
              <div className="mt-4 pt-4 border-t border-indigo-500 flex items-center gap-2 text-sm text-indigo-100">
                <PieChartIcon size={16} />
                Tracking {expenses.length} items
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-bold mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map(cat => {
                  const count = expenses.filter(e => e.category === cat).length;
                  const amount = expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
                  if (count === 0) return null;
                  return (
                    <div key={cat} className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 dark:text-slate-400">{cat}</span>
                      <span className="font-semibold">${amount.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="card overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Expense</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold text-right">Amount</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                      <td className="px-6 py-4 font-medium">{exp.title}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">
                          {exp.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">{exp.date}</td>
                      <td className="px-6 py-4 font-bold text-right text-rose-600">-${exp.amount}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => deleteExpense(exp.id)}
                          className="p-2 text-slate-400 hover:text-rose-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {expenses.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center text-slate-400">
                        No expenses recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm modal-animation">
            <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold mb-6">Add Expense</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 ">Title</label>
                  <input 
                    required
                    type="text" 
                    className="input-field" 
                    placeholder="SaaS Subscription"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 ">Amount</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        required
                        type="number" 
                        step="0.01"
                        className="input-field pl-10" 
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 ">Category</label>
                    <select 
                      className="input-field"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 ">Date</label>
                  <input 
                    required
                    type="date" 
                    className="input-field" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
                  <button type="submit" className="btn-primary flex-1">Save Expense</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
