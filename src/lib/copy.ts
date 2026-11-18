/**
 * Content helpers.
 *
 * Any text the client still has to confirm is wrapped in `tbc()` ("to be confirmed").
 * While `site.preview` is true, these render with a gold highlight so reviewers can
 * spot them, and every build prints a list of the placeholders still on the site.
 */

export interface Placeholder {
  tbc: string;
  /** Optional note to the client, shown as a tooltip in preview mode. */
  note?: string;
}

/** A piece of copy: final text, or a placeholder awaiting confirmation. */
export type Copy = string | Placeholder;

/** Copy that can mix final text and placeholders, e.g. ["We deliver in ", tbc("Tamale")]. */
export type RichCopy = Copy | readonly Copy[];

export const tbc = (text: string, note?: string): Placeholder => ({ tbc: text, note });

export const isPlaceholder = (c: Copy): c is Placeholder => typeof c !== 'string';

/** Flattens copy to a plain string, for attributes, meta tags and WhatsApp messages. */
export function plain(c: RichCopy): string {
  const parts: readonly Copy[] = Array.isArray(c) ? c : [c as Copy];
  return parts.map((p) => (isPlaceholder(p) ? p.tbc : p)).join('');
}

export function parts(c: RichCopy): readonly Copy[] {
  return Array.isArray(c) ? c : [c as Copy];
}
