/**
 * Contact form: validates input, then either posts to a form service (Formspree etc.)
 * or, if no endpoint is configured, opens WhatsApp with the enquiry pre-filled.
 */

export const ENQUIRY_TYPES = [
  'Buy grain',
  'Buy guinea fowl',
  'Regular bulk supply',
  'Sell my grain to AgriGuard',
  'Partnership or investment',
  'Something else',
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export interface Enquiry {
  name: string;
  phone: string;
  email: string;
  type: EnquiryType | '';
  quantity: string;
  message: string;
}

type Errors = Partial<Record<keyof Enquiry, string>>;

export function validate(e: Enquiry): Errors {
  const errors: Errors = {};
  if (e.name.trim().length < 2) errors.name = 'Enter your name.';
  const digits = e.phone.replace(/\D/g, '');
  if (digits.length < 9 || digits.length > 15) errors.phone = 'Enter a phone number we can call or WhatsApp, e.g. 024 123 4567.';
  if (e.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)) errors.email = 'Check the email address, or leave it blank.';
  if (!e.type) errors.type = 'Choose what your enquiry is about.';
  if (e.message.trim().length < 5) errors.message = 'Tell us a little about what you need.';
  return errors;
}

export function toWhatsAppText(e: Enquiry): string {
  return [
    `Hello AgriGuard, my name is ${e.name.trim()}.`,
    `Enquiry: ${e.type}`,
    e.quantity.trim() ? `Quantity: ${e.quantity.trim()}` : null,
    `Phone: ${e.phone.trim()}`,
    e.email.trim() ? `Email: ${e.email.trim()}` : null,
    '',
    e.message.trim(),
  ]
    .filter((l): l is string => l !== null)
    .join('\n');
}

function read(form: HTMLFormElement): Enquiry {
  const d = new FormData(form);
  const s = (k: string) => String(d.get(k) ?? '');
  return {
    name: s('name'),
    phone: s('phone'),
    email: s('email'),
    type: s('type') as Enquiry['type'],
    quantity: s('quantity'),
    message: s('message'),
  };
}

function showErrors(form: HTMLFormElement, errors: Errors): void {
  form.querySelectorAll<HTMLElement>('[data-err]').forEach((el) => {
    const key = el.dataset.err as keyof Enquiry;
    const input = form.elements.namedItem(key) as HTMLInputElement | null;
    el.textContent = errors[key] ?? '';
    input?.setAttribute('aria-invalid', errors[key] ? 'true' : 'false');
  });
  const first = Object.keys(errors)[0];
  if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
}

function setStatus(el: HTMLElement, kind: 'ok' | 'bad', text: string): void {
  el.hidden = false;
  el.className = `form-status ${kind}`;
  el.textContent = text;
}

export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  const status = document.querySelector<HTMLElement>('[data-form-status]');
  if (!form || !status) return;

  const endpoint = form.dataset.endpoint ?? '';
  const waBase = form.dataset.wa ?? 'https://wa.me/';
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    status.hidden = true;

    // Honeypot: bots fill hidden fields, people don't.
    if ((form.elements.namedItem('company') as HTMLInputElement | null)?.value) return;

    const data = read(form);
    const errors = validate(data);
    showErrors(form, errors);
    if (Object.keys(errors).length) return;

    if (!endpoint) {
      const url = `${waBase}?text=${encodeURIComponent(toWhatsAppText(data))}`;
      window.open(url, '_blank', 'noopener');
      setStatus(status, 'ok', 'WhatsApp should open with your message ready. Tap send there to reach us.');
      return;
    }

    if (submit) submit.disabled = true;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus(status, 'ok', 'Thank you. Your message has been sent and we will get back to you soon.');
    } catch {
      setStatus(status, 'bad', 'Your message could not be sent. Check your connection and try again, or message us on WhatsApp.');
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}
