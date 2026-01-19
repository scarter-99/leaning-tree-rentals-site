import { CartPricing, TimeSlot, CartType, NavLink, ContactInfo } from '@/types';

// Business Information
export const BUSINESS_NAME = 'Leaning Tree Rentals';
export const BUSINESS_TAGLINE = 'Your Golf Cart Rental Destination in Round Top, Texas';

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
    title: 'Pickup Time',
    description: 'You must pick up your cart within 1 hour of your reservation time. If you do not pick up your cart and we have not heard from you, your reservation will be cancelled.',
  },
  {
    title: 'First Come, First Serve',
    description: 'All reservations are processed on a first come, first serve basis. Early booking is recommended to secure your preferred date and time.',
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
    title: 'Valid ID Required',
    description: 'You must present a valid government-issued photo ID (driver\'s license, state ID, or passport) at the time of pickup to receive your cart. No exceptions.',
  },
  {
    title: 'No Golf Carts on Asphalt',
    description: 'Don\'t drive on the asphalt, over the asphalt, or under the asphalt — if you get a ticket, it\'s your own asphalt! It is against the law to drive golf carts on public asphalt roads. Violators will receive tickets from law enforcement, and you are solely responsible for any fines.',
  },
];

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
  const date = new Date(dateString);
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
