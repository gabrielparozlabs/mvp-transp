'use client';

import { useApp } from '@/context/AppContext';
import Login from '@/components/Login';
import DashboardLayout from '@/components/DashboardLayout';
import { BarChart3, AlertTriangle, DollarSign } from 'lucide-react';

export default function ReportsPage() {
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

  if (!['admin', 'auditor'].includes(user.role || '')) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h1>
          <p className="text-gray-600">No tienes permisos para acceder a esta sección.</p>
        </div>
      </DashboardLayout>
    );
  }

  const reports = [
    {
      title: 'Reporte de Mantenimientos',
      description: 'Análisis de mantenimientos por período',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Alertas y Vencimientos',
      description: 'RTO, Licencias, Seguros próximos a vencer',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Costos por Empresa',
      description: 'Análisis de costos de mantenimiento',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user.role === 'admin' ? 'Historial y Consultas' : 'Reportes y Consultas'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {user.role === 'admin' 
              ? 'Consulta el historial de reportes y genera análisis'
              : 'Acceso de solo lectura a reportes del sistema'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => {
            const Icon = report.icon;
            return (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className={`mx-auto w-12 h-12 ${report.bgColor} rounded-full flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${report.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-gray-600 mb-4">{report.description}</p>
                  <button className="btn btn-primary">
                    {user.role === 'admin' ? 'Generar' : 'Ver'}
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
