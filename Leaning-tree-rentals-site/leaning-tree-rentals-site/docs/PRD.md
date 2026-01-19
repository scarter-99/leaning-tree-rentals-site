# Leaning Tree Rentals Website - Product Requirements Document (PRD)

---

## CURRENT STATUS & REMAINING WORK (Updated Jan 2026)

### What's Working
- [x] Main website (Home, Rentals, Policies, Contact pages)
- [x] Single-day reservation form
- [x] Supabase database connected - reservations saving to database
- [x] Confirmation page with green checkmark after form submission
- [x] Location: Round Top, Texas
- [x] Policies: in-person payment only, no golf carts on asphalt ("it's your own asphalt!")
- [x] Hero section buttons visible (fixed z-index)
- [x] Admin dashboard UI exists at `/admin`
- [x] Admin reservations page at `/admin/reservations`

### Database Info
- **Supabase URL:** https://ausjbyvmqpnjnhtawgrw.supabase.co
- **Table:** `reservations`
- **RLS:** Currently DISABLED (re-enable before production)

### Environment File (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://ausjbyvmqpnjnhtawgrw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=leaningtreerentals@gmail.com
RESEND_API_KEY=  # NEEDS TO BE ADDED
```

---

## REMAINING TASKS (Priority Order)

### 1. Email Notifications (HIGH PRIORITY)
**Status:** Code exists, needs Resend API key

**Setup Steps:**
1. Go to [resend.com](https://resend.com) and create account
2. Get API key (starts with `re_`)
3. Add to `.env.local`: `RESEND_API_KEY=re_xxxxx`
4. Restart dev server

**Emails to send:**
- [ ] Customer receives email when they SUBMIT a reservation request
- [ ] Admin (leaningtreerentals@gmail.com) receives email when new request comes in
- [ ] Customer receives CONFIRMATION email when admin approves
- [ ] Customer receives DENIAL email if admin denies
- [ ] Both parties receive RECEIPT when reservation is confirmed

**Code Location:** `src/lib/email/send.ts`

---

### 2. Multi-Day Reservation Form (HIGH PRIORITY)
**Status:** Not started

**Requirement:** Customer should be able to add multiple days to ONE reservation form instead of filling out multiple forms.

**Example:**
```
Day 1: March 15, All Day, 4 Passenger Cart - $175
Day 2: March 16, Morning, 4 Passenger Cart - $125
Day 3: March 17, Afternoon, 6 Passenger Cart - $225
                                      TOTAL: $525
```

**Features Needed:**
- [ ] "Add Another Day" button on reservation form
- [ ] Each day can have different time slot (All Day / Morning / Afternoon)
- [ ] Each day can have different cart type (4 or 6 passenger)
- [ ] Running total price updates as days are added
- [ ] Ability to remove a day from the list
- [ ] All days submitted as one reservation request

**Files to Modify:**
- `src/components/forms/ReservationForm.tsx` - Add multi-day UI
- `src/app/api/reservations/route.ts` - Handle array of days
- Database: May need `reservation_days` child table or JSON column

---

### 3. Admin Dashboard & Reservation Management (HIGH PRIORITY)
**Status:** UI exists, needs auth and full functionality

**Location:** `/admin`, `/admin/login`, `/admin/reservations`

**Setup Needed:**
- [ ] Create admin user in Supabase Auth for owner
- [ ] Test login functionality
- [ ] Wire up confirm/deny buttons to database

**Features:**
- [ ] View all pending reservations
- [ ] CONFIRM a reservation (updates status, sends confirmation email + receipt)
- [ ] DENY a reservation (updates status, sends denial email with optional reason)
- [ ] Add admin notes to reservations
- [ ] Filter reservations by status (Pending, Confirmed, Denied)
- [ ] Filter by date
- [ ] View customer contact info (name, email, phone)

---

### 4. SMS Text Notifications (MEDIUM PRIORITY)
**Status:** Not started

**Requirement:** Owner receives a TEXT MESSAGE when someone submits a reservation request.

**Setup Steps:**
1. Create Twilio account at [twilio.com](https://twilio.com)
2. Get a phone number (~$1/month)
3. Get Account SID and Auth Token
4. Add to `.env.local`:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxx
   TWILIO_AUTH_TOKEN=xxxxx
   TWILIO_PHONE_NUMBER=+1234567890
   OWNER_PHONE_NUMBER=+1XXXXXXXXXX  # Owner's cell phone
   ```

**Text Content:**
```
New reservation request!
Name: John Smith
Date: March 15, 2026
Cart: 4 Passenger, All Day
Phone: 555-123-4567

Log in to confirm: [admin URL]
```

**Files to Create:**
- `src/lib/sms/send.ts` - Twilio integration
- Modify `src/app/api/reservations/route.ts` to send SMS on new request

---

### 5. Receipts (MEDIUM PRIORITY)
**Status:** Not started

**Requirement:** When a reservation is CONFIRMED, send a receipt to both customer and admin.

**Receipt Should Include:**
- Reservation ID / confirmation number
- Customer name and contact info
- Rental date(s) and time slots
- Cart type(s)
- Price breakdown per day
- Total amount due
- Payment reminder: "Pay in person at pickup"
- Pickup instructions
- Policies reminder (no refunds, 1 hour pickup window)

---

### 6. Re-enable Row Level Security (BEFORE PRODUCTION)
**Status:** Currently disabled for testing

**SQL to run before going live:**
```sql
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
```

Make sure policies allow:
- Anonymous INSERT (for public form)
- Authenticated SELECT/UPDATE/DELETE (for admin)

---

## Quick Start Commands

**Start dev server:**
```bash
cd "/Users/camillewhite/Leaning Tree Rentals/leaning-tree-rentals-site/Leaning-tree-rentals-site/leaning-tree-rentals-site"
npm run dev
```

**URLs:**
- Website: http://localhost:3000
- Reserve: http://localhost:3000/reserve
- Admin: http://localhost:3000/admin
- Supabase: https://supabase.com/dashboard/project/ausjbyvmqpnjnhtawgrw

---

## File Structure Reference

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── reserve/
│   │   ├── page.tsx                # Reservation form
│   │   └── confirmation/page.tsx   # Success page
│   ├── admin/
│   │   ├── page.tsx                # Admin dashboard
│   │   ├── login/page.tsx          # Admin login
│   │   └── reservations/page.tsx   # Manage reservations
│   ├── api/reservations/
│   │   ├── route.ts                # POST new, GET all
│   │   └── [id]/route.ts           # PATCH update status
│   ├── rentals/page.tsx            # Pricing
│   ├── policies/page.tsx           # Policies
│   └── contact/page.tsx            # Contact
├── components/forms/
│   └── ReservationForm.tsx         # Main form (needs multi-day update)
├── lib/
│   ├── email/send.ts               # Email functions (Resend)
│   ├── supabase/server.ts          # Supabase client
│   └── utils.ts                    # Business info, pricing, policies
└── types/index.ts                  # TypeScript types
```

---

---

# ORIGINAL PRD BELOW (Reference)

---

## Quick Summary

A professional golf cart rental website for a Texas-based company. Features a reservation request system with admin approval workflow and automatic email notifications.

**Key Features:**
- Public pages: Home, Rentals/Pricing, Policies, Contact, Reservation Form
- Admin panel: Login, Dashboard, Reservation Management (Confirm/Deny)
- Email system: Auto-emails on request submission and confirmation/denial
- Year-round rentals with special event highlighting

---

## Project Overview

**Business:** Leaning Tree Rentals - Golf Cart Rental Company (Round Top, Texas)
**Website:** www.leaningtreerentals.com
**Phone:** 979-208-7250
**Admin Email:** leaningtreerentals@gmail.com

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
- **SMS:** Twilio (to be added)
- **Deployment:** Vercel (recommended)

---

## Business Information

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
6. **Payment in person only - no online payments accepted**
7. **No golf carts on asphalt** - "Don't drive on the asphalt, over the asphalt, or under the asphalt — if you get a ticket, it's your own asphalt!" (It's illegal, you'll get ticketed)

---

## Confirmed Requirements

1. **Admin Email:** leaningtreerentals@gmail.com
2. **Rental Mode:** Year-round rentals (can highlight special events like Fall Show)
3. **Payment:** Pay in person - no online payment system needed
4. **Inventory:** Manual review by admin - no automatic inventory tracking
5. **Complexity:** Keep it simple and maintainable
6. **Multi-day reservations:** Allow adding multiple days to single form
7. **SMS alerts:** Owner gets text when new reservation comes in
