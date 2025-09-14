'use client';

import { useApp } from '@/context/AppContext';
import Login from '@/components/Login';
import DashboardLayout from '@/components/DashboardLayout';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
  const { user, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-blue-600 flex items-center justify-center">
        <div className="text-white text-lg">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}
