import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const PoliticaCookies = () => {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-black text-4xl md:text-5xl text-primary-foreground mb-6">
              Política de <span className="text-gradient-orange">Cookies</span>
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
                <h2 className="font-display font-bold text-2xl mb-4">1. O que são Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo 
                  (computador, tablet ou celular) quando você visita um site. Eles são amplamente 
                  utilizados para fazer os sites funcionarem de maneira mais eficiente e fornecer 
                  informações aos proprietários do site.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">2. Como Utilizamos Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nosso site utiliza cookies para:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Garantir o funcionamento correto do site</li>
                  <li>Lembrar suas preferências de navegação</li>
                  <li>Analisar como os visitantes usam nosso site</li>
                  <li>Melhorar a experiência do usuário</li>
                  <li>Personalizar conteúdo relevante para você</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">3. Tipos de Cookies que Utilizamos</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-bold text-foreground mb-2">Cookies Essenciais</h3>
                    <p className="text-muted-foreground text-sm">
                      Necessários para o funcionamento básico do site. Sem eles, o site não 
                      funcionaria corretamente.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-bold text-foreground mb-2">Cookies de Desempenho</h3>
                    <p className="text-muted-foreground text-sm">
                      Coletam informações sobre como os visitantes usam o site, como quais 
                      páginas são mais visitadas. Todas as informações são agregadas e anônimas.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-bold text-foreground mb-2">Cookies de Funcionalidade</h3>
                    <p className="text-muted-foreground text-sm">
                      Permitem que o site lembre de escolhas que você fez (como seu nome de 
                      usuário ou idioma) e forneça recursos aprimorados e personalizados.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-bold text-foreground mb-2">Cookies de Marketing</h3>
                    <p className="text-muted-foreground text-sm">
                      Utilizados para rastrear visitantes em sites. A intenção é exibir anúncios 
                      que sejam relevantes e envolventes para o usuário individual.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">4. Cookies de Terceiros</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nosso site pode utilizar serviços de terceiros que também podem definir cookies 
                  em seu dispositivo. Estes incluem:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                  <li>Google Analytics - para análise de tráfego</li>
                  <li>WhatsApp - para o botão de contato</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">5. Como Gerenciar Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Você pode controlar e/ou excluir cookies conforme sua preferência. A maioria 
                  dos navegadores permite que você:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Veja quais cookies estão armazenados e exclua-os individualmente</li>
                  <li>Bloqueie cookies de terceiros</li>
                  <li>Bloqueie cookies de sites específicos</li>
                  <li>Bloqueie todos os cookies</li>
                  <li>Exclua todos os cookies ao fechar o navegador</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  <strong>Atenção:</strong> Se você bloquear cookies, algumas funcionalidades 
                  do site podem não funcionar corretamente.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">6. Como Desativar Cookies no Navegador</h2>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    <strong>Google Chrome:</strong> Configurações → Privacidade e segurança → Cookies
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Mozilla Firefox:</strong> Opções → Privacidade e Segurança → Cookies
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Safari:</strong> Preferências → Privacidade → Cookies
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Microsoft Edge:</strong> Configurações → Cookies e permissões de site
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">7. Alterações nesta Política</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos atualizar esta Política de Cookies periodicamente. Recomendamos que 
                  você revise esta página regularmente para se manter informado sobre nosso 
                  uso de cookies.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl mb-4">8. Contato</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato:
                </p>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-foreground font-medium">LF Fretes e Mudanças</p>
                  <p className="text-muted-foreground">E-mail: contato@fretesembauru.com.br</p>
                  <p className="text-muted-foreground">Telefone: (14) 98834-0448</p>
                </div>
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

export default PoliticaCookies;