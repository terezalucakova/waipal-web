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
| `script.js` | Shared JS: mobile hamburger menu, FAQ accordion, sticky nav shadow, language dropdown |
| `hero-shader.js` | WebGL/Three.js animated grid shader for index.html hero background |
| `hero-image.png` | Hero background image layered on top of shader (right side, index.html) |
| `ip-hero.png` | Hero background image for ip-ochrana.html (dark blue, copyright/creative icons) |
| `sifrovani-hero.png` | Hero background image for sifrovani.html (dark blue, document + padlock) |
| `service-ip.png` | IP protection illustration (available as asset) |
| `service-ip-bg.png` | Lighter IP protection illustration (available as watermark asset) |
| `favicon.png` | Favicon used by all pages (`<link rel="icon" type="image/png">`) |
| `favicon.ico` | Fallback favicon (empty file, `favicon.png` takes precedence) |
| `kontext-waipal.md` | Full project brief in Czech – source of truth for copy, tone, structure |

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
- `.subhero-bg-img` – `position: absolute; right: -60px; width: 58%; height: 100%; object-fit: cover; object-position: left center`
- `.subhero-overlay` – full-width gradient (same logic)
- `.subhero-inner` – `position: relative; z-index: 2; max-width: 1180px; margin: 0 auto`
- `.hero-badge` – pill badge (e.g. "📜 Ochrana duševního vlastnictví") above the h1; no back-link above it
- **Subhero background images are NOT hidden on mobile** – only main hero hides them at 900 px

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
- Section padding: `3rem 0`; container max-width: `1180px`
- To reduce spacing between two specific sections, add `style="padding-top: 1rem;"` inline on the second section
- FAQ accordion: clicking `.faq-question` toggles `.open` on parent `.faq-item`; only one item open at a time

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

- **≤900 px**: nav links/CTA hidden → hamburger shown; services grid, cert grid → single column; footer grid → 2 columns; `.hero-bg-img` and `.hero-overlay` hidden
- **≤600 px**: hero/subhero CTAs stack vertically; CTA banner buttons stack; footer → single column; `.why-grid` → single column; `.audiences-grid` → 2 columns (not 1)

## SVG icon style (všechny stránky)

Všechny sekce `.why-grid` a `.audiences-grid` na všech třech stránkách používají inline SVG ikonky místo emoji. Žádné emoji ikonky nezůstaly.

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

Při přidávání nových ikonek zachovat: `stroke-width="1.8"`, `fill="none"`, `stroke="currentColor"`, `stroke-linecap="round"`, `stroke-linejoin="round"`.

## Deploy

- **Git remote**: https://github.com/terezalucakova/waipal-web
- **Hosting**: Vercel (účet přihlášen přes Google)
- **Auto-deploy**: každý push na větev `main` automaticky nasadí novou verzi
- Žádný build krok – Vercel servíruje statické soubory přímo z kořene repozitáře

Workflow pro změny: upravit soubory → `git add` → `git commit` → `git push` → Vercel deployuje automaticky.

## Company / contact

- Legal entity: **FLEXI CREDIT s.r.o.**, Zelená 1387/14, 735 35 Horní Suchá
- Contact email: **info@waipal.com** (used in footer and register-box links)
