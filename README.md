This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Overview

Frontend application for Screenly AI, providing the admin interface for managing jobs and candidates for AI-powered phone screenings.

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** Shadcn/UI
- **Styling:** Tailwind CSS
- **State Management:** React Context API (for Auth)
- **Authentication:** Firebase Auth (Client SDK)
- **Language:** TypeScript

## Getting Started

First, set up your environment variables for **local development**. Create a `.env.local` file in the root directory (this file should **not** be committed to Git) and add the following based on your Firebase project configuration and local backend URL:

```dotenv
# .env.local (for local development)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Point to your local backend server during development
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

**For Production Deployment (e.g., on Vercel):**

You **must** configure these same environment variables within your Vercel project settings (**Settings -> Environment Variables**).

*   Set all the `NEXT_PUBLIC_FIREBASE_*` variables according to your Firebase project.
*   **Crucially, set `NEXT_PUBLIC_API_BASE_URL` to the deployed URL of your backend application** (e.g., `https://your-backend-url.vercel.app`).

Next, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
