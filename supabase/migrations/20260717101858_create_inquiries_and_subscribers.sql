/*
# Create inquiries and subscribers tables for Savai Creative website

## Overview
Two tables to support the Savai Creative consultancy website:
1. `inquiries` — project inquiries from the contact form
2. `subscribers` — BUNI newsletter sign-ups

## New Tables

### inquiries
- `id` (uuid, primary key)
- `name` (text, not null) — visitor's name
- `email` (text, not null) — visitor's email
- `company` (text, nullable) — company name
- `service` (text, nullable) — which service tier they're interested in
- `message` (text, nullable) — project details
- `status` (text, default 'new')
- `created_at` (timestamptz, default now())

### subscribers
- `id` (uuid, primary key)
- `email` (text, unique, not null)
- `created_at` (timestamptz, default now())

## Security
- RLS enabled on both tables.
- Single-tenant (no sign-in), policies use `TO anon, authenticated`.
- INSERT open for form submissions, SELECT open for confirmation,
  UPDATE/DELETE restricted to authenticated (admin-only).
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  service text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_inquiries" ON inquiries;
CREATE POLICY "anon_select_inquiries" ON inquiries FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries" ON inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_inquiries" ON inquiries;
CREATE POLICY "auth_update_inquiries" ON inquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_inquiries" ON inquiries;
CREATE POLICY "auth_delete_inquiries" ON inquiries FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_subscribers" ON subscribers;
CREATE POLICY "anon_select_subscribers" ON subscribers FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_subscribers" ON subscribers;
CREATE POLICY "anon_insert_subscribers" ON subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_subscribers" ON subscribers;
CREATE POLICY "auth_delete_subscribers" ON subscribers FOR DELETE
  TO authenticated USING (true);
