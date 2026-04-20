'use client';

import { Calendar, Clock, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

interface CarrinhoItem {
  nome: string;
  preco: number;
  qtd: number;
}

export default function VendasPage() {
  const { addVenda } = useApp();
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
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

  const total = carrinho.reduce((acc, i) => acc + i.preco * (i.qtd || 1), 0);

  const adicionarAoCarrinho = () => {
    const valorNum = parseFloat(preco.replace(',', '.'));
    const qtdNum = parseInt(qtd) || 1;

    if (nome && !isNaN(valorNum)) {
      setCarrinho([...carrinho, { nome, preco: valorNum, qtd: qtdNum }]);
      setNome('');
      setPreco('');
      setQtd('1');
    }
  };

  const excluirDoCarrinho = (index: number) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  const finalizar = () => {
    addVenda({
      itens: carrinho,
      total,
    });

    setCarrinho([]);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Realizar Venda</h1>

        <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 bg-slate-100 px-4 py-2 rounded-lg">
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-blue-600" />
            <span>{dataHora.data}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-blue-600" />
            <span>{dataHora.hora}</span>
          </div>
        </div>
      </div>

      {/* Formulário de Adição */}
      <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome do Produto
            </label>
            <input
              className={`w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold ${nome ? 'bg-slate-50 border-blue-300 text-slate-900' : 'text-gray-500'}`}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Coca-Cola"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preço Unit. (R$)
              </label>
              <div className="relative mt-1">
                <span
                  className={`absolute left-3 top-1/2 -translate-y-1/2 font-bold text-sm transition-colors ${preco ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  R$
                </span>
                <input
                  type="text"
                  className={`w-full border pl-9 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold ${preco ? 'bg-blue-50/50 border-blue-300 text-blue-700' : 'text-gray-500'}`}
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  placeholder="0,00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantidade
              </label>
              <input
                type="number"
                className={`w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold ${qtd && qtd !== '0' ? 'bg-slate-50 border-blue-300 text-slate-900' : 'text-gray-500'}`}
                value={qtd}
                onChange={(e) => setQtd(e.target.value)}
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Subtotal integrado (dentro da área do formulário) */}
        {preco && qtd && (
          <div className="flex justify-end pr-1">
            <p className="text-xs font-bold text-blue-600 italic">
              Subtotal deste item: R${' '}
              {(
                (parseFloat(preco.replace(',', '.')) || 0) *
                (parseInt(qtd) || 0)
              ).toFixed(2)}
            </p>
          </div>
        )}

        <button
          onClick={adicionarAoCarrinho}
          className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition w-full md:w-auto"
        >
          SALVAR NO CARRINHO
        </button>
      </div>

      {/* Tabela de Itens */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 font-semibold text-gray-600">Produto</th>
              <th className="p-3 font-semibold text-gray-600 text-center">
                Qtd
              </th>
              <th className="p-3 font-semibold text-gray-600 text-right">
                Unitário
              </th>
              <th className="p-3 font-semibold text-gray-600 text-right">
                Total
              </th>
              <th className="p-3 font-semibold text-gray-600 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {carrinho.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-400 italic"
                >
                  O carrinho está vazio
                </td>
              </tr>
            ) : (
              carrinho.map((item, index) => (
                <tr
                  key={index}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="p-3 text-gray-800">{item.nome}</td>
                  <td className="p-3 text-center text-gray-600">{item.qtd}</td>
                  <td className="p-3 text-right text-gray-500 text-xs">
                    R$ {item.preco.toFixed(2)}
                  </td>
                  <td className="p-3 text-right text-gray-800">
                    R$ {(item.preco * item.qtd).toFixed(2)}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => excluirDoCarrinho(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Excluir item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Totalizador */}
      <div className="flex justify-between items-center bg-slate-100 p-4 rounded-xl border border-dashed border-slate-300 mb-6">
        <span className="text-lg font-bold text-slate-700">
          Total da Venda:
        </span>
        <span className="text-2xl font-black text-green-600">
          R$ {total.toFixed(2)}
        </span>
      </div>

      <button
        onClick={finalizar}
        disabled={carrinho.length === 0}
        className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all ${
          carrinho.length === 0
            ? 'bg-gray-300 cursor-not-allowed opacity-60'
            : 'bg-green-600 hover:bg-green-700 active:scale-[0.98]'
        }`}
      >
        FINALIZAR VENDA
      </button>
    </div>
  );
}
