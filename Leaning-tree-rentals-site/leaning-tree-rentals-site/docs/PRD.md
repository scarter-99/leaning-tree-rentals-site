# Leaning Tree Rentals Website - Product Requirements Document (PRD)

## Quick Summary

A professional golf cart rental website for a Texas-based company. Features a reservation request system with admin approval workflow and automatic email notifications.

**Key Features:**
- Public pages: Home, Rentals/Pricing, Policies, Contact, Reservation Form
- Admin panel: Login, Dashboard, Reservation Management (Confirm/Deny)
- Email system: Auto-emails on request submission and confirmation/denial
- Year-round rentals with special event highlighting

---

## Project Overview

**Business:** Leaning Tree Rentals - Golf Cart Rental Company (Texas)
**Website:** www.leaningtreerentals.com
**Phone:** 979-208-7250

### Design Requirements
- **Color Scheme:** Red and White (primary)
- **Style:** Professional, classic, warm, friendly (NOT techy)
- **Responsive:** Mobile, tablet, laptop, desktop
- **Images:** Placeholder images for now

### Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend API
- **Deployment:** Vercel (recommended)

---

## Business Information (From Current Site)

### Rental Options

**4 Passenger Carts:**
| Time Slot | Hours | Price |
|-----------|-------|-------|
| All Day | 9am - 6pm | $175 |
| Morning | 9am - 1:30pm | $125 |
| Afternoon | 1:30pm - 6pm | $125 |

**6 Passenger Carts:**
| Time Slot | Hours | Price |
|-----------|-------|-------|
| All Day | 9am - 6pm | $325 |
| Morning | 9am - 1:30pm | $225 |
| Afternoon | 1:30pm - 6pm | $225 |

*Note: 6 passenger carts have limited availability*

### Business Policies
1. No refunds - No exceptions
2. Must pick up cart within 1 hour of reservation or it will be cancelled
3. All reservations are first come first serve
4. Carts are preassigned prior to the show
5. Incomplete reservation info = delayed processing

---

## Phase 1: Project Setup

### Step 1.1: Initialize Next.js Project
- Create Next.js 14 app with TypeScript
- Configure Tailwind CSS
- Set up project folder structure

### Step 1.2: Configure Tailwind Theme
- Define red/white color palette
- Set up typography (classic, professional fonts)
- Configure responsive breakpoints

### Step 1.3: Create Base Layout Components
- Header component with navigation
- Footer component with contact info
- Main layout wrapper

### Step 1.4: Set Up Environment Variables
- Create `.env.local` template
- Document required Supabase keys

---

## Phase 2: Frontend Pages (Public)

### Step 2.1: Home Page (`/`)
**Sections:**
1. Hero section with business name and tagline
2. Current rental season info (Fall 2025 dates)
3. Quick "Book Now" call-to-action
4. Brief about section
5. Contact info snippet

### Step 2.2: Rentals/Pricing Page (`/rentals`)
**Sections:**
1. Page header
2. 4 Passenger cart options with pricing
3. 6 Passenger cart options with pricing (show "limited availability")
4. Time slot explanations
5. CTA to reservation form

### Step 2.3: Policies Page (`/policies`)
**Content:**
1. No refunds policy
2. Pickup time requirements
3. First come first serve policy
4. Preassignment policy
5. Complete information requirement

### Step 2.4: Contact Page (`/contact`)
**Sections:**
1. Phone number (with "prefer text" note)
2. Contact form (optional - simple inquiries)
3. Business hours/availability
4. Location info (if applicable)

### Step 2.5: Reservation Request Page (`/reserve`)
**Form Fields:**
1. Full Name (required)
2. Email Address (required)
3. Phone Number (required)
4. Rental Date (date picker, required)
5. Time Slot (dropdown: All Day/Morning/Afternoon, required)
6. Cart Type (dropdown: 4 Passenger/6 Passenger, required)
7. Special requests (optional textarea)
8. Policy acknowledgment checkbox

**Form Behavior:**
- Client-side validation
- Submit to Supabase
- Show success/error messages
- Redirect to confirmation page

### Step 2.6: Reservation Confirmation Page (`/reserve/confirmation`)
- Thank you message
- Summary of reservation request
- "What happens next" explanation
- Contact info for questions

---

## Phase 3: Database Setup (Supabase)

### Step 3.1: Create Supabase Project
- Set up new Supabase project
- Get API keys and URL
- Configure environment variables

### Step 3.2: Create Database Tables

**Table: `reservations`**
```sql
id: uuid (primary key)
created_at: timestamp
name: text (not null)
email: text (not null)
phone: text (not null)
rental_date: date (not null)
time_slot: text (not null) -- 'all_day', 'morning', 'afternoon'
cart_type: text (not null) -- '4_passenger', '6_passenger'
special_requests: text (nullable)
status: text (default 'pending') -- 'pending', 'confirmed', 'denied', 'cancelled'
admin_notes: text (nullable)
confirmed_at: timestamp (nullable)
confirmation_email_sent: boolean (default false)
request_email_sent: boolean (default false)
```

**Table: `admin_users`**
```sql
id: uuid (primary key)
email: text (unique, not null)
password_hash: text (not null)
name: text
created_at: timestamp
last_login: timestamp
```

**Table: `rental_settings`** (for managing availability)
```sql
id: uuid (primary key)
setting_key: text (unique)
setting_value: jsonb
updated_at: timestamp
```

### Step 3.3: Set Up Row Level Security (RLS)
- Public can INSERT reservations
- Only authenticated admins can SELECT/UPDATE/DELETE
- Protect admin_users table

### Step 3.4: Create Database Functions
- Function to update reservation status
- Function to check availability (optional enhancement)

---

## Phase 4: Supabase Client Integration

### Step 4.1: Install Supabase Client
- Install `@supabase/supabase-js`
- Create Supabase client utility
- Set up server/client components properly

### Step 4.2: Create Reservation Submission
- API route or server action for form submission
- Insert reservation into database
- Return success/error response

### Step 4.3: Create Admin Data Fetching
- Fetch all reservations (admin only)
- Fetch single reservation details
- Update reservation status

---

## Phase 5: Admin Panel

### Step 5.1: Admin Login Page (`/admin/login`)
- Email/password form
- Authentication with Supabase Auth
- Redirect to dashboard on success
- Error handling for invalid credentials

### Step 5.2: Admin Dashboard (`/admin`)
- Overview statistics (pending, confirmed, denied counts)
- Quick actions
- Recent reservations list

### Step 5.3: Reservations Management (`/admin/reservations`)
**Features:**
- Table/list of all reservations
- Filter by status (pending/confirmed/denied/all)
- Filter by date
- Sort by date, name, status
- Search by name/email/phone

**Each Reservation Row Shows:**
- Name
- Date & Time slot
- Cart type
- Status badge
- Quick action buttons

### Step 5.4: Reservation Detail/Action Modal
**Display:**
- All reservation details
- Current status
- Admin notes field

**Actions:**
- Confirm reservation (button)
- Deny reservation (button)
- Add admin notes
- View email history

### Step 5.5: Admin Authentication Middleware
- Protect all `/admin/*` routes
- Redirect unauthenticated users to login
- Session management

---

## Phase 6: Email System

### Step 6.1: Set Up Email Service
**Option A: Resend (Recommended)**
- Create Resend account
- Get API key
- Install Resend SDK

**Option B: Supabase Edge Functions + SMTP**
- Configure SMTP provider
- Create edge function for sending

### Step 6.2: Email Templates

**Template 1: Reservation Request Received (to Customer)**
```
Subject: Reservation Request Received - Leaning Tree Rentals

Dear [Name],

Thank you for your reservation request!

Reservation Details:
- Date: [Rental Date]
- Time: [Time Slot]
- Cart: [Cart Type]

Your request is being reviewed. You will receive another email
once your reservation is confirmed.

Questions? Text us at 979-208-7250

- Leaning Tree Rentals
```

**Template 2: Reservation Request Alert (to Admin)**
```
Subject: New Reservation Request - [Name] - [Date]

New reservation request received:

Name: [Name]
Email: [Email]
Phone: [Phone]
Date: [Rental Date]
Time: [Time Slot]
Cart: [Cart Type]
Special Requests: [If any]

Log in to admin panel to confirm or deny.
```

**Template 3: Reservation Confirmed (to Customer)**
```
Subject: Reservation CONFIRMED - Leaning Tree Rentals

Dear [Name],

Great news! Your reservation has been confirmed!

Confirmed Details:
- Date: [Rental Date]
- Time: [Time Slot]
- Cart: [Cart Type]
- Price: [Price]

IMPORTANT REMINDERS:
- Pick up within 1 hour of your time slot or reservation is cancelled
- No refunds - No exceptions
- Carts are preassigned

Questions? Text us at 979-208-7250

See you soon!
- Leaning Tree Rentals
```

**Template 4: Reservation Denied (to Customer)**
```
Subject: Reservation Update - Leaning Tree Rentals

Dear [Name],

Unfortunately, we are unable to confirm your reservation for:
- Date: [Rental Date]
- Time: [Time Slot]

[Optional: Admin reason/notes]

Please contact us to discuss alternative options.
Text: 979-208-7250

- Leaning Tree Rentals
```

### Step 6.3: Create Email Sending Functions
- `sendReservationRequestEmail(reservation)` - to customer
- `sendAdminNotificationEmail(reservation)` - to admin
- `sendConfirmationEmail(reservation)` - to customer
- `sendDenialEmail(reservation, reason?)` - to customer

### Step 6.4: Integrate Emails with Reservation Flow
- On new reservation: Send request emails (customer + admin)
- On confirm: Send confirmation email to customer
- On deny: Send denial email to customer

---

## Phase 7: Final Integration & Polish

### Step 7.1: Connect All Components
- Test full reservation flow
- Test admin panel functionality
- Test email delivery

### Step 7.2: Responsive Design Review
- Test on mobile (320px - 480px)
- Test on tablet (768px)
- Test on laptop (1024px)
- Test on desktop (1280px+)

### Step 7.3: Accessibility & UX
- Proper form labels
- Error messages
- Loading states
- Success feedback

### Step 7.4: SEO Basics
- Page titles
- Meta descriptions
- Open Graph tags

---

## Implementation Order (Detailed Steps)

### Batch 1: Foundation
1. Initialize Next.js project with TypeScript
2. Install and configure Tailwind CSS
3. Create color palette and theme configuration
4. Create folder structure
5. Build Header component
6. Build Footer component
7. Create main layout

### Batch 2: Public Pages
8. Build Home page hero section
9. Build Home page content sections
10. Build Rentals page with pricing cards
11. Build Policies page
12. Build Contact page

### Batch 3: Reservation Form
13. Build reservation form UI
14. Add form validation
15. Create confirmation page UI
16. Style all form elements

### Batch 4: Database
17. Create Supabase project (USER ACTION)
18. Create reservations table
19. Create admin_users table
20. Set up RLS policies
21. Configure environment variables

### Batch 5: Backend Integration
22. Install Supabase client
23. Create Supabase utility functions
24. Create reservation submission API/action
25. Test reservation insertion

### Batch 6: Admin Panel
26. Create admin login page
27. Set up Supabase Auth
28. Create admin middleware/protection
29. Build admin dashboard layout
30. Build reservations list view
31. Build reservation detail modal
32. Add confirm/deny functionality

### Batch 7: Email System
33. Set up email service (USER ACTION - API keys)
34. Create email templates
35. Create email sending functions
36. Integrate emails with reservation creation
37. Integrate emails with status changes

### Batch 8: Testing & Launch
38. Full flow testing
39. Responsive testing
40. Fix any bugs
41. Deploy to Vercel (USER ACTION)

---

## User Actions Required

These items require manual action from you:

1. **Create Supabase Project**
   - Go to supabase.com
   - Create new project
   - Provide me the URL and anon key

2. **Set Up Email Service**
   - Create Resend account (or alternative)
   - Provide API key
   - Verify sending domain (optional but recommended)

3. **Create Admin Account**
   - After admin panel is built, create your admin user

4. **Deploy to Vercel**
   - Connect GitHub repo
   - Add environment variables
   - Deploy

5. **Provide Real Images**
   - Golf cart photos
   - Logo (if any)
   - Any other branding assets

---

## File Structure (Planned)

```
/leaning-tree-rentals-site
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Home)
│   ├── rentals/
│   │   └── page.tsx
│   ├── policies/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── reserve/
│   │   ├── page.tsx
│   │   └── confirmation/
│   │       └── page.tsx
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── page.tsx (Dashboard)
│   │   └── reservations/
│   │       └── page.tsx
│   └── api/
│       ├── reservations/
│       │   └── route.ts
│       └── email/
│           └── route.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── AdminLayout.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   ├── forms/
│   │   └── ReservationForm.tsx
│   └── admin/
│       ├── ReservationTable.tsx
│       ├── ReservationModal.tsx
│       └── StatsCards.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── email/
│   │   └── send.ts
│   └── utils.ts
├── types/
│   └── index.ts
├── public/
│   └── images/
│       └── placeholder/
├── .env.local.example
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## Confirmed Requirements

Based on discussion with client:

1. **Admin Email:** Use placeholder in environment variables (to be configured later)
2. **Rental Mode:** Year-round rentals (can highlight special events like Fall Show)
3. **Payment:** Pay in person - no online payment system needed
4. **Inventory:** Manual review by admin - no automatic inventory tracking
5. **Complexity:** Keep it simple and maintainable
