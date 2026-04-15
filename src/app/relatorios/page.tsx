'use client';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

import { Calendar, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useApp, Venda } from '../../context/AppContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function Relatorios() {
  const { vendas } = useApp();
  const [dataHora, setDataHora] = useState({ data: '', hora: '' });
  const [filtro, setFiltro] = useState<'semana' | 'mes' | 'ano'>('semana');

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

  const getChartData = () => {
    if (filtro === 'semana') {
      const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
      const valores = new Array(7).fill(0);

      vendas.forEach((v: Venda) => {
        // Converte string DD/MM/YYYY para Date compatível com o build
        const partes = v.data?.split('/') || [];
        const d =
          partes.length === 3
            ? new Date(
                Number(partes[2]),
                Number(partes[1]) - 1,
                Number(partes[0]),
              )
            : new Date();

        const diaIndex = d.getDay(); // 0 (Dom) a 6 (Sab)
        const idx = diaIndex === 0 ? 6 : diaIndex - 1; // Ajusta: Seg=0...Dom=6
        valores[idx] += v.total;
      });
      return { labels: dias, data: valores };
    }

    if (filtro === 'mes') {
      const nomesMeses = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ];
      const valores = new Array(12).fill(0);

      vendas.forEach((v: Venda) => {
        const partes = v.data?.split('/') || [];
        const d =
          partes.length === 3
            ? new Date(
                Number(partes[2]),
                Number(partes[1]) - 1,
                Number(partes[0]),
              )
            : new Date();

        valores[d.getMonth()] += v.total;
      });
      return { labels: nomesMeses, data: valores };
    }

    const anosMap: { [key: string]: number } = {};
    vendas.forEach((v: Venda) => {
      const partes = v.data?.split('/') || [];
      const d =
        partes.length === 3
          ? new Date(
              Number(partes[2]),
              Number(partes[1]) - 1,
              Number(partes[0]),
            )
          : new Date();
      const ano = d.getFullYear().toString();
      anosMap[ano] = (anosMap[ano] || 0) + v.total;
    });
    const labelsAnos = Object.keys(anosMap).sort();
    const valoresAnos = labelsAnos.map((ano) => anosMap[ano]);
    return { labels: labelsAnos, data: valoresAnos };
  };

  const { labels: chartLabels, data: chartValues } = getChartData();

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: `Vendas por ${filtro === 'semana' ? 'Dia da Semana' : filtro === 'mes' ? 'Mês' : 'Ano'} (R$)`,
        data: chartValues,
        backgroundColor: '#22c55e',
      },
    ],
  };

  const total = vendas.reduce((acc, v) => acc + v.total, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Dashboard Financeiro</h1>

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

      {/* CARD TOTAL */}
      <div className="bg-white p-4 rounded shadow">
        <p>Total de Vendas</p>
        <h2 className="text-3xl font-bold text-green-600">
          R$ {total.toFixed(2)}
        </h2>
      </div>

      {/* GRÁFICO */}
      <div className="bg-white p-6 rounded shadow">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFiltro('semana')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filtro === 'semana'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Segunda a Sexta
          </button>
          <button
            onClick={() => setFiltro('mes')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filtro === 'mes'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Mês
          </button>
          <button
            onClick={() => setFiltro('ano')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filtro === 'ano'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Ano
          </button>
        </div>
        <div className="relative h-[300px] w-full">
          <Bar
            data={data}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
}
