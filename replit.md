# Overview

This is a modern full-stack web application built with React/TypeScript frontend and Express.js backend. The project appears to be a personal portfolio website showcasing developer experience, skills, projects, and contact information. It features a sleek, animated interface with smooth scrolling navigation and responsive design.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting dark mode out of the box
- **UI Components**: Comprehensive component library using Radix UI primitives with shadcn/ui styling patterns
- **Routing**: Wouter for lightweight client-side routing instead of React Router
- **State Management**: TanStack React Query for server state management and data fetching
- **Animations**: Framer Motion for smooth page transitions and scroll-based animations
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database Layer**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Session Management**: Express sessions with PostgreSQL session store for production

## Database Design
- **Schema Definition**: Centralized in `shared/schema.ts` using Drizzle ORM
- **User Management**: Basic user entity with username/password authentication
- **Validation**: Zod schemas for runtime type validation and form handling
- **Migrations**: Drizzle Kit for database schema migrations and version control

## Development Workflow
- **Monorepo Structure**: Shared types and schemas between frontend and backend
- **Hot Reload**: Vite HMR for frontend, tsx for backend development server
- **Type Safety**: End-to-end TypeScript with shared interfaces
- **Path Aliases**: Configured for clean imports across client, server, and shared code

## Deployment Architecture
- **Production Build**: Vite builds optimized frontend bundle, esbuild bundles backend
- **Static Assets**: Frontend builds to `dist/public` for serving via Express
- **Environment**: Production mode serves static files, development uses Vite middleware

# External Dependencies

## Database Services
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL (@neondatabase/serverless)
- **Connection**: Environment variable `DATABASE_URL` for database connectivity

## UI and Styling
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Framer Motion**: Animation library for smooth interactions and transitions

## Development Tools
- **Replit Integration**: Specialized plugins for Replit development environment
- **TypeScript**: Static type checking and modern JavaScript features
- **ESBuild**: Fast JavaScript bundler for production backend builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

## Form Handling
- **React Hook Form**: Performance-focused form library with minimal re-renders
- **Hookform Resolvers**: Integration layer for validation libraries
- **Zod**: Runtime type validation for forms and API contracts

## Utility Libraries
- **clsx & tailwind-merge**: Conditional class name utilities
- **date-fns**: Modern date manipulation library
- **nanoid**: URL-safe unique ID generation