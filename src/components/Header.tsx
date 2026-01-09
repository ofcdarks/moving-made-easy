import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Home, Info, Briefcase, Images, MessageSquare, FileText } from "lucide-react";
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

  // Block body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Início", icon: Home },
    { href: "/sobre", label: "Sobre Nós", icon: Info },
    { href: "/servicos", label: "Serviços", icon: Briefcase },
    { href: "/galeria", label: "Galeria", icon: Images },
    { href: "/contato", label: "Contato", icon: MessageSquare },
    { href: "/orcamento", label: "Orçamento", icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-inset ${
        isMobileMenuOpen
          ? "bg-background shadow-card"
          : isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-16 sm:h-20">
          <Link 
            to="/" 
            className={`flex items-center z-50 transition-opacity duration-300 ${
              isMobileMenuOpen ? "lg:opacity-100 opacity-0 pointer-events-none lg:pointer-events-auto" : "opacity-100"
            }`}
          >
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
            className={`lg:hidden p-2 z-50 rounded-lg transition-all ${
              isMobileMenuOpen 
                ? "bg-muted text-foreground" 
                : isScrolled 
                  ? "text-foreground" 
                  : "text-white"
            }`}
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

        {/* Mobile Menu Overlay */}
        <div 
          className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
            isMobileMenuOpen 
              ? "opacity-100 pointer-events-auto" 
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div 
          className={`lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-background shadow-2xl z-[60] transition-transform duration-300 ease-out flex flex-col ${
            isMobileMenuOpen 
              ? "translate-x-0" 
              : "translate-x-full"
          }`}
        >
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border shrink-0">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img 
                src={logoFull} 
                alt="LF Fretes e Mudanças" 
                className="h-10 w-auto"
              />
            </Link>
            <button
              className="p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-2">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <li 
                    key={link.href}
                    className={`transform transition-all duration-300 ${
                      isMobileMenuOpen 
                        ? "translate-x-0 opacity-100" 
                        : "translate-x-8 opacity-0"
                    }`}
                    style={{ transitionDelay: isMobileMenuOpen ? `${index * 50 + 100}ms` : '0ms' }}
                  >
                    <Link
                      to={link.href}
                      className={`flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium transition-all ${
                        active 
                          ? "text-primary bg-primary/10 border-l-4 border-primary" 
                          : "text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className={`w-5 h-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                      <span>{link.label}</span>
                      {active && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA Button */}
          <div 
            className={`px-4 py-4 border-t border-border shrink-0 transform transition-all duration-300 ${
              isMobileMenuOpen 
                ? "translate-y-0 opacity-100" 
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? `${navLinks.length * 50 + 150}ms` : '0ms' }}
          >
            <a
              href={buildWhatsAppWebUrl(WHATSAPP_TEXT)}
              onClick={(e) => {
                e.preventDefault();
                openWhatsApp(WHATSAPP_TEXT);
                setIsMobileMenuOpen(false);
              }}
            >
              <Button variant="default" size="lg" className="w-full gap-2 bg-gradient-orange py-6 text-base shadow-orange">
                <Phone className="w-5 h-5" />
                Solicitar Orçamento
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
