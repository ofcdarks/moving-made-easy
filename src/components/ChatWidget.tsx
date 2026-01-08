import { useState } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Qual o valor do frete?",
    answer: "O valor varia de acordo com a distância, volume de itens e tipo de serviço. Entre em contato conosco para um orçamento personalizado e gratuito!"
  },
  {
    question: "Vocês fazem mudanças para outros estados?",
    answer: "Sim! Realizamos mudanças para todo o Brasil com segurança e pontualidade."
  },
  {
    question: "Os móveis são desmontados e montados?",
    answer: "Sim, oferecemos serviço completo de desmontagem e montagem de móveis."
  },
  {
    question: "Como funciona o agendamento?",
    answer: "Basta entrar em contato pelo WhatsApp, informar a data desejada e faremos uma visita técnica gratuita para orçamento."
  },
  {
    question: "Vocês embalam os itens?",
    answer: "Sim! Temos serviço de embalagem profissional para garantir a segurança de todos os seus pertences."
  },
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const handleWhatsApp = () => {
    window.open("https://wa.me/5514996054098?text=Olá! Gostaria de solicitar um orçamento.", "_blank");
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-orange rounded-full shadow-orange flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Abrir chat"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-7 h-7 text-primary-foreground" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-3rem)] bg-background rounded-2xl shadow-lg border border-border overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-orange p-4">
            <h3 className="text-primary-foreground font-display font-bold text-lg">
              Olá! 👋
            </h3>
            <p className="text-primary-foreground/90 text-sm">
              Como podemos ajudar?
            </p>
          </div>

          {/* Content */}
          <div className="p-4 max-h-[400px] overflow-y-auto">
            {selectedQuestion === null ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Perguntas frequentes:
                </p>
                {faqs.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedQuestion(index)}
                    className="w-full text-left p-3 rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium transition-colors"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="text-sm text-primary hover:underline"
                >
                  ← Voltar
                </button>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-medium text-sm mb-2">
                    {faqs[selectedQuestion].question}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {faqs[selectedQuestion].answer}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              onClick={handleWhatsApp}
              className="w-full gap-2 bg-gradient-orange shadow-orange"
            >
              <Phone className="w-4 h-4" />
              Falar com Atendente
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
