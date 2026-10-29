# AdvenSystem.lu — Modern Next.js Redevelopment

A high-performance, accessible, responsive, and production-ready redevelopment of [advensystem.lu](https://www.advensystem.lu) built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 1. Company Information & Leadership

- **Company Name**: AdvenSystem SARL
- **Years in Business**: 19 years of business (IT services business since 2007)
- **Founder & Chairman of the Board**: Irvin Dulberg
  - Direct Phone: +352 28 79 76 26
  - Direct WhatsApp: +352 661 11 22 60
  - Executive Office: 53 Boulevard Royal L-2449 Luxembourg
- **Head Office**: 49 Duarrefstrooss L-9964 Huldange Luxembourg
- **Business Center**: 34 Grand rue L-9710 Clervaux Luxembourg
- **License Number (Autorisation d’établissement)**: 10036042 / 0
- **Register of Commerce Luxembourg (RCS)**: B176203
- **General Telephone**: +352 661 11 22 60
- **General Email**: [contact@advensystem.lu](mailto:contact@advensystem.lu)
- **Official Website**: [www.advensystem.lu](https://www.advensystem.lu)
- **Socials**: [WhatsApp Direct Link](https://api.whatsapp.com/send?phone=352661112260) | [Facebook Page](https://www.facebook.com/AdvenSystem/)

---

## 2. Core Offerings & Page Structure

### A. Main Text & Line (Hero Section)
- **Badge**: 19 ANS D'ACTIVITÉ • SERVICES IT / 19 YEARS OF BUSINESS • IT SERVICES
- **Subtitle**: NOS EXPERTS RÉPONDENT À VOS BESOINS / OUR EXPERTS MEET YOUR NEEDS
- **Core Message**: *« Nous recrutons les meilleurs experts pour répondre aux besoins spécifiques de nos clients et pour servir la performance et l’innovation technologique. »*
- **Tagline**: « TALENT + EXPERTISE = INNOVATION »

### B. IT Expertise (Accessible Interactive Slider)
AdvenSystem covers all technological expertise in IT:
1. **Gestion de projet & Méthodologie Agile** (Project Management & Agile Methodology)
2. **Direction de projet avec expertise métier** (Project Direction with Business Expertise)
3. **Consulting & Transformation digitale** (Consulting & Digital Transformation)
4. **Stratégie et pilotage de recette** (Strategy & Test Management)
5. **Conduite du changement** (Change Management)
6. **Expertise technique : Digital marketing, CRM, Blockchain, IA, BI & Analytics** (Technical Expertise: Digital Marketing, CRM, Blockchain, AI, BI & Analytics)

### C. About the Company & Business
- **19 years of business** in IT consulting (activities began in 2007 with Groupe Renault in Paris, expanding to Europ Assistance, La Poste-Coliposte, La Mutuelle Générale, European Investment Bank, etc.).
- **Made in Luxembourg**: Local Luxembourg employees ensuring immediate proximity, responsiveness, and attentive client collaboration.

### D. Our Services — For Companies (Business Sectors)
Aimed at major accounts, SMEs, and public institutions:
1. Banque, Finance & Assurance (Banking, Finance & Insurance)
2. Juridique (Legal)
3. Industrie Automobile (Automotive Industry)
4. Transports & Logistique (Transport & Logistics)
5. Sécurité informatique (IT Security)
6. Application mobile (Mobile Apps)
7. Création de site internet (e-commerce) (Website Creation)
- **Dedicated Portage Salarial Callout**: *Service de portage salarial* (turnkey umbrella company solutions in Luxembourg).

### E. Why Choose Us? (Nos Projets)
- Modular and scalable engagement model delivering high performance and innovation with close customer relations.
- **Key Metrics**:
  - `19+` years in business
  - `200+` satisfied clients
  - `55+` completed projects across diverse industries
  - *Made in Luxembourg : Employés locaux*
  - *« TALENT + EXPERTISE = INNOVATION »*

### F. Our Clients & References
- **Target Sectors**: PME, Banques, Industrie, Compagnies d'assurance et Grands groupes
- **Reference Logos**: SNCF, Renault, APSIDE, La Mutuelle Générale, Europ Assistance, Valente Carrelages, Eurocontrol, La Poste, European Investment Bank, PARVA Consulting, Datapy, L’Oréal, Takeda.

### G. Wage Portage in Luxembourg (`/portage-salarial-luxembourg/` & `/en/portage-salarial-luxembourg-2/`)
Complete standalone portal covering autonomy, employee status, 100% legal compliance (CNS, CCSS, ITM), transparent social charges, and income simulation requests.

---

## 3. Route Mapping

| Original URL | Next.js App Router Route | Language | Status |
|---|---|---|---|
| `https://advensystem.lu/` | `app/(fr)/page.tsx` (`/`) | French | HTTP 200 Static |
| `https://advensystem.lu/en/` | `app/(en)/en/page.tsx` (`/en/`) | English | HTTP 200 Static |
| `https://advensystem.lu/portage-salarial-luxembourg/` | `app/(fr)/portage-salarial-luxembourg/page.tsx` | French | HTTP 200 Static |
| `https://advensystem.lu/en/portage-salarial-luxembourg-2/` | `app/(en)/en/portage-salarial-luxembourg-2/page.tsx` | English | HTTP 200 Static |
| `/api/contact/` | `app/api/contact/route.ts` | Shared | HTTP 200 Dynamic |
| `/sitemap.xml` | `app/sitemap.ts` | Shared | HTTP 200 Static |
| `/robots.txt` | `app/robots.ts` | Shared | HTTP 200 Static |
| `/opengraph-image` | `app/opengraph-image.tsx` | Shared | HTTP 200 Static |
| 404 Page | `app/not-found.tsx` | Bilingual | HTTP 200 Static |

---

## 4. Development & Production Commands

```bash
# Start development server
npm run dev

# TypeScript type checking
npm run typecheck

# ESLint code style checking
npm run lint

# Build optimized production bundle
npm run build

# Start production server
npm run start
```
