import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { CheckCircle, Users, Award, Truck, Target, Heart, Shield } from "lucide-react";
import truckLoading from "@/assets/truck-loading.jpeg";
import truckCargo from "@/assets/truck-cargo.jpeg";

const values = [
  {
    icon: Target,
    title: "Compromisso",
    description: "Cumprimos prazos e mantemos a palavra em cada serviço.",
  },
  {
    icon: Heart,
    title: "Cuidado",
    description: "Tratamos seus pertences como se fossem nossos.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Proteção total para sua carga durante todo o transporte.",
  },
];

const features = [
  "Mais de 10 anos de experiência",
  "Equipe treinada e uniformizada",
  "Caminhões próprios e revisados",
  "Seguro de carga incluso",
  "Orçamento gratuito e sem compromisso",
  "Atendimento personalizado",
  "Pontualidade garantida",
  "Embalagem profissional",
];

const Sobre = () => {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-black text-4xl md:text-5xl text-primary-foreground mb-6">
              Sobre a <span className="text-gradient-orange">LF Fretes</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Conheça nossa história e os valores que guiam nosso trabalho
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
                Nossa História
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl mb-6">
                Uma trajetória de <span className="text-gradient-orange">confiança</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A LF Fretes e Mudanças nasceu do sonho de oferecer um serviço de 
                  transporte diferenciado, onde o cuidado com os pertences do cliente 
                  fosse prioridade absoluta.
                </p>
                <p>
                  Com mais de uma década de experiência no mercado, construímos uma 
                  reputação sólida baseada em profissionalismo, pontualidade e respeito 
                  aos nossos clientes.
                </p>
                <p>
                  Hoje, contamos com uma frota própria de caminhões baú e uma equipe 
                  treinada para realizar mudanças residenciais, comerciais e fretes 
                  para todo o Brasil.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={truckLoading}
                alt="Caminhão LF Fretes"
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-orange-light rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-2xl">500+</p>
                    <p className="text-sm text-muted-foreground">Entregas realizadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              Nossos Valores
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl mb-4">
              O que nos <span className="text-gradient-orange">move</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 text-center shadow-card hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-brand-orange-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
                Por que nos escolher
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl mb-8">
                Diferenciais <span className="text-gradient-orange">LF Fretes</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={truckCargo}
                alt="Transporte de cargas"
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10+", label: "Anos de experiência" },
              { value: "500+", label: "Mudanças realizadas" },
              { value: "1000+", label: "Clientes satisfeitos" },
              { value: "99%", label: "Pontualidade" },
            ].map((stat, index) => (
              <div key={index}>
                <p className="font-display font-black text-4xl md:text-5xl text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </main>
  );
};

export default Sobre;
