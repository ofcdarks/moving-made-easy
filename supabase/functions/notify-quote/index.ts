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

    console.log("Sending notification for quote:", quote.name);

    const emailHtml = `
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
              <td style="padding: 8px 0; color: #111827;">${serviceLabels[quote.service_type] || quote.service_type}</td>
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

    const { data, error } = await resend.emails.send({
      from: "LF Fretes <onboarding@resend.dev>",
      to: ["luisfernandonavarroa8@gmail.com"],
      subject: `Novo Orçamento: ${quote.name} - ${serviceLabels[quote.service_type] || quote.service_type}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    console.log("Email sent successfully:", data);

    return new Response(
      JSON.stringify({ success: true, data }),
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
