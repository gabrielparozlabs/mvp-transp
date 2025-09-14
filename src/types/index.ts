export type UserRole = 'admin' | 'auditor' | 'inspector';

export interface User {
  email: string;
  role: UserRole;
  company?: string;
}

export interface Vehicle {
  id: string;
  internalNumber: string;
  licensePlate: string;
  company: string;
  group: string;
  serviceType: 'urbano' | 'media-larga';
  rto: string;
  license: string;
  insurance: string;
  insuranceType: string;
  insuranceExpiry: string;
  hasCameras: boolean;
  hasHeating: boolean;
  hasAirConditioning: boolean;
  hasInsurance: boolean;
}

export interface Maintenance {
  id: string;
  maintenanceBatch: string; // Número de lote o grupo de mantenimiento
  workOrder: string;
  workOrderDate: string;
  taskType: 'predictiva' | 'preventiva' | 'correctiva';
  workDefinition: string;
  startDate: string;
  endDate?: string;
  place: string;
  mechanics: string;
  vehicles: MaintenanceVehicle[]; // Múltiples vehículos en un mantenimiento
  totalCost: number;
  notes?: string;
}

export interface MaintenanceVehicle {
  id: string;
  vehicleId: string;
  internalNumber: string;
  licensePlate: string;
  task: string;
  odometer: number;
  hourmeter: number;
  supplies: Supply[];
  vehicleCost: number;
}

export interface Supply {
  id: string;
  article: string;
  description: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface MonthlyReport {
  id: string;
  month: string;
  company: string;
  uploadDate: string;
  status: 'pending' | 'completed';
  notes?: string;
  file?: File;
}

export interface Company {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  vehicles: number;
  monthlyMaintenance: number;
  reportsUploaded: number;
  alerts: number;
}
