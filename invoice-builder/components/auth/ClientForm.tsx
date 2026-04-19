'use client';
import { useState } from 'react';

const COUNTRIES = [
  { value: 'pk', code: '+92', flag: '🇵🇰', label: 'Pakistan' },
  { value: 'us', code: '+1',  flag: '🇺🇸', label: 'United States' },
  { value: 'ae', code: '+971', flag: '🇦🇪', label: 'United Arab Emirates' },
  { value: 'af', code: '+93', flag: '🇦🇫', label: 'Afghanistan' },
  { value: 'uk', code: '+44', flag: '🇬🇧', label: 'United Kingdom' },
];

interface FormData {
  company: string;
  tax: string;
  first: string;
  last: string;
  addr1: string;
  addr2: string;
  postal: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
}

const empty: FormData = {
  company: '', tax: '', first: '', last: '',
  addr1: '', addr2: '', postal: '', city: '',
  country: '', phone: '', email: '', website: '',
};

export default function ClientForm() {
  const [form, setForm] = useState<FormData>(empty);

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }));

  const selectedCountry = COUNTRIES.find(c => c.value === form.country);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company.trim()) {
      alert('Company / Sender name is required.');
      return;
    }
    console.log('Form data:', form);
    alert('Sender data saved (demo). Check console for data object.');
  };

  const inputCls =
    'w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white';
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sender / Company details
            </h2>
            <span className="text-sm text-gray-500">✎ Tax Registration Number</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company + Tax */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className={labelCls}>
                  Company / Sender name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={form.company}
                  onChange={set('company')}
                  placeholder="Company name"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Tax Registration Number</label>
                <input
                  type="text"
                  value={form.tax}
                  onChange={set('tax')}
                  placeholder="TRN"
                  className={inputCls}
                />
              </div>
            </div>

            {/* First / Last */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>First name</label>
                <input type="text" value={form.first} onChange={set('first')} placeholder="First name" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Last name</label>
                <input type="text" value={form.last} onChange={set('last')} placeholder="Last name" className={inputCls} />
              </div>
            </div>

            {/* Address lines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Address line 1</label>
                <input type="text" value={form.addr1} onChange={set('addr1')} placeholder="Street, building" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Address line 2</label>
                <input type="text" value={form.addr2} onChange={set('addr2')} placeholder="Apartment, suite (optional)" className={inputCls} />
              </div>
            </div>

            {/* Postal / City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Postal code</label>
                <input type="text" value={form.postal} onChange={set('postal')} placeholder="Postal code" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>City</label>
                <input type="text" value={form.city} onChange={set('city')} placeholder="City" className={inputCls} />
              </div>
            </div>

            {/* Country + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className={labelCls}>Country</label>
                <select value={form.country} onChange={set('country')} className={inputCls}>
                  <option value="">- Select -</option>
                  {COUNTRIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={labelCls}>Phone number</label>
                <div className="flex gap-2">
                  <div className="flex items-center rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 min-w-[120px] bg-white dark:bg-gray-700">
                    <span className="mr-2">{selectedCountry?.flag ?? '—'}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {selectedCountry?.code ?? '+—'}
                    </span>
                    <svg className="ml-auto w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="70 123 4567"
                    className={`flex-1 ${inputCls}`}
                  />
                </div>
              </div>
            </div>

            {/* Email / Website */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Email</label>
                <input type="email" value={form.email} onChange={set('email')} placeholder="name@example.com" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Web site</label>
                <input type="url" value={form.website} onChange={set('website')} placeholder="https://" className={inputCls} />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setForm(empty)}
                className="inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
              >
                ✅ Set sender data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
