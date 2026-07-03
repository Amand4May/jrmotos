import { useState } from 'react'

interface DocumentFormData {
  nomeCliente: string;
  cpfCnpj: string;
  modeloMoto: string;
  placa: string;
  chassi: string;
  ano: string;
  valorVenda: string;
  observacoes: string;
}

export default function App() {
  const [formData, setFormData] = useState<DocumentFormData>({
    nomeCliente: '',
    cpfCnpj: '',
    modeloMoto: '',
    placa: '',
    chassi: '',
    ano: '',
    valorVenda: '',
    observacoes: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Dados prontos:", formData)
    alert("Dados capturados com sucesso!")
  }

  return (
    /* O PAINEL DE FUNDO 
      - h-screen: Trava a altura para ser exatamente 100% da tela do navegador (sem scroll fora).
      - flex items-center justify-center: Joga o card de conteúdo exatamente para o meio.
      - bg-[url(...)] bg-cover bg-center: Puxa a sua imagem e ajusta na tela.
    */
    <div className="h-screen w-full flex items-center justify-center font-sans text-black bg-[url(/fundo.jpg)] bg-cover bg-center">
      
      {/* O CARD DO FORMULÁRIO 
        - bg-white: Garante que o fundo do form seja branco para não misturar com a foto.
        - max-h-[95vh]: Diz que o card pode ocupar no máximo 95% da altura da tela.
        - overflow-y-auto: Se o monitor do seu pai for muito pequeno, o scroll aparece *apenas dentro do card*, e não na página toda.
      */}
      <div className="w-full max-w-2xl bg-white border-2 border-black rounded-2xl p-6 shadow-2xl max-h-[95vh] overflow-y-auto">
        
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight mb-1">Novo Documento</h1>
          <p className="text-sm text-gray-600">Preencha os campos abaixo.</p>
        </div>

        {/* Diminuímos o space-y-6 para space-y-3 para espremer um pouco mais os campos na vertical */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          <div className="flex flex-col text-left">
            <label className="text-sm font-bold mb-1">Nome Completo :</label>
            <input
              type="text"
              name="nomeCliente"
              value={formData.nomeCliente}
              onChange={handleChange}
              className="w-full border-2 border-black rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-black text-sm transition-all"
              required
            />
          </div>
          
          <div className="flex flex-col text-left">
            <label className="text-sm font-bold mb-1">CPF ou CNPJ :</label>
            <input
              type="text"
              name="cpfCnpj"
              value={formData.cpfCnpj}
              onChange={handleChange}
              className="w-full border-2 border-black rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-black text-sm transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col text-left">
              <label className="text-sm font-bold mb-1">Modelo / Marca :</label>
              <input
                type="text"
                name="modeloMoto"
                value={formData.modeloMoto}
                onChange={handleChange}
                className="w-full border-2 border-black rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-black text-sm transition-all"
                required
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-sm font-bold mb-1">Placa :</label>
              <input
                type="text"
                name="placa"
                value={formData.placa}
                onChange={handleChange}
                className="w-full border-2 border-black rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-black text-sm transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 flex flex-col text-left">
              <label className="text-sm font-bold mb-1">Número do Chassi :</label>
              <input
                type="text"
                name="chassi"
                value={formData.chassi}
                onChange={handleChange}
                className="w-full border-2 border-black rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-black text-sm transition-all"
                required
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-sm font-bold mb-1">Ano :</label>
              <input
                type="text"
                name="ano"
                value={formData.ano}
                onChange={handleChange}
                className="w-full border-2 border-black rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-black text-sm transition-all"
                required
              />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <label className="text-sm font-bold mb-1">Valor da Venda (R$) :</label>
            <input
              type="text"
              name="valorVenda"
              value={formData.valorVenda}
              onChange={handleChange}
              className="w-full border-2 border-black rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-black text-sm transition-all"
              required
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="text-sm font-bold mb-1">Texto Adicional / Observações :</label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows={2}
              className="w-full border-2 border-black rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-black text-sm resize-none transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl text-base transition duration-200 transform active:scale-[0.99]"
            >
              Gerar PDF do Documento
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}