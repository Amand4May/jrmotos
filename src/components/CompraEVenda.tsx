import { useState } from 'react';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface CompraEVendaProps {
  voltarParaMenu: () => void;
}

interface DocumentFormData {
  nomeVendedor: string; cpfVendedor: string; rgVendedor: string; enderecoVendedor: string;
  nomeCliente: string; cpfCnpj: string; rgCliente: string; telefoneCliente: string;
  cepCliente: string; ruaCliente: string; numeroCliente: string; bairroCliente: string; cidadeCliente: string;
  modeloMoto: string; placa: string; chassi: string; renavam: string; 
  anoFabricacao: string; anoModelo: string;
  km: string; valorVenda: string; formaPagamento: string; observacoes: string;
}

const perfis = {
  pai: { 
    nomeVendedor: 'Milton de Miranda Junior', 
    cpfVendedor: '156.627.508-31', 
    rgVendedor: '26.721.498-4', 
    enderecoVendedor: 'Rua Atilio Silvano, Nº 544, Jardim Maria Eugênia, Sorocaba/SP - CEP: 18074-410.' 
  },
  mae: { 
    nomeVendedor: 'Tiemi Sato de Miranda', 
    cpfVendedor: '213.934.118-00', 
    rgVendedor: '', 
    enderecoVendedor: 'Rua Atilio Silvano, Nº 544, Jardim Maria Eugênia, Sorocaba/SP - CEP: 18074-410.' 
  },
  amanda: { 
    nomeVendedor: 'Amanda Mayumi Sato de Miranda', 
    cpfVendedor: '', 
    rgVendedor: '', 
    enderecoVendedor: 'Rua Atilio Silvano, Nº 544, Jardim Maria Eugênia, Sorocaba/SP - CEP: 18074-410.' 
  },
  outro: { 
    nomeVendedor: '', 
    cpfVendedor: '', 
    rgVendedor: '', 
    enderecoVendedor: '' 
  },
  vazio: { 
    nomeVendedor: '', cpfVendedor: '', rgVendedor: '', enderecoVendedor: '' 
  }
};

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica', fontSize: 11, lineHeight: 1.35 }, // Margens e espaçamento de linha reduzidos
  title: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  paragraph: { marginBottom: 8, textAlign: 'justify' }, // Espaço entre os parágrafos um pouco menor
  bold: { fontFamily: 'Helvetica-Bold' },
  signatureSection: { marginTop: 25, flexDirection: 'row', justifyContent: 'space-between' }, // Menos espaço em branco antes de assinar
  signatureBox: { width: '45%', alignItems: 'center' },
  signatureLine: { borderTop: '1px solid black', width: '100%', marginTop: 25, marginBottom: 5 }
});

const ContratoPDF = ({ data }: { data: DocumentFormData }) => {
  const dataExtenso = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date());

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>CONTRATO DE COMPRA E VENDA</Text>

        <Text style={styles.paragraph}>
          Pelo presente instrumento e na melhor forma de direito, designado vendedor {data.nomeVendedor ? data.nomeVendedor.toUpperCase() : '_________________'}, inscrito no CPF {data.cpfVendedor || '_________________'} e RG {data.rgVendedor || '_________________'} residente e domiciliado na {data.enderecoVendedor || '_________________'}, Sorocaba/SP.  
        </Text>

        <Text style={styles.paragraph}>
          Doravante designado comprador, {data.nomeCliente ? data.nomeCliente.toUpperCase() : '_________________'}, inscrito no CPF {data.cpfCnpj || '_________________'} e RG {data.rgCliente || '_________________'}, residente e domiciliado na Rua {data.ruaCliente || '_________________'} Nº {data.numeroCliente || '____'}, {data.bairroCliente || '_________________'}, {data.cidadeCliente || '_________________'} - CEP: {data.cepCliente || '00000-000'}/ TELEFONE: {data.telefoneCliente || '(00) 00000-0000'}.  
        </Text>

        <Text style={styles.paragraph}>
          Doravante designado cliente, tem entre si, justo e avançado o que se segue: Em data, as partes avançaram a venda veículo, que assim se descreve: MARCA/ MODELO {data.modeloMoto ? data.modeloMoto.toUpperCase() : '_________________'}/ PLACA {data.placa ? data.placa.toUpperCase() : '_________'} / RENAVAM {data.renavam || '_________'} / ANO FABRICA {data.anoFabricacao || '____'}/ANO MODELO {data.anoModelo || '____'}/ CHASSI {data.chassi ? data.chassi.toUpperCase() : '_________________'} / VALOR R$ {data.valorVenda || '________'}. KM {data.km || '________'}.  
        </Text>

        <Text style={styles.paragraph}>
          Forma de pagamento: <Text style={styles.bold}>{data.formaPagamento ? data.formaPagamento.toUpperCase() : '_________________'}</Text>.  
        </Text>

        <Text style={styles.paragraph}>
          Transferência: Possíveis débitos ficam a cargo do cliente, que será pago diretamente no despachante ou por meios próprios, GARANTIA: SEM GARANTIA, MOTO VENDIDA NO ESTADO QUE SE ENCONTRA SEM GARANTIA.  
        </Text>

        <Text style={styles.paragraph}>
          CLAUSULA 1-O comprador deverá transferir o veículo dentro de 30 dias a partir deste contrato sendo que após o vencimento o vendedor não se responsabilizara por qualquer multa anterior ou posterior a data do mesmo.  
        </Text>

        <Text style={styles.paragraph}>
          CLAUSULA 2 - O recibo do veículo somente será entregue após a quitação.  
        </Text>

        <Text style={styles.paragraph}>
          CLAUSULA 3- A venda do referido veículo é feita com prévia vistoria do COMPRADOR, estando este de acordo com as condições gerais do mesmo, sendo MOTOR, CÂMBIO, SUSPENSÃO, LATARIA, CARENAGENS, ou seja, no estado em que se encontra no ato da realização do negócio.  
        </Text>

        <Text style={styles.paragraph}>
          CLAUSULA 4- Fica estipulado multa de 20% (VINTE POR CENTO) sobre o valor do veículo no caso de arrependimento de qualquer das partes.  
        </Text>

        <Text style={styles.paragraph}>
          CLAUSULA 5-O comprador fica responsável CIVIL E CRIMINALMENTE pelo veículo citado na clausula 1 a partir deste contrato.  
        </Text>

        <Text style={styles.paragraph}>
          E por estarem COMPRADOR E VENDEDOR de pleno acordo com o disposto neste instrumento particular e assinam, nunca mais podendo reclamar em quaisquer instancia ou juízo sob qualquer alegação que futuramente possa existir.  
        </Text>

        {data.observacoes ? <Text style={styles.paragraph}>Observações: {data.observacoes}</Text> : null}

        <Text style={[styles.paragraph, { marginTop: 20 }]}>Sorocaba, {dataExtenso}.</Text>

        <View style={styles.signatureSection} wrap={false}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text>{data.nomeVendedor ? data.nomeVendedor.toUpperCase() : 'NOME DO VENDEDOR'}</Text>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text>{data.nomeCliente ? data.nomeCliente.toUpperCase() : 'NOME DO COMPRADOR'}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function CompraEVenda({ voltarParaMenu }: CompraEVendaProps) {
  // AQUI: Iniciamos o formulário já puxando os dados do pai (...perfis.pai)
  const [formData, setFormData] = useState<DocumentFormData>({
    ...perfis.pai,
    nomeCliente: '', cpfCnpj: '', rgCliente: '', telefoneCliente: '', 
    cepCliente: '', ruaCliente: '', numeroCliente: '', bairroCliente: '', cidadeCliente: '',
    modeloMoto: '', placa: '', chassi: '', renavam: '', anoFabricacao: '', anoModelo: '', km: '', valorVenda: '', formaPagamento: '', observacoes: ''
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handlePerfilChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const perfilSelecionado = e.target.value as keyof typeof perfis;
    setFormData(prev => ({ ...prev, ...perfis[perfilSelecionado] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBuscaCep = async (e: React.FocusEvent<HTMLInputElement>) => {
    const rawCep = e.target.value || '';
    const cep = rawCep.replace(/\D/g, '');
    
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            ruaCliente: data.logradouro || '',
            bairroCliente: data.bairro || '',
            cidadeCliente: data.localidade ? `${data.localidade}/${data.uf}` : ''
          }));
        }
      } catch (error) {
        console.error("Erro na busca do CEP:", error);
      }
    }
  };

  const handleGerarPrevia = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const camposObrigatorios = [
      'nomeVendedor', 'cpfVendedor', 'rgVendedor', 'enderecoVendedor',
      'nomeCliente', 'cpfCnpj', 'rgCliente', 'telefoneCliente',
      'cepCliente', 'ruaCliente', 'numeroCliente', 'bairroCliente', 'cidadeCliente',
      'modeloMoto', 'placa', 'chassi', 'renavam', 'anoFabricacao', 'anoModelo',
      'valorVenda', 'formaPagamento'
    ]; 

    for (const campo of camposObrigatorios) {
      const valor = formData[campo as keyof DocumentFormData];
      if (!valor || valor.trim() === '') {
        alert("Atenção! Faltam dados. Por favor, preencha todos os campos do documento (exceto KM e Observações).");
        return; 
      }
    }

    try {
      const blob = await pdf(<ContratoPDF data={formData} />).toBlob();
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Houve um erro ao gerar o documento.");
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const link = document.createElement('a');
    link.href = previewUrl;
    const safeName = formData.nomeCliente.replace(/\s+/g, '_') || 'Cliente';
    link.download = `Contrato_Venda_${safeName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (previewUrl) {
    return (
      <div className="w-full max-w-4xl bg-white border-2 border-black rounded-2xl p-6 shadow-2xl h-[90vh] flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-center">Prévia do Documento</h2>
        <iframe src={previewUrl} className="w-full flex-grow border border-gray-300 rounded-lg mb-4" title="Prévia do Contrato" />
        <div className="flex gap-4">
          <button onClick={() => setPreviewUrl(null)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 rounded-xl transition">
            Voltar e Editar
          </button>
          <button onClick={handleDownload} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition shadow-lg">
            Aprovar e Baixar PDF
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl bg-white border-2 border-black rounded-2xl p-6 shadow-2xl max-h-[95vh] overflow-y-auto">
      
      <div className="mb-4 flex items-center border-b-2 border-gray-200 pb-4 relative">
        <button type="button" onClick={voltarParaMenu} className="cursor-pointer text-blue-600 font-bold hover:underline absolute left-0">
          &larr; Voltar
        </button>
        <h1 className="text-2xl font-extrabold tracking-tight w-full text-center">Contrato de Venda</h1>
      </div>

      <form onSubmit={handleGerarPrevia} className="space-y-6">
        
        {/* BLOCO 1: VENDEDOR */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg text-blue-700">1. Dados do Vendedor</h2>
            
            {/* AQUI: O defaultValue="pai" e a opção "outro" por último */}
            <select onChange={handlePerfilChange} defaultValue="pai" className="border border-gray-300 rounded p-1 text-sm bg-white cursor-pointer">
              <option value="pai">Junior (Loja)</option>
              <option value="mae">Tiemi Sato</option>
              <option value="amanda">Amanda Mayumi</option>
              <option value="outro">OUTRO</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="text" name="nomeVendedor" placeholder="Nome do Vendedor" value={formData.nomeVendedor} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="cpfVendedor" placeholder="CPF do Vendedor" value={formData.cpfVendedor} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="rgVendedor" placeholder="RG do Vendedor" value={formData.rgVendedor} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="enderecoVendedor" placeholder="Endereço Completo" value={formData.enderecoVendedor} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
          </div>
        </div>

        {/* BLOCO 2: COMPRADOR */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h2 className="font-bold text-lg text-blue-700 mb-3">2. Dados do Comprador</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input type="text" name="nomeCliente" placeholder="Nome do Comprador" value={formData.nomeCliente} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="cpfCnpj" placeholder="CPF / CNPJ" value={formData.cpfCnpj} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="rgCliente" placeholder="RG" value={formData.rgCliente} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="telefoneCliente" placeholder="Telefone" value={formData.telefoneCliente} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-gray-300 pt-3">
            <input type="text" name="cepCliente" placeholder="CEP" value={formData.cepCliente} onChange={handleChange} onBlur={handleBuscaCep} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="cidadeCliente" placeholder="Cidade/UF" value={formData.cidadeCliente} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm col-span-1 md:col-span-3 bg-gray-50" required />
            
            <input type="text" name="ruaCliente" placeholder="Rua / Logradouro" value={formData.ruaCliente} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm col-span-2 md:col-span-3 bg-gray-50" required />
            <input type="text" name="numeroCliente" placeholder="Número" value={formData.numeroCliente} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm col-span-2 md:col-span-1" required />
            
            <input type="text" name="bairroCliente" placeholder="Bairro" value={formData.bairroCliente} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm col-span-2 md:col-span-4 bg-gray-50" required />
          </div>
        </div>

        {/* BLOCO 3: MOTO E VENDA */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h2 className="font-bold text-lg text-blue-700 mb-3">3. Dados da Moto e Venda</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <input type="text" name="modeloMoto" placeholder="Modelo / Marca" value={formData.modeloMoto} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm md:col-span-2" required />
            <input type="text" name="placa" placeholder="Placa" value={formData.placa} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="km" placeholder="KM (Opcional)" value={formData.km} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" />
            
            <input type="text" name="chassi" placeholder="Chassi" value={formData.chassi} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm md:col-span-2" required />
            <input type="text" name="anoFabricacao" placeholder="Ano Fabricação" value={formData.anoFabricacao} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="anoModelo" placeholder="Ano Modelo" value={formData.anoModelo} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            
            <input type="text" name="renavam" placeholder="Renavam" value={formData.renavam} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm md:col-span-2" required />
            <input type="text" name="valorVenda" placeholder="Valor total (R$)" value={formData.valorVenda} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm md:col-span-2 font-bold" required />
            <input type="text" name="formaPagamento" placeholder="Ex: 5000 din. e 2000 PIX" value={formData.formaPagamento} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm md:col-span-4" required />
          </div>
        </div>

        {/* BLOCO 4: OBSERVAÇÕES */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h2 className="font-bold text-sm text-gray-700 mb-2">Observações Adicionais (Opcional)</h2>
          <textarea name="observacoes" placeholder="Qualquer acordo ou detalhe extra..." value={formData.observacoes} onChange={handleChange} rows={2} className="w-full border border-gray-300 rounded p-2 text-sm resize-none" />
        </div>

        <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl text-lg transition duration-200 transform active:scale-[0.99] shadow-lg">
          Gerar Prévia do Documento
        </button>

      </form>
    </div>
  );
}