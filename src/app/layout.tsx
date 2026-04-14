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
      <body className="flex min-h-screen bg-gray-100 text-gray-900">
        <AppProvider>
          <Sidebar />
          <main className="flex-1 h-screen overflow-auto">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
