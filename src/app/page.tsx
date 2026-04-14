'use client';

import {
  Calculator,
  FileText,
  Package,
  RefreshCw,
  ShoppingCart,
  TrendingUp,
  Wallet,
  Menu,
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
  const [menuOpen, setMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      {/* MENU MOBILE */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 bg-blue-600 text-white rounded-lg"
        >
          <Menu />
        </button>
        <span className="font-bold">AGM//SW</span>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white p-5 transform transition-transform z-50
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-8">AGM//SW</h2>

        <nav className="flex flex-col gap-4">
          <Link href="/" className="menu-item">
            Painel
          </Link>
          <Link href="/produtos" className="menu-item">
            Produtos
          </Link>
          <Link href="/vendas" className="menu-item">
            Vendas
          </Link>
          <Link href="/caixa" className="menu-item">
            Caixa
          </Link>
          <Link href="/relatorios" className="menu-item">
            Relatórios
          </Link>
        </nav>
      </div>

      {/* CONTEÚDO */}
      <div className="md:ml-64 p-4 md:p-8 space-y-8">
        {/* HEADER */}
        <header className="space-y-6 border-b border-slate-200 pb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-xl text-white shadow-lg w-fit">
              <Calculator size={30} />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-800 uppercase">
                Sistema de Gestão Financeira
              </h1>
              <p className="text-sm text-blue-600 font-semibold">
                Controle de Lucros, Custos e Desempenho
              </p>
            </div>
          </div>
        </header>

        {/* INÍCIO */}
        {!confirmado ? (
          <div className="bg-white p-6 md:p-12 rounded-3xl shadow border text-center space-y-6">
            <h2 className="text-lg md:text-xl font-semibold">
              Análise Financeira do Dia
            </h2>

            <form
              onSubmit={iniciarAnalise}
              className="max-w-xs mx-auto space-y-4"
            >
              <input
                type="number"
                min="1"
                required
                value={numItens || ''}
                onChange={(e) => setNumItens(Number(e.target.value))}
                className="input-main"
                placeholder="Quantidade de itens"
              />

              <button className="btn-primary">INICIAR</button>
            </form>
          </div>
        ) : !mostrarResultado ? (
          <div className="space-y-6">
            <h2 className="font-bold text-lg">Dados Financeiros</h2>

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
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="card-result">
                <p>Faturamento</p>
                <h2 className="text-blue-600">
                  R$ {totalReceita.toFixed(2)}
                </h2>
              </div>

              <div className="card-result">
                <p>Custo</p>
                <h2 className="text-red-500">
                  R$ {totalCusto.toFixed(2)}
                </h2>
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

      <style jsx>{`
        .menu-item {
          padding: 10px;
          border-radius: 8px;
          transition: 0.2s;
        }

        .menu-item:hover {
          background: #1e293b;
        }

        .input-main {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          border: 1px solid #ccc;
        }

        .btn-primary {
          width: 100%;
          background: #2563eb;
          color: white;
          padding: 12px;
          border-radius: 12px;
          font-weight: bold;
        }

        .btn-success {
          width: 100%;
          background: #16a34a;
          color: white;
          padding: 12px;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .btn-reset {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: 1px dashed #ccc;
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .card-item {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          background: white;
          padding: 15px;
          border-radius: 12px;
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
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .card-result {
          background: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
        }

        .destaque {
          border: 2px solid #3b82f6;
        }
      `}</style>
    </div>
  );
}
