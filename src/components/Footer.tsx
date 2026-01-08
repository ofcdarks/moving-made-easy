import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Truck } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-muted-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img src={logo} alt="LF Fretes e Mudanças" className="h-14 brightness-0 invert" />
            <p className="text-sm leading-relaxed">
              Sua mudança em boas mãos. Oferecemos serviços de fretes e mudanças com segurança,
              pontualidade e o melhor custo-benefício do mercado.
            </p>
            <div className="flex items-center gap-2 text-primary">
              <Truck className="w-5 h-5" />
              <span className="text-sm font-medium">Atendemos todo o Brasil</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary-foreground font-display font-bold text-lg mb-6">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Início" },
                { href: "/sobre", label: "Sobre Nós" },
                { href: "/servicos", label: "Serviços" },
                { href: "/galeria", label: "Galeria" },
                { href: "/contato", label: "Contato" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-primary-foreground font-display font-bold text-lg mb-6">
              Nossos Serviços
            </h3>
            <ul className="space-y-3 text-sm">
              <li>Mudanças Residenciais</li>
              <li>Mudanças Comerciais</li>
              <li>Fretes em Geral</li>
              <li>Transporte de Cargas</li>
              <li>Montagem e Desmontagem</li>
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
                  href="https://wa.me/5514996054098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-sm">(14) 99605-4098</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm">contato@lffretes.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">São Paulo, SP - Atendemos todo o Brasil</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm">Seg - Sáb: 07:00 - 19:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted/20 mt-12 pt-8 text-center">
          <p className="text-sm">
            © {currentYear} LF Fretes e Mudanças. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
