import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/5514996054098?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento.";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-hero relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
            Pronto para sua{" "}
            <span className="text-gradient-orange">mudança?</span>
          </h2>
          <p className="text-lg text-secondary-foreground/70 mb-10">
            Entre em contato agora mesmo e solicite seu orçamento gratuito. 
            Nossa equipe está pronta para atender você!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2 bg-gradient-orange shadow-orange text-lg px-8 py-6">
                <Phone className="w-5 h-5" />
                Falar no WhatsApp
              </Button>
            </a>
            <a href="/contato">
              <Button variant="outline" size="lg" className="gap-2 text-lg px-8 py-6 border-2 border-primary-foreground/50 text-primary-foreground bg-transparent hover:bg-primary-foreground/10">
                Outras formas de contato
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>

          <p className="mt-8 text-sm text-secondary-foreground/60">
            📞 Atendimento de Segunda a Sábado, das 7h às 19h
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
