'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#030816] font-sans flex flex-col">
      {/* HERO */}
      <section className="relative w-full h-[calc(100vh-64px)]">
        {/* IMAGEM */}
        <Image
          src="/banner-financeiro.jpg"
          alt="Painel Financeiro"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            {/* Conteúdo de texto e botão removidos conforme solicitado */}
          </div>
        </div>
      </section>
    </div>
  );
}
