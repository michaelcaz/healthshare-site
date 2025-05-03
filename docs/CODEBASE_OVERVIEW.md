# Healthshare Plan Finder Codebase Overview

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Key Components](#key-components)
4. [State Management](#state-management)
5. [Data Flow](#data-flow)
6. [Authentication](#authentication)
7. [Error Handling](#error-handling)
8. [Performance Optimizations](#performance-optimizations)
9. [Deployment](#deployment)
10. [Testing](#testing)

## Architecture Overview

The Healthshare Plan Finder is built with the following core technologies:

- **Frontend Framework**: Next.js 14 with App Router
- **Database**: Supabase (PostgreSQL)
- **Content Management**: Sanity.io
- **Authentication**: Supabase Auth
- **Styling**: TailwindCSS
- **Form Management**: React Hook Form with Zod validation
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics 4
- **Email Marketing**: ConvertKit

The application follows a server-first approach, leveraging Next.js 14's server components for improved performance and SEO. Client components are used only where interactivity is required, such as in forms and interactive UI elements.

## Project Structure

The project follows a feature-based organization with the following key directories:

```
/app                       - Next.js App Router pages
  /(admin)/                - Admin dashboard routes
  /questionnaire/          - Plan finder questionnaire
  /plans/                  - Plan comparison and details
  /auth/                   - Authentication pages
  /api/                    - API routes
/components                - React components
  /ui/                     - UI components (buttons, forms, etc.)
  /layout/                 - Layout components (header, footer, etc.)
  /questionnaire/          - Questionnaire-specific components
  /plans/                  - Plan display components
/lib                       - Utility libraries
  /supabase/               - Supabase client and utilities
  /sanity/                 - Sanity.io client and utilities
  /error/                  - Error handling utilities
/hooks                     - Custom React hooks
/types                     - TypeScript type definitions
/schemas                   - Zod validation schemas
/public                    - Static assets
/styles                    - Global styles
/scripts                   - Utility scripts
/tests                     - Test files
  /unit/                   - Unit tests
  /integration/            - Integration tests
  /e2e/                    - End-to-end tests
```

## Key Components

### Questionnaire Flow

The questionnaire is built with a multi-step form approach:

1. `QuestionnairePage`: The main page component that orchestrates the flow
2. `QuestionnaireForm`: Manages the form state and navigation between steps
3. `QuestionStep`: Renders individual question steps
4. `ProgressBar`: Shows progress through the questionnaire

### Plan Recommendation Engine

Plan recommendations are calculated based on questionnaire responses:

1. `recommendationService.ts`: Core logic for matching plans to user needs
2. `RecommendationsPage`: Displays recommended plans
3. `PlanCard`: Renders individual plan information
4. `PlanComparison`: Allows side-by-side comparison of plans

### Authentication

Authentication is handled through Supabase:

1. `AuthProvider`: Context provider for authentication state
2. `useAuth`: Hook for accessing auth state and methods
3. `LoginForm` and `SignupForm`: Components for user authentication
4. `middleware.ts`: Handles route protection and redirects

## State Management

The application uses a combination of state management approaches:

1. **Server State**: Fetched with Server Components and actions
2. **Form State**: Managed with React Hook Form
3. **UI State**: Handled with React's useState/useReducer
4. **Authentication State**: Managed through Supabase and context

## Data Flow

1. **Questionnaire Data**:
   - User inputs are collected through the questionnaire
   - Validated with Zod schemas
   - Stored temporarily in the browser
   - Submitted to the recommendation engine

2. **Plan Data**:
   - Stored in Supabase database
   - Fetched via Supabase client in server components
   - Displayed in the UI with client components

3. **User Data**:
   - Managed through Supabase Auth
   - User profiles and saved plans stored in Supabase

## Authentication

The application uses Supabase Auth with the following flow:

1. **Login/Signup**: Email/password authentication
2. **Session Management**: JWT tokens stored in cookies
3. **Route Protection**: Via Next.js middleware
4. **Authentication Context**: Provides auth state to components

## Error Handling

A comprehensive error handling system is implemented:

1. **Client-Side**: React Error Boundaries for component errors
2. **Server-Side**: Next.js error handling for API routes and server components
3. **Structured Errors**: Custom error classes for different error types
4. **Error Logging**: Sentry integration for error tracking
5. **User Feedback**: Toast notifications for user-facing errors

## Performance Optimizations

The application includes various performance optimizations:

1. **Server Components**: Reduce client-side JavaScript
2. **Image Optimization**: Next.js Image component
3. **Code Splitting**: Dynamic imports for large components
4. **Caching Strategies**: Next.js cache mechanisms
5. **Optimized Builds**: Production builds with minification

## Deployment

The application is deployed using Vercel with the following setup:

1. **CI/CD Pipeline**: Automated builds on push to main branch
2. **Environment Variables**: Configured in Vercel project settings
3. **Preview Deployments**: For pull requests
4. **Production Deployment**: Manual promotion from staging

## Testing

The application includes a comprehensive testing setup:

1. **Unit Tests**: Using Vitest for utilities and components
2. **Integration Tests**: For testing component interactions
3. **End-to-End Tests**: Using Cypress for full user flows
4. **Performance Testing**: Lighthouse audits
5. **Accessibility Testing**: Axe for accessibility compliance 