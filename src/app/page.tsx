'use client';

import {
  Calculator,
  FileText,
  Package,
  ShoppingCart,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

interface ProdutoData {
  nome: string;
  custo: number | '';
  precoVenda: number | '';
  quantidadeVendida: number | '';
}

export default function Home() {
  const [numItens, setNumItens] = useState<number>(1);
  const [confirmado, setConfirmado] = useState(false);
  const [itens, setItens] = useState<ProdutoData[]>([
    { nome: '', custo: '', precoVenda: '', quantidadeVendida: '' },
  ]);
  const [mostrarResultado, setResultado] = useState(false);

  const iniciarAnalise = (e: FormEvent) => {
    e.preventDefault();
    if (numItens > 0) {
      setItens(
        Array.from({ length: numItens }, () => ({
          nome: '',
          custo: '',
          precoVenda: '',
          quantidadeVendida: '',
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

  // 🔥 conversão segura (evita NaN)
  const toNumber = (value: number | '') => (value === '' ? 0 : value);

  const totalReceita = itens.reduce(
    (acc, p) => acc + toNumber(p.precoVenda) * toNumber(p.quantidadeVendida),
    0,
  );

  const totalCusto = itens.reduce(
    (acc, p) => acc + toNumber(p.custo) * toNumber(p.quantidadeVendida),
    0,
  );

  const lucroTotal = totalReceita - totalCusto;

  const reiniciar = () => {
    setNumItens(1);
    setConfirmado(false);
    setItens([{ nome: '', custo: '', precoVenda: '', quantidadeVendida: '' }]);
    setResultado(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
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
                Controle Inteligente de Lucros
              </p>
            </div>
          </div>

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

        {!confirmado ? (
          <form onSubmit={iniciarAnalise}>
            <input
              type="number"
              min="1"
              value={numItens}
              onChange={(e) => setNumItens(Number(e.target.value))}
            />
            <button>Iniciar</button>
          </form>
        ) : (
          <div className="space-y-6">
            {!mostrarResultado ? (
              <>
                {itens.map((item, index) => (
                  <div key={index} className="card-item">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={item.nome}
                      onChange={(e) =>
                        handleInputChange(index, 'nome', e.target.value)
                      }
                    />

                    <input
                      type="number"
                      placeholder="Custo"
                      value={item.custo}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          'custo',
                          e.target.value === '' ? '' : Number(e.target.value),
                        )
                      }
                    />

                    <input
                      type="number"
                      placeholder="Venda"
                      value={item.precoVenda}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          'precoVenda',
                          e.target.value === '' ? '' : Number(e.target.value),
                        )
                      }
                    />

                    <input
                      type="number"
                      placeholder="Qtd"
                      value={item.quantidadeVendida}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          'quantidadeVendida',
                          e.target.value === '' ? '' : Number(e.target.value),
                        )
                      }
                    />
                  </div>
                ))}

                <button onClick={() => setResultado(true)}>
                  GERAR RELATÓRIO
                </button>

                {/* 👇 PREVIEW EM TEMPO REAL */}
                <div>
                  {itens.map((item, i) => (
                    <p key={i}>
                      {item.nome || '---'} | Qtd: {item.quantidadeVendida || 0}
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <p>Receita: R$ {totalReceita.toFixed(2)}</p>
                <p>Custo: R$ {totalCusto.toFixed(2)}</p>
                <p>Lucro: R$ {lucroTotal.toFixed(2)}</p>

                <button onClick={reiniciar}>Resetar</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
