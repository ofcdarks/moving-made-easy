import { X, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { buildWhatsAppWebUrl, openWhatsApp } from "@/lib/whatsapp";

export interface ServiceData {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
  features: string[];
  fullDescription: string;
  benefits: string[];
  process: string[];
}

interface ServiceModalProps {
  service: ServiceData | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
  if (!service) return null;

  const handleWhatsApp = () => {
    openWhatsApp(`Olá! Gostaria de saber mais sobre o serviço de ${service.title}.`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-orange-light rounded-xl flex items-center justify-center">
              <service.icon className="w-7 h-7 text-primary" />
            </div>
            <DialogTitle className="font-display font-bold text-2xl">
              {service.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Image */}
          <div className="rounded-xl overflow-hidden">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-48 object-cover"
            />
          </div>

          {/* Full Description */}
          <div>
            <h3 className="font-display font-bold text-lg mb-3">Sobre o Serviço</h3>
            <p className="text-muted-foreground leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-display font-bold text-lg mb-3">O que está incluso</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="font-display font-bold text-lg mb-3">Benefícios</h3>
            <ul className="space-y-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div>
            <h3 className="font-display font-bold text-lg mb-3">Como Funciona</h3>
            <ol className="space-y-3">
              {service.process.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-border">
            <Button 
              onClick={handleWhatsApp}
              className="w-full gap-2 bg-gradient-orange shadow-orange text-lg py-6"
            >
              <Phone className="w-5 h-5" />
              Solicitar Orçamento Grátis
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-3">
              Resposta rápida pelo WhatsApp • Orçamento sem compromisso
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;