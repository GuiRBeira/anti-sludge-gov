# 05 — Roadmap

Cinco fases. Cada fase tem critério de saída claro. Não pular fase.

## Fase 0 — Setup e fonte da verdade (esta sessão)

**Objetivo:** ter o repositório navegável, banco vazio mas pronto, docs
estabelecidos, equipe alinhada com a planilha.

- [x] Scaffold Next.js + Supabase (template oficial).
- [x] Estrutura de pastas (`features/`, `lib/`, `supabase/`).
- [x] Documentação core (00–06).
- [ ] Projeto Supabase Cloud criado.
- [ ] `.env.local` configurado.
- [ ] Primeira migration aplicada (extensions, types).
- [ ] App roda localmente com login do Supabase.

**Critério de saída:** desenvolvedor clona, segue `06_SETUP_SUPABASE.md`,
roda `pnpm dev`, faz login.

## Fase 1 — Banco metodológico

**Objetivo:** schema F5 completo no banco, seed do catálogo derivado da
planilha.

- [ ] Migration `auth_orgs_profiles` + RLS.
- [ ] Migration `catalog_f5` (categoria, tipo_comportamento, criterio_template,
  tipo_criterio, escala_avaliacao, glossario).
- [ ] Migration `processes_journeys` (processo, jornada, passo_jornada,
  participante, protocolo_observacao, entrevista_pos_observacao).
- [ ] Migration `questionnaires` (questionario_template, pergunta_template,
  questionario_resposta, resposta_item).
- [ ] Migration `analysis_results` (resultado_analise + views auxiliares
  avaliacao_barreira, avaliacao_impacto, avaliacao_necessidade).
- [ ] Migration `audit_log`.
- [ ] Seed `seed_catalog.sql` com dados extraídos da planilha:
  categorias, tipos, critérios, perguntas, textos das notas, glossário,
  associações tipo↔critério.
- [ ] `supabase gen types typescript` rodando, types em `web/types/database.ts`.

**Critério de saída:** rodar `psql` e ver todas as tabelas, todos os
critérios da planilha, todas as perguntas, todas as policies. Nenhum dado
inventado — toda linha rastreável a uma célula da planilha.

## Fase 2 — Workflow FCINCO (telas operacionais)

**Objetivo:** equipe pesquisadora consegue executar a metodologia ponta-a-ponta.

Telas mínimas:
- [ ] Login + perfil + escolha de órgão.
- [ ] Lista de processos com escopo correto.
- [ ] Cadastro de processo + contexto.
- [ ] Cadastro de jornada planejada estruturada.
- [ ] Cadastro de participante + protocolo.
- [ ] Lançamento manual de jornada individual (ordem real, desvios,
  repetições, tempo).
- [ ] Construção da jornada padrão a partir das individuais.
- [ ] Questionário de barreiras por jornada.
- [ ] Questionário de impactos por jornada (incluindo Necessidade).
- [ ] Validação de jornada.
- [ ] Painel de status/completude por processo.

**Critério de saída:** Janaina ou Wendel conseguem cadastrar um processo
real, três participantes, e responder os seis questionários sem precisar
de ajuda técnica.

## Fase 3 — Cálculo e gráficos reais

**Objetivo:** substituir heurística por cálculos reproduzíveis.

- [ ] Server Action `recalcularResultado(processo_id)`.
- [ ] Views/queries para os 8 gráficos da planilha.
- [ ] Página `/processos/[id]/graficos` com filtros.
- [ ] Marcação visual de "sem dado" quando faltam respostas.
- [ ] Comparação tempo planejada × individual × padrão.
- [ ] Ranking de sludge por etapa.

**Critério de saída:** todos os gráficos da planilha têm equivalente no
sistema, derivam de respostas reais, e batem numericamente com o
preenchimento manual da planilha em pelo menos um processo de teste.

## Fase 4 — Hardening e piloto

**Objetivo:** sistema utilizável em piloto com a equipe FCINCO.

- [ ] Cobertura de testes nas Server Actions críticas.
- [ ] Logs de auditoria em todas as mutações.
- [ ] Relatório PDF/CSV exportável.
- [ ] Documentação operacional (manual do analista).
- [ ] Validação de RLS com smoke tests por papel.
- [ ] Setup de CI (lint + typecheck + build).
- [ ] Deploy de produção (Vercel + Supabase Cloud).

**Critério de saída:** piloto rodando com pelo menos 2 órgãos reais e
3 processos cadastrados.

## Fase 5 (futuro) — Recursos avançados

Fora do MVP. Tratar como backlog separado.

- [ ] Re-integração da extensão (`apps/extension` do projeto antigo) como
  evidência opcional, com vínculo a passos.
- [ ] Auditoria automatizada por NLP/grafo (DRS do TCC).
- [ ] SSO institucional / gov.br.
- [ ] Painel de calibragem de pesos.
- [ ] Comparação cross-serviço.
