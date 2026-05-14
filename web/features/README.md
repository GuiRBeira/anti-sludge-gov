# features/

Cada subpasta é um **módulo de domínio**. A pasta guarda Server Actions,
queries e regras diretamente ligadas à metodologia F5 ou à operação do MVP.
Componentes UI genéricos ficam em `../components/ui/`; componentes visuais
reutilizáveis do método ficam em `../components/fcinco/`.

## Módulos no MVP v1

| Pasta | Cobertura | Estado atual |
|---|---|---|
| `auth/` | Sessão, perfil e papel global | implementado via `lib/auth` + telas `app/auth` |
| `orgs/` | Órgãos, membros, papéis e permissões de visitante | implementado |
| `catalog/` | Categorias, tipos, critérios e glossário F5 | implementado em `/catalogo` |
| `processes/` | Processo, contexto e metadados | implementado |
| `journeys/` | Jornadas planejada, individual, padrão e passos | implementado, incluindo consolidação automática da padrão |
| `questionnaires/` | Templates, perguntas, respostas 1-5, N/A e conclusão | implementado |
| `observations/` | Participantes, protocolos e entrevista pós-observação | implementado |
| `analysis/` | Médias, tabela dinâmica, ranking de sludge e tempos | parcial; materialização em `resultado_analise` pendente |
| `reporting/` | Gráficos, relatório e exportação | parcial; CSV implementado, PDF pendente |
| `feedback/` | Canal beta de bugs/sugestões dos testers | implementado |

## Convenções

- Server Actions ficam em `actions.ts`.
- Queries server-side ficam em `queries.ts`.
- Validação Zod fica em `web/lib/validators/` quando é compartilhada por tela
  e ação.
- Regras de permissão ficam em `web/lib/auth/` e no RLS do Supabase.
- Se duas features precisam do mesmo helper, ele sobe para `web/lib/`.

## Estrutura sugerida

```
features/<modulo>/
├── README.md
├── actions.ts
├── queries.ts
├── components/
└── types.ts
```
