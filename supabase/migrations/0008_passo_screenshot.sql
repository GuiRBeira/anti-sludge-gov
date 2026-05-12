-- 0008_passo_screenshot.sql
-- Adiciona campo screenshot_path em passo_jornada para armazenar print da
-- tela observada (1 imagem por passo). O arquivo em si fica no Supabase
-- Storage; a tabela guarda apenas o path.

alter table public.passo_jornada
  add column if not exists screenshot_path text;

comment on column public.passo_jornada.screenshot_path is
  'Path no bucket "passo-screenshots" do Supabase Storage. NULL se não há print anexado.';
