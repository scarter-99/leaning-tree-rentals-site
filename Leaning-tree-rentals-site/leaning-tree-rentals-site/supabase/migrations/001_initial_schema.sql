-- Leaning Tree Rentals - Initial Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    rental_date DATE NOT NULL,
    time_slot TEXT NOT NULL CHECK (time_slot IN ('all_day', 'morning', 'afternoon')),
    cart_type TEXT NOT NULL CHECK (cart_type IN ('4_passenger', '6_passenger')),
    special_requests TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'denied', 'cancelled')),
    admin_notes TEXT,
    confirmed_at TIMESTAMPTZ,
    confirmation_email_sent BOOLEAN DEFAULT FALSE,
    request_email_sent BOOLEAN DEFAULT FALSE
);

-- Create index on rental_date for efficient queries
CREATE INDEX IF NOT EXISTS idx_reservations_rental_date ON reservations(rental_date);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert reservations (public form submission)
CREATE POLICY "Allow public reservation insert" ON reservations
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Policy: Allow authenticated users (admins) to view all reservations
CREATE POLICY "Allow authenticated users to view reservations" ON reservations
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Allow authenticated users (admins) to update reservations
CREATE POLICY "Allow authenticated users to update reservations" ON reservations
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy: Allow authenticated users (admins) to delete reservations
CREATE POLICY "Allow authenticated users to delete reservations" ON reservations
    FOR DELETE
    TO authenticated
    USING (true);

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant permissions on reservations table
GRANT INSERT ON reservations TO anon;
GRANT ALL ON reservations TO authenticated;
