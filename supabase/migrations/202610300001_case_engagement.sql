create table public.case_counters (
  slug text primary key,
  views bigint not null default 0 check (views >= 0),
  likes bigint not null default 0 check (likes >= 0)
);
insert into public.case_counters (slug) values
  ('parametr'), ('adc'), ('postcraft'), ('babank'),
  ('pik_hr'), ('adc_hub'), ('mailru'), ('dada');

create table public.case_likes (
  project_slug text not null references public.case_counters(slug),
  user_id uuid not null references auth.users(id),
  primary key (project_slug, user_id)
);
create table public.case_views (
  project_slug text not null references public.case_counters(slug),
  user_id uuid not null references auth.users(id),
  viewed_on date not null default (timezone('UTC', now())::date),
  primary key (project_slug, user_id, viewed_on)
);
create index case_likes_visitor_idx on public.case_likes(user_id);
alter table public.case_counters enable row level security;
alter table public.case_likes enable row level security;
alter table public.case_views enable row level security;
revoke all on public.case_counters, public.case_likes, public.case_views from public, anon, authenticated;
grant select on public.case_counters to anon, authenticated;
grant select on public.case_likes to authenticated;
create policy "Read public totals" on public.case_counters for select to anon, authenticated using (true);
create policy "Read own likes" on public.case_likes for select to authenticated using ((select auth.uid()) = user_id);

create function public.record_case_view(p_slug text)
returns table (slug text, views bigint, likes bigint, liked boolean)
language plpgsql security definer set search_path = '' as $$
declare visitor uuid := auth.uid(); inserted integer;
begin
  if visitor is null then raise exception 'Authentication required' using errcode = '28000'; end if;
  -- Lock totals before event rows to serialize increments and avoid deadlocks.
  perform 1 from public.case_counters c where c.slug = p_slug for update;
  if not found then raise exception 'Unknown case' using errcode = '22023'; end if;
  insert into public.case_views (project_slug, user_id) values (p_slug, visitor) on conflict do nothing;
  get diagnostics inserted = row_count;
  if inserted = 1 then update public.case_counters c set views = c.views + 1 where c.slug = p_slug; end if;
  return query select c.slug, c.views, c.likes,
    exists(select 1 from public.case_likes l where l.project_slug = p_slug and l.user_id = visitor)
    from public.case_counters c where c.slug = p_slug;
end;
$$;

create function public.set_case_like(p_slug text, p_liked boolean)
returns table (slug text, views bigint, likes bigint, liked boolean)
language plpgsql security definer set search_path = '' as $$
declare visitor uuid := auth.uid(); changed integer;
begin
  if visitor is null then raise exception 'Authentication required' using errcode = '28000'; end if;
  if p_liked is null then raise exception 'Like state required' using errcode = '22023'; end if;
  perform 1 from public.case_counters c where c.slug = p_slug for update;
  if not found then raise exception 'Unknown case' using errcode = '22023'; end if;
  if p_liked then
    insert into public.case_likes (project_slug, user_id) values (p_slug, visitor) on conflict do nothing;
    get diagnostics changed = row_count;
    if changed = 1 then update public.case_counters c set likes = c.likes + 1 where c.slug = p_slug; end if;
  else
    delete from public.case_likes l where l.project_slug = p_slug and l.user_id = visitor;
    get diagnostics changed = row_count;
    if changed = 1 then update public.case_counters c set likes = c.likes - 1 where c.slug = p_slug; end if;
  end if;
  return query select c.slug, c.views, c.likes,
    exists(select 1 from public.case_likes l where l.project_slug = p_slug and l.user_id = visitor)
    from public.case_counters c where c.slug = p_slug;
end;
$$;
revoke all on function public.record_case_view(text), public.set_case_like(text, boolean) from public, anon, authenticated;
grant execute on function public.record_case_view(text), public.set_case_like(text, boolean) to authenticated;
