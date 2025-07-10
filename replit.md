# Everlasting Victory Acres - Replit Project Documentation

## Overview

Everlasting Victory Acres is a browser-based RPG game inspired by horse and dog breeding simulators like Horzer, Dogzer, Howrse, and Horse Reality. Players manage virtual farms, breed animals, train them, and compete in shows. The application is built as a full-stack web application using modern web technologies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **State Management**: React Query (TanStack Query) for server state
- **Build Tool**: Vite for development and production builds
- **Authentication**: Replit Authentication integration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: Passport.js with OpenID Connect (Replit Auth)
- **Session Management**: Express sessions with PostgreSQL storage

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for type sharing
- **Migrations**: Drizzle Kit for database migrations
- **Connection**: Neon serverless with WebSocket support

## Key Components

### Authentication System
- **Provider**: Replit Authentication using OpenID Connect
- **Strategy**: Passport.js with custom strategy
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Users table with profile information and game currency

### Game Entities
- **Animals**: Horses and dogs with breeding mechanics, stats, and lifecycle stages
- **Breeding**: Genetic system with breeding records and compatibility
- **Training**: Skill development system with time-based training sessions
- **Marketplace**: Player-to-player trading system
- **Facilities**: Base building for housing and training animals
- **Competitions**: Event system for animal competitions

### UI/UX Design
- **Theme**: Warm, rustic color palette with browns, golds, and creams
- **Components**: Consistent design system using Radix UI primitives
- **Responsive**: Mobile-first design with responsive breakpoints
- **Accessibility**: ARIA-compliant components from Radix UI

## Data Flow

1. **Authentication Flow**:
   - User authenticates through Replit OAuth
   - Session stored in PostgreSQL
   - User data cached in React Query

2. **Game Data Flow**:
   - Client fetches data via React Query
   - API endpoints handle CRUD operations
   - Database operations through Drizzle ORM
   - Real-time updates through query invalidation

3. **State Management**:
   - Server state managed by React Query
   - Local UI state managed by React hooks
   - Form state managed by React Hook Form

## External Dependencies

### Core Technologies
- **React 18**: Frontend framework
- **Express.js**: Backend framework
- **Drizzle ORM**: Database ORM
- **PostgreSQL**: Database (via Neon)
- **TanStack Query**: Server state management
- **Tailwind CSS**: Styling framework

### Authentication
- **Replit Auth**: OAuth provider
- **Passport.js**: Authentication middleware
- **OpenID Connect**: Authentication protocol

### UI Libraries
- **Radix UI**: Headless UI components
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library
- **Wouter**: Lightweight routing

### Development Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety
- **ESBuild**: Production bundling
- **Drizzle Kit**: Database migrations

## Deployment Strategy

### Development Environment
- **Server**: Node.js with tsx for TypeScript execution
- **Client**: Vite dev server with HMR
- **Database**: Neon serverless PostgreSQL
- **Authentication**: Replit Auth in development mode

### Production Build
- **Frontend**: Vite build to `dist/public`
- **Backend**: ESBuild bundle to `dist/index.js`
- **Database**: Migrations applied via Drizzle Kit
- **Static Assets**: Served by Express in production

### Environment Configuration
- **DATABASE_URL**: Neon PostgreSQL connection string
- **SESSION_SECRET**: Express session encryption key
- **REPLIT_DOMAINS**: Allowed domains for Replit Auth
- **ISSUER_URL**: OpenID Connect issuer URL

### File Structure
```
├── client/           # React frontend
├── server/           # Express backend
├── shared/           # Shared types and schema
├── migrations/       # Database migrations
├── dist/            # Production build output
└── attached_assets/ # Game design documents
```

The application follows a monorepo structure with clear separation between frontend, backend, and shared code, enabling efficient development and deployment on the Replit platform.