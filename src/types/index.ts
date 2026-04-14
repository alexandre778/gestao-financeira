export type ItemCarrinho = {
  nome: string;
  preco: number;
  qtd: number;
};

export type Venda = {
  itens: ItemCarrinho[];
  total: number;
  data: string;
  hora: string; // ? ESSENCIAL
};