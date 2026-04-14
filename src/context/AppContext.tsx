'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface Produto {
  nome: string;
  custo: number;
  preco: number;
  estoque: number;
}

interface VendaItem {
  nome: string;
  preco: number;
  qtd: number;
}

export interface Venda {
  itens: VendaItem[];
  total: number;
  data: string;
}

interface AppContextType {
  produtos: Produto[];
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
  vendas: Venda[];
  addVenda: (venda: Omit<Venda, 'data'>) => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar dados iniciais no cliente
  useEffect(() => {
    try {
      const savedProdutos = localStorage.getItem('gestao_produtos');
      if (savedProdutos) setProdutos(JSON.parse(savedProdutos));

      const savedVendas = localStorage.getItem('gestao_vendas');
      if (savedVendas) setVendas(JSON.parse(savedVendas));
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Salvar sempre que houver alteração
  useEffect(() => {
    if (isInitialized) {
      // Salva apenas após a carga inicial para evitar apagar dados existentes
      localStorage.setItem('gestao_produtos', JSON.stringify(produtos));
    }
  }, [produtos, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('gestao_vendas', JSON.stringify(vendas));
    }
  }, [vendas, isInitialized]);

  const addVenda = (venda: Omit<Venda, 'data'>) => {
    const novaVenda = {
      ...venda,
      data: new Date().toISOString(), // ISO é mais consistente para persistência
    };

    setVendas((prev) => [...prev, novaVenda]);

    // Atualizar estoque: subtrai a quantidade vendida
    setProdutos((prev) =>
      prev.map((p) => {
        const itemVendido = venda.itens.find((i) => i.nome === p.nome);
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

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context || Object.keys(context).length === 0) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};
