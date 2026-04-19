'use client';
import { useState, useEffect } from 'react';
import { Invoice, Client, Expense } from '@/types';

export function useStore() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedInvoices = localStorage.getItem('ib_invoices');
    const savedClients = localStorage.getItem('ib_clients');
    const savedExpenses = localStorage.getItem('ib_expenses');

    if (savedInvoices) setInvoices(JSON.parse(savedInvoices));
    if (savedClients) setClients(JSON.parse(savedClients));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    
    setIsLoaded(true);
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addInvoice = (invoice: Invoice) => {
    const newInvoices = [...invoices, invoice];
    setInvoices(newInvoices);
    saveToStorage('ib_invoices', newInvoices);
  };

  const updateInvoice = (updatedInvoice: Invoice) => {
    const newInvoices = invoices.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv);
    setInvoices(newInvoices);
    saveToStorage('ib_invoices', newInvoices);
  };

  const deleteInvoice = (id: string) => {
    const newInvoices = invoices.filter(inv => inv.id !== id);
    setInvoices(newInvoices);
    saveToStorage('ib_invoices', newInvoices);
  };

  const addClient = (client: Client) => {
    const newClients = [...clients, client];
    setClients(newClients);
    saveToStorage('ib_clients', newClients);
  };

  const updateClient = (updatedClient: Client) => {
    const newClients = clients.map(c => c.id === updatedClient.id ? updatedClient : c);
    setClients(newClients);
    saveToStorage('ib_clients', newClients);
  };

  const deleteClient = (id: string) => {
    const newClients = clients.filter(c => c.id !== id);
    setClients(newClients);
    saveToStorage('ib_clients', newClients);
  };

  const addExpense = (expense: Expense) => {
    const newExpenses = [...expenses, expense];
    setExpenses(newExpenses);
    saveToStorage('ib_expenses', newExpenses);
  };

  const deleteExpense = (id: string) => {
    const newExpenses = expenses.filter(e => e.id !== id);
    setExpenses(newExpenses);
    saveToStorage('ib_expenses', newExpenses);
  };

  return {
    invoices,
    clients,
    expenses,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    addClient,
    updateClient,
    deleteClient,
    addExpense,
    deleteExpense,
    isLoaded
  };
}
