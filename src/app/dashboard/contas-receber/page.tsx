'use client';

export default function ContasReceber() {
  const entradas = [
    { nome: 'Salário/Pensão', valor: 3000 },
    { nome: 'Lucro das vendas', valor: 200 },
    { nome: 'Outras fontes', valor: 100 },
  ];

  const moradia = [
    { nome: 'Aluguel', valor: 800 },
    { nome: 'Luz', valor: 150 },
    { nome: 'Água', valor: 80 },
    { nome: 'Condomínio', valor: 100 },
  ];

  const debito = [
    { nome: 'Transporte', valor: 150 },
    { nome: 'Consulta', valor: 250 },
    { nome: 'Farmácia', valor: 250 },
    { nome: 'Alimentação', valor: 450 },
    { nome: 'Supermercado', valor: 200 },
    { nome: 'Outras', valor: 20 },
  ];

  const outras = [
    { nome: 'Despesas no crédito', valor: 500 },
    { nome: 'Consignado', valor: 150 },
  ];

  const totalEntradas = entradas.reduce((acc, i) => acc + i.valor, 0);
  const totalMoradia = moradia.reduce((acc, i) => acc + i.valor, 0);
  const totalDebito = debito.reduce((acc, i) => acc + i.valor, 0);
  const totalOutras = outras.reduce((acc, i) => acc + i.valor, 0);

  const totalSaidas = totalMoradia + totalDebito + totalOutras;
  const saldo = totalEntradas - totalSaidas;

  const format = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="p-6 space-y-8">

      <div>
        <h1 className="text-2xl font-bold">Controle Financeiro</h1>
      </div>

      {/* RESUMO */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <p>Entradas</p>
          <h2 className="text-green-600 text-2xl font-bold">
            {format(totalEntradas)}
          </h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p>Saídas</p>
          <h2 className="text-red-600 text-2xl font-bold">
            {format(totalSaidas)}
          </h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p>Saldo</p>
          <h2 className="text-blue-600 text-2xl font-bold">
            {format(saldo)}
          </h2>
        </div>
      </div>

      {/* LISTAS */}
      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-green-600">Entradas</h2>
          {entradas.map((e, i) => (
            <div key={i} className="flex justify-between">
              <span>{e.nome}</span>
              <span>{format(e.valor)}</span>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-red-600">Moradia</h2>
          {moradia.map((e, i) => (
            <div key={i} className="flex justify-between">
              <span>{e.nome}</span>
              <span>{format(e.valor)}</span>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-red-600">Débito / Pix</h2>
          {debito.map((e, i) => (
            <div key={i} className="flex justify-between">
              <span>{e.nome}</span>
              <span>{format(e.valor)}</span>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2 text-red-600">Outras</h2>
          {outras.map((e, i) => (
            <div key={i} className="flex justify-between">
              <span>{e.nome}</span>
              <span>{format(e.valor)}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
