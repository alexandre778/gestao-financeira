'use client';

export async function getVendas() {
  const res = await fetch('/api/vendas', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Falha ao buscar vendas');
  }
  return res.json();
}
