// Reservation Types
export type TimeSlot = 'all_day' | 'morning' | 'afternoon';
export type CartType = '4_passenger' | '6_passenger';
export type ReservationStatus = 'pending' | 'confirmed' | 'denied' | 'cancelled';

export interface Reservation {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  rental_date: string;
  time_slot: TimeSlot;
  cart_type: CartType;
  special_requests?: string | null;
  status: ReservationStatus;
  admin_notes?: string | null;
  confirmed_at?: string | null;
  confirmation_email_sent: boolean;
  request_email_sent: boolean;
}

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  rental_date: string;
  time_slot: TimeSlot;
  cart_type: CartType;
  special_requests?: string;
  policy_acknowledged: boolean;
}

// Pricing Data
export interface PricingOption {
  time_slot: TimeSlot;
  label: string;
  hours: string;
  price: number;
}

export interface CartPricing {
  cart_type: CartType;
  label: string;
  capacity: number;
  options: PricingOption[];
  limited_availability?: boolean;
}

// Contact Info
export interface ContactInfo {
  phone: string;
  preferText: boolean;
}

// Navigation
export interface NavLink {
  label: string;
  href: string;
}
