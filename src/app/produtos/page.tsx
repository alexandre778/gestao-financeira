'use client';

import React, { useState } from 'react';
import { useApp, Produto } from '../../context/AppContext';

export default function ProdutosPage() {
  const { produtos, setProdutos } = useApp();

  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);

  // ✅ SEM id no estado (boa prática)
  const [novo, setNovo] = useState<Omit<Produto, 'id'>>({
    nome: '',
    custo: 0,
    preco: 0,
    estoque: 0,
  });

  // 🔥 ADICIONAR PRODUTO
  const adicionarProduto = () => {
    if (!novo.nome) return;

    setProdutos([
      ...produtos,
      {
        id: Date.now(), // ✅ ID GERADO AQUI
        ...novo,
      },
    ]);

    setNovo({
      nome: '',
      custo: 0,
      preco: 0,
      estoque: 0,
    });
  };

  // 🔥 REMOVER PRODUTO
  const removerProduto = (index: number) => {
    setProdutos(produtos.filter((_, i) => i !== index));
  };

  // 🔥 INICIAR EDIÇÃO
  const editarProduto = (index: number) => {
    const p = produtos[index];
    setNovo({
      nome: p.nome,
      custo: p.custo,
      preco: p.preco,
      estoque: p.estoque,
    });
    setEditandoIndex(index);
  };

  // 🔥 SALVAR EDIÇÃO
  const salvarEdicao = () => {
    if (editandoIndex === null) return;

    const lista = [...produtos];
    lista[editandoIndex] = {
      ...lista[editandoIndex],
      ...novo,
    };

    setProdutos(lista);
    setEditandoIndex(null);

    setNovo({
      nome: '',
      custo: 0,
      preco: 0,
      estoque: 0,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Produtos 📦</h1>

      {/* FORM */}
      <div className="flex flex-col gap-3 mb-6 bg-gray-50 p-4 rounded">
        <input
          type="text"
          placeholder="Nome"
          value={novo.nome}
          onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Custo"
          value={novo.custo}
          onChange={(e) =>
            setNovo({ ...novo, custo: Number(e.target.value) })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Preço"
          value={novo.preco}
          onChange={(e) =>
            setNovo({ ...novo, preco: Number(e.target.value) })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Estoque"
          value={novo.estoque}
          onChange={(e) =>
            setNovo({ ...novo, estoque: Number(e.target.value) })
          }
          className="border p-2 rounded"
        />

        {editandoIndex === null ? (
          <button
            onClick={adicionarProduto}
            className="bg-blue-600 text-white p-2 rounded"
          >
            Adicionar Produto
          </button>
        ) : (
          <button
            onClick={salvarEdicao}
            className="bg-yellow-500 text-white p-2 rounded"
          >
            Salvar Edição
          </button>
        )}
      </div>

      {/* LISTA */}
      {produtos.map((p, index) => (
        <div
          key={p.id}
          className="flex justify-between items-center border-b py-2"
        >
          <div>
            <p className="font-semibold">{p.nome}</p>
            <p className="text-sm text-gray-500">
              Custo: R$ {p.custo} | Venda: R$ {p.preco} | Estoque: {p.estoque}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => editarProduto(index)}
              className="bg-yellow-400 px-2 py-1 text-sm rounded"
            >
              Editar
            </button>

            <button
              onClick={() => removerProduto(index)}
              className="bg-red-500 text-white px-2 py-1 text-sm rounded"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
