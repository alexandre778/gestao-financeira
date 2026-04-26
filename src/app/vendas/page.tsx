'use client';

import { Calendar, Clock, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

interface CarrinhoItem {
  id: number;
  nome: string;
  preco: number;
  qtd: number;
}

export default function VendasPage() {
  const { addVenda, produtos } = useApp();

  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
  const [produtoId, setProdutoId] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [qtd, setQtd] = useState('1');
  const [dataHora, setDataHora] = useState({
    data: '--/--/----',
    hora: '--:--:--',
  });

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

  const total = carrinho.reduce(
    (acc: number, i: CarrinhoItem) => acc + i.preco * i.qtd,
    0
  );

  const selecionarProduto = (nomeProd: string) => {
    const prod = produtos.find((p) => p.nome === nomeProd);
    if (prod) {
      setProdutoId(prod.id);
      setNome(prod.nome);
      setPreco(prod.preco.toString());
    }
  };

  const adicionarAoCarrinho = () => {
    const valorNum = parseFloat(preco.replace(',', '.'));
    const qtdNum = parseInt(qtd) || 1;

    if (produtoId && nome && !isNaN(valorNum)) {
      setCarrinho([
        ...carrinho,
        { id: produtoId, nome, preco: valorNum, qtd: qtdNum },
      ]);

      setProdutoId(null);
      setNome('');
      setPreco('');
      setQtd('1');
    }
  };

  const finalizar = () => {
    addVenda({
      itens: carrinho.map((item) => ({
        produtoId: item.id,
        nome: item.nome,
        preco: item.preco,
        qtd: item.qtd,
      })),
      total,
    });

    setCarrinho([]);
    alert('Venda realizada com sucesso!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Realizar Venda 🚀</h1>

      {/* DATA E HORA */}
      <div className="flex gap-6 mb-8 text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <span className="text-sm font-medium">{dataHora.data}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <span className="text-sm font-medium">{dataHora.hora}</span>
        </div>
      </div>

      {/* FORM */}
      <div className="flex flex-col gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Produto
          </label>
          <select
            value={nome}
            onChange={(e) => selecionarProduto(e.target.value)}
            className="border p-2 w-full rounded bg-white"
          >
            <option value="">Selecione</option>
            {produtos.map((p) => (
              <option key={p.id} value={p.nome}>
                {p.nome} (Estoque: {p.estoque})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Preço Unitário
          </label>
          <input
            type="text"
            placeholder="0,00"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Quantidade
          </label>
          <input
            type="number"
            value={qtd}
            onChange={(e) => setQtd(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        <button
          onClick={adicionarAoCarrinho}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 text-sm rounded transition-colors w-fit"
        >
          Adicionar
        </button>
      </div>

      {/* LISTA */}
      {carrinho.map((item, index) => (
        <div key={index} className="flex justify-between mb-2">
          <span>{item.nome}</span>
          <span>R$ {(item.preco * item.qtd).toFixed(2)}</span>
          <button
            onClick={() =>
              setCarrinho(carrinho.filter((_, i) => i !== index))
            }
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <h2 className="mt-4 font-bold">Total: R$ {total.toFixed(2)}</h2>

      <button
        onClick={finalizar}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 text-sm mt-4 rounded transition-colors w-fit"
      >
        Finalizar Venda
      </button>
    </div>
  );
}
