'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Eye } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function MonthlyReport() {
  const { monthlyReports, uploadMonthlyReport } = useApp();
  const [formData, setFormData] = useState({
    month: '2024-01',
    notes: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      uploadMonthlyReport({
        month: formData.month,
        company: 'Transporte Norte S.A.',
        uploadDate: new Date().toLocaleDateString(),
        status: 'completed',
        notes: formData.notes,
        file,
      });
      setFormData({ month: '2024-01', notes: '' });
      setFile(null);
      alert('Reporte cargado exitosamente');
    }
  };

  const sampleReports = [
    {
      id: '1',
      month: 'Diciembre 2023',
      uploadDate: '15/12/2023',
      status: 'completed' as const,
      notes: 'Reporte sin observaciones',
    },
    {
      id: '2',
      month: 'Noviembre 2023',
      uploadDate: '20/11/2023',
      status: 'completed' as const,
      notes: 'Mantenimientos preventivos realizados',
    },
  ];

  const allReports = [...monthlyReports, ...sampleReports];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reporte Mensual de Mantenimiento</h1>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-sm text-gray-500">
              Período: <strong>Enero 2024</strong>
            </span>
            <span className="status-badge status-pending">Pendiente</span>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="card border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cargar Reporte Mensual</h3>
          <p className="text-gray-600 mb-6">
            Sube tu reporte de mantenimientos del mes actual. Solo se permite un reporte por mes.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="form-group">
              <label className="form-label">Mes del Reporte</label>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                className="form-select"
                required
              >
                <option value="2024-01">Enero 2024</option>
                <option value="2024-02">Febrero 2024</option>
                <option value="2024-03">Marzo 2024</option>
                <option value="2024-04">Abril 2024</option>
                <option value="2024-05">Mayo 2024</option>
                <option value="2024-06">Junio 2024</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Archivo del Reporte</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".xlsx,.xls,.csv"
                className="form-input"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Formatos permitidos: Excel (.xlsx, .xls), CSV (.csv)
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Observaciones (Opcional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="form-input"
                placeholder="Agregar observaciones sobre el reporte..."
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              <Upload className="w-4 h-4 mr-2" />
              Cargar Reporte
            </button>
          </form>
        </div>
      </div>

      {/* Report History */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial de Reportes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Carga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Observaciones
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.uploadDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`status-badge ${
                      report.status === 'completed' ? 'status-completed' : 'status-pending'
                    }`}>
                      {report.status === 'completed' ? 'Completado' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.notes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Download className="w-4 h-4" />
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
