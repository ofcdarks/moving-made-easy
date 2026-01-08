import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import AnimatedCounter from "@/components/AnimatedCounter";
import { openWhatsApp } from "@/lib/whatsapp";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Phone } from "lucide-react";

// Imagens da frota
import truckSunset from "@/assets/truck-sunset.jpeg";
import truckLoading from "@/assets/truck-loading.jpeg";
import truckCargo from "@/assets/truck-cargo.jpeg";
import boxesInterior from "@/assets/boxes-interior.jpeg";
import caminhaoScania from "@/assets/caminhao-scania.jpeg";
import carretaCarga from "@/assets/carreta-carga.jpeg";
import carretaCarga2 from "@/assets/carreta-carga-2.jpeg";
import caminhaoIveco from "@/assets/caminhao-iveco.jpeg";
import caminhaoMercedes from "@/assets/caminhao-mercedes.jpeg";
import caminhaoBauLateral from "@/assets/caminhao-bau-lateral.jpeg";
import caminhaoEmpilhadeira from "@/assets/caminhao-empilhadeira.jpeg";
import caminhaoAzul from "@/assets/caminhao-azul.jpeg";
import caminhaoDescarregando from "@/assets/caminhao-descarregando.jpeg";
import caminhaoRua from "@/assets/caminhao-rua.jpeg";
import caminhaoMbAzul from "@/assets/caminhao-mb-azul.jpeg";
import caminhaoVolvo from "@/assets/caminhao-volvo.jpeg";
import caminhaoVwConstellation from "@/assets/caminhao-vw-constellation.jpeg";
import caminhaoBrave from "@/assets/caminhao-brave.jpeg";

// Imagens da equipe e serviços
import equipeTrabalhando from "@/assets/equipe-trabalho.jpeg";
import equipeEmbalando from "@/assets/equipe-embalando.jpeg";
import equipePosando from "@/assets/equipe-posando.jpeg";
import equipeCaixas from "@/assets/equipe-caixas.jpeg";
import equipeCaixas2 from "@/assets/equipe-caixas-2.jpeg";
import equipeCarregando from "@/assets/equipe-carregando.jpeg";
import mudancaResidencial from "@/assets/mudanca-residencial.jpeg";
import cargaOrganizada from "@/assets/carga-organizada.jpeg";

// Novas imagens
import cargaPlantas from "@/assets/carga-plantas.jpeg";
import carregandoBicicleta from "@/assets/carregando-bicicleta.jpeg";
import cargaEmbalada from "@/assets/carga-embalada.jpeg";
import funcionarioCaminhao from "@/assets/funcionario-caminhao.jpeg";
import cargaPaletizada from "@/assets/carga-paletizada.jpeg";

const categories = [
  { id: "all", label: "Todas" },
  { id: "frota", label: "Nossa Frota" },
  { id: "equipe", label: "Nossa Equipe" },
  { id: "servicos", label: "Serviços" },
];

const images = [
  // Frota
  { src: caminhaoScania, alt: "Scania 124 420cv", category: "frota" },
  { src: truckSunset, alt: "Caminhão ao pôr do sol", category: "frota" },
  { src: caminhaoMercedes, alt: "Mercedes-Benz", category: "frota" },
  { src: caminhaoVolvo, alt: "Volvo FH", category: "frota" },
  { src: caminhaoVwConstellation, alt: "VW Constellation", category: "frota" },
  { src: caminhaoBrave, alt: "Caminhão Brave", category: "frota" },
  { src: caminhaoMbAzul, alt: "Mercedes-Benz Azul", category: "frota" },
  { src: caminhaoAzul, alt: "Caminhão Baú Azul", category: "frota" },
  { src: caminhaoIveco, alt: "Iveco Daily", category: "frota" },
  { src: caminhaoBauLateral, alt: "Caminhão Baú Lateral", category: "frota" },
  { src: caminhaoRua, alt: "Caminhão em serviço", category: "frota" },
  
  // Equipe
  { src: equipeTrabalhando, alt: "Equipe trabalhando", category: "equipe" },
  { src: equipeEmbalando, alt: "Equipe embalando", category: "equipe" },
  { src: equipePosando, alt: "Nossa equipe", category: "equipe" },
  { src: equipeCaixas, alt: "Organização de caixas", category: "equipe" },
  { src: equipeCaixas2, alt: "Equipe organizando", category: "equipe" },
  { src: equipeCarregando, alt: "Carregamento de móveis", category: "equipe" },
  { src: funcionarioCaminhao, alt: "Equipe LF Fretes", category: "equipe" },
  
  // Serviços
  { src: carretaCarga, alt: "Carreta com carga", category: "servicos" },
  { src: carretaCarga2, alt: "Carregamento de carreta", category: "servicos" },
  { src: truckLoading, alt: "Carregamento seguro", category: "servicos" },
  { src: truckCargo, alt: "Transporte de motos", category: "servicos" },
  { src: caminhaoEmpilhadeira, alt: "Carga com empilhadeira", category: "servicos" },
  { src: caminhaoDescarregando, alt: "Descarregamento", category: "servicos" },
  { src: boxesInterior, alt: "Caixas organizadas", category: "servicos" },
  { src: mudancaResidencial, alt: "Mudança residencial", category: "servicos" },
  { src: cargaOrganizada, alt: "Carga organizada", category: "servicos" },
  { src: cargaPlantas, alt: "Transporte de plantas", category: "servicos" },
  { src: carregandoBicicleta, alt: "Carregando bicicleta", category: "servicos" },
  { src: cargaEmbalada, alt: "Carga embalada com segurança", category: "servicos" },
  { src: cargaPaletizada, alt: "Carga paletizada", category: "servicos" },
];

const Galeria = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-black text-4xl md:text-5xl text-primary-foreground mb-6">
              <span className="text-gradient-orange">Galeria</span> de Fotos
            </h1>
            <p className="text-lg text-secondary-foreground/70 mb-8">
              Confira registros do nosso trabalho e da nossa frota
            </p>
            
            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-orange"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid - Masonry Style */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="break-inside-avoid group relative rounded-xl overflow-hidden shadow-card hover:shadow-xl transition-all duration-500 cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category badge */}
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 capitalize">
                  {image.category}
                </span>
                
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-sm drop-shadow-lg">
                    {image.alt}
                  </p>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <AnimatedCounter 
                value="15+" 
                className="text-3xl md:text-4xl font-black text-primary" 
                duration={2000}
              />
              <p className="text-muted-foreground text-sm mt-2">Veículos na Frota</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <AnimatedCounter 
                value="1000+" 
                className="text-3xl md:text-4xl font-black text-primary" 
                duration={2000}
              />
              <p className="text-muted-foreground text-sm mt-2">Entregas Realizadas</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <AnimatedCounter 
                value="10+" 
                className="text-3xl md:text-4xl font-black text-primary" 
                duration={2000}
              />
              <p className="text-muted-foreground text-sm mt-2">Anos de Experiência</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <AnimatedCounter 
                value="99%" 
                className="text-3xl md:text-4xl font-black text-primary" 
                duration={2000}
              />
              <p className="text-muted-foreground text-sm mt-2">Clientes Satisfeitos</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
              <h3 className="font-display font-bold text-2xl text-primary-foreground mb-3">
                Gostou do que viu?
              </h3>
              <p className="text-secondary-foreground/70 text-sm mb-6">
                Entre em contato e solicite seu orçamento sem compromisso!
              </p>
              <Button
                size="lg"
                className="gap-2 bg-gradient-orange shadow-orange"
                onClick={() => openWhatsApp("Olá! Vi a galeria de vocês e gostaria de solicitar um orçamento.")}
              >
                <Phone className="w-5 h-5" />
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <div className="relative flex items-center justify-center min-h-[80vh]">
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image */}
            {filteredImages[currentImageIndex] && (
              <div className="flex flex-col items-center">
                <img
                  src={filteredImages[currentImageIndex].src}
                  alt={filteredImages[currentImageIndex].alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                <p className="text-white text-lg font-medium mt-4">
                  {filteredImages[currentImageIndex].alt}
                </p>
                <p className="text-white/60 text-sm mt-1">
                  {currentImageIndex + 1} / {filteredImages.length}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <ChatWidget />
    </main>
  );
};

export default Galeria;