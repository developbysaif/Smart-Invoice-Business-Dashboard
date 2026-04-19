'use client';
import { useState, useEffect } from 'react';
import { ContactInfo } from '@/types';

const PHONE_CODES = ['+92', '+1', '+971', '+93', '+44', '+61', '+49'];
const COUNTRIES = [
  { value: 'PK', label: 'Pakistan' },
  { value: 'US', label: 'United States' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'AF', label: 'Afghanistan' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
];

const EMPTY: ContactInfo = {
  company: '', tax: '', firstName: '', lastName: '',
  address1: '', address2: '', postal: '', city: '',
  country: '', phoneCode: '+92', phone: '', email: '', website: '',
};

interface Props {
  title: string;
  initial: ContactInfo;
  onSave: (info: ContactInfo) => void;
  onClose: () => void;
}

export default function ContactModal({ title, initial, onSave, onClose }: Props) {
  const [form, setForm] = useState<ContactInfo>({ ...EMPTY, ...initial });

  const set = (field: keyof ContactInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }));

  const inputCls =
    'border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md w-full px-2 py-1.5 mt-1 focus:ring-1 focus:ring-accent text-sm transition-all';
  const labelCls = 'font-medium text-gray-700 dark:text-gray-300 text-xs block';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-lg shadow-lg p-5 relative modal-animation max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl transition-colors"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4 form-animation text-gray-900 dark:text-white">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm form-animation">
          <div className="md:col-span-2">
            <label className={labelCls}>Company / Sender name <span className="text-accent">*</span></label>
            <input type="text" value={form.company} onChange={set('company')} className={inputCls} required />
          </div>

          <div className="md:col-span-2">
            <label className={labelCls}>Tax Registration Number</label>
            <input type="text" value={form.tax} onChange={set('tax')} className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>First name</label>
            <input type="text" value={form.firstName} onChange={set('firstName')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Last name</label>
            <input type="text" value={form.lastName} onChange={set('lastName')} className={inputCls} />
          </div>

          <div className="md:col-span-2">
            <label className={labelCls}>Address line 1</label>
            <input type="text" value={form.address1} onChange={set('address1')} className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Address line 2</label>
            <input type="text" value={form.address2} onChange={set('address2')} className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Postal code</label>
            <input type="text" value={form.postal} onChange={set('postal')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>City</label>
            <input type="text" value={form.city} onChange={set('city')} className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Country</label>
            <select value={form.country} onChange={set('country')} className={inputCls}>
              <option value="">-</option>
              {COUNTRIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Phone number</label>
            <div className="flex mt-1 gap-1">
              <select
                value={form.phoneCode}
                onChange={set('phoneCode')}
                className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-2 py-1.5 w-20 text-xs focus:ring-1 focus:ring-accent"
              >
                {PHONE_CODES.map(c => <option key={c}>{c}</option>)}
              </select>
              <input
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="70 123 4567"
                className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md flex-1 px-2 py-1.5 text-sm focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Email</label>
            <input type="email" value={form.email} onChange={set('email')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Web site</label>
            <input type="url" value={form.website} onChange={set('website')} className={inputCls} />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="border border-gray-400 dark:border-gray-600 dark:text-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => { onSave(form); onClose(); }}
            className="bg-accent text-white rounded-md px-4 py-2 text-sm hover:bg-green-600 transition-all"
          >
            ✔ Save
          </button>
        </div>
      </div>
    </div>
  );
}

export { EMPTY as emptyContact };
