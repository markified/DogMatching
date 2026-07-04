create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  avatar_url text,
  location text,
  role text not null default 'member' check (role in ('owner', 'verifier', 'admin', 'member')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.users enable row level security;

drop policy if exists "Users can read own profile" on public.users;
create policy "Users can read own profile"
on public.users
for select
using (auth.uid() = auth_user_id);

drop policy if exists "Users can insert own profile" on public.users;
create policy "Users can insert own profile"
on public.users
for insert
to authenticated
with check (auth.uid() = auth_user_id);

drop policy if exists "Users can update own profile" on public.users;
create policy "Users can update own profile"
on public.users
for update
to authenticated
using (auth.uid() = auth_user_id)
with check (auth.uid() = auth_user_id);

create table if not exists public.owners (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id) on delete set null,
  display_name text not null,
  location text not null,
  avatar_url text,
  rating numeric(3, 1) not null default 0,
  review_count integer not null default 0,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint owners_display_name_location_key unique (display_name, location)
);

alter table public.owners enable row level security;

drop policy if exists "Public read owners" on public.owners;
create policy "Public read owners"
on public.owners
for select
using (true);

drop policy if exists "Authenticated insert owners" on public.owners;
create policy "Authenticated insert owners"
on public.owners
for insert
to authenticated
with check (true);

create table if not exists public.dogs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.owners(id) on delete set null,
  name text not null,
  breed text not null,
  age text not null,
  sex text not null check (sex in ('Male', 'Female')),
  size text not null check (size in ('Small', 'Medium', 'Large')),
  color text not null,
  temperament text[] not null default '{}',
  score integer not null default 0,
  verified boolean not null default false,
  tier integer not null default 1 check (tier in (1, 2, 3)),
  img text not null,
  rating numeric(3, 1) not null default 0,
  reviews integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.dogs enable row level security;

drop policy if exists "Public read dogs" on public.dogs;
create policy "Public read dogs"
on public.dogs
for select
using (true);

drop policy if exists "Authenticated insert dogs" on public.dogs;
create policy "Authenticated insert dogs"
on public.dogs
for insert
to authenticated
with check (true);

create table if not exists public.verifiers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id) on delete set null,
  name text not null,
  role text not null,
  clinic text not null,
  rating numeric(3, 1) not null default 0,
  available boolean not null default true,
  avatar text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.verifiers enable row level security;

drop policy if exists "Public read verifiers" on public.verifiers;
create policy "Public read verifiers"
on public.verifiers
for select
using (true);

drop policy if exists "Authenticated insert verifiers" on public.verifiers;
create policy "Authenticated insert verifiers"
on public.verifiers
for insert
to authenticated
with check (true);

create table if not exists public.match_requests (
  id uuid primary key default gen_random_uuid(),
  dog_id uuid not null references public.dogs(id) on delete cascade,
  requester_name text not null,
  requester_email text,
  requester_user_id uuid references public.users(id) on delete set null,
  message text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.match_requests enable row level security;

drop policy if exists "Authenticated insert match requests" on public.match_requests;
create policy "Authenticated insert match requests"
on public.match_requests
for insert
to authenticated
with check (true);

create table if not exists public.verifier_submissions (
  id uuid primary key default gen_random_uuid(),
  dog_id uuid not null references public.dogs(id) on delete cascade,
  verifier_name text not null,
  submission_type text not null,
  document_url text not null,
  verifier_user_id uuid references public.users(id) on delete set null,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.verifier_submissions enable row level security;

drop policy if exists "Authenticated insert verifier submissions" on public.verifier_submissions;
create policy "Authenticated insert verifier submissions"
on public.verifier_submissions
for insert
to authenticated
with check (true);

insert into public.owners (
  id, display_name, location, avatar_url, rating, review_count
)
values
  ('f1111111-1111-1111-1111-111111111111', 'Maria Santos', 'Buhangin, Davao City', 'MS', 4.8, 12),
  ('f2222222-2222-2222-2222-222222222222', 'Carlo Reyes', 'Matina, Davao City', 'CR', 4.5, 8),
  ('f3333333-3333-3333-3333-333333333333', 'Ana Lim', 'Toril, Davao City', 'AL', 4.2, 5),
  ('f4444444-4444-4444-4444-444444444444', 'Mark Villanueva', 'Agdao, Davao City', 'MV', 4.9, 17),
  ('f5555555-5555-5555-5555-555555555555', 'Jenny Cruz', 'Matina, Davao City', 'JC', 4.7, 9),
  ('f6666666-6666-6666-6666-666666666666', 'Ben Santos', 'Buhangin, Davao City', 'BS', 4.6, 14)
on conflict (id) do update set
  display_name = excluded.display_name,
  location = excluded.location,
  avatar_url = excluded.avatar_url,
  rating = excluded.rating,
  review_count = excluded.review_count,
  updated_at = now();

insert into public.dogs (
  id, owner_id, name, breed, age, sex, size, color, temperament, score, verified, tier,
  img, rating, reviews
)
values
  ('11111111-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111', 'Bella', 'Shih Tzu', '2 yrs', 'Female', 'Small', 'White & Brown', array['Friendly', 'Calm', 'Playful'], 94, true, 2, 'https://images.unsplash.com/photo-1629740067905-bd3f515aa739?w=600&fit=crop', 4.8, 12),
  ('22222222-2222-2222-2222-222222222222', 'f2222222-2222-2222-2222-222222222222', 'Choco', 'Golden Retriever', '3 yrs', 'Male', 'Large', 'Golden Brown', array['Friendly', 'Active', 'Playful'], 87, true, 2, 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600&fit=crop', 4.5, 8),
  ('33333333-3333-3333-3333-333333333333', 'f3333333-3333-3333-3333-333333333333', 'Luna', 'Golden Retriever', '1.5 yrs', 'Female', 'Large', 'Light Gold', array['Calm', 'Friendly'], 82, false, 1, 'https://images.unsplash.com/photo-1693615775129-f2004d6e3e0b?w=600&fit=crop', 4.2, 5),
  ('44444444-4444-4444-4444-444444444444', 'f4444444-4444-4444-4444-444444444444', 'Bruno', 'German Shepherd', '4 yrs', 'Male', 'Large', 'Black & Tan', array['Independent', 'Calm'], 79, true, 3, 'https://images.unsplash.com/photo-1637098063179-d73d8034621c?w=600&fit=crop', 4.9, 17),
  ('55555555-5555-5555-5555-555555555555', 'f5555555-5555-5555-5555-555555555555', 'Yuki', 'Pomeranian', '1 yr', 'Female', 'Small', 'White', array['Playful', 'Friendly', 'Active'], 91, true, 2, 'https://images.unsplash.com/photo-1721781060617-2c451646fee7?w=600&fit=crop', 4.7, 9),
  ('66666666-6666-6666-6666-666666666666', 'f6666666-6666-6666-6666-666666666666', 'Rex', 'Labrador Retriever', '3 yrs', 'Male', 'Large', 'Black', array['Friendly', 'Active'], 76, true, 3, 'https://images.unsplash.com/photo-1539692177343-b2b990faef15?w=600&fit=crop', 4.6, 14)
on conflict (id) do update set
  owner_id = excluded.owner_id,
  name = excluded.name,
  breed = excluded.breed,
  age = excluded.age,
  sex = excluded.sex,
  size = excluded.size,
  color = excluded.color,
  temperament = excluded.temperament,
  score = excluded.score,
  verified = excluded.verified,
  tier = excluded.tier,
  img = excluded.img,
  rating = excluded.rating,
  reviews = excluded.reviews,
  updated_at = now();

insert into public.verifiers (id, name, role, clinic, rating, available, avatar)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Dr. Patricia Reyes', 'Licensed Veterinarian', 'Davao Animal Clinic', 4.9, true, 'PR'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Dr. Eduardo Tan', 'Certified Breeder', 'Mindanao K9 Center', 4.8, true, 'ET'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Dr. Angela Flores', 'Licensed Veterinarian', 'City Pet Hospital', 4.7, false, 'AF')
on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  clinic = excluded.clinic,
  rating = excluded.rating,
  available = excluded.available,
  avatar = excluded.avatar,
  updated_at = now();
