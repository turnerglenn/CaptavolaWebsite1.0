# Captavola - Cap Table Management SaaS

## Overview
Captavola is a lightweight investor and cap table management platform designed for small and medium-sized pre-IPO businesses. The name comes from the Italian word "tavola" (table), emphasizing the concept of giving every stakeholder "a seat at the table."

## Current State
- **Status**: Pre-release marketing website (fully functional)
- **Last Updated**: October 22, 2025
- **Type**: Full-stack marketing/landing page with waitlist functionality

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Routing**: Wouter
- **UI Components**: Shadcn UI with Radix UI primitives
- **Styling**: Tailwind CSS
- **State Management**: TanStack React Query v5
- **Backend**: Express.js
- **Data Storage**: In-memory storage (MemStorage)
- **Validation**: Zod schemas
- **Build Tool**: Vite

### Design System
- **Typography**: Inter (body), Space Grotesk (display headings)
- **Primary Colors**: Navy blue (220 65% 20%), Teal accents (185 45% 35%)
- **Theme**: Dark mode support enabled
- **Visual Style**: Professional, modern, trust-building aesthetic appropriate for financial software

## Features Implemented

### Marketing Pages
1. **Homepage** (`/`)
   - Hero section with professional boardroom image
   - Trust bar showing company logos
   - Three main feature showcases with screenshots
   - Stats section highlighting key metrics
   - Testimonials from fictional customers
   - Waitlist/demo request form
   
2. **Features Page** (`/features`)
   - Detailed feature descriptions
   - Product screenshots (blurred for privacy)
   - Benefit cards highlighting key capabilities
   
3. **Pricing Page** (`/pricing`)
   - Three-tier pricing structure:
     - **Starter**: Free (up to 3 stakeholders)
     - **Professional**: $14.99/month or $11.99/month annual
     - **Enterprise**: $59.99/month or $49.99/month annual
   - Monthly/Annual billing toggle
   - FAQ section
   
4. **About Page** (`/about`)
   - Company story and mission
   - Core values presentation
   - Brand philosophy explanation

### Backend Functionality
- **Waitlist API**: 
  - `POST /api/waitlist` - Submit demo requests
  - `GET /api/waitlist` - Retrieve all submissions (for internal use)
- **Data Validation**: Zod schemas with email validation, required fields, trimming
- **Storage**: In-memory storage for development (ready to migrate to database)

## Data Models

### Waitlist Submissions
```typescript
{
  id: string (UUID)
  name: string (required, trimmed, min 1 char)
  email: string (required, valid email)
  company: string | null (optional)
  message: string | null (optional)
  createdAt: Date
}
```

## User Preferences & Requirements

### Pricing Structure (Final)
- Starter tier must be free
- Professional: $14.99/month, $11.99/month annual (20% discount)
- Enterprise: $59.99/month, $49.99/month annual

### Design Preferences
- No SOC 2 compliance badges or bank-grade security claims
- Product screenshots should be blurred/out of focus where appropriate
- Transaction tracking screenshot should have binary overlay (1s and 0s)
- Professional, trustworthy aesthetic suitable for financial software

### Future Integration
- Lemon Squeezy payment processing (planned, not yet integrated)

## Project Structure

```
client/
  src/
    components/        # Reusable React components
      ui/             # Shadcn UI components
      examples/       # Component examples (for development)
    pages/            # Route pages (Home, Features, Pricing, About)
    lib/              # Query client and utilities
server/
  routes.ts          # Express API routes
  storage.ts         # Data storage interface
  index.ts           # Express server setup
  vite.ts            # Vite dev server integration
shared/
  schema.ts          # Shared Zod schemas and types
```

## Development Workflow

### Running the Application
- Command: `npm run dev`
- Workflow: "Start application" (auto-configured)
- Port: 5000 (serves both frontend and backend)
- Hot reload enabled for development

### Key Components
- **Header**: Responsive navigation with mobile menu
- **Hero**: Full-screen hero with background image and CTAs
- **Pricing**: Interactive pricing cards with billing toggle
- **WaitlistForm**: Form with React Query mutation, loading states, toast notifications
- **Footer**: Newsletter signup, social links, sitemap

## SEO Implementation
- Meta tags for all pages
- Open Graph tags for social sharing
- Descriptive page titles
- Semantic HTML structure

## Testing
- End-to-end tests passing (Playwright-based)
- All navigation flows verified
- Form submission and API integration tested
- Pricing toggle functionality confirmed

## Recent Changes (October 22, 2025)
1. Created complete marketing website with 4 pages
2. Implemented waitlist/demo request functionality with backend API
3. Added stricter form validation (email validation, required fields)
4. Generated custom product screenshots and hero image
5. Configured three-tier pricing structure per user requirements
6. Removed security compliance references per user request
7. Successfully tested all features end-to-end

## Next Steps / Future Enhancements
1. Integrate Lemon Squeezy for payment processing
2. Add blog section for SEO content
3. Implement email marketing integration for lead nurturing
4. Add interactive product demos or video walkthroughs
5. Migrate from in-memory storage to persistent database (PostgreSQL)
6. Add live chat support widget
7. Create comprehensive FAQ section
8. Implement analytics tracking

## Notes
- All images are AI-generated and stored in `attached_assets/generated_images/`
- Currently using in-memory storage (data resets on server restart)
- Ready for Lemon Squeezy integration when user is ready to launch
- Design follows Shadcn UI patterns and custom elevation system for interactions
