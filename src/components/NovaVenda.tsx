'use client';

import { useEffect, useState } from 'react';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

interface ItemSelecionado {
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export default function NovaVenda() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [itensSelecionados, setItensSelecionados] = useState<ItemSelecionado[]>(
    [],
  );
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Buscar produtos do banco
  useEffect(() => {
    async function fetchProdutos() {
      const res = await fetch('/api/produtos');
      const data = await res.json();
      setProdutos(data);
    }
    fetchProdutos();
  }, []);

  // Atualizar total sempre que itens mudarem
  useEffect(() => {
    const novoTotal = itensSelecionados.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0,
    );
    setTotal(novoTotal);
  }, [itensSelecionados]);

  // Adicionar produto � venda
  const adicionarItem = (produto: Produto) => {
    const existe = itensSelecionados.find(
      (item) => item.produtoId === produto.id,
    );
    if (existe) {
      // Atualiza quantidade, sem ultrapassar estoque
      setItensSelecionados((prev) =>
        prev.map((item) =>
          item.produtoId === produto.id
            ? {
                ...item,
                quantidade: Math.min(item.quantidade + 1, produto.estoque),
              }
            : item,
        ),
      );
    } else {
      setItensSelecionados((prev) => [
        ...prev,
        {
          produtoId: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade: 1,
        },
      ]);
    }
  };

  // Remover produto da venda
  const removerItem = (produtoId: number) => {
    setItensSelecionados((prev) =>
      prev.filter((item) => item.produtoId !== produtoId),
    );
  };

  // Confirmar venda
  const confirmarVenda = async () => {
    if (itensSelecionados.length === 0)
      return alert('Selecione pelo menos um item!');

    setLoading(true);
    try {
      const res = await fetch('/api/venda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itens: itensSelecionados.map((i) => ({
            produtoId: i.produtoId,
            quantidade: i.quantidade,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert(`Venda realizada com sucesso! Total: R$ ${total.toFixed(2)}`);
      setItensSelecionados([]);
      // Atualiza produtos (para refletir estoque atualizado)
      const produtosRes = await fetch('/api/produtos');
      setProdutos(await produtosRes.json());
    } catch (error) {
      alert(
        `Erro: ${error instanceof Error ? error.message : 'Erro ao processar venda'}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Nova Venda</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lista de Produtos */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-medium mb-2">Produtos</h3>
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="flex justify-between items-center p-2 hover:bg-slate-50 rounded cursor-pointer"
              onClick={() => adicionarItem(produto)}
            >
              <span>{produto.nome}</span>
              <span>R$ {produto.preco.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Itens Selecionados */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-medium mb-2">Carrinho</h3>
          {itensSelecionados.length === 0 && (
            <p className="text-slate-400">Nenhum item selecionado</p>
          )}
          {itensSelecionados.map((item) => (
            <div
              key={item.produtoId}
              className="flex justify-between items-center p-2"
            >
              <span>
                {item.nome} x {item.quantidade}
              </span>
              <div className="flex items-center gap-2">
                <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                <button
                  className="text-red-500 font-bold"
                  onClick={() => removerItem(item.produtoId)}
                >
                  �
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 font-bold text-lg">
            Total: R$ {total.toFixed(2)}
          </div>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={confirmarVenda}
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Confirmar Venda'}
          </button>
        </div>
      </div>
    </div>
  );
}
