# Captavola - Cap Table Management Platform

## Overview

Captavola is a web-based cap table and equity management platform designed for pre-IPO businesses. The application provides lightweight tools for tracking ownership, managing investor communications, and maintaining equity transaction records. The platform emphasizes transparency, simplicity, and professional design inspired by Linear, Stripe, and Carta.

The application is built as a full-stack web application with a React frontend and Express backend, designed to grow from a waitlist/marketing site into a complete equity management platform.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**UI Component Library**: shadcn/ui components built on Radix UI primitives, providing accessible, customizable components following the "new-york" style preset.

**Styling**: Tailwind CSS with a custom design system implementing the Captavola brand guidelines:
- Primary colors: Brand Navy (220 65% 20%) and Deep Teal (185 45% 35%)
- Typography: Inter for body text and Space Grotesk for display headlines
- Spacing system using consistent Tailwind units (4, 8, 12, 16, 20, 24)
- Dark mode support via CSS variables

**Routing**: wouter for client-side routing, providing a lightweight alternative to React Router.

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. The query client is configured to:
- Not refetch on window focus or intervals
- Use infinite stale time by default
- Provide custom error handling for 401 responses

**Form Handling**: React Hook Form with Zod for schema validation via @hookform/resolvers.

**Design Philosophy**: Reference-based design drawing from Linear (typography & simplicity), Stripe (trust & professionalism), and Carta (fintech credibility). The design emphasizes trust, transparency, and modern aesthetics.

### Backend Architecture

**Framework**: Express.js running on Node.js with TypeScript.

**Server Structure**: 
- Entry point in `server/index.ts` with middleware for JSON parsing, URL encoding, and request logging
- Route registration separated into `server/routes.ts`
- Request/response logging middleware that captures API calls, responses, and duration
- Development-focused Vite integration for HMR and SSR during development

**API Design**: RESTful API with routes prefixed with `/api`:
- `POST /api/waitlist` - Create waitlist submission
- `GET /api/waitlist` - Retrieve all waitlist submissions

**Data Validation**: Input validation using Zod schemas defined in shared schema files, ensuring type safety across frontend and backend.

### Data Storage

**ORM**: Drizzle ORM configured for PostgreSQL via `@neondatabase/serverless` driver.

**Schema Design**: Currently implements:
- `users` table with username/password authentication fields
- `waitlist_submissions` table for pre-launch marketing with name, email, company, and message fields

**Schema Location**: Centralized in `shared/schema.ts` using Drizzle's schema definition with Zod integration for runtime validation.

**Migration Strategy**: Drizzle Kit for database migrations with output to `./migrations` directory.

**Development Storage**: In-memory storage implementation (`MemStorage` class) for development/testing, implementing the `IStorage` interface. This allows development without requiring database connectivity.

**Design Decision**: The application uses a storage abstraction layer (`IStorage` interface) that allows switching between in-memory storage (development) and database-backed storage (production) without changing business logic.

### Authentication & Authorization

**Current State**: Basic user schema exists with username/password fields, but authentication is not yet implemented.

**Session Management**: Dependencies include `connect-pg-simple` for PostgreSQL-backed session storage, indicating planned session-based authentication.

**Future Considerations**: The application is structured to support session-based authentication with PostgreSQL session store.

### External Dependencies

**UI Component Library**: 
- Radix UI primitives (@radix-ui/*) for accessible, unstyled components
- shadcn/ui configuration for styled component variants
- Lucide React for icons
- react-icons for social media icons (LinkedIn, X/Twitter)

**Data Visualization**: 
- Recharts for charts and analytics (referenced in chart.tsx component)
- embla-carousel-react for carousels

**Date Handling**: date-fns for date manipulation and formatting.

**Database**: 
- Neon Database (@neondatabase/serverless) as the PostgreSQL provider
- Drizzle ORM for type-safe database queries
- Expected to use Postgres but currently working with in-memory storage

**Development Tools**:
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- esbuild for server-side bundling in production
- tsx for TypeScript execution in development

**Type Safety**: 
- TypeScript throughout with strict mode enabled
- Path aliases for clean imports (@/, @shared/, @assets/)
- Zod for runtime type validation

**Design Assets**: The application references generated images stored in `attached_assets/generated_images/` for hero sections, feature demonstrations, and marketing materials.

### Build & Deployment Strategy

**Development**: 
- Vite dev server with HMR for client-side code
- tsx for running TypeScript server code directly
- Middleware mode for Vite integration with Express

**Production Build**:
- Vite builds client assets to `dist/public`
- esbuild bundles server code to `dist/` as ESM modules
- Static file serving from built assets
- Server runs on Node.js with bundled dependencies

**Environment Variables**: 
- `DATABASE_URL` required for database connectivity
- `NODE_ENV` for environment detection
- `REPL_ID` for Replit-specific integrations