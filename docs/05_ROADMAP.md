# 05 — Roadmap

Cinco fases. Cada fase tem critério de saída claro. Não pular fase.

## Marco atual — MVP v1

**Status:** entregue para deploy inicial na Vercel.  
**Desenvolvido por:** plreis.

Inclui fluxo operacional, RBAC inicial, dashboard de processos, onboarding por
papel, UI FCINCO, observações, jornadas, questionários, resultados, exportação
CSV e canal beta de feedback. Próximas iterações devem focar em PDF,
materialização de resultados, testes de RLS por papel e hardening para piloto.

## Fase 0 — Setup e fonte da verdade

**Objetivo:** ter o repositório navegável, banco vazio mas pronto, docs
estabelecidos, equipe alinhada com a planilha.

- [x] Scaffold Next.js + Supabase (template oficial).
- [x] Estrutura de pastas (`features/`, `lib/`, `supabase/`).
- [x] Documentação core (00–06).
- [x] Projeto Supabase Cloud criado.
- [x] `.env.local` configurado.
- [x] Migrations base aplicadas/validadas no fluxo de desenvolvimento.
- [x] App roda localmente com login do Supabase.

**Critério de saída:** desenvolvedor clona, segue `06_SETUP_SUPABASE.md`,
roda `pnpm dev`, faz login.

## Fase 1 — Banco metodológico

**Objetivo:** schema F5 completo no banco, seed do catálogo derivado da
planilha.

- [x] Migration `auth_orgs_profiles` + RLS.
- [x] Migration `catalog_f5` (categoria, tipo_comportamento, criterio_template,
  tipo_criterio, escala_avaliacao, glossario).
- [x] Migration `processes_journeys` (processo, jornada, passo_jornada,
  participante, protocolo_observacao, entrevista_pos_observacao).
- [x] Migration `questionnaires` (questionario_template, pergunta_template,
  questionario_resposta, resposta_item).
- [x] Migration `analysis_results` (resultado_analise + views auxiliares
  avaliacao_barreira, avaliacao_impacto, avaliacao_necessidade).
- [x] Migration `audit_log`.
- [x] Seed `seed_catalog.sql` com dados extraídos da planilha:
  categorias, tipos, critérios, perguntas, textos das notas, glossário,
  associações tipo↔critério.
- [x] Types manuais em `web/types/database.ts` espelhando as migrations.

**Critério de saída:** rodar `psql` e ver todas as tabelas, todos os
critérios da planilha, todas as perguntas, todas as policies. Nenhum dado
inventado — toda linha rastreável a uma célula da planilha.

## Fase 2 — Workflow FCINCO (telas operacionais)

**Objetivo:** equipe pesquisadora consegue executar a metodologia ponta-a-ponta.

Telas mínimas:
- [x] Login + perfil.
- [x] Lista/dashboard de processos com escopo correto.
- [x] Cadastro de processo + contexto.
- [x] Cadastro de jornada planejada estruturada.
- [x] Cadastro de participante.
- [x] Planejamento/protocolo de observação por participante.
- [x] Entrevista pós-observação.
- [x] Lançamento manual de jornada individual (ordem real, desvios,
  repetições, tempo).
- [x] Construção manual e consolidação automática da jornada padrão.
- [x] Questionário de barreiras por jornada.
- [x] Questionário de impactos por jornada (incluindo Necessidade).
- [x] Validação de jornada.
- [x] Painel de status/completude por processo.
- [x] Product tour por perfil (`admin`, `gestor`, `analista`, `visitante`).
- [x] Canal beta flutuante e painel privado de triagem para o admin do piloto.

**Critério de saída:** Janaina ou Wendel conseguem cadastrar um processo
real, três participantes, e responder os seis questionários sem precisar
de ajuda técnica.

## Fase 3 — Cálculo e gráficos reais

**Objetivo:** substituir heurística por cálculos reproduzíveis.

- [ ] Server Action `recalcularResultado(processo_id)` materializando em
  `resultado_analise`.
- [x] Queries iniciais para médias por critério e tempo total.
- [x] Página `/processos/[id]/resultados`.
- [x] Marcação visual de "sem dado" quando faltam respostas.
- [x] Comparação tempo planejada × individual × padrão.
- [x] Ranking operacional de sludge por etapa.
- [x] Tabela dinâmica de dimensionamento + CSV.

**Critério de saída:** todos os gráficos da planilha têm equivalente no
sistema, derivam de respostas reais, e batem numericamente com o
preenchimento manual da planilha em pelo menos um processo de teste.

## Fase 4 — Hardening e piloto

**Objetivo:** sistema utilizável em piloto com a equipe FCINCO.

- [ ] Cobertura de testes nas Server Actions críticas.
- [ ] Logs de auditoria em todas as mutações.
- [x] Relatório/CSV exportável.
- [ ] Relatório PDF exportável.
- [ ] Documentação operacional (manual do analista).
- [ ] Validação de RLS com smoke tests por papel.
- [ ] Fechar ciclo dos relatos beta: converter bugs/sugestões em issues,
  changelog ou decisões de backlog.
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
