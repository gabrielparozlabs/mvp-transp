'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Upload, FileText, Calendar } from 'lucide-react';

interface MonthlyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MonthlyReportModal({ isOpen, onClose }: MonthlyReportModalProps) {
  const { user, uploadMonthlyReport } = useApp();
  const [formData, setFormData] = useState({
    month: '',
    notes: '',
    file: null as File | null,
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Simular carga del archivo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      uploadMonthlyReport({
        month: formData.month,
        company: user?.company || 'empresa1',
        uploadDate: new Date().toISOString(),
        status: 'completed',
        notes: formData.notes,
        file: formData.file,
      });

      // Reset form
      setFormData({
        month: '',
        notes: '',
        file: null,
      });

      onClose();
    } catch (error) {
      console.error('Error uploading report:', error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Cargar Reporte Mensual</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información del mes */}
          <div className="form-group">
            <label className="form-label">Mes del Reporte *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className="form-select pl-10"
                required
              >
                <option value="">Seleccionar mes</option>
                <option value="2024-01">Enero 2024</option>
                <option value="2024-02">Febrero 2024</option>
                <option value="2024-03">Marzo 2024</option>
                <option value="2024-04">Abril 2024</option>
                <option value="2024-05">Mayo 2024</option>
                <option value="2024-06">Junio 2024</option>
                <option value="2024-07">Julio 2024</option>
                <option value="2024-08">Agosto 2024</option>
                <option value="2024-09">Septiembre 2024</option>
                <option value="2024-10">Octubre 2024</option>
                <option value="2024-11">Noviembre 2024</option>
                <option value="2024-12">Diciembre 2024</option>
              </select>
            </div>
          </div>

          {/* Upload de archivo */}
          <div className="form-group">
            <label className="form-label">Archivo del Reporte *</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Subir archivo</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.xlsx,.xls,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">o arrastra y suelta aquí</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, XLSX, XLS, DOC, DOCX hasta 10MB
                </p>
                {formData.file && (
                  <div className="flex items-center justify-center mt-2 text-sm text-green-600">
                    <FileText className="w-4 h-4 mr-2" />
                    {formData.file.name}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notas adicionales */}
          <div className="form-group">
            <label className="form-label">Notas Adicionales</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="form-input"
              placeholder="Agregar comentarios o notas sobre el reporte..."
            />
          </div>

          {/* Información de la empresa */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Información de la Empresa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Empresa:</span> {user?.company === 'empresa1' ? 'Transporte Norte S.A.' : 'Transporte Sur S.A.'}
              </div>
              <div>
                <span className="font-medium">Fecha de Carga:</span> {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={isUploading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUploading || !formData.month || !formData.file}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Cargando...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Cargar Reporte
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
