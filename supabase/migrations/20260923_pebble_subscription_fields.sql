-- Migration: Add Pebble Payment Gateway Subscription Fields to Profiles
-- Run this in your Supabase SQL Editor if not already executed.

alter table public.profiles
  add column if not exists is_premium boolean not null default false,
  add column if not exists premium_since timestamptz,
  add column if not exists pebble_customer_id text,
  add column if not exists pebble_subscription_id text;

-- Index for fast webhook lookup by customer ID
create index if not exists profiles_pebble_customer_id_idx
  on public.profiles (pebble_customer_id)
  where pebble_customer_id is not null;

-- Index for fast webhook lookup by email
create index if not exists profiles_email_idx
  on public.profiles (email)
  where email is not null;
