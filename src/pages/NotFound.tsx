import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display font-black text-8xl md:text-9xl text-primary mb-6">
            404
          </h1>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">
            Página não encontrada
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Parece que você se perdeu no caminho! Não se preocupe, 
            vamos te ajudar a voltar para casa.
          </p>
          <Link to="/">
            <Button size="lg" className="gap-2 bg-gradient-orange shadow-orange">
              <Home className="w-5 h-5" />
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default NotFound;
