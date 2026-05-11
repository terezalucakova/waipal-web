document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile menu ──────────────────────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── FAQ accordion ────────────────────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Language dropdown ────────────────────────────────────────────────────
  const langSwitch = document.querySelector('.lang-switch');
  if (langSwitch) {
    const langBtn = langSwitch.querySelector('.lang-btn');
    langBtn.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = langSwitch.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', () => {
      langSwitch.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // ── Sticky nav shadow ────────────────────────────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,.08)' : '';
    }, { passive: true });
  }

  // ── Cookie banner ────────────────────────────────────────────────────────
  if (!localStorage.getItem('cookieConsent')) {
    const isEn = location.pathname.includes('/en/');
    const policyHref = isEn ? '../ochrana-osobnich-udaju.html' : 'ochrana-osobnich-udaju.html';
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <p class="cookie-banner-text">
        ${isEn
          ? `We use cookies to improve your experience. By clicking "Accept all" you agree to the use of all cookies. <a href="${policyHref}">Privacy policy</a>`
          : `Používáme cookies pro zlepšení Vašeho zážitku. Kliknutím na „Přijmout vše" souhlasíte s použitím všech cookies. <a href="${policyHref}">Ochrana osobních údajů</a>`
        }
      </p>
      <div class="cookie-banner-btns">
        <button class="btn btn-white-outline" id="cookieNecessary">${isEn ? 'Necessary only' : 'Pouze nezbytné'}</button>
        <button class="btn btn-white" id="cookieAcceptAll">${isEn ? 'Accept all' : 'Přijmout vše'}</button>
      </div>
    `;
    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('visible'));

    const dismiss = (value) => {
      localStorage.setItem('cookieConsent', value);
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 400);
    };
    banner.querySelector('#cookieAcceptAll').addEventListener('click', () => dismiss('all'));
    banner.querySelector('#cookieNecessary').addEventListener('click', () => dismiss('necessary'));
  }

});
