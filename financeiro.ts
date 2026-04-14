'use server';

import prisma from '@/lib/prisma';

export async function getProdutos() {
  return await prisma.produto.findMany();
}

export async function upsertProduto(data: {
  id?: string;
  nome: string;
  custo: number;
  preco: number;
  estoque: number;
}) {
  if (data.id) {
    return await prisma.produto.update({
      where: { id: data.id },
      data: {
        nome: data.nome,
        custo: data.custo,
        preco: data.preco,
        estoque: data.estoque,
      },
    });
  }
  return await prisma.produto.create({ data });
}

export async function getVendas() {
  return await prisma.venda.findMany({
    include: { itens: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createVenda(vendaData: {
  data: string;
  hora: string;
  total: number;
  itens: any[];
}) {
  return await prisma.venda.create({
    data: {
      data: vendaData.data,
      hora: vendaData.hora,
      total: vendaData.total,
      itens: {
        create: vendaData.itens.map((item) => ({
          nome: item.nome,
          preco: item.preco,
          qtd: item.qtd,
        })),
      },
    },
  });
}
