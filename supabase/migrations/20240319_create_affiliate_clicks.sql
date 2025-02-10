create table affiliate_clicks (
  id uuid default uuid_generate_v4() primary key,
  provider_id text not null,
  user_id uuid references auth.users(id),
  questionnaire_id uuid,
  clicked_at timestamp with time zone default timezone('utc'::text, now()),
  source_page text,
  utm_params jsonb,
  user_agent text,
  ip_address text
);

-- Add RLS policies
alter table affiliate_clicks enable row level security;

-- Allow inserts from authenticated users
create policy "Anyone can insert clicks"
  on affiliate_clicks for insert
  with check (true);

-- Only allow users to view their own clicks
create policy "Users can view own clicks"
  on affiliate_clicks for select
  using (user_id = auth.uid());
