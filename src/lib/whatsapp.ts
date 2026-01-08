// Centraliza a abertura do WhatsApp sem usar links do tipo wa.me / api.whatsapp.com

export const WHATSAPP_PHONE_E164 = "5514988340448";
export const WHATSAPP_PHONE_DISPLAY = "(14) 98834-0448";

export const buildWhatsAppWebUrl = (text: string) => {
  const encoded = encodeURIComponent(text);
  return `https://web.whatsapp.com/send?phone=${WHATSAPP_PHONE_E164}&text=${encoded}`;
};

export const buildWhatsAppAppUrl = (text: string) => {
  const encoded = encodeURIComponent(text);
  return `whatsapp://send?phone=${WHATSAPP_PHONE_E164}&text=${encoded}`;
};

export const openWhatsApp = (text: string) => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const webUrl = buildWhatsAppWebUrl(text);

  if (!isMobile) {
    window.open(webUrl, "_blank", "noopener,noreferrer");
    return;
  }

  // Tenta abrir o app; se não der, faz fallback para o WhatsApp Web.
  window.location.href = buildWhatsAppAppUrl(text);
  window.setTimeout(() => {
    window.open(webUrl, "_blank", "noopener,noreferrer");
  }, 700);
};
