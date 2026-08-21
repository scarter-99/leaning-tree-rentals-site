-- Leaning Tree Rentals - Keepalive heartbeat table
-- Run this in your Supabase SQL Editor after 001_initial_schema.sql
--
-- Free-tier Supabase projects auto-pause after 7 days with no API activity,
-- and are deleted after ~90 days paused. The /api/cron/keepalive route reads
-- this table on a daily Vercel cron so the project always registers activity.
-- One row, no real data.

CREATE TABLE IF NOT EXISTS keepalive (
    id SMALLINT PRIMARY KEY DEFAULT 1,
    last_checked_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT keepalive_single_row CHECK (id = 1)
);

-- Seed the single row the cron reads
INSERT INTO keepalive (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE keepalive ENABLE ROW LEVEL SECURITY;

-- Policy: the cron route authenticates with the anon key, so anon needs read
-- access. The row holds no sensitive data.
CREATE POLICY "Allow public keepalive read" ON keepalive
    FOR SELECT
    TO public
    USING (true);

-- Grant read permission (no insert/update/delete for anon)
GRANT SELECT ON keepalive TO anon;
GRANT SELECT ON keepalive TO authenticated;
