import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sistema de Gestión de Mantenimiento - Transporte Público',
  description: 'Sistema para gestión de mantenimiento de vehículos de transporte público',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}