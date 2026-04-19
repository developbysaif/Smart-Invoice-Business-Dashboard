'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Mail, Lock, UserCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login, goTo } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    login(email);
  };

  const handleGuest = () => {
    login('guest@antigravity.io');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="card max-w-md w-full overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 inset-x-0 h-2 bg-primary-gradient"></div>
        
        <div className="p-10 pt-12">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <div className="w-12 h-12 rounded-2xl bg-primary-gradient flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              A
            </div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-primary-gradient">Antigravity</span>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400">Log in to manage your business</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="input-field pl-12 py-3.5"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <button type="button" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-12 py-3.5"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-4 text-lg shadow-xl shadow-indigo-500/20"
            >
              Sign In
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-slate-100 dark:bg-slate-800"></div>
            <span className="relative bg-white dark:bg-slate-900 px-4 text-slate-400 text-xs font-bold uppercase tracking-widest mx-auto block w-fit">Or Continue With</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
             <button
              onClick={handleGuest}
              className="btn-secondary py-3.5 w-full group"
            >
              <UserCircle size={20} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
              Guest Account
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            New here?{' '}
            <button
              onClick={() => goTo('signup')}
              className="font-bold text-indigo-600 hover:text-indigo-700"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
