import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Home, Building2, Truck, Package, Wrench, Box, MapPin, Clock, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Home,
    title: "Mudanças Residenciais",
    description: "Serviço completo para sua mudança residencial. Cuidamos de cada detalhe, desde a embalagem até a montagem dos móveis no novo endereço.",
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
    features: [
      "Planejamento personalizado",
      "Mudança em horários alternativos",
      "Transporte de equipamentos",
      "Documentação de inventário",
    ],
  },
  {
    icon: Truck,
    title: "Fretes em Geral",
    description: "Transporte de cargas e mercadorias para qualquer destino. Caminhões baú de diversos tamanhos para atender sua necessidade.",
    features: [
      "Frete local e interestadual",
      "Rastreamento da carga",
      "Entrega expressa disponível",
      "Caminhões de diversos tamanhos",
    ],
  },
  {
    icon: Package,
    title: "Embalagem Profissional",
    description: "Proteja seus pertences com nosso serviço de embalagem profissional. Utilizamos materiais de alta qualidade.",
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
    features: [
      "Profissionais capacitados",
      "Ferramentas adequadas",
      "Cuidado com acabamentos",
      "Montagem no destino",
    ],
  },
  {
    icon: Box,
    title: "Armazenamento",
    description: "Precisa guardar seus pertences temporariamente? Oferecemos opções de armazenamento seguro.",
    features: [
      "Local seguro e protegido",
      "Ambiente climatizado",
      "Acesso controlado",
      "Períodos flexíveis",
    ],
  },
];

const benefits = [
  { icon: MapPin, text: "Atendemos todo o Brasil" },
  { icon: Clock, text: "Pontualidade garantida" },
  { icon: Shield, text: "Seguro de carga" },
];

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
            <p className="text-lg text-muted-foreground mb-8">
              Soluções completas para sua mudança ou frete
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <benefit.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 bg-brand-orange-light rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://wa.me/5514996054098?text=Olá! Gostaria de saber mais sobre o serviço de ${service.title}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="gap-2 bg-gradient-orange shadow-orange">
                      <Phone className="w-4 h-4" />
                      Solicitar Orçamento
                    </Button>
                  </a>
                </div>
                <div
                  className={`bg-muted/50 rounded-2xl p-12 flex items-center justify-center ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <service.icon className="w-32 h-32 text-primary/20" />
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
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e vamos criar uma solução sob medida para você.
          </p>
          <a
            href="https://wa.me/5514996054098"
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
