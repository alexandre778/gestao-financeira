'use client';

import { Edit3, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { Produto, useApp } from '../../context/AppContext';

export default function ProdutosPage() {
  const { produtos, setProdutos } = useApp();
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);

  const [novo, setNovo] = useState<Omit<Produto, 'id'>>({
    nome: '',
    custo: 0,
    preco: 0,
    estoque: 0,
  });

  const salvar = () => {
    if (editandoIndex !== null) {
      const novosProdutos = [...produtos];

      novosProdutos[editandoIndex] = {
        ...novosProdutos[editandoIndex],
        ...novo,
      };

      setProdutos(novosProdutos);
    } else {
      setProdutos([
        ...produtos,
        {
          id: Date.now(),
          ...novo,
        },
      ]);
    }

    limparForm();
  };

  const editar = (index: number) => {
    const p = produtos[index];

    setNovo({
      nome: p.nome,
      custo: p.custo,
      preco: p.preco,
      estoque: p.estoque,
    });

    setEditandoIndex(index);
  };

  const limparForm = () => {
    setNovo({
      nome: '',
      custo: 0,
      preco: 0,
      estoque: 0,
    });

    setEditandoIndex(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-md mx-auto space-y-6">

        {/* TÍTULO */}
        <h1 className="text-2xl font-bold">
          Cadastro de Produtos 📦
        </h1>

        {/* FORMULÁRIO */}
        <div className="space-y-4">

          {/* Nome */}
          <div>
            <label className="text-sm text-slate-300">
              Nome do Produto
            </label>
            <input
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Camiseta"
              value={novo.nome}
              onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
            />
          </div>

          {/* Custo */}
          <div>
            <label className="text-sm text-slate-300">
              Preço de Custo (R$)
            </label>
            <input
              type="number"
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={novo.custo}
              onChange={(e) =>
                setNovo({ ...novo, custo: Number(e.target.value) })
              }
            />
          </div>

          {/* Venda */}
          <div>
            <label className="text-sm text-slate-300">
              Preço de Venda (R$)
            </label>
            <input
              type="number"
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={novo.preco}
              onChange={(e) =>
                setNovo({ ...novo, preco: Number(e.target.value) })
              }
            />
          </div>

          {/* Estoque */}
          <div>
            <label className="text-sm text-slate-300">
              Quantidade em Estoque
            </label>
            <input
              type="number"
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={novo.estoque}
              onChange={(e) =>
                setNovo({ ...novo, estoque: Number(e.target.value) })
              }
            />
          </div>

          {/* BOTÕES */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={salvar}
              className="flex-1 bg-blue-600 hover:bg-blue-700 transition p-2 rounded font-semibold"
            >
              {editandoIndex !== null
                ? 'Salvar Alterações'
                : 'Adicionar Produto'}
            </button>

            <button
              onClick={limparForm}
              className="bg-slate-600 hover:bg-slate-700 transition px-4 rounded flex items-center gap-2"
            >
              <RotateCcw size={18} />
              Limpar
            </button>
          </div>
        </div>

        {/* LISTA */}
        <div className="pt-6 space-y-2">
          {produtos.map((p, i) => (
            <div
              key={p.id}
              className="flex justify-between items-center border-b border-slate-700 pb-2"
            >
              <span className="text-sm text-slate-300">
                {p.nome} - R$ {p.preco} - {p.estoque} un
              </span>

              <button
                onClick={() => editar(i)}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
              >
                <Edit3 size={16} />
                Editar
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
