// src/app/(dashboard)/contas-receber/page.tsx
'use client';

import {
  Calendar,
  Clock,
  Edit3,
  Plus,
  Printer,
  Save,
  Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ContasReceber() {
  const [isEditing, setIsEditing] = useState(false);
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

  // Estados para os valores de resumo
  const [resumo, setResumo] = useState({
    entradas: 0,
    saidas: 0,
    saldo: 0,
  });

  // Estados para as categorias
  const [categorias, setCategorias] = useState({
    entradas: [] as { id: number; nome: string; valor: number }[],
    moradia: [] as { id: number; nome: string; valor: number }[],
    debitoPix: [] as { id: number; nome: string; valor: number }[],
    outras: [] as { id: number; nome: string; valor: number }[],
  });

  const [faturas, setFaturas] = useState<
    {
      id: number;
      cliente: string;
      valor: number;
      vencimento: string;
      status: string;
    }[]
  >([]);

  const statusStyle = {
    Atrasado: 'bg-red-100 text-red-700',
    Pendente: 'bg-yellow-100 text-yellow-700',
    Pago: 'bg-green-100 text-green-700',
  };

  const removerItem = (secao: keyof typeof categorias, id: number) => {
    setCategorias({
      ...categorias,
      [secao]: categorias[secao].filter((item) => item.id !== id),
    });
  };

  const adicionarItem = (secao: keyof typeof categorias) => {
    setIsEditing(true);
    const novoItem = { id: Date.now(), nome: '', valor: 0 };
    setCategorias({ ...categorias, [secao]: [...categorias[secao], novoItem] });
  };

  const adicionarFatura = () => {
    setIsEditing(true);
    const nova = {
      id: Date.now(),
      cliente: '',
      valor: 0,
      vencimento: '',
      status: 'Pendente',
    };
    setFaturas([...faturas, nova]);
  };

  const imprimirFatura = (fatura: (typeof faturas)[0]) => {
    const win = window.open('', 'PRINT', 'height=600,width=800');
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Fatura - ${fatura.cliente}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; line-height: 1.6; color: #333; }
            .header { border-bottom: 2px solid #2563eb; margin-bottom: 20px; padding-bottom: 10px; }
            .content { margin-top: 20px; }
            .footer { margin-top: 40px; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
            h1 { color: #2563eb; margin: 0; }
          </style>
        </head>
        <body>
          <div class="header"><h1>Recibo Financeiro</h1></div>
          <div class="content">
            <p><strong>Cliente:</strong> ${fatura.cliente || '---'}</p>
            <p><strong>Valor:</strong> R$ ${fatura.valor.toFixed(2)}</p>
            <p><strong>Vencimento:</strong> ${fatura.vencimento || '---'}</p>
            <p><strong>Status:</strong> ${fatura.status.toUpperCase()}</p>
          </div>
          <div class="footer">Gerado em ${dataHora.data} às ${dataHora.hora}</div>
          <script>window.print(); window.close();</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="p-6 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Contas a Receber & Resumo
        </h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 bg-slate-100 px-4 py-2 rounded-lg">
            <div className="flex items-center gap-1">
              <Calendar size={16} className="text-blue-600" />
              <span>{dataHora.data}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-blue-600" />
              <span>{dataHora.hora}</span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${
              isEditing ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
            }`}
          >
            {isEditing ? (
              <>
                <Save size={18} /> SALVAR
              </>
            ) : (
              <>
                <Edit3 size={18} /> EDITAR VALORES
              </>
            )}
          </button>
        </div>
      </header>

      {/* Dashboard de Resumo Rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Total Entradas
          </p>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black text-green-600">R$</span>
            <input
              type="number"
              className="text-2xl font-black text-green-600 w-full focus:outline-none bg-transparent"
              value={resumo.entradas}
              onChange={(e) =>
                setResumo({ ...resumo, entradas: Number(e.target.value) })
              }
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Total Saídas
          </p>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black text-red-600">R$</span>
            <input
              type="number"
              className="text-2xl font-black text-red-600 w-full focus:outline-none bg-transparent"
              value={resumo.saidas}
              onChange={(e) =>
                setResumo({ ...resumo, saidas: Number(e.target.value) })
              }
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Saldo Final
          </p>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black text-blue-600">R$</span>
            <input
              type="number"
              className="text-2xl font-black text-blue-600 w-full focus:outline-none bg-transparent"
              value={resumo.saldo}
              onChange={(e) =>
                setResumo({ ...resumo, saldo: Number(e.target.value) })
              }
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {/* Detalhamento Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(Object.keys(categorias) as Array<keyof typeof categorias>).map(
          (key) => {
            const secaoItems = categorias[key];
            const totalSecao = secaoItems.reduce(
              (acc, item) => acc + item.valor,
              0,
            );
            const isEntrada = key === 'entradas';

            return (
              <div
                key={key}
                className="bg-white p-5 rounded-lg shadow border border-slate-100 flex flex-col"
              >
                <h2
                  className={`font-bold mb-4 ${isEntrada ? 'text-green-700' : 'text-red-700'} border-b pb-2 flex justify-between`}
                >
                  <span className="capitalize">
                    {key === 'debitoPix' ? 'Débito/Pix' : key}
                  </span>
                  <span>R$ {totalSecao}</span>
                </h2>
                <ul className="text-sm space-y-2 flex-grow">
                  {secaoItems.map((item, idx) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center gap-2 text-gray-600"
                    >
                      {isEditing ? (
                        <>
                          <input
                            className="w-full border-b focus:ring-0 focus:outline-none"
                            value={item.nome}
                            onChange={(e) => {
                              const novas = { ...categorias };
                              novas[key][idx].nome = e.target.value;
                              setCategorias(novas);
                            }}
                          />
                          <input
                            type="number"
                            className="w-20 border-b text-right focus:outline-none"
                            value={item.valor}
                            onChange={(e) => {
                              const novas = { ...categorias };
                              novas[key][idx].valor = Number(e.target.value);
                              setCategorias(novas);
                            }}
                          />
                          <button
                            onClick={() => removerItem(key, item.id)}
                            className="text-red-400 hover:text-red-600 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      ) : (
                        <>
                          <span>{item.nome}</span>
                          <span>R$ {item.valor}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => adicionarItem(key)}
                  className="text-blue-500 text-xs cursor-pointer font-bold mt-4 hover:underline flex items-center gap-1"
                >
                  <Plus size={12} /> Adicionar
                </button>

                {key === 'outras' && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="flex justify-between font-bold text-gray-900 italic">
                      Saldo <span>R$ {resumo.saldo.toFixed(2)}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>

      {/* Tabela de Contas a Receber Existente */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-700">Faturas Pendentes</h3>
          <button
            onClick={adicionarFatura}
            className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-100 transition"
          >
            <Plus size={14} /> ADICIONAR FATURA
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-white border-b">
            <tr className="text-sm">
              <th className="p-4">Cliente</th>
              <th className="p-4">Vencimento</th>
              <th className="p-4">Valor</th>
              <th className="p-4">Status</th>
              <th className="p-4">Ação</th>
            </tr>
          </thead>
          <tbody>
            {faturas.map((f, idx) => (
              <tr key={f.id} className="border-b">
                <td className="p-4 font-medium">
                  {isEditing ? (
                    <input
                      className="w-full border-b focus:outline-none"
                      value={f.cliente}
                      onChange={(e) => {
                        const novas = [...faturas];
                        novas[idx].cliente = e.target.value;
                        setFaturas(novas);
                      }}
                    />
                  ) : (
                    f.cliente
                  )}
                </td>
                <td className="p-4">
                  {isEditing ? (
                    <input
                      className="w-full border-b focus:outline-none"
                      value={f.vencimento}
                      onChange={(e) => {
                        const novas = [...faturas];
                        novas[idx].vencimento = e.target.value;
                        setFaturas(novas);
                      }}
                    />
                  ) : (
                    f.vencimento
                  )}
                </td>
                <td className="p-4 font-bold">
                  {isEditing ? (
                    <input
                      type="number"
                      className="w-full border-b focus:outline-none"
                      value={f.valor}
                      onChange={(e) => {
                        const novas = [...faturas];
                        novas[idx].valor = Number(e.target.value);
                        setFaturas(novas);
                      }}
                    />
                  ) : (
                    `R$ ${f.valor.toFixed(2)}`
                  )}
                </td>
                <td className="p-4">
                  {isEditing ? (
                    <select
                      className="border rounded text-xs p-1"
                      value={f.status}
                      onChange={(e) => {
                        const novas = [...faturas];
                        novas[idx].status = e.target.value;
                        setFaturas(novas);
                      }}
                    >
                      <option value="Atrasado">ATRASADO</option>
                      <option value="Pendente">PENDENTE</option>
                      <option value="Pago">PAGO</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyle[f.status as keyof typeof statusStyle]}`}
                    >
                      {f.status.toUpperCase()}
                    </span>
                  )}
                </td>
                <td className="p-4 flex gap-2">
                  {isEditing && (
                    <button
                      onClick={() =>
                        setFaturas(faturas.filter((item) => item.id !== f.id))
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => imprimirFatura(f)}
                    className="text-gray-400 hover:text-blue-600 transition"
                    title="Imprimir Recibo"
                  >
                    <Printer size={16} />
                  </button>
                  <button className="text-blue-600 hover:underline text-sm">
                    Baixar Título
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
