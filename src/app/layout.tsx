import React from 'react';
import { AppProvider } from '../context/AppContext';
import './globals.css';
import Navbar from './Navbar';

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
      <body className="min-h-screen bg-[#030816] text-gray-100 antialiased">
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 w-full pt-16">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
