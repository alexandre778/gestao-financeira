// src/pages/api/vendas.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/client';

interface ItemVendaBody {
  produtoId: number;
  quantidade: number;
}

interface VendaBody {
  itens: ItemVendaBody[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'M�todo n�o permitido' });
  }

  try {
    const body: VendaBody = req.body;

    if (!body.itens || body.itens.length === 0) {
      return res.status(400).json({ message: 'Nenhum item enviado' });
    }

    let total = 0;

    // Inicia uma transa��o
    const result = await prisma.$transaction(async (prisma) => {
      // Calcula total e atualiza estoque
      for (const item of body.itens) {
        const produto = await prisma.produto.findUnique({
          where: { id: item.produtoId },
        });

        if (!produto) {
          throw new Error(`Produto com id ${item.produtoId} n�o encontrado`);
        }

        if (produto.estoque < item.quantidade) {
          throw new Error(`Estoque insuficiente para ${produto.nome}`);
        }

        total += produto.preco * item.quantidade;

        // Atualiza estoque
        await prisma.produto.update({
          where: { id: item.produtoId },
          data: { estoque: produto.estoque - item.quantidade },
        });
      }

      // Cria a venda
      const venda = await prisma.venda.create({
        data: {
          total,
        },
      });

      // Cria os itens da venda
      for (const item of body.itens) {
        const produto = await prisma.produto.findUnique({
          where: { id: item.produtoId },
        });
        if (!produto) continue;

        await prisma.itemVenda.create({
          data: {
            vendaId: venda.id,
            produtoId: produto.id,
            quantidade: item.quantidade,
            preco: produto.preco,
          },
        });
      }

      return venda;
    });

    res
      .status(200)
      .json({ message: 'Venda realizada com sucesso', venda: result });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : 'Erro ao processar venda';
    res.status(400).json({ message });
  }
}
