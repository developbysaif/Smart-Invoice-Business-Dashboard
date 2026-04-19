'use client';
import { useAuth } from '@/lib/AuthContext';
import { 
  Rocket, 
  CheckCircle, 
  Shield, 
  Zap, 
  ChevronRight,
  TrendingUp,
  Layout
} from 'lucide-react';

export default function HomePage() {
  const { goTo } = useAuth();

  const features = [
    { 
      icon: Zap, 
      title: 'Rapid Invoicing', 
      desc: 'Create and send professional invoices in under 60 seconds.' 
    },
    { 
      icon: TrendingUp, 
      title: 'Smart Analytics', 
      desc: 'Track revenue, expenses, and profit trends with ease.' 
    },
    { 
      icon: Shield, 
      title: 'Secure Storage', 
      desc: 'Your data is stored safely and accessible whenever you need it.' 
    },
    { 
      icon: Layout, 
      title: 'Pro Dashboard', 
      desc: 'Manage clients, invoices, and reports from one unified interface.' 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-6 pt-20 pb-32 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-bold mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <Zap size={16} />
          The ultimate platform for freelancers
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 max-w-4xl text-slate-900 dark:text-white leading-[1.1]">
          Run Your Business Like a <span className="bg-clip-text text-transparent bg-primary-gradient">Professional.</span>
        </h1>
        
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mb-12 leading-relaxed">
          The all-in-one SaaS platform to manage invoices, track expenses, and analyze profits. Free yourself from manual spreadsheets today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button 
            onClick={() => goTo('signup')}
            className="btn-primary px-8 py-4 text-lg shadow-2xl shadow-indigo-500/30"
          >
            Start For Free
            <Rocket size={20} />
          </button>
          <button 
            onClick={() => goTo('login')}
            className="btn-secondary px-8 py-4 text-lg"
          >
            Login to Account
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Mockup Preview */}
        <div className="relative w-full max-w-5xl group">
             <div className="absolute -inset-1 bg-primary-gradient opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
             <div className="relative card p-2 bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                <div className="w-full h-full bg-slate-100 dark:bg-slate-900 rounded-xl flex items-center justify-center p-8 text-slate-300">
                   <div className="grid grid-cols-12 gap-6 w-full h-full">
                      <div className="col-span-3 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                      <div className="col-span-9 space-y-6">
                         <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                         <div className="grid grid-cols-3 gap-6">
                            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                         </div>
                         <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                      </div>
                   </div>
                </div>
             </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full bg-white dark:bg-slate-900/50 py-32 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Powerful tools designed specifically for small business owners and independent contractors.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="card p-8 card-hover border-none bg-slate-50 dark:bg-slate-900 shadow-none hover:shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center mb-6 text-indigo-600">
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="py-24 text-center">
         <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-12">Trusted by 5,000+ Freelancers</p>
         <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale items-center">
            <div className="text-2xl font-black">STRIPE</div>
            <div className="text-2xl font-black">VERCEL</div>
            <div className="text-2xl font-black">LINEAR</div>
            <div className="text-2xl font-black">GUMROAD</div>
         </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 py-12 text-center text-slate-500 text-sm">
         <p>© 2026 Antigravity SaaS Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
