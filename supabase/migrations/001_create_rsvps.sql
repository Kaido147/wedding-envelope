create table public.rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (char_length(guest_name) between 1 and 100),
  normalized_guest_name text not null unique check (char_length(normalized_guest_name) between 1 and 100),
  bringing_plus_one boolean not null default false,
  companion_name text check (companion_name is null or char_length(companion_name) between 1 and 100),
  party_size smallint generated always as (case when bringing_plus_one then 2 else 1 end) stored check (party_size in (1, 2)),
  status text not null default 'confirmed' check (status = 'confirmed'),
  created_at timestamptz not null default now(),
  check (not bringing_plus_one or party_size = 2),
  check (bringing_plus_one or companion_name is null)
);

create index rsvps_confirmed_created_at_idx on public.rsvps (created_at) where status = 'confirmed';

alter table public.rsvps enable row level security;
