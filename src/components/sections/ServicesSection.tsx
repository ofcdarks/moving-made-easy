import { 
  Home, Building2, Truck, Package, Share2, Briefcase, 
  ArrowDownUp, CalendarCheck, LucideIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = {
  Home,
  Building2,
  Truck,
  Package,
  Share2,
  Briefcase,
  ArrowDownUp,
  CalendarCheck,
};

const defaultServices = [
  { icon: "Home", title: "Mudanças Residenciais", short_description: "Cuidamos da sua mudança residencial com todo carinho e profissionalismo que você merece." },
  { icon: "Building2", title: "Mudanças Comerciais", short_description: "Minimize o tempo de parada do seu negócio com nossa equipe especializada." },
  { icon: "Share2", title: "Mudança Compartilhada", short_description: "Economize dividindo o frete. Ideal para quem busca custo reduzido." },
  { icon: "Truck", title: "Fretes em Geral", short_description: "Transporte de cargas e mercadorias com segurança para qualquer destino." },
  { icon: "Briefcase", title: "Agenciamento de Cargas", short_description: "Gestão completa do processo logístico da sua carga." },
  { icon: "ArrowDownUp", title: "Carga e Descarga", short_description: "Equipe especializada para manusear seus itens com cuidado." },
  { icon: "CalendarCheck", title: "Transporte para Feiras", short_description: "Transporte especializado para feiras, exposições e eventos." },
  { icon: "Package", title: "Embalagem Profissional", short_description: "Materiais de qualidade e técnicas profissionais para proteger seus pertences." },
];

const ServicesSection = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const displayServices = services && services.length > 0 ? services : defaultServices;

  return (
    <section id="servicos" className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            O que fazemos
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
            Nossos <span className="text-gradient-orange">Serviços</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soluções logísticas completas para sua mudança ou frete, 
            com equipe qualificada e equipamentos adequados.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 shadow-card">
                <Skeleton className="w-12 h-12 rounded-xl mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-1" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((service, index) => {
              const IconComponent = iconMap[service.icon || "Truck"] || Truck;
              const imageUrl = 'image_url' in service ? (service.image_url as string | null) : null;
              return (
                <div
                  key={'id' in service ? String(service.id) : index}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {imageUrl ? (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={imageUrl} 
                        alt={service.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <div className="w-12 h-12 bg-brand-orange-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-gradient-orange group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.short_description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
