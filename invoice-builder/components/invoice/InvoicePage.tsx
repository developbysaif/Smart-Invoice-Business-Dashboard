'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import ContactModal, { emptyContact } from './ContactModal';
import CustomFieldModal from './CustomFieldModal';
import { ContactInfo, InvoiceItem, CustomField } from '@/types';

const TEMPLATES = [
  'Developer Template', 'Web Development Template', 'Marketing Template',
  'Travel Agency Template', 'Consulting Agency Template', 'Designer & Creative Agency Template',
  'Training, Tutoring & Education Organization Template', 'Copy Writing & Content Template',
  'IT Service Template', 'Video Production Template', 'Audio Production Template',
  'Analyst Template', 'Virtual Assistance Template', 'Data Specialist Template',
  'Photography & Filming Template', 'United Kingdom Template',
];

const CURRENCIES: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: '$',  rate: 1 },
  PKR: { symbol: '₨', rate: 278.5 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
};

type OptionalSection = 'company' | 'client' | 'description' | 'payment';

export default function InvoicePage() {
  const { goTo } = useAuth();

  // Invoice meta
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [invoiceNo, setInvoiceNo] = useState('0004');
  const [issueDate, setIssueDate] = useState('2025-10-06');
  const [dueDate, setDueDate] = useState('2025-11-06');
  const [terms, setTerms] = useState('');
  const [currency, setCurrency] = useState('USD');

  // Logo
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Sender / Receiver
  const [sender, setSender] = useState<ContactInfo>(emptyContact);
  const [receiver, setReceiver] = useState<ContactInfo>(emptyContact);
  const [modalOpen, setModalOpen] = useState<'sender' | 'receiver' | null>(null);

  // Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: crypto.randomUUID(), description: '', qty: 1, price: 0 },
  ]);

  // Custom fields
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Optional sections
  const [sections, setSections] = useState<Record<OptionalSection, boolean>>({
    company: false, client: false, description: false, payment: false,
  });
  const [companyName, setCompanyName] = useState('');
  const [companyReg, setCompanyReg] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [clientType, setClientType] = useState('Individual');
  const [clientIndustry, setClientIndustry] = useState('');
  const [clientSince, setClientSince] = useState('');
  const [description, setDescription] = useState('');
  const [payments, setPayments] = useState<Record<string, boolean>>({
    jazzCash: false, easyPaisa: false, payoneer: false, bankTransfer: false, cash: false,
  });

  const fmt = useCallback(
    (amount: number) => {
      const c = CURRENCIES[currency];
      return `${c.symbol}${(amount * c.rate).toFixed(2)}`;
    },
    [currency],
  );

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  // Logo
  const handleLogoFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => setLogoSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  // Items
  const addItem = () =>
    setItems(prev => [...prev, { id: crypto.randomUUID(), description: '', qty: 1, price: 0 }]);
  const updateItem = (id: string, field: keyof InvoiceItem, val: string | number) =>
    setItems(prev => prev.map(i => (i.id === id ? { ...i, [field]: val } : i)));
  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  // Reset
  const resetInvoice = () => {
    if (!confirm('Are you sure you want to delete this invoice? All data will be lost.')) return;
    setInvoiceNo('0001');
    setIssueDate('');
    setDueDate('');
    setTerms('');
    setSender(emptyContact);
    setReceiver(emptyContact);
    setLogoSrc(null);
    setItems([{ id: crypto.randomUUID(), description: '', qty: 1, price: 0 }]);
    setCustomFields([]);
    setSections({ company: false, client: false, description: false, payment: false });
    alert('Invoice deleted successfully!');
  };

  // PDF download
  const downloadPdf = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const el = document.getElementById('invoice-content');
    if (!el) return;
    html2pdf()
      .set({
        margin: 10,
        filename: `invoice_${invoiceNo}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(el)
      .save();
  };

  const saveInvoice = () => alert('Invoice saved successfully!');

  const contactLabel = (c: ContactInfo) =>
    c.company || 'Name';
  const contactDetails = (c: ContactInfo) =>
    [c.email, c.phone, c.address1, c.city, c.country].filter(Boolean).join(', ') || 'Contact details';

  const inputCls =
    'border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-accent transition-all';
  const actionBtnCls =
    'w-full border border-accent text-accent hover:bg-green-50 dark:hover:bg-gray-700 rounded-md py-2 text-sm transition-all hover-lift';

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Left sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between flex-shrink-0">
        <div>
          <div className="px-6 py-4 border-b border-gray-700 text-lg font-semibold">Dashboard</div>
          <nav className="px-4 py-6 space-y-4 text-sm">
            <a href="#" className="flex items-center gap-2 hover:text-accent transition-colors">
              <i className="fas fa-globe w-5" /> International payments
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-accent transition-colors">
              <i className="fas fa-envelope w-5" /> Contact us
            </a>
          </nav>
        </div>
        <div className="px-6 py-4 border-t border-gray-700 text-sm text-gray-400">
          <button
            onClick={() => goTo('dashboard')}
            className="flex items-center gap-2 hover:text-accent transition-colors"
          >
            <i className="fas fa-arrow-left" /> Back to Dashboard
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto">
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-5xl mx-auto p-6"
          id="invoice-content"
        >
          {/* Header row */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <select
              value={template}
              onChange={e => setTemplate(e.target.value)}
              className={inputCls}
            >
              {TEMPLATES.map(t => <option key={t}>{t}</option>)}
            </select>

            <div className="flex flex-col gap-2 text-sm">
              {[
                { label: 'Invoice #', value: invoiceNo, set: setInvoiceNo, type: 'text', w: 'w-20' },
                { label: 'Issue date', value: issueDate, set: setIssueDate, type: 'date', w: 'w-36' },
                { label: 'Due date',   value: dueDate,   set: setDueDate,   type: 'date', w: 'w-36' },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-2">
                  <label className="font-medium text-gray-600 dark:text-gray-300 w-20">{f.label}</label>
                  <input
                    type={f.type}
                    value={f.value}
                    onChange={e => f.set(e.target.value)}
                    className={`${inputCls} ${f.w} text-center`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Logo upload */}
          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) handleLogoFile(file);
            }}
            onClick={() => fileRef.current?.click()}
            className={`flex justify-between items-center border-2 border-dashed border-accent rounded-md p-4 mb-6 cursor-pointer transition-all hover-lift ${
              isDragging ? 'bg-green-100' : 'hover:bg-green-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center gap-2 text-accent">
              <i className="fas fa-upload" />
              <span>{logoSrc ? 'Logo uploaded — click to change' : 'Choose logo or drop it here'}</span>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => { if (e.target.files?.[0]) handleLogoFile(e.target.files[0]); }}
            />
            {logoSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoSrc} alt="Logo" className="logo-preview" />
            )}
          </div>

          {/* Sender / Receiver */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {(['sender', 'receiver'] as const).map(type => {
              const info = type === 'sender' ? sender : receiver;
              return (
                <div
                  key={type}
                  onClick={() => setModalOpen(type)}
                  className="border-2 border-accent rounded-lg p-4 relative hover-lift cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                      {type === 'sender' ? 'From' : 'To'}
                    </h3>
                    <button
                      onClick={e => { e.stopPropagation(); setModalOpen(type); }}
                      className="text-accent text-sm hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{contactLabel(info)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{contactDetails(info)}</p>
                </div>
              );
            })}
          </div>

          {/* Optional: Company Info */}
          {sections.company && (
            <div className="border border-accent rounded p-4 mb-4 form-animation bg-white dark:bg-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Company Information</h3>
                <button onClick={() => setSections(s => ({ ...s, company: false }))} className="text-red-500 text-sm">&times;</button>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Company Name', val: companyName, set: setCompanyName },
                  { label: 'Registration Number', val: companyReg, set: setCompanyReg },
                  { label: 'Industry', val: companyIndustry, set: setCompanyIndustry },
                ].map(f => (
                  <div key={f.label}>
                    <label className="font-medium text-gray-700 dark:text-gray-300 text-sm block">{f.label}</label>
                    <input
                      type="text"
                      value={f.val}
                      onChange={e => f.set(e.target.value)}
                      className="border border-accent rounded w-full px-2 py-1.5 mt-1 text-sm bg-white dark:bg-gray-600 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optional: Client Info */}
          {sections.client && (
            <div className="border border-accent rounded p-4 mb-4 form-animation bg-white dark:bg-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Client Information</h3>
                <button onClick={() => setSections(s => ({ ...s, client: false }))} className="text-red-500 text-sm">&times;</button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="font-medium text-gray-700 dark:text-gray-300 text-sm block">Client Type</label>
                  <select
                    value={clientType}
                    onChange={e => setClientType(e.target.value)}
                    className="border border-accent rounded w-full px-2 py-1.5 mt-1 text-sm bg-white dark:bg-gray-600 dark:text-white"
                  >
                    {['Individual', 'Business', 'Organization'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-medium text-gray-700 dark:text-gray-300 text-sm block">Industry</label>
                  <input type="text" value={clientIndustry} onChange={e => setClientIndustry(e.target.value)}
                    className="border border-accent rounded w-full px-2 py-1.5 mt-1 text-sm bg-white dark:bg-gray-600 dark:text-white" />
                </div>
                <div>
                  <label className="font-medium text-gray-700 dark:text-gray-300 text-sm block">Client Since</label>
                  <input type="date" value={clientSince} onChange={e => setClientSince(e.target.value)}
                    className="border border-accent rounded w-full px-2 py-1.5 mt-1 text-sm bg-white dark:bg-gray-600 dark:text-white" />
                </div>
              </div>
            </div>
          )}

          {/* Optional: Description */}
          {sections.description && (
            <div className="border border-accent rounded p-4 mb-4 form-animation bg-white dark:bg-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Description</h3>
                <button onClick={() => setSections(s => ({ ...s, description: false }))} className="text-red-500 text-sm">&times;</button>
              </div>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="Enter detailed description"
                className="border border-accent rounded w-full px-2 py-1.5 mt-1 text-sm bg-white dark:bg-gray-600 dark:text-white"
              />
            </div>
          )}

          {/* Optional: Payment */}
          {sections.payment && (
            <div className="border border-accent rounded p-4 mb-4 form-animation bg-white dark:bg-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Payment Methods</h3>
                <button onClick={() => setSections(s => ({ ...s, payment: false }))} className="text-red-500 text-sm">&times;</button>
              </div>
              <div className="space-y-2">
                {[
                  { id: 'jazzCash', label: 'JazzCash' },
                  { id: 'easyPaisa', label: 'Easy Paisa' },
                  { id: 'payoneer', label: 'Payoneer' },
                  { id: 'bankTransfer', label: 'Bank Transfer' },
                  { id: 'cash', label: 'Cash' },
                ].map(p => (
                  <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={payments[p.id] || false}
                      onChange={e => setPayments(prev => ({ ...prev, [p.id]: e.target.checked }))}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Custom fields */}
          {customFields.map(cf => (
            <div key={cf.id} className="border border-accent rounded p-4 mb-3 form-animation bg-white dark:bg-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">{cf.name}</h3>
                <button
                  onClick={() => setCustomFields(prev => prev.filter(f => f.id !== cf.id))}
                  className="text-red-500 text-sm"
                >
                  &times;
                </button>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{cf.value || 'No value set'}</p>
            </div>
          ))}

          {/* Add item button */}
          <div
            onClick={addItem}
            className="border-2 border-dashed border-accent rounded-md py-3 text-center mb-4 cursor-pointer hover:bg-green-50 dark:hover:bg-gray-700 transition-all hover-lift"
          >
            <span className="text-accent font-medium">+ Add new invoice item</span>
          </div>

          {/* Items table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 dark:border-gray-600 text-sm" id="invoiceTable">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  {['Item', 'Qty', 'Price', 'Total', ''].map(h => (
                    <th
                      key={h}
                      className={`p-2 border-b dark:border-gray-600 text-accent ${h === 'Item' ? 'text-left' : 'text-right'}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="form-animation">
                    <td className="p-2 border-b dark:border-gray-600">
                      <input
                        type="text"
                        value={item.description}
                        onChange={e => updateItem(item.id, 'description', e.target.value)}
                        placeholder="Item description"
                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-sm focus:ring-1 focus:ring-accent"
                      />
                    </td>
                    <td className="p-2 border-b dark:border-gray-600">
                      <input
                        type="number"
                        value={item.qty}
                        min={0}
                        onChange={e => updateItem(item.id, 'qty', parseFloat(e.target.value) || 0)}
                        className="w-16 text-right border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-sm focus:ring-1 focus:ring-accent"
                      />
                    </td>
                    <td className="p-2 border-b dark:border-gray-600">
                      <input
                        type="number"
                        value={item.price}
                        min={0}
                        step={0.01}
                        onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                        className="w-24 text-right border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1 text-sm focus:ring-1 focus:ring-accent"
                      />
                    </td>
                    <td className="p-2 border-b dark:border-gray-600 text-right text-gray-700 dark:text-gray-300">
                      {fmt(item.qty * item.price)}
                    </td>
                    <td className="p-2 border-b dark:border-gray-600 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-6 flex justify-end">
            <div className="w-64">
              {[
                { label: 'Subtotal', val: fmt(subtotal) },
                { label: 'Tax (5%)',  val: fmt(tax) },
              ].map(r => (
                <div key={r.label} className="flex justify-between text-sm mt-1">
                  <span className="text-gray-700 dark:text-gray-300">{r.label}</span>
                  <span className="text-gray-700 dark:text-gray-300">{r.val}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold text-gray-800 dark:text-white mt-2 border-t dark:border-gray-600 pt-2">
                <span>Total</span>
                <span className="text-accent">{fmt(total)}</span>
              </div>
              <div className="mt-2">
                <label className="text-xs text-gray-600 dark:text-gray-400">Currency:</label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-2 py-1 text-xs w-full mt-1 focus:ring-1 focus:ring-accent"
                >
                  <option value="USD">USD ($)</option>
                  <option value="PKR">PKR (₨)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Invoice terms</label>
            <textarea
              value={terms}
              onChange={e => setTerms(e.target.value)}
              rows={2}
              placeholder="Enter terms..."
              className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md mt-1 p-2 text-sm focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>
      </main>

      {/* Right action panel */}
      <aside className="w-56 bg-white dark:bg-gray-800 shadow-inner p-4 space-y-3 flex-shrink-0">
        <button onClick={() => setShowCustomModal(true)} className={actionBtnCls}>Add custom field</button>
        <button onClick={() => setSections(s => ({ ...s, company: true }))} className={actionBtnCls}>Add company info</button>
        <button onClick={() => setSections(s => ({ ...s, client: true }))}  className={actionBtnCls}>Add client info</button>
        <button onClick={() => setSections(s => ({ ...s, description: true }))} className={actionBtnCls}>Add description</button>
        <button onClick={() => setSections(s => ({ ...s, payment: true }))} className={actionBtnCls}>Add payment</button>
        <hr className="my-3 dark:border-gray-600" />
        <button onClick={resetInvoice} className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md py-2 text-sm transition-all hover-lift">
          Delete invoice
        </button>
        <button onClick={downloadPdf} className="w-full bg-accent hover:bg-green-600 text-white rounded-md py-2 text-sm transition-all hover-lift">
          Download PDF
        </button>
        <button onClick={saveInvoice} className="w-full bg-accent hover:bg-green-600 text-white rounded-md py-2 text-sm transition-all hover-lift">
          Save
        </button>
      </aside>

      {/* Modals */}
      {modalOpen && (
        <ContactModal
          title={modalOpen === 'sender' ? 'Set Sender Data' : 'Set Receiver Data'}
          initial={modalOpen === 'sender' ? sender : receiver}
          onSave={info => (modalOpen === 'sender' ? setSender : setReceiver)(info)}
          onClose={() => setModalOpen(null)}
        />
      )}
      {showCustomModal && (
        <CustomFieldModal
          onAdd={field => setCustomFields(prev => [...prev, { ...field, id: crypto.randomUUID() }])}
          onClose={() => setShowCustomModal(false)}
        />
      )}
    </div>
  );
}
