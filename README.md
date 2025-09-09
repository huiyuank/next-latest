# next-latest — Prisma + Next.js learning playground

This repository is a lightweight playground demonstrating the latest Next.js features (App Router, server components, API routes) combined with Prisma and PostgreSQL for simple CRUD operations. It's purposely "vibe-coded" — a learning project used to explore new tech and AI-assisted development.

Goals

-   Demonstrate App Router routing and single-page-like UX
-   Show a small Prisma schema and direct DB usage from API routes
-   Provide reusable components, server-side logging, and a simple Tailwind-based style system

Getting started

1. Copy `.env.example` or update `.env` with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

2. Install and run:

```bash
npm install
npx prisma migrate deploy  # or `prisma migrate dev` during development
npm run dev
```

Notes

-   `.env` is sanitized and should not be committed with secrets. Keep your production credentials secure.
-   The `src/generated/prisma` client is present (generated during development). If you regenerate Prisma client, run `npx prisma generate`.
-   This repo is intended for learning; feel free to adapt, harden, and add tests.

License

-   MIT
    This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/route.ts`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Routes

This directory contains example API routes for the headless API app.

For more details, see [route.js file convention](https://nextjs.org/docs/app/api-reference/file-conventions/route).
