import { Link } from "react-router-dom";
import truckSunset from "@/assets/truck-sunset.jpeg";
import truckLoading from "@/assets/truck-loading.jpeg";
import truckCargo from "@/assets/truck-cargo.jpeg";
import boxesInterior from "@/assets/boxes-interior.jpeg";

const images = [
  { src: truckSunset, alt: "Caminhão LF Fretes ao pôr do sol" },
  { src: truckLoading, alt: "Caminhão carregado com carga" },
  { src: truckCargo, alt: "Transporte de motos e móveis" },
  { src: boxesInterior, alt: "Interior do caminhão com caixas organizadas" },
];

const GallerySection = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

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
