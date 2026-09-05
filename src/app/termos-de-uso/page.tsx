import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ColorWrapper } from "@/components/ColorWrapper";

export default function TermosDeUso() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <ColorWrapper>
          <div className="container mx-auto px-6 max-w-4xl min-h-[60vh]">
            <h1 className="text-3xl md:text-5xl font-bold mb-8 text-white">Termos de Uso</h1>
            
            <div className="space-y-6 text-zinc-300 font-light leading-relaxed">
              <p>
                Bem-vindo ao site da <strong>Zinid Estética Automotiva</strong>. Ao acessar e utilizar este site, 
                você concorda em cumprir e sujeitar-se aos seguintes termos e condições de uso.
              </p>

              <h2 className="text-xl font-medium text-white mt-8 mb-4">1. Serviços</h2>
              <p>
                As informações detalhadas em nosso site referem-se aos serviços de estética automotiva prestados 
                em nossa loja física em Betim - MG. Os valores mencionados em orçamentos e agendamentos estão sujeitos 
                a avaliação presencial do veículo.
              </p>

              <h2 className="text-xl font-medium text-white mt-8 mb-4">2. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo deste site, incluindo textos, gráficos, logotipos, imagens de "antes e depois" e 
                estrutura de design, são de propriedade exclusiva da Zinid Estética Automotiva. É expressamente proibida 
                a cópia, reprodução ou uso indevido deste material sem autorização prévia.
              </p>

              <h2 className="text-xl font-medium text-white mt-8 mb-4">3. Limitação de Responsabilidade</h2>
              <p>
                Embora nos esforcemos para manter todas as informações do site sempre precisas e atualizadas, a Zinid 
                Estética Automotiva não garante que o conteúdo esteja sempre livre de erros tipográficos ou de 
                omissões temporárias. Reservamo-nos o direito de alterar descrições e pacotes a qualquer momento, 
                sem aviso prévio.
              </p>

              <h2 className="text-xl font-medium text-white mt-8 mb-4">4. Agendamentos e Orçamentos</h2>
              <p>
                Os agendamentos iniciados através dos links deste site (via WhatsApp) não garantem a reserva automática 
                do horário até que haja uma confirmação explícita por parte de nossa equipe de atendimento.
              </p>

              <p className="pt-8 text-sm text-zinc-500">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </ColorWrapper>
      </main>
      <Footer />
    </>
  );
}
