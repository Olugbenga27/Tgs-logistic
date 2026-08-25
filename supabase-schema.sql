-- ============================================================
-- T.S.G GRATEFUL LOGISTICS LTD — Supabase Schema
-- Run this in the Supabase SQL Editor to set up all tables.
-- ============================================================

-- 0. Enable required extensions
create extension if not exists "uuid-ossp";

-- 1. ADMIN PROFILES (extends auth.users)
create table public.admin_profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null,
  email       text not null,
  role        text not null default 'operator' check (role in ('super_admin','admin','manager','operator')),
  avatar_url  text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2. CUSTOMERS
create table public.customers (
  id              uuid primary key default uuid_generate_v4(),
  full_name       text not null,
  email           text not null,
  phone           text,
  company         text,
  address         text,
  city            text,
  country         text,
  segment         text default 'retail' check (segment in ('retail','corporate','sme','enterprise')),
  status          text default 'active' check (status in ('active','inactive','pending','blocked')),
  total_shipments integer not null default 0,
  total_spent     numeric(12,2) not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- 3. BOOKINGS / SHIPMENTS
create table public.bookings (
  id                uuid primary key default uuid_generate_v4(),
  booking_id        text unique not null,
  tracking_number   text unique not null,

  -- Customer
  customer_id       uuid references public.customers(id) on delete set null,
  customer_name     text,
  customer_email    text,
  customer_phone    text,

  -- Sender
  sender_name       text,
  sender_address    text,
  sender_city       text,
  sender_country    text,

  -- Receiver
  receiver_name     text,
  receiver_address  text,
  receiver_city     text,
  receiver_country  text,

  -- Package
  package_type      text check (package_type in ('document','parcel','box','pallet','container','fragile')),
  package_desc      text,
  weight_kg         numeric(8,2),
  length_cm         numeric(8,2),
  width_cm          numeric(8,2),
  height_cm         numeric(8,2),

  -- Shipping
  shipping_method   text check (shipping_method in ('air','sea','road','express')),
  courier_name      text,
  estimated_delivery date,
  price             numeric(12,2),
  payment_status    text default 'pending' check (payment_status in ('paid','pending','failed','refunded')),

  -- Status
  status            text default 'pending' check (status in (
    'pending','picked_up','in_transit','at_sorting_facility',
    'customs_clearance','out_for_delivery','delivered','cancelled'
  )),

  -- Dates
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- 4. SHIPMENT TRACKING EVENTS
create table public.tracking_events (
  id              uuid primary key default uuid_generate_v4(),
  booking_id      uuid references public.bookings(id) on delete cascade not null,
  tracking_number text not null,
  status          text not null,
  location        text,
  note            text,
  event_date      date not null default current_date,
  event_time      time not null default current_time,
  created_at      timestamptz not null default now()
);

-- 5. PAYMENTS
create table public.payments (
  id              uuid primary key default uuid_generate_v4(),
  reference       text unique not null,
  booking_id      uuid references public.bookings(id) on delete set null,
  customer_id     uuid references public.customers(id) on delete set null,
  customer_name   text,
  invoice_number  text,
  description     text,
  amount          numeric(12,2) not null,
  fee             numeric(12,2) default 0,
  method          text check (method in ('card','bank_transfer','mobile_money','cash')),
  status          text default 'pending' check (status in ('paid','pending','failed','refunded')),
  created_at      timestamptz not null default now()
);

-- 6. SERVICES
create table public.services (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  slug        text unique not null,
  description text,
  is_active   boolean not null default true,
  sort_order  integer default 0,
  created_at  timestamptz not null default now()
);

-- 7. MESSAGES (contact form / support)
create table public.messages (
  id          uuid primary key default uuid_generate_v4(),
  full_name   text not null,
  email       text not null,
  subject     text,
  body        text not null,
  is_read     boolean not null default false,
  replied_at  timestamptz,
  created_at  timestamptz not null default now()
);

-- 8. SETTINGS
create table public.settings (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_bookings_customer on public.bookings(customer_id);
create index idx_bookings_status on public.bookings(status);
create index idx_bookings_tracking on public.bookings(tracking_number);
create index idx_bookings_created on public.bookings(created_at desc);

create index idx_tracking_booking on public.tracking_events(booking_id);
create index idx_tracking_number on public.tracking_events(tracking_number);

create index idx_customers_email on public.customers(email);
create index idx_customers_status on public.customers(status);

create index idx_payments_customer on public.payments(customer_id);
create index idx_payments_status on public.payments(status);
create index idx_payments_created on public.payments(created_at desc);

create index idx_messages_read on public.messages(is_read);
create index idx_messages_created on public.messages(created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.admin_profiles enable row level security;
alter table public.customers enable row level security;
alter table public.bookings enable row level security;
alter table public.tracking_events enable row level security;
alter table public.payments enable row level security;
alter table public.services enable row level security;
alter table public.messages enable row level security;
alter table public.settings enable row level security;

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.admin_profiles
    where id = auth.uid() and is_active = true
  );
$$;

-- Admin profiles: users can read/update their own
create policy "Admin read own profile"
  on public.admin_profiles for select
  using (auth.uid() = id);

create policy "Admin update own profile"
  on public.admin_profiles for update
  using (auth.uid() = id);

-- All admin tables: only authenticated admins can CRUD
create policy "Admins full access customers"
  on public.customers for all
  using (public.is_admin());

create policy "Admins full access bookings"
  on public.bookings for all
  using (public.is_admin());

create policy "Admins full access tracking"
  on public.tracking_events for all
  using (public.is_admin());

create policy "Admins full access payments"
  on public.payments for all
  using (public.is_admin());

create policy "Admins full access services"
  on public.services for all
  using (public.is_admin());

create policy "Admins full access messages"
  on public.messages for all
  using (public.is_admin());

create policy "Admins full access settings"
  on public.settings for all
  using (public.is_admin());

-- Public read access for services and tracking (for customer-facing pages)
create policy "Public read services"
  on public.services for select
  using (is_active = true);

create policy "Public read tracking"
  on public.tracking_events for select
  using (true);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.admin_profiles
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.customers
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.bookings
  for each row execute function public.handle_updated_at();

-- ============================================================
-- AUTO-CREATE ADMIN PROFILE ON SIGNUP
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.admin_profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- BOOKING ID & TRACKING NUMBER GENERATORS
-- ============================================================
create or replace function public.generate_booking_id()
returns trigger
language plpgsql
as $$
begin
  if new.booking_id is null or new.booking_id = '' then
    new.booking_id := 'TSG-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substring(md5(random()::text) from 1 for 6));
  end if;
  return new;
end;
$$;

create trigger trg_booking_id before insert on public.bookings
  for each row execute function public.generate_booking_id();

create or replace function public.generate_tracking_number()
returns trigger
language plpgsql
as $$
begin
  if new.tracking_number is null or new.tracking_number = '' then
    new.tracking_number := 'TSG-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substring(md5(random()::text) from 1 for 6));
  end if;
  return new;
end;
$$;

create trigger trg_tracking_number before insert on public.bookings
  for each row execute function public.generate_tracking_number();

-- ============================================================
-- SEED: Default admin settings
-- ============================================================
insert into public.settings (key, value) values
  ('company_name', '"T.S.G Grateful Logistics Ltd"'),
  ('company_email', '"Gratefullogisticsotm@gmail.com"'),
  ('company_phone', '"+233 30 245 8890"'),
  ('company_address', '"Independence Ave, Accra, Ghana"'),
  ('timezone', '"Africa/Accra"'),
  ('currency', '"USD"')
on conflict (key) do nothing;
