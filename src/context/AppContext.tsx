'use client';

import React, { createContext, useContext, useState } from 'react';

export interface Produto {
  nome: string;
  custo: number;
  preco: number;
  estoque: number;
}

export interface ItemVenda {
  nome: string;
  preco: number;
  qtd: number;
}

export interface Venda {
  data: string;
  hora: string;
  itens: ItemVenda[];
  total: number;
}

interface AppContextType {
  produtos: Produto[];
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
  vendas: Venda[];
  addVenda: (venda: Omit<Venda, 'data' | 'hora'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);

  const addVenda = (venda: Omit<Venda, 'data' | 'hora'>) => {
    const agora = new Date();
    const novaVenda: Venda = {
      ...venda,
      data: agora.toLocaleDateString('pt-BR'),
      hora: agora.toLocaleTimeString('pt-BR'),
    };

    // 1. Adiciona ao histórico de vendas
    setVendas((prev) => [...prev, novaVenda]);

    // 2. Lógica de Conexão: Atualiza o estoque automaticamente
    setProdutos((prevProdutos) =>
      prevProdutos.map((p) => {
        const itemVendido = venda.itens.find((item) => item.nome === p.nome);
        if (itemVendido) {
          return { ...p, estoque: p.estoque - itemVendido.qtd };
        }
        return p;
      }),
    );
  };

  return (
    <AppContext.Provider value={{ produtos, setProdutos, vendas, addVenda }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  return context;
}
