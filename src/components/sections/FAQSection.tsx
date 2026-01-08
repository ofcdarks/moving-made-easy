import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Qual o valor do frete ou mudança?",
    answer: "O valor é calculado de acordo com a distância, volume de itens, tipo de serviço e necessidade de mão de obra. Entre em contato conosco para um orçamento personalizado e gratuito!"
  },
  {
    question: "Vocês fazem mudanças para outros estados?",
    answer: "Sim! Realizamos mudanças intermunicipais e interestaduais para todo o Brasil com segurança e pontualidade."
  },
  {
    question: "Os móveis são desmontados e montados?",
    answer: "Sim, oferecemos serviço completo de desmontagem e montagem de móveis. Nossa equipe é capacitada para lidar com todos os tipos de mobiliário."
  },
  {
    question: "Como funciona o agendamento?",
    answer: "Basta entrar em contato pelo WhatsApp ou telefone, informar a data desejada e faremos uma visita técnica gratuita para avaliar o serviço e fornecer um orçamento preciso."
  },
  {
    question: "Vocês embalam os itens?",
    answer: "Sim! Oferecemos serviço de embalagem profissional com materiais de qualidade (papelão, plástico bolha, mantas, etc.) para garantir a segurança de todos os seus pertences."
  },
  {
    question: "Existe seguro para os itens transportados?",
    answer: "Sim, trabalhamos com seguro de carga para garantir sua tranquilidade. Em caso de qualquer imprevisto, seus pertences estão protegidos."
  },
  {
    question: "Qual o prazo para realização do serviço?",
    answer: "Trabalhamos com agendamento prévio, mas também atendemos demandas urgentes conforme nossa disponibilidade. Recomendamos agendar com antecedência para garantir a melhor data."
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
            Perguntas <span className="text-gradient-orange">Frequentes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl px-6 border-none shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
