'use client';

import React, { createContext, useContext, useState } from 'react';

/**
 * PRODUTO
 */
export interface Produto {
  id: number;
  nome: string;
  custo: number;
  preco: number;
  estoque: number;
}

/**
 * ITEM DA VENDA
 */
export interface ItemVenda {
  produtoId: number;
  nome: string;
  preco: number;
  qtd: number;
}

/**
 * VENDA (AGORA COM ID ✅)
 */
export interface Venda {
  id: number;
  data: string;
  hora: string;
  itens: ItemVenda[];
  total: number;
}

/**
 * CONTEXTO
 */
interface AppContextType {
  produtos: Produto[];
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
  vendas: Venda[];
  addVenda: (venda: Omit<Venda, 'id' | 'data' | 'hora'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * PROVIDER
 */
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);

  const addVenda = (venda: Omit<Venda, 'id' | 'data' | 'hora'>) => {
    const agora = new Date();

    const novaVenda: Venda = {
      id: Date.now(), // ✅ ID único
      ...venda,
      data: agora.toLocaleDateString('pt-BR'),
      hora: agora.toLocaleTimeString('pt-BR'),
    };

    /**
     * 1. Adiciona venda
     */
    setVendas((prev) => [...prev, novaVenda]);

    /**
     * 2. Atualiza estoque automaticamente
     */
    setProdutos((prevProdutos) =>
      prevProdutos.map((p) => {
        const itemVendido = venda.itens.find((item) => item.produtoId === p.id);

        if (itemVendido) {
          return {
            ...p,
            estoque: p.estoque - itemVendido.qtd,
          };
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

/**
 * HOOK
 */
export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }

  return context;
}
