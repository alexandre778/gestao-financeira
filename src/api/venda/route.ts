import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  const venda = await prisma.venda.create({
    data: {
      total: body.total,
      itens: {
        create: body.itens.map(
          (item: { produtoId: number; quantidade: number; preco: number }) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            preco: item.preco,
          }),
        ),
      },
    },
    include: { itens: true },
  });

  return Response.json(venda);
}
