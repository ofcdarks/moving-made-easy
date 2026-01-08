import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Phone, Mail, MapPin, Clock, MessageCircle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/5514996054098?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento.";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefone / WhatsApp",
    value: "(14) 99605-4098",
    link: WHATSAPP_LINK,
    action: "Chamar no WhatsApp",
  },
  {
    icon: Mail,
    title: "E-mail",
    value: "contato@lffretes.com.br",
    link: "mailto:contato@lffretes.com.br",
    action: "Enviar e-mail",
  },
  {
    icon: Clock,
    title: "Horário de Atendimento",
    value: "Segunda a Sábado, 07:00 - 19:00",
    link: null,
    action: null,
  },
  {
    icon: MapPin,
    title: "Área de Atendimento",
    value: "São Paulo, SP - Atendemos todo o Brasil",
    link: null,
    action: null,
  },
];

const Contato = () => {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-black text-4xl md:text-5xl text-primary-foreground mb-6">
              Entre em <span className="text-gradient-orange">Contato</span>
            </h1>
            <p className="text-lg text-secondary-foreground/80">
              Estamos prontos para atender você e tirar todas as suas dúvidas
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-lg transition-all border border-border"
              >
                <div className="w-14 h-14 bg-brand-orange-light rounded-xl flex items-center justify-center mb-6">
                  <info.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  {info.title}
                </h3>
                <p className="text-muted-foreground mb-4">{info.value}</p>
                {info.link && (
                  <a href={info.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-2">
                      {info.action}
                    </Button>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-orange rounded-full flex items-center justify-center mx-auto mb-8 shadow-orange">
              <MessageCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl mb-6">
              Fale conosco pelo <span className="text-gradient-orange">WhatsApp</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              A forma mais rápida de entrar em contato. Resposta imediata durante 
              nosso horário de atendimento!
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2 bg-gradient-orange shadow-orange text-lg px-8 py-6">
                <Phone className="w-5 h-5" />
                (14) 99605-4098
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-2xl mb-4">
                Área de Atendimento
              </h2>
              <p className="text-muted-foreground">
                Realizamos mudanças e fretes para todo o Brasil. 
                Entre em contato para saber mais sobre atendimento na sua região.
              </p>
            </div>
            <div className="bg-muted rounded-2xl p-12 flex items-center justify-center">
              <div className="text-center">
                <Truck className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  São Paulo, SP - Atendemos todo o Brasil
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

export default Contato;
