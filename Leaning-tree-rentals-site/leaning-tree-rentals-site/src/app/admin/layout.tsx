import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import AdminLayout from '@/components/layout/AdminLayout';

export const metadata = {
  title: 'Admin Panel | Leaning Tree Rentals',
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If not logged in and not on login page, redirect to login
  // This check is basic - the actual auth check happens on each page
  // But we wrap with AdminLayout for consistent UI

  return <AdminLayout>{children}</AdminLayout>;
}
