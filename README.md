# GrowthGround Frontend

This project is a Next.js 15 application that uses Supabase for authentication and data storage. It serves as an open source reference for building production‑grade web apps with modern tooling.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment variables**
   Copy `.env.example` to `.env.local` and fill in the required values.

   ```bash
   cp .env.example .env.local
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

## Scripts


## Environment Variables

See `.env.example` for all required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_BASE_URL`
- `SUPABASE_SERVICE_KEY`

## Testing

No automated tests are defined yet. Running `npm test` will output an error until tests are added.
