import { CartPricing, TimeSlot, CartType, NavLink, ContactInfo } from '@/types';

// Business Information
export const BUSINESS_NAME = 'Leaning Tree Rentals';
export const BUSINESS_TAGLINE = 'Your Golf Cart Rental Destination in Round Top (Warrenton), Texas';
export const BUSINESS_ADDRESS = '4261 SH 237, Round Top, Texas 78954';

export const CONTACT_INFO: ContactInfo = {
  phone: '979-208-7250',
  preferText: true,
};

// Navigation Links
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Rentals', href: '/rentals' },
  { label: 'Policies', href: '/policies' },
  { label: 'Contact', href: '/contact' },
];

// Pricing Data
export const PRICING: CartPricing[] = [
  {
    cart_type: '4_passenger',
    label: '4 Passenger Cart',
    capacity: 4,
    options: [
      { time_slot: 'all_day', label: 'All Day', hours: '9am - 6pm', price: 175 },
      { time_slot: 'morning', label: 'Morning', hours: '9am - 1:30pm', price: 125 },
      { time_slot: 'afternoon', label: 'Afternoon', hours: '1:30pm - 6pm', price: 125 },
    ],
  },
  {
    cart_type: '6_passenger',
    label: '6 Passenger Cart',
    capacity: 6,
    options: [
      { time_slot: 'all_day', label: 'All Day', hours: '9am - 6pm', price: 325 },
      { time_slot: 'morning', label: 'Morning', hours: '9am - 1:30pm', price: 225 },
      { time_slot: 'afternoon', label: 'Afternoon', hours: '1:30pm - 6pm', price: 225 },
    ],
    limited_availability: true,
  },
];

// Policies
export const POLICIES = [
  {
    title: 'No Refunds',
    description: 'All sales are final. No refunds will be issued under any circumstances. No exceptions.',
  },
  {
    title: 'One Reservation Method Only',
    description: 'Please make your reservation online OR by phone - NOT both. Duplicate reservations will be cancelled.',
  },
  {
    title: 'Veterans Discount',
    description: '$25 discount available (one per cart, veteran must be present at pickup).',
  },
  {
    title: 'Reservation Confirmation Required',
    description: 'All reservations will receive a confirmation via email or text (depending on how reservation is made). If you do not receive a confirmation, your reservation is NOT complete. Please contact us to verify.',
  },
  {
    title: 'Bring Your Rental Agreement',
    description: 'In addition to making a reservation, please complete and bring the rental agreement with you to expedite the check-in process.',
  },
  {
    title: 'Pickup Time',
    description: 'You must pick up your cart within 1 hour of your reservation time. If you do not pick up your cart and we have not heard from you, your reservation will be cancelled.',
  },
  {
    title: 'Parking',
    description: 'Parking available at The Gin - $5/day.',
  },
  {
    title: 'First Come, First Serve',
    description: 'All reservations are processed on a first come, first serve basis. Early reservation is recommended to secure your preferred date and time.',
  },
  {
    title: 'Cart Preassignment',
    description: 'Carts are preassigned prior to each event. Specific cart requests cannot be guaranteed.',
  },
  {
    title: 'Complete Information Required',
    description: 'If you do not include all requested information with your reservation, your reservation will be delayed until we receive all necessary details.',
  },
  {
    title: 'In-Person Payment Only',
    description: 'Payment is collected in person at the time of cart pickup. Online payments are not accepted. Please bring your payment method when you arrive to pick up your cart.',
  },
  {
    title: 'Limited Wifi & Cell Service',
    description: 'Wifi and cell service are limited during the show. Please plan accordingly and ensure you have your confirmation and rental agreement printed or saved offline.',
  },
  {
    title: 'No Golf Carts on State Highways',
    description: 'It is a violation to drive a golf cart on state highways or state right of way in Fayette County, Texas. Violators will receive citations from law enforcement, and you are solely responsible for any fines.',
  },
];

// Show Dates (Antique Fair dates - online reservations only available for these dates)
export const SHOW_DATES = [
  { name: 'Spring Show', start: '2026-03-12', end: '2026-03-28' },
  { name: 'Fall Show', start: '2026-10-15', end: '2026-10-31' },
];

export function isShowDate(dateString: string): boolean {
  return SHOW_DATES.some(show => dateString >= show.start && dateString <= show.end);
}

// Partner Links
export const PARTNERS = [
  { name: 'Blue Mule Winery', url: 'https://www.bluemulewines.com/' },
  { name: 'Lone Star Glamp Inn', url: 'https://lonestarglampinn.com/' },
  { name: 'Warrenton Inn', url: 'https://www.warrentoninn.com/' },
  { name: 'Stone Meadow / Dead People Stuff', url: 'https://www.facebook.com/deadpeoplesstufftexas' },
  { name: 'Round Top Originals', url: 'https://www.roundtoporiginals.com/' },
  { name: 'The Gin at Warrenton', url: 'https://www.theginatwarrenton.com/' },
];

// Shirley's Asphalt Quote - displayed prominently on policies page
export const ASPHALT_QUOTE = {
  text: "Don't go on the asphalt, over the asphalt, around the asphalt nor under the asphalt - if you receive a citation it will be your own ASPHALT",
  author: "Shirley",
};

// Helper Functions
export function formatPrice(price: number): string {
  return `$${price}`;
}

export function formatPhoneNumber(phone: string): string {
  // Format: XXX-XXX-XXXX
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

export function getTimeSlotLabel(slot: TimeSlot): string {
  const labels: Record<TimeSlot, string> = {
    all_day: 'All Day (9am - 6pm)',
    morning: 'Morning (9am - 1:30pm)',
    afternoon: 'Afternoon (1:30pm - 6pm)',
  };
  return labels[slot];
}

export function getCartTypeLabel(type: CartType): string {
  const labels: Record<CartType, string> = {
    '4_passenger': '4 Passenger Cart',
    '6_passenger': '6 Passenger Cart',
  };
  return labels[type];
}

export function getPriceForReservation(cartType: CartType, timeSlot: TimeSlot): number {
  const cart = PRICING.find((p) => p.cart_type === cartType);
  if (!cart) return 0;
  const option = cart.options.find((o) => o.time_slot === timeSlot);
  return option?.price ?? 0;
}

export function formatDate(dateString: string): string {
  // Parse the date string to extract year, month, day
  // This handles both "2026-03-14" and "2026-03-14T00:00:00Z" formats from Supabase
  const [datePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);

  // Create date using local timezone at noon (months are 0-indexed in JS)
  const date = new Date(year, month - 1, day, 12, 0, 0);

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
