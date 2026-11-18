/** Mobile menu toggle: opens/closes the nav, closes on link click, Escape or wider screens. */
export function initNav(): void {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-btn]');
  if (!nav || !btn) return;

  const setOpen = (open: boolean): void => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  };

  btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setOpen(false);
      btn.focus();
    }
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}
