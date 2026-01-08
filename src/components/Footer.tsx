import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Truck, Settings } from "lucide-react";
import logoFull from "@/assets/logo-full.png";
import { buildWhatsAppWebUrl, openWhatsApp, WHATSAPP_PHONE_DISPLAY } from "@/lib/whatsapp";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_TEXT = "Olá! Gostaria de solicitar um orçamento.";

const Footer = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .maybeSingle();
        
        setIsAdmin(roles?.role === "admin");
      }
    };

    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => subscription.unsubscribe();
  }, []);

  const quickLinks = [
    { href: "#inicio", label: "Início" },
    { href: "#sobre", label: "Sobre Nós" },
    { href: "#servicos", label: "Serviços" },
    { href: "#galeria", label: "Galeria" },
    { href: "#contato", label: "Contato" },
  ];

  const serviceLinks = [
    { href: "/servicos#residencial", label: "Mudanças Residenciais" },
    { href: "/servicos#comercial", label: "Mudanças Comerciais" },
    { href: "/servicos#compartilhada", label: "Mudança Compartilhada" },
    { href: "/servicos#fretes", label: "Fretes em Geral" },
    { href: "/servicos#agenciamento", label: "Agenciamento de Cargas" },
    { href: "/servicos#eventos", label: "Transporte para Feiras" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/" + id;
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img 
              src={logoFull} 
              alt="LF Fretes e Mudanças" 
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-secondary-foreground/70">
              Sua mudança em boas mãos. Oferecemos serviços de fretes e mudanças com segurança,
              pontualidade e o melhor custo-benefício do mercado.
            </p>
            <div className="flex items-center gap-2 text-primary">
              <Truck className="w-5 h-5" />
              <span className="text-sm font-medium">Atendemos Bauru e região</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary-foreground font-display font-bold text-lg mb-6">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-primary-foreground font-display font-bold text-lg mb-6">
              Nossos Serviços
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-primary-foreground font-display font-bold text-lg mb-6">
              Contato
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={buildWhatsAppWebUrl(WHATSAPP_TEXT)}
                  onClick={(e) => {
                    e.preventDefault();
                    openWhatsApp(WHATSAPP_TEXT);
                  }}
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-sm">{WHATSAPP_PHONE_DISPLAY}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:contato@fretesembauru.com.br" className="text-sm hover:text-primary transition-colors">
                  contato@fretesembauru.com.br
                </a>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/70">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">Bauru, SP - Atendemos toda a região</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm">Seg - Sáb: 07:00 - 19:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with policies */}
        <div className="border-t border-secondary-foreground/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary-foreground/60">
              © {currentYear} LF Fretes e Mudanças. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/politica-de-privacidade"
                className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                to="/politica-de-cookies"
                className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors"
              >
                Política de Cookies
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Painel Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
