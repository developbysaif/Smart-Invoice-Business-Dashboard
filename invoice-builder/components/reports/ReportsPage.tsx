'use client';
import { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { useStore } from '@/lib/useStore';
import { FileText, Download, Filter, Printer, Calendar } from 'lucide-react';

export default function ReportsPage() {
  const { invoices, expenses } = useStore();
  const [dateRange, setDateRange] = useState('This Month');

  const totalIncome = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const taxesCollected = invoices.reduce((sum, inv) => sum + (inv.total * (inv.tax / 100)), 0);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Financial Reports</h1>
            <p className="text-slate-500 dark:text-slate-400">Monthly and yearly financial summaries.</p>
          </div>
          <div className="flex gap-3">
             <button className="btn-secondary">
              <Printer size={18} />
              Print
            </button>
            <button className="btn-primary">
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Filter size={18} className="text-slate-400" />
          <div className="flex gap-2">
            {['This Month', 'Last Month', 'This Quarter', 'This Year'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  dateRange === range 
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Report Content */}
        <div className="card p-12 bg-white dark:bg-slate-900 border shadow-2xl">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-gradient flex items-center justify-center text-white font-bold text-xl">A</div>
                <h2 className="text-2xl font-bold">Financial Summary</h2>
              </div>
              <p className="text-slate-500">Period: {dateRange} (April 2026)</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold uppercase text-slate-400">Generated On</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-6 border-b pb-2">Income Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Invoiced</span>
                  <span className="font-bold">${totalIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Taxes Collected</span>
                  <span className="font-bold">${taxesCollected.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Other Income</span>
                  <span className="font-bold">$0.00</span>
                </div>
                <div className="flex justify-between pt-4 border-t text-xl font-bold text-indigo-600">
                  <span>Gross Income</span>
                  <span>${totalIncome.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 border-b pb-2">Expense Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Operating Expenses</span>
                  <span className="font-bold">${totalExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tax Payments</span>
                  <span className="font-bold">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Marketing</span>
                  <span className="font-bold">$0.00</span>
                </div>
                <div className="flex justify-between pt-4 border-t text-xl font-bold text-rose-500">
                  <span>Total Expenses</span>
                  <span>${totalExpenses.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-slate-950 rounded-2xl flex flex-col items-center">
            <p className="text-slate-500 mb-2 font-medium">Net Profit for {dateRange}</p>
            <p className={`text-5xl font-black ${totalIncome - totalExpenses >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              ${(totalIncome - totalExpenses).toLocaleString()}
            </p>
          </div>

          <div className="mt-12 pt-12 border-t border-dashed border-slate-200 dark:border-slate-800 text-center text-slate-400 text-sm">
            <p>This is a computer-generated report and does not require a signature.</p>
            <p className="mt-2">Antigravity SaaS Platform - Financial Intelligence</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
