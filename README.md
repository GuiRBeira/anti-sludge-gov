# Anti-Sludge Gov - New Stack

Reescrita do Anti-Sludge Gov com foco em fidelidade total à metodologia F5 da CINCO/MGI.

A decisão de recomeçar e a stack escolhida estão justificadas na auditoria original em `../AUDITORIA_PRODUTO_TECNICA_2026-05-09.md` (raiz de `PROJ-EXT-GOV/`).

## Stack

- **Next.js 16 (App Router)** — full-stack web app, Server Actions e Route Handlers para regras de escrita.
- **Supabase Cloud** — Auth (email/senha), Postgres e Row Level Security.
- **TypeScript + Tailwind + shadcn/ui** — UI tipada e componível.
- **Recharts** — gráficos da planilha F5.
- **Zod + react-hook-form** — validação e formulários densos.

## Estrutura

```
ANTISLUDGE-GOV-NEWSTACK/
├── web/                  # App Next.js (frontend + server actions)
│   ├── app/              # App Router (rotas, layouts, páginas)
│   ├── components/       # Componentes UI compartilhados (shadcn + customizados)
│   ├── features/         # Módulos de domínio (catalog, processes, journeys, …)
│   ├── lib/              # Clients Supabase, validators, utils, helpers
│   └── types/            # Types TypeScript globais (DB types, domínio)
├── supabase/             # Schema, migrations, seeds, policies
│   ├── migrations/       # Migrations versionadas (0001_…, 0002_…)
│   └── seed/             # Catálogo F5 derivado da planilha
├── docs/                 # Documentação do projeto novo
└── README.md             # Este arquivo
```

## Por onde começar

1. Ler `docs/00_OVERVIEW.md` para entender o escopo e o critério de aceite.
2. Ler `docs/01_ARQUITETURA.md` para entender as fronteiras técnicas.
3. Ler `docs/06_SETUP_SUPABASE.md` para criar o projeto no Supabase Cloud e configurar `.env.local`.
4. Rodar `cd web && pnpm install && pnpm dev`.

## Critério de aceite do MVP

> Nenhuma funcionalidade da planilha F5 pode ficar sem mapeamento explícito para
> tela, entidade, regra de negócio, cálculo ou relatório.

A tabela viva está em `docs/03_MAPA_PLANILHA_SISTEMA.md`.

## O que NÃO está no escopo do MVP

- Extensão de navegador (congelada — ver §13.1 da auditoria).
- Auditoria automatizada por NLP/grafo (visão futura).
- Integração com gov.br/SSO institucional (fase posterior).
