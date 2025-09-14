'use client';

import { useState } from 'react';
import { 
  Home, 
  Bus, 
  Wrench, 
  Upload, 
  BarChart3, 
  Search, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useApp();

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Empresa';
      case 'auditor':
        return 'Auditor';
      case 'inspector':
        return 'Inspector';
      default:
        return role;
    }
  };

  const getCompanyName = (companyId?: string) => {
    const companies = {
      'empresa1': 'Transporte Norte S.A.',
      'empresa2': 'Transporte Sur S.A.',
      'empresa3': 'Transporte Este S.A.',
      'empresa4': 'Transporte Oeste S.A.',
      'empresa5': 'Transporte Central S.A.',
    };
    return companies[companyId as keyof typeof companies] || 'Empresa';
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['admin', 'auditor', 'inspector'] },
    { name: 'Mis Vehículos', href: '/vehicles', icon: Bus, roles: ['admin'] },
    { name: 'Mantenimientos', href: '/maintenance', icon: Wrench, roles: ['admin'] },
    { name: 'Reporte Mensual', href: '/monthly-report', icon: Upload, roles: ['admin'] },
    { name: 'Historial', href: '/reports', icon: BarChart3, roles: ['admin', 'auditor'] },
    { name: 'Inspección', href: '/inspection', icon: Search, roles: ['inspector'] },
    { name: 'Administración', href: '/admin', icon: Settings, roles: ['admin'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-lg font-semibold text-gray-900">Sistema Mantenimiento</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-lg font-semibold text-gray-900">Sistema Mantenimiento</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="text-sm text-gray-700">
                {getRoleName(user?.role || '')} - {user?.company ? getCompanyName(user.company) : ''}
              </div>
              <button
                onClick={logout}
                className="btn btn-secondary btn-sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
