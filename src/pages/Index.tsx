import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import FleetSection from "@/components/sections/FleetSection";
import GallerySection from "@/components/sections/GallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import GoogleReviewsWidget from "@/components/GoogleReviewsWidget";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <FleetSection />
      <GoogleReviewsWidget />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </main>
  );
};

export default Index;
