'use client';

import {
  Calculator,
  FileText,
  Package,
  RefreshCw,
  ShoppingCart,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

interface ProdutoData {
  nome: string;
  custo: number;
  precoVenda: number;
  quantidadeVendida: number;
}

export default function Home() {
  const [numItens, setNumItens] = useState<number>(0);
  const [confirmado, setConfirmado] = useState(false);
  const [itens, setItens] = useState<ProdutoData[]>([]);
  const [mostrarResultado, setResultado] = useState(false);

  const iniciarAnalise = (e: FormEvent) => {
    e.preventDefault();
    if (numItens > 0) {
      setItens(
        Array.from({ length: numItens }, () => ({
          nome: '',
          custo: 0,
          precoVenda: 0,
          quantidadeVendida: 0,
        })),
      );
      setConfirmado(true);
    }
  };

  const handleInputChange = <K extends keyof ProdutoData>(
    index: number,
    field: K,
    value: ProdutoData[K],
  ) => {
    const novosItens = [...itens];
    novosItens[index] = {
      ...novosItens[index],
      [field]: value,
    };
    setItens(novosItens);
  };

  const totalReceita = itens.reduce(
    (acc, p) => acc + p.precoVenda * p.quantidadeVendida,
    0,
  );

  const totalCusto = itens.reduce(
    (acc, p) => acc + p.custo * p.quantidadeVendida,
    0,
  );

  const lucroTotal = totalReceita - totalCusto;

  const reiniciar = () => {
    setNumItens(0);
    setConfirmado(false);
    setItens([]);
    setResultado(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <header className="space-y-6 border-b border-slate-200 pb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-xl text-white shadow-lg w-fit">
              <Calculator size={30} />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-800 uppercase">
                Sistema de Gestão Financeira
              </h1>
              <p className="text-sm text-blue-600 font-semibold">
                Controle Inteligente de Lucros, Custos e Desempenho
              </p>
            </div>
          </div>

          {/* MENU */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <Link href="/vendas" className="card-menu">
              <ShoppingCart size={18} />
              <span>Vendas</span>
            </Link>

            <Link href="/produtos" className="card-menu">
              <Package size={18} />
              <span>Produtos</span>
            </Link>

            <Link href="/caixa" className="card-menu">
              <Wallet size={18} />
              <span>Caixa</span>
            </Link>

            <Link href="/relatorios" className="card-menu">
              <FileText size={18} />
              <span>Relatórios</span>
            </Link>
          </div>
        </header>

        {/* INÍCIO */}
        {!confirmado ? (
          <div className="bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-slate-200 text-center space-y-6">
            <h2 className="text-lg md:text-xl font-semibold text-slate-700">
              Análise Financeira do Dia
            </h2>

            <form
              onSubmit={iniciarAnalise}
              className="max-w-xs mx-auto space-y-4"
            >
              <p className="text-sm text-slate-500">
                Quantos itens deseja analisar?
              </p>

              <input
                type="number"
                min="1"
                required
                value={numItens || ''}
                onChange={(e) => setNumItens(Number(e.target.value))}
                className="input-main"
                placeholder="0"
              />

              <button className="btn-primary">INICIAR ANÁLISE</button>
            </form>
          </div>
        ) : !mostrarResultado ? (
          /* FORMULÁRIO */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <h2 className="title-section">Dados Financeiros</h2>
              <span className="badge">{itens.length} ITENS</span>
            </div>

            {itens.map((item, index) => (
              <div key={index} className="card-item">
                <input
                  type="text"
                  placeholder="Nome"
                  onChange={(e) =>
                    handleInputChange(index, 'nome', e.target.value)
                  }
                  className="input-item"
                />

                <input
                  type="number"
                  placeholder="Custo"
                  onChange={(e) =>
                    handleInputChange(index, 'custo', Number(e.target.value))
                  }
                  className="input-item"
                />

                <input
                  type="number"
                  placeholder="Venda"
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      'precoVenda',
                      Number(e.target.value),
                    )
                  }
                  className="input-item"
                />

                <input
                  type="number"
                  placeholder="Qtd"
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      'quantidadeVendida',
                      Number(e.target.value),
                    )
                  }
                  className="input-item"
                />
              </div>
            ))}

            <button onClick={() => setResultado(true)} className="btn-success">
              <TrendingUp size={18} />
              GERAR RELATÓRIO
            </button>
          </div>
        ) : (
          /* RESULTADO */
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="card-result">
                <p className="text-sm text-slate-500 font-medium">
                  Faturamento
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-600">
                  R$ {totalReceita.toFixed(2)}
                </h2>
              </div>

              <div className="card-result">
                <p className="text-sm text-slate-500 font-medium">Custo</p>
                <h2 className="text-2xl md:text-3xl font-bold text-red-500">
                  R$ {totalCusto.toFixed(2)}
                </h2>
              </div>

              <div className="card-result destaque">
                <p className="text-sm text-slate-500 font-medium">
                  Lucro Líquido
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-green-600">
                  R$ {lucroTotal.toFixed(2)}
                </h2>
              </div>
            </div>

            <button onClick={reiniciar} className="btn-reset">
              <RefreshCw size={18} />
              NOVA ANÁLISE
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .card-menu {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          font-size: 12px;
          font-weight: bold;
          transition: all 0.2s;
          justify-content: center;
        }

        .card-menu:hover {
          background: #f8fafc;
          border-color: #3b82f6;
          transform: translateY(-2px);
        }

        .input-main {
          width: 100%;
          text-align: center;
          padding: 15px;
          border-radius: 16px;
          border: 2px solid #e2e8f0;
        }

        .btn-primary {
          width: 100%;
          background: #2563eb;
          color: white;
          padding: 15px;
          border-radius: 16px;
          font-weight: 900;
          transition: opacity 0.2s;
        }

        .btn-primary:hover {
          opacity: 0.9;
        }

        .btn-success {
          width: 100%;
          background: #16a34a;
          color: white;
          padding: 15px;
          border-radius: 16px;
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .btn-reset {
          width: 100%;
          border: 2px dashed #cbd5f5;
          padding: 15px;
          border-radius: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          color: #64748b;
          gap: 8px;
        }

        .btn-reset:hover {
          background: #f1f5f9;
        }

        /* RESPONSIVO 🔥 */
        .card-item {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          background: white;
          padding: 20px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }

        @media (min-width: 768px) {
          .card-item {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .card-item {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .input-item {
          width: 100%;
          padding: 10px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          outline: none;
          transition: border-color 0.2s;
        }

        .input-item:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        .card-result {
          background: white;
          padding: 30px 20px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .destaque {
          border: 2px solid #3b82f6;
        }

        .title-section {
          font-weight: bold;
          text-transform: uppercase;
        }

        .badge {
          background: #e2e8f0;
          padding: 5px 10px;
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}
