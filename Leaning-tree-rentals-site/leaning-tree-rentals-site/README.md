# Leaning Tree Rentals Website

Golf cart rental website for Leaning Tree Rentals in Texas.

## Features

- **Public Pages**: Home, Rentals/Pricing, Policies, Contact
- **Reservation System**: Online reservation request form with validation
- **Admin Panel**: Dashboard and reservation management (confirm/deny)
- **Email Notifications**: Automatic emails on request submission and confirmation/denial
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Language**: TypeScript

## Getting Started

### 1. Clone and Install

```bash
git clone <repo-url>
cd leaning-tree-rentals-site
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the migration file: `supabase/migrations/001_initial_schema.sql`
3. Go to Settings > API and copy your project URL and anon key

### 3. Set Up Resend (Email)

1. Create an account at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. (Optional) Verify a custom domain for sending emails

### 4. Configure Environment Variables

Copy the example env file:

```bash
cp .env.local.example .env.local
```

Fill in your values:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=your_admin_email@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Create Admin User

In Supabase:
1. Go to Authentication > Users
2. Click "Add user" > "Create new user"
3. Enter email and password for your admin account
4. Use these credentials to log into `/admin/login`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to update `NEXT_PUBLIC_SITE_URL` to your production domain.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── policies/          # Policies page
│   ├── rentals/           # Rentals/pricing page
│   └── reserve/           # Reservation form & confirmation
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components (Header, Footer)
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions
│   ├── email/            # Email sending functions
│   ├── supabase/         # Supabase client config
│   └── utils.ts          # Helper functions
└── types/                # TypeScript types
```

## Pricing Configuration

Pricing is configured in `src/lib/utils.ts`. To update prices:

```typescript
export const PRICING: CartPricing[] = [
  {
    cart_type: '4_passenger',
    label: '4 Passenger Cart',
    capacity: 4,
    options: [
      { time_slot: 'all_day', label: 'All Day', hours: '9am - 6pm', price: 175 },
      // ... more options
    ],
  },
  // ... more cart types
];
```

## Adding Real Images

Replace placeholder images in `public/images/` and update references in the components.

## License

Private - All rights reserved
