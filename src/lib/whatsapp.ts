// Link do WhatsApp centralizado
export const WHATSAPP_LINK = "https://wa.link/ro0fow";
export const WHATSAPP_PHONE_DISPLAY = "(14) 98834-0448";

export const openWhatsApp = (_text?: string) => {
  window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");
};

// Mantém compatibilidade com chamadas que passam texto (ignora o texto, usa o link fixo)
export const buildWhatsAppWebUrl = (_text?: string) => WHATSAPP_LINK;
