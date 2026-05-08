# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static marketing website for **Waipal** – a Czech-language service offering two products:
1. **Ochrana duševního vlastnictví** – blockchain certificate proving document existence/ownership
2. **Šifrování dokumentů** – encrypted document storage

The site links out to the live app at `https://waipal.com` for login and registration. No build step, no framework, no dependencies – open `index.html` directly in a browser.

## File structure

| File | Purpose |
|---|---|
| `index.html` | Main landing page with hero, both services, why/audiences/benefits/FAQ sections |
| `ip-ochrana.html` | Subpage – IP protection detail + registration CTA |
| `sifrovani.html` | Subpage – document encryption detail + registration CTA |
| `style.css` | Shared styles for all three pages |
| `script.js` | Shared JS: mobile hamburger menu, FAQ accordion, sticky nav shadow |
| `hero-image.png` | Main hero background image (right side, index.html) |
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

**Main hero** (`index.html`) – class `.hero`, min-height 585px, flex center:
- `.hero-bg-img` – `position: absolute; right: 0; width: 65%; height: 100%; object-fit: cover`
- `.hero-overlay` – full-width gradient `#0F1A3C solid → transparent`
- `.hero-inner` – `max-width: 1180px; padding: 5rem 1.5rem 4.5rem; z-index: 2`
- On screens ≤900 px: `.hero-bg-img` and `.hero-overlay` are hidden (`display: none`)

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

## Navigation patterns

- `index.html` nav links are anchor-only: `href="#sluzby"`, `href="#proc"`, etc.
- Subpage nav links prefix with filename: `href="index.html#sluzby"`, `href="index.html#proc"`, etc.

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

## SVG icon style (sifrovani.html)

The why-grid and audiences-grid sections on `sifrovani.html` use inline SVG icons instead of emojis. Pattern for each icon container:

```html
<div class="why-item-icon" style="background:var(--blue-light);border-radius:10px;width:52px;height:52px;display:flex;align-items:center;justify-content:center;color:var(--blue);flex-shrink:0;">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">…</svg>
</div>
```

Audience cards use the same approach with `width/height:60px` and `margin:0 auto .75rem` to keep the centered card layout.

When adding new icons to these sections, maintain: `stroke-width="1.8"`, `fill="none"`, `stroke="currentColor"`, `stroke-linecap="round"`, `stroke-linejoin="round"`.

## Company / contact

- Legal entity: **FLEXI CREDIT s.r.o.**, Zelená 1387/14, 735 35 Horní Suchá
- Contact email: **info@waipal.com** (used in footer and register-box links)
