-- 0002_seed_questionarios.sql
-- Cria os templates de questionário do MVP e gera as perguntas a partir
-- dos critérios já seedados (0001_seed_catalog_f5.sql).
-- Idempotente.

-- ============================================================
-- Templates de questionário
-- ============================================================

insert into public.questionario_template (codigo, versao, nome, descricao, aplicavel_a, dimensao) values
  ('Q_BARREIRAS_PLANEJADA', 1, 'Dimensionamento de Barreiras (Jornada Planejada)',
   'Avaliação de barreiras por etapa da jornada planejada (planilha 4.1).',
   'jornada_planejada', 'barreira'),
  ('Q_BARREIRAS_INDIVIDUAL', 1, 'Dimensionamento de Barreiras (Jornada Individual)',
   'Avaliação de barreiras por passo da jornada individual.',
   'jornada_individual', 'barreira'),
  ('Q_IMPACTOS_PLANEJADA', 1, 'Dimensionamento de Impactos (Jornada Planejada)',
   'Avaliação de Carga Cognitiva, Emoção e Consequência por etapa (planilha 4.2).',
   'jornada_planejada', 'impacto'),
  ('Q_IMPACTOS_INDIVIDUAL', 1, 'Dimensionamento de Impactos (Jornada Individual)',
   'Avaliação de Carga Cognitiva, Emoção e Consequência por passo.',
   'jornada_individual', 'impacto'),
  ('Q_NECESSIDADE_PLANEJADA', 1, 'Avaliação de Necessidade (Jornada Planejada)',
   'Necessidade — uma vez por jornada inteira (não por etapa).',
   'jornada_planejada', 'necessidade'),
  ('Q_NECESSIDADE_INDIVIDUAL', 1, 'Avaliação de Necessidade (Jornada Individual)',
   'Necessidade — uma vez por jornada inteira (não por passo).',
   'jornada_individual', 'necessidade')
on conflict (codigo, versao) do update set
  nome = excluded.nome,
  descricao = excluded.descricao,
  aplicavel_a = excluded.aplicavel_a,
  dimensao = excluded.dimensao;

-- ============================================================
-- Perguntas: gerar a partir dos critérios.
-- Para cada questionário de barreiras, criar 1 pergunta por critério-B.
-- Para cada questionário de impacto (não-necessidade), 1 por critério-I
-- exceto Necessidade. Para o de necessidade, só o critério Necessidade.
-- ============================================================

-- Limpar perguntas dos templates do MVP (idempotência segura — ainda não há
-- respostas porque o sistema é novo; quando houver, criar nova versão de template).
delete from public.pergunta_template
where questionario_template_id in (
  select id from public.questionario_template
  where codigo in (
    'Q_BARREIRAS_PLANEJADA','Q_BARREIRAS_INDIVIDUAL',
    'Q_IMPACTOS_PLANEJADA','Q_IMPACTOS_INDIVIDUAL',
    'Q_NECESSIDADE_PLANEJADA','Q_NECESSIDADE_INDIVIDUAL'
  ) and versao = 1
);

-- Barreiras (planejada e individual)
insert into public.pergunta_template (
  questionario_template_id, criterio_template_id, texto, ordem,
  tipo_resposta, permite_nao_se_aplica, permite_observacao
)
select
  qt.id,
  ct.id,
  ct.pergunta_padrao,
  ct.ordem,
  'escala_1_5'::tipo_resposta,
  true,
  true
from public.questionario_template qt
cross join public.criterio_template ct
where qt.codigo in ('Q_BARREIRAS_PLANEJADA','Q_BARREIRAS_INDIVIDUAL')
  and qt.versao = 1
  and ct.dimensao = 'barreira'
  and ct.ativo = true;

-- Impactos: Carga Cognitiva, Emoção, Consequência (sem Necessidade)
insert into public.pergunta_template (
  questionario_template_id, criterio_template_id, texto, ordem,
  tipo_resposta, permite_nao_se_aplica, permite_observacao
)
select
  qt.id,
  ct.id,
  ct.pergunta_padrao,
  ct.ordem,
  'escala_1_5'::tipo_resposta,
  true,
  true
from public.questionario_template qt
cross join public.criterio_template ct
where qt.codigo in ('Q_IMPACTOS_PLANEJADA','Q_IMPACTOS_INDIVIDUAL')
  and qt.versao = 1
  and ct.dimensao = 'impacto'
  and ct.subdimensao_impacto in ('carga_cognitiva','emocao','consequencia')
  and ct.ativo = true;

-- Necessidade
insert into public.pergunta_template (
  questionario_template_id, criterio_template_id, texto, ordem,
  tipo_resposta, permite_nao_se_aplica, permite_observacao
)
select
  qt.id,
  ct.id,
  ct.pergunta_padrao,
  1,
  'escala_1_5'::tipo_resposta,
  true,
  true
from public.questionario_template qt
cross join public.criterio_template ct
where qt.codigo in ('Q_NECESSIDADE_PLANEJADA','Q_NECESSIDADE_INDIVIDUAL')
  and qt.versao = 1
  and ct.dimensao = 'impacto'
  and ct.subdimensao_impacto = 'necessidade'
  and ct.ativo = true;
