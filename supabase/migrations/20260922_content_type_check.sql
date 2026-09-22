alter table public.content
  drop constraint if exists content_type_check;

alter table public.content
  add constraint content_type_check
  check (type in ('FAITH', 'MIRACLE', 'IDEA', 'LIFE', 'BOOK', 'HISTORY', 'TEACHING', 'STORY', 'PERSON'));