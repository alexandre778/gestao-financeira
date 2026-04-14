'use client';

import { getVendas } from '@/app/actions/financeiro';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface VendaItem {
  nome: string;
  qtd: number;
}

interface Venda {
  total: number;
  itens: VendaItem[];
}

export default function RelatoriosPage() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = (await getVendas()) as Venda[];
      setVendas(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-6">Carregando dados...</div>;

  // TOTAL
  const total = vendas.reduce((acc, v) => acc + (v.total || 0), 0);

  // AGRUPAR PRODUTOS VENDIDOS
  const produtosMap: Record<string, number> = {};

  vendas.forEach((venda) => {
    venda.itens?.forEach((item) => {
      if (!produtosMap[item.nome]) {
        produtosMap[item.nome] = 0;
      }
      produtosMap[item.nome] += item.qtd;
    });
  });

  const dataProdutos = Object.keys(produtosMap).map((nome) => ({
    name: nome,
    quantidade: produtosMap[nome],
  }));

  // VENDAS POR DIA (simulado)
  const vendasPorDia = vendas.map((v, i) => ({
    name: `Venda ${i + 1}`,
    total: v.total || 0,
  }));

  // CORES
  const cores = ['#2563eb', '#16a34a', '#f59e0b', '#ef4444', '#9333ea'];

  return (
    <div className="p-6 space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard Financeiro
        </h1>
        <p className="text-gray-500">Visão geral das vendas e desempenho</p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total de Vendas</p>
          <h2 className="text-3xl font-black text-blue-600">
            R$ {total.toFixed(2)}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Quantidade de Vendas</p>
          <h2 className="text-3xl font-black text-green-600">
            {vendas.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Ticket Médio</p>
          <h2 className="text-3xl font-black text-purple-600">
            R$ {(total / (vendas.length || 1)).toFixed(2)}
          </h2>
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GRÁFICO DE BARRAS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4">Produtos Mais Vendidos</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataProdutos}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantidade" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* GRÁFICO DE PIZZA */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4">Distribuição de Vendas</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataProdutos}
                dataKey="quantidade"
                nameKey="name"
                outerRadius={100}
                label
              >
                {dataProdutos.map((_, index) => (
                  <Cell key={index} fill={cores[index % cores.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* GRÁFICO DE EVOLUÇÃO */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h2 className="font-bold mb-4">Evolução das Vendas</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendasPorDia}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
