import { Monitor, Smartphone } from 'lucide-react';

const ResponsiveHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Gestão Financeira</h1>

      <div className="flex items-center gap-2">
        {/* Ícone visível apenas em dispositivos móveis */}
        <div className="block md:hidden">
          <Smartphone size={24} />
        </div>

        {/* Ícone visível apenas em telas maiores (PC) */}
        <div className="hidden md:block">
          <Monitor size={24} />
        </div>
      </div>
    </header>
  );
};

export default ResponsiveHeader;
