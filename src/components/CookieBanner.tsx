import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "lf-fretes-cookie-consent";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Delay para não aparecer imediatamente
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="container mx-auto">
        <div className="bg-card border border-border rounded-2xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 bg-brand-orange-light rounded-lg flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base mb-1">
                Nós usamos cookies 🍪
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Utilizamos cookies para melhorar sua experiência em nosso site. 
                Ao continuar navegando, você concorda com nossa{" "}
                <Link 
                  to="/politica-de-cookies" 
                  className="text-primary hover:underline font-medium"
                >
                  Política de Cookies
                </Link>{" "}
                e{" "}
                <Link 
                  to="/politica-de-privacidade" 
                  className="text-primary hover:underline font-medium"
                >
                  Política de Privacidade
                </Link>.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="flex-1 md:flex-none"
            >
              Recusar
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="flex-1 md:flex-none bg-gradient-orange hover:opacity-90"
            >
              Aceitar Cookies
            </Button>
          </div>

          <button
            onClick={handleDecline}
            className="absolute top-2 right-2 md:hidden p-1 text-muted-foreground hover:text-foreground"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;