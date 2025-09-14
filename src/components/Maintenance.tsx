'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';

export default function Maintenance() {
  const { user, maintenances, addMaintenance } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [editingMaintenance, setEditingMaintenance] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    vehicleId: '',
    task: '',
    taskType: 'preventiva' as 'predictiva' | 'preventiva' | 'correctiva',
    workDefinition: '',
    startDate: '',
    endDate: '',
    workOrder: '',
    workOrderDate: '',
    odometer: 0,
    hourmeter: 0,
    place: '',
    mechanics: '',
    supplies: [] as Array<{
      id: string;
      article: string;
      description: string;
      quantity: number;
      unitCost: number;
      totalCost: number;
    }>,
    totalCost: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSupplyChange = (index: number, field: string, value: string | number) => {
    const newSupplies = [...formData.supplies];
    newSupplies[index] = {
      ...newSupplies[index],
      [field]: value
    };
    
    // Recalcular costo total del artículo
    if (field === 'quantity' || field === 'unitCost') {
      newSupplies[index].totalCost = newSupplies[index].quantity * newSupplies[index].unitCost;
    }
    
    setFormData(prev => ({
      ...prev,
      supplies: newSupplies,
      totalCost: newSupplies.reduce((sum, supply) => sum + supply.totalCost, 0)
    }));
  };

  const addSupply = () => {
    setFormData(prev => ({
      ...prev,
      supplies: [...prev.supplies, {
        id: Date.now().toString(),
        article: '',
        description: '',
        quantity: 1,
        unitCost: 0,
        totalCost: 0
      }]
    }));
  };

  const removeSupply = (index: number) => {
    const newSupplies = formData.supplies.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      supplies: newSupplies,
      totalCost: newSupplies.reduce((sum, supply) => sum + supply.totalCost, 0)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMaintenance(formData);
    setFormData({
      vehicleId: '',
      task: '',
      taskType: 'preventiva',
      workDefinition: '',
      startDate: '',
      endDate: '',
      workOrder: '',
      workOrderDate: '',
      odometer: 0,
      hourmeter: 0,
      place: '',
      mechanics: '',
      supplies: [],
      totalCost: 0,
    });
    setShowForm(false);
  };

  const filteredMaintenances = maintenances.filter(maintenance => {
    const matchesSearch = maintenance.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            {/* Información del vehículo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Vehículo *</label>
                <select
                  name="vehicleId"
                  value={formData.vehicleId}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar vehículo</option>
                  <option value="001">001 - ABC-123</option>
                  <option value="002">002 - DEF-456</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tipo de Servicio *</label>
                <select className="form-select" disabled>
                  <option>Urbano</option>
                  <option>Media y Larga Distancia</option>
                </select>
              </div>
            </div>

            {/* Información de la tarea */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Tarea *</label>
                <input
                  type="text"
                  name="task"
                  value={formData.task}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Descripción de la tarea"
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

            {/* Orden de trabajo */}
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

            {/* Odómetro y Horómetro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Odómetro (km) *</label>
                <input
                  type="number"
                  name="odometer"
                  value={formData.odometer}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Kilometraje"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Horómetro (horas) *</label>
                <input
                  type="number"
                  name="hourmeter"
                  value={formData.hourmeter}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Tiempo de funcionamiento"
                  required
                />
              </div>
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

            {/* Insumos */}
            <div className="form-group">
              <div className="flex justify-between items-center mb-4">
                <label className="form-label">Insumos y Repuestos</label>
                <button
                  type="button"
                  onClick={addSupply}
                  className="btn btn-sm btn-primary"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Agregar Insumo
                </button>
              </div>
              
              {formData.supplies.map((supply, index) => (
                <div key={supply.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
                  <div className="form-group">
                    <label className="form-label text-xs">Artículo</label>
                    <input
                      type="text"
                      value={supply.article}
                      onChange={(e) => handleSupplyChange(index, 'article', e.target.value)}
                      className="form-input text-sm"
                      placeholder="N° inventario"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-xs">Descripción</label>
                    <input
                      type="text"
                      value={supply.description}
                      onChange={(e) => handleSupplyChange(index, 'description', e.target.value)}
                      className="form-input text-sm"
                      placeholder="Descripción del artículo"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-xs">Cantidad</label>
                    <input
                      type="number"
                      value={supply.quantity}
                      onChange={(e) => handleSupplyChange(index, 'quantity', Number(e.target.value))}
                      className="form-input text-sm"
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-xs">Costo Unitario</label>
                    <input
                      type="number"
                      value={supply.unitCost}
                      onChange={(e) => handleSupplyChange(index, 'unitCost', Number(e.target.value))}
                      className="form-input text-sm"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-xs">Costo Total</label>
                    <input
                      type="number"
                      value={supply.totalCost}
                      className="form-input text-sm bg-gray-50"
                      disabled
                      step="0.01"
                    />
                  </div>
                  <div className="form-group flex items-end">
                    <button
                      type="button"
                      onClick={() => removeSupply(index)}
                      className="btn btn-sm bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="text-right">
                <span className="text-lg font-semibold text-gray-900">
                  Total: ${formData.totalCost.toFixed(2)}
                </span>
              </div>
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
                    Vehículo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarea
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
                      {maintenance.vehicleId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {maintenance.task}
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
