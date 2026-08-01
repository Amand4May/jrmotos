import { useState } from 'react';
import MenuPrincipal from './components/MenuPrincipal';
import CompraEVenda from './components/CompraEVenda';
import Procuracao from './components/Procuracao';

export default function App() {
  // O estado que controla qual tela está visível no momento
  const [telaAtual, setTelaAtual] = useState<'menu' | 'compra-venda' | 'procuracao'>('menu');

  return (
    <div className="h-screen w-full flex items-center justify-center font-sans text-black bg-[url(/fundo.jpg)] bg-cover bg-center py-4">
      
      {/* Se a tela atual for 'menu', mostra o Menu */}
      {telaAtual === 'menu' && (
        <MenuPrincipal mudarTela={setTelaAtual} />
      )}

      {/* Se a tela for 'compra-venda', mostra o Formulário (e passa a função de voltar pro menu) */}
      {telaAtual === 'compra-venda' && (
        <CompraEVenda voltarParaMenu={() => setTelaAtual('menu')} />
      )}

      {/* Se a tela for 'procuracao', mostra o componente novo */}
      {telaAtual === 'procuracao' && (
        <Procuracao voltarParaMenu={() => setTelaAtual('menu')} />
      )}

    </div>
  );
}