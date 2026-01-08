import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import truckSunset from "@/assets/truck-sunset.jpeg";
import truckLoading from "@/assets/truck-loading.jpeg";
import truckCargo from "@/assets/truck-cargo.jpeg";
import boxesInterior from "@/assets/boxes-interior.jpeg";

const images = [
  { src: truckSunset, alt: "Caminhão LF Fretes ao pôr do sol", category: "Frota" },
  { src: truckLoading, alt: "Caminhão carregado com carga", category: "Serviços" },
  { src: truckCargo, alt: "Transporte de motos e móveis", category: "Serviços" },
  { src: boxesInterior, alt: "Interior do caminhão com caixas organizadas", category: "Organização" },
];

const Galeria = () => {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-black text-4xl md:text-5xl text-primary-foreground mb-6">
              <span className="text-gradient-orange">Galeria</span> de Fotos
            </h1>
            <p className="text-lg text-muted-foreground">
              Confira registros do nosso trabalho e da nossa frota
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full mb-2">
                      {image.category}
                    </span>
                    <p className="text-primary-foreground text-lg font-medium">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-muted/50 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="font-display font-bold text-xl mb-3">
                Quer ver mais do nosso trabalho?
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Entre em contato conosco e solicite referências de trabalhos anteriores.
                Teremos prazer em mostrar mais do que fazemos!
              </p>
              <a
                href="https://wa.me/5514988340448?text=Olá! Gostaria de ver mais fotos do trabalho de vocês."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                Falar no WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </main>
  );
};

export default Galeria;
