'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';

export default function Maintenance() {
  const { maintenances, addMaintenance } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [editingMaintenance] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    maintenanceBatch: '',
    workOrder: '',
    workOrderDate: '',
    taskType: 'preventiva' as 'predictiva' | 'preventiva' | 'correctiva',
    workDefinition: '',
    startDate: '',
    endDate: '',
    place: '',
    mechanics: '',
    vehicles: [] as Array<{
      id: string;
      vehicleId: string;
      internalNumber: string;
      licensePlate: string;
      task: string;
      odometer: number;
      hourmeter: number;
      supplies: Array<{
        id: string;
        article: string;
        description: string;
        quantity: number;
        unitCost: number;
        totalCost: number;
      }>;
      vehicleCost: number;
    }>,
    totalCost: 0,
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMaintenance(formData);
    setFormData({
      maintenanceBatch: '',
      workOrder: '',
      workOrderDate: '',
      taskType: 'preventiva',
      workDefinition: '',
      startDate: '',
      endDate: '',
      place: '',
      mechanics: '',
      vehicles: [],
      totalCost: 0,
      notes: '',
    });
    setShowForm(false);
  };

  const filteredMaintenances = maintenances.filter(maintenance => {
    const matchesSearch = maintenance.maintenanceBatch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         maintenance.workDefinition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || maintenance.taskType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registro de Mantenimiento</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona los mantenimientos de tus vehículos
          </p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Mantenimiento
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="form-label">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                className="form-input pl-10"
                placeholder="Buscar por tarea o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Tipo de Tarea</label>
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Todos los tipos</option>
              <option value="predictiva">Predictiva</option>
              <option value="preventiva">Preventiva</option>
              <option value="correctiva">Correctiva</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Acciones</label>
            <div className="flex space-x-2">
              <button className="btn btn-secondary">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario de mantenimiento */}
      {showForm && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingMaintenance ? 'Editar Mantenimiento' : 'Nuevo Mantenimiento'}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información del lote */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Número de Lote *</label>
                <input
                  type="text"
                  name="maintenanceBatch"
                  value={formData.maintenanceBatch}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Ej: MANT-2024-001"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Tipo de Servicio *</label>
                <select className="form-select" disabled>
                  <option>Urbano</option>
                  <option>Media y Larga Distancia</option>
                </select>
              </div>
            </div>

            {/* Orden de trabajo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Orden de Trabajo *</label>
                <input
                  type="text"
                  name="workOrder"
                  value={formData.workOrder}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="N° de Orden de Trabajo"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Tipo de Tarea *</label>
                <select
                  name="taskType"
                  value={formData.taskType}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="predictiva">Predictiva</option>
                  <option value="preventiva">Preventiva</option>
                  <option value="correctiva">Correctiva</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Definición de Trabajo *</label>
              <select
                name="workDefinition"
                value={formData.workDefinition}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Seleccionar tipo de trabajo</option>
                <option value="frenos">Frenos</option>
                <option value="neumaticos">Neumáticos</option>
                <option value="electricidad">Electricidad</option>
                <option value="amortiguacion">Amortiguación</option>
                <option value="direccion">Dirección</option>
                <option value="tren-delantero">Tren Delantero</option>
                <option value="mecanica-pesada">Mecánica Pesada</option>
                <option value="mecanica-liviana">Mecánica Liviana</option>
              </select>
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-group">
                <label className="form-label">Fecha de Inicio *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Fecha de Egreso</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Fecha de Orden de Trabajo *</label>
                <input
                  type="date"
                  name="workOrderDate"
                  value={formData.workOrderDate}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Fecha de orden de trabajo */}
            <div className="form-group">
              <label className="form-label">Fecha de Orden de Trabajo *</label>
              <input
                type="date"
                name="workOrderDate"
                value={formData.workOrderDate}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            {/* Lugar y mecánicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Lugar *</label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Taller propio o tercerizado"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mecánicos *</label>
                <input
                  type="text"
                  name="mechanics"
                  value={formData.mechanics}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Nombres de los mecánicos"
                  required
                />
              </div>
            </div>

            {/* Notas */}
            <div className="form-group">
              <label className="form-label">Notas del Mantenimiento</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="form-input"
                placeholder="Notas adicionales sobre el mantenimiento..."
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {editingMaintenance ? 'Actualizar' : 'Guardar'} Mantenimiento
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de mantenimientos */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mantenimientos Registrados</h3>
        
        {filteredMaintenances.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No hay mantenimientos registrados</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
            >
              Crear Primer Mantenimiento
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lote
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Definición de Trabajo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Inicio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Costo Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMaintenances.map((maintenance) => (
                  <tr key={maintenance.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {maintenance.maintenanceBatch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {maintenance.workDefinition}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-badge ${
                        maintenance.taskType === 'preventiva' ? 'status-completed' :
                        maintenance.taskType === 'predictiva' ? 'status-warning' :
                        'status-danger'
                      }`}>
                        {maintenance.taskType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(maintenance.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${maintenance.totalCost.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
