'use client';

import { useState } from 'react';
import { Bus, Eye, Search } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Por favor complete todos los campos');
      return;
    }
    login(email);
  };

  const fillLogin = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  const demoAccounts = [
    {
      email: 'admin@empresa.com',
      password: '123456',
      role: 'Empresa (Administrador)',
      icon: Bus,
      description: 'Puede cargar vehículos, mantenimientos y reportes',
    },
    {
      email: 'auditor@sistema.com',
      password: '123456',
      role: 'Auditor',
      icon: Eye,
      description: 'Solo lectura de toda la información',
    },
    {
      email: 'inspector@sistema.com',
      password: '123456',
      role: 'Inspector',
      icon: Search,
      description: 'Solo lectura de información específica',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Bus className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Sistema de Gestión de Mantenimiento</h1>
            <p className="text-gray-600 mt-2">Transporte Público de Pasajeros</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="admin@empresa.com"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="123456"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-center text-gray-700 font-medium mb-4">Cuentas de Demostración:</h4>
            <div className="space-y-3">
              {demoAccounts.map((account, index) => {
                const Icon = account.icon;
                return (
                  <div
                    key={index}
                    onClick={() => fillLogin(account.email, account.password)}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 group-hover:text-blue-900">
                          {account.role}
                        </div>
                        <div className="text-sm text-gray-500">
                          {account.email} / {account.password}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {account.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
