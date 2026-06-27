-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  role text default 'user' check (role in ('user', 'admin')),
  credits integer default 5,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- UPLOADS TABLE
create table public.uploads (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  original_url text not null,
  processed_url text,
  status text default 'processing' check (status in ('processing', 'completed', 'failed')),
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SUBSCRIPTIONS TABLE
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null unique,
  plan text default 'free' check (plan in ('free', 'pro')),
  active_until timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TRANSACTIONS TABLE
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  razorpay_order_id text not null,
  razorpay_payment_id text,
  amount integer not null,
  currency text default 'INR',
  status text default 'pending' check (status in ('pending', 'completed', 'failed')),
  credits_added integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- API KEYS TABLE
create table public.api_keys (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  api_key text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES
alter table public.users enable row level security;
alter table public.uploads enable row level security;
alter table public.subscriptions enable row level security;
alter table public.transactions enable row level security;
alter table public.api_keys enable row level security;

-- USERS
create policy "Users can view own profile" on public.users for select using (auth.uid() = id);
create policy "Admins can view all profiles" on public.users for select using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- UPLOADS
create policy "Users can view own uploads" on public.uploads for select using (auth.uid() = user_id);
create policy "Users can insert own uploads" on public.uploads for insert with check (auth.uid() = user_id);
create policy "Admins can view all uploads" on public.uploads for select using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);
-- Note: n8n webhook uses service role key to update uploads

-- TRIGGER FOR NEW USER
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  
  insert into public.subscriptions (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
