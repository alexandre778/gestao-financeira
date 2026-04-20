'use client';

import { Calculator } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* HEADER */}
      <header className="border-b border-slate-200 p-4 md:p-6">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-xl text-white shadow-lg">
            <Calculator size={28} />
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800 uppercase">
            Sistema de Gestão Financeira
          </h1>
        </div>
      </header>

      {/* BANNER FINANCEIRO */}
      <section className="w-full">
        <div className="relative w-full h-[350px] md:h-[500px]">
          {/* IMAGEM */}
          <Image
            src="/banner-financeiro.jpg"
            alt="Banner Financeiro"
            fill
            priority
            className="object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

          {/* CONTEÚDO */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-6xl mx-auto px-6 text-white">
              <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                Controle Financeiro <br />
                Simples e Inteligente
              </h2>

              <p className="text-sm md:text-lg text-gray-200 max-w-xl mb-6">
                Gerencie vendas, acompanhe lucros e tenha total controle do seu
                negócio em um só lugar.
              </p>

              <Link
                href="/vendas"
                className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition text-center"
              >
                Começar Agora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
