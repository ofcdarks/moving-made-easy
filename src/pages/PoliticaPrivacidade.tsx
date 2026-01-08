import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const PoliticaPrivacidade = () => {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-black text-4xl md:text-5xl text-primary-foreground mb-6">
              Política de <span className="text-gradient-orange">Privacidade</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80">
              Última atualização: Janeiro de 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border space-y-8">
              
              <div>
                <h2 className="font-display font-bold text-2xl mb-4">1. Introdução</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A LF Fretes e Mudanças ("nós", "nosso" ou "empresa") está comprometida em proteger 
                  a privacidade e os dados pessoais de nossos clientes e visitantes do site. Esta 
                  Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos 
                  suas informações pessoais.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">2. Dados que Coletamos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Podemos coletar os seguintes tipos de informações:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Nome completo</li>
                  <li>Número de telefone e WhatsApp</li>
                  <li>Endereço de e-mail</li>
                  <li>Endereços de origem e destino da mudança</li>
                  <li>Informações sobre os itens a serem transportados</li>
                  <li>Dados de navegação no site (cookies)</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">3. Como Usamos seus Dados</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Utilizamos suas informações para:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Elaborar orçamentos personalizados</li>
                  <li>Prestar os serviços de frete e mudança contratados</li>
                  <li>Entrar em contato sobre agendamentos e atualizações</li>
                  <li>Enviar comunicações sobre promoções (mediante consentimento)</li>
                  <li>Melhorar nossos serviços e experiência do usuário</li>
                  <li>Cumprir obrigações legais e regulatórias</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">4. Compartilhamento de Dados</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros 
                  para fins de marketing. Podemos compartilhar dados apenas com parceiros de 
                  transporte quando necessário para a prestação do serviço, e com autoridades 
                  quando exigido por lei.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">5. Segurança dos Dados</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger 
                  suas informações contra acesso não autorizado, alteração, divulgação ou 
                  destruição. Utilizamos criptografia e práticas seguras de armazenamento.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">6. Seus Direitos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Acessar seus dados pessoais que mantemos</li>
                  <li>Corrigir dados incompletos ou desatualizados</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Revogar consentimento a qualquer momento</li>
                  <li>Solicitar a portabilidade dos dados</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">7. Retenção de Dados</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades 
                  para as quais foram coletados, incluindo obrigações legais, contábeis ou de 
                  prestação de contas.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">8. Contato</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre 
                  em contato conosco:
                </p>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-foreground font-medium">LF Fretes e Mudanças</p>
                  <p className="text-muted-foreground">E-mail: contato@fretesembauru.com.br</p>
                  <p className="text-muted-foreground">Telefone: (14) 99605-4098</p>
                  <p className="text-muted-foreground">Bauru, SP</p>
                </div>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">9. Alterações nesta Política</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer 
                  momento. Recomendamos que você revise esta página periodicamente para se 
                  manter informado sobre nossas práticas de privacidade.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </main>
  );
};

export default PoliticaPrivacidade;