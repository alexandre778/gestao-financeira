import React from 'react';
import Sidebar from '../components/Sidebar';
import { AppProvider } from '../context/AppContext';
import './globals.css';

export const metadata = {
  title: 'Sistema de Gestão Financeira',
  description: 'Controle de produtos, vendas e financeiro',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col md:flex-row min-h-screen bg-gray-100 text-gray-900">
        <AppProvider>
          <Sidebar />
          <main className="flex-1 h-screen overflow-y-auto p-4 md:p-0">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
