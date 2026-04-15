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
  const [numItens, setNumItens] = useState<number>(1);
  const [confirmado, setConfirmado] = useState(true);
  const [itens, setItens] = useState<ProdutoData[]>([
    { nome: '', custo: 0, precoVenda: 0, quantidadeVendida: 0 },
  ]);
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

  // 🔥 CORRIGIDO (TIPAGEM PERFEITA)
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
    setNumItens(1);
    setConfirmado(true);
    setItens([{ nome: '', custo: 0, precoVenda: 0, quantidadeVendida: 0 }]);
    setResultado(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* HEADER */}
        <header className="space-y-6 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-xl text-white shadow-lg">
              <Calculator size={30} />
            </div>

            <div>
              <h1 className="text-2xl font-black text-slate-800 uppercase">
                Sistema de Gestão Financeira
              </h1>
              <p className="text-sm text-blue-600 font-semibold">
                Controle Inteligente de Lucros, Custos e Desempenho
              </p>
            </div>
          </div>

          {/* MENU - AGORA VISÍVEL */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          <div className="bg-white p-10 rounded-3xl shadow-xl border text-center space-y-6">
            <h2 className="text-xl font-semibold text-slate-700">
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
                value={numItens === 0 ? '' : numItens}
                onChange={(e) => setNumItens(Number(e.target.value))}
                className="input-main"
                placeholder="0"
              />

              <button className="btn-primary">INICIAR ANÁLISE</button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="title-section">Dados Financeiros</h2>
              <span className="badge">ITENS</span>
            </div>

            {!mostrarResultado ? (
              /* FORMULÁRIO */
              <div className="space-y-6">
                <div className="grid grid-cols-4 gap-[10px] px-[15px] text-xs font-black text-slate-700 uppercase">
                  <span>Nome</span>
                  <span>Custo</span>
                  <span>Venda</span>
                  <span>Qtd</span>
                </div>

                {itens.map((item, index) => (
                  <div key={index} className="card-item">
                    <input
                      type="text"
                      placeholder="Nome"
                      onChange={(e) =>
                        handleInputChange(index, 'nome', e.target.value)
                      }
                    />

                    <input
                      type="number"
                      placeholder="Custo"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          'custo',
                          Number(e.target.value),
                        )
                      }
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
                    />
                  </div>
                ))}

                <button
                  onClick={() => setResultado(true)}
                  className="btn-success"
                >
                  <TrendingUp size={18} />
                  GERAR RELATÓRIO
                </button>
              </div>
            ) : (
              /* RESULTADO */
              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="card-result">
                    <p>Faturamento</p>
                    <h2 className="text-blue-600">
                      R$ {totalReceita.toFixed(2)}
                    </h2>
                  </div>

                  <div className="card-result">
                    <p>Custo</p>
                    <h2 className="text-red-500">R$ {totalCusto.toFixed(2)}</h2>
                  </div>

                  <div className="card-result destaque">
                    <p>Lucro</p>
                    <h2 className="text-green-600">
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
        }

        .input-main {
          width: 100%;
          text-align: center;
          font-size: 22px;
          padding: 15px;
          border-radius: 16px;
          border: 2px solid #e2e8f0;
          color: #1e293b;
          background-color: white;
          outline: none;
          transition: border-color 0.2s;
        }

        .input-main:focus {
          border-color: #2563eb;
        }

        .btn-primary {
          width: 100%;
          background: #2563eb;
          color: white;
          padding: 15px;
          border-radius: 16px;
          font-weight: 900;
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
          gap: 8px;
        }

        .card-item {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          background: white;
          padding: 15px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }

        .card-item input {
          padding: 10px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
        }

        .card-result {
          background: white;
          padding: 20px;
          border-radius: 20px;
          text-align: center;
        }

        .destaque {
          border: 2px solid #3b82f6;
        }

        .title-section {
          font-weight: bold;
          text-transform: uppercase;
          color: #1e293b;
        }

        .badge {
          background: #2563eb;
          color: white;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
        }
      `}</style>
    </div>
  );
}
