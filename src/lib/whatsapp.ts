import { site } from '@/data/site';

/**
 * Builds a WhatsApp click-to-chat link with a pre-filled message.
 * Until a number is set in site.ts, the link opens WhatsApp's share picker instead.
 */
export function waLink(message = `Hello ${site.shortName}!`, number = site.contact.whatsapp): string {
  const digits = number.replace(/\D/g, '');
  const text = encodeURIComponent(message);
  return digits ? `https://wa.me/${digits}?text=${text}` : `https://wa.me/?text=${text}`;
}
