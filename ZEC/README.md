# ZEC AI Automation Agency Website

Production website for ZEC AI Automation Agency, built with Next.js (App Router).  
This repository contains the public marketing site, case studies, service pages, and lead capture forms.

## Key Features

- Multi-page agency website built on Next.js App Router
- Localized content support (English, Russian, Arabic)
- Case studies, workflows, services, pricing, resources, and blog pages
- Lead capture and onboarding forms integrated with FormSubmit
- Optional server routes for admin/internal workflows (appointments, projects, uploads, messages)
- Vercel-friendly deployment setup

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Mongoose (for optional server-side data flows)
- Vercel (deployment target)

## Project Structure

```text
ZEC/
|- src/
|  |- app/                  # Next.js routes, pages, API routes, shared components
|  |- lib/                  # Content, utilities, models, request/notification helpers
|- public/                  # Static assets (logos, images, uploads)
|- prisma/                  # Legacy Prisma schema (currently not wired to runtime)
|- .env.example             # Environment variable template
|- package.json             # Scripts and dependencies
|- next.config.ts           # Next.js config
|- README.md                # Project overview and setup
|- DEPLOYMENT.md            # Deployment guide (Vercel + domain notes)
```

## Prerequisites

- Node.js 20+ (recommended for Next.js 16)
- npm 10+

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create local environment file:

```bash
cp .env.example .env.local
```

PowerShell alternative:

```powershell
Copy-Item .env.example .env.local
```

3. Start development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## NPM Scripts

- `npm run dev` - Start local dev server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Notes

- Never commit `.env.local` or any secret-bearing `.env` file.
- `.env.example` is safe to commit and should contain placeholder values only.
- Public forms currently submit via FormSubmit endpoints configured in:
  - `src/app/components/HomeLeadCaptureForm.tsx`
  - `src/app/components/ContactRequestForm.tsx`
  - `src/app/components/ClientOnboardingForm.tsx`
- Optional backend/admin routes (MongoDB/notifications/uploads) require matching env vars from `.env.example`.

## Build and Production Run

```bash
npm run build
npm run start
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full production deployment flow, including:

- local verification before deployment
- Vercel project setup
- environment variable configuration
- custom domain connection checklist

## Ownership

- Project: ZEC AI Automation Agency website
- Repository maintainer: Adam-7th
- Primary public contact: `contact.zac.ai@gmail.com`
