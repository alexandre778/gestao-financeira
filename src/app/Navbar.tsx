'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#030816]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="text-white font-bold text-sm sm:text-lg">
          AGM<span className="text-blue-400">/SW</span>
        </h1>

        <nav className="flex gap-3 sm:gap-5 text-[10px] sm:text-sm text-gray-300 font-medium overflow-x-auto py-1 no-scrollbar">
          <Link
            href="/"
            className={`${pathname === '/' ? 'text-white' : ''} hover:text-white whitespace-nowrap`}
          >
            Painel
          </Link>
          <Link
            href="/produtos"
            className={`${pathname === '/produtos' ? 'text-white' : ''} hover:text-white whitespace-nowrap`}
          >
            Produtos
          </Link>
          <Link
            href="/vendas"
            className={`${pathname === '/vendas' ? 'text-white' : ''} hover:text-white whitespace-nowrap`}
          >
            Vendas
          </Link>
          <Link
            href="/historico"
            className={`${pathname === '/historico' ? 'text-white' : ''} hover:text-white whitespace-nowrap`}
          >
            Histórico
          </Link>
          <Link
            href="/estoque"
            className={`${pathname === '/estoque' ? 'text-white' : ''} hover:text-white whitespace-nowrap`}
          >
            Estoque
          </Link>
          <Link
            href="/caixa"
            className={`${pathname === '/caixa' ? 'text-white' : ''} hover:text-white whitespace-nowrap`}
          >
            Caixa
          </Link>
          <Link
            href="/contas-receber"
            className={`${pathname === '/contas-receber' ? 'text-white' : ''} hover:text-white whitespace-nowrap`}
          >
            Contas a Receber
          </Link>
          <Link
            href="/relatorios"
            className={`${pathname === '/relatorios' ? 'text-white' : ''} hover:text-white whitespace-nowrap`}
          >
            Relatórios
          </Link>
        </nav>
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </header>
  );
}
