import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera } from "lucide-react";
import truckSunset from "@/assets/truck-sunset.jpeg";
import truckLoading from "@/assets/truck-loading.jpeg";
import truckCargo from "@/assets/truck-cargo.jpeg";
import boxesInterior from "@/assets/boxes-interior.jpeg";
import caminhaoScania from "@/assets/caminhao-scania.jpeg";
import carretaCarga from "@/assets/carreta-carga.jpeg";
import caminhaoIveco from "@/assets/caminhao-iveco.jpeg";
import equipeTrabalhando from "@/assets/equipe-trabalho.jpeg";

const defaultImages = [
  { image_url: truckSunset, title: "Caminhão ao pôr do sol", category: "Frota" },
  { image_url: caminhaoScania, title: "Scania 124 420cv", category: "Frota" },
  { image_url: truckLoading, title: "Carregamento seguro", category: "Serviços" },
  { image_url: carretaCarga, title: "Carreta com carga organizada", category: "Logística" },
  { image_url: equipeTrabalhando, title: "Equipe em ação", category: "Equipe" },
  { image_url: caminhaoIveco, title: "Iveco Daily em residência", category: "Frota" },
];

const GallerySection = () => {
  const { data: images, isLoading } = useQuery({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .limit(6);
      
      if (error) throw error;
      return data;
    },
  });

  const displayImages = images && images.length > 0 ? images : defaultImages;

  return (
    <section id="galeria" className="py-20 lg:py-32 bg-gradient-hero relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wider mb-4">
            <Camera className="w-4 h-4" />
            Nosso trabalho
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4 text-primary-foreground">
            <span className="text-gradient-orange">Galeria</span> de Fotos
          </h2>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto">
            Confira registros do nosso trabalho e da nossa frota
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton 
                key={index} 
                className={`w-full rounded-xl ${index === 0 || index === 3 ? 'row-span-2 h-[400px] md:h-[500px]' : 'h-[190px] md:h-[240px]'}`} 
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
            {displayImages.map((image, index) => {
              const isLarge = index === 0 || index === 3;
              return (
                <div
                  key={'id' in image ? String(image.id) : index}
                  className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                    isLarge ? 'row-span-2' : ''
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt={image.title || "Galeria LF Fretes"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category badge */}
                  {'category' in image && image.category && (
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                      {String(image.category)}
                    </span>
                  )}
                  
                  {/* Title */}
                  {image.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-semibold text-sm md:text-base drop-shadow-lg">
                        {image.title}
                      </p>
                    </div>
                  )}

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/galeria"
            className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-semibold px-6 py-3 rounded-full transition-all duration-300 group"
          >
            Ver galeria completa
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;