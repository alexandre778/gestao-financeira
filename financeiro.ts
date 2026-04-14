'use server';

import prisma from '@/lib/prisma';

export async function getProdutos() {
  return await prisma.produto.findMany();
}

export async function upsertProduto(data: {
  id?: number;
  nome: string;
  preco: number;
  estoque: number;
}) {
  if (data.id) {
    return await prisma.produto.update({
      where: { id: data.id },
      data: {
        nome: data.nome,
        preco: data.preco,
        estoque: data.estoque,
      },
    });
  }

  return await prisma.produto.create({
    data: {
      nome: data.nome,
      preco: data.preco,
      estoque: data.estoque,
    },
  });
}

export async function getVendas() {
  return await prisma.venda.findMany({
    include: { itens: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createVenda(vendaData: {
  total: number;
  itens: {
    produtoId: number;
    quantidade: number;
    preco: number;
  }[];
}) {
  return await prisma.venda.create({
    data: {
      total: vendaData.total,
      itens: {
        create: vendaData.itens.map((item) => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          preco: item.preco,
        })),
      },
    },
    include: { itens: true },
  });
}
