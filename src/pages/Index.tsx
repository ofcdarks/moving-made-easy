import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import GallerySection from "@/components/sections/GallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <ChatWidget />
    </main>
  );
};

export default Index;
