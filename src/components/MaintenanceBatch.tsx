'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Plus, Edit, Trash2, Search, Filter, Upload, FileText, X } from 'lucide-react';

export default function MaintenanceBatch() {
  const { maintenances, addMaintenance } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [showExcelUpload, setShowExcelUpload] = useState(false);
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
    notes: '',
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
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const addVehicle = () => {
    const newVehicle = {
      id: Date.now().toString(),
      vehicleId: '',
      internalNumber: '',
      licensePlate: '',
      task: '',
      odometer: 0,
      hourmeter: 0,
      supplies: [],
      vehicleCost: 0
    };
    
    setFormData(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, newVehicle]
    }));
  };

  const removeVehicle = (vehicleIndex: number) => {
    const newVehicles = formData.vehicles.filter((_, i) => i !== vehicleIndex);
    const newTotalCost = newVehicles.reduce((sum, vehicle) => sum + vehicle.vehicleCost, 0);
    
    setFormData(prev => ({
      ...prev,
      vehicles: newVehicles,
      totalCost: newTotalCost
    }));
  };

  const handleVehicleChange = (vehicleIndex: number, field: string, value: string | number | Array<{
    id: string;
    article: string;
    description: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
  }>) => {
    const newVehicles = [...formData.vehicles];
    newVehicles[vehicleIndex] = {
      ...newVehicles[vehicleIndex],
      [field]: value
    };
    
    // Recalcular costo total del vehículo
    if (field === 'supplies' && Array.isArray(value)) {
      newVehicles[vehicleIndex].vehicleCost = value.reduce((sum, supply) => sum + supply.totalCost, 0);
    }
    
    const newTotalCost = newVehicles.reduce((sum, vehicle) => sum + vehicle.vehicleCost, 0);
    
    setFormData(prev => ({
      ...prev,
      vehicles: newVehicles,
      totalCost: newTotalCost
    }));
  };

  const addSupplyToVehicle = (vehicleIndex: number) => {
    const newVehicles = [...formData.vehicles];
    newVehicles[vehicleIndex].supplies.push({
      id: Date.now().toString(),
      article: '',
      description: '',
      quantity: 1,
      unitCost: 0,
      totalCost: 0
    });
    
    setFormData(prev => ({
      ...prev,
      vehicles: newVehicles
    }));
  };

  const removeSupplyFromVehicle = (vehicleIndex: number, supplyIndex: number) => {
    const newVehicles = [...formData.vehicles];
    newVehicles[vehicleIndex].supplies = newVehicles[vehicleIndex].supplies.filter((_, i) => i !== supplyIndex);
    
    // Recalcular costo del vehículo
    newVehicles[vehicleIndex].vehicleCost = newVehicles[vehicleIndex].supplies.reduce((sum, supply) => sum + supply.totalCost, 0);
    
    const newTotalCost = newVehicles.reduce((sum, vehicle) => sum + vehicle.vehicleCost, 0);
    
    setFormData(prev => ({
      ...prev,
      vehicles: newVehicles,
      totalCost: newTotalCost
    }));
  };

  const handleSupplyChange = (vehicleIndex: number, supplyIndex: number, field: string, value: string | number) => {
    const newVehicles = [...formData.vehicles];
    newVehicles[vehicleIndex].supplies[supplyIndex] = {
      ...newVehicles[vehicleIndex].supplies[supplyIndex],
      [field]: value
    };
    
    // Recalcular costo total del artículo
    if (field === 'quantity' || field === 'unitCost') {
      newVehicles[vehicleIndex].supplies[supplyIndex].totalCost = 
        newVehicles[vehicleIndex].supplies[supplyIndex].quantity * 
        newVehicles[vehicleIndex].supplies[supplyIndex].unitCost;
    }
    
    // Recalcular costo del vehículo
    newVehicles[vehicleIndex].vehicleCost = newVehicles[vehicleIndex].supplies.reduce((sum, supply) => sum + supply.totalCost, 0);
    
    // Recalcular costo total
    const newTotalCost = newVehicles.reduce((sum, vehicle) => sum + vehicle.vehicleCost, 0);
    
    setFormData(prev => ({
      ...prev,
      vehicles: newVehicles,
      totalCost: newTotalCost
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
      notes: '',
      vehicles: [],
      totalCost: 0,
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
          <h1 className="text-2xl font-bold text-gray-900">Registro de Mantenimientos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona lotes de mantenimiento con múltiples vehículos
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowExcelUpload(true)}
            className="btn btn-secondary"
          >
            <Upload className="w-4 h-4 mr-2" />
            Cargar Excel
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Lote
          </button>
        </div>
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
                placeholder="Buscar por lote o descripción..."
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

      {/* Modal de carga de Excel */}
      {showExcelUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Cargar Mantenimientos desde Excel</h2>
              <button
                onClick={() => setShowExcelUpload(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Cargar Archivo Excel</h3>
                <p className="text-gray-600 mb-6">
                  Sube un archivo Excel con múltiples vehículos para crear un lote de mantenimiento
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Arrastra tu archivo Excel aquí o haz clic para seleccionar</p>
                  <p className="text-xs text-gray-500 mt-1">Formatos: .xlsx, .xls</p>
                </div>
                <div className="mt-6">
                  <button className="btn btn-primary mr-3">
                    <Upload className="w-4 h-4 mr-2" />
                    Seleccionar Archivo
                  </button>
                  <button 
                    onClick={() => setShowExcelUpload(false)}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de mantenimiento */}
      {showForm && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingMaintenance ? 'Editar Lote de Mantenimiento' : 'Nuevo Lote de Mantenimiento'}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información del lote */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <label className="form-label">Fecha de Orden *</label>
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

            {/* Tipo de trabajo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label className="form-label">Notas del Lote</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="form-input"
                placeholder="Notas adicionales sobre el lote de mantenimiento..."
              />
            </div>

            {/* Vehículos del lote */}
            <div className="form-group">
              <div className="flex justify-between items-center mb-4">
                <label className="form-label">Vehículos del Lote</label>
                <button
                  type="button"
                  onClick={addVehicle}
                  className="btn btn-sm btn-primary"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Agregar Vehículo
                </button>
              </div>
              
              {formData.vehicles.map((vehicle, vehicleIndex) => (
                <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-900">Vehículo {vehicleIndex + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeVehicle(vehicleIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="form-group">
                      <label className="form-label text-xs">N° Interno</label>
                      <input
                        type="text"
                        value={vehicle.internalNumber}
                        onChange={(e) => handleVehicleChange(vehicleIndex, 'internalNumber', e.target.value)}
                        className="form-input text-sm"
                        placeholder="001"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-xs">Matrícula</label>
                      <input
                        type="text"
                        value={vehicle.licensePlate}
                        onChange={(e) => handleVehicleChange(vehicleIndex, 'licensePlate', e.target.value)}
                        className="form-input text-sm"
                        placeholder="ABC-123"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-xs">Tarea Específica</label>
                      <input
                        type="text"
                        value={vehicle.task}
                        onChange={(e) => handleVehicleChange(vehicleIndex, 'task', e.target.value)}
                        className="form-input text-sm"
                        placeholder="Descripción de la tarea"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-xs">Odómetro</label>
                      <input
                        type="number"
                        value={vehicle.odometer}
                        onChange={(e) => handleVehicleChange(vehicleIndex, 'odometer', Number(e.target.value))}
                        className="form-input text-sm"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Insumos del vehículo */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="form-label text-sm">Insumos del Vehículo</label>
                      <button
                        type="button"
                        onClick={() => addSupplyToVehicle(vehicleIndex)}
                        className="btn btn-xs btn-secondary"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Agregar Insumo
                      </button>
                    </div>
                    
                    {vehicle.supplies.map((supply, supplyIndex) => (
                      <div key={supply.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-2 p-2 bg-gray-50 rounded">
                        <input
                          type="text"
                          value={supply.article}
                          onChange={(e) => handleSupplyChange(vehicleIndex, supplyIndex, 'article', e.target.value)}
                          className="form-input text-xs"
                          placeholder="Artículo"
                        />
                        <input
                          type="text"
                          value={supply.description}
                          onChange={(e) => handleSupplyChange(vehicleIndex, supplyIndex, 'description', e.target.value)}
                          className="form-input text-xs"
                          placeholder="Descripción"
                        />
                        <input
                          type="number"
                          value={supply.quantity}
                          onChange={(e) => handleSupplyChange(vehicleIndex, supplyIndex, 'quantity', Number(e.target.value))}
                          className="form-input text-xs"
                          placeholder="Cant."
                          min="1"
                        />
                        <input
                          type="number"
                          value={supply.unitCost}
                          onChange={(e) => handleSupplyChange(vehicleIndex, supplyIndex, 'unitCost', Number(e.target.value))}
                          className="form-input text-xs"
                          placeholder="Costo Unit."
                          step="0.01"
                        />
                        <input
                          type="number"
                          value={supply.totalCost}
                          className="form-input text-xs bg-gray-100"
                          disabled
                          step="0.01"
                        />
                        <button
                          type="button"
                          onClick={() => removeSupplyFromVehicle(vehicleIndex, supplyIndex)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    
                    <div className="text-right text-sm font-medium text-gray-700">
                      Costo del Vehículo: ${vehicle.vehicleCost.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="text-right text-lg font-semibold text-gray-900 border-t pt-4">
                Costo Total del Lote: ${formData.totalCost.toFixed(2)}
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
                disabled={formData.vehicles.length === 0}
              >
                {editingMaintenance ? 'Actualizar' : 'Guardar'} Lote de Mantenimiento
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de lotes de mantenimiento */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lotes de Mantenimiento Registrados</h3>
        
        {filteredMaintenances.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No hay lotes de mantenimiento registrados</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
            >
              Crear Primer Lote
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
                    Orden de Trabajo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehículos
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
                      {maintenance.workOrder}
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
                      {maintenance.vehicles.length} vehículos
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
