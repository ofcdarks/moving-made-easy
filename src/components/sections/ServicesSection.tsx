import { 
  Home, Building2, Truck, Package, Wrench, Box, Share2, Briefcase, 
  ArrowDownUp, CalendarCheck 
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Home,
    title: "Mudanças Residenciais",
    description: "Cuidamos da sua mudança residencial com todo carinho e profissionalismo que você merece.",
  },
  {
    icon: Building2,
    title: "Mudanças Comerciais",
    description: "Minimize o tempo de parada do seu negócio com nossa equipe especializada.",
  },
  {
    icon: Share2,
    title: "Mudança Compartilhada",
    description: "Economize dividindo o frete. Ideal para quem busca custo reduzido.",
  },
  {
    icon: Truck,
    title: "Fretes em Geral",
    description: "Transporte de cargas e mercadorias com segurança para qualquer destino.",
  },
  {
    icon: Briefcase,
    title: "Agenciamento de Cargas",
    description: "Gestão completa do processo logístico da sua carga.",
  },
  {
    icon: ArrowDownUp,
    title: "Carga e Descarga",
    description: "Equipe especializada para manusear seus itens com cuidado.",
  },
  {
    icon: CalendarCheck,
    title: "Transporte para Feiras",
    description: "Transporte especializado para feiras, exposições e eventos.",
  },
  {
    icon: Package,
    title: "Embalagem Profissional",
    description: "Materiais de qualidade e técnicas profissionais para proteger seus pertences.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            O que fazemos
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
            Nossos <span className="text-gradient-red">Serviços</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soluções logísticas completas para sua mudança ou frete, 
            com equipe qualificada e equipamentos adequados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-brand-red-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-gradient-red group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/servicos"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Ver todos os serviços →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
