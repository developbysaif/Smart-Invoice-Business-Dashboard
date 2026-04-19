'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { useStore } from '@/lib/useStore';
import { useAuth } from '@/lib/AuthContext';
import { Plus, Trash2, Save, ArrowLeft, User, Calendar, Receipt } from 'lucide-react';
import { InvoiceItem, Invoice } from '@/types';

export default function InvoiceCreatePage() {
  const { clients, addInvoice } = useStore();
  const { goTo } = useAuth();

  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now().toString().slice(-6)}`);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', qty: 1, price: 0 }
  ]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(36).substr(2, 9), description: '', qty: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const taxAmount = (subtotal * tax) / 100;
  const total = subtotal + taxAmount - discount;

  const handleCreate = () => {
    if (!selectedClientId) {
      alert('Please select a client');
      return;
    }
    const client = clients.find(c => c.id === selectedClientId);
    
    const newInvoice: Invoice = {
      id: Math.random().toString(36).substr(2, 9),
      invoiceNumber,
      clientId: selectedClientId,
      clientName: client?.name || 'Unknown',
      issueDate,
      dueDate,
      items,
      tax,
      discount,
      total,
      status: 'pending'
    };

    addInvoice(newInvoice);
    goTo('invoices');
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <button onClick={() => goTo('invoices')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold">New Invoice</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-8">
              <div className="flex justify-between items-start mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-gradient flex items-center justify-center text-white font-bold text-xl">
                    A
                  </div>
                  <div>
                    <h2 className="font-bold text-lg leading-none mb-1">Antigravity Inc.</h2>
                    <p className="text-sm text-slate-400">billing@antigravity.io</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Invoice Number</span>
                  <input 
                    className="text-right font-bold text-xl bg-transparent outline-none border-b border-transparent focus:border-indigo-500"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 text-xs font-bold text-slate-400 uppercase px-4">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2">Qty</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-center group">
                    <div className="col-span-6">
                      <input 
                        className="input-field" 
                        placeholder="Service/Product name"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <input 
                        type="number"
                        className="input-field" 
                        value={item.qty}
                        onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-2">
                      <input 
                        type="number"
                        className="input-field" 
                        value={item.price}
                        onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-3">
                      <span className="font-bold">${(item.qty * item.price).toFixed(2)}</span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={addItem}
                  className="flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:text-indigo-700 mt-4"
                >
                  <Plus size={16} />
                  Add New Item
                </button>
              </div>

              {/* Summary */}
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <div className="w-full max-w-xs space-y-3">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-2">Tax (%)</span>
                    <input 
                      type="number"
                      className="w-16 bg-slate-50 dark:bg-slate-800 border-none text-right rounded-lg px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
                      value={tax}
                      onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                    <span>Discount ($)</span>
                    <input 
                      type="number"
                      className="w-20 bg-slate-50 dark:bg-slate-800 border-none text-right rounded-lg px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="flex justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-indigo-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <User size={18} className="text-indigo-600" />
                Select Client
              </h3>
              <select 
                className="input-field mb-4"
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
              >
                <option value="">Choose a client...</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {selectedClientId && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2 text-sm">
                  <p className="font-semibold">{clients.find(c => c.id === selectedClientId)?.name}</p>
                  <p className="text-slate-500 dark:text-slate-400">{clients.find(c => c.id === selectedClientId)?.email}</p>
                  <p className="text-slate-500 dark:text-slate-400">{clients.find(c => c.id === selectedClientId)?.address}</p>
                </div>
              )}
              {clients.length === 0 && (
                <button 
                  onClick={() => goTo('clients')}
                  className="w-full btn-secondary text-sm"
                >
                  Create New Client First
                </button>
              )}
            </div>

            <div className="card p-6">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Calendar size={18} className="text-indigo-600" />
                Dating & Status
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ">Issue Date</label>
                  <input 
                    type="date"
                    className="input-field"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ">Due Date</label>
                  <input 
                    type="date"
                    className="input-field"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleCreate}
              className="btn-primary w-full py-4 text-lg shadow-xl shadow-indigo-500/20"
            >
              <Save size={20} />
              Save Invoice
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
