# CLAUDE.md — Guia para Claude Code

Este arquivo orienta o Claude Code (e qualquer assistente IA) ao trabalhar neste repositório.

## Contexto

Este é o **reset metodológico** do Anti-Sludge Gov. A versão antiga está em
`../anti-sludge-gov/` e tem código aproveitável **visualmente**, mas o domínio
estava desalinhado com a metodologia F5. A justificativa do recomeço está na
auditoria em `../AUDITORIA_PRODUTO_TECNICA_2026-05-09.md`.

## Fonte da verdade

A planilha `../F5 - Mapeamento Anti-Sludge_02.04 (1).xlsx` é o **contrato
metodológico** do MVP. Toda regra de cálculo, lista de critérios, escala de
notas, pergunta de questionário e gráfico final devem sair dela — não inventar.

Quando estiver em dúvida sobre uma regra, consulte a planilha antes de
implementar. O mapa em `docs/03_MAPA_PLANILHA_SISTEMA.md` é a tabela viva de
cobertura.

## Regras de ouro

1. **Não introduzir heurística silenciosa.** Cálculo só a partir das respostas
   reais dos questionários. Se não houver dado, mostrar "sem dado", nunca
   estimar mascarado de resultado.
2. **Não tocar em `apps/extension`** (do projeto antigo). A extensão está fora
   do escopo do MVP. Retomar só depois que a planilha estiver 100% coberta.
3. **Schema Supabase é versionado.** Toda mudança de banco vira uma migration
   numerada em `supabase/migrations/`. Nada de alterar tabelas direto pelo
   painel do Supabase em produção.
4. **Server Actions / Route Handlers para escrita.** O browser não fala
   diretamente com tabelas sensíveis — passa pelo servidor Next.js, que
   valida com Zod e usa Supabase com a sessão do usuário (RLS aplica).
5. **RLS sempre ligado.** Toda tabela nova nasce com `enable row level security`
   e policies explícitas. Sem policy = sem acesso.
6. **Toda resposta tem rastreabilidade.** Pergunta + versão + respondente +
   data + fonte. Não persistir resposta sem esses metadados.
7. **Privacidade do participante.** Participantes são anonimizados (código
   curto + perfil sociodemográfico mínimo). Nada de nome real, CPF, email.

## Estrutura do código

- `web/app/` — rotas Next.js. Páginas são server components por padrão; client
  components apenas quando precisam de interatividade.
- `web/features/<modulo>/` — lógica de domínio: server actions, queries,
  validators, componentes específicos do módulo. Cada feature tem README curto
  explicando o que cobre da metodologia.
- `web/lib/supabase/` — clients (browser, server, proxy). **Não criar outro
  client** — usar os existentes.
- `web/lib/validators/` — schemas Zod compartilhados.
- `web/types/` — types globais (incluindo Database gerado via Supabase CLI).
- `supabase/migrations/` — migrations SQL numeradas. Sempre criar nova, nunca
  editar uma já aplicada.

## Convenções

- **Idioma**: identifiers em português quando refletem domínio metodológico
  (`processo`, `etapa`, `jornada_individual`, `avaliacao_barreira`). Código
  técnico genérico em inglês (`createClient`, `fetchUser`).
- **Tabelas**: snake_case, singular (`processo`, `etapa`, `passo_jornada`).
- **Colunas**: snake_case, descritivas. FKs sempre como `<entidade>_id`.
- **Datas**: `timestamptz` no banco; `Date`/ISO string no TS.

## Sempre que adicionar uma feature

- Atualizar o mapa em `docs/03_MAPA_PLANILHA_SISTEMA.md` (de "parcial" para
  "completo" ou registrar o gap).
- Se a feature mexe em RBAC, atualizar `docs/04_RBAC.md` e a migration de
  policies.
- Se a feature consome uma aba da planilha que ainda não foi seedada, criar
  o seed antes da tela.

## Anti-padrões a evitar

- Misturar lógica de cálculo com endpoint de leitura (GET com side effect).
- Componentes "soltos" sem rota que os use (criava lixo no projeto antigo).
- Fallback heurístico mascarando ausência de resposta.
- Cadastrar um critério/pergunta direto no banco em vez de via seed/migration.
