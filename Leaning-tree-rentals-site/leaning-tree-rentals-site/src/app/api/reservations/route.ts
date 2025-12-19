import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { sendReservationRequestEmail, sendAdminNotificationEmail } from '@/lib/email/send';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'rental_date', 'time_slot', 'cart_type'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate time_slot
    if (!['all_day', 'morning', 'afternoon'].includes(body.time_slot)) {
      return NextResponse.json(
        { error: 'Invalid time slot' },
        { status: 400 }
      );
    }

    // Validate cart_type
    if (!['4_passenger', '6_passenger'].includes(body.cart_type)) {
      return NextResponse.json(
        { error: 'Invalid cart type' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createServerClient();

    // Insert reservation into database
    const { data, error } = await supabase
      .from('reservations')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        rental_date: body.rental_date,
        time_slot: body.time_slot,
        cart_type: body.cart_type,
        special_requests: body.special_requests || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create reservation. Please try again.' },
        { status: 500 }
      );
    }

    // Send confirmation emails (don't await to avoid blocking response)
    try {
      await sendReservationRequestEmail(data);
      await sendAdminNotificationEmail(data);
      // Mark request email as sent
      await supabase
        .from('reservations')
        .update({ request_email_sent: true })
        .eq('id', data.id);
    } catch (emailError) {
      console.error('Failed to send emails:', emailError);
      // Don't fail the request, just log the error
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      message: 'Reservation request submitted successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();

    // Check if user is authenticated (admin)
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');

    // Build query
    let query = supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (date) {
      query = query.eq('rental_date', date);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reservations' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reservations: data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
