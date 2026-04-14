'use client';
import { Calendar, Clock, Receipt } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function CaixaPage() {
  const { vendas } = useApp();
  const [dataHora, setDataHora] = useState({ data: '', hora: '' });

  useEffect(() => {
    const atualizar = () => {
      const agora = new Date();
      setDataHora({
        data: agora.toLocaleDateString('pt-BR'),
        hora: agora.toLocaleTimeString('pt-BR'),
      });
    };
    atualizar();
    const timer = setInterval(atualizar, 1000);
    return () => clearInterval(timer);
  }, []);

  const total = vendas.reduce((acc, v) => acc + v.total, 0);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Caixa</h1>

        <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 bg-slate-100 px-4 py-2 rounded-lg w-fit">
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-blue-600" />
            <span>{dataHora.data}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-blue-600" />
            <span>{dataHora.hora}</span>
          </div>
        </div>
      </div>

      {/* Card de Saldo Total */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 mb-8 text-center md:text-left">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">
          Saldo Total em Caixa
        </p>
        <h2 className="text-5xl font-black text-green-600">
          R$ {total.toFixed(2)}
        </h2>
      </div>

      {/* Histórico de Transações (Ligação com Vendas) */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center gap-2">
          <Receipt size={20} className="text-slate-400" />
          <h3 className="font-bold text-slate-700">Histórico de Vendas</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white border-b text-xs uppercase text-slate-400 font-bold">
              <tr>
                <th className="p-4">Data</th>
                <th className="p-4">Hora</th>
                <th className="p-4">Itens</th>
                <th className="p-4 text-right">Valor Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vendas.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-10 text-center text-slate-400 italic"
                  >
                    Nenhuma venda registrada até o momento.
                  </td>
                </tr>
              ) : (
                vendas.map((venda, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 text-slate-600">{venda.data}</td>
                    <td className="p-4 text-slate-600">{venda.hora}</td>
                    <td className="p-4 text-slate-600">
                      {venda.itens?.length || 0} prod.
                    </td>
                    <td className="p-4 text-right font-bold text-green-600">
                      R$ {venda.total.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
