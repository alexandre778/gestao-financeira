
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#030816] font-sans">

      {/* HERO */}
      <section className="relative w-full h-screen">

        {/* IMAGEM */}
        <Image
          src="/banner-financeiro.jpg"
          alt="Painel Financeiro"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6 sm:px-10 md:px-20">

          {/* TEXTO */}
          <div className="max-w-xl space-y-4">
            <h1 className="text-white font-bold leading-tight
              text-2xl sm:text-4xl md:text-5xl">
              Controle Financeiro
              <span className="text-blue-400 block">
                Simples e Inteligente
              </span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base md:text-lg">
              Gerencie vendas, acompanhe lucros e tenha controle total do seu negócio.
            </p>

            {/* BOTÃO */}
            <Link
              href="/vendas"
              className="
                inline-block
                bg-[#0061ff] hover:bg-[#0056e6]
                text-white font-bold uppercase
                px-5 py-3 rounded-lg
                text-sm sm:text-base md:text-lg
                shadow-lg transition-all
                hover:scale-105 active:scale-95
              "
            >
              Começar agora
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
