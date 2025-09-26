# Overview

This is a comprehensive administrative dashboard system designed for Brazilian law firms. The application provides a complete case management platform with client tracking, process management, calendar scheduling, financial control, and document generation capabilities. Built as a full-stack web application with React frontend and Express backend, it features a modern, professional interface optimized for legal professionals' workflows.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
**Framework**: React 18 with TypeScript using Vite as the build tool
**UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
**Routing**: Wouter for lightweight client-side routing
**State Management**: TanStack Query for server state management
**Design System**: Material Design principles with custom adaptations for legal workflows

The frontend follows a component-based architecture with reusable UI components organized in a design system approach. The layout uses a persistent sidebar navigation pattern with collapsible sections for different functional areas (clients, processes, calendar, finances, etc.).

## Backend Architecture
**Runtime**: Node.js with Express.js framework
**Language**: TypeScript with ES modules
**Database Layer**: Drizzle ORM for type-safe database operations
**Session Management**: Connect-pg-simple for PostgreSQL session storage
**Development**: Hot module replacement via Vite integration

The backend implements a REST API architecture with route handlers organized by feature area. The storage layer uses an interface pattern allowing for both in-memory and database implementations.

## Data Storage Solutions
**Primary Database**: PostgreSQL via Neon serverless platform
**ORM**: Drizzle ORM with code-first schema definitions
**Migrations**: Drizzle Kit for database schema management
**Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

The database schema is defined in TypeScript using Drizzle's schema builder, enabling type-safe database operations and automatic migration generation.

## Authentication & Authorization
**Session-based Authentication**: Express sessions with PostgreSQL backing
**User Management**: Multi-role system with permissions for different access levels
**Security**: Form validation using Zod schemas with React Hook Form integration

The application includes a comprehensive user management module with role-based access control, allowing administrators to manage user permissions and access to different system features.

# External Dependencies

## UI Components & Styling
- **Radix UI**: Headless component primitives for accessibility and behavior
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Component variant management

## Database & ORM
- **Neon Database**: Serverless PostgreSQL platform
- **Drizzle ORM**: Type-safe ORM with schema-first approach
- **Drizzle Kit**: Database migration and schema management tools

## Development & Build Tools
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Type safety across frontend and backend
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime type validation and schema definition

## Additional Libraries
- **Date-fns**: Date manipulation and formatting
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight routing solution
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixing