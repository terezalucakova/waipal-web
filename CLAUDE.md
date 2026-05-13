# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static marketing website for **Waipal** – a bilingual (Czech + English) service offering two products:
1. **Ochrana duševního vlastnictví** – blockchain certificate proving document existence/ownership
2. **Šifrování dokumentů** – encrypted document storage

The site links out to the live app at `https://waipal.com` for login and registration. No build step, no framework, no dependencies – open `index.html` directly in a browser. English pages live in the `en/` subdirectory.

## File structure

| File | Purpose |
|---|---|
| `index.html` | Main landing page (CZ) – hero, both services, why/audiences/benefits/FAQ sections |
| `ip-ochrana.html` | Subpage (CZ) – IP protection detail + registration CTA |
| `sifrovani.html` | Subpage (CZ) – document encryption detail + registration CTA |
| `en/index.html` | Main landing page (EN) – full English translation of index.html |
| `en/ip-protection.html` | Subpage (EN) – English translation of ip-ochrana.html |
| `en/encryption.html` | Subpage (EN) – English translation of sifrovani.html |
| `style.css` | Shared styles for all pages (CZ + EN) |
| `script.js` | Shared JS: mobile hamburger menu, FAQ accordion, sticky nav shadow, language dropdown, cookie consent modal |
| `hero-shader.js` | WebGL/Three.js animated grid shader for index.html hero background |
| `hero-image.png` | Hero background image layered on top of shader (right side, index.html) |
| `ip-hero.png` | Hero background image for ip-ochrana.html (dark blue, copyright/creative icons) |
| `sifrovani-hero.png` | Hero background image for sifrovani.html (dark blue, document + padlock) |
| `service-ip.png` | IP protection illustration (available as asset) |
| `service-ip-bg.png` | Lighter IP protection illustration (available as watermark asset) |
| `favicon.png` | Favicon used by all pages (`<link rel="icon" type="image/png">`) |
| `favicon.ico` | Fallback favicon (empty file, `favicon.png` takes precedence) |
| `kontext-waipal.md` | Full project brief in Czech – source of truth for copy, tone, structure |
| `podminky.html` | Obchodní podmínky (VOP) – 12 numbered articles, same nav/footer as subpages |
| `ochrana-osobnich-udaju.html` | Ochrana osobních údajů (GDPR) – rights grid cards, info box, same nav/footer |
| `sitemap.xml` | XML sitemap with all 6 URLs + hreflang pairs; submit to Google Search Console |
| `robots.txt` | Allows all crawlers; references sitemap URL |
| `og-image.png` | **TODO – not yet created.** OG image (1200×630 px) for social sharing previews. Until created, og:image tags point to this path but return 404. |

## Design system (CSS variables)

Defined in `:root` at the top of `style.css`:

- `--blue: #1B4FD8` – primary brand colour, CTAs
- `--blue-dark: #1340B0` – button hover state
- `--navy: #0F1A3C` – dark background (hero, footer)
- `--blue-light: #EEF3FF` – section backgrounds, icon backgrounds, register-box
- `--bg: #F8FAFF` – alternating section background (why/audiences/cert sections)
- `--text: #1E293B`, `--muted: #64748B` – body text
- `--border: #E2E8F0` – card and divider borders
- `--white: #FFFFFF`, `--green: #059669` – white background; green for "✓ Ověřeno" status
- `--radius: 12px`, `--radius-sm: 8px`
- `--shadow`, `--shadow-md` – card shadow and elevated hover shadow
- `--transition: .2s ease` – standard CSS transition

## Font

Inter from Google Fonts (weights 400, 500, 600, 700, 800). Loaded via `<link>` preconnect in every HTML `<head>`.

## Hero / subhero architecture

**Main hero** (`index.html`) – class `.hero`, min-height 585px, flex center. Z-index stack (bottom to top):
1. `.hero-shader-canvas` (z-index 0) – WebGL canvas filling the full hero; animated navy+blue grid
2. `.hero-bg-img` (z-index 0, later in DOM = above shader) – `position: absolute; right: 0; width: 65%; opacity: 0.65; mix-blend-mode: luminosity` – image blends with shader beneath it
3. `.hero-overlay` (z-index 1) – full-width gradient `#0F1A3C solid → transparent`, ensures left-side text readability
4. `.hero-inner` (z-index 2) – `max-width: 1180px; padding: 5rem 1.5rem 4.5rem`
- On screens ≤900 px: `.hero-bg-img` and `.hero-overlay` are hidden (`display: none`); shader canvas remains visible

**Subhero** (`ip-ochrana.html`, `sifrovani.html`) – class `.subhero`, padding 4.5rem:
- `.subhero-bg-img` – desktop: `position: absolute; right: -60px; width: 58%; height: 100%; object-fit: cover; object-position: left center`
- `.subhero-overlay` – full-width gradient (same logic)
- `.subhero-inner` – `position: relative; z-index: 2; max-width: 1180px; margin: 0 auto`
- `.hero-badge` – pill badge with inline SVG icon above the h1 (no emoji); SVG uses `vertical-align:middle;margin-right:6px;`; no back-link above it
- **On ≤900 px**: subhero image switches to `width: 100%; right: 0; object-position: center center; opacity: 0.35` and overlay becomes a uniform vertical gradient – image is centered and visible on mobile

The gradient must use multiple stops to avoid a visible hard edge – typically 5–6 stops from solid navy through semi-transparent to fully transparent.

## Service cards (index.html)

Two side-by-side cards using `grid-template-columns: 1fr 1fr`:
- Each card: `position: relative; overflow: hidden; padding: 2.5rem; display: flex; flex-direction: column`
- IP protection card uses `.service-card-bg-img` (absolutely positioned watermark, `opacity: .13`)
- All "Zjistit více" buttons use `btn-primary` (same blue for both cards)
- Collapses to single column at ≤900 px

## Button conventions

| Variant | Background | Text | Use where |
|---|---|---|---|
| `btn-primary` | `--blue` | white | light backgrounds (cards, sections, register-box) |
| `btn-outline` | transparent | `--blue` | light backgrounds, secondary nav action |
| `btn-white` | white | `--blue` | dark backgrounds – primary CTA (subhero, CTA banner) |
| `btn-white-outline` | transparent | white | dark backgrounds – secondary CTA (index.html hero, sifrovani.html "Porovnat služby") |

- **Index.html hero** uses `btn-white-outline` for both CTAs (not `btn-white`)
- **Subpage subhero** primary CTA uses `btn-white`; secondary uses `btn-white-outline`
- **CTA banner** (`.cta-banner`) uses `btn-white`
- Nav always has: `btn-outline` (Přihlásit se) + `btn-primary` (Registrace)
- Never mix `btn-outline` and `btn-primary` for equivalent actions on the same page
- Add `.btn-lg` for large padding variant (`1rem 2.25rem`, font 1.1rem)

## Copy and tone rules

All copy is in **Czech**, using **vykání** (formal second person). Key constraints from `kontext-waipal.md`:
- Never promise legal guarantees – use „může sloužit jako podpůrný důkaz", „pomáhá doložit"
- Never say blockchain protects copyright automatically
- Price: **od 79 Kč** per certificate
- External links go to `https://waipal.com/register`, `/login`, `/verify`
- Logo assets: `https://waipal.com/img/logos/waipal.png` (dark) and `waipal_white_1.png` (light/footer)

## Layout conventions

- **3-column grids** (`.why-grid`, `.audiences-grid`) use `grid-template-columns: repeat(3, 1fr)` (not `auto-fit`) to keep consistent 3×N layout
- **Auto-fit grids** (`.steps-grid`, `.benefits-grid`) use `repeat(auto-fit, minmax(..., 1fr))` – these intentionally reflow
- **Benefits section** (`index.html` + `en/index.html`) uses class `.benefits-section` on the `<section>` for the `--blue-light` background. Each `.benefit-item` is a white card with padding, shadow, and hover. `.benefit-check` is a solid `--blue` filled circle with white tick.
- **Placeholder/card grids** (pricing, reviews, certificates in `index.html`) use CSS class `.cards-grid` – 3 columns on desktop, 1 column at ≤900px. Never use inline `grid-template-columns` for grids that need to be responsive.
- Section padding: `3rem 0`; container max-width: `1180px`
- To reduce spacing between two specific sections, add `style="padding-top: 1rem;"` inline on the second section
- FAQ accordion: clicking `.faq-question` toggles `.open` on parent `.faq-item`; only one item open at a time

## Placeholder sections (index.html + en/index.html)

Three sections with real-looking placeholder content, each using `.cards-grid`:
- **#cenik / #pricing** – 3 pricing tier cards (Základní / Pro / Firemní), prices TBD
- **#recenze / #reviews** – 3 review cards with fictional Czech users and photos from `i.pravatar.cc`:
  - Jana Nováková (img=47) – freelance grafička
  - Tomáš Kovář (img=15) – zakladatel startupu
  - Markéta Horáková (img=32) – architektka
- **#certifikaty / #certificates** – 3 certification placeholder cards with shield SVG icons

## Hero shader (`hero-shader.js`)

Animated WebGL background for `index.html` hero only. Three.js loaded from CDN before the shader script:
```html
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
<script src="hero-shader.js"></script>
<script src="script.js"></script>
```

Key GLSL parameters (all in `hero-shader.js`):
- `iTime * 0.38` – overall animation speed
- `warp * 0.22` + `smoothstep(0.65, ...)` – mouse warp intensity and radius
- `sin(t * 2.0) * 0.42` – grid brightness pulse amplitude
- Energy pulse speed: `t * 7.0` / `t * 5.0`
- Mouse glow: `smoothstep(0.22, ...)` radius, `* 1.1` intensity
- Colors: navy base `vec3(0.059, 0.102, 0.235)` (#0F1A3C), grid `vec3(0.106, 0.310, 0.847)` (#1B4FD8), pulses/glow `vec3(0.4, 0.65, 1.0)`

The shader does **not** use React, TypeScript or Tailwind – it is plain vanilla JS with Three.js global.

## Language switcher

All 6 pages have a flag dropdown in the nav. HTML pattern (CZ pages):
```html
<div class="lang-switch">
  <button class="lang-btn" aria-haspopup="true" aria-expanded="false">
    <span class="lang-flag">🇨🇿</span>
    <svg class="lang-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  </button>
  <div class="lang-menu">
    <span class="lang-option lang-option-active"><span class="lang-flag">🇨🇿</span> CS</span>
    <a href="en/index.html" class="lang-option"><span class="lang-flag">🇬🇧</span> EN</a>
  </div>
</div>
```
For EN pages: swap flag to 🇬🇧, active span = EN, CZ link = `../index.html` (or `../ip-ochrana.html` / `../sifrovani.html`).

CSS classes: `.lang-switch` (relative wrapper), `.lang-btn` (trigger button), `.lang-menu` (hidden by default, `display:block` when `.lang-switch.open`), `.lang-option` / `.lang-option-active`, `.lang-flag`, `.lang-chevron` (rotates 180° when open).

JS in `script.js`: click on `.lang-btn` toggles `.open` on `.lang-switch`; click anywhere else closes it.

## English pages (`en/` subdirectory)

| CZ page | EN equivalent | Lang switcher target |
|---|---|---|
| `index.html` | `en/index.html` | `en/index.html` |
| `ip-ochrana.html` | `en/ip-protection.html` | `en/ip-protection.html` |
| `sifrovani.html` | `en/encryption.html` | `en/encryption.html` |

EN pages use `../` relative paths for all assets: `../style.css`, `../script.js`, `../favicon.png`, `../hero-image.png`, etc. Internal EN links point to `ip-protection.html` and `encryption.html` (no `en/` prefix needed within the subdirectory).

## Navigation patterns

- `index.html` nav links are anchor-only: `href="#sluzby"`, `href="#proc"`, etc.
- Subpage nav links prefix with filename: `href="index.html#sluzby"`, `href="index.html#proc"`, etc.
- EN subpage nav links prefix with `index.html`: `href="index.html#services"`, etc.

## Subpage components

**Tabs nav** (`.tabs-nav`, `.tab-link`) – CSS class exists in `style.css` but the tab nav has been **removed from both subpages**. Do not re-add it.

**Steps** (`.steps-grid`, `.step-card`, `.step-number`) – numbered process steps:
- `.step-number` is a blue filled circle with white number
- Uses `auto-fit` grid so steps reflow on mobile

**Certificate showcase** (`.cert`, `.cert-grid`, `.cert-visual`, `.cert-header`, `.cert-row`, `.cert-item`, `.cert-item-dot`) – used on `ip-ochrana.html` to show a sample certificate mockup:
- Two-column grid (`1fr 1fr`), collapses to single column at ≤900 px
- `.cert-row-value` uses `font-family: monospace` for hash values
- Green `--green` colour for "✓ Ověřeno" / "✓ Zašifrováno" status

**Highlight box** (`.highlight-box`) – left-bordered callout:
- `border-left: 4px solid --blue`, light background
- Use for important caveats or "Waipal Vám pomáhá…" framing copy

**Register box** (`.register-box`) – CTA at bottom of each subpage:
- Blue border on `--blue-light` background, centred text
- Contains h3, description p, and CTA buttons

## Responsive breakpoints

**≤900 px:**
- Nav links/CTA hidden → hamburger shown
- Services grid, cert grid → single column
- Footer grid → 2 columns
- `.hero-bg-img` and `.hero-overlay` hidden (shader canvas stays visible)
- `.cards-grid` (pricing/reviews/certificates) → single column
- Subhero bg-image: `width: 100%; right: 0; object-position: center; opacity: 0.35`; overlay switches to uniform vertical gradient

**≤600 px:**
- `.hero`: `padding: 0; min-height: auto` — removes double padding; `.hero-inner` gets `padding: 2.5rem 1.25rem`
- `.hero-shader-canvas`: `opacity: 0.45` — shader is less intense on small screens
- Hero/subhero CTAs stack vertically; CTA banner buttons stack with `width: 100%` and `align-items: stretch` (prevents long labels from overflowing)
- Footer → single column; `.why-grid` → single column; `.audiences-grid` → 2 columns (not 1)

**Rule:** Never use `grid-template-columns: repeat(N, 1fr)` as an inline style — it cannot be overridden by media queries. Always use a CSS class (e.g. `.cards-grid`, `.services-grid`).

## SVG icon style (všechny stránky)

**Žádné emoji ikonky na webu nepoužíváme.** Všude jsou inline SVG – why-grid, audiences-grid, hero/CTA tlačítka, subhero badges, cert-icon v certifikátových showcase. Při přidávání zachovat: `stroke-width="1.8"`, `fill="none"`, `stroke="currentColor"`, `stroke-linecap="round"`, `stroke-linejoin="round"`.

**Vzor pro `.why-item-icon`** (why-grid, 52×52 px):
```html
<div class="why-item-icon" style="background:var(--blue-light);border-radius:10px;width:52px;height:52px;display:flex;align-items:center;justify-content:center;color:var(--blue);flex-shrink:0;">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">…</svg>
</div>
```

**Vzor pro `.audience-icon`** (audiences-grid, 60×60 px, centrované):
```html
<div class="audience-icon" style="background:var(--blue-light);border-radius:10px;width:60px;height:60px;display:flex;align-items:center;justify-content:center;color:var(--blue);margin:0 auto .75rem;">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">…</svg>
</div>
```

**Vzor pro `.btn-icon`** (tlačítka v hero a CTA banneru, 18×18 px):
```html
<span class="btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">…</svg></span>
```
`.btn-icon` má `display:inline-flex; align-items:center; vertical-align:middle;` – barva se dědí z textu tlačítka.

**Vzor pro `.cert-icon`** (certifikátový showcase, 32×32 px, modrá barva):
```html
<div class="cert-icon" style="color:var(--blue);display:flex;align-items:center;justify-content:center;">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">…</svg>
</div>
```

**Vzor pro `.hero-badge` ikonku** (subhero badge, 15×15 px):
```html
<svg width="15" height="15" … style="vertical-align:middle;margin-right:6px;">…</svg>
```

Standardní ikonky projektu:
- **Štít** (IP ochrana): `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`
- **Zámek** (šifrování): `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`
- **Obálka** (kontakt): `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`

## SEO

All 6 pages have a full SEO `<head>` block inserted after `<link rel="stylesheet">`. Pattern (adjust canonical/hreflang/og:url/og:locale per page):

```html
<!-- SEO -->
<link rel="canonical" href="https://waipal.com/" />
<link rel="alternate" hreflang="cs" href="https://waipal.com/" />
<link rel="alternate" hreflang="en" href="https://waipal.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://waipal.com/" />
<link rel="apple-touch-icon" href="/favicon.png" />
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#0F1A3C" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Waipal" />
<meta property="og:locale" content="cs_CZ" />          <!-- en_US for EN pages -->
<meta property="og:title" content="…" />
<meta property="og:description" content="…" />
<meta property="og:url" content="https://waipal.com/" />
<meta property="og:image" content="https://waipal.com/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="…" />
<meta name="twitter:description" content="…" />
<meta name="twitter:image" content="https://waipal.com/og-image.png" />
```

**JSON-LD** (only on `index.html` + `en/index.html`):
- `Organization` schema – name, url, logo, email, legalName, address
- `FAQPage` schema – all 6 FAQ questions/answers (enables rich results in Google)

**hreflang pairs:**
| CZ page | EN page |
|---|---|
| `https://waipal.com/` | `https://waipal.com/en/` |
| `https://waipal.com/ip-ochrana` | `https://waipal.com/en/ip-protection` |
| `https://waipal.com/sifrovani` | `https://waipal.com/en/encryption` |

`x-default` always points to the CZ URL. `sitemap.xml` includes all 6 URLs with hreflang pairs.

**After any new page is added:** update `sitemap.xml`, add the full SEO block to `<head>`, and add the correct hreflang pair on both language versions.

## Legal pages (`podminky.html`, `ochrana-osobnich-udaju.html`)

Both pages use page-scoped `<style>` blocks (not in `style.css`) with classes:
- `.legal-hero` – navy header, centred title + subtitle
- `.legal-content` – `max-width: 820px`, `margin: 0 auto`
- `.legal-effective` – blue pill badge with effective date
- `.legal-content h2` – section heading with `border-bottom: 2px solid var(--blue-light)`
- `.legal-info-box` – `--blue-light` background box (used for company contact info)

`ochrana-osobnich-udaju.html` also has:
- `.rights-grid` – `repeat(auto-fit, minmax(220px, 1fr))` grid for GDPR rights cards
- `.rights-item` – card with blue SVG icon + text

Footer links on these pages point to local files (`podminky.html`, `ochrana-osobnich-udaju.html`), not to `waipal.com/terms` or `waipal.com/privacy-policy`.

## Footer structure

Footer grid: `grid-template-columns: 2fr 1fr 1fr 1fr` (4 columns):
1. `.footer-brand` – logo, tagline, company address
2. **Služby** – IP ochrana, Šifrování, Ověřit certifikát
3. **Společnost** – FAQ, Kontakt (#kontakt), info@waipal.com
4. **Právní** – Ochrana osobních údajů, Obchodní podmínky

Footer bottom bar has: copyright left; Ochrana osobních údajů + Obchodní podmínky right.

At ≤900 px footer collapses to 2 columns; at ≤600 px to 1 column.

**Never put the privacy/terms links only in the "Společnost" column** – they belong in the dedicated "Právní" column.

## Cookie consent modal

Injected by `script.js` on first visit (checks `localStorage.getItem('cookieConsent')`). Stores result as JSON: `{ necessary: true, analytics: bool, marketing: bool }`.

CSS classes in `style.css`:
- `.cookie-overlay` – fixed full-screen semi-transparent backdrop, `align-items: flex-end`
- `.cookie-modal` – white panel, `border-radius` top corners only, slides up from bottom
- `.cookie-type-row` – flex row with `.cookie-type-info` (label + desc) and `.cookie-toggle`
- `.cookie-toggle` – custom checkbox toggle; locked (necessary) variant: `.cookie-toggle--locked`
- `.cookie-toggle-track` – the track; `::after` pseudo-element is the thumb

Three cookie types: **Technické** (always on, disabled), **Analytické** (toggle), **Marketingové** (toggle).
Buttons: „Uložit nastavení" (saves individual selection) + „Přijmout vše" (accepts all).
Language is auto-detected from `location.pathname.includes('/en/')`.

## FAQ

`index.html` has 16 FAQ items total (6 original + 10 added):
- Original 6: blockchainový certifikát, ukládání na blockchain, právní důkaz, firmy, šifrování, cena
- Added 10: co je blockchain, jaký blockchain, jak chránit obsah, bezpečnost nahrávání, šifrovací klíč, obsah certifikátu, ukončení Waipalu, přístup k obsahu, soudní řízení, ochrana dat na blockchainu

JSON-LD `FAQPage` schema in `<head>` needs to be kept in sync when FAQ items change.

## Deploy

- **Git remote**: https://github.com/terezalucakova/waipal-web
- **Hosting**: Vercel (účet přihlášen přes Google)
- **Auto-deploy**: každý push na větev `main` automaticky nasadí novou verzi
- Žádný build krok – Vercel servíruje statické soubory přímo z kořene repozitáře

Workflow pro změny: upravit soubory → `git add` → `git commit` → `git push` → Vercel deployuje automaticky.

## Company / contact

- Legal entity: **FLEXI CREDIT s.r.o.**, Zelená 1387/14, 735 35 Horní Suchá
- Contact email: **info@waipal.com** (used in footer and register-box links)
