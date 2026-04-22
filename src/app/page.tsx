import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-full bg-[#030816] font-sans overflow-hidden flex items-center justify-center">
      <section className="relative w-full h-full">
        {/* IMAGEM DE FUNDO */}
        <Image
          src="/banner-financeiro.jpg"
          alt="Painel de Controle Financeiro Moderno"
          fill
          priority
          sizes="100vw"
          quality={100}
          className="object-cover"
        />

        {/* MÁSCARA DE POSICIONAMENTO - Esta div garante que o botão acompanhe a imagem */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-[1774px] aspect-[1774/880]">
            {/*
              O posicionamento em porcentagem dentro de um contêiner com aspect-ratio
              garante que o botão "tape" a palavra em qualquer tamanho de tela.
            */}
            <Link
              href="/vendas"
              style={{
                left: '0%', // Alongado totalmente para a borda esquerda
                top: '78.5%', // Ajustado para centralizar sobre a altura da palavra
                width: '35%', // Encurtado um pouco no lado direito
                height: '11.5%', // Ajuste de altura para cobertura total
              }}
              className="absolute
                         flex items-center justify-center
                         bg-[#0061ff] hover:bg-[#0056e6]
                         text-white font-black text-[1vw] uppercase tracking-widest
                         rounded-none shadow-2xl transition-all hover:brightness-110
                         active:scale-95 border-none z-50 whitespace-nowrap"
            >
              Começar agora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
