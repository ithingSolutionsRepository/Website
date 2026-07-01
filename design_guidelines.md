# Design Guidelines: Ab'ad Smart Business Solutions

## Design Approach

**Reference-Based Approach** drawing from modern tech leaders: Linear (clean typography, minimal animations), Vercel (sophisticated layouts), and Stripe (trust-building elements). This creates a professional, innovative presence suitable for enterprise clients seeking digital transformation partners.

**Bilingual Considerations**: Implement full RTL support for Arabic with mirrored layouts. Use language toggle in header. Maintain identical layouts in both languages with appropriate font selections for each.

## Core Design Elements

### Typography

**English:**
- Headings: Inter (weights: 600, 700, 800)
- Body: Inter (weights: 400, 500)
- Sizes: Hero (text-5xl to text-7xl), H2 (text-4xl), H3 (text-2xl), Body (text-lg), Small (text-base)

**Arabic:**
- Headings: Tajawal or Cairo (weights: 600, 700, 800)
- Body: Tajawal or Cairo (weights: 400, 500)
- Larger baseline sizes for Arabic (+10-15% vs English equivalent)

### Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
**Container Strategy:** max-w-7xl for full sections, max-w-4xl for text-heavy content
**Section Padding:** py-20 desktop, py-12 mobile
**Grid System:** 12-column base, commonly using 2-column (md:), 3-column (lg:), 4-column (xl:) for cards/features

## Component Library

### Navigation
- Sticky header with glass-morphism effect (backdrop-blur)
- Logo left (English) / right (Arabic), language toggle, primary CTA button
- Desktop: horizontal navigation, Mobile: hamburger menu
- Subtle underline animation on hover for nav links

### Hero Section
- Full viewport height (min-h-screen) with large hero image showing modern office/technology
- Overlaid with gradient (dark to transparent)
- Centered content: Large headline, supporting paragraph (max-w-3xl), dual CTA buttons (primary + secondary outline)
- Blurred background buttons for CTAs over image
- Scroll indicator at bottom

### Service Cards
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Each card: Icon (60x60), title, description, subtle hover lift (translate-y)
- Border styling with hover glow effect
- Icons from Heroicons (outline style)

### Statistics Section
- 4-column grid showcasing key metrics
- Large numbers (text-5xl, bold), smaller labels below
- Subtle animations on scroll-into-view

### Trust Elements
- Client logos grid (grayscale, hover to color)
- Testimonial cards with avatar, quote, name, role, company
- 2-column layout for testimonials

### Technology Stack Display
- Badge-style pills showing technologies (AI, Cloud, Analytics, etc.)
- Grouped by category with section headers

### Contact Section
- 2-column split: Form (60%) + Info sidebar (40%)
- Form: Name, Email, Phone, Service Interest (dropdown), Message
- Sidebar: Office locations (Amman, Dubai), contact details, map placeholder
- Form inputs with focus states and validation styling

### Footer
- 4-column layout: Company info, Services, Quick links, Contact
- Newsletter signup row above footer columns
- Social media icons (LinkedIn, Twitter)
- Copyright and legal links at bottom

## Images

**Hero Image:** 
Modern technology workspace or abstract digital transformation visualization. Should convey innovation and professionalism. Full-bleed, high-quality, with gradient overlay for text readability.

**Service Section Backgrounds:**
Abstract tech patterns or geometric shapes as subtle section backgrounds (low opacity, 5-10%)

**Team/Office Photos:**
Professional photos of Amman and Dubai offices for contact/about sections

**Case Study/Portfolio:**
Screenshot mockups or before/after transformations for services showcase

**Icons:**
Heroicons for all UI elements, technology-specific icons for service cards

## Animations

Minimal, purposeful animations only:
- Subtle fade-up on scroll for section reveals
- Hover lift for cards (4px translate)
- Smooth transitions on language toggle
- Progress indicators for multi-step forms

**NO:** Parallax effects, complex scroll-driven animations, hero video backgrounds, or excessive motion

## Bilingual Layout Notes

- Maintain identical component structure in both languages
- Test all padding/spacing with Arabic text (typically requires more vertical space)
- Ensure forms have proper RTL label alignment
- Icons that suggest directionality should flip in RTL (arrows, chevrons)
- Numbers remain LTR even in Arabic context

## Key Pages Structure

1. **Homepage:** Hero, Services Grid (6 cards), Stats, Why Choose Us, Client Logos, Testimonials, CTA Section, Footer
2. **Services:** Individual service pages with detailed breakdown, case studies, technology stack
3. **About:** Company story, team (if applicable), office locations with photos
4. **Contact:** Form + location details, interactive approach

**Quality Standard:** Enterprise-grade, polished design that instills confidence. Every section should feel complete and purposeful. The design should work flawlessly in both languages with no compromises.