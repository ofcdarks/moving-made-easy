import { useState } from "react";
import { Truck, Package, MapPin, Clock, Shield, ChevronRight } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { openWhatsApp } from "@/lib/whatsapp";
import pickupImage from "@/assets/pickup-frota.jpeg";
import vanImage from "@/assets/van-frota.jpeg";
import vucImage from "@/assets/vuc-frota.jpeg";
import treQuartosImage from "@/assets/34-frota.jpeg";
import tocoImage from "@/assets/toco-frota.jpeg";
import truckImage from "@/assets/truck-frota.jpeg";
import carretaImage from "@/assets/carreta-frota.jpeg";

interface Vehicle {
  name: string;
  capacity: string;
  description: string;
  image: string;
  dimensions: string;
  idealFor: string[];
  features: string[];
}

const vehicles: Vehicle[] = [
  {
    name: "Pick-up",
    capacity: "Até 800kg",
    description: "Ideal para pequenas entregas e mudanças compactas",
    image: pickupImage,
    dimensions: "Carroceria: 2,0m x 1,5m x 0,5m",
    idealFor: [
      "Pequenas entregas",
      "Mudanças de quartos",
      "Transporte de eletrodomésticos",
      "Entregas rápidas"
    ],
    features: [
      "Agilidade no trânsito",
      "Acesso a locais restritos",
      "Custo-benefício excelente",
      "Rapidez na entrega"
    ]
  },
  {
    name: "Van",
    capacity: "Até 1.500kg",
    description: "Perfeita para volumes médios e mudanças residenciais pequenas",
    image: vanImage,
    dimensions: "Compartimento: 3,0m x 1,7m x 1,5m",
    idealFor: [
      "Mudanças de apartamentos pequenos",
      "Transporte de móveis",
      "Entregas comerciais",
      "Feiras e eventos"
    ],
    features: [
      "Proteção contra intempéries",
      "Fácil carga e descarga",
      "Acesso em áreas urbanas",
      "Segurança da carga"
    ]
  },
  {
    name: "VUC",
    capacity: "Até 3.000kg",
    description: "Veículo Urbano de Carga para entregas em áreas restritas",
    image: vucImage,
    dimensions: "Baú: 4,0m x 2,2m x 2,0m",
    idealFor: [
      "Entregas em centros urbanos",
      "Mudanças residenciais",
      "Transporte de equipamentos",
      "Abastecimento de lojas"
    ],
    features: [
      "Autorizado em zonas restritas",
      "Baú fechado",
      "Ideal para São Paulo",
      "Versatilidade urbana"
    ]
  },
  {
    name: "3/4",
    capacity: "Até 4.000kg",
    description: "Versatilidade para mudanças residenciais e comerciais",
    image: treQuartosImage,
    dimensions: "Baú: 5,0m x 2,3m x 2,2m",
    idealFor: [
      "Mudanças residenciais completas",
      "Transporte comercial",
      "Máquinas e equipamentos",
      "Mudanças intermunicipais"
    ],
    features: [
      "Boa capacidade de carga",
      "Acesso moderado",
      "Custo acessível",
      "Resistência e durabilidade"
    ]
  },
  {
    name: "Toco",
    capacity: "Até 8.000kg",
    description: "Capacidade robusta para grandes volumes e longas distâncias",
    image: tocoImage,
    dimensions: "Baú: 6,5m x 2,4m x 2,5m",
    idealFor: [
      "Mudanças de casas grandes",
      "Transporte interestadual",
      "Cargas industriais",
      "Mudanças comerciais"
    ],
    features: [
      "Alta capacidade",
      "Longas distâncias",
      "Estrutura reforçada",
      "Ideal para grandes volumes"
    ]
  },
  {
    name: "Truck",
    capacity: "Até 14.000kg",
    description: "Máxima capacidade para mudanças empresariais e cargas pesadas",
    image: truckImage,
    dimensions: "Baú: 8,0m x 2,5m x 2,7m",
    idealFor: [
      "Mudanças empresariais",
      "Transporte de maquinário",
      "Grandes volumes",
      "Mudanças interestaduais"
    ],
    features: [
      "Capacidade máxima",
      "Estrutura profissional",
      "Equipe especializada",
      "Seguro completo"
    ]
  },
  {
    name: "Carreta",
    capacity: "Até 25.000kg",
    description: "Transporte de grandes volumes para mudanças industriais",
    image: carretaImage,
    dimensions: "Baú: 14,0m x 2,6m x 2,8m",
    idealFor: [
      "Mudanças industriais",
      "Transporte de fábricas",
      "Grandes empresas",
      "Cargas especiais"
    ],
    features: [
      "Capacidade industrial",
      "Cobertura nacional",
      "Equipe completa",
      "Planejamento logístico"
    ]
  },
];

const FleetSection = () => {
  const { ref, isInView } = useInViewAnimation();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleWhatsApp = (vehicleName: string) => {
    openWhatsApp(`Olá! Gostaria de solicitar um orçamento para o veículo ${vehicleName}.`);
  };

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
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {vehicles.map((vehicle) => (
                <CarouselItem 
                  key={vehicle.name} 
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="group bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 hover:border-primary/30 cursor-pointer h-full"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm font-medium flex items-center gap-1">
                          Clique para mais detalhes <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-display font-bold text-foreground mb-2">
                        {vehicle.name}
                      </h3>
                      <p className="text-primary font-semibold text-lg mb-3">
                        {vehicle.capacity}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {vehicle.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-6" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-6" />
          </Carousel>

          {/* Mobile pagination dots indicator */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            <span className="text-sm text-muted-foreground">
              Deslize para ver mais veículos →
            </span>
          </div>
        </div>
      </div>

      {/* Vehicle Details Modal */}
      <Dialog open={!!selectedVehicle} onOpenChange={() => setSelectedVehicle(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedVehicle && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-display flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-orange rounded-lg flex items-center justify-center shadow-orange">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  {selectedVehicle.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Vehicle Image */}
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img 
                    src={selectedVehicle.image} 
                    alt={selectedVehicle.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Capacity & Dimensions */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 rounded-xl p-4 text-center">
                    <Package className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Capacidade</p>
                    <p className="text-lg font-bold text-primary">{selectedVehicle.capacity}</p>
                  </div>
                  <div className="bg-muted rounded-xl p-4 text-center">
                    <MapPin className="w-6 h-6 text-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Dimensões</p>
                    <p className="text-sm font-medium text-foreground">{selectedVehicle.dimensions}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground">{selectedVehicle.description}</p>

                {/* Ideal For */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Ideal para
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedVehicle.idealFor.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Características
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedVehicle.features.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button 
                  onClick={() => handleWhatsApp(selectedVehicle.name)}
                  className="w-full bg-gradient-orange hover:opacity-90 text-white font-semibold py-6"
                >
                  Solicitar Orçamento para {selectedVehicle.name}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FleetSection;
