'use client';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import HomePage from '@/components/auth/HomePage';
import LoginPage from '@/components/auth/LoginPage';
import SignupPage from '@/components/auth/SignupPage';
import DashboardPage from '@/components/dashboard/DashboardPage';
import InvoicesPage from '@/components/invoice/InvoicesPage';
import InvoiceCreatePage from '@/components/invoice/InvoiceCreatePage';
import ClientsPage from '@/components/clients/ClientsPage';
import ExpensesPage from '@/components/expenses/ExpensesPage';
import AnalyticsPage from '@/components/analytics/AnalyticsPage';
import ReportsPage from '@/components/reports/ReportsPage';

function AppRouter() {
  const { view } = useAuth();

  switch (view) {
    case 'home':           return <HomePage />;
    case 'login':          return <LoginPage />;
    case 'signup':         return <SignupPage />;
    case 'dashboard':      return <DashboardPage />;
    case 'invoices':       return <InvoicesPage />;
    case 'invoice-create': return <InvoiceCreatePage />;
    case 'clients':        return <ClientsPage />;
    case 'expenses':       return <ExpensesPage />;
    case 'analytics':      return <AnalyticsPage />;
    case 'reports':        return <ReportsPage />;
    default:               return <HomePage />;
  }
}

export default function Page() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
