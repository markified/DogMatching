create extension if not exists pgcrypto;

create table if not exists public.dogs (
  id uuid primary key default gen_random_uuid(),
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
  owner_name text not null,
  owner_location text not null,
  owner_avatar text not null,
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

insert into public.dogs (
  id, name, breed, age, sex, size, color, temperament, score, verified, tier,
  owner_name, owner_location, owner_avatar, img, rating, reviews
)
values
  ('11111111-1111-1111-1111-111111111111', 'Bella', 'Shih Tzu', '2 yrs', 'Female', 'Small', 'White & Brown', array['Friendly', 'Calm', 'Playful'], 94, true, 2, 'Maria Santos', 'Buhangin, Davao City', 'MS', 'https://images.unsplash.com/photo-1629740067905-bd3f515aa739?w=600&fit=crop', 4.8, 12),
  ('22222222-2222-2222-2222-222222222222', 'Choco', 'Golden Retriever', '3 yrs', 'Male', 'Large', 'Golden Brown', array['Friendly', 'Active', 'Playful'], 87, true, 2, 'Carlo Reyes', 'Matina, Davao City', 'CR', 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600&fit=crop', 4.5, 8),
  ('33333333-3333-3333-3333-333333333333', 'Luna', 'Golden Retriever', '1.5 yrs', 'Female', 'Large', 'Light Gold', array['Calm', 'Friendly'], 82, false, 1, 'Ana Lim', 'Toril, Davao City', 'AL', 'https://images.unsplash.com/photo-1693615775129-f2004d6e3e0b?w=600&fit=crop', 4.2, 5),
  ('44444444-4444-4444-4444-444444444444', 'Bruno', 'German Shepherd', '4 yrs', 'Male', 'Large', 'Black & Tan', array['Independent', 'Calm'], 79, true, 3, 'Mark Villanueva', 'Agdao, Davao City', 'MV', 'https://images.unsplash.com/photo-1637098063179-d73d8034621c?w=600&fit=crop', 4.9, 17),
  ('55555555-5555-5555-5555-555555555555', 'Yuki', 'Pomeranian', '1 yr', 'Female', 'Small', 'White', array['Playful', 'Friendly', 'Active'], 91, true, 2, 'Jenny Cruz', 'Matina, Davao City', 'JC', 'https://images.unsplash.com/photo-1721781060617-2c451646fee7?w=600&fit=crop', 4.7, 9),
  ('66666666-6666-6666-6666-666666666666', 'Rex', 'Labrador Retriever', '3 yrs', 'Male', 'Large', 'Black', array['Friendly', 'Active'], 76, true, 3, 'Ben Santos', 'Buhangin, Davao City', 'BS', 'https://images.unsplash.com/photo-1539692177343-b2b990faef15?w=600&fit=crop', 4.6, 14)
on conflict (id) do update set
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
  owner_name = excluded.owner_name,
  owner_location = excluded.owner_location,
  owner_avatar = excluded.owner_avatar,
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