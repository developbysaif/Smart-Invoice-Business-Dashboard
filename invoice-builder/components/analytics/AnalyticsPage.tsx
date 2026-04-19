'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useStore } from '@/lib/useStore';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Calendar, Download, TrendingUp, Info } from 'lucide-react';

export default function AnalyticsPage() {
  const { invoices, expenses } = useStore();

  const data = [
    { name: 'Jan', income: 4000, expenses: 2400 },
    { name: 'Feb', income: 3000, expenses: 1398 },
    { name: 'Mar', income: 6000, expenses: 3800 },
    { name: 'Apr', income: 4780, expenses: 3908 },
    { name: 'May', income: 5890, expenses: 4800 },
    { name: 'Jun', income: 7390, expenses: 3800 },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Deep Analytics</h1>
            <p className="text-slate-500 dark:text-slate-400">Advanced insights into your business performance.</p>
          </div>
          <button className="btn-secondary">
            <Download size={18} />
            Export Data
          </button>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 border-l-4 border-l-indigo-600">
            <div className="flex items-center gap-3 text-slate-500 text-sm mb-2">
              <TrendingUp size={16} />
              Growth Rate
            </div>
            <p className="text-2xl font-bold">+24.5%</p>
            <p className="text-xs text-emerald-500 mt-1 font-medium">↑ 12% from last month</p>
          </div>
          <div className="card p-6 border-l-4 border-l-emerald-600">
            <div className="flex items-center gap-3 text-slate-500 text-sm mb-2">
              <Calendar size={16} />
              Avg. Days to Pay
            </div>
            <p className="text-2xl font-bold">14 Days</p>
            <p className="text-xs text-emerald-500 mt-1 font-medium">↓ 2 days improvement</p>
          </div>
          <div className="card p-6 border-l-4 border-l-amber-600">
            <div className="flex items-center gap-3 text-slate-500 text-sm mb-2">
              <Info size={16} />
              Outstanding
            </div>
            <p className="text-2xl font-bold">$12,450</p>
            <p className="text-xs text-rose-500 mt-1 font-medium">Across 8 invoices</p>
          </div>
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-1 gap-8">
          <div className="card p-8">
            <h3 className="text-xl font-bold mb-8">Income vs Expenses Trend</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                  <Bar dataKey="income" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                  <Bar dataKey="expenses" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="card p-8">
               <h3 className="text-xl font-bold mb-8">Profit Margins</h3>
               <div className="h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                     <Area type="monotone" dataKey="income" stackId="1" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
             </div>
             <div className="card p-8">
               <h3 className="text-xl font-bold mb-8">Client Acquisition</h3>
               <div className="h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                     <Line type="monotone" dataKey="income" stroke="#8b5cf6" strokeWidth={3} dot={{r: 6, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff'}} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
