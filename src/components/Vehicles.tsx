'use client';

import { useState } from 'react';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Vehicle } from '@/types';

export default function Vehicles() {
  const { vehicles, addVehicle } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Vehicle>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.internalNumber && formData.licensePlate && formData.company) {
      addVehicle(formData as Omit<Vehicle, 'id'>);
      setFormData({});
      setShowForm(false);
    }
  };

  const sampleVehicles: Vehicle[] = [
    {
      id: '1',
      internalNumber: '001',
      licensePlate: 'ABC-123',
      company: 'Transporte Norte S.A.',
      group: 'A',
      serviceType: 'urbano',
      rto: '2024-06-15',
      license: '2024-12-20',
      insurance: '2024-11-30',
      insuranceType: 'Responsabilidad Civil',
      insuranceExpiry: '2024-11-30',
      hasCameras: true,
      hasHeating: true,
      hasAirConditioning: false,
      hasInsurance: true,
    },
    {
      id: '2',
      internalNumber: '002',
      licensePlate: 'DEF-456',
      company: 'Transporte Sur S.A.',
      group: 'B',
      serviceType: 'media-larga',
      rto: '2024-08-10',
      license: '2025-03-15',
      insurance: '2024-10-25',
      insuranceType: 'Todo Riesgo',
      insuranceExpiry: '2024-10-25',
      hasCameras: false,
      hasHeating: false,
      hasAirConditioning: true,
      hasInsurance: true,
    },
  ];

  const allVehicles = [...vehicles, ...sampleVehicles];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Vehículos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Administra los vehículos de tu empresa
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Vehículo
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setShowForm(false)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Agregar Vehículo</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Tipo de Servicio</label>
                    <select
                      value={formData.serviceType || ''}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as 'urbano' | 'media-larga' })}
                      className="form-select"
                      required
                    >
                      <option value="">Seleccionar</option>
                      <option value="urbano">Urbano</option>
                      <option value="media-larga">Media y Larga Distancia</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Grupo</label>
                    <input
                      type="text"
                      value={formData.group || ''}
                      onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Empresa</label>
                    <input
                      type="text"
                      value={formData.company || ''}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Número Interno</label>
                    <input
                      type="text"
                      value={formData.internalNumber || ''}
                      onChange={(e) => setFormData({ ...formData, internalNumber: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Matrícula</label>
                    <input
                      type="text"
                      value={formData.licensePlate || ''}
                      onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fecha RTO</label>
                    <input
                      type="date"
                      value={formData.rto || ''}
                      onChange={(e) => setFormData({ ...formData, rto: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hasCameras || false}
                      onChange={(e) => setFormData({ ...formData, hasCameras: e.target.checked })}
                      className="mr-2"
                    />
                    Cámaras
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hasHeating || false}
                      onChange={(e) => setFormData({ ...formData, hasHeating: e.target.checked })}
                      className="mr-2"
                    />
                    Calefacción
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hasAirConditioning || false}
                      onChange={(e) => setFormData({ ...formData, hasAirConditioning: e.target.checked })}
                      className="mr-2"
                    />
                    Aire Acond.
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hasInsurance || false}
                      onChange={(e) => setFormData({ ...formData, hasInsurance: e.target.checked })}
                      className="mr-2"
                    />
                    Seguro
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Vehicles Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interno
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Matrícula
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grupo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {vehicle.internalNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.licensePlate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.group}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.serviceType === 'urbano' ? 'Urbano' : 'Media y Larga Distancia'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
