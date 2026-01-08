import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const defaultFaqs = [
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
    question: "O que é mudança compartilhada?",
    answer: "É uma modalidade econômica onde você divide o espaço do caminhão com outras cargas que seguem o mesmo trajeto, reduzindo significativamente o custo do frete."
  },
  {
    question: "Vocês fazem transporte para feiras e eventos?",
    answer: "Sim! Oferecemos transporte especializado para feiras, exposições e eventos corporativos, com pontualidade garantida."
  },
  {
    question: "Como funciona o agendamento?",
    answer: "Basta entrar em contato pelo WhatsApp ou telefone, informar a data desejada e faremos uma visita técnica gratuita para avaliar o serviço e fornecer um orçamento preciso."
  },
  {
    question: "Existe seguro para os itens transportados?",
    answer: "Sim, trabalhamos com seguro de carga para garantir sua tranquilidade. Em caso de qualquer imprevisto, seus pertences estão protegidos."
  },
];

const FAQSection = () => {
  const { data: faqs, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section id="faq" className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl mb-4">
            Perguntas <span className="text-gradient-red">Frequentes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="bg-card rounded-xl px-6 py-5">
                  <Skeleton className="h-6 w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
            {displayFaqs.map((faq, index) => (
              <AccordionItem
                key={'id' in faq ? String(faq.id) : index}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
