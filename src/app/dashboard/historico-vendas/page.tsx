'use client';

import { useApp } from '@/context/AppContext';

export default function HistoricoVendasPage() {
  const { vendas } = useApp();

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Histórico de Vendas
        </h1>
        <p className="text-gray-500 text-sm">
          Todas as vendas realizadas no sistema
        </p>
      </div>

      {/* LISTA */}
      {vendas.length === 0 ? (
        <div className="bg-white p-10 rounded-xl border border-dashed text-center text-gray-500">
          Nenhuma venda registrada ainda.
        </div>
      ) : (
        <div className="grid gap-4">
          {vendas.map((venda, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow border"
            >
              {/* TOPO */}
              <div className="flex justify-between border-b pb-2 mb-3">
                <span className="font-bold text-gray-600">
                  Venda #{index + 1}
                </span>

                <span className="font-black text-green-600">
                  R$ {venda.total.toFixed(2)}
                </span>
              </div>

              {/* ITENS */}
              <div className="space-y-1">
                {venda.itens.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>
                      {item.qtd}x {item.nome}
                    </span>

                    <span className="text-gray-500">
                      R$ {(item.preco * item.qtd).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
