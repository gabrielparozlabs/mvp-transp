'use client';

import { AlertTriangle, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function Inspection() {
  const inspectionData = [
    {
      vehicle: '001',
      licensePlate: 'ABC-123',
      company: 'Transporte Norte S.A.',
      rto: '15/06/2024',
      license: '20/12/2024',
      cameras: true,
      heating: true,
      airConditioning: false,
      insurance: true,
      insuranceType: 'Responsabilidad Civil',
      insuranceExpiry: '30/11/2024',
    },
    {
      vehicle: '002',
      licensePlate: 'DEF-456',
      company: 'Transporte Sur S.A.',
      rto: '10/08/2024',
      license: '15/03/2025',
      cameras: false,
      heating: false,
      airConditioning: true,
      insurance: true,
      insuranceType: 'Todo Riesgo',
      insuranceExpiry: '25/10/2024',
    },
  ];

  const alerts = [
    {
      type: 'warning',
      message: 'Vehículo 001 - RTO vence en 15 días',
      icon: AlertTriangle,
    },
    {
      type: 'danger',
      message: 'Vehículo 002 - Seguro vence en 5 días',
      icon: AlertCircle,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Información de Inspección</h1>
        <p className="mt-1 text-sm text-gray-500">
          Como Inspector, puede visualizar únicamente la información de Licencia de Conducir, RTO, Cámaras, Aire Acondicionado, Calefacción y Seguro.
        </p>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Información disponible:</strong> Licencia de Conducir, RTO, Cámaras, Aire Acondicionado, Calefacción y Seguro.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="form-group">
          <label className="form-label">Filtrar por Vehículo</label>
          <select className="form-select w-64">
            <option value="">Todos los vehículos</option>
            <option value="001">001 - ABC-123</option>
            <option value="002">002 - DEF-456</option>
          </select>
        </div>
      </div>

      {/* Inspection Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Matrícula
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RTO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Licencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cámaras
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Calefacción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aire Acond.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seguro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo Seguro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Venc. Seguro
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inspectionData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.vehicle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.licensePlate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.rto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.license}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.cameras ? (
                      <span className="status-badge status-completed flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Sí
                      </span>
                    ) : (
                      <span className="status-badge status-danger flex items-center">
                        <XCircle className="w-3 h-3 mr-1" />
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.heating ? (
                      <span className="status-badge status-completed flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Sí
                      </span>
                    ) : (
                      <span className="status-badge status-danger flex items-center">
                        <XCircle className="w-3 h-3 mr-1" />
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.airConditioning ? (
                      <span className="status-badge status-completed flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Sí
                      </span>
                    ) : (
                      <span className="status-badge status-danger flex items-center">
                        <XCircle className="w-3 h-3 mr-1" />
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.insurance ? (
                      <span className="status-badge status-completed flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Sí
                      </span>
                    ) : (
                      <span className="status-badge status-danger flex items-center">
                        <XCircle className="w-3 h-3 mr-1" />
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.insuranceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.insuranceExpiry}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas de Vencimiento</h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-400'
                    : 'bg-red-50 border-red-400'
                }`}
              >
                <div className="flex items-center">
                  <Icon
                    className={`w-5 h-5 mr-3 ${
                      alert.type === 'warning' ? 'text-yellow-600' : 'text-red-600'
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      alert.type === 'warning' ? 'text-yellow-800' : 'text-red-800'
                    }`}
                  >
                    {alert.message}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
