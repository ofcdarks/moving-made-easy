import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoFull from "@/assets/logo-full.png";
import { buildWhatsAppWebUrl, openWhatsApp } from "@/lib/whatsapp";

const WHATSAPP_TEXT = "Olá! Gostaria de solicitar um orçamento.";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre Nós" },
    { href: "/servicos", label: "Serviços" },
    { href: "/galeria", label: "Galeria" },
    { href: "/contato", label: "Contato" },
    { href: "/orcamento", label: "Orçamento" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-inset ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center">
            <img 
              src={logoFull} 
              alt="LF Fretes e Mudanças" 
              className={`h-8 sm:h-10 md:h-12 w-auto transition-all duration-300 ${
                isScrolled ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href)
                      ? "text-primary"
                      : isScrolled
                      ? "text-foreground"
                      : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={buildWhatsAppWebUrl(WHATSAPP_TEXT)}
              onClick={(e) => {
                e.preventDefault();
                openWhatsApp(WHATSAPP_TEXT);
              }}
            >
              <Button variant="default" size="lg" className="gap-2 bg-gradient-orange shadow-orange hover:opacity-90">
                <Phone className="w-4 h-4" />
                Orçamento Grátis
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-background/98 backdrop-blur-md transition-all duration-300 ${
            isMobileMenuOpen 
              ? "opacity-100 pointer-events-auto" 
              : "opacity-0 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col py-4 h-full overflow-y-auto">
            {navLinks.map((link, index) => (
              <li 
                key={link.href}
                className={`transform transition-all duration-300 ${
                  isMobileMenuOpen 
                    ? "translate-x-0 opacity-100" 
                    : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms' }}
              >
                <Link
                  to={link.href}
                  className={`block px-6 py-4 text-lg font-medium transition-colors active:bg-muted ${
                    isActive(link.href) ? "text-primary bg-primary/5" : "text-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li 
              className={`px-4 pt-6 mt-auto pb-safe transform transition-all duration-300 ${
                isMobileMenuOpen 
                  ? "translate-y-0 opacity-100" 
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? `${navLinks.length * 50}ms` : '0ms' }}
            >
              <a
                href={buildWhatsAppWebUrl(WHATSAPP_TEXT)}
                onClick={(e) => {
                  e.preventDefault();
                  openWhatsApp(WHATSAPP_TEXT);
                  setIsMobileMenuOpen(false);
                }}
              >
                <Button variant="default" size="lg" className="w-full gap-2 bg-gradient-orange py-6 text-base">
                  <Phone className="w-5 h-5" />
                  Solicitar Orçamento Grátis
                </Button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
