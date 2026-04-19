'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const { login, goTo } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    login(formData.email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="card max-w-2xl w-full overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-2 bg-primary-gradient p-10 text-white flex flex-col justify-between">
           <div>
              <div className="flex items-center gap-2 mb-12">
                 <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">A</div>
                 <span className="font-bold tracking-tight text-lg">Antigravity</span>
              </div>
              <h2 className="text-3xl font-bold mb-6 leading-tight">Join 5,000+ businesses growing with us.</h2>
              <ul className="space-y-4">
                 {[
                    'Professional Invoices',
                    'Expense Tracking',
                    'Analytics Dashboard',
                    'Financial Reports'
                 ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium opacity-90">
                       <CheckCircle size={18} className="text-indigo-200" />
                       {item}
                    </li>
                 ))}
              </ul>
           </div>
           <div className="text-xs opacity-60">
              © 2026 Antigravity SaaS Platform
           </div>
        </div>

        <div className="md:col-span-3 p-10">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-slate-500 dark:text-slate-400">Start your 14-day free trial today.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">First Name</label>
                  <input
                    required
                    type="text"
                    className="input-field"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Last Name</label>
                  <input
                    required
                    type="text"
                    className="input-field"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                  />
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  required
                  type="email"
                  className="input-field pl-12"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  required
                  type="password"
                  className="input-field pl-12"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  required
                  type="password"
                  className="input-field pl-12"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-4 mt-6 shadow-xl shadow-indigo-500/20"
            >
              Create My Account
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <button
              onClick={() => goTo('login')}
              className="font-bold text-indigo-600 hover:text-indigo-700"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
