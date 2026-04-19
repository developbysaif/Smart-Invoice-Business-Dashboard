export interface ContactInfo {
  company: string;
  tax: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  postal: string;
  city: string;
  country: string;
  phoneCode: string;
  phone: string;
  email: string;
  website: string;
}

export interface InvoiceItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'textarea';
  value: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  tax: number;
  discount: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue';
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export type AppView = 'home' | 'login' | 'signup' | 'dashboard' | 'invoices' | 'invoice-create' | 'clients' | 'expenses' | 'analytics' | 'reports';
