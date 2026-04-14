'use client';
import { useApp } from '../../context/AppContext';

export default function EstoquePage() {
  const { produtos } = useApp();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Estoque</h1>

      {produtos.map((p, i) => (
        <div key={i} className="border-b py-2">
          {p.nome} - {p.estoque} unidades
        </div>
      ))}
    </div>
  );
}
