'use client';

import { useApp } from '@/context/AppContext';
import Login from '@/components/Login';
import DashboardLayout from '@/components/DashboardLayout';
import Inspection from '@/components/Inspection';

export default function InspectionPage() {
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

  if (user.role !== 'inspector') {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h1>
          <p className="text-gray-600">No tienes permisos para acceder a esta sección.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Inspection />
    </DashboardLayout>
  );
}
