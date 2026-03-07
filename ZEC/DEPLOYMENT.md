# Deployment Guide (Vercel)

This document defines a clean deployment flow for the ZEC website.

## 1. Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000` and verify key pages/forms.

## 2. Build Check Before Push

```bash
npm run lint
npm run build
```

Fix all build/lint failures before deploying.

## 3. GitHub Push (Recommended Repo Root)

Recommended: use `ZEC/` as the repository root for the website project.

```bash
git init
git add .
git commit -m "chore: initialize production-ready Next.js website repo"
git branch -M main
git remote add origin https://github.com/Adam-7th/Adam-7th.github.io.git
git push -u origin main
```

If `origin` already exists:

```bash
git remote set-url origin https://github.com/Adam-7th/Adam-7th.github.io.git
```

## 4. Deploy to Vercel

1. Import GitHub repository in Vercel.
2. Framework preset: `Next.js` (auto-detected).
3. If app code is under a parent folder, set Vercel `Root Directory` to `ZEC`.
4. Add required environment variables from `.env.example`.
5. Deploy.

## 5. Environment Variables in Vercel

Minimum baseline:

- `NEXT_PUBLIC_SITE_URL` (your production URL)
- Any `NEXT_PUBLIC_*` links you want to override in production

Only required if using server-side admin/API features:

- `MONGODB_URI`
- `MONGODB_DB`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_OWNER_EMAIL`
- `TELEGRAM_BOT_TOKEN` (optional)
- `TELEGRAM_ADMIN_CHAT_ID` (optional)
- `ADMIN_TOKEN`

## 6. Custom Domain Checklist

1. In Vercel project settings, add your domain.
2. Apply DNS records shown by Vercel for your provider.
3. Typical setup:
   - Apex/root domain: `A` record to `76.76.21.21`
   - `www` subdomain: `CNAME` to `cname.vercel-dns.com`
4. Wait for DNS propagation.
5. Verify HTTPS is active.
6. Set `NEXT_PUBLIC_SITE_URL` to the final primary domain.

Always follow the DNS values currently shown in your Vercel dashboard if they differ.

## 7. Post-Deploy Smoke Test

- Homepage and major route navigation
- Contact and onboarding forms
- Metadata/social preview checks
- Mobile responsiveness
- Optional admin/API routes (if enabled)
