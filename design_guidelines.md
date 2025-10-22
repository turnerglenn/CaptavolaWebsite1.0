# Captavola Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from Linear (typography & simplicity), Stripe (trust & professionalism), and Carta (fintech credibility). The design should convey trust, transparency, and modern efficiency—critical for financial management software.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Brand Navy: 220 65% 20% (primary brand color, conveys trust and professionalism)
- Deep Teal: 185 45% 35% (secondary, representing the "table" metaphor)

**Supporting Colors:**
- Success Green: 145 55% 45% (positive metrics, growth indicators)
- Warm Gray: 30 5% 95% (light mode backgrounds)
- Cool Gray: 220 15% 12% (dark mode backgrounds)

**Accent (use sparingly):**
- Bright Teal: 185 75% 55% (CTAs, key highlights)

### Typography
**Fonts (via Google Fonts):**
- Primary: Inter (weights: 400, 500, 600, 700)
- Display: Space Grotesk (weight: 700) for hero headlines

**Hierarchy:**
- Hero: 4xl-6xl (Space Grotesk, bold)
- Section Headers: 3xl-4xl (Inter, semibold)
- Subheadings: xl-2xl (Inter, medium)
- Body: base-lg (Inter, regular)
- Captions/Legal: sm-xs (Inter, regular)

### Layout System
**Spacing Units**: Consistently use Tailwind units of 4, 8, 12, 16, 20, and 24 for predictable rhythm.
- Section padding: py-20 (desktop), py-12 (mobile)
- Component gaps: gap-8 to gap-16
- Card padding: p-8 to p-12
- Max container width: max-w-7xl with px-6

### Component Library

**Navigation:**
- Sticky header with blur backdrop
- Logo left, navigation center, CTA right
- Include trust indicator: "SOC 2 Compliant" or "Trusted by 500+ companies"

**Hero Section:**
- Large background image showing professional business setting or abstract data visualization
- 80vh height with centered content overlay
- Bold headline with Space Grotesk
- Two-CTA pattern: Primary "Start Free Trial" + Secondary "Schedule Demo"
- Trust indicators below CTAs (company logos or key metrics)

**Feature Sections:**
- Alternating layout: image-left/text-right, then reverse
- 2-column desktop, stack mobile
- Include screenshot mockups of actual product UI
- Icon + headline + description + "Learn more" link pattern

**Pricing Cards:**
- 3-tier layout (2 columns on tablet, stack on mobile)
- Highlight middle tier with subtle border glow
- Clear feature comparison lists
- Annual/Monthly toggle above cards
- Include "Most Popular" badge on recommended tier

**Social Proof:**
- Logo grid: 6-8 company logos in 3-4 columns
- Testimonial cards: 3 columns with headshot + quote + name/title/company
- Stat highlights: 3-4 columns with large numbers + labels

**Footer:**
- 4-column layout: Product links, Resources, Company, Legal
- Newsletter signup with single-line input + button
- Social icons (LinkedIn, Twitter)
- Trust badges: SOC 2, GDPR compliant, encryption indicators

### Imagery
**Hero Section:** Large, professional photograph showing diverse business professionals in a modern office setting or boardroom, subtly blurred with dark overlay (opacity-60) to ensure text readability.

**Feature Sections:** Include 3-4 high-fidelity product screenshots showing:
1. Cap table dashboard with ownership percentages
2. Investor communication interface
3. Transaction tracking view
4. Analytics/reporting dashboard

**About/Team (if included):** Professional headshots on consistent background

**Style:** Clean, modern, professional photography. Avoid overly stock-looking images. Prefer authentic business settings.

### Animations
Minimal and purposeful only:
- Subtle fade-in on scroll for sections (use Intersection Observer)
- Smooth hover states on cards (slight scale or shadow increase)
- No elaborate scroll-triggered animations or parallax effects

## Page Structure

**Homepage Sections (in order):**
1. Hero with image background
2. Trust bar (client logos)
3. Problem statement (1-2 paragraphs with supporting visual)
4. Core features (3 features, alternating image/text layout)
5. Product showcase (centered screenshot or video)
6. Benefits summary (3-column cards with icons)
7. Testimonials (3 quotes)
8. Pricing teaser (brief overview, link to pricing page)
9. Final CTA section
10. Footer

**Pricing Page:**
- Brief intro section
- Annual/Monthly toggle
- 3 pricing tiers with feature comparison
- FAQ section (common questions about billing, features)
- CTA to start trial or contact sales

**SEO Requirements:**
- Semantic HTML (proper heading hierarchy)
- Meta descriptions for all pages
- Structured data for organization and product
- Fast loading (optimized images, minimal JS)

## Accessibility
- Dark mode support throughout
- Minimum contrast ratio 4.5:1 for all text
- Focus indicators on all interactive elements
- Aria labels for icon-only buttons