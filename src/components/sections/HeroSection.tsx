import { useState, useEffect } from "react";
import { ArrowRight, Shield, Clock, Truck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import caminhaoScania from "@/assets/caminhao-scania.jpeg";
import caminhaoVolvo from "@/assets/caminhao-volvo.jpeg";
import caminhaoMercedes from "@/assets/caminhao-mercedes.jpeg";
import { buildWhatsAppWebUrl, openWhatsApp } from "@/lib/whatsapp";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedCounter from "@/components/AnimatedCounter";

const WHATSAPP_TEXT = "Olá! Gostaria de solicitar um orçamento.";

const DEFAULT_PHRASES = [
  "Segurança e Pontualidade",
  "Cuidado e Profissionalismo", 
  "Confiança e Agilidade",
  "Eficiência e Qualidade",
];

// 3 melhores fotos de caminhões
const DEFAULT_IMAGES = [caminhaoScania, caminhaoVolvo, caminhaoMercedes];

const HeroSection = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const { data: heroContent, isLoading } = useQuery({
    queryKey: ["hero-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_content")
        .select("*")
        .eq("is_active", true)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  // Get phrases from DB or use defaults
  const phrases = heroContent?.rotating_phrases?.length 
    ? heroContent.rotating_phrases 
    : DEFAULT_PHRASES;
  
  const typingSpeed = heroContent?.typing_speed || 80;
  const deleteSpeed = heroContent?.delete_speed || 30;

  // Get images - combine main image with additional images, or use defaults
  const allImages = (() => {
    const images: string[] = [];
    if (heroContent?.background_image_url) {
      images.push(heroContent.background_image_url);
    }
    if (heroContent?.background_images?.length) {
      images.push(...heroContent.background_images);
    }
    return images.length > 0 ? images : DEFAULT_IMAGES;
  })();

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentPhrase.length) {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? deleteSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deleteSpeed]);

  // Get transition time from DB or use default (8 seconds)
  const transitionTime = (heroContent?.image_transition_time || 8) * 1000;

  // Image rotation effect - crossfade suave sem fundo visível
  useEffect(() => {
    if (allImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, transitionTime);

    return () => clearInterval(interval);
  }, [allImages.length, transitionTime]);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate parallax transform - image moves slower than scroll
  const parallaxOffset = scrollY * 0.4;

  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 overflow-hidden">
      {/* Background Images with parallax, smooth crossfade and Ken Burns effect */}
      <div className="absolute inset-0 z-0 bg-secondary overflow-hidden">
        {allImages.map((img, index) => {
          const isActive = index === currentImageIndex;
          const isPrev = index === (currentImageIndex - 1 + allImages.length) % allImages.length;
          return (
            <div
              key={`hero-bg-${index}`}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                isActive 
                  ? "opacity-100 z-[2]" 
                  : isPrev 
                    ? "opacity-100 z-[1]" 
                    : "opacity-0 z-0"
              }`}
              style={{
                transform: `translateY(${parallaxOffset}px)`,
              }}
            >
              <img
                src={img}
                alt="LF Fretes e Mudanças"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] object-cover object-center transition-transform duration-[10000ms] ease-out ${
                  isActive 
                    ? "scale-110" 
                    : "scale-100"
                }`}
                style={{
                  minHeight: "calc(100% + 150px)",
                }}
              />
            </div>
          );
        })}
        <div 
          className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40 z-10" 
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-2xl">
          {isLoading ? (
            <>
              <Skeleton className="h-8 sm:h-10 w-48 sm:w-64 mb-4 sm:mb-6 bg-white/20" />
              <Skeleton className="h-12 sm:h-16 w-full mb-4 sm:mb-6 bg-white/20" />
              <Skeleton className="h-5 sm:h-6 w-3/4 mb-6 sm:mb-8 bg-white/20" />
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 animate-slide-up">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">
                  {heroContent?.highlight_text || "Soluções Logísticas Completas"}
                </span>
              </div>
              
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-4 sm:mb-6 animate-slide-up animate-delay-100">
                Soluções Logísticas com{" "}
                <span className="text-gradient-orange block sm:inline">
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-secondary-foreground/80 mb-6 sm:mb-8 animate-slide-up animate-delay-200">
                {heroContent?.subtitle || "Fretes e mudanças com profissionalismo, cuidado e pontualidade. Atendemos residências e empresas em todo o Brasil."}
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 animate-slide-up animate-delay-300">
            <a
              href={buildWhatsAppWebUrl(WHATSAPP_TEXT)}
              onClick={(e) => {
                e.preventDefault();
                openWhatsApp(WHATSAPP_TEXT);
              }}
              className="w-full sm:w-auto"
            >
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-orange shadow-orange text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                {heroContent?.cta_text || "Solicitar Orçamento Grátis"}
              </Button>
            </a>
            <a href={heroContent?.cta_link || "#servicos"} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-2 border-primary-foreground/50 text-primary-foreground bg-transparent hover:bg-primary-foreground/10">
                Nossos Serviços
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 animate-slide-up animate-delay-400">
            {[
              { icon: Truck, label: heroContent?.stat_deliveries_label || "Entregas", value: heroContent?.stat_deliveries || "500+" },
              { icon: Clock, label: heroContent?.stat_punctuality_label || "Pontualidade", value: heroContent?.stat_punctuality || "99%" },
              { icon: Shield, label: heroContent?.stat_security_label || "Segurança", value: heroContent?.stat_security || "100%" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-1 sm:mb-2" />
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary-foreground">
                  <AnimatedCounter value={stat.value} duration={2000} />
                </p>
                <p className="text-xs sm:text-sm text-secondary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft hidden sm:block">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;