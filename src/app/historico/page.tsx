'use client';

import { useApp } from '@/context/AppContext';

export default function HistoricoVendas() {
  const { vendas } = useApp();

  const totalGeral = vendas.reduce((acc, v) => acc + v.total, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Histórico de Vendas</h1>

      <p>Total Geral: R$ {totalGeral.toFixed(2)}</p>

      {[...vendas].reverse().map((v) => (
        <div key={v.id}>
          <p>Data: {v.data} {v.hora}</p>
          <p>Total: R$ {v.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
