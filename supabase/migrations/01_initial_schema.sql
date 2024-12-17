-- Enable RLS (Row Level Security)
alter database postgres set "app.jwt_secret" to 'b5316d46-85a0-4e23-8d76-7b561eac00f6';

-- Create profiles table
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  city text not null,
  district text,
  total_caciks integer default 0,
  average_time integer default 0,
  best_time integer default 0,
  last_cacik_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create sessions table
create table cacik_sessions (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade not null,
  duration integer not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create friendships table
create table friendships (
  id uuid primary key default uuid_generate_v4(),
  requester_id uuid references profiles(id) on delete cascade not null,
  addressee_id uuid references profiles(id) on delete cascade not null,
  status text check (status in ('pending', 'accepted', 'rejected')) not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(requester_id, addressee_id)
);

-- Create active_sessions table
create table active_sessions (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade not null,
  start_time timestamp with time zone default timezone('utc'::text, now()) not null,
  last_update timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create earned_badges table
create table earned_badges (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade not null,
  badge_id text not null,
  earned_date timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(profile_id, badge_id)
);

-- Enable RLS on tables
alter table profiles enable row level security;
alter table cacik_sessions enable row level security;
alter table friendships enable row level security;
alter table active_sessions enable row level security;
alter table earned_badges enable row level security;

-- Create RLS policies
-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Cacik sessions policies
create policy "Users can view their own sessions"
  on cacik_sessions for select
  using (auth.uid() = profile_id);

create policy "Users can insert their own sessions"
  on cacik_sessions for insert
  with check (auth.uid() = profile_id);

-- Friendships policies
create policy "Users can view their own friendships"
  on friendships for select
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

create policy "Users can request friendships"
  on friendships for insert
  with check (auth.uid() = requester_id);

create policy "Users can update their friendship status"
  on friendships for update
  using (auth.uid() = addressee_id);

-- Active sessions policies
create policy "Active sessions are viewable by everyone"
  on active_sessions for select
  using (true);

create policy "Users can manage their own active sessions"
  on active_sessions for all
  using (auth.uid() = profile_id);

-- Earned badges policies
create policy "Earned badges are viewable by everyone"
  on earned_badges for select
  using (true);

create policy "Users can earn their own badges"
  on earned_badges for insert
  with check (auth.uid() = profile_id);

-- Create functions and triggers
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, city, district)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'city', new.raw_user_meta_data->>'district');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();