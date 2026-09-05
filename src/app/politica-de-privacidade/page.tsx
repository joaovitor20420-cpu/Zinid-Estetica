import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ColorWrapper } from "@/components/ColorWrapper";

export default function PoliticaDePrivacidade() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <ColorWrapper>
          <div className="container mx-auto px-6 max-w-4xl min-h-[60vh]">
            <h1 className="text-3xl md:text-5xl font-bold mb-8 text-white">Política de Privacidade</h1>
            
            <div className="space-y-6 text-zinc-300 font-light leading-relaxed">
              <p>
                A <strong>Zinid Estética Automotiva</strong> valoriza a privacidade dos seus clientes. 
                Esta Política de Privacidade explica como coletamos, usamos e protegemos as suas informações 
                pessoais ao interagir com o nosso site e serviços.
              </p>

              <h2 className="text-xl font-medium text-white mt-8 mb-4">1. Coleta de Informações</h2>
              <p>
                Coletamos informações básicas de contato (como nome e número de telefone) apenas quando você 
                entra em contato voluntariamente conosco através de nossos botões de WhatsApp ou formulários 
                de agendamento.
              </p>

              <h2 className="text-xl font-medium text-white mt-8 mb-4">2. Uso das Informações</h2>
              <p>
                As informações fornecidas são utilizadas exclusivamente para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Agendar e organizar os serviços de estética automotiva solicitados.</li>
                <li>Responder às suas dúvidas e fornecer orçamentos.</li>
                <li>Enviar lembretes sobre agendamentos ou manutenções periódicas recomendadas.</li>
              </ul>

              <h2 className="text-xl font-medium text-white mt-8 mb-4">3. Proteção e Compartilhamento de Dados</h2>
              <p>
                A Zinid Estética Automotiva <strong>não vende, não aluga e não compartilha</strong> seus dados 
                com empresas terceiras para fins de marketing. Suas informações são mantidas em sigilo e 
                utilizadas apenas para a relação comercial direta entre você e nossa estética.
              </p>

              <h2 className="text-xl font-medium text-white mt-8 mb-4">4. Cookies</h2>
              <p>
                Nosso site pode utilizar cookies básicos de navegação para melhorar a performance e a experiência 
                do usuário. Nenhum dado pessoal sensível é rastreado por meio desses cookies.
              </p>

              <h2 className="text-xl font-medium text-white mt-8 mb-4">5. Contato</h2>
              <p>
                Se você tiver qualquer dúvida sobre como tratamos seus dados, entre em contato através do nosso 
                telefone/WhatsApp: <strong>(31) 99599-8390</strong>.
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
