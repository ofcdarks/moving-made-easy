import { ArrowRight, Shield, Clock, Truck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import truckSunset from "@/assets/truck-sunset.jpeg";
import { buildWhatsAppWebUrl, openWhatsApp } from "@/lib/whatsapp";

const WHATSAPP_TEXT = "Olá! Gostaria de solicitar um orçamento.";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={truckSunset}
          alt="Caminhão LF Fretes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6 animate-slide-up">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Soluções Logísticas Completas</span>
          </div>
          
          <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6 animate-slide-up animate-delay-100">
            Sua Mudança em{" "}
            <span className="text-gradient-orange">Boas Mãos</span>
          </h1>
          
          <p className="text-lg md:text-xl text-secondary-foreground/80 mb-8 animate-slide-up animate-delay-200">
            Fretes e mudanças com profissionalismo, cuidado e pontualidade.
            Atendemos residências e empresas em todo o Brasil.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up animate-delay-300">
            <a
              href={buildWhatsAppWebUrl(WHATSAPP_TEXT)}
              onClick={(e) => {
                e.preventDefault();
                openWhatsApp(WHATSAPP_TEXT);
              }}
            >
              <Button size="lg" className="gap-2 bg-gradient-orange shadow-orange text-lg px-8 py-6">
                <Phone className="w-5 h-5" />
                Solicitar Orçamento Grátis
              </Button>
            </a>
            <a href="#servicos">
              <Button variant="outline" size="lg" className="gap-2 text-lg px-8 py-6 border-2 border-primary-foreground/50 text-primary-foreground bg-transparent hover:bg-primary-foreground/10">
                Nossos Serviços
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 animate-slide-up animate-delay-400">
            {[
              { icon: Truck, label: "Entregas", value: "500+" },
              { icon: Clock, label: "Pontualidade", value: "99%" },
              { icon: Shield, label: "Segurança", value: "100%" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-secondary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
