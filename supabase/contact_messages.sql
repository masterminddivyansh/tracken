-- TRACKEN contact inbox
-- Run this once in Supabase SQL Editor before testing the public Contact form.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new','read')),
  created_at timestamptz not null default now(),
  read_at timestamptz
);

alter table public.contact_messages enable row level security;

-- Public visitors may submit messages, but cannot read or modify messages.
drop policy if exists "contact_messages_public_insert" on public.contact_messages;
create policy "contact_messages_public_insert"
on public.contact_messages
for insert
to anon, authenticated
with check (
  length(trim(name)) between 1 and 120
  and length(trim(email)) between 3 and 320
  and length(trim(subject)) between 1 and 240
  and length(trim(message)) between 1 and 10000
);

-- Admins can read messages. This follows the existing TRACKEN admin_users table.
drop policy if exists "contact_messages_admin_select" on public.contact_messages;
create policy "contact_messages_admin_select"
on public.contact_messages
for select
to authenticated
using (
  exists (
    select 1 from public.admin_users a
    where a.user_id = auth.uid()
  )
);

-- Admins can mark messages read/update them.
drop policy if exists "contact_messages_admin_update" on public.contact_messages;
create policy "contact_messages_admin_update"
on public.contact_messages
for update
to authenticated
using (
  exists (select 1 from public.admin_users a where a.user_id = auth.uid())
)
with check (
  exists (select 1 from public.admin_users a where a.user_id = auth.uid())
);

-- Admins can delete messages.
drop policy if exists "contact_messages_admin_delete" on public.contact_messages;
create policy "contact_messages_admin_delete"
on public.contact_messages
for delete
to authenticated
using (
  exists (select 1 from public.admin_users a where a.user_id = auth.uid())
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);
create index if not exists contact_messages_status_idx on public.contact_messages (status);
