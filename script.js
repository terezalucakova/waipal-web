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

    const overlay = document.createElement('div');
    overlay.className = 'cookie-overlay';

    const modal = document.createElement('div');
    modal.className = 'cookie-modal';
    const t = isEn ? {
      title: 'We use cookies',
      desc: 'To provide the best user experience, we use cookies on the WAIPAL website. Some are necessary for the site to function correctly; others help us improve our services or display relevant content.',
      subtitle: 'Choose which cookies you allow:',
      types: [
        { id: 'necessary', label: 'Technical (necessary)', desc: 'Ensure the correct functioning of the website. Cannot be disabled.', locked: true },
        { id: 'analytics', label: 'Analytical', desc: 'Help us understand how users use our website (e.g. via Google Analytics).' },
        { id: 'marketing', label: 'Marketing', desc: 'Used to personalise advertising and track your preferences across websites.' },
      ],
      note: `You can change your consent at any time in your browser settings or in the website footer. <a href="${policyHref}">Privacy policy</a>`,
      save: 'Save settings', acceptAll: 'Accept all',
    } : {
      title: 'Používáme cookies',
      desc: 'Abychom Vám poskytli co nejlepší uživatelský zážitek, používáme na našem webu WAIPAL soubory cookies. Některé jsou nezbytné pro správné fungování webu, jiné nám pomáhají zlepšovat naše služby nebo zobrazovat relevantní obsah.',
      subtitle: 'Vyberte, které cookies povolujete:',
      types: [
        { id: 'necessary', label: 'Technické (nezbytné)', desc: 'Zajišťují správné fungování webu. Nelze vypnout.', locked: true },
        { id: 'analytics', label: 'Analytické', desc: 'Pomáhají nám porozumět, jak uživatelé náš web používají (např. pomocí Google Analytics).' },
        { id: 'marketing', label: 'Marketingové', desc: 'Slouží k personalizaci reklamy a sledování Vašich preferencí napříč weby.' },
      ],
      note: `Svůj souhlas můžete kdykoliv změnit v nastavení prohlížeče nebo v zápatí webu. <a href="${policyHref}">Ochrana osobních údajů</a>`,
      save: 'Uložit nastavení', acceptAll: 'Přijmout vše',
    };

    modal.innerHTML = `
      <h3 class="cookie-modal-title">${t.title}</h3>
      <p class="cookie-modal-desc">${t.desc}</p>
      <p class="cookie-modal-subtitle">${t.subtitle}</p>
      <ul class="cookie-types">
        ${t.types.map(type => `
          <li>
            <div class="cookie-type-row">
              <div class="cookie-type-info">
                <span class="cookie-type-label">${type.label}</span>
                <span class="cookie-type-desc">${type.desc}</span>
              </div>
              <label class="cookie-toggle ${type.locked ? 'cookie-toggle--locked' : ''}">
                <input type="checkbox" id="cookie-${type.id}" ${type.locked ? 'checked disabled' : ''} />
                <span class="cookie-toggle-track"></span>
              </label>
            </div>
          </li>
        `).join('')}
      </ul>
      <p class="cookie-modal-note">${t.note}</p>
      <div class="cookie-modal-btns">
        <button class="btn btn-outline" id="cookieSave">${t.save}</button>
        <button class="btn btn-primary" id="cookieAcceptAll">${t.acceptAll}</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('visible'));

    const dismiss = (value) => {
      localStorage.setItem('cookieConsent', JSON.stringify(value));
      overlay.classList.remove('visible');
      setTimeout(() => overlay.remove(), 350);
    };
    modal.querySelector('#cookieAcceptAll').addEventListener('click', () =>
      dismiss({ necessary: true, analytics: true, marketing: true })
    );
    modal.querySelector('#cookieSave').addEventListener('click', () => {
      dismiss({
        necessary: true,
        analytics: modal.querySelector('#cookie-analytics').checked,
        marketing: modal.querySelector('#cookie-marketing').checked,
      });
    });
  }

});
