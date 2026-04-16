# Aurora Quiz Funnel

Aurora Recovery quiz and booking funnel built with Next.js.

## Overview

This app guides users through a 4-step quiz, branches them by readiness level, and routes them into a booking flow.

### Current Quiz Branching (Question 4)

- `Just browsing`
  - `Learn how halo therapy works` -> jumps to home section `#why-halotherapy-works`
  - `Get a Free 15-Minute Salt Therapy Consultation` -> opens booking flow with consultation preselected
- `Somewhat interested`
  - `Here's exactly what your first session looks like` -> reveals embedded Loom video on page
  - `Get a Free 15-Minute Salt Therapy Consultation` -> opens booking flow with consultation preselected
- `Very ready to try something new`
  - Shows unlocked consultation message
  - `Book Your First Session Now` -> opens booking flow with consultation preselected

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI components
- pnpm

## Local Development

1. Install dependencies:

```bash
pnpm install
```

2. Start dev server:

```bash
pnpm dev
```

3. Open:

```text
http://localhost:3000
```

## Key Routes

- Landing page: `/`
- Quiz start: `/quiz`
- Quiz Q1-Q4: `/quiz/question-1` ... `/quiz/question-4`
- Response pages: `/quiz/response-a`, `/quiz/response-b`, `/quiz/response-c`
- Booking flow:
  - `/booking/service`
  - `/booking/contact`
  - `/booking/details`
  - `/booking/confirm`

## Cal.com Setup

The app is wired for Cal.com event slug:

- `aurorarecovery/halotherapy`

Cal embed is initialized in `app/layout.tsx`, and quiz response CTAs route users into booking.

## Meta Pixel Setup

Meta Pixel loader is implemented via `components/meta-pixel.tsx`.

Set this environment variable:

```bash
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id
```

Tracked events include:

- `PageView`
- `CompleteRegistration` (quiz completion router)
- `ViewContent` (response page views)
- `Lead` (booking CTA clicks)

## Deploy (Vercel)

Vercel CLI is included as a dev dependency.

1. Login:

```bash
pnpm exec vercel login
```

2. Link and deploy:

```bash
pnpm exec vercel
```

3. Production deploy:

```bash
pnpm exec vercel --prod
```

## Notes

- Quiz implementation details are documented in `QUIZ_SETUP.md`.
- Booking context and quiz context live under `lib/`.
