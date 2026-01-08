import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppWebUrl, WHATSAPP_PHONE_DISPLAY } from "@/lib/whatsapp";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_TEXT = "Olá! Gostaria de solicitar um orçamento.";

const Contato = () => {
  const { data: settings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");
      if (error) throw error;
      return data?.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string | null>);
    },
  });

  const phone = settings?.whatsapp_display || WHATSAPP_PHONE_DISPLAY;
  const email = settings?.email || "contato@fretesembauru.com.br";
  const address = settings?.address || "Bauru, SP - Atendemos toda a região";
  const hours = settings?.business_hours || "Segunda a Sábado, 07:00 - 19:00";
  const mapsEmbed = settings?.gmb_maps_embed;
  const placeId = settings?.gmb_place_id;

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone / WhatsApp",
      value: phone,
      link: buildWhatsAppWebUrl(WHATSAPP_TEXT),
      action: "Chamar no WhatsApp",
    },
    {
      icon: Mail,
      title: "E-mail",
      value: email,
      link: `mailto:${email}`,
      action: "Enviar e-mail",
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      value: hours,
      link: null,
      action: null,
    },
    {
      icon: MapPin,
      title: "Endereço",
      value: address,
      link: placeId ? `https://www.google.com/maps/place/?q=place_id:${placeId}` : null,
      action: placeId ? "Ver no Mapa" : null,
    },
  ];

  // Generate Google Maps embed URL from Place ID
  const getMapUrl = () => {
    if (mapsEmbed) {
      // If there's a custom embed code, extract the src
      const srcMatch = mapsEmbed.match(/src="([^"]+)"/);
      if (srcMatch) return srcMatch[1];
    }
    if (placeId) {
      // Use Place ID to generate embed URL
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=place_id:${placeId}&language=pt-BR`;
    }
    // Default to Bauru location
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59424.83494965887!2d-49.0894!3d-22.3246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bf67b0e0b11c8d%3A0xa13ac4d6c3e0b9a0!2sBauru%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1704067200000!5m2!1spt-BR!2sbr`;
  };

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
              href={buildWhatsAppWebUrl(WHATSAPP_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2 bg-gradient-orange shadow-orange text-lg px-8 py-6">
                <Phone className="w-5 h-5" />
                {phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">
                Nossa <span className="text-gradient-orange">Localização</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {address}. Realizamos mudanças e fretes para todo o Brasil!
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
              <iframe
                src={getMapUrl()}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização LF Fretes e Mudanças"
                className="w-full"
              />
            </div>
            {placeId && (
              <div className="text-center mt-6">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination_place_id=${placeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="gap-2">
                    <MapPin className="w-5 h-5" />
                    Traçar Rota
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </main>
  );
};

export default Contato;
