import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const vendas = await prisma.venda.findMany({
      include: { itens: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(vendas);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Erro ao buscar vendas' },
      { status: 500 },
    );
  }
}
