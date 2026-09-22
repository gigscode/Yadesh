-- Add premium subscription fields to profiles
-- is_premium: toggled true by webhook after successful Lemon Squeezy payment
-- premium_since: timestamp when premium was activated
-- ls_customer_id: Lemon Squeezy customer ID for webhook matching (set at payment time)

alter table public.profiles
  add column if not exists is_premium boolean not null default false,
  add column if not exists premium_since timestamptz,
  add column if not exists ls_customer_id text;

-- Index for webhook lookups by Lemon Squeezy customer ID
create index if not exists profiles_ls_customer_id_idx
  on public.profiles (ls_customer_id)
  where ls_customer_id is not null;

-- RLS: allow users to read their own premium status
-- (existing SELECT policy on profiles already covers this)
-- No additional policies needed: only service_role (webhook) writes is_premium
