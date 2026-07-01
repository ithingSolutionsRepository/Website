# iThing Smart Business Solutions - Bilingual Website

## Overview
A professional bilingual (Arabic/English) corporate website for iThing Smart Business Solutions (Abaad), a Jordanian Limited Liability Company (LLC) established in 2016, headquartered in Amman, Jordan with offices in Dubai, UAE.

## Company Information
- **Legal Name**: iThing Smart Business Solutions (Abaad) LLC
- **Type**: Jordanian Limited Liability Company
- **Founded**: 2016
- **Headquarters**: Amman, Hashemite Kingdom of Jordan
- **Offices**: Amman (primary), Dubai

## Core Specializations
1. Digital transformation consulting
2. Telecommunications and information technology advisory services
3. Smart and digital solutions design, development, and implementation

## Core Offerings
- Design and development of integrated digital platforms
- Enterprise and smart business solutions
- Technology integration and convergence services
- Digital transformation consulting
- Systems and application integration
- Cloud and infrastructure integration
- Startup and enterprise enablement through scalable technology ecosystems

## Current State
- **Complete**: Fully functional bilingual website with RTL support
- **Language Support**: English and Arabic with full RTL layout switching
- **Theme**: Dark/light mode toggle with dynamic evening mode (6 PM-6 AM Amman time)
- **Responsive**: Mobile-first responsive design
- **SEO**: Comprehensive optimization with JSON-LD structured data, sitemap, robots.txt

## Project Architecture

### Frontend (client/)
- **Framework**: React with TypeScript
- **Routing**: wouter
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context for language/theme, TanStack Query for server state
- **Fonts**: Fira Sans (English), Cairo/Tajawal (Arabic)
- **Design**: Red accent (#FF0000) with dark charcoal/black scheme

### Backend (server/)
- **Framework**: Express.js
- **Storage**: In-memory storage (MemStorage)
- **API**: Contact form submission endpoint

### Key Components
- `client/src/lib/language-context.tsx` - Language switching and RTL support
- `client/src/lib/theme-context.tsx` - Dark/light mode theming
- `client/src/components/header.tsx` - Navigation with language/theme toggles
- `client/src/components/hero.tsx` - Hero section with company branding
- `client/src/components/services.tsx` - 6 service cards (company offerings)
- `client/src/components/stats.tsx` - Statistics section
- `client/src/components/why-choose-us.tsx` - Value propositions
- `client/src/components/contact.tsx` - Contact form with office locations
- `client/src/components/footer.tsx` - Footer with links

### SEO Files
- `client/index.html` - Meta tags, Open Graph, Twitter Cards, JSON-LD
- `public/sitemap.xml` - XML sitemap
- `public/robots.txt` - Search engine directives

### API Endpoints
- `POST /api/contact` - Submit contact form (validates with Zod)

## Contact Information
- **Amman Office**: +962 777775484
- **Dubai Office**: +971 501970754
- **Email**: info@ithingsolutions.com

## User Preferences
- Bilingual support (Arabic primary market)
- Professional, enterprise-grade design
- Performance-optimized (reduced animations, prefers-reduced-motion support)
- Company name: iThing (Abaad)

## Recent Changes
- January 2026: Updated company content to reflect accurate 2016 founding date and specializations
- January 2026: Changed English font to Fira Sans
- January 2026: Performance optimizations (simplified animations and background)
- January 2026: Comprehensive SEO implementation
- January 2026: Updated branding to iThing with logo
- January 2026: Initial website implementation with full bilingual support
