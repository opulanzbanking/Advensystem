# AdvenSystem.lu — Modern Next.js Redevelopment

A high-performance, modern, accessible, and responsive redevelopment of [advensystem.lu](https://advensystem.lu) built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 1. Project Overview & Audit

### Background
The original scraped site was an older WordPress installation. During the initial audit:
- The scraped root `index.html` contained injected casino spam text from a historical site breach. The true, authentic content of AdvenSystem (IT consulting, project management, AMOA, application deployment, and wage portage in Luxembourg) was recovered and preserved.
- The site comprises two core offerings available in both French and English:
  1. **Home / IT Consulting** (`/` and `/en/`)
  2. **Portage Salarial Luxembourg** (`/portage-salarial-luxembourg/` and `/en/portage-salarial-luxembourg-2/`)
- All original assets were collected, audited, and optimized in `public/images/`:
  - Logos (`/images/theme/logo.svg`, WhatsApp, Facebook, phone, mail icons)
  - Slider imagery (`slider-1` to `slider-6`)
  - Service icons (`icon-1` through `icon-7`)
  - Infographic diagram (`infogr2023_transp-768x509.png`)
  - Client logos (SNCF, Renault, APSIDE, La Mutuelle Générale, Europ Assistance, Valente Carrelages, Eurocontrol, La Poste, European Investment Bank, PARVA Consulting, Datapy, L'Oréal, Takeda)
  - Theme vector patterns (`BG.svg`, `BG5.svg`, `BG_footer.svg`)

---

## 2. Route & Page Mapping

| Original URL | Next.js App Router Route | Language | Description |
|---|---|---|---|
| `https://advensystem.lu/` | `app/(fr)/page.tsx` (`/`) | French | Homepage (Hero, Slider, À propos, Services, Pourquoi nous, Clients, Contact) |
| `https://advensystem.lu/en/` | `app/(en)/en/page.tsx` (`/en/`) | English | English Homepage |
| `https://advensystem.lu/portage-salarial-luxembourg/` | `app/(fr)/portage-salarial-luxembourg/page.tsx` | French | Wage Portage in Luxembourg |
| `https://advensystem.lu/en/portage-salarial-luxembourg-2/` | `app/(en)/en/portage-salarial-luxembourg-2/page.tsx` | English | English Wage Portage Page |
| `/api/contact/` | `app/api/contact/route.ts` | Shared | Secure contact API endpoint |
| `/sitemap.xml` | `app/sitemap.ts` | Shared | Dynamic sitemap with alternate language links |
| `/robots.txt` | `app/robots.ts` | Shared | Robots configuration |
| `/opengraph-image` | `app/opengraph-image.tsx` | Shared | Dynamic OG social preview image |
| 404 Page | `app/not-found.tsx` | Bilingual | Custom 404 with FR/EN navigation |

---

## 3. Tech Stack & Architecture

- **Framework**: Next.js 15.5+ (App Router)
- **Language**: TypeScript (strict type checking enabled)
- **Styling**: Tailwind CSS 3.4+
- **Typography**: Google Barlow font (`--font-barlow`) matching the original design
- **State & Interactions**:
  - React 19 Client Components scoped only where client interactivity is required
  - Accessible dialog modal with keyboard traps (`Escape` dismiss, focus management)
  - ARIA-compliant tablist slider with keyboard arrow navigation (`ArrowRight` / `ArrowLeft`)
  - Viewport intersection observer for animated statistic counters
  - Responsive mobile drawer menu
- **Email & Forms**:
  - Nodemailer SMTP handler
  - Server-side field validation & sanitization (regex for phone & email, payload truncation)
  - Bot protection via honeypot field (`website`)
  - In-memory IP rate limiting
  - Honest error handling (`503 not_configured` message if SMTP credentials are unset, never showing false success)

---

## 4. Project Structure

```text
├── app/
│   ├── (en)/
│   │   ├── en/
│   │   │   ├── page.tsx                             # /en/
│   │   │   └── portage-salarial-luxembourg-2/
│   │   │       └── page.tsx                         # /en/portage-salarial-luxembourg-2/
│   │   └── layout.tsx                               # English layout wrapper
│   ├── (fr)/
│   │   ├── portage-salarial-luxembourg/
│   │   │   └── page.tsx                             # /portage-salarial-luxembourg/
│   │   ├── layout.tsx                               # French layout wrapper
│   │   └── page.tsx                                 # / (French root)
│   ├── api/
│   │   └── contact/
│   │       └── route.ts                             # POST /api/contact handler
│   ├── globals.css                                  # Global CSS, brand utility classes, custom patterns
│   ├── layout.tsx                                   # Root HTML layout, font setup & ContactProvider
│   ├── not-found.tsx                                # Custom 404 page
│   ├── opengraph-image.tsx                          # Dynamic OG image generator
│   ├── robots.ts                                    # robots.txt generator
│   └── sitemap.ts                                   # sitemap.xml generator
├── components/
│   ├── contact/
│   │   ├── ContactButton.tsx                        # Trigger button that opens ContactModal with tracking
│   │   ├── ContactModal.tsx                         # Accessible contact popup with validation
│   │   └── ContactProvider.tsx                      # Context provider for contact modal state
│   ├── home/
│   │   ├── AboutSection.tsx                         # Two-column company overview
│   │   ├── AnimatedCounter.tsx                      # Scroll-triggered numeric animation
│   │   ├── ClientsSection.tsx                       # Responsive grid of client logos
│   │   ├── HomeHero.tsx                             # Main brand hero banner
│   │   ├── HomePage.tsx                             # Composed home page component
│   │   ├── HomeSlider.tsx                           # Accessible presentation slider
│   │   ├── ServicesSection.tsx                      # Zigzag service cards with gradient circles
│   │   └── WhyUsSection.tsx                         # Stats cards over branded BG5 pattern
│   ├── layout/
│   │   ├── Footer.tsx                               # Footer with company legal info, phone, emails
│   │   └── Header.tsx                               # Sticky navigation, language switcher, mobile menu
│   ├── portage/
│   │   ├── PortageApproach.tsx                      # Step-by-step onboarding process
│   │   ├── PortageCta.tsx                           # Simulation CTA and contact box
│   │   ├── PortageHero.tsx                          # Hero with badges and CTAs
│   │   ├── PortagePage.tsx                          # Composed Portage page
│   │   ├── PortageUnderstanding.tsx                 # Luxembourg wage portage explanation
│   │   └── PortageWhy.tsx                           # Value proposition cards with icons & badges
│   ├── seo/
│   │   └── OrganizationJsonLd.tsx                   # Structured data Schema.org
│   └── ui/
│       ├── Container.tsx                            # Responsive layout container (max 1620px)
│       └── SectionTitle.tsx                         # Standard section headline
├── lib/
│   ├── content/
│   │   ├── home.ts                                  # Complete FR & EN home page copy & assets
│   │   └── portage.ts                               # Complete FR & EN portage page copy & steps
│   ├── site.ts                                      # Site configuration, company metadata, route definitions
│   ├── styles.ts                                    # Centralized button and CTA styles
│   └── utils.ts                                     # Utility functions (cn / clsx helper)
├── public/
│   └── images/                                      # Scraped and verified theme & uploaded assets
├── types/
│   └── index.ts                                     # Shared TypeScript interfaces
├── .env.example                                     # Template for SMTP environment variables
├── next.config.ts                                   # Next.js configuration (trailing slash, image optimization)
├── tailwind.config.ts                               # Brand color palettes, shadows, keyframe animations
├── tsconfig.json                                    # Strict TypeScript configuration
└── package.json                                     # NPM dependencies and scripts
```

---

## 5. Environment Variables

To enable email delivery via the contact form, copy `.env.example` to `.env.local` and supply your SMTP provider credentials:

```bash
cp .env.example .env.local
```

```ini
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=user@example.com
SMTP_PASS=your-password
SMTP_FROM="AdvenSystem Website" <noreply@advensystem.lu>
CONTACT_TO=contact@advensystem.lu
```

> **Note**: If SMTP variables are not set, the form will cleanly communicate to the user that email delivery is currently unconfigured in this environment (HTTP 503) and provide direct telephone and email contact alternatives.

---

## 6. Development & Build Commands

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Typecheck TypeScript
```bash
npm run typecheck
```

### Run ESLint
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

