'use client';

import { Calendar, Clock, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

interface CarrinhoItem {
  produtoId: number;
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
  const [dataHora, setDataHora] = useState({ data: '', hora: '' });

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

  // ✅ tipado corretamente
  const total = carrinho.reduce(
    (acc: number, i: CarrinhoItem) => acc + i.preco * (i.qtd || 1),
    0,
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

    if (nome && !isNaN(valorNum) && produtoId) {
      setCarrinho([
        ...carrinho,
        { produtoId, nome, preco: valorNum, qtd: qtdNum },
      ]);
      setNome('');
      setPreco('');
      setQtd('1');
      setProdutoId(null);
    }
  };

  const finalizar = () => {
    addVenda({
      itens: carrinho,
      total,
    });

    setCarrinho([]);
    alert('Venda realizada com sucesso!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Realizar Venda</h1>

      {/* DATA E HORA */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-1">
          <Calendar size={16} className="text-gray-500" />
          <span>{dataHora.data}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} className="text-gray-500" />
          <span>{dataHora.hora}</span>
        </div>
      </div>

      {/* FORM */}
      <div className="mb-6 space-y-4">
        <select
          value={nome}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            selecionarProduto(e.target.value)
          }
          className="border p-2 w-full"
        >
          <option value="">Selecione</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.nome}>
              {p.nome} (Estoque: {p.estoque})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Preço"
          value={preco}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPreco(e.target.value)
          }
          className="border p-2 w-full"
        />

        <input
          type="number"
          value={qtd}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQtd(e.target.value)
          }
          className="border p-2 w-full"
        />

        <button
          onClick={adicionarAoCarrinho}
          className="bg-blue-600 text-white p-2"
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
            onClick={() => setCarrinho(carrinho.filter((_, i) => i !== index))}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <h2 className="mt-4 font-bold">Total: R$ {total.toFixed(2)}</h2>

      <button
        onClick={finalizar}
        className="bg-green-600 text-white p-3 w-full mt-4"
      >
        Finalizar Venda
      </button>
    </div>
  );
}
