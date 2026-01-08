import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ServiceModal, { ServiceData } from "@/components/ServiceModal";
import AnimatedCard from "@/components/AnimatedCard";
import { 
  Home, Building2, Truck, Package, Wrench, MapPin, Clock, Shield, Phone,
  CalendarCheck, Briefcase, ArrowDownUp, Share2, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppWebUrl, openWhatsApp } from "@/lib/whatsapp";
import serviceResidential from "@/assets/service-residential.jpg";
import serviceCommercial from "@/assets/service-commercial.jpg";
import serviceFreight from "@/assets/service-freight.jpg";
import serviceLoading from "@/assets/service-loading.jpg";
import serviceEvents from "@/assets/service-events.jpg";
import servicePacking from "@/assets/service-packing.jpg";

const services: ServiceData[] = [
  {
    icon: Home,
    title: "Mudanças Residenciais",
    description: "Serviço completo para sua mudança residencial. Cuidamos de cada detalhe, desde a embalagem até a montagem dos móveis no novo endereço.",
    image: serviceResidential,
    features: [
      "Embalagem profissional de todos os itens",
      "Desmontagem e montagem de móveis",
      "Transporte seguro com caminhão baú",
      "Seguro de carga incluso",
      "Equipe uniformizada e treinada",
      "Materiais de embalagem inclusos",
    ],
    fullDescription: "Nossa equipe especializada cuida de toda a sua mudança residencial com o máximo cuidado e atenção. Desde a embalagem cuidadosa de cada item até a montagem dos móveis no novo endereço, garantimos uma experiência tranquila e sem estresse. Utilizamos materiais de primeira qualidade e técnicas profissionais para proteger seus pertences durante todo o processo.",
    benefits: [
      "Economia de tempo e esforço físico",
      "Proteção total dos seus pertences",
      "Equipe experiente e confiável",
      "Preço justo e orçamento transparente",
      "Flexibilidade de horários",
    ],
    process: [
      "Entre em contato para agendar uma visita técnica gratuita",
      "Avaliamos o volume e os itens a serem transportados",
      "Enviamos um orçamento detalhado sem compromisso",
      "Agendamos a data e horário conforme sua disponibilidade",
      "No dia, nossa equipe embala, transporta e monta tudo",
    ],
  },
  {
    icon: Building2,
    title: "Mudanças Comerciais",
    description: "Minimize o tempo de parada do seu negócio. Nossa equipe está preparada para realizar mudanças comerciais com agilidade e eficiência.",
    image: serviceCommercial,
    features: [
      "Planejamento personalizado",
      "Mudança em horários alternativos",
      "Transporte de equipamentos",
      "Documentação de inventário",
      "Mínima interrupção das atividades",
      "Desmontagem de móveis corporativos",
    ],
    fullDescription: "Entendemos que o tempo é dinheiro para empresas. Por isso, nosso serviço de mudança comercial é planejado para minimizar o impacto nas suas operações. Podemos realizar a mudança durante a noite, finais de semana ou feriados, garantindo que seu negócio continue funcionando normalmente.",
    benefits: [
      "Mínima interrupção do seu negócio",
      "Planejamento estratégico da mudança",
      "Transporte seguro de equipamentos sensíveis",
      "Inventário completo de todos os itens",
      "Sigilo e confidencialidade garantidos",
    ],
    process: [
      "Reunião para entender as necessidades do seu negócio",
      "Elaboração de um plano de mudança personalizado",
      "Orçamento detalhado e cronograma de execução",
      "Execução da mudança conforme o planejado",
      "Conferência de inventário e organização no novo espaço",
    ],
  },
  {
    icon: Share2,
    title: "Mudança Compartilhada",
    description: "Economize com nossa modalidade de mudança compartilhada. Ideal para quem quer reduzir custos dividindo o frete.",
    image: serviceFreight,
    features: [
      "Custo reduzido significativamente",
      "Rotas otimizadas",
      "Prazo flexível",
      "Ideal para pequenos volumes",
      "Mesmo cuidado e qualidade",
      "Rastreamento da carga",
    ],
    fullDescription: "A mudança compartilhada é a solução perfeita para quem precisa transportar poucos itens ou tem flexibilidade de prazo. Combinamos sua carga com outras no mesmo trajeto, dividindo os custos e tornando o serviço muito mais acessível. Mantemos o mesmo padrão de qualidade e segurança.",
    benefits: [
      "Economia de até 60% no valor do frete",
      "Perfeito para quem está começando",
      "Solução sustentável (menos viagens)",
      "Ideal para móveis de solteiro",
      "Flexibilidade no prazo de entrega",
    ],
    process: [
      "Informe sua origem, destino e volume de itens",
      "Verificamos rotas disponíveis e compatibilidade",
      "Enviamos orçamento com prazo estimado",
      "Agendamos coleta conforme disponibilidade de rota",
      "Entregamos no destino com segurança",
    ],
  },
  {
    icon: Truck,
    title: "Fretes em Geral",
    description: "Transporte de cargas e mercadorias para qualquer destino. Caminhões baú de diversos tamanhos para atender sua necessidade.",
    image: serviceFreight,
    features: [
      "Frete local e interestadual",
      "Rastreamento da carga",
      "Entrega expressa disponível",
      "Caminhões de diversos tamanhos",
      "Seguro de carga",
      "Documentação fiscal",
    ],
    fullDescription: "Oferecemos serviços de frete para todo tipo de carga, seja para transportar móveis, equipamentos, mercadorias ou materiais diversos. Nossa frota conta com veículos de diferentes capacidades para atender desde pequenos volumes até cargas maiores.",
    benefits: [
      "Flexibilidade de veículos",
      "Atendimento em todo o Brasil",
      "Preço competitivo",
      "Pontualidade garantida",
      "Carga segurada",
    ],
    process: [
      "Descreva o que precisa transportar",
      "Informamos o veículo adequado",
      "Orçamento rápido e sem compromisso",
      "Agendamos a coleta",
      "Entregamos no destino com segurança",
    ],
  },
  {
    icon: Briefcase,
    title: "Agenciamento de Cargas",
    description: "Gerenciamos todo o processo logístico da sua carga, desde a coleta até a entrega final com eficiência.",
    image: serviceLoading,
    features: [
      "Gestão completa de transporte",
      "Otimização de rotas",
      "Acompanhamento em tempo real",
      "Documentação fiscal",
      "Negociação de fretes",
      "Relatórios detalhados",
    ],
    fullDescription: "Nosso serviço de agenciamento de cargas oferece uma solução completa para empresas que precisam de gestão logística eficiente. Cuidamos de todo o processo, desde a negociação de fretes até a entrega final, permitindo que você foque no seu negócio.",
    benefits: [
      "Redução de custos logísticos",
      "Menos preocupação operacional",
      "Acesso a uma rede de transportadores",
      "Gestão profissional da sua carga",
      "Relatórios e controle total",
    ],
    process: [
      "Apresente suas demandas logísticas",
      "Analisamos a melhor solução de transporte",
      "Negociamos fretes com nossa rede de parceiros",
      "Gerenciamos toda a operação",
      "Fornecemos relatórios e acompanhamento",
    ],
  },
  {
    icon: ArrowDownUp,
    title: "Carga e Descarga",
    description: "Equipe especializada para carregar e descarregar seus itens com todo cuidado e agilidade necessários.",
    image: serviceLoading,
    features: [
      "Equipe treinada",
      "Equipamentos adequados",
      "Manuseio cuidadoso",
      "Organização eficiente",
      "Rapidez no serviço",
      "Disponível avulso",
    ],
    fullDescription: "Precisa apenas de ajuda para carregar ou descarregar? Nossa equipe está pronta para auxiliar! Contamos com profissionais experientes e equipamentos adequados para manusear seus itens com segurança e agilidade.",
    benefits: [
      "Evite esforço físico",
      "Profissionais experientes",
      "Serviço rápido",
      "Disponível para contratação avulsa",
      "Cuidado com seus pertences",
    ],
    process: [
      "Informe local e volume aproximado",
      "Enviamos orçamento imediato",
      "Agendamos horário conveniente",
      "Nossa equipe realiza o serviço",
      "Conferência e liberação",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Transporte para Feiras e Eventos",
    description: "Transporte especializado para feiras, exposições e eventos. Pontualidade garantida para seu stand ou material.",
    image: serviceEvents,
    features: [
      "Pontualidade garantida",
      "Montagem no local",
      "Cuidado com materiais delicados",
      "Atendimento a eventos corporativos",
      "Transporte de stands",
      "Acompanhamento técnico",
    ],
    fullDescription: "Sabemos a importância de chegar no horário certo em eventos. Nosso serviço especializado para feiras e exposições garante que seu material chegue em perfeitas condições e dentro do prazo. Podemos auxiliar inclusive na montagem do seu stand.",
    benefits: [
      "Pontualidade é prioridade",
      "Experiência com eventos",
      "Cuidado com materiais promocionais",
      "Possibilidade de montagem",
      "Atendimento personalizado",
    ],
    process: [
      "Informe data, local e materiais",
      "Planejamos a logística do evento",
      "Orçamento detalhado",
      "Coleta e transporte seguro",
      "Entrega no horário acordado",
    ],
  },
  {
    icon: Package,
    title: "Embalagem Profissional",
    description: "Proteja seus pertences com nosso serviço de embalagem profissional. Utilizamos materiais de alta qualidade.",
    image: servicePacking,
    features: [
      "Caixas de papelão reforçado",
      "Plástico bolha e mantas",
      "Embalagem para itens frágeis",
      "Etiquetagem organizada",
      "Materiais de primeira linha",
      "Técnicas profissionais",
    ],
    fullDescription: "A embalagem adequada é fundamental para proteger seus pertences durante o transporte. Nossa equipe utiliza técnicas profissionais e materiais de alta qualidade para garantir que cada item chegue em perfeito estado ao destino.",
    benefits: [
      "Proteção máxima dos seus itens",
      "Organização por cômodos",
      "Facilita a desembalagem",
      "Materiais recicláveis",
      "Economia de tempo",
    ],
    process: [
      "Avaliamos os itens a embalar",
      "Separamos materiais adequados",
      "Embalamos item por item com cuidado",
      "Etiquetamos por categoria/cômodo",
      "Itens prontos para transporte seguro",
    ],
  },
  {
    icon: Wrench,
    title: "Montagem e Desmontagem",
    description: "Nossa equipe é capacitada para montar e desmontar todos os tipos de móveis com cuidado e agilidade.",
    image: serviceResidential,
    features: [
      "Profissionais capacitados",
      "Ferramentas adequadas",
      "Cuidado com acabamentos",
      "Montagem no destino",
      "Organização de peças",
      "Conferência final",
    ],
    fullDescription: "Muitos móveis precisam ser desmontados para transporte seguro. Nossa equipe possui experiência e ferramentas adequadas para desmontar e montar seus móveis preservando a qualidade e integridade de cada peça.",
    benefits: [
      "Preservação dos móveis",
      "Profissionais experientes",
      "Ferramentas profissionais",
      "Organização das peças",
      "Montagem no novo endereço",
    ],
    process: [
      "Avaliação dos móveis",
      "Desmontagem cuidadosa",
      "Organização e identificação das peças",
      "Transporte seguro",
      "Montagem completa no destino",
    ],
  },
];

const benefits = [
  { icon: MapPin, text: "Atendemos todo o Brasil" },
  { icon: Clock, text: "Pontualidade garantida" },
  { icon: Shield, text: "Seguro de carga" },
];

const WHATSAPP_TEXT = "Olá! Gostaria de solicitar um orçamento.";

const Servicos = () => {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (service: ServiceData) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero" id="servicos">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-black text-4xl md:text-5xl text-primary-foreground mb-6">
              Nossos <span className="text-gradient-orange">Serviços</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80 mb-8">
              Soluções logísticas completas para sua mudança ou frete
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <benefit.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-secondary-foreground/70">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedCard key={index} delay={index * 100}>
                <div
                  id={service.title.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border h-full"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => handleOpenModal(service)}
                      className="absolute top-3 right-3 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`Mais informações sobre ${service.title}`}
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 bg-brand-orange-light rounded-xl flex items-center justify-center mb-4 -mt-12 relative z-10 border-4 border-card">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-2"
                        onClick={() => handleOpenModal(service)}
                      >
                        <Info className="w-4 h-4" />
                        Saiba Mais
                      </Button>
                      <a
                        href={buildWhatsAppWebUrl(WHATSAPP_TEXT)}
                        onClick={(e) => {
                          e.preventDefault();
                          openWhatsApp(`Olá! Gostaria de saber mais sobre ${service.title}.`);
                        }}
                        className="flex-1"
                      >
                        <Button variant="default" size="sm" className="w-full gap-2 bg-gradient-orange hover:opacity-90">
                          <Phone className="w-4 h-4" />
                          Orçamento
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-black text-3xl md:text-4xl text-primary-foreground mb-6">
            Precisa de um serviço personalizado?
          </h2>
          <p className="text-secondary-foreground/70 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e vamos criar uma solução sob medida para você.
          </p>
          <a
            href={buildWhatsAppWebUrl(WHATSAPP_TEXT)}
            onClick={(e) => {
              e.preventDefault();
              openWhatsApp(WHATSAPP_TEXT);
            }}
          >
            <Button size="lg" className="gap-2 bg-gradient-orange shadow-orange text-lg px-8 py-6">
              <Phone className="w-5 h-5" />
              Falar com Especialista
            </Button>
          </a>
        </div>
      </section>

      <Footer />
      <ChatWidget />

      {/* Service Modal */}
      <ServiceModal 
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
};

export default Servicos;