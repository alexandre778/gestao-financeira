"use client";

import { useEffect, useState } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function fetchProdutos() {
      const res = await fetch("/api/produtos");
      const data = await res.json();
      setProdutos(data);
    }
    fetchProdutos();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="p-4 font-semibold text-sm text-slate-700">Produto</th>
            <th className="p-4 font-semibold text-sm text-slate-700">Preço</th>
            <th className="p-4 font-semibold text-sm text-slate-700">Estoque</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {produtos.map((produto) => (
            <tr key={produto.id} className="hover:bg-slate-50">
              <td className="p-4 text-sm text-slate-600">{produto.nome}</td>
              <td className="p-4 text-sm text-slate-600 font-medium">R$ {produto.preco.toFixed(2)}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 text-xs rounded-full font-bold ${
                    produto.estoque > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {produto.estoque > 0 ? "Em Estoque" : "Esgotado"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}