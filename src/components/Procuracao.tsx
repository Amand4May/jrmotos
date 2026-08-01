import { useState } from 'react';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface ProcuracaoProps {
  voltarParaMenu: () => void;
}

interface ProcuracaoFormData {
  nomeOutorgante: string;
  cpfOutorgante: string;
  cidadeOutorgante: string;
  ufOutorgante: string;
  marca: string;
  versao: string;
  anoFabricacao: string;
  anoModelo: string;
  cor: string;
  placa: string;
  renavam: string;
  chassi: string;
}

/* =====================================================================
   ESTILOS COMPRIMIDOS PARA CABER EM 1 PÁGINA
======================================================================== */
const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica', fontSize: 11, lineHeight: 1.3 }, // Margem e fonte reduzidas
  title: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, textDecoration: 'underline' },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', marginTop: 10 },
  paragraph: { marginBottom: 8, textAlign: 'justify' }, // Espaço entre parágrafos menor
  list: { marginLeft: 20, marginBottom: 8 },
  listItem: { marginBottom: 2 },
  
  // A seção de assinatura ganha wrap={false} indiretamente no código, mas também diminuímos o espaço acima dela
  signatureSection: { marginTop: 40, alignItems: 'center' }, 
  signatureLine: { borderTop: '1px solid black', width: '60%', marginTop: 20, marginBottom: 5 },
  signatureText: { textAlign: 'center', fontFamily: 'Helvetica-Bold' },
  signatureSub: { textAlign: 'center', fontSize: 9 }
});

const ProcuracaoPDF = ({ data }: { data: ProcuracaoFormData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>PROCURAÇÃO</Text>

        <Text style={styles.sectionTitle}>OUTORGANTE:</Text>
        <Text style={styles.paragraph}>
          {data.nomeOutorgante ? data.nomeOutorgante.toUpperCase() : '_________________'}, CPF: {data.cpfOutorgante || '_________________'} residente e domiciliado na cidade de {data.cidadeOutorgante ? data.cidadeOutorgante.toUpperCase() : '_________________'}-{data.ufOutorgante ? data.ufOutorgante.toUpperCase() : '___'}.
        </Text>

        <Text style={styles.sectionTitle}>OUTORGADA:</Text>
        <Text style={styles.paragraph}>
          MILTON DE MIRANDA JUNIOR, inscrito no CPF: 156.627.508-31 e RG: 26.721.498-4 e TIEMI SATO DE MIRANDA, inscrito no CPF 213.934.118-00 e RG 30.902.224-1, residente e domiciliado na rua Atílio Silvano, 544, Jardim Maria Eugênia, Sorocaba/SP - CEP: 18074-410.
        </Text>

        <Text style={styles.sectionTitle}>PODERES:</Text>
        <Text style={styles.paragraph}>
          a quem confere poderes para vender, ceder, ou transferir, a quem quiser, inclusive si própria, pelo preço e condições que convencionar, o veículo:
        </Text>

        <View style={styles.list}>
          <Text style={styles.listItem}>MARCA: {data.marca ? data.marca.toUpperCase() : '_________________'}</Text>
          <Text style={styles.listItem}>VERSÃO: {data.versao ? data.versao.toUpperCase() : '_________________'}</Text>
          <Text style={styles.listItem}>ANO: {data.anoFabricacao || '____'}</Text>
          <Text style={styles.listItem}>MODELO: {data.anoModelo || '____'}</Text>
          <Text style={styles.listItem}>COR: {data.cor ? data.cor.toUpperCase() : '_________________'}</Text>
          <Text style={styles.listItem}>PLACA: {data.placa ? data.placa.toUpperCase() : '_______'}</Text>
          <Text style={styles.listItem}>RENAVAM: {data.renavam || '_________________'}</Text>
          <Text style={styles.listItem}>CHASSI: {data.chassi ? data.chassi.toUpperCase() : '_________________'}</Text>
        </View>

        <Text style={styles.paragraph}>
          podendo assinar todos os documentos relativos a transferências inclusive a si mesmo, dar e receber quitação, fazer declarações; representa-lo nas repartições públicas em geral, delegacias em geral, despachantes, DETRAN, CIRETRAN, CONTRAN, DNER, Companhias Seguradoras, Inspetoria de Transito, Delegacias de Roubos e Furtos de Veículos, Instituições Financeiras, pátios de estacionamentos e onde mais for necessário, neles assinando, requerendo, juntando e retirando documentos, pagando taxas, guias, emolumentos, seguros, prêmios e reclamar indevidos, receber e dar quitação, requerer segunda via de CRV, DUT, IPVA, certidões e certificados, promover emplacamentos, licenciamentos, liberações inclusive em caso de apreensão, vistorias, requerer e tomar ciência de laudos periciais, receber quaisquer valores referentes a seguros, em quaisquer estabelecimento bancário e Companhias de Seguros, praticando, enfim, todos os atos necessários ao cabal desempenho do presente mandato, inclusive substabelecer.
        </Text>

        {/* wrap={false} é um "truque" da biblioteca que diz: Se este bloco tentar quebrar de página, não deixe! Mantenha ele unido. Como reduzimos as margens, ele agora caberá perfeitamente na página 1. */}
        <View style={styles.signatureSection} wrap={false}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>{data.nomeOutorgante ? data.nomeOutorgante.toUpperCase() : 'NOME DO OUTORGANTE'}</Text>
          <Text style={styles.signatureSub}>(Reconhecer firma por autenticidade)</Text>
        </View>
      </Page>
    </Document>
  );
};

export default function Procuracao({ voltarParaMenu }: ProcuracaoProps) {
  const [formData, setFormData] = useState<ProcuracaoFormData>({
    nomeOutorgante: '', cpfOutorgante: '', cidadeOutorgante: '', ufOutorgante: '',
    marca: '', versao: '', anoFabricacao: '', anoModelo: '', cor: '', placa: '', renavam: '', chassi: ''
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGerarPrevia = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const camposObrigatorios = Object.keys(formData);
    for (const campo of camposObrigatorios) {
      if (!formData[campo as keyof ProcuracaoFormData] || formData[campo as keyof ProcuracaoFormData].trim() === '') {
        alert("Atenção! Preencha todos os campos do documento para gerar a procuração.");
        return; 
      }
    }

    try {
      const blob = await pdf(<ProcuracaoPDF data={formData} />).toBlob();
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Houve um erro ao gerar a procuração.");
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const link = document.createElement('a');
    link.href = previewUrl;
    const safeName = formData.nomeOutorgante.replace(/\s+/g, '_') || 'Cliente';
    link.download = `Procuracao_${safeName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (previewUrl) {
    return (
      <div className="w-full max-w-4xl bg-white border-2 border-black rounded-2xl p-6 shadow-2xl h-[90vh] flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-center">Prévia da Procuração</h2>
        <iframe src={previewUrl} className="w-full flex-grow border border-gray-300 rounded-lg mb-4" title="Prévia da Procuração" />
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
        <h1 className="text-2xl font-extrabold tracking-tight w-full text-center">Gerar Procuração</h1>
      </div>

      <form onSubmit={handleGerarPrevia} className="space-y-6">
        
        {/* BLOCO 1: OUTORGANTE */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h2 className="font-bold text-lg text-blue-700 mb-3">1. Dados do Outorgante (Cliente)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="text" name="nomeOutorgante" placeholder="Nome Completo" value={formData.nomeOutorgante} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="cpfOutorgante" placeholder="CPF" value={formData.cpfOutorgante} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="cidadeOutorgante" placeholder="Cidade (Ex: Sorocaba)" value={formData.cidadeOutorgante} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="ufOutorgante" placeholder="Estado (Ex: SP)" value={formData.ufOutorgante} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" maxLength={2} required />
          </div>
        </div>

        {/* BLOCO 2: MOTO */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h2 className="font-bold text-lg text-blue-700 mb-3">2. Dados do Veículo</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <input type="text" name="marca" placeholder="Marca" value={formData.marca} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm md:col-span-2" required />
            <input type="text" name="versao" placeholder="Versão / Modelo" value={formData.versao} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm md:col-span-2" required />
            
            <input type="text" name="anoFabricacao" placeholder="Ano Fab." value={formData.anoFabricacao} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="anoModelo" placeholder="Ano Mod." value={formData.anoModelo} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="cor" placeholder="Cor" value={formData.cor} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            <input type="text" name="placa" placeholder="Placa" value={formData.placa} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm" required />
            
            <input type="text" name="renavam" placeholder="Renavam" value={formData.renavam} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm md:col-span-2" required />
            <input type="text" name="chassi" placeholder="Chassi" value={formData.chassi} onChange={handleChange} className="border border-gray-300 rounded p-2 text-sm md:col-span-2" required />
          </div>
        </div>

        <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl text-lg transition duration-200 transform active:scale-[0.99] shadow-lg">
          Gerar Prévia da Procuração
        </button>
      </form>
    </div>
  );
}