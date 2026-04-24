'use client';

import { useApp } from '@/context/AppContext';

/**
 * Tipo da Venda (SEM any e com id)
 */
interface Venda {
  id: number;
  total: number;
  data: string;
}

export default function HistoricoVendas() {
  const { vendas } = useApp() as { vendas: Venda[] };

  const totalGeral = vendas.reduce((acc: number, v: Venda) => {
    return acc + v.total;
  }, 0);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-slate-50">
      {/* TÍTULO */}
      <h1 className="text-2xl font-bold text-slate-800">
        📊 Histórico de Vendas
      </h1>

      {/* TOTAL GERAL */}
      <div className="bg-green-100 p-4 rounded shadow">
        <p className="text-lg font-semibold text-green-700">
          Total Geral: R$ {totalGeral.toFixed(2)}
        </p>
      </div>

      {/* LISTA DE VENDAS */}
      {vendas.length === 0 ? (
        <p className="text-slate-500">Nenhuma venda registrada.</p>
      ) : (
        <div className="space-y-4">
          {[...vendas].reverse().map((v: Venda) => (
            <div
              key={v.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-slate-700">
                  Venda #{v.id}
                </p>
                <p className="text-sm text-slate-500">
                  {new Date(v.data).toLocaleString()}
                </p>
              </div>

              <div className="text-green-600 font-bold text-lg">
                R$ {v.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
