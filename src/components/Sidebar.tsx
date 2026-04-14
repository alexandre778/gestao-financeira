'use client';

import {
  BadgeDollarSign,
  Boxes,
  FileText,
  History,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Painel', href: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Produtos', href: '/produtos', icon: <Package size={20} /> },
    { name: 'Vendas', href: '/vendas', icon: <ShoppingCart size={20} /> },
    {
      name: 'Histórico de Vendas',
      href: '/historico-vendas',
      icon: <History size={20} />,
    },
    { name: 'Estoque', href: '/estoque', icon: <Boxes size={20} /> },
    { name: 'Caixa', href: '/caixa', icon: <Wallet size={20} /> },
    {
      name: 'Contas a Receber',
      href: '/contas-receber',
      icon: <BadgeDollarSign size={20} />,
    },
    { name: 'Relatórios', href: '/relatorios', icon: <FileText size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col shadow-xl h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-black tracking-tighter text-white">
          AGM//<span className="text-blue-500">SW</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                      : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-center text-slate-500 italic">
        v1.0.4
      </div>
    </aside>
  );
};

export default Sidebar;
