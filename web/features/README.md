# features/

Cada subpasta é um **módulo de domínio**. A regra:

- Tudo relacionado a um conceito da metodologia F5 vive aqui dentro:
  server actions, queries, validators Zod, componentes específicos.
- Componentes UI **genéricos** (botão, card, input, modal padrão) ficam em
  `../components/ui/`. Componentes específicos de uma feature ficam em
  `features/<modulo>/components/`.
- Não importar de outra feature livremente. Se duas features precisam do
  mesmo helper, ele sobe para `lib/`.

## Módulos

| Pasta | Cobertura | Status |
|---|---|---|
| `auth/` | Sessão, perfil, papel global | esqueleto |
| `orgs/` | Órgãos, membros, processo_permissao | esqueleto |
| `catalog/` | Categorias, tipos, critérios, escalas, glossário | esqueleto |
| `processes/` | Processo + contexto | esqueleto |
| `journeys/` | Jornadas (planejada, individual, padrão) e passos | esqueleto |
| `questionnaires/` | Templates, perguntas, respostas | esqueleto |
| `observations/` | Participantes, protocolos, entrevistas | esqueleto |
| `analysis/` | Avaliações, cálculo, resultados | esqueleto |
| `reporting/` | Gráficos, exportação | esqueleto |

## Estrutura interna sugerida

```
features/<modulo>/
├── README.md            # O que cobre da metodologia
├── actions.ts           # Server Actions (mutações)
├── queries.ts           # Funções de leitura
├── schema.ts            # Schemas Zod
├── components/          # Componentes específicos
└── types.ts             # Types derivados
```
