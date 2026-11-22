const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

/* Theme switcher */
(() => {
  const root = document.documentElement;
  const wrap = document.querySelector('.theme-switcher');
  if (!wrap) return;
  const toggleBtn = wrap.querySelector('.theme-toggle');
  const menu = wrap.querySelector('.theme-menu');
  const choices = [...menu.querySelectorAll('[data-theme-choice]')];
  const valid = choices.map(c => c.dataset.themeChoice);

  function applyTheme(theme, save) {
    if (!valid.includes(theme)) theme = 'dark';
    root.setAttribute('data-theme', theme);
    choices.forEach(c => c.setAttribute('aria-checked', String(c.dataset.themeChoice === theme)));
    const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg);
    if (save) { try { localStorage.setItem('theme', theme); } catch (e) {} }
  }

  function setOpen(open) {
    menu.hidden = !open;
    toggleBtn.setAttribute('aria-expanded', String(open));
  }

  toggleBtn.addEventListener('click', () => setOpen(menu.hidden));
  choices.forEach(c => c.addEventListener('click', () => {
    applyTheme(c.dataset.themeChoice, true);
    setOpen(false);
    toggleBtn.focus();
  }));
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) { setOpen(false); toggleBtn.focus(); }
  });

  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  applyTheme(saved || root.getAttribute('data-theme') || 'dark', false);
})();
