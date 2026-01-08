import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import truckSunset from "@/assets/truck-sunset.jpeg";
import truckLoading from "@/assets/truck-loading.jpeg";
import truckCargo from "@/assets/truck-cargo.jpeg";
import boxesInterior from "@/assets/boxes-interior.jpeg";

const defaultImages = [
  { image_url: truckSunset, title: "Caminhão LF Fretes ao pôr do sol" },
  { image_url: truckLoading, title: "Caminhão carregado com carga" },
  { image_url: truckCargo, title: "Transporte de motos e móveis" },
  { image_url: boxesInterior, title: "Interior do caminhão com caixas organizadas" },
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
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  const displayImages = images && images.length > 0 ? images : defaultImages;

  return (
    <section id="galeria" className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            Nosso trabalho
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
            <span className="text-gradient-red">Galeria</span> de Fotos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Veja alguns registros do nosso trabalho e da nossa frota pronta para atender você.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="w-full h-[300px] rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayImages.map((image, index) => (
              <div
                key={'id' in image ? String(image.id) : index}
                className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={image.image_url}
                  alt={image.title || "Galeria LF Fretes"}
                  className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.title && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-medium">{image.title}</p>
                      {'description' in image && image.description && (
                        <p className="text-white/80 text-sm mt-1">{String(image.description)}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/galeria"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Ver galeria completa →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
