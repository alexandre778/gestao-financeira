import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

interface ItemVendaBody {
  produtoId: string;
  quantidade: number;
}

interface VendaBody {
  itens: ItemVendaBody[];
}

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR');
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
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
        nome: string;
        preco: number;
        qtd: number;
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
          nome: produto.nome,
          preco: produto.preco,
          qtd: item.quantidade,
        });

        await tx.produto.update({
          where: { id: produto.id },
          data: { estoque: produto.estoque - item.quantidade },
        });
      }

      return await tx.venda.create({
        data: {
          data: formatDate(new Date()),
          hora: formatTime(new Date()),
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
