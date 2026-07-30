interface MenuProps {
  mudarTela: (tela: 'menu' | 'compra-venda' | 'futuro') => void;
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
          disabled
          className="w-full bg-gray-200 text-gray-500 font-bold py-4 rounded-xl text-lg cursor-not-allowed border border-gray-300">
          Em breve... (Novo Documento)
        </button>
      </div>
    </div>
  );
}