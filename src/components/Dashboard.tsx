'use client';

import { useState } from 'react';
import { Bus, Wrench, AlertTriangle, CheckCircle, Eye, Search, Shield, IdCard, Upload, FileText } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import MonthlyReportModal from './MonthlyReportModal';

export default function Dashboard() {
  const { user, companies, monthlyReports } = useApp();
  const [showReportModal, setShowReportModal] = useState(false);

  const getCompanyData = () => {
    if (user?.company) {
      return companies.find(c => c.id === user.company) || companies[0];
    }
    return null;
  };

  const getCurrentMonthReport = () => {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    return monthlyReports.find(report => 
      report.company === user?.company && 
      report.month === currentMonth
    );
  };

  const getReportStatus = () => {
    const currentReport = getCurrentMonthReport();
    if (currentReport) {
      return {
        status: 'completed',
        message: 'Reporte cargado',
        date: new Date(currentReport.uploadDate).toLocaleDateString()
      };
    }
    return {
      status: 'pending',
      message: 'Pendiente de carga',
      date: null
    };
  };

  const companyData = getCompanyData();
  const reportStatus = getReportStatus();

  if (user?.role === 'admin') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Panel de control para {companyData?.name || 'Empresa'}
          </p>
        </div>

        {/* Company Info */}
        <div className="card border-l-4 border-l-blue-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {companyData?.name || 'Empresa'}
          </h3>
          <p className="text-gray-600">
            Estado: <span className="font-medium text-green-600">Activa</span>
          </p>
        </div>

        {/* Report Status */}
        <div className={`card border-2 transition-colors ${
          reportStatus.status === 'completed' 
            ? 'border-green-200 bg-green-50' 
            : 'border-dashed border-gray-300 hover:border-blue-400'
        }`}>
          <div className="text-center">
            <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
              reportStatus.status === 'completed' 
                ? 'bg-green-100' 
                : 'bg-blue-100'
            }`}>
              {reportStatus.status === 'completed' ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <FileText className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reporte Mensual</h3>
            <p className={`mb-2 ${
              reportStatus.status === 'completed' 
                ? 'text-green-600 font-medium' 
                : 'text-gray-600'
            }`}>
              {reportStatus.message}
            </p>
            {reportStatus.date && (
              <p className="text-sm text-gray-500 mb-4">
                Cargado el {reportStatus.date}
              </p>
            )}
            <button 
              onClick={() => setShowReportModal(true)}
              className={`btn ${
                reportStatus.status === 'completed' 
                  ? 'btn-secondary' 
                  : 'btn-primary'
              }`}
            >
              <Upload className="w-4 h-4 mr-2" />
              {reportStatus.status === 'completed' ? 'Actualizar Reporte' : 'Cargar Reporte'}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Bus className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Vehículos Propios</p>
                <p className="text-2xl font-semibold text-gray-900">{companyData?.vehicles || 0}</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Wrench className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Mantenimientos del Mes</p>
                <p className="text-2xl font-semibold text-gray-900">{companyData?.monthlyMaintenance || 0}</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Reportes Cargados</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {monthlyReports.filter(r => r.company === user?.company).length}/12
                </p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Alertas</p>
                <p className="text-2xl font-semibold text-gray-900">{companyData?.alerts || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user?.role === 'auditor') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard - Auditor</h1>
          <p className="mt-1 text-sm text-gray-500">
            Vista de solo lectura de toda la información del sistema
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Vehículos Monitoreados</p>
                <p className="text-2xl font-semibold text-gray-900">150</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Wrench className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Mantenimientos Registrados</p>
                <p className="text-2xl font-semibold text-gray-900">1,247</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Bus className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Empresas Activas</p>
                <p className="text-2xl font-semibold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Reportes Generados</p>
                <p className="text-2xl font-semibold text-gray-900">45</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user?.role === 'inspector') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard - Inspector</h1>
          <p className="mt-1 text-sm text-gray-500">
            Vista de información específica de inspección
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Inspecciones Realizadas</p>
                <p className="text-2xl font-semibold text-gray-900">89</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Vencimientos Próximos</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Seguros Vigentes</p>
                <p className="text-2xl font-semibold text-gray-900">142</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <IdCard className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Licencias Vigentes</p>
                <p className="text-2xl font-semibold text-gray-900">156</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Monthly Report Modal */}
      <MonthlyReportModal 
        isOpen={showReportModal} 
        onClose={() => setShowReportModal(false)} 
      />
    </>
  );
}
