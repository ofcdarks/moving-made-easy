import { CheckCircle, Users, Award, Truck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import truckLoading from "@/assets/truck-loading.jpeg";

const features = [
  "Equipe treinada e uniformizada",
  "Caminhões próprios e revisados",
  "Seguro de carga incluso",
  "Orçamento sem compromisso",
  "Pontualidade garantida",
  "Atendimento personalizado",
];

const AboutSection = () => {
  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ["about-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about_content")
        .select("*")
        .eq("is_active", true)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  const aboutImage = aboutContent?.image_url || truckLoading;

  const stats = [
    { icon: Truck, value: aboutContent?.moves_completed || "500+", label: "Mudanças realizadas" },
    { icon: Users, value: aboutContent?.clients_satisfied || "1000+", label: "Clientes satisfeitos" },
    { icon: Award, value: aboutContent?.years_experience || "10+", label: "Anos de experiência" },
  ];

  return (
    <section id="sobre" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={aboutImage}
                alt="Caminhão carregado LF Fretes"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-6 shadow-lg max-w-[200px] border border-border">
              <div className="text-4xl font-display font-black text-primary mb-2">
                {aboutContent?.years_experience || "10+"}
              </div>
              <p className="text-sm text-muted-foreground">
                Anos de experiência no mercado
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              Sobre nós
            </span>
            
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-full mb-6" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-8" />
              </>
            ) : (
              <>
                <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-6">
                  {aboutContent?.title || "Confiança e"}{" "}
                  <span className="text-gradient-red">
                    {aboutContent?.subtitle || "Qualidade"}
                  </span>{" "}
                  em cada entrega
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {aboutContent?.description || 
                    "A LF Fretes e Mudanças nasceu com o objetivo de oferecer um serviço diferenciado no transporte de cargas e mudanças. Com mais de uma década de experiência, nossa equipe está preparada para cuidar dos seus pertences com todo o cuidado e profissionalismo que você merece."}
                </p>
              </>
            )}

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-display font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
