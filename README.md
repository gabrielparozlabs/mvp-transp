# Sistema de Gestión de Mantenimiento - Transporte Público

Sistema web desarrollado en Next.js con Tailwind CSS para la gestión de mantenimiento de vehículos de transporte público.

## 🚀 Características

- **Next.js 14** con App Router
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **Context API** para manejo de estado
- **Diseño responsivo** y moderno

## 👥 Roles del Sistema

### 🏢 Empresa (Administrador)
- Carga de vehículos y mantenimientos
- Subida de reportes mensuales (1 por mes máximo)
- Gestión completa de datos
- Acceso a todas las funcionalidades

### 👁️ Auditor
- Solo lectura de toda la información
- Acceso a reportes y consultas
- No puede modificar datos

### 🔍 Inspector
- Solo lectura de información específica
- Acceso limitado a: Licencia, RTO, Cámaras, Aire Acondicionado, Calefacción y Seguro
- Vista especializada para inspecciones

## 🔐 Cuentas de Demostración

### Empresa (Administrador)
```
Email: admin@empresa.com
Contraseña: 123456
```

### Auditor
```
Email: auditor@sistema.com
Contraseña: 123456
```

### Inspector
```
Email: inspector@sistema.com
Contraseña: 123456
```

## 🛠️ Instalación y Uso

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar en desarrollo:**
```bash
npm run dev
```

3. **Abrir en el navegador:**
```
http://localhost:3000
```

4. **Hacer build para producción:**
```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── admin/             # Página de administración
│   ├── dashboard/         # Dashboard principal
│   ├── inspection/        # Página de inspección
│   ├── maintenance/       # Página de mantenimiento
│   ├── monthly-report/    # Página de reportes mensuales
│   ├── reports/           # Página de reportes
│   ├── vehicles/          # Página de vehículos
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes React
│   ├── Dashboard.tsx      # Componente del dashboard
│   ├── DashboardLayout.tsx # Layout del dashboard
│   ├── Inspection.tsx     # Componente de inspección
│   ├── Login.tsx          # Componente de login
│   ├── MonthlyReport.tsx  # Componente de reporte mensual
│   └── Vehicles.tsx       # Componente de vehículos
├── context/               # Context API
│   └── AppContext.tsx     # Contexto principal
└── types/                 # Tipos TypeScript
    └── index.ts           # Definiciones de tipos
```

## 🎨 Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **Lucide React** - Iconos
- **Headless UI** - Componentes accesibles

## 📱 Funcionalidades

### Para Empresas (Administrador)
- ✅ Dashboard personalizado con estadísticas
- ✅ Gestión de vehículos (CRUD)
- ✅ Registro de mantenimientos
- ✅ Carga de reportes mensuales
- ✅ Historial de reportes
- ✅ Validación de 1 reporte por mes

### Para Auditor
- ✅ Vista de solo lectura
- ✅ Acceso a toda la información
- ✅ Reportes y consultas
- ✅ Sin permisos de modificación

### Para Inspector
- ✅ Vista especializada de inspección
- ✅ Información específica: Licencia, RTO, Cámaras, etc.
- ✅ Alertas de vencimiento
- ✅ Solo lectura

## 🔧 Desarrollo

El sistema está diseñado para ser escalable y mantenible:

- **Componentes reutilizables** con TypeScript
- **Context API** para manejo de estado global
- **Tailwind CSS** para estilos consistentes
- **App Router** de Next.js para navegación
- **Responsive design** para todos los dispositivos

## 📄 Licencia

Este proyecto es un prototipo desarrollado para demostración del sistema de gestión de mantenimiento de transporte público.