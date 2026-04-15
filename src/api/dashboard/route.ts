import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Total de vendas hoje
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const vendasHoje = await prisma.venda.findMany({
      where: { data: { gte: hoje } },
    });

    const totalVendas = vendasHoje.reduce((acc, v) => acc + v.total, 0);

    // Sa�das (exemplo: 10% das vendas como despesa)
    const saidas = totalVendas * 0.1;

    // Saldo em caixa
    const saldo = totalVendas - saidas;

    return NextResponse.json({
      vendasHoje: totalVendas,
      saidas,
      saldo,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar dashboard' },
      { status: 500 },
    );
  }
}
