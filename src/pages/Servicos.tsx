import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { 
  Home, Building2, Truck, Package, Wrench, MapPin, Clock, Shield, Phone,
  CalendarCheck, Briefcase, ArrowDownUp, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import serviceResidential from "@/assets/service-residential.jpg";
import serviceCommercial from "@/assets/service-commercial.jpg";
import serviceFreight from "@/assets/service-freight.jpg";
import serviceLoading from "@/assets/service-loading.jpg";
import serviceEvents from "@/assets/service-events.jpg";
import servicePacking from "@/assets/service-packing.jpg";

const services = [
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
    ],
  },
  {
    icon: Share2,
    title: "Mudança Compartilhada",
    description: "Economize com nossa modalidade de mudança compartilhada. Ideal para quem quer reduzir custos dividindo o frete.",
    image: serviceFreight,
    features: [
      "Custo reduzido",
      "Rotas otimizadas",
      "Prazo flexível",
      "Ideal para pequenos volumes",
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
    ],
  },
];

const benefits = [
  { icon: MapPin, text: "Atendemos todo o Brasil" },
  { icon: Clock, text: "Pontualidade garantida" },
  { icon: Shield, text: "Seguro de carga" },
];

const WHATSAPP_LINK = "https://wa.me/5514988340448?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento.";

const Servicos = () => {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero">
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
              <div
                key={index}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="w-full gap-2 hover:bg-gradient-orange hover:text-primary-foreground hover:border-transparent transition-all">
                      <Phone className="w-4 h-4" />
                      Solicitar Orçamento
                    </Button>
                  </a>
                </div>
              </div>
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
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
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
    </main>
  );
};

export default Servicos;
