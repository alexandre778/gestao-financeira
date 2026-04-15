import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { NextResponse } from 'next/server';

interface ItemVendaBody {
  produtoId: number;
  quantidade: number;
}

interface VendaBody {
  itens: ItemVendaBody[];
}

export async function POST(req: Request) {
  try {
    const body: VendaBody = await req.json();

    if (!body.itens || body.itens.length === 0) {
      return NextResponse.json(
        { message: 'Nenhum item enviado' },
        { status: 400 },
      );
    }

    const venda = await prisma.$transaction(async (tx) => {
      const itensCreate = [] as Array<{
        produtoId: number;
        quantidade: number;
        preco: number;
      }>;
      let total = 0;

      for (const item of body.itens) {
        const produto = await tx.produto.findUnique({
          where: { id: item.produtoId },
        });

        if (!produto) {
          throw new Error(`Produto com id ${item.produtoId} não encontrado`);
        }

        if (produto.estoque < item.quantidade) {
          throw new Error(`Estoque insuficiente para ${produto.nome}`);
        }

        total += produto.preco * item.quantidade;
        itensCreate.push({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          preco: produto.preco,
        });

        await tx.produto.update({
          where: { id: produto.id },
          data: { estoque: produto.estoque - item.quantidade },
        });
      }

      return await tx.venda.create({
        data: {
          total,
          itens: { create: itensCreate },
        },
        include: { itens: true },
      });
    });

    return NextResponse.json(venda);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : 'Erro ao processar venda';
    return NextResponse.json({ message }, { status: 400 });
  }
}
