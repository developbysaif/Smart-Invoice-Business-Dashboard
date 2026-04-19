'use client';
import { useState } from 'react';
import { CustomField } from '@/types';

interface Props {
  onAdd: (field: Omit<CustomField, 'id'>) => void;
  onClose: () => void;
}

export default function CustomFieldModal({ onAdd, onClose }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState<CustomField['type']>('text');
  const [value, setValue] = useState('');

  const handleSave = () => {
    if (!name.trim()) { alert('Please enter a field name'); return; }
    onAdd({ name: name.trim(), type, value });
    onClose();
  };

  const inputCls =
    'border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md w-full px-2 py-1.5 mt-1 focus:ring-1 focus:ring-accent text-sm transition-all';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-sm rounded-lg shadow-lg p-5 relative modal-animation">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add Custom Field</h2>

        <div className="space-y-4 text-sm">
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300 text-xs block">Field Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter field name"
              className={inputCls}
              required
            />
          </div>
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300 text-xs block">Field Type</label>
            <select
              value={type}
              onChange={e => setType(e.target.value as CustomField['type'])}
              className={inputCls}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="textarea">Text Area</option>
            </select>
          </div>
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300 text-xs block">Field Value</label>
            {type === 'textarea' ? (
              <textarea
                value={value}
                onChange={e => setValue(e.target.value)}
                rows={3}
                placeholder="Enter field value"
                className={inputCls}
              />
            ) : (
              <input
                type={type === 'date' ? 'date' : type === 'number' ? 'number' : 'text'}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Enter field value"
                className={inputCls}
              />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="border border-gray-400 dark:border-gray-600 dark:text-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-accent text-white rounded-md px-4 py-2 text-sm hover:bg-green-600"
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
}
