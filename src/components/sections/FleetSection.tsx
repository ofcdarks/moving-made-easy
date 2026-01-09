import { Truck } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import pickupImage from "@/assets/pickup-frota.jpeg";
import vanImage from "@/assets/van-frota.jpeg";
import vucImage from "@/assets/vuc-frota.jpeg";
import treQuartosImage from "@/assets/34-frota.jpeg";
import tocoImage from "@/assets/toco-frota.jpeg";
import truckImage from "@/assets/truck-frota.jpeg";

const vehicles = [
  {
    name: "Pick-up",
    capacity: "Até 800kg",
    description: "Ideal para pequenas entregas e mudanças compactas",
    image: pickupImage,
  },
  {
    name: "Van",
    capacity: "Até 1.500kg",
    description: "Perfeita para volumes médios e mudanças residenciais pequenas",
    image: vanImage,
  },
  {
    name: "VUC",
    capacity: "Até 3.000kg",
    description: "Veículo Urbano de Carga para entregas em áreas restritas",
    image: vucImage,
  },
  {
    name: "3/4",
    capacity: "Até 4.000kg",
    description: "Versatilidade para mudanças residenciais e comerciais",
    image: treQuartosImage,
  },
  {
    name: "Toco",
    capacity: "Até 8.000kg",
    description: "Capacidade robusta para grandes volumes e longas distâncias",
    image: tocoImage,
  },
  {
    name: "Truck",
    capacity: "Até 14.000kg",
    description: "Máxima capacidade para mudanças empresariais e cargas pesadas",
    image: truckImage,
  },
];

const FleetSection = () => {
  const { ref, isInView } = useInViewAnimation();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Nossa Frota
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Veículos para Cada Necessidade
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contamos com uma frota diversificada e moderna para atender desde pequenas entregas até grandes mudanças
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.name}
              className={`group bg-background rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 hover:border-primary/30 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isInView ? `${index * 100}ms` : "0ms",
              }}
            >
              {vehicle.image ? (
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-muted/50 flex items-center justify-center">
                  <div className="w-14 h-14 bg-gradient-orange rounded-xl flex items-center justify-center shadow-orange group-hover:scale-110 transition-transform duration-300">
                    <Truck className="w-7 h-7 text-white" />
                  </div>
                </div>
              )}
              <div className="p-4 text-center">
                <h3 className="text-lg font-display font-bold text-foreground mb-1">
                  {vehicle.name}
                </h3>
                <p className="text-primary font-semibold text-sm mb-2">
                  {vehicle.capacity}
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed hidden md:block">
                  {vehicle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;