interface MenuProps {
  mudarTela: (tela: 'menu' | 'compra-venda' | 'procuracao') => void;
}

export default function MenuPrincipal({ mudarTela }: MenuProps) {
  return (
    <div className="w-full max-w-md bg-white border-2 border-black rounded-2xl p-8 shadow-2xl text-center">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">JR Motos</h1>
      <p className="text-gray-600 mb-8">Selecione o tipo de documento que deseja gerar.</p>

      <div className="space-y-4">
        <button 
          onClick={() => mudarTela('compra-venda')}
          className="cursor-pointer w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl text-lg transition duration-200 transform active:scale-[0.99] shadow-lg flex items-center justify-center">
          Contrato de Compra e Venda
        </button>

        <button 
          onClick={() => mudarTela('procuracao')}
          className="cursor-pointer w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl text-lg transition duration-200 transform active:scale-[0.99] shadow-lg flex items-center justify-center">
          Procuração de Transferência
        </button>
      </div>
    </div>
  );
}