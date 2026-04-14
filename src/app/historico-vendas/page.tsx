'use client';

import { useApp } from '@/context/AppContext';

export default function HistoricoVendas() {
  const { vendas } = useApp();

  const totalGeral = vendas.reduce((acc, v) => acc + v.total, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Histórico de Vendas</h1>

      {/* RESUMO FINANCEIRO */}
      <div className="bg-white p-4 rounded shadow">
        <p>Total Geral Vendido</p>
        <h2 className="text-3xl font-bold text-green-600">
          R$ {totalGeral.toFixed(2)}
        </h2>
      </div>

      {/* LISTA */}
      {vendas.map((v, i) => (
        <div key={i} className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">{v.data}</p>
          <p className="font-bold text-green-600">R$ {v.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
