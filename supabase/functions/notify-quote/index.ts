import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteNotification {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  origin_address: string;
  destination_address: string;
  preferred_date: string | null;
  message: string | null;
}

const serviceLabels: Record<string, string> = {
  "mudanca-residencial": "Mudança Residencial",
  "mudanca-comercial": "Mudança Comercial",
  "frete-carga": "Frete e Carga",
  "embalagem": "Embalagem e Proteção",
  "montagem": "Montagem e Desmontagem",
  "eventos": "Eventos e Feiras",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const quote: QuoteNotification = await req.json();
    const serviceName = serviceLabels[quote.service_type] || quote.service_type;

    console.log("Sending notifications for quote:", quote.name);

    // Email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 20px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🚚 Novo Pedido de Orçamento</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
          <h2 style="color: #374151; margin-top: 0;">Dados do Cliente</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Nome:</td>
              <td style="padding: 8px 0; color: #111827;">${quote.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">E-mail:</td>
              <td style="padding: 8px 0; color: #111827;"><a href="mailto:${quote.email}" style="color: #f97316;">${quote.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Telefone:</td>
              <td style="padding: 8px 0; color: #111827;"><a href="tel:${quote.phone}" style="color: #f97316;">${quote.phone}</a></td>
            </tr>
          </table>
          
          <h2 style="color: #374151; margin-top: 20px;">Detalhes do Serviço</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Tipo de Serviço:</td>
              <td style="padding: 8px 0; color: #111827;">${serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Origem:</td>
              <td style="padding: 8px 0; color: #111827;">${quote.origin_address}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Destino:</td>
              <td style="padding: 8px 0; color: #111827;">${quote.destination_address}</td>
            </tr>
            ${quote.preferred_date ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Data Preferida:</td>
              <td style="padding: 8px 0; color: #111827;">${new Date(quote.preferred_date).toLocaleDateString('pt-BR')}</td>
            </tr>
            ` : ''}
          </table>
          
          ${quote.message ? `
          <h2 style="color: #374151; margin-top: 20px;">Mensagem</h2>
          <p style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; color: #374151;">
            ${quote.message}
          </p>
          ` : ''}
        </div>
        
        <div style="background: #374151; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            LF Fretes e Mudanças - Sistema de Orçamentos
          </p>
        </div>
      </div>
    `;

    // Email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">✅ Orçamento Recebido!</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px 20px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="color: #374151; font-size: 16px; margin-top: 0;">
            Olá <strong>${quote.name}</strong>,
          </p>
          
          <p style="color: #374151; font-size: 16px;">
            Recebemos sua solicitação de orçamento para <strong>${serviceName}</strong> e nossa equipe já está analisando os detalhes.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 10px; border: 1px solid #e5e7eb; margin: 20px 0;">
            <h3 style="color: #f97316; margin-top: 0;">📋 Resumo da Solicitação</h3>
            <p style="color: #6b7280; margin: 8px 0;"><strong>Serviço:</strong> ${serviceName}</p>
            <p style="color: #6b7280; margin: 8px 0;"><strong>Origem:</strong> ${quote.origin_address}</p>
            <p style="color: #6b7280; margin: 8px 0;"><strong>Destino:</strong> ${quote.destination_address}</p>
            ${quote.preferred_date ? `<p style="color: #6b7280; margin: 8px 0;"><strong>Data Preferida:</strong> ${new Date(quote.preferred_date).toLocaleDateString('pt-BR')}</p>` : ''}
          </div>
          
          <p style="color: #374151; font-size: 16px;">
            <strong>Próximos passos:</strong>
          </p>
          <ul style="color: #6b7280; font-size: 14px;">
            <li>Nossa equipe entrará em contato em até <strong>24 horas</strong></li>
            <li>Enviaremos um orçamento detalhado por e-mail ou WhatsApp</li>
            <li>Sem compromisso - você decide se aceita ou não</li>
          </ul>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              📞 <strong>Precisa de atendimento urgente?</strong><br>
              Ligue para (14) 99123-4567 ou envie uma mensagem pelo WhatsApp.
            </p>
          </div>
        </div>
        
        <div style="background: #374151; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
          <p style="color: white; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">
            LF Fretes e Mudanças
          </p>
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            Bauru/SP e Região | Mudanças com Cuidado e Qualidade
          </p>
        </div>
      </div>
    `;

    // Send both emails
    const [adminResult, customerResult] = await Promise.all([
      resend.emails.send({
        from: "LF Fretes <onboarding@resend.dev>",
        to: ["luisfernandonavarroa8@gmail.com"],
        subject: `Novo Orçamento: ${quote.name} - ${serviceName}`,
        html: adminEmailHtml,
      }),
      resend.emails.send({
        from: "LF Fretes <onboarding@resend.dev>",
        to: [quote.email],
        subject: `Recebemos seu pedido de orçamento - LF Fretes e Mudanças`,
        html: customerEmailHtml,
      }),
    ]);

    if (adminResult.error) {
      console.error("Error sending admin email:", adminResult.error);
    }
    if (customerResult.error) {
      console.error("Error sending customer email:", customerResult.error);
    }

    console.log("Emails sent successfully:", { admin: adminResult.data, customer: customerResult.data });

    return new Response(
      JSON.stringify({ 
        success: true, 
        admin: adminResult.data,
        customer: customerResult.data 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in notify-quote function:", message);
    return new Response(
      JSON.stringify({ error: message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
