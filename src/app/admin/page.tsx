'use client';

import { useApp } from '@/context/AppContext';
import Login from '@/components/Login';
import DashboardLayout from '@/components/DashboardLayout';
import { Users, Building, Settings } from 'lucide-react';

export default function AdminPage() {
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

  if (user.role !== 'admin') {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h1>
          <p className="text-gray-600">No tienes permisos para acceder a esta sección.</p>
        </div>
      </DashboardLayout>
    );
  }

  const adminModules = [
    {
      title: 'Gestión de Usuarios',
      description: 'Crear, editar y eliminar usuarios',
      icon: Users,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Gestión de Empresas',
      description: 'Administrar empresas concesionarias',
      icon: Building,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Configuración',
      description: 'Configuración general del sistema',
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administración del Sistema</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona usuarios, empresas y configuración del sistema
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {adminModules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className={`mx-auto w-12 h-12 ${module.bgColor} rounded-full flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${module.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <button className="btn btn-primary">
                    Gestionar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
