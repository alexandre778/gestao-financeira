'use client';

import { RefreshCw, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface ProdutoData {
  nome: string;
  custo: number | '';
  precoVenda: number | '';
  quantidadeVendida: number | '';
}

export default function FinancialPanel() {
  const [itens, setItens] = useState<ProdutoData[]>([
    { nome: '', custo: '', precoVenda: '', quantidadeVendida: '' },
  ]);

  const [mostrarResultado, setMostrarResultado] = useState(false);

  const handleInputChange = <K extends keyof ProdutoData>(
    index: number,
    field: K,
    value: ProdutoData[K],
  ) => {
    const novos = [...itens];
    novos[index] = { ...novos[index], [field]: value };
    setItens(novos);
  };

  const addItem = () => {
    setItens([
      ...itens,
      { nome: '', custo: '', precoVenda: '', quantidadeVendida: '' },
    ]);
  };

  const toNumber = (v: number | '') => (v === '' ? 0 : v);

  const totalReceita = itens.reduce(
    (acc, p) => acc + toNumber(p.precoVenda) * toNumber(p.quantidadeVendida),
    0,
  );

  const totalCusto = itens.reduce(
    (acc, p) => acc + toNumber(p.custo) * toNumber(p.quantidadeVendida),
    0,
  );

  const lucro = totalReceita - totalCusto;

  const resetar = () => {
    setItens([{ nome: '', custo: '', precoVenda: '', quantidadeVendida: '' }]);
    setMostrarResultado(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Dados Financeiros</h1>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
            ITENS
          </span>
        </div>

        {!mostrarResultado ? (
          <>
            <div className="grid grid-cols-4 gap-2 text-xs font-bold text-gray-600 px-2">
              <span>Nome</span>
              <span>Custo</span>
              <span>Venda</span>
              <span>Qtd</span>
            </div>

            {itens.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-2 bg-white p-3 rounded-lg shadow"
              >
                <input
                  type="text"
                  placeholder="Nome"
                  value={item.nome}
                  onChange={(e) => handleInputChange(i, 'nome', e.target.value)}
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Custo"
                  value={item.custo}
                  onChange={(e) =>
                    handleInputChange(
                      i,
                      'custo',
                      e.target.value === '' ? '' : Number(e.target.value),
                    )
                  }
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Venda"
                  value={item.precoVenda}
                  onChange={(e) =>
                    handleInputChange(
                      i,
                      'precoVenda',
                      e.target.value === '' ? '' : Number(e.target.value),
                    )
                  }
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Qtd"
                  value={item.quantidadeVendida}
                  onChange={(e) =>
                    handleInputChange(
                      i,
                      'quantidadeVendida',
                      e.target.value === '' ? '' : Number(e.target.value),
                    )
                  }
                  className="input"
                />
              </div>
            ))}

            <div className="flex gap-3">
              <button onClick={addItem} className="btn">
                + Adicionar Item
              </button>
              <button
                onClick={() => setMostrarResultado(true)}
                className="btn-green"
              >
                <TrendingUp size={16} /> GERAR RELATÓRIO
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="card">
                <p>Faturamento</p>
                <h2>R$ {totalReceita.toFixed(2)}</h2>
              </div>
              <div className="card">
                <p>Custo</p>
                <h2>R$ {totalCusto.toFixed(2)}</h2>
              </div>
              <div className="card destaque">
                <p>Lucro</p>
                <h2>R$ {lucro.toFixed(2)}</h2>
              </div>
            </div>
            <button onClick={resetar} className="btn-reset">
              <RefreshCw size={16} /> NOVA ANÁLISE
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        .input {
          padding: 8px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          width: 100%;
        }
        .btn {
          background: #2563eb;
          color: white;
          padding: 10px 14px;
          border-radius: 10px;
        }
        .btn-green {
          background: #16a34a;
          color: white;
          padding: 10px 14px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-reset {
          width: 100%;
          margin-top: 10px;
          border: 2px dashed #94a3b8;
          padding: 12px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          gap: 6px;
        }
        .card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          font-weight: bold;
        }
        .destaque {
          border: 2px solid #22c55e;
        }
        h2 {
          font-size: 1.5rem;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
}
