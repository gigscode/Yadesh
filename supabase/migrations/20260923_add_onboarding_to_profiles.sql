-- Migration: Add Onboarding and User Preference Fields to Profiles
-- Run this in your Supabase SQL Editor to persist onboarding choices in the database.

alter table public.profiles
  add column if not exists onboarding_completed boolean default false,
  add column if not exists preferred_topics text[],
  add column if not exists preferred_authors text[],
  add column if not exists preferred_time text;

-- Index for checking onboarding status
create index if not exists profiles_onboarding_idx
  on public.profiles (onboarding_completed)
  where onboarding_completed is false;
