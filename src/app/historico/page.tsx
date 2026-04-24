'use client';

import { useApp } from '@/context/AppContext';

export default function HistoricoVendas() {
  const { vendas = [] } = useApp() || {};

  const totalGeral = vendas.reduce((acc, v) => acc + (Number(v.total) || 0), 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Histórico de Vendas</h1>

      {/* RESUMO FINANCEIRO */}
      <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-600">
        <p className="text-gray-600">Total Geral Vendido</p>
        <h2 className="text-3xl font-bold text-green-600">
          {formatCurrency(totalGeral)}
        </h2>
      </div>

      {/* LISTA */}
      <div className="space-y-4">
        {vendas.length === 0 ? (
          <p className="text-gray-500 italic text-center py-4">
            Nenhuma venda registrada.
          </p>
        ) : (
          [...vendas].reverse().map((v, i) => (
            <div
              key={v.id || i}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-500">
                  {v.data} - {v.hora}
                </p>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-slate-800">
                    Venda #{vendas.length - i}
                  </p>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase">
                    {v.itens?.length || 0} Itens
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {v.itens?.map((it: any, idx: number) => (
                    <span
                      key={idx}
                      className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200"
                    >
                      {it.qtd}x {it.nome}
                    </span>
                  ))}
                </div>
              </div>
              <p className="font-bold text-green-600">
                {formatCurrency(v.total)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
