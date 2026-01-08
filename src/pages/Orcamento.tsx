import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Truck, Send, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
  phone: z.string().trim().min(10, "Telefone inválido").max(20, "Telefone muito longo"),
  service_type: z.string().min(1, "Selecione um serviço"),
  origin_address: z.string().trim().min(5, "Endereço de origem inválido").max(500, "Endereço muito longo"),
  destination_address: z.string().trim().min(5, "Endereço de destino inválido").max(500, "Endereço muito longo"),
  preferred_date: z.date().optional(),
  message: z.string().trim().max(1000, "Mensagem muito longa").optional(),
});

type FormValues = z.infer<typeof formSchema>;

const services = [
  { value: "mudanca-residencial", label: "Mudança Residencial" },
  { value: "mudanca-comercial", label: "Mudança Comercial" },
  { value: "frete-carga", label: "Frete e Carga" },
  { value: "embalagem", label: "Embalagem e Proteção" },
  { value: "montagem", label: "Montagem e Desmontagem" },
  { value: "eventos", label: "Eventos e Feiras" },
];

const Orcamento = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service_type: "",
      origin_address: "",
      destination_address: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("quote_requests").insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        service_type: values.service_type,
        origin_address: values.origin_address,
        destination_address: values.destination_address,
        preferred_date: values.preferred_date ? format(values.preferred_date, "yyyy-MM-dd") : null,
        message: values.message || null,
      });

      if (error) throw error;

      setIsSuccess(true);
      form.reset();
      toast({
        title: "Orçamento enviado!",
        description: "Entraremos em contato em breve.",
      });
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Truck className="w-4 h-4" />
            <span className="text-sm font-medium">Solicite seu orçamento</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Orçamento <span className="text-gradient-orange">Gratuito</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Preencha o formulário abaixo e receba um orçamento personalizado sem compromisso.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {isSuccess ? (
              <div className="bg-card rounded-2xl shadow-card p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-display font-bold mb-4">
                  Orçamento Enviado com Sucesso!
                </h2>
                <p className="text-muted-foreground mb-8">
                  Recebemos sua solicitação. Nossa equipe entrará em contato em até 24 horas.
                </p>
                <Button
                  onClick={() => setIsSuccess(false)}
                  className="bg-gradient-orange hover:opacity-90"
                >
                  Enviar Novo Orçamento
                </Button>
              </div>
            ) : (
              <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo *</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="seu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone *</FormLabel>
                            <FormControl>
                              <Input placeholder="(14) 99999-9999" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="service_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de Serviço *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione um serviço" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {services.map((service) => (
                                  <SelectItem key={service.value} value={service.value}>
                                    {service.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="origin_address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço de Origem *</FormLabel>
                          <FormControl>
                            <Input placeholder="Rua, número, bairro, cidade" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="destination_address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço de Destino *</FormLabel>
                          <FormControl>
                            <Input placeholder="Rua, número, bairro, cidade" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferred_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Data Preferencial</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                                  ) : (
                                    <span>Selecione uma data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Informações Adicionais</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descreva itens especiais, quantidade de móveis, horários, etc."
                              className="min-h-[120px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-orange hover:opacity-90 shadow-orange gap-2"
                    >
                      {isSubmitting ? (
                        <>Enviando...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Solicitar Orçamento Gratuito
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
      <CookieBanner />
    </main>
  );
};

export default Orcamento;
