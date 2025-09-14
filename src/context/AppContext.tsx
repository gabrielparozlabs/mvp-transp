'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Vehicle, Maintenance, MonthlyReport, Company } from '@/types';

interface AppContextType {
  user: User | null;
  isLoading: boolean;
  vehicles: Vehicle[];
  maintenances: Maintenance[];
  monthlyReports: MonthlyReport[];
  companies: Company[];
  login: (email: string, password: string) => void;
  logout: () => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  addMaintenance: (maintenance: Omit<Maintenance, 'id'>) => void;
  uploadMonthlyReport: (report: Omit<MonthlyReport, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [monthlyReports, setMonthlyReports] = useState<MonthlyReport[]>([]);
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 'empresa1',
      name: 'Transporte Norte S.A.',
      status: 'active',
      vehicles: 25,
      monthlyMaintenance: 18,
      reportsUploaded: 11,
      alerts: 3,
    },
    {
      id: 'empresa2',
      name: 'Transporte Sur S.A.',
      status: 'active',
      vehicles: 30,
      monthlyMaintenance: 22,
      reportsUploaded: 10,
      alerts: 2,
    },
  ]);

  // Cargar usuario desde localStorage al inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Detectar rol automáticamente por email
  const detectRoleByEmail = (email: string): { role: UserRole; company?: string } => {
    if (email.includes('admin@empresa.com')) {
      return { role: 'admin', company: 'empresa1' };
    } else if (email.includes('auditor@sistema.com')) {
      return { role: 'auditor' };
    } else if (email.includes('inspector@sistema.com')) {
      return { role: 'inspector' };
    } else if (email.includes('@empresa')) {
      return { role: 'admin', company: 'empresa1' };
    } else {
      return { role: 'admin', company: 'empresa1' };
    }
  };

  const login = (email: string, password: string) => {
    const userInfo = detectRoleByEmail(email);
    const newUser = {
      email,
      role: userInfo.role,
      company: userInfo.company,
    };
    setUser(newUser);
    // Guardar en localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    // Eliminar de localStorage
    localStorage.removeItem('user');
  };

  const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: Date.now().toString(),
    };
    setVehicles(prev => [...prev, newVehicle]);
  };

  const addMaintenance = (maintenance: Omit<Maintenance, 'id'>) => {
    const newMaintenance: Maintenance = {
      ...maintenance,
      id: Date.now().toString(),
    };
    setMaintenances(prev => [...prev, newMaintenance]);
  };

  const uploadMonthlyReport = (report: Omit<MonthlyReport, 'id'>) => {
    const newReport: MonthlyReport = {
      ...report,
      id: Date.now().toString(),
    };
    setMonthlyReports(prev => [...prev, newReport]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        vehicles,
        maintenances,
        monthlyReports,
        companies,
        login,
        logout,
        addVehicle,
        addMaintenance,
        uploadMonthlyReport,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
