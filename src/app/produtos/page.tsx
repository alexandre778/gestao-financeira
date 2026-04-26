'use client';

import { Edit3, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { Produto, useApp } from '../../context/AppContext';

export default function ProdutosPage() {
  const { produtos, setProdutos } = useApp();
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);

  const [novo, setNovo] = useState<Produto>({
    nome: '',
    custo: 0,
    preco: 0,
    estoque: 0,
  });

  const salvar = () => {
    if (editandoIndex !== null) {
      const novosProdutos = [...produtos];
      novosProdutos[editandoIndex] = novo;
      setProdutos(novosProdutos);
    } else {
      setProdutos([...produtos, novo]);
    }
    limparForm();
  };

  const editar = (index: number) => {
    setNovo(produtos[index]);
    setEditandoIndex(index);
  };

  const limparForm = () => {
    setNovo({ nome: '', custo: 0, preco: 0, estoque: 0 });
    setEditandoIndex(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Produtos</h1>

      <div className="grid gap-3 max-w-md">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Nome do Produto
          </label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Ex: Camiseta"
            value={novo.nome}
            onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Preço de Custo (R$)
          </label>
          <input
            className="w-full border p-2 rounded"
            placeholder="0.00"
            type="number"
            value={novo.custo}
            onChange={(e) =>
              setNovo({ ...novo, custo: Number(e.target.value) })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Preço de Venda (R$)
          </label>
          <input
            className="w-full border p-2 rounded"
            placeholder="0.00"
            type="number"
            value={novo.preco}
            onChange={(e) =>
              setNovo({ ...novo, preco: Number(e.target.value) })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Quantidade em Estoque
          </label>
          <input
            className="w-full border p-2 rounded"
            placeholder="0"
            type="number"
            value={novo.estoque}
            onChange={(e) =>
              setNovo({ ...novo, estoque: Number(e.target.value) })
            }
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={salvar}
            className="flex-grow bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 transition"
          >
            {editandoIndex !== null ? 'Salvar Alterações' : 'Adicionar Produto'}
          </button>

          <button
            onClick={limparForm}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition flex items-center gap-1 px-3 font-bold"
            title="Limpar campos"
          >
            <RotateCcw size={18} />
            Limpar
          </button>
        </div>
      </div>

      <div className="mt-6">
        {produtos.map((p, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              {p.nome} - R$ {p.preco} - {p.estoque} un
            </span>
            <button
              onClick={() => editar(i)}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-bold"
            >
              <Edit3 size={16} />
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
