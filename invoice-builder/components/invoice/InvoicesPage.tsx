'use client';
import { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { useStore } from '@/lib/useStore';
import { useAuth } from '@/lib/AuthContext';
import { downloadInvoicePDF } from '@/lib/utils';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  ChevronRight,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Invoice } from '@/types';

export default function InvoicesPage() {
  const { invoices, deleteInvoice } = useStore();
  const { goTo } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inv.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400';
      case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
      case 'overdue': return 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'paid': return <CheckCircle size={14} />;
      case 'pending': return <Clock size={14} />;
      case 'overdue': return <AlertCircle size={14} />;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Invoices</h1>
            <p className="text-slate-500 dark:text-slate-400">View and manage all your billings.</p>
          </div>
          <button onClick={() => goTo('invoice-create')} className="btn-primary">
            <Plus size={18} />
            New Invoice
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by invoice number or client..." 
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'paid', 'pending', 'overdue'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200 ${
                  statusFilter === status 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredInvoices.map((inv) => (
            <div key={inv.id} className="card p-6 card-hover flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-indigo-600">
                  <FileText size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg">{inv.invoiceNumber}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider ${getStatusStyle(inv.status)}`}>
                      {getStatusIcon(inv.status)}
                      {inv.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="font-medium text-slate-900 dark:text-slate-100">{inv.clientName}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>Issued {inv.issueDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto">
                <div className="text-right">
                  <p className="text-2xl font-bold">${inv.total.toLocaleString()}</p>
                  <p className="text-xs text-slate-400 font-medium">Due {inv.dueDate || 'N/A'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => downloadInvoicePDF(inv.id)}
                    className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <Download size={20} />
                  </button>
                  <button 
                    onClick={() => deleteInvoice(inv.id)}
                    className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-600 dark:text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredInvoices.length === 0 && (
            <div className="py-20 text-center card bg-dashed border-2 bg-transparent text-slate-400">
              <FileText size={48} className="mx-auto mb-4 opacity-20" />
              <p>No invoices found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
